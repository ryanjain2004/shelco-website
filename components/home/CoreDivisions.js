import React from 'react';
import Image from 'next/image';
import { BikeIcon, RobotArmIcon } from '../icons';
import { Brake, Chain, Hub } from '@/utils/images';

export const CoreDivisions = () => {
    const cards = [
        {
            title: "DRIVETRAIN & CHAINS",
            badge: "DIVISION 01",
            icon: <BikeIcon />,
            desc: "High-precision single-speed and multi-speed chainwheels, premium chain rolls, and silky-finish freewheels built for ultimate power transfer.",
            img: Chain,
            href: "/parts?category=Chain%20Parts"
        },
        {
            title: "HUBS & BOTTOM BRACKETS",
            badge: "DIVISION 02",
            icon: <RobotArmIcon />,
            desc: "Engineered steel hubs, BB axles, cups, and durable thread designs delivering ultra-smooth rotation and long-lasting bearing performance.",
            img: Hub,
            href: "/parts?category=Hubs"
        },
        {
            title: "STEERING & BRAKING",
            badge: "DIVISION 03",
            icon: <RobotArmIcon />,
            desc: "Heavy-duty steel front forks, ergonomic handlebars, precision brake sets, levers, and shoes engineered for responsive control.",
            img: Brake,
            href: "/parts?category=Brake%20Sets%20%26%20Parts"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 pb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="hidden md:block w-1 h-8 bg-[#9d0b0b] mr-6"></div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
                        <span className="md:hidden text-gray-800">KEY<br />CATEGORIES</span>
                        <span className="hidden md:inline text-gray-900">CORE DIVISIONS</span>
                    </h2>
                </div>
                <div className="mt-2 md:mt-0 flex items-center justify-between w-full md:w-auto">
                    {/* We place it absolutely to the right in flex layout or handle it differently. Let's make the container relative */}
                </div>
            </div>

            {/* Mobile only elements: VIEW ALL and divider */}
            <div className="md:hidden flex justify-end -mt-16 mb-2">
                <a href="/parts" className="text-[#9d0b0b] text-[10px] font-bold tracking-widest uppercase text-right leading-tight">
                    VIEW ALL<br />SPECIFICATIONS &rarr;
                </a>
            </div>
            <div className="md:hidden w-full h-[2px] bg-[#9d0b0b] mb-6 mt-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="border border-gray-300 group hover:shadow-lg transition-shadow">
                        {/* Image Placeholder */}
                        <div className="relative w-full h-48 md:h-64 bg-gray-300 flex items-center justify-center text-gray-500 font-semibold">
                            <Image src={card.img} alt={card.title} fill className="object-cover" />
                        </div>

                        <div className="p-6 bg-white">
                            <div className="flex items-center justify-between mb-6">
                                <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 font-bold tracking-widest">
                                    {card.badge}
                                </span>
                                <span className="text-gray-500">{card.icon}</span>
                            </div>

                            <h3 className="text-xl font-serif font-bold mb-6">{card.title}</h3>

                            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                {card.desc}
                            </p>

                            <a
                                href={card.href}
                                className="block w-full border border-gray-300 py-3 text-sm font-semibold tracking-widest text-center hover:border-gray-500 transition-colors"
                            >
                                DETAILS
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
