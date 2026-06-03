import React from 'react';
import { Navbar } from '../../components/home/Navbar';
import { Footer } from '../../components/home/Footer';
import { ContactHeader } from '../../components/contact/ContactHeader';
import { ContactForm } from '../../components/contact/ContactForm';
import { ContactInfo } from '../../components/contact/ContactInfo';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
            <Navbar />
            
            <div className="flex-grow">
                <ContactHeader />
                
                <div className="max-w-7xl mx-auto px-6 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        <ContactForm />
                        <ContactInfo />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
