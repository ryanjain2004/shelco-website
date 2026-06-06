import React from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, NetworkIcon, CameraIcon, GlobeIcon } from '../icons';

export const ContactInfo = () => {
    return (
        <div className="flex flex-col gap-6 h-full">

            {/* Headquarters Box */}
            <div className="border border-gray-300 bg-[#fafafa]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-300 bg-[#e5e5e5] md:bg-transparent md:border-none md:pb-0">
                    <div className="flex items-center gap-3">
                        <span className="text-[#9d0b0b] hidden md:block"><MapPinIcon /></span>
                        <h3 className="text-sm md:text-lg font-serif font-bold text-gray-900 tracking-wide">
                            <span className="md:hidden">HEADQUARTERS</span>
                            <span className="hidden md:inline">GLOBAL HEADQUARTERS</span>
                        </h3>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-6 flex items-start gap-3">
                        <span className="text-[#9d0b0b] mt-1 md:hidden"><MapPinIcon /></span>
                        <div>
                            <h4 className="text-xs md:text-sm font-bold text-gray-900 mb-2 md:mb-1 uppercase md:normal-case">
                                <span className="md:hidden text-gray-500 tracking-widest text-[10px]">ADDRESS<br /></span>
                                JAGRAON CYCLE INDUSTRIES CO.
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                D-115, Phase 5, Focal Point<br />
                                Ludhiana – 141010<br />
                                Punjab, India
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block w-full h-[1px] bg-gray-300 mb-6"></div>

                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="flex items-start md:items-center justify-between gap-3 md:gap-0">
                            <span className="text-[#9d0b0b] mt-1 md:hidden"><PhoneIcon /></span>
                            <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                                <span className="text-[10px] md:text-xs font-bold text-gray-500 tracking-widest uppercase mb-1 md:mb-0">
                                    Phone Number
                                </span>
                                <span className="text-sm font-bold text-gray-900">
                                    +91 9914222270
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start md:items-center justify-between gap-3 md:gap-0">
                            <span className="text-[#9d0b0b] mt-1 md:hidden"><MailIcon /></span>
                            <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                                <span className="text-[10px] md:text-xs font-bold text-gray-500 tracking-widest uppercase mb-1 md:mb-0">
                                    <span className="md:hidden">Official Correspondence</span>
                                    <span className="hidden md:inline">Export Division</span>
                                </span>
                                <span className="text-sm font-bold text-gray-900 underline md:no-underline">
                                    info@jagraoncycleindustries.com
                                </span>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between w-full">
                            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">
                                Time Zone
                            </span>
                            <span className="text-sm text-gray-600">
                                IST (UTC+5:30) 10:00 - 18:30 Sunday Closed
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Box */}
            <div className="border border-gray-300 bg-[#fafafa] p-6">
                <div className="text-[10px] md:text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">
                    SOCIAL PRESENCE & INTELLIGENCE
                </div>
                <div className="w-full h-[1px] bg-gray-300 mb-6"></div>

                <div className="flex flex-wrap items-center gap-6">
                    <a href="https://www.linkedin.com/company/jcishelco/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-900 hover:text-[#9d0b0b] transition-colors">
                        <NetworkIcon />
                        <span className="text-xs font-bold tracking-widest uppercase">LinkedIn</span>
                    </a>
                    {/* <a href="https://www.linkedin.com/company/jcishelco/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-900 hover:text-[#9d0b0b] transition-colors">
                        <GlobeIcon />
                        <span className="text-xs font-bold tracking-widest uppercase">Facebook</span>
                    </a> */}
                    {/* <a href="https://www.linkedin.com/company/jcishelco/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-900 hover:text-[#9d0b0b] transition-colors">
                        <CameraIcon />
                        <span className="text-xs font-bold tracking-widest uppercase">Instagram</span>
                    </a> */}
                </div>
            </div>

        </div>
    );
};
