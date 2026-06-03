'use client';

import React, { useState } from 'react';
import { SendIcon } from '../icons';

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        inquiryType: 'Bulk Supply Inquiry',
        company: '',
        details: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = encodeURIComponent(`Shelco Inquiry: ${formData.inquiryType} - ${formData.company || formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Company: ${formData.company || 'N/A'}\n` +
            `Email: ${formData.email}\n` +
            `Inquiry Type: ${formData.inquiryType}\n\n` +
            `Requirements / Message:\n${formData.details}`
        );

        // Replace with your actual sales email
        const targetEmail = 'info@jagraoncycleindustries.com';
        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="border border-gray-300 flex flex-col h-full bg-white">
            {/* Header */}
            <div className="bg-[#e5e5e5] p-6 hidden md:block">
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">BUSINESS INQUIRY FORM</h3>
                <p className="text-gray-600 text-xs">Please provide details regarding your bulk supply, export, or OEM requirements.</p>
            </div>

            <div className="bg-[#e5e5e5] px-6 py-2 md:hidden border-b border-gray-300">
                <span className="text-[10px] font-bold text-gray-600 tracking-widest">FORM ID: VH-72-SALES</span>
            </div>
            <div className="p-6 md:hidden">
                <h3 className="text-xl font-serif font-bold text-gray-900">BUSINESS INQUIRY</h3>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] md:text-xs font-bold tracking-widest text-gray-600 uppercase">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Jonathan Sterling"
                            className="border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#9d0b0b]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] md:text-xs font-bold tracking-widest text-gray-600 uppercase">
                            <span className="md:hidden">Work Email Address</span>
                            <span className="hidden md:inline">Corporate Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="name@company.com"
                            className="border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#9d0b0b]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] md:text-xs font-bold tracking-widest text-gray-600 uppercase">
                            <span className="md:hidden">Interested In</span>
                            <span className="hidden md:inline">Inquiry Type</span>
                        </label>
                        <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 text-sm bg-white focus:outline-none focus:border-[#9d0b0b] appearance-none"
                        >
                            <option>Bulk Supply Inquiry</option>
                            <option>Export Inquiry</option>
                            <option>OEM Partnership</option>
                            <option>Wholesale & Distribution</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] md:text-xs font-bold tracking-widest text-gray-600 uppercase">Company Name</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Business Name"
                            className="border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#9d0b0b]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 flex-grow">
                    <label className="text-[10px] md:text-xs font-bold tracking-widest text-gray-600 uppercase">
                        <span className="md:hidden">Requirements / Message</span>
                        <span className="hidden md:inline">Inquiry Details</span>
                    </label>
                    <textarea
                        rows="6"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        required
                        placeholder="Please provide details about your business requirements, product quantities, or specific bicycle spare parts you are looking for..."
                        className="border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#9d0b0b] resize-none h-full"
                    ></textarea>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-2">
                    <button type="submit" className="w-full md:w-auto bg-[#9d0b0b] text-white px-8 py-4 text-xs font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-red-800 transition-colors">
                        SUBMIT INQUIRY
                        <SendIcon />
                    </button>
                    <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-wide max-w-[150px] leading-tight">
                        A specialist will respond within 24 business hours.
                    </p>
                </div>
            </form>
        </div>
    );
};
