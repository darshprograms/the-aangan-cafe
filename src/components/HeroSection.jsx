import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden shadow-xl">
            <img
                src="/CafeImage.jpg"
                alt="Aangan Cafe Ambiance"
                className="w-full h-full object-cover transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end justify-center pb-24 md:pb-32">
                <div className="text-center px-4 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 drop-shadow-lg tracking-wider">
                        EXPERIENCE THE VIBE
                    </h2>
                    <p className="text-accent-light italic text-lg md:text-xl font-light tracking-wide">
                        Good Food. Great Coffee. Amazing Company.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
