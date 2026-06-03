"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MenuIcon, SearchIcon, CloseIcon } from '../icons';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path) => pathname === path;
    const linkClass = (path) => isActive(path) ? "text-[#9d0b0b]" : "text-gray-500 hover:text-gray-800";

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/parts?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    };

    const handleIconClick = (e) => {
        if (!isSearchOpen) {
            e.preventDefault();
            setIsSearchOpen(true);
        } else if (!searchQuery.trim()) {
            e.preventDefault();
            setIsSearchOpen(false);
        }
    };

    return (
        <nav className="relative z-50 flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
            <div className="flex items-center gap-6">
                <button
                    className="text-[#9d0b0b] md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
                <div className="text-lg md:text-xl font-serif text-[#9d0b0b] font-bold tracking-wide uppercase">
                    Jagraon Cycle Industries
                </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase">
                <Link href="/" className={linkClass("/")}>HOME</Link>
                <Link href="/parts" className={linkClass("/parts")}>PARTS</Link>
                <Link href="/history" className={linkClass("/history")}>HISTORY</Link>
                <Link href="/contact" className={linkClass("/contact")}>CONTACT</Link>
            </div>

            <div className="hidden md:flex items-center justify-end min-w-[300px]">
                <form onSubmit={handleSearch} className="relative flex items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SEARCH PARTS..."
                        className={`transition-all duration-300 ease-in-out border-b border-gray-300 py-2 pr-10 text-sm font-semibold tracking-widest text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#9d0b0b] bg-transparent uppercase ${
                            isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 border-transparent cursor-default'
                        }`}
                        tabIndex={isSearchOpen ? 0 : -1}
                    />
                    <button 
                        type="submit" 
                        className="absolute right-0 text-[#9d0b0b] bg-white p-1"
                        onClick={handleIconClick}
                    >
                        <SearchIcon />
                    </button>
                </form>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden flex flex-col px-8 py-6 gap-6 text-sm font-semibold tracking-wider uppercase">
                    <Link href="/" className={linkClass("/")} onClick={() => setIsMenuOpen(false)}>HOME</Link>
                    <Link href="/parts" className={linkClass("/parts")} onClick={() => setIsMenuOpen(false)}>PARTS</Link>
                    <Link href="/history" className={linkClass("/history")} onClick={() => setIsMenuOpen(false)}>HISTORY</Link>
                    <Link href="/contact" className={linkClass("/contact")} onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
                </div>
            )}
        </nav>
    );
};
