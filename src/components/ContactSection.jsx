import React from 'react';
import { contactNumber, address, socialLinks } from '../data/menuData';

const ContactSection = () => {
    return (
        <section id="contact" className="max-w-6xl mx-auto pt-8 pb-16">
            <h2 className="text-4xl font-serif text-accent drop-shadow-sm text-center mb-12">Get in Touch</h2>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Left Column: Contact Info */}
                <div className="space-y-10 text-left">
                    {/* Location */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-serif text-accent tracking-wide">Location</h3>
                        <p className="text-gray-200 leading-relaxed text-lg">
                            {address}
                        </p>
                    </div>

                    {/* Hours */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-serif text-accent tracking-wide">Hours</h3>
                        <div className="text-gray-200 text-lg space-y-1">
                            <p>Monday - Sunday</p>
                            <p>11:00 AM - 11:00 PM</p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-serif text-accent tracking-wide">Contact</h3>
                        <div className="text-gray-200 text-lg space-y-1">
                            <p>Phone: {contactNumber}</p>
                            <p>Email: info@aangancafe.com</p>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className="space-y-3">
                        <h3 className="text-2xl font-serif text-accent tracking-wide">Follow Us</h3>
                        <div className="flex gap-6">
                            {socialLinks.instagram && (
                                <a
                                    href={`https://instagram.com/${socialLinks.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-white transition-colors text-lg"
                                >
                                    Instagram
                                </a>
                            )}
                            {socialLinks.facebook && (
                                <a
                                    href={`https://facebook.com/${socialLinks.facebook}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-white transition-colors text-lg"
                                >
                                    Facebook
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="bg-[#FFF8DC] p-8 rounded-lg shadow-lg">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-[#8B4513] font-bold">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A460] bg-white text-gray-800 placeholder-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-[#8B4513] font-bold">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="your@email.com"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A460] bg-white text-gray-800 placeholder-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-[#8B4513] font-bold">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Your Phone Number"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A460] bg-white text-gray-800 placeholder-gray-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-[#8B4513] font-bold">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                placeholder="Your Message"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A460] bg-white text-gray-800 placeholder-gray-400 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-[#F4A460] text-white font-bold py-3 rounded-md hover:bg-[#E08E45] transition-colors shadow-md text-lg"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
