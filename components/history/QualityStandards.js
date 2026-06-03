import React from 'react';
import { BadgeCheckIcon, ShieldIcon, RibbonIcon, LeafIcon } from '../icons';

export const QualityStandards = () => {
    const standards = [
        { icon: <BadgeCheckIcon />, label: "ISO 9001:2015" },
        { icon: <ShieldIcon />, label: "ISI MARK (BIS)" },
        { icon: <RibbonIcon />, label: "CE CERTIFIED" },
        { icon: <LeafIcon />, label: "MAKE IN INDIA" }
    ];

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-16">
                    CERTIFIED QUALITY STANDARDS
                </h4>

                <div className="flex justify-center gap-6 md:gap-24 items-center">
                    {standards.map((s, i) => (
                        <div key={i} className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
                            <div className="mb-4 text-gray-800 scale-125">
                                {s.icon}
                            </div>
                            <div className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
