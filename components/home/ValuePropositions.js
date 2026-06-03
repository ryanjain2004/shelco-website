import React from 'react';
import { ShieldIcon, GearIcon, RobotArmIcon, BadgeCheckIcon, MapPinIcon, GlobeIcon } from '../icons';

export const ValuePropositions = () => {
    const values = [
        {
            icon: <BadgeCheckIcon />,
            title: "50+ YEARS EXPERIENCE",
            desc: "Serving the bicycle industry since 1975 with unmatched expertise and consistency."
        },
        {
            icon: <MapPinIcon />,
            title: "TRUSTED ACROSS INDIA",
            desc: "A strong distribution and supply network covering diverse markets throughout the country."
        },
        {
            icon: <GlobeIcon />,
            title: "EXPORT QUALITY",
            desc: "Products manufactured with strict quality standards suitable for domestic and international markets."
        },
        {
            icon: <GearIcon />,
            title: "COMPLETE SOLUTIONS",
            desc: "From freewheels to multiple bicycle components, we provide reliable sourcing under one roof."
        },
        {
            icon: <RobotArmIcon />,
            title: "MANUFACTURED IN LUDHIANA",
            desc: "Strategically located in Punjab's leading bicycle manufacturing center for efficient production and supply."
        },
        {
            icon: <ShieldIcon />,
            title: "MULTI-GENERATIONAL VALUES",
            desc: "A legacy of trust, integrity, and long-term customer relationships carried forward across generations."
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-start mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">WHY CHOOSE SHELCO?</h2>
                <div className="w-24 h-[2px] bg-[#9d0b0b]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((v, i) => (
                    <div key={i} className="border border-gray-300 p-6 flex flex-col items-center text-center bg-[#fafafa]">
                        <div className="mb-6 text-[#9d0b0b] [&>svg]:w-8 [&>svg]:h-8 flex justify-center items-center">{v.icon}</div>
                        <h3 className="text-xl font-serif font-bold mb-6 tracking-wide">{v.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
