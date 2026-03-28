import React from "react";

export default function RewardPoolsPage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
                Reward Pools — The Apex of Participation
            </h1>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Global Volume Distribution</h2>
                <p className="mb-4">
                    Within the AIPCore ecosystem, the <strong>Community Reward Pools</strong> represent the highest level of participation and network contribution. While standard Matrix rewards fuel your direct growth, the Reward Pools capture 5% of the entire protocol's global volume and distribute it proportionally to qualified leaders.
                </p>
                <p className="mb-4">
                    The Reward Pool system is designed to incentivize depth, sustainability, and quality referrals. By participating in these pools, nodes earn a share of every single registration and upgrade that occurs across the entire network, regardless of whether it is in their direct matrix or not. This creates a powerful collective incentive where the success of the global protocol benefits every top contributor.
                </p>
                <div className="bg-white/5 border border-yellow-500/30 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-yellow-400 mb-4">Total Pool Allocation: 5% of Global Protocol Volume</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-black/20 rounded-xl border border-white/10">
                            <div className="text-3xl mb-2 text-orange-400">🥉</div>
                            <div className="text-xl font-bold text-white">Bronze Pool</div>
                            <div className="text-yellow-400 font-bold">1.5% Allocation</div>
                        </div>
                        <div className="text-center p-4 bg-black/20 rounded-xl border border-white/10">
                            <div className="text-3xl mb-2 text-gray-300">🥈</div>
                            <div className="text-xl font-bold text-white">Silver Pool</div>
                            <div className="text-yellow-400 font-bold">1.75% Allocation</div>
                        </div>
                        <div className="text-center p-4 bg-black/20 rounded-xl border border-white/10">
                            <div className="text-3xl mb-2 text-yellow-400">🥇</div>
                            <div className="text-xl font-bold text-white">Gold Pool</div>
                            <div className="text-yellow-400 font-bold">1.75% Allocation</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Qualification Hurdles</h2>
                <p className="mb-4">
                    Entrance into a Reward Pool is a significant achievement that signifies a node's commitment to the protocol's growth. Each pool has three specific requirements:
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white/5 rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-white/10">
                                <th className="p-4 font-bold text-white">Requirement</th>
                                <th className="p-4 font-bold text-orange-400">🥉 Bronze</th>
                                <th className="p-4 font-bold text-gray-300">🥈 Silver</th>
                                <th className="p-4 font-bold text-yellow-400">🥇 Gold</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            <tr>
                                <td className="p-4 text-sm font-semibold">Active Layer</td>
                                <td className="p-4 text-sm">Layer 6 or higher</td>
                                <td className="p-4 text-sm">Layer 10 or higher</td>
                                <td className="p-4 text-sm">Layer 14 or higher</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-sm font-semibold">Direct Referrals</td>
                                <td className="p-4 text-sm">2 Completed</td>
                                <td className="p-4 text-sm">5 Completed</td>
                                <td className="p-4 text-sm">10 Completed</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-sm font-semibold">Matrix Team Size</td>
                                <td className="p-4 text-sm">62 Nodes</td>
                                <td className="p-4 text-sm">2,046 Nodes</td>
                                <td className="p-4 text-sm">32,766 Nodes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8 p-6 bg-red-900/10 border border-red-500/20 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4 border-b border-red-500/10 pb-2">Earnings Caps & Sustainability</h2>
                <p className="text-sm mb-4">
                    To maintain the stability and fairness of the global pools, the protocol enforces an <strong>Earnings Ceiling (Cap)</strong> based on your pool rank. This cap is a multiple of your total BNB contributions (registration + upgrades). This ensures that every leader has room to grow while preventing any single node from draining the pool's liquidity.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                        <div className="text-xs text-orange-400 uppercase mb-1 font-bold">🥉 Bronze Cap</div>
                        <div className="text-2xl font-bold text-white">2x Multiplier</div>
                        <div className="text-[10px] text-white/80 mt-1">Earn double your contribution value.</div>
                    </div>
                    <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                        <div className="text-xs text-gray-300 uppercase mb-1 font-bold">🥈 Silver Cap</div>
                        <div className="text-2xl font-bold text-white">10x Multiplier</div>
                        <div className="text-[10px] text-white/80 mt-1">Earn 10x your total BNB contribution.</div>
                    </div>
                    <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                        <div className="text-xs text-yellow-400 uppercase mb-1 font-bold">🥇 Gold Cap</div>
                        <div className="text-2xl font-bold text-white">50x Multiplier</div>
                        <div className="text-[10px] text-white/80 mt-1">The apex cap for top protocol nodes.</div>
                    </div>
                </div>
                <p className="mt-4 text-xs italic text-neural-gold">
                    Once a node reaches its lifetime cap, further pool rewards are redirected back into the pool for other participants, or contributed to the stability fund, ensuring the engine never runs dry.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Automated Payout Logic</h2>
                <p className="mb-4">
                    The Reward Pool contract uses an advanced <strong>Accrual-per-Share</strong> algorithm. This means rewards are calculated with precision for every single block. There are no manual "payout days" — as soon as BNB enters the protocol, your share is mathematically updated and available for claim in your dashboard.
                </p>
                <p>
                    When a node qualifies for a higher pool (e.g., Bronze to Silver), their previous earnings are securely "frozen" in their pending balance, and they immediately begin accruing from the higher-percentage pool. This seamless transition ensures no value is lost during your climb to the top.
                </p>
            </section>
        </div>
    );
}
