'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/home/Navbar';
import { Footer } from '../../components/home/Footer';
import { PartsSidebar } from '../../components/parts/PartsSidebar';
import { PartsCatalogue } from '../../components/parts/PartsCatalogue';
import partsData from '../../data/parts.json';

const DEFAULT_FILTERS = {
    search: '',
    category: 'ALL CATEGORIES',
    material: 'ALL MATERIALS',
    application: 'ALL APPLICATIONS',
};

function PartsContent() {
    const categories = Object.keys(partsData);
    const searchParams = useSearchParams();
    
    const filters = {
        search: searchParams.get('search') || '',
        category: searchParams.get('category') || 'ALL CATEGORIES',
        material: searchParams.get('material') || 'ALL MATERIALS',
        application: searchParams.get('application') || 'ALL APPLICATIONS',
    };

    return (
        <>
            <div className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-2">
                        <PartsSidebar
                            categories={categories}
                            initialFilters={filters}
                        />
                    </div>

                    {/* Catalogue */}
                    <div className="lg:col-span-4">
                        <PartsCatalogue
                            data={partsData}
                            filters={filters}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default function PartsPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
            <Navbar />
            <Suspense fallback={<div className="flex-grow flex items-center justify-center">Loading catalogue...</div>}>
                <PartsContent />
            </Suspense>
            <Footer />
        </div>
    );
}
