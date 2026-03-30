import React from "react";

export default function RewardPoolsPage() {
    return (
        <div className="space-y-6 text-slate-600 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-8">
                Reward Pools — The Apex of Participation
            </h1>

            <section className="mb-8">
                <h2 className="text-2xl font-bold text-brand-green mb-4 border-b border-brand-green/20 pb-2">Global Volume Distribution</h2>
                <p className="mb-4">
                    Within the AIPCore ecosystem, the <strong>Community Reward Pools</strong> represent the highest level of participation and network contribution. While standard Matrix rewards fuel your direct growth, the Reward Pools capture 5% of the entire protocol's global volume and distribute it proportionally to qualified leaders.
                </p>
                <p className="mb-4">
                    The Reward Pool system is designed to incentivize depth, sustainability, and quality referrals. By participating in these pools, nodes earn a share of every single registration and upgrade that occurs across the entire network, regardless of whether it is in their direct matrix or not. This creates a powerful collective incentive where the success of the global protocol benefits every top contributor.
                </p>
                <div className="bg-brand-mint border border-brand-green/20 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-brand-green mb-4">Total Pool Allocation: 5% of Global Protocol Volume</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-slate-200 rounded-2xl text-center p-6 shadow-sm">
                            <div className="text-3xl mb-2 grayscale opacity-50">🥉</div>
                            <div className="text-xl font-black text-slate-800 uppercase italic">Bronze Pool</div>
                            <div className="text-slate-500 font-black text-sm mt-1 uppercase italic">1.50% Distribution</div>
                        </div>
                        <div className="bg-brand-mint border border-brand-green/20 rounded-2xl text-center p-6 shadow-sm">
                            <div className="text-3xl mb-2">🥈</div>
                            <div className="text-xl font-black text-brand-green uppercase italic">Silver Pool</div>
                            <div className="text-brand-green font-black text-sm mt-1 uppercase italic">1.75% Distribution</div>
                        </div>
                        <div className="bg-white border border-brand-red/20 rounded-2xl text-center p-6 shadow-sm">
                            <div className="text-3xl mb-2">🥇</div>
                            <div className="text-xl font-black text-brand-red uppercase italic">Gold Pool</div>
                            <div className="text-brand-red font-black text-sm mt-1 uppercase italic">1.75% Distribution</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-black text-slate-900 mb-4 border-b-2 border-slate-100 pb-2 uppercase tracking-tight italic">Qualification Hurdles</h2>
                <p className="mb-4 text-slate-500 font-medium">
                    Entrance into a Reward Pool is a significant protocol achievement. Each tier enforces three specific neural requirements:
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden border border-brand-green/10 shadow-xl">
                        <thead>
                            <tr className="bg-brand-mint border-b border-brand-green/10">
                                <th className="p-5 font-black text-slate-400 uppercase text-[10px] tracking-widest italic">Requirement</th>
                                <th className="p-5 font-black text-slate-500 uppercase text-[10px] tracking-widest italic">🥉 Bronze</th>
                                <th className="p-5 font-black text-brand-green uppercase text-[10px] tracking-widest italic">🥈 Silver</th>
                                <th className="p-5 font-black text-brand-red uppercase text-[10px] tracking-widest italic">🥇 Gold</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <tr>
                                <td className="p-5 text-xs font-black uppercase text-slate-400 italic">Active Layer</td>
                                <td className="p-5 text-sm font-bold text-slate-800">Layer 6+</td>
                                <td className="p-5 text-sm font-bold text-brand-green">Layer 10+</td>
                                <td className="p-5 text-sm font-bold text-brand-red">Layer 14+</td>
                            </tr>
                            <tr>
                                <td className="p-5 text-xs font-black uppercase text-slate-400 italic">Direct Growth</td>
                                <td className="p-5 text-sm font-bold text-slate-800">2 Nodes</td>
                                <td className="p-5 text-sm font-bold text-brand-green">5 Nodes</td>
                                <td className="p-5 text-sm font-bold text-brand-red">10 Nodes</td>
                            </tr>
                            <tr>
                                <td className="p-5 text-xs font-black uppercase text-slate-400 italic">Matrix Network</td>
                                <td className="p-5 text-sm font-bold text-slate-800">62 Nodes</td>
                                <td className="p-5 text-sm font-bold text-brand-green">2,046 Nodes</td>
                                <td className="p-5 text-sm font-bold text-brand-red">32,766 Nodes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="mb-8 p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-green/5 group-hover:scale-110 transition-transform" />
                <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest italic relative z-10">Earnings Caps &amp; Sustainability</h2>
                <p className="text-sm mb-8 text-white/60 font-medium leading-relaxed relative z-10 italic">
                    To maintain protocol stability, the system enforces an <strong className="text-brand-green">Earnings Ceiling</strong> based on your poll rank. This multiplier ensures long-term liquidity for all participants.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="text-[10px] text-slate-400 uppercase mb-2 font-black tracking-widest italic">Bronze Cap</div>
                        <div className="text-3xl font-black text-white italic tracking-tighter">2x Multiplier</div>
                        <div className="text-[9px] text-white/40 mt-2 uppercase font-black italic">Double your contribution value.</div>
                    </div>
                    <div className="bg-brand-green/10 border border-brand-green/20 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="text-[10px] text-brand-green uppercase mb-2 font-black tracking-widest italic">Silver Cap</div>
                        <div className="text-3xl font-black text-brand-green italic tracking-tighter">10x Multiplier</div>
                        <div className="text-[9px] text-brand-green/60 mt-2 uppercase font-black italic">Earn 10x your total BNB contribution.</div>
                    </div>
                    <div className="bg-brand-red/10 border border-brand-red/20 p-6 rounded-2xl backdrop-blur-sm">
                        <div className="text-[10px] text-brand-red uppercase mb-2 font-black tracking-widest italic">Gold Cap</div>
                        <div className="text-3xl font-black text-brand-red italic tracking-tighter">50x Multiplier</div>
                        <div className="text-[9px] text-brand-red/60 mt-2 uppercase font-black italic">Apex protocol yield ceiling.</div>
                    </div>
                </div>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] italic text-brand-red/80 relative z-10">
                    * Lifetime caps secure the protocol liquidity against over-utilization.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-brand-green mb-4 border-b border-brand-green/20 pb-2">Automated Payout Logic</h2>
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


