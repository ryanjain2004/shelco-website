import React from 'react';
import { GlobeIcon, IntegrationIcon } from '../icons';

export const GlobalLogistics = () => {
    return (
        <div className="bg-[#fafafa] py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <div className="text-[#9d0b0b] text-sm font-bold tracking-widest mb-6">GLOBAL PRESENCE</div>
                        <h2 className="text-4xl font-serif font-bold mb-6 leading-tight text-gray-900">
                            FROM LUDHIANA<br />TO GLOBAL MARKETS
                        </h2>
                        <p className="text-gray-600 leading-relaxed max-w-md">
                            Our products are trusted by businesses across India and are also supplied for export opportunities worldwide. We fulfill high-volume business requirements and customized orders with efficient manufacturing and supply systems.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center space-y-6">
                        <div className="flex items-start gap-6">
                            <div className="bg-gray-200 p-3 rounded text-gray-600">
                                <GlobeIcon />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 text-gray-900">EXPORT QUALITY</h4>
                                <p className="text-gray-600 text-sm">Products manufactured with strict quality standards suitable for domestic and international markets.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="bg-gray-200 p-3 rounded text-gray-600">
                                <IntegrationIcon />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 text-gray-900">RELIABLE BULK SUPPLY</h4>
                                <p className="text-gray-600 text-sm">Efficient manufacturing and supply systems to fulfill high-volume business requirements.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="relative w-full h-[400px] bg-gray-200 flex items-center justify-center overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps?q=30.887867,75.915263&hl=en&z=14&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Factory Location"
                        className="absolute inset-0"
                    ></iframe>

                    <div className="absolute top-6 right-6 bg-[#9d0b0b] text-white text-xs font-bold tracking-widest px-4 py-2">
                        EXPORTING EXCELLENCE
                    </div>
                </div>

            </div>
        </div>
    );
};
