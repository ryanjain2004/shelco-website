import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white py-16">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="md:col-span-2">
                        <h3 className="text-[#9d0b0b] text-lg font-serif mb-2 tracking-widest uppercase">JAGRAON CYCLE INDUSTRIES</h3>
                        <div className="w-16 h-[1px] bg-[#9d0b0b] mb-6 md:mb-6"></div>
                        <p className="text-gray-400 max-w-sm leading-relaxed text-sm">
                            Jagraon Cycle Industries (Shelco) is a Ludhiana-based manufacturer of bicycle freewheels and supplier of complete bicycle spare parts since 1975. Founded by Mr. Suresh Kumar Jain, the company has built a strong reputation for quality, reliability, and export-grade manufacturing. With over five decades of industry experience, Shelco proudly serves clients across India and international markets.                        </p>
                    </div>

                    <div>
                        <h4 className="text-[#9d0b0b] text-sm font-bold tracking-widest mb-6">QUICK LINKS</h4>
                        <ul className="space-y-6 text-gray-300 text-sm">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/parts" className="hover:text-white transition-colors">Parts Catalogue</a></li>
                            <li><a href="/history" className="hover:text-white transition-colors">Our History</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[#9d0b0b] text-sm font-bold tracking-widest mb-6">OUR CATEGORIES</h4>
                        <ul className="space-y-6 text-gray-300 text-sm">
                            <li><a href="/parts?category=Single%20Speed%20Freewheels" className="hover:text-white transition-colors">Freewheels</a></li>
                            <li><a href="/parts?category=Brake%20Sets%20%26%20Parts" className="hover:text-white transition-colors">Brake Systems</a></li>
                            <li><a href="/parts?category=Handlebars" className="hover:text-white transition-colors">Handlebars & Stems</a></li>
                            <li><a href="/parts?category=Hubs" className="hover:text-white transition-colors">Hubs & Axles</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500 uppercase tracking-widest">
                    &copy; 2024 JAGRAON CYCLE INDUSTRIES (SHELCO). MANUFACTURED IN LUDHIANA, INDIA. ALL RIGHTS RESERVED.
                </div>

            </div>
        </footer>
    );
};
