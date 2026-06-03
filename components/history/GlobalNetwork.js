import React from 'react';
import { CarouselImage1, CarouselImage2, CarouselImage3, CarouselImage4, CarouselImage5, CarouselImage6, CarouselImage7 } from '@/utils/images';
import Image from 'next/image';

export const GlobalNetwork = () => {
    // Placeholders for the images the user will add later
    const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3, CarouselImage4, CarouselImage5, CarouselImage6, CarouselImage7];

    return (
        <div className="bg-[#fafafa] py-16 border-t border-gray-200 overflow-hidden">
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                    width: max-content;
                }
                /* Pause on hover to allow users to look at images */
                .carousel-container:hover .animate-scroll {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
                            <span className="md:hidden">INFRASTRUCTURE</span>
                            <span className="hidden md:inline">OUR INFRASTRUCTURE</span>
                        </h2>
                        <div className="w-24 h-[2px] bg-[#9d0b0b]"></div>
                    </div>
                    <div className="max-w-lg">
                        <h3 className="text-[#9d0b0b] font-bold text-sm mb-2 uppercase tracking-wide">
                            MANUFACTURING FACILITY
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Located at D-115, Phase 5, Focal Point, Ludhiana – 141010. Equipped to support efficient production, quality control, and timely supply operations for customers across India and export markets.
                        </p>
                    </div>
                </div>
            </div>

            {/* Horizontal Carousel */}
            <div className="w-full relative carousel-container group py-4">
                {/* Left Fade */}
                <div className="absolute top-0 left-0 w-16 md:w-48 h-full bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none"></div>

                {/* Right Fade */}
                <div className="absolute top-0 right-0 w-16 md:w-48 h-full bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none"></div>

                <div className="flex animate-scroll gap-4 px-4">
                    {/* First set of images */}
                    {carouselImages.map((imgSrc, i) => (
                        <div key={`first-${i}`} className="relative w-[280px] md:w-[400px] h-[200px] md:h-[280px] flex-shrink-0 bg-[#e5e5e5] flex items-center justify-center border border-gray-300 shadow-sm transition-opacity duration-300 hover:!opacity-100 group-hover:opacity-60 cursor-pointer overflow-hidden">
                            <Image src={imgSrc} alt={`Infrastructure Image ${i + 1}`} fill className="object-cover" />
                        </div>
                    ))}
                    {/* Duplicate set for seamless looping */}
                    {carouselImages.map((imgSrc, i) => (
                        <div key={`second-${i}`} className="relative w-[280px] md:w-[400px] h-[200px] md:h-[280px] flex-shrink-0 bg-[#e5e5e5] flex items-center justify-center border border-gray-300 shadow-sm transition-opacity duration-300 hover:!opacity-100 group-hover:opacity-60 cursor-pointer overflow-hidden">
                            <Image src={imgSrc} alt={`Infrastructure Image ${i + 1}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
