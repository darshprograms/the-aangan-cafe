import React, { useState, useMemo } from 'react';
import CategoryNav from './CategoryNav';
import MenuSection from './MenuSection';
import { menuCategories } from '../data/menuData';

const FoodMenu = () => {
    const [menuType, setMenuType] = useState('food'); // 'food' or 'drink'

    const filteredCategories = useMemo(() => {
        return menuCategories.filter(category => category.type === menuType);
    }, [menuType]);

    return (
        <section className="min-h-screen">
            <div className="bg-primary pt-8 pb-8 text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-serif text-accent drop-shadow-lg tracking-wider">
                    Our Menu
                </h1>

                {/* Menu Type Toggle */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setMenuType('food')}
                        className={`px-8 py-2 rounded-full font-serif text-lg tracking-wide transition-all duration-300 border-2 ${menuType === 'food'
                            ? 'bg-accent text-primary border-accent'
                            : 'bg-transparent text-accent border-accent hover:bg-accent/10'
                            }`}
                    >
                        Food
                    </button>
                    <button
                        onClick={() => setMenuType('drink')}
                        className={`px-8 py-2 rounded-full font-serif text-lg tracking-wide transition-all duration-300 border-2 ${menuType === 'drink'
                            ? 'bg-accent text-primary border-accent'
                            : 'bg-transparent text-accent border-accent hover:bg-accent/10'
                            }`}
                    >
                        Drinks
                    </button>
                </div>
            </div>

            {/* Pass filtered categories to Nav */}
            <CategoryNav categories={filteredCategories} />

            <div className="container mx-auto px-4 py-8 space-y-12 max-w-4xl">
                <div className="text-center mb-8 italic text-accent-light opacity-80 text-sm">
                    Scroll to explore our delicious {menuType === 'food' ? 'dishes' : 'beverages'}
                </div>

                {filteredCategories.map((category) => (
                    <MenuSection key={category.id} category={category} />
                ))}

                {filteredCategories.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        No items found in this section.
                    </div>
                )}
            </div>
        </section>
    );
};

export default FoodMenu;
