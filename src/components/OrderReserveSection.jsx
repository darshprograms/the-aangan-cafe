import React, { useState, useMemo } from 'react';
import { menuCategories, contactNumber } from '../data/menuData';

const OrderReserveSection = () => {
    const [step, setStep] = useState(1); // 1: Info, 2: Menu, 3: Payment, 4: Success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        guests: '',
        date: '',
        time: '',
        requests: ''
    });
    const [sendingMessage, setSendingMessage] = useState(false);
    const [errors, setErrors] = useState({});
    const [cart, setCart] = useState([]);
    const [flowType, setFlowType] = useState(''); // 'book' or 'reserve'
    const [menuType, setMenuType] = useState('food'); // 'food' or 'drink'
    const [hasPaid, setHasPaid] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showScrollPrompt, setShowScrollPrompt] = useState(false);
    const [hasShownScrollPrompt, setHasShownScrollPrompt] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (type) => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is mandatory';
        if (!formData.guests) newErrors.guests = 'Number of guests is mandatory';
        if (!formData.date) newErrors.date = 'Date is mandatory';
        if (!formData.time) newErrors.time = 'Time is mandatory';

        if (type === 'reserve') {
            if (!formData.email.trim()) newErrors.email = 'Email is mandatory';
            if (!formData.phone.trim()) newErrors.phone = 'Phone is mandatory';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAction = (type) => {
        if (validate(type)) {
            setFlowType(type);
            setStep(2);
        }
    };

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.name === item.name);
            if (existing) {
                return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, quantity: 1 }];
        });

        // Show scroll prompt on mobile only once
        if (!hasShownScrollPrompt) {
            setShowScrollPrompt(true);
            setHasShownScrollPrompt(true);
            setTimeout(() => setShowScrollPrompt(false), 3000);
        }
    };

    const removeFromCart = (itemName) => {
        setCart(prev => {
            const existing = prev.find(i => i.name === itemName);
            if (existing.quantity > 1) {
                return prev.map(i => i.name === itemName ? { ...i, quantity: i.quantity - 1 } : i);
            }
            return prev.filter(i => i.name !== itemName);
        });
    };

    // WHATSAPP CONFIG
    const OWNER_PHONE = contactNumber.replace(/\D/g, '');
    const UPI_ID = 'nidhi005tank@okhdfcbank';

    const handleCopy = () => {
        navigator.clipboard.writeText(UPI_ID);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sendWhatsAppMessage = () => {
        const orderDetails = cart.map(item => `• ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join('%0A');
        const message = `*🔔 New Order/Reservation*%0A%0A` +
            `📍 *Type:* ${flowType === 'book' ? 'Booking' : 'Reservation'}%0A` +
            `👤 *Name:* ${formData.name}%0A` +
            `📞 *Phone:* ${formData.phone}%0A` +
            `👥 *Guests:* ${formData.guests}%0A` +
            `📅 *Date:* ${formData.date}%0A` +
            `⏰ *Time:* ${formData.time}%0A` +
            (formData.requests ? `💬 *Requests:* ${formData.requests}%0A` : '') +
            (cart.length > 0 ? `%0A📝 *Order Details:*%0A${orderDetails}%0A%0A💰 *Total Price:* ₹${totalPrice}%0A✅ *Payment Status:* Confirmed by customer via UPI.` : '');

        const whatsappUrl = `https://wa.me/${OWNER_PHONE}?text=${message}`;
        window.open(whatsappUrl, '_blank');
        return true;
    };


    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cart]);

    const renderStep1 = () => (
        <div className="max-w-2xl mx-auto bg-primary-light p-6 rounded-xl border border-accent/20 shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-serif font-bold text-accent mb-6 text-center">Order or Reserve</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-300">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`bg-primary border ${errors.name ? 'border-red-500' : 'border-accent/30'} rounded p-2 focus:outline-none focus:border-accent`}
                        placeholder="Your Name"
                    />
                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-300">Email {flowType === 'reserve' ? '*' : ''}</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`bg-primary border ${errors.email ? 'border-red-500' : 'border-accent/30'} rounded p-2 focus:outline-none focus:border-accent`}
                        placeholder="Your Email"
                    />
                    {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-300">Phone No {flowType === 'reserve' ? '*' : ''}</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`bg-primary border ${errors.phone ? 'border-red-500' : 'border-accent/30'} rounded p-2 focus:outline-none focus:border-accent`}
                        placeholder="Your Phone Number"
                    />
                    {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-300">No. of Guests *</label>
                    <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className={`bg-primary border ${errors.guests ? 'border-red-500' : 'border-accent/30'} rounded p-2 focus:outline-none focus:border-accent`}
                        placeholder="Number of Guests"
                    />
                    {errors.guests && <span className="text-xs text-red-500">{errors.guests}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-300">Date *</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`bg-primary border ${errors.date ? 'border-red-500' : 'border-accent/30'} rounded p-2 focus:outline-none focus:border-accent`}
                    />
                    {errors.date && <span className="text-xs text-red-500">{errors.date}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-300">Time *</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className={`bg-primary border ${errors.time ? 'border-red-500' : 'border-accent/30'} rounded p-2 focus:outline-none focus:border-accent`}
                    />
                    {errors.time && <span className="text-xs text-red-500">{errors.time}</span>}
                </div>
            </div>
            <div className="mt-4 flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">Special Requests</label>
                <textarea
                    name="requests"
                    value={formData.requests}
                    onChange={handleInputChange}
                    className="bg-primary border border-accent/30 rounded p-2 focus:outline-none focus:border-accent h-24"
                    placeholder="Any special requests or notes?"
                ></textarea>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => handleAction('reserve')}
                    className="bg-transparent border-2 border-accent text-accent px-8 py-3 rounded-lg font-bold hover:bg-accent hover:text-primary transition-all duration-300"
                >
                    Reserve Table
                </button>
                <button
                    onClick={() => handleAction('book')}
                    className="bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-accent-light transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                >
                    Book Now
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => {
        const filteredCategories = menuCategories.filter(cat => cat.type === menuType);
        const getItemQuantity = (itemName) => cart.find(i => i.name === itemName)?.quantity || 0;

        return (
            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 animate-fade-in">
                <div className="flex-grow lg:w-2/3 bg-primary-light p-6 rounded-xl border border-accent/20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-serif font-bold text-accent">Select Menu Items</h2>
                        <button onClick={() => setStep(1)} className="text-gray-400 hover:text-accent transition-colors">← Back</button>
                    </div>

                    {/* Menu Type Tabs */}
                    <div className="flex gap-4 mb-8 border-b border-accent/10">
                        <button
                            onClick={() => setMenuType('food')}
                            className={`pb-2 px-4 font-bold transition-all border-b-2 ${menuType === 'food' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        >
                            Food
                        </button>
                        <button
                            onClick={() => setMenuType('drink')}
                            className={`pb-2 px-4 font-bold transition-all border-b-2 ${menuType === 'drink' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                        >
                            Drinks
                        </button>
                    </div>

                    <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredCategories.map(category => (
                            <div key={category.id}>
                                <h3 className="text-lg font-bold text-accent/80 border-b border-accent/20 mb-4 pb-1">{category.title}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {category.items.map(item => (
                                        <div key={item.name} className="flex justify-between items-center bg-primary/40 p-3 rounded-lg border border-accent/10 hover:border-accent/30 transition-all">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{item.name}</span>
                                                <span className="text-accent text-sm">₹{item.price}</span>
                                            </div>
                                            {getItemQuantity(item.name) > 0 ? (
                                                <div className="flex items-center gap-2 bg-accent/20 rounded-lg p-1 border border-accent/30">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); removeFromCart(item.name); }}
                                                        className="w-8 h-8 flex items-center justify-center rounded bg-accent/20 text-accent hover:bg-accent hover:text-primary transition-all font-bold"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-6 text-center font-bold text-accent">{getItemQuantity(item.name)}</span>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                        className="w-8 h-8 flex items-center justify-center rounded bg-accent text-primary hover:bg-accent-light transition-all font-bold shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="bg-accent/10 text-accent border border-accent/30 px-4 py-1.5 rounded-lg hover:bg-accent hover:text-primary transition-all text-sm font-bold shadow-sm"
                                                >
                                                    Add +
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/3 bg-primary-dark p-6 rounded-xl border border-accent/30 sticky top-24 h-fit shadow-2xl">
                    <h3 className="text-xl font-serif font-bold text-accent mb-4 border-b border-accent/20 pb-2">Your Order</h3>
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                    ) : (
                        <>
                            <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-1">
                                {cart.map(item => (
                                    <div key={item.name} className="flex justify-between items-center text-sm">
                                        <div className="flex flex-col">
                                            <span>{item.name}</span>
                                            <span className="text-xs text-gray-400">₹{item.price} × {item.quantity}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => removeFromCart(item.name)} className="text-accent bg-accent/10 w-6 h-6 rounded flex items-center justify-center border border-accent/30 hover:bg-accent hover:text-primary">-</button>
                                            <span className="w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => addToCart(item)} className="text-accent bg-accent/10 w-6 h-6 rounded flex items-center justify-center border border-accent/30 hover:bg-accent hover:text-primary">+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-accent/20 pt-4 mb-6">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total Price:</span>
                                    <span className="text-accent">₹{totalPrice}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setStep(3)}
                                className="w-full bg-accent text-primary py-3 rounded-lg font-bold hover:bg-accent-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            >
                                Proceed to Payment
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Scroll Prompt */}
                {showScrollPrompt && (
                    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-accent text-primary px-6 py-3 rounded-full font-bold shadow-2xl animate-bounce z-50 flex items-center gap-2 border-2 border-primary whitespace-nowrap">
                        <span>⬇️ Scroll down to check your order</span>
                    </div>
                )}
            </div >
        );
    };

    const renderStep3 = () => (
        <div className="max-w-md mx-auto bg-primary-light p-8 rounded-xl border border-accent/20 text-center shadow-2xl animate-fade-in">
            <h2 className="text-2xl font-serif font-bold text-accent mb-6">Complete Your Payment</h2>

            {/* Step 1: Pay */}
            <div className="mb-8 text-left">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-accent text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">1</span>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Step 1: Make Payment 💰</h3>
                </div>

                <div className="bg-white p-6 rounded-lg inline-block w-full mb-4 border-4 border-accent text-center relative overflow-hidden">
                    {/* Mock QR Code */}
                    <div className="max-w-[220px] mx-auto relative p-2 bg-white rounded-xl shadow-inner border border-gray-100">
                        <img src="/payment-qr.png" alt="Payment QR" className="w-full h-auto rounded-lg" />
                    </div>
                    <p className="text-primary-dark mt-4 font-black text-base uppercase">Scan QR to pay ₹{totalPrice}</p>
                    <p className="text-[10px] text-gray-400 mt-1 leading-tight">
                        (Guaranteed to work with all banks)
                    </p>
                </div>

                {/* Failsafe: Copy UPI ID */}
                <div className="mt-4">
                    <p className="text-gray-400 text-xs mb-2">Or pay manually to this UPI ID:</p>
                    <div className="flex items-center gap-2 bg-primary/30 p-2 rounded-lg border border-accent/10">
                        <code className="text-accent text-sm flex-1 overflow-hidden text-ellipsis">nidhi005tank@okhdfcbank</code>
                        <button
                            onClick={handleCopy}
                            className="bg-accent text-primary px-3 py-1 rounded text-xs font-bold hover:bg-accent-light transition-all"
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Step 2: Confirm */}
            <div className="text-left border-t border-accent/20 pt-8 mt-4">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-accent text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">2</span>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Step 2: Confirm Order ✅</h3>
                </div>

                <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-lg mb-5 flex gap-3 items-start animate-bounce-subtle">
                    <span className="text-xl">⚠️</span>
                    <p className="text-[11px] leading-relaxed text-red-200 font-bold">
                        IMPORTANT: The button below ONLY sends your order details. It does NOT transfer money. Please PAY in Step 1 first!
                    </p>
                </div>

                <p className="text-xs text-gray-400 mb-4 font-medium italic">
                    Once paid, return here, check the box, and click the WhatsApp icon to notify the cafe owner.
                </p>

                <div className="bg-accent/5 p-4 rounded-lg mb-6 border border-accent/20">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={hasPaid}
                            onChange={(e) => setHasPaid(e.target.checked)}
                            className="w-5 h-5 rounded border-accent text-accent focus:ring-accent accent-accent"
                        />
                        <span className="text-sm text-gray-200 group-hover:text-accent transition-colors">
                            I have paid ₹{totalPrice}
                        </span>
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    disabled={!hasPaid}
                    onClick={() => {
                        sendWhatsAppMessage();
                        setStep(4);
                    }}
                    className={`w-full ${hasPaid ? 'bg-green-600 hover:bg-green-700 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-gray-700 cursor-not-allowed opacity-50'} text-white py-4 rounded-lg font-black text-lg transition-all flex items-center justify-center gap-2 uppercase`}
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Send Order Details to Cafe Owner
                </button>
                <button
                    onClick={() => setStep(2)}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                >
                    Wait, let me change my order
                </button>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="max-w-lg mx-auto bg-primary-light p-10 rounded-xl border border-accent/30 text-center shadow-2xl animate-fade-in">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-accent mb-2">Success!</h2>
            <p className="text-xl text-gray-200 mb-6 font-medium">Thank you for your {flowType === 'book' ? 'booking' : 'reservation'}, {formData.name}!</p>

            <div className="bg-green-500/10 p-6 rounded-xl border border-green-500/30 mb-8">
                <p className="text-green-400 font-bold text-lg mb-2">Almost Done!</p>
                <p className="text-gray-300 text-sm">
                    Please make sure to **Send** the message on WhatsApp and **attach your payment screenshot** to help us verify your order instantly.
                </p>
            </div>

            <div className="bg-primary/50 p-4 rounded-lg border border-accent/10 text-left mb-8 space-y-2 text-sm">
                <p><span className="text-accent font-bold">Ref No:</span> #ANG-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><span className="text-accent font-bold">Details:</span> {formData.guests} Guests on {formData.date} at {formData.time}</p>
                {cart.length > 0 && (
                    <p><span className="text-accent font-bold">Total Paid:</span> ₹{totalPrice}</p>
                )}
            </div>

            <div className="flex flex-col items-center gap-4 mb-8">
                <div className="flex items-center justify-center gap-4 text-green-400 text-sm bg-green-400/10 py-3 px-6 rounded-xl border border-green-400/20 w-fit mx-auto">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Order sent to Admin</span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => window.location.href = '/'}
                className="bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-accent-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
                Back to Home
            </button>
        </div>
    );

    return (
        <section className="py-12 px-4 md:px-8">
            <div className="container mx-auto">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
            </div>
        </section>
    );
};

export default OrderReserveSection;
