import React from 'react';

export const StatsSection = () => {
    const stats = [
        { value: "50+", labelDesktop: "YEARS OF OPERATION", labelMobile: "YEARS ACTIVE" },
        { value: "3", labelDesktop: "GENERATIONS MANAGING", labelMobile: "GENERATIONS" },
        { value: "100+", labelDesktop: "BUSINESS RELATIONSHIPS IN INDIA", labelMobile: "PARTNERSHIPS" },
        { value: "15M+", labelDesktop: "PARTS MANUFACTURED", labelMobile: "PARTS PRODUCED" }
    ];

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-12 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="text-[#9d0b0b] text-4xl md:text-5xl font-serif font-bold mb-4">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                                <span className="md:hidden">{stat.labelMobile}</span>
                                <span className="hidden md:inline">{stat.labelDesktop}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
