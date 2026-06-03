import React from 'react';

export const ProductCard = ({ part }) => {
    const codes = Array.isArray(part.item_code) ? part.item_code : [part.item_code];
    const codeLabel = codes.join(' / ');

    // Pick the most useful spec to show — first key-value pair from specifications
    let specLine = null;
    if (part.specifications && typeof part.specifications === 'object') {
        const entries = Object.entries(part.specifications);
        if (entries.length > 0) {
            const [key, val] = entries[0];
            if (typeof val === 'string') {
                const label = key
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                specLine = { label, value: val };
            }
        }
    }

    return (
        <div className="border border-gray-300 flex flex-col bg-white hover:border-[#9d0b0b] transition-colors duration-200 group">
            {/* Image area */}
            <div className="relative w-full h-[220px] bg-white flex items-center justify-center overflow-hidden border-b border-gray-100">
                <div className="absolute top-3 left-3 bg-[#9d0b0b] text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase z-10">
                    IN STOCK
                </div>
                {part.image_path ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={part.image_path}
                        alt={part.name}
                        className="w-full h-full object-contain p-6"
                        style={{ backgroundColor: '#ffffff', mixBlendMode: 'multiply' }}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                {/* Fallback placeholder */}
                <div
                    className="absolute inset-0 flex-col items-center justify-center text-gray-400 text-xs font-bold tracking-widest uppercase"
                    style={{ display: part.image_path ? 'none' : 'flex' }}
                >
                    <span className="text-2xl mb-1">⚙</span>
                    <span>NO IMAGE</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Item code */}
                <div className="text-[#9d0b0b] text-[14px] font-bold tracking-widest uppercase mb-1">
                    {codeLabel}
                </div>

                {/* Name */}
                <h3 className="text-[15px] font-serif font-bold text-gray-900 mb-2 uppercase tracking-wide leading-snug line-clamp-2">
                    {part.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-[11px] leading-relaxed mb-4 line-clamp-2">
                    {part.description}
                </p>

                {/* Spec grid — 4 cells, show spec + visual notes snippets */}
                <div className="grid grid-cols-2 gap-2 bg-[#f5f5f5] border border-gray-200 p-3 mb-4 text-[12px]">
                    <div className="flex flex-col gap-0.5 col-span-2">
                        <span className="text-gray-400 font-bold tracking-widest uppercase">CODE</span>
                        <span className="text-gray-800 font-semibold truncate">{codeLabel}</span>
                    </div>
                    {specLine ? (
                        <div className="flex flex-col gap-0.5 col-span-2">
                            <span className="text-gray-400 font-bold tracking-widest uppercase">{specLine.label}</span>
                            <span className="text-gray-800 font-semibold line-clamp-1">{specLine.value}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-0.5 col-span-2">
                            <span className="text-gray-400 font-bold tracking-widest uppercase">NOTES</span>
                            <span className="text-gray-800 font-semibold line-clamp-1">
                                {part.visual_notes ? part.visual_notes.slice(0, 60) + '…' : '—'}
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    <a 
                        href={`https://wa.me/919914222270?text=${encodeURIComponent(`Hi, I am interested in knowing more details about the part: ${part.name} (${codeLabel}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full border border-gray-800 text-gray-900 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#9d0b0b] hover:text-white hover:border-[#9d0b0b] transition-colors text-center"
                    >
                        VIEW DETAILS
                    </a>
                </div>
            </div>
        </div>
    );
};
