#!/usr/bin/env python3
"""
Shelco Parts Catalogue Extractor
─────────────────────────────────
Reads every page of the scanned PDF, uses OCR to read all text, then:
  1. Detects the page category (e.g. "Chain & Parts")
  2. Finds individual part blocks with contour detection
  3. Crops each part image
  4. Extracts the part number, name, and specifications that appear near it
  5. Saves images to  public/parts/<category>/
  6. Writes public/parts_catalogue.json
"""

import fitz            # PyMuPDF
import pytesseract
import cv2
import numpy as np
import json
import os
import re
import shutil
from pathlib import Path
from PIL import Image

# ── paths ──────────────────────────────────────────────────────────────────────
PDF_PATH    = "/Users/barnamoyroy/Desktop/shelco/Adobe Scan 12 May 2026.pdf"
PUBLIC_DIR  = Path("/Users/barnamoyroy/Desktop/shelco/public")
PARTS_DIR   = PUBLIC_DIR / "parts"
OUTPUT_JSON = PUBLIC_DIR / "parts_catalogue.json"

# Start fresh
if PARTS_DIR.exists():
    shutil.rmtree(PARTS_DIR)
PARTS_DIR.mkdir(parents=True)

# ── OCR settings ───────────────────────────────────────────────────────────────
TESSDATA_CONFIG = "--oem 3 --psm 11 -l eng"   # sparse text mode – good for catalogue grids

# ── category detection ─────────────────────────────────────────────────────────
CATEGORY_MAP = [
    (["chain", "charmin"],                              "chain_and_parts"),
    (["chainwheel", "chainring", "crankwheel", "crank","chainwheel"],  "chainwheels_crankset"),
    (["freewheel", "sprocket"],                         "freewheel_sprockets"),
    (["brake", "lever", "caliper"],                     "brakes"),
    (["hub", "spoke", "rim", "wheel"],                  "wheels"),
    (["handlebar", "stem", "grip"],                     "handlebars"),
    (["saddle", "seat", "seatpost"],                    "saddle_seatpost"),
    (["pedal"],                                         "pedals"),
    (["derailleur", "shifter", "gear"],                 "gears"),
    (["mudguard", "fender", "guard"],                   "mudguards"),
    (["light", "reflector", "dynamo"],                  "lights"),
    (["bell"],                                          "bells"),
    (["carrier", "rack"],                               "carriers"),
    (["lock"],                                          "locks"),
    (["pump"],                                          "pumps"),
    (["frame", "fork"],                                 "frames_forks"),
    (["bolt", "nut", "screw", "fastener"],              "fasteners"),
    (["bearing", "ball"],                               "bearings"),
    (["reflector"],                                     "reflectors"),
    (["valve", "tube", "tyre", "tire"],                 "tubes_tyres"),
]

def detect_category(full_text: str) -> str:
    t = full_text.lower()
    for keywords, cat in CATEGORY_MAP:
        if any(k in t for k in keywords):
            return cat
    return "miscellaneous"


def slugify(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "_", s.lower().strip())
    return s.strip("_")


# ── Part-number / name extraction from OCR text ────────────────────────────────
# Part codes look like: S-56, S-4, S-53, S-68, SL-1234, BL-xx …
PART_CODE_RE = re.compile(r"\b([A-Z]{1,3}-\d{1,4}[A-Z]?)\b")
SIZE_RE      = re.compile(r"\b(\d+[\.\d]*\s*(?:mm|cm|T|t|\"|\u201d|inch|x\s*\d+[\w]*))\b", re.IGNORECASE)


def parse_ocr_text(text: str) -> list[dict]:
    """
    Given the OCR of a whole page, find every part-code and collect the
    text cluster around it.  Returns list of dicts: {code, raw_lines}
    """
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    # Find lines that contain a part code
    buckets = []   # list of (code, [lines])
    current_code = None
    current_lines = []

    for line in lines:
        codes = PART_CODE_RE.findall(line)
        if codes:
            # Save previous bucket
            if current_code:
                buckets.append((current_code, current_lines))
            current_code = codes[0]
            current_lines = [line]
        else:
            if current_code:
                current_lines.append(line)

    if current_code:
        buckets.append((current_code, current_lines))

    parts = []
    for code, raw_lines in buckets:
        combined = " ".join(raw_lines)
        # Remove the code itself from lines to find the name
        name_lines = [l for l in raw_lines if code not in l]
        # Guess name = first long enough line after code
        name = code
        for nl in name_lines:
            cleaned = re.sub(r"[^A-Za-z0-9 /,\.\-]", "", nl).strip()
            if len(cleaned) > 4:
                name = cleaned
                break

        sizes   = SIZE_RE.findall(combined)
        details_text = " | ".join(raw_lines)

        # Try key:value
        kv = {}
        for line in raw_lines:
            m = re.match(r"^([A-Za-z][A-Za-z /]{2,25})\s*[:\-]\s*(.+)$", line)
            if m:
                kv[m.group(1).strip().lower().replace(" ", "_")] = m.group(2).strip()

        parts.append({
            "part_number": code,
            "name": name.strip(),
            "sizes": list(dict.fromkeys(sizes)),
            "specifications": kv if kv else None,
            "description": details_text,
        })
    return parts


# ── Image contour-based part detection ─────────────────────────────────────────

