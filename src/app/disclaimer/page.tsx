import React from "react";
import Link from "next/link";

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-brand-mint text-slate-800 p-8 md:p-16 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 font-black uppercase tracking-widest text-[10px] italic">
                    <Link href="/" className="text-brand-green hover:text-brand-red transition-colors">← Back to Neural Hub</Link>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-brand-red mb-12 uppercase tracking-tighter italic">
                    Risk Disclosure
                </h1>

                <div className="space-y-8 text-slate-500 leading-relaxed font-bold italic">
                    <section>
                        <h2 className="text-xl font-black text-brand-green mb-4 uppercase tracking-widest italic">1. General Information</h2>
                        <p>
                            AIPCore ("The Platform") is a decentralized application (DApp) running on the Binance Smart Chain (BSC).
                            The Platform operates automatically via smart contracts and cannot be stopped, altered, or censored by any single entity.
                            Participation in the Platform is entirely voluntary.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-brand-green mb-4 uppercase tracking-widest italic">2. Not Financial Advice</h2>
                        <p>
                            The information provided on this website and in related materials is for educational and informational purposes only.
                            It does not constitute financial, investment, or legal advice. You should consult with a qualified financial advisor
                            before making any investment decisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-brand-green mb-4 uppercase tracking-widest italic">3. Risk Warning</h2>
                        <p>
                            Cryptocurrency and smart contract interactions involve significant risk. The value of BNB (Binance Coin) can fluctuate wildly.
                            You should only participate with funds you can afford to lose. Past performance of other users is not indicative of future results.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-brand-green mb-4 uppercase tracking-widest italic">4. Revenue Sharing</h2>
                        <p>
                            AIPCore is a "Community Driven Revenue Sharing" model. Income is generated solely through the sale of products or services
                            (membership levels) and the expansion of the user community. There are no guaranteed returns or passive income without
                            community growth and activity.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-brand-green mb-4 uppercase tracking-widest italic">5. Limitation of Liability</h2>
                        <p>
                            The creators, developers, and promoters of AIPCore shall not be held liable for any losses, damages, or claims
                            arising from your use of the Platform, including but not limited to smart contract bugs, blockchain network failures,
                            or loss of private keys.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-brand-green/10">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] italic text-slate-400">
                            By continuing to use this website and connecting your wallet, you acknowledge that you have read, understood, and agreed to this disclosure in full.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

