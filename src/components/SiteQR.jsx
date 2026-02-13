import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code";

const SiteQR = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-50 bg-white text-primary-dark p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all border-2 border-primary-dark"
                title="Generate Site QR Code"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM6 6h2v2H6V6zm0 12h2v2H6v-2zm12-12h2v2h-2V6zM6 6v2m0 0v2m0-2h2m-2-2v2m2 2v2m2-2h2m-2 0v2m-2 2v2m2-2h2m-2 0v2m-2 2v2m2-2h2m-2 0v2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3z" />
                </svg>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsOpen(false)}>
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-6 animate-fade-in relative" onClick={e => e.stopPropagation()}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-2xl font-serif text-primary-dark font-bold flex items-center justify-center gap-2">
                    <span>🍹</span> Aangan Food Court <span>🍽️</span>
                </h3>
                <p className="text-gray-600 text-sm">Scan this code to open the menu directly.</p>

                <div className="bg-white p-4 border-2 border-primary-dark/10 rounded-xl inline-block">
                    <QRCode
                        value="https://the-aangan-cafe.vercel.app/?view=menu"
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox={`0 0 256 256`}
                    />
                </div>

     
            </div>
        </div>
    );
};

export default SiteQR;
