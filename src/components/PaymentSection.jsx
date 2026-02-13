import React from 'react';

const PaymentSection = () => {
    return (
        <section id="payment" className="text-center space-y-4 pt-16 h-[calc(100vh-140px)] flex flex-col justify-center items-center">
            <h2 className="text-4xl font-serif text-accent drop-shadow-sm">Payment</h2>
            <div className="bg-white/5 p-6 rounded-2xl border border-accent/30 max-w-sm mx-auto flex flex-col items-center shadow-xl backdrop-blur-sm">
                <div className="bg-white p-2 rounded-xl mb-4 shadow-2xl">
                    <img
                        src="/payment-qr.png"
                        alt="Payment QR Code"
                        className="w-56 h-auto object-contain rounded-lg"
                    />
                </div>
                <p className="text-lg text-accent font-serif tracking-wide">Scan to Pay via UPI</p>
                <div className="flex gap-3 mt-2 text-xs text-gray-400 uppercase tracking-widest">
                    <span>GPay</span> • <span>PhonePe</span> • <span>Paytm</span>
                </div>
            </div>
        </section>
    );
};

export default PaymentSection;
