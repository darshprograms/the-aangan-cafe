import React, { useState } from 'react';

const InfoModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('why-choose');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-primary-dark border border-accent/30 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-accent/20 bg-primary">
                    <h3 className="text-xl md:text-2xl font-serif text-accent">Information & Policies</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-accent/20">
                    <button
                        className={`flex-1 py-4 text-sm md:text-base font-serif tracking-wide transition-colors ${activeTab === 'why-choose'
                                ? 'bg-accent/10 text-accent border-b-2 border-accent'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        onClick={() => setActiveTab('why-choose')}
                    >
                        WHY CHOOSE US
                    </button>
                    <button
                        className={`flex-1 py-4 text-sm md:text-base font-serif tracking-wide transition-colors ${activeTab === 'policies'
                                ? 'bg-accent/10 text-accent border-b-2 border-accent'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        onClick={() => setActiveTab('policies')}
                    >
                        OUR POLICIES
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    {activeTab === 'why-choose' && (
                        <div className="space-y-6 text-gray-200 font-light">
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span>We only use the <strong className="text-white">finest & branded quality ingredients</strong>.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span>We Use Only <strong className="text-white">RO Filtered water</strong> for drinking and food Preparation.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span><strong className="text-white">Quality Pani Puri:</strong> Our puri is also used of premium brand to maintain crispness and authentic taste.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span><strong className="text-white">Hygiene Standards:</strong> Our kitchen maintains strict hygiene protocols. All staff members are trained in food safety standards and maintain the highest level of cleanliness.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span><strong className="text-white">Fresh Vegetables:</strong> We source fresh, seasonal vegetables on daily basis. All produce is thoroughly washed and sanitized before use.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span><strong className="text-white">Homemade Flavors:</strong> For all the chaat and sandwiches chutneys are made fresh daily in our kitchen never stored for more than required.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span>For Healthy section we only use <strong className="text-white">olive oil</strong>.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span>All the Dairy Products like Paneer, Dahi, Milk, Butter, Cheese etc. are <strong className="text-white">branded quality</strong>.</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {activeTab === 'policies' && (
                        <div className="space-y-6 text-gray-200 font-light">
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-red-400 mt-1">⚠</span>
                                    <span><strong className="text-white">No Outside Items:</strong> Outside food and beverages are strictly prohibited to maintain food quality and safety standards.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span><strong className="text-white">Quality Over Discounts:</strong> We believe in providing authentic quality. Our pricing reflects the premium ingredients and meticulous preparation involved—no shortcuts or compromises.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span>Once Order Placed, it will take a minimum of <strong className="text-white">20 mins</strong> to serve you better.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span>We are not responsible for any lost & left valuables.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-accent mt-1">✦</span>
                                    <span><strong className="text-white">Parcel charges:</strong> ₹10/- per container parcel charges will be applicable.</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