def find_part_regions(pil_img: Image.Image, min_area_frac=0.003, max_area_frac=0.45):
    """
    Use edge detection + morphological ops to find distinct part product regions.
    Returns list of (x, y, w, h) bounding boxes in image coordinates.
    """
    img_np = np.array(pil_img.convert("RGB"))
    gray   = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
    H, W   = gray.shape
    total  = H * W

    # Threshold to separate dark objects from white/light background
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # Dilate to merge nearby fragments into one blob
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 40))
    dilated = cv2.dilate(thresh, kernel, iterations=2)

    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    boxes = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        area = w * h
        if min_area_frac * total < area < max_area_frac * total:
            # Exclude very thin/wide strips (likely text-only rows or borders)
            aspect = w / h
            if 0.2 < aspect < 6:
                boxes.append((x, y, w, h))

    # Sort top-to-bottom, left-to-right
    boxes.sort(key=lambda b: (b[1] // (H // 3), b[0]))
    return boxes


def crop_part(pil_img: Image.Image, x, y, w, h, padding=20) -> Image.Image:
    W_img, H_img = pil_img.size
    x1 = max(0, x - padding)
    y1 = max(0, y - padding)
    x2 = min(W_img, x + w + padding)
    y2 = min(H_img, y + h + padding)
    return pil_img.crop((x1, y1, x2, y2))


# ── Main extraction loop ────────────────────────────────────────────────────────

def extract():
    doc = fitz.open(PDF_PATH)
    catalogue = []
    global_part_idx = 0

    print(f"PDF has {len(doc)} pages\n")

    for page_num, page in enumerate(doc, start=1):
        print(f"── Page {page_num} ───────────────────────────────")

        # Get embedded image (each page IS one big JPEG scan)
        img_list = page.get_images(full=True)
        if not img_list:
            print(f"  No image on page {page_num}, skipping")
            continue

        xref = img_list[0][0]
        base = doc.extract_image(xref)
        pil_img = Image.open(__import__("io").BytesIO(base["image"])).convert("RGB")
        W, H = pil_img.size
        print(f"  Page image: {W}×{H}")

        # ── OCR full page ─────────────────────────────────────────────────────
        # Downscale for faster OCR while keeping accuracy
        ocr_scale = min(1.0, 2400 / max(W, H))
        ocr_img = pil_img.resize((int(W * ocr_scale), int(H * ocr_scale)), Image.LANCZOS)
        full_text = pytesseract.image_to_string(ocr_img, config=TESSDATA_CONFIG)
        print(f"  OCR chars: {len(full_text)}")

        # ── Detect category ───────────────────────────────────────────────────
        category = detect_category(full_text)
        cat_dir  = PARTS_DIR / category
        cat_dir.mkdir(parents=True, exist_ok=True)
        print(f"  Category: {category}")

        # ── Parse parts from OCR text ─────────────────────────────────────────
        parsed_parts = parse_ocr_text(full_text)
        print(f"  Parts found in OCR text: {len(parsed_parts)}")

        # ── Detect visual product regions ─────────────────────────────────────
        # Work on the inner content area — exclude ~10% border (Shelco/Charmin labels)
        margin_x = int(W * 0.10)
        margin_y = int(H * 0.08)
        inner = pil_img.crop((margin_x, margin_y, W - int(W * 0.02), H - int(H * 0.04)))
        boxes = find_part_regions(inner)
        print(f"  Visual regions detected: {len(boxes)}")

        if not boxes:
            # Fallback: treat whole page as one entry
            boxes = [(0, 0, inner.width, inner.height)]

        # ── Match visual regions to parsed parts ──────────────────────────────
        entries = []
        for i, (x, y, w, h) in enumerate(boxes):
            global_part_idx += 1

            # Crop the part image
            crop = crop_part(inner, x, y, w, h, padding=15)

            # Run OCR on just the region (may give cleaner name/spec for that part)
            region_text = pytesseract.image_to_string(crop, config="--oem 3 --psm 6 -l eng")

            # Find matching parsed part by part code in region text
            region_codes = PART_CODE_RE.findall(region_text.upper())
            matched_part = None
            if region_codes:
                for pp in parsed_parts:
                    if pp["part_number"] in region_codes:
                        matched_part = pp
                        break
            # Fallback: assign by index
            if not matched_part and i < len(parsed_parts):
                matched_part = parsed_parts[i]

            # Build file name
            part_code_slug = slugify(matched_part["part_number"]) if matched_part else f"part_{global_part_idx:04d}"
            img_filename   = f"{part_code_slug}_p{page_num}_r{i+1}.jpg"
            save_path      = cat_dir / img_filename
            crop.save(str(save_path), "JPEG", quality=90)

            public_path = f"/parts/{category}/{img_filename}"

            entry = {
                "id":          f"{global_part_idx:04d}",
                "page":        page_num,
                "region":      i + 1,
                "category":    category,
                "image_path":  public_path,
                **(matched_part if matched_part else {
                    "part_number": f"UNK-{global_part_idx:04d}",
                    "name": f"Part from page {page_num}",
                    "sizes": [],
                    "specifications": None,
                    "description": region_text.strip()[:300],
                }),
            }
            entries.append(entry)
            pn = entry.get("part_number", "?")
            nm = entry.get("name", "")[:40]
            print(f"    [{i+1}] {pn}  {nm!r}  → {public_path}")

        catalogue.extend(entries)

    doc.close()

    # ── Write JSON ────────────────────────────────────────────────────────────
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(catalogue, f, indent=2, ensure_ascii=False)

    print(f"\n✅  Done!  {len(catalogue)} part entries written → {OUTPUT_JSON}")

    from collections import Counter
    cats = Counter(e["category"] for e in catalogue)
    print("\nCategory summary:")
    for cat, n in cats.most_common():
        print(f"  {cat:<30} {n:>3} parts")


if __name__ == "__main__":
    extract()
