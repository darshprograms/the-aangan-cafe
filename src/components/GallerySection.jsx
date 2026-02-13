import React from 'react';

import cafePic from '../assets/gallery/CafePic.png';
import friedRice from '../assets/gallery/FriedRice.png';
import paneerChili from '../assets/gallery/PaneerChili.png';
import paniPuri from '../assets/gallery/PaniPuri.png';
import sticks from '../assets/gallery/Sticks.png';

const GallerySection = () => {
    const images = [
        { src: cafePic, alt: "Aangan Cafe Ambience" },
        { src: friedRice, alt: "Delicious Fried Rice" },
        { src: paneerChili, alt: "Spicy Paneer Chili" },
        { src: paniPuri, alt: "Crispy Pani Puri" },
        { src: sticks, alt: "Tasty Snacks" },
    ];

    return (
        <section id="gallery" className="text-center space-y-8 pt-8 pb-16 scroll-mt-20">
            <h2 className="text-4xl md:text-5xl font-serif text-accent drop-shadow-md tracking-wider">
                Gallery
            </h2>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg aspect-[4/3] border-2 border-primary-light/30">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <span className="text-white font-serif text-lg tracking-wide">{image.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
