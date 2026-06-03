import React from 'react';
import { Navbar } from '../../components/home/Navbar';
import { HeroSection } from '../../components/home/HeroSection';
import { ValuePropositions } from '../../components/home/ValuePropositions';
import { CoreDivisions } from '../../components/home/CoreDivisions';
import { GlobalLogistics } from '../../components/home/GlobalLogistics';
import { Footer } from '../../components/home/Footer';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Navbar />
            <HeroSection />
            <ValuePropositions />
            <CoreDivisions />
            <GlobalLogistics />
            <Footer />
        </div>
    );
}
