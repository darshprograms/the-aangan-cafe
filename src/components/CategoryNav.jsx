import React from 'react';

const CategoryNav = ({ categories }) => {
    // Initialize active category; handle potential empty array
    const [activeCategory, setActiveCategory] = React.useState(categories?.[0]?.id);

    // Update active category when the categories prop changes (e.g., Food <-> Drinks toggle)
    React.useEffect(() => {
        if (categories && categories.length > 0) {
            setActiveCategory(categories[0].id);
        }
    }, [categories]);

    const scrollToSection = (id) => {
        setActiveCategory(id);
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 180; // Increased offset for double nav (Header + TypeToggle + CategoryNav)
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-40 bg-primary/95 backdrop-blur-sm py-4">
            <div className={`overflow-x-auto whitespace-nowrap px-4 scrollbar-hide flex gap-3 py-2 ${categories && categories.length <= 5 ? 'justify-start md:justify-center' : 'justify-start'}`}>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => scrollToSection(category.id)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 shadow-sm whitespace-nowrap ${activeCategory === category.id
                            ? 'bg-[#FFC107] text-white scale-105'
                            : 'bg-primary-dark/40 text-gray-200 border border-accent/20 hover:bg-primary-dark hover:text-white hover:border-accent/40'
                            }`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default CategoryNav;
