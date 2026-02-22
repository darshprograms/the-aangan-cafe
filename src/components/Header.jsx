import React, { useState } from 'react';
import { cafeName, caption } from '../data/menuData';
import MobileMenu from './MobileMenu';
import InfoModal from './InfoModal';

// Using a simple mandala-like SVG or placeholder if no image is available yet.
// Since user provided an image, we can try to use it if we had it as a file.
// For now, I'll use a styled text representation.

const Header = ({ onNavigate, activeView }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
                <div className="w-full px-4 md:px-8 py-3 flex justify-between items-center">
                    {/* Left Side: Logo and Brand Name */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="Aangan Logo"
                            className="h-12 w-auto object-contain rounded-full border border-accent/30"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-widest text-accent leading-none">
                                AANGAN CAFE
                            </h1>
                            <span className="text-[0.6rem] md:text-xs font-sans tracking-[0.2em] text-gray-300 uppercase opacity-80">
                                {caption}
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide">
                        <button
                            onClick={() => onNavigate('home')}
                            className={`hover:text-accent transition-colors duration-300 relative group py-1 ${activeView === 'home' ? 'text-accent' : ''}`}
                        >
                            Home
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${activeView === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                        </button>
                        {['About', 'Menu', 'Gallery', 'Order/Reserve', 'Reviews', 'Contact', 'Payment'].map((item) => (
                            <button
                                key={item}
                                onClick={() => onNavigate(item === 'Order/Reserve' ? 'order' : item.toLowerCase())}
                                className={`hover:text-accent transition-colors duration-300 relative group py-1 ${activeView === (item === 'Order/Reserve Table' ? 'order' : item.toLowerCase()) ? 'text-accent' : ''}`}
                            >
                                {item}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 ${activeView === (item === 'Order/Reserve Table' ? 'order' : item.toLowerCase()) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </button>
                        ))}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="hover:text-accent transition-colors duration-300 relative group py-1 text-accent border border-accent/30 px-3 rounded hover:bg-accent hover:text-primary"
                        >
                            Policies
                        </button>
                    </nav>

                    <MobileMenu onOpenPolicies={() => setIsModalOpen(true)} onNavigate={onNavigate} />

                </div>
            </header>

            <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Header;
