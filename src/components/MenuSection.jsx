import React from 'react';

const MenuSection = ({ category }) => {
    return (
        <div id={category.id} className="mb-12 scroll-mt-24 px-4">
            <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-accent w-12 opacity-50"></div>
                <h2 className="mx-4 text-2xl font-serif font-bold text-accent uppercase tracking-widest text-center">
                    {category.title}
                </h2>
                <div className="h-px bg-accent w-12 opacity-50"></div>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
                {category.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-baseline border-b border-accent/20 pb-2 hover:bg-white/5 transition-colors p-2 rounded">
                        <div className="flex-1">
                            <h3 className="text-lg font-serif text-white tracking-wide">{item.name}</h3>
                            {item.description && <p className="text-xs text-gray-300 italic">{item.description}</p>}
                        </div>

                        {item.price > 0 ? (
                            <div className="text-xl font-bold text-accent ml-4 font-serif">
                                ₹{item.price}
                            </div>
                        ) : (
                            <span className="text-xs text-gray-400 ml-4">Coming Soon</span>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuSection;
