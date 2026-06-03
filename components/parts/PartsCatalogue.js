'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { ProductCard } from './ProductCard';

const PAGE_SIZE = 10;
const LOAD_DELAY_MS = 700;

const matchMaterial = (part, selectedMaterial) => {
    if (!selectedMaterial || selectedMaterial === 'ALL MATERIALS') return true;

    const name = (part.name || '').toLowerCase();
    const desc = (part.description || '').toLowerCase();
    const notes = (part.visual_notes || '').toLowerCase();
    const specsStr = part.specifications && typeof part.specifications === 'object'
        ? JSON.stringify(part.specifications).toLowerCase()
        : '';

    const fullText = `${name} ${desc} ${notes} ${specsStr}`;

    if (selectedMaterial === 'Chromoly Steel') {
        return (
            fullText.includes('steel') ||
            fullText.includes('cr-mo') ||
            fullText.includes('chromoly') ||
            fullText.includes('iron') ||
            fullText.includes('cp') ||
            fullText.includes('np') ||
            fullText.includes('pin') ||
            fullText.includes('axle')
        );
    }
    if (selectedMaterial === 'Aluminum Alloy') {
        return (
            fullText.includes('alloy') ||
            fullText.includes('aluminum') ||
            fullText.includes('aluminium') ||
            fullText.includes('al ')
        );
    }
    if (selectedMaterial === 'Carbon Fiber') {
        return (
            fullText.includes('carbon') ||
            fullText.includes('fiber') ||
            fullText.includes('fibre')
        );
    }
    return true;
};

const matchApplication = (part, selectedApp) => {
    if (!selectedApp || selectedApp === 'ALL APPLICATIONS') return true;

    const name = (part.name || '').toLowerCase();
    const desc = (part.description || '').toLowerCase();
    const notes = (part.visual_notes || '').toLowerCase();
    const specsStr = part.specifications && typeof part.specifications === 'object'
        ? JSON.stringify(part.specifications).toLowerCase()
        : '';

    const fullText = `${name} ${desc} ${notes} ${specsStr}`;

    if (selectedApp === 'Urban & City') {
        return (
            fullText.includes('city') ||
            fullText.includes('urban') ||
            fullText.includes('regular') ||
            fullText.includes('classic') ||
            fullText.includes('single') ||
            fullText.includes('saddle') ||
            fullText.includes('comfort')
        );
    }
    if (selectedApp === 'Mountain') {
        return (
            fullText.includes('mtb') ||
            fullText.includes('mountain') ||
            fullText.includes('multi') ||
            fullText.includes('triple') ||
            fullText.includes('suspension')
        );
    }
    if (selectedApp === 'Road & Track') {
        return (
            fullText.includes('racer') ||
            fullText.includes('road') ||
            fullText.includes('track') ||
            fullText.includes('racing') ||
            fullText.includes('caliper')
        );
    }
    return true;
};

export const PartsCatalogue = ({ data, filters }) => {
    const {
        search = '',
        category = 'ALL CATEGORIES',
        material = 'ALL MATERIALS',
        application = 'ALL APPLICATIONS'
    } = filters || {};

    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingRef = useRef(false);
    const sentinelRef = useRef(null);

    // Flatten all matching parts across categories into a single list
    const { totalParts, allParts } = useMemo(() => {
        let total = 0;
        const flat = [];

        for (const [catName, parts] of Object.entries(data)) {
            // Category filter
            if (category !== 'ALL CATEGORIES' && category !== catName) continue;

            const matched = parts.filter((part) => {
                // Search query filter
                if (search) {
                    const q = search.toLowerCase();
                    const codes = Array.isArray(part.item_code) ? part.item_code : [part.item_code];
                    const searchMatches = codes.some((c) => c.toLowerCase().includes(q)) ||
                        part.name.toLowerCase().includes(q) ||
                        (part.description && part.description.toLowerCase().includes(q));

                    if (!searchMatches) return false;
                }

                // Material filter
                if (!matchMaterial(part, material)) return false;

                // Application filter
                if (!matchApplication(part, application)) return false;

                return true;
            });

            if (matched.length > 0) {
                total += matched.length;
                matched.forEach((p) => flat.push({ ...p, _category: catName }));
            }
        }

        return { totalParts: total, allParts: flat };
    }, [data, search, category, material, application]);

    // Reset when filters change
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
        setIsLoading(false);
        isLoadingRef.current = false;
    }, [search, category, material, application]);


    const hasMore = visibleCount < totalParts;

    // Throttled load — triggered automatically by IntersectionObserver
    const loadMore = useCallback(() => {
        if (isLoadingRef.current || !hasMore) return;

        isLoadingRef.current = true;
        setIsLoading(true);

        setTimeout(() => {
            setVisibleCount((c) => c + PAGE_SIZE);
            isLoadingRef.current = false;
            setIsLoading(false);
        }, LOAD_DELAY_MS);
    }, [hasMore]);

    const loadMoreRef = useRef(loadMore);
    useEffect(() => {
        loadMoreRef.current = loadMore;
    }, [loadMore]);

    // Watch the sentinel div at the bottom of the grid
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadMoreRef.current();
                    }
                });
            },
            { rootMargin: '200px' }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [visibleCount]);

    const visibleParts = allParts.slice(0, visibleCount);

    if (totalParts === 0) {
        return (
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                    <h1 className="text-3xl font-serif font-bold text-gray-900 uppercase">CATALOGUE</h1>
                </div>
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <span className="text-5xl mb-4 text-gray-300">⚙</span>
                    <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">NO PARTS FOUND</p>
                    <p className="text-gray-400 text-xs mt-2">Try adjusting your search or category filter.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                <h1 className="text-3xl font-serif font-bold text-gray-900 uppercase">
                    {category === 'ALL CATEGORIES' ? 'CATALOGUE' : category.toUpperCase()}
                </h1>
                <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase hidden md:inline">
                    SHOWING {Math.min(visibleCount, totalParts)} OF {totalParts} ITEMS
                </span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {visibleParts.map((part, idx) => (
                    <ProductCard key={`${part._category}-${idx}`} part={part} />
                ))}
            </div>

            {/* Sentinel + loader */}
            <div ref={sentinelRef} className="mt-8 flex flex-col items-center justify-center gap-4 min-h-[80px]">
                {isLoading && (
                    <>
                        <div className="w-10 h-10 border-[3px] border-gray-200 border-t-[#9d0b0b] rounded-full animate-spin" />
                        <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                            LOADING MORE INVENTORY DATA...
                        </span>
                    </>
                )}
                {!isLoading && !hasMore && (
                    <span className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">
                        ALL {totalParts} ITEMS SHOWN
                    </span>
                )}
            </div>
        </div>
    );
};
