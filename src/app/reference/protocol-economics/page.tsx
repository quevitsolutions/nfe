import React from "react";

export default function ProtocolEconomicsPage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[#e30613] to-rose-600 bg-clip-text text-transparent mb-8 uppercase tracking-tighter font-mono">
                Protocol Economics — The 100% Distribution Model
            </h1>

            <section className="mb-10 pl-4 border-l-4 border-[#e30613] bg-[#e30613]/5 py-6 rounded-r-2xl">
                <h2 className="text-xl font-bold text-white mb-2">Philosophy: Zero Leakage, Maximum Community Value</h2>
                <p className="text-sm">
                    AIPCore is built on a foundational economic principle: <strong>Mathematical Transparency</strong>. Unlike protocols that extract platform fees or maintain hidden reserves, AIPCore enforces a strict 0% platform fee policy. Every single BNB that enters the contract is immediately and autonomously distributed to the community.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">1.1 The 10/70/15/5 Distribution Split</h2>
                <p className="mb-4">
                    The protocol uses a fixed, immutable distribution logic for every registration and upgrade across all 17 Layers.
                </p>

                <div className="space-y-4">
                    <div className="bg-[#e30613]/5 border border-[#e30613]/20 p-5 rounded-xl hover:bg-[#e30613]/10 transition-colors">
                        <h4 className="text-lg font-black text-[#e30613] mb-2 uppercase tracking-tighter font-mono">1. Direct Sponsorship (10%)</h4>
                        <p className="text-sm">Transferred instantly to the wallet of the direct sponsor. This rewards active participation and network growth.</p>
                    </div>
                    <div className="bg-[#e30613]/5 border border-[#e30613]/20 p-5 rounded-xl hover:bg-[#e30613]/10 transition-colors">
                        <h4 className="text-lg font-black text-[#e30613] mb-2 uppercase tracking-tighter font-mono">2. Community Matrix (70%)</h4>
                        <p className="text-sm">Paid out through the binary matrix tree to ensure maximum collective reward for the community.</p>
                    </div>
                    <div className="bg-[#e30613]/5 border border-[#e30613]/20 p-5 rounded-xl hover:bg-[#e30613]/10 transition-colors">
                        <h4 className="text-lg font-black text-[#e30613] mb-2 uppercase tracking-tighter font-mono">3. Referral Layers (15%)</h4>
                        <p className="text-sm">Distributed across 17 layers of the referral tree, rewarding depth and team building.</p>
                    </div>
                    <div className="bg-[#e30613]/5 border border-[#e30613]/20 p-5 rounded-xl hover:bg-[#e30613]/10 transition-colors">
                        <h4 className="text-lg font-black text-[#e30613] mb-2 uppercase tracking-tighter font-mono">4. Global Reward Pools (5%)</h4>
                        <p className="text-sm">Captured by the RewardPool contract and shared proportionally among Bronze, Silver, and Gold qualified nodes.</p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">1.2 Scalable 17-Layer Structure</h2>
                <p className="mb-4">
                    AIPCore offers 17 layers of participation, indexed to USD price through our decentralized BNB Oracle. This allows nodes to start with a very low barrier to entry and scale their rewards as their network grows.
                </p>
                <div className="bg-[#e30613]/5 p-6 rounded-2xl border border-[#e30613]/20 shadow-xl">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-[10px] text-[#e30613] font-black uppercase tracking-widest font-mono">Layer 1</div>
                            <div className="text-xl font-black text-white">$5</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-[#e30613] font-black uppercase tracking-widest font-mono">Layer 5</div>
                            <div className="text-xl font-black text-white">$80</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-[#e30613] font-black uppercase tracking-widest font-mono">Layer 10</div>
                            <div className="text-xl font-black text-white">$2,560</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-[#e30613] font-black uppercase tracking-widest font-mono">Layer 17</div>
                            <div className="text-xl font-black text-white">$327,680</div>
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-sm italic">Each upgrade doubles the previous layer's cost and proportionally increases the user's earning capacity within the matrix and reward pools.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">1.3 Infinite Sustainability Cycle</h2>
                <p className="mb-4">
                    The protocol achieves sustainability through pure mathematical equilibrium. Because the contract only distributes BNB that has already been received, there is no risk of "unfunded liabilities" or liquidity debt.
                </p>

                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="bg-[#e30613]/10 border border-[#e30613]/20 p-6 rounded-2xl flex-1 hover:bg-[#e30613]/20 transition-colors">
                        <h4 className="text-lg font-black text-[#e30613] mb-2 uppercase tracking-tighter font-mono">Algorithmic Placement</h4>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">The AI placement engine prevents matrix &quot;dead zones,&quot; ensuring liquidity flows efficiently to active parts of the network.</p>
                    </div>
                    <div className="bg-[#e30613]/10 border border-[#e30613]/20 p-6 rounded-2xl flex-1 hover:bg-[#e30613]/20 transition-colors">
                        <h4 className="text-lg font-black text-[#e30613] mb-2 uppercase tracking-tighter font-mono">Self-Regulating Layers</h4>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">Nodes must upgrade their own Layers to unlock rewards from deeper matrix layers, ensuring a constant cycle of reinvestment and growth.</p>
                    </div>
                </div>
            </section>

            <section>
                <div className="bg-gradient-to-br from-[#e30613]/30 to-rose-900/30 border border-[#e30613]/20 p-10 rounded-2xl text-center shadow-2xl">
                    <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter font-mono">The Philosophy of Pure Math</h2>
                    <p className="mb-6 text-sm italic font-black text-rose-300 uppercase tracking-widest font-mono">
                        &quot;Transparency is the highest form of trust.&quot;
                    </p>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter px-4">
                        By hard-coding the 10/70/15/5 split and removing platform fees, AIPCore ensures that the economic engine is powered solely by the community, for the community. The system is designed to be a permanent decentralized standard for reward-driven finance.
                    </p>
                </div>
            </section>
        </div>
    );
}
