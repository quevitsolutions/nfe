import React from "react";
import Link from "next/link";

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8 md:p-16 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-blue-400 hover:text-blue-300">← Back to Home</Link>
                </div>

                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
                    Disclaimer & Risk Disclosure
                </h1>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. General Information</h2>
                        <p>
                            Great Income Club ("The Platform") is a decentralized application (DApp) running on the Binance Smart Chain (BSC).
                            The Platform operates automatically via smart contracts and cannot be stopped, altered, or censored by any single entity.
                            Participation in the Platform is entirely voluntary.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Not Financial Advice</h2>
                        <p>
                            The information provided on this website and in related materials is for educational and informational purposes only.
                            It does not constitute financial, investment, or legal advice. You should consult with a qualified financial advisor
                            before making any investment decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Risk Warning</h2>
                        <p>
                            Cryptocurrency and smart contract interactions involve significant risk. The value of BNB (Binance Coin) can fluctuate wildly.
                            You should only participate with funds you can afford to lose. Past performance of other users is not indicative of future results.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Community Driven Revenue Sharing</h2>
                        <p>
                            Great Income Club is a "Community Driven Revenue Sharing" model. Income is generated solely through the sale of products/services
                            (membership levels) and the expansion of the user community. There are no guaranteed returns or passive income without
                            community growth and activity.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                        <p>
                            The creators, developers, and promoters of Great Income Club shall not be held liable for any losses, damages, or claims
                            arising from your use of the Platform, including but not limited to smart contract bugs, blockchain network failures,
                            or loss of private keys.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-gray-700">
                        <p className="text-sm text-gray-500">
                            By continuing to use this website and connecting your wallet, you acknowledge that you have read, understood, and agreed to this disclaimer.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
