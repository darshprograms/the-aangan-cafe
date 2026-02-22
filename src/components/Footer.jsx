import React from 'react';
import { contactNumber, address, socialLinks } from '../data/menuData';

const Footer = () => {
    return (
        <footer className="bg-[#1A2F2B] text-gray-300 pt-16 pb-8 border-t border-[#D4AF37]/20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Aangan Cafe */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif text-[#D4AF37]">Aangan Cafe</h2>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Where every bite feels made with love.
                            Discover comfort, taste, and warmth.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif text-[#D4AF37] opacity-80">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Menu</a></li>
                            <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Order/Reserve Table</a></li>
                            <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Gallery</a></li>
                            <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Reviews</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Hours */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif text-[#D4AF37] opacity-80">Hours</h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            {/* Matching the image layout but using our data/placeholders if specific ones aren't provided. 
                                User image had specific times, I will use those from image as they look realistic for a cafe */}
                            <div className="flex justify-between max-w-[200px]">
                                <span>Mon-Fri:</span>
                                <span>7:00 AM - 10:00 PM</span>
                            </div>
                            <div className="flex justify-between max-w-[200px]">
                                <span>Sat-Sun:</span>
                                <span>8:00 AM - 11:00 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Contact */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-serif text-[#D4AF37] opacity-80">Contact</h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            <p>{contactNumber}</p>
                            <p>info@aangancafe.com</p>
                            <p>{address}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <div>
                        &copy; {new Date().getFullYear()} Aangan Cafe. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
