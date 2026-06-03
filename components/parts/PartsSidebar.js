'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SearchIcon } from '../icons';

const DEFAULT = {
    search: '',
    category: 'ALL CATEGORIES',
    material: 'ALL MATERIALS',
    application: 'ALL APPLICATIONS',
};

export const PartsSidebar = ({ categories, initialFilters }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [draft, setDraft] = useState(initialFilters || DEFAULT);

    useEffect(() => {
        if (initialFilters) {
            setDraft(initialFilters);
        }
    }, [initialFilters]);

    const applyToURL = (newFilters) => {
        const params = new URLSearchParams();
        if (newFilters.search) params.set('search', newFilters.search);
        if (newFilters.category && newFilters.category !== 'ALL CATEGORIES') params.set('category', newFilters.category);
        if (newFilters.material && newFilters.material !== 'ALL MATERIALS') params.set('material', newFilters.material);
        if (newFilters.application && newFilters.application !== 'ALL APPLICATIONS') params.set('application', newFilters.application);
        
        // Use hard navigation to prevent ngrok from blocking Next.js RSC fetch requests
        window.location.href = `${pathname}?${params.toString()}`;
    };

    const set = (key) => (e) => {
        const updated = { ...draft, [key]: e.target.value };
        setDraft(updated);
    };

    const handleApply = () => applyToURL(draft);
    const handleReset = () => {
        setDraft(DEFAULT);
        window.location.href = pathname;
    };

    return (
        <div className="flex flex-col gap-6 border border-gray-300 p-6 bg-white sticky top-6 self-start">
            <div className="border-b border-gray-400 pb-4">
                <h2 className="text-[#9d0b0b] font-serif font-bold text-[22px] uppercase tracking-wide mb-2">
                    FILTER COMPONENTS
                </h2>
                <h4 className="text-gray-600 text-[11px] font-bold tracking-widest uppercase">
                    ENGINEERING SPECIFICATIONS
                </h4>
            </div>

            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                {/* Quick Search */}
                <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-gray-900 tracking-widest uppercase">QUICK SEARCH</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={draft.search}
                            onChange={set('search')}
                            placeholder="PART NO. OR KEYWORD..."
                            className="w-full border border-gray-400 p-[14px] pr-10 text-xs text-gray-500 focus:outline-none focus:border-[#9d0b0b] placeholder-gray-400"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold scale-110">
                            <SearchIcon />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 border border-gray-300 p-5 bg-[#f2f2f2]">
                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-gray-900 tracking-widest uppercase">CATEGORY</label>
                        <select
                            value={draft.category}
                            onChange={set('category')}
                            className="w-full border border-gray-400 p-[14px] text-xs text-gray-800 bg-white focus:outline-none focus:border-[#9d0b0b] appearance-none"
                        >
                            <option>ALL CATEGORIES</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Material */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-gray-900 tracking-widest uppercase">MATERIAL</label>
                        <select
                            value={draft.material}
                            onChange={set('material')}
                            className="w-full border border-gray-400 p-[14px] text-xs text-gray-800 bg-white focus:outline-none focus:border-[#9d0b0b] appearance-none"
                        >
                            <option>ALL MATERIALS</option>
                            <option>Chromoly Steel</option>
                            <option>Aluminum Alloy</option>
                            <option>Carbon Fiber</option>
                        </select>
                    </div>

                    {/* Application */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-gray-900 tracking-widest uppercase">APPLICATION</label>
                        <select
                            value={draft.application}
                            onChange={set('application')}
                            className="w-full border border-gray-400 p-[14px] text-xs text-gray-800 bg-white focus:outline-none focus:border-[#9d0b0b] appearance-none"
                        >
                            <option>ALL APPLICATIONS</option>
                            <option>Urban &amp; City</option>
                            <option>Mountain</option>
                            <option>Road &amp; Track</option>
                        </select>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <button
                            type="button"
                            onClick={handleApply}
                            className="flex-[2] bg-[#900000] text-white py-4 px-4 text-[11px] font-bold tracking-widest uppercase hover:bg-red-800 transition-colors text-center"
                        >
                            APPLY FILTERS
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex-[1] bg-[#e8e8e8] text-gray-600 border border-gray-400 py-4 px-4 text-[11px] font-bold tracking-widest uppercase hover:bg-gray-300 transition-colors text-center"
                        >
                            RESET
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
