import React from 'react';
import Image from 'next/image';
import { HeroImage, HeroImage3 } from '@/utils/images';

export const HeroSection = () => {
    return (
        <div className="relative w-full h-[600px] overflow-hidden flex items-center">
            {/* Background Placeholder */}
            {/* white overlay over the hero image */}
            <div className="absolute inset-0 blur-[1px] flex items-center justify-center text-2xl font-semibold">
                <Image src={HeroImage3} alt="Hero Image" fill className="object-cover scale-103" />
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl p-6 rounded-md border-l-4 border-[#9d0b0b] md:border-none pl-6 md:pl-0">
                    <div className="hidden md:inline-block bg-[#9d0b0b] text-white text-xs font-bold px-3 py-1 mb-6 tracking-widest">
                        EST. 1975
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-100 leading-tight mb-6">
                        ENGINEERING<br className="md:hidden" /> TRUST <span className="md:hidden"><br /></span>SINCE<br className="md:hidden" /> 1975
                    </h1>

                    <p className="hidden md:block text-lg text-gray-100 font-medium mb-6 max-w-lg">
                        Jagraon Cycle Industries is a leading manufacturer of high-quality bicycle freewheels and a trusted supplier of comprehensive bicycle spare parts for both domestic and international markets under its flagship brand, Shelco.                    </p>
                    <p className="block md:hidden text-gray-100 mb-6 max-w-sm leading-relaxed">
                        Jagraon Cycle Industries is a leading manufacturer of high-quality bicycle freewheels and a trusted supplier of comprehensive bicycle spare parts for both domestic and international markets under its flagship brand, Shelco.                    </p>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <a 
                            href="/parts"
                            className="block text-center w-[80%] md:w-auto bg-[#9d0b0b] text-white px-6 py-4 text-sm font-bold tracking-wider hover:bg-red-800 transition-colors"
                        >
                            EXPLORE CATALOGUE
                        </a>
                        <a 
                            href="/history"
                            className="hidden md:block text-center border-2 border-gray-100 text-gray-100 px-8 py-4 text-sm font-bold tracking-wider hover:bg-gray-900 hover:text-white transition-colors"
                        >
                            OUR HISTORY
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
