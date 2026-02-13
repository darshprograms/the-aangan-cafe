import React from 'react';

// Placeholder or imported image
// import aboutImage from '../assets/about-image.jpg'; // Uncomment when image is added

const AboutSection = () => {
    return (
        <section id="about" className="container mx-auto px-4 pb-16 pt-8 max-w-6xl">
            <h2 className="text-4xl font-serif text-accent drop-shadow-sm text-center mb-12 md:hidden">About Us</h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Image */}
                <div className="relative group mt-24">

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-accent/20">
                        {/* Replace src with your actual image path */}
                        <img
                            src="/CafeName.png"
                            alt="Aangan Cafe Ambiance"
                            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white font-serif text-xl tracking-wider drop-shadow-md">
                            The Aangan Food Court
                        </div>
                    </div>
                </div>

                {/* Right Column: Text Content */}
                <div className="space-y-8 text-left">
                    <h2 className="text-4xl md:text-5xl font-serif text-accent drop-shadow-sm hidden md:block">
                        Our Story
                    </h2>

                    <div className="text-gray-200 leading-relaxed text-lg space-y-6 font-light">
                        <p>
                            <span className="text-accent font-serif font-bold text-xl">The Aangan</span> started as a simple dream — to create a sanctuary where every sip of chai feels like home.
                            Nestled in the heart of <span className="font-semibold text-white">Sambhajinagar</span>, we are more than just a cafe; we are a community.
                        </p>

                        <blockquote className="border-l-4 border-accent pl-4 italic text-white/90 my-6 bg-white/5 py-4 pr-2 rounded-r-lg">
                            "What began as a small chai tapri has blossomed into a 'ghar ka aangan'—a place for conversations, laughter, and memories."
                        </blockquote>

                        <p>
                            Whether you're here for a quick break or a long evening with friends, our open-air ambiance and carefully crafted menu are designed to bring you comfort and joy.
                        </p>

                        <div className="flex gap-8">
                            <div>
                                <h3 className="text-3xl font-serif text-accent font-bold">500+</h3>
                                <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Daily Customers</p>
                            </div>
                            <div className="w-px bg-white/20"></div>
                            <div>
                                <h3 className="text-3xl font-serif text-accent font-bold">50+</h3>
                                <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Menu Items</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
