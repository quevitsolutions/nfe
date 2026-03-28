import React from "react";

export default function IncomeInteractionPage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
                Income Interaction — The Flow of Community Wealth
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Algorithmic Distribution Full Flow</h2>
                <p className="mb-6">
                    AIPCore interactions are purely mathematical. From the moment a participant clicks "Register" or "Upgrade," every single wei of BNB is tracked and distributed autonomously by the smart contract. Our <strong>Zero Leakage Policy</strong> ensures that 100% of the protocol volume remains within the community.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                    <div className="bg-white/5 border border-yellow-500/20 p-4 rounded-2xl">
                        <div className="text-2xl font-bold text-yellow-500 mb-2">10%</div>
                        <h3 className="text-sm font-bold text-white mb-1">Direct</h3>
                        <p className="text-[10px]">Instant referral rewards.</p>
                    </div>
                    <div className="bg-white/5 border border-blue-500/20 p-4 rounded-2xl">
                        <div className="text-2xl font-bold text-blue-500 mb-2">70%</div>
                        <h3 className="text-sm font-bold text-white mb-1">Matrix</h3>
                        <p className="text-[10px]">AI-placed binary growth.</p>
                    </div>
                    <div className="bg-white/5 border border-purple-500/20 p-4 rounded-2xl">
                        <div className="text-2xl font-bold text-purple-500 mb-2">15%</div>
                        <h3 className="text-sm font-bold text-white mb-1">Layers</h3>
                        <p className="text-[10px]">17-layer referral depth.</p>
                    </div>
                    <div className="bg-white/5 border border-orange-500/20 p-4 rounded-2xl">
                        <div className="text-2xl font-bold text-orange-500 mb-2">5%</div>
                        <h3 className="text-sm font-bold text-white mb-1">Pools</h3>
                        <p className="text-[10px]">Global volume sharing.</p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Phase 1: Direct Recognition (10%)</h2>
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                    <p className="mb-4">
                        The 10% Direct Reward triggers for every registration and upgrade within your direct network. This rewards the core act of connection and onboarding.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li><strong>Registration Flow:</strong> When a new node joins, the sponsor receives 10% of the Layer 1 BNB cost instantly.</li>
                        <li><strong>Upgrade Flow:</strong> When a direct referral upgrades to a higher Layer (L2-L17), 10% of the upgrade price is pushed directly to your dashboard.</li>
                    </ul>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Phase 2: Matrix & Layers (70% + 15%)</h2>
                <p className="mb-4">
                    The majority of the reward flow—85%—is dedicated to the collective community structure.
                </p>
                <div className="bg-blue-900/10 border border-blue-500/20 p-6 rounded-2xl">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                            <h4 className="font-bold text-blue-400 mb-2">Matrix (70%)</h4>
                            <p className="text-xs">
                                Optimized by the MOM engine, these rewards ensure that binary growth is shared deep into the network.
                            </p>
                        </div>
                        <div className="flex-1 border-l border-white/10 pl-0 sm:pl-6">
                            <h4 className="font-bold text-blue-400 mb-2">Layers (15%)</h4>
                            <p className="text-xs">
                                Distributed across 17 vertical levels of your referral tree, rewarding the leadership that builds deep teams.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Phase 3: Global Participation (5%)</h2>
                <p className="mb-4">
                    The final 5% is allocated to the RewardPool contract, distributed proportionally to qualified leaders across the Bronze, Silver, and Gold Pools.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center font-bold text-yellow-500">3%</div>
                        <div>
                            <div className="font-bold text-white">Bronze Pool</div>
                            <div className="text-xs">Shared among Layer 6+ participants with 2 directs.</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gray-300/20 flex items-center justify-center font-bold text-gray-300">3.5%</div>
                        <div>
                            <div className="font-bold text-white">Silver Pool</div>
                            <div className="text-xs">Shared among Layer 10+ participants with 5 directs.</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center font-bold text-orange-500">3.5%</div>
                        <div>
                            <div className="font-bold text-white">Gold Pool</div>
                            <div className="text-xs">Shared among Layer 14+ participants with 10 directs.</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 p-6 rounded-2xl text-center">
                <h4 className="text-xl font-bold text-white mb-2">Immutable and Instant</h4>
                <p className="text-sm">
                    Because this logic is hard-coded into the smart contract, there is no delay. Once the transaction is confirmed on the BNB Greenfield/Mainnet, all 40/50/10 distributions are settled. Your rewards are visible in your dashboard instantly.
                </p>
            </div>
        </div>
    );
}
