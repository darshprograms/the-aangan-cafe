import React from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const ReviewsSection = () => {
    const [reviews, setReviews] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [newReview, setNewReview] = React.useState({ name: '', text: '' });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    React.useEffect(() => {
        // Subscribe to real-time updates from Firestore
        const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reviewsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReviews(reviewsData);
            setIsLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newReview.name.trim() || !newReview.text.trim()) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "reviews"), {
                name: newReview.name,
                text: newReview.text,
                date: new Date().toLocaleDateString(),
                timestamp: serverTimestamp()
            });
            setNewReview({ name: '', text: '' });
        } catch (error) {
            console.error("Error adding review: ", error);
            alert("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="reviews" className="min-h-screen pt-8 pb-16 scroll-mt-20">
            <h2 className="text-4xl md:text-5xl font-serif text-accent drop-shadow-md tracking-wider text-center mb-12">
                Customer Reviews
            </h2>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 w-full mx-auto">
                    {/* Left Column: Add Review Form */}
                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-accent/20 shadow-xl h-fit md:sticky md:top-24">
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
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-accent text-primary font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
                            >
                                {isSubmitting ? 'Posting...' : 'Post Review'}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Reviews List */}
                    <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        <h3 className="text-2xl font-serif text-accent mb-6 flex items-center gap-3 py-2">
                            <span>💬</span> Recent Feedback
                        </h3>
                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p className="text-accent/80 animate-pulse">Loading reviews...</p>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-400 italic mb-2">No reviews yet.</p>
                                <p className="text-accent/60 text-sm">Be the first to share your experience!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {reviews.map((review) => (
                                    <div key={review.id} className="bg-[#f5f5f5] p-6 rounded-2xl shadow-md border-l-4 border-accent hover:shadow-lg transition-shadow h-full">
                                        <div className="flex justify-between items-start mb-3 gap-3">
                                            <h4 className="font-bold text-lg text-primary-dark break-words">{review.name}</h4>
                                            <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{review.date}</span>
                                        </div>
                                        <p className="text-gray-600 italic leading-relaxed break-words">"{review.text}"</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
