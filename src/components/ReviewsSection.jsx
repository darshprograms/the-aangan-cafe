import React from 'react';

const ReviewsSection = () => {
    const [reviews, setReviews] = React.useState(() => {
        // Initialize from local storage or default data
        const savedReviews = localStorage.getItem('cafeReviews');
        return savedReviews ? JSON.parse(savedReviews) : [
            { id: 1, name: "Rahul S.", text: "Best place for chai and conversation! The vibe is unmatched.", date: "2024-01-15" },
            { id: 2, name: "Priya M.", text: "Love the Chinese starters. A perfect evening spot.", date: "2024-02-10" }
        ];
    });

    const [newReview, setNewReview] = React.useState({ name: '', text: '' });

    React.useEffect(() => {
        // Save to local storage whenever reviews change
        localStorage.setItem('cafeReviews', JSON.stringify(reviews));
    }, [reviews]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReview.name.trim() || !newReview.text.trim()) return;

        const reviewToAdd = {
            id: Date.now(),
            name: newReview.name,
            text: newReview.text,
            date: new Date().toLocaleDateString()
        };

        setReviews([reviewToAdd, ...reviews]);
        setNewReview({ name: '', text: '' });
    };

    return (
        <section id="reviews" className="min-h-screen pt-8 pb-16 scroll-mt-20">
            <h2 className="text-4xl md:text-5xl font-serif text-accent drop-shadow-md tracking-wider text-center mb-12">
                Customer Reviews
            </h2>

            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Left Column: Add Review Form */}
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-accent/20 shadow-xl h-fit sticky top-24">
                        <h3 className="text-2xl font-serif text-accent mb-6 flex items-center gap-3">
                            <span>✍️</span> Write a Review
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-accent/80 mb-2 font-medium">Your Name</label>
                                <input
                                    type="text"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    placeholder="Enter your name"
                                    className="w-full bg-white/10 border border-accent/30 rounded-xl px-4 py-3 text-primary-dark placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-accent/80 mb-2 font-medium">Your Experience</label>
                                <textarea
                                    value={newReview.text}
                                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                                    placeholder="Share your thoughts..."
                                    rows="4"
                                    className="w-full bg-white/10 border border-accent/30 rounded-xl px-4 py-3 text-primary-dark placeholder-gray-400 focus:outline-none focus:border-accent transition-colors resize-none"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-accent text-primary font-bold py-3 rounded-xl hover:bg-white transition-all transform hover:scale-[1.02] shadow-lg"
                            >
                                Post Review
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Reviews List */}
                    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        <h3 className="text-2xl font-serif text-accent mb-6 flex items-center gap-3 sticky top-0 bg-primary z-10 py-2">
                            <span>💬</span> Recent Feedback
                        </h3>
                        {reviews.length === 0 ? (
                            <p className="text-center text-gray-400 italic">No reviews yet. Be the first to add one!</p>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id} className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-accent hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-bold text-lg text-primary-dark">{review.name}</h4>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                    <p className="text-gray-600 italic leading-relaxed">"{review.text}"</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
