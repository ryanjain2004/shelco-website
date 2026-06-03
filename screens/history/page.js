import React from 'react';
import { Navbar } from '../../components/home/Navbar';
import { Footer } from '../../components/home/Footer';
import { HistoryHero } from '../../components/history/HistoryHero';
import { StatsSection } from '../../components/history/StatsSection';
import { OurJourney } from '../../components/history/OurJourney';
import { AdvancedInfrastructure } from '../../components/history/AdvancedInfrastructure';
import { QualityStandards } from '../../components/history/QualityStandards';
import { GlobalNetwork } from '../../components/history/GlobalNetwork';

export default function HistoryPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Navbar />
            <HistoryHero />
            <StatsSection />
            <OurJourney />
            <AdvancedInfrastructure />
            <QualityStandards />
            <GlobalNetwork />
            <Footer />
        </div>
    );
}
