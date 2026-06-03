import React from 'react';

export const AdvancedInfrastructure = () => {
    return (
        <div className="bg-[#fafafa] border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
                    OUR CORE VALUES
                </h2>
                <div className="w-24 h-[2px] bg-[#9d0b0b] mb-12 mx-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-300 bg-[#f5f5f5] p-8 md:p-10 hover:shadow-lg transition-shadow">
                        <h4 className="text-[#9d0b0b] text-xs font-bold tracking-widest uppercase mb-6">
                            QUALITY
                        </h4>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            We manufacture high-quality bicycle freewheels and supply a complete range of bicycle spare parts to businesses across India while also fulfilling export opportunities worldwide.                        </p>
                    </div>

                    <div className="border border-gray-300 bg-[#f5f5f5] p-8 md:p-10 hover:shadow-lg transition-shadow">
                        <h4 className="text-[#9d0b0b] text-xs font-bold tracking-widest uppercase mb-6">
                            COMMITMENT
                        </h4>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            For more than 50 years, Shelco has been committed to delivering export-quality products, dependable service, and consistent value to customers across diverse markets.                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
