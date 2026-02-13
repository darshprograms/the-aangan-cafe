import React, { useState } from 'react';

const MobileMenu = ({ onOpenPolicies, onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-accent p-1 border border-accent/20 rounded hover:bg-accent/10 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
                </svg>
            </button>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <nav className="md:hidden bg-primary-dark border-t border-accent/20 absolute top-full left-0 w-full shadow-xl z-50">
                    <div className="flex flex-col py-4">
                        <button
                            className="text-left px-6 py-3 text-sm font-medium tracking-wide hover:bg-accent/10 hover:text-accent transition-colors border-l-4 border-transparent hover:border-accent"
                            onClick={() => {
                                setIsMenuOpen(false);
                                onNavigate('home');
                            }}
                        >
                            Home
                        </button>
                        {['About', 'Menu', 'Gallery', 'Reviews', 'Contact', 'Payment'].map((item) => (
                            <button
                                key={item}
                                className="text-left px-6 py-3 text-sm font-medium tracking-wide hover:bg-accent/10 hover:text-accent transition-colors border-l-4 border-transparent hover:border-accent"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    onNavigate(item.toLowerCase());
                                }}
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            className="text-left px-6 py-3 text-sm font-medium tracking-wide hover:bg-accent/10 hover:text-accent transition-colors border-l-4 border-transparent hover:border-accent text-accent"
                            onClick={() => {
                                setIsMenuOpen(false);
                                onOpenPolicies();
                            }}
                        >
                            Policies & Info
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
};

export default MobileMenu;
