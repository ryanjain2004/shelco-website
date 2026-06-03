import React from 'react';
import Image from 'next/image';
import { AboutImage } from '@/utils/images';

export const HistoryHero = () => {
    return (
        <div className="relative w-full h-[600px] bg-[#1a1a1a] overflow-hidden flex items-center justify-center md:justify-center">
            {/* Background Factory Image Placeholder */}
            <Image
                src={AboutImage}
                alt="Dark Factory Background Placeholder"
                fill className="object-cover opacity-60"
            />

            {/* Overlay Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 w-full text-left md:text-center flex md:block items-center">
                {/* Mobile vertical line */}
                <div className="w-1 h-32 bg-white mr-6 md:hidden"></div>

                <div>
                    <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4 md:mb-6">
                        <span className="md:hidden">SINCE 1975</span>
                        <span className="hidden md:inline">ESTABLISHED 1975</span>
                    </h4>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                        <span className="md:hidden">Five Decades<br />of Reliable<br />Performance</span>
                        <span className="hidden md:inline">Five Decades of<br />Reliable Performance</span>
                    </h1>

                    {/* Desktop horizontal line */}
                    <div className="hidden md:block w-24 h-1 bg-white mt-8 mx-auto"></div>
                </div>
            </div>
        </div>
    );
};
