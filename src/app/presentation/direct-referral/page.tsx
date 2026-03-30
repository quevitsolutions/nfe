'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';

export default function DirectReferralSlide() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#fcf3eb] flex flex-col font-sans text-slate-800 relative overflow-hidden">

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute w-[800px] h-[800px] bg-[#ed1b24]/5 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* ── TOP NAV BAR ── */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md border-b border-black/5">
                <Link href="/presentation" className="flex items-center gap-3 text-slate-500 hover:text-[#ed1b24] transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:block">Back to Presentation</span>
                    <span className="sm:hidden">Back</span>
                </Link>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic">Slide 1 / 4 — Direct Referral</span>
                <Link href="/presentation/matrix-income" className="flex items-center gap-3 text-slate-500 hover:text-[#ed1b24] transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                    <span className="hidden sm:block">Matrix Income</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-5 duration-700">

                {/* Header */}
                <div className="text-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-[2.5rem] bg-white border border-[#ed1b24]/10 shadow-xl mb-8 group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[#ed1b24]/5 group-hover:scale-150 transition-transform duration-700" />
                        <Zap className="w-10 h-10 md:w-12 md:h-12 text-[#ed1b24] relative z-10" />
                    </motion.div>
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">
                        Stream #1:{' '}
                        <span className="text-[#ed1b24]">Direct Income</span>
                    </h1>
                    <p className="text-[10px] md:text-xs text-slate-500 font-black tracking-[0.4em] uppercase italic">Autonomous Node Network Propagation</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                    {/* Left: How It Works */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-black text-slate-800 border-b-2 border-black/5 pb-4 uppercase tracking-tight italic flex items-center gap-3">
                            <Target className="w-6 h-6 text-[#ed1b24]" />
                            How It Works
                        </h2>
                        <ul className="space-y-6">
                            {[
                                "When someone registers using your referral link",
                                "You earn 10% of their Level 1 registration fee",
                                "Instant payment directly to your wallet",
                                "Earn 10% on EVERY tier upgrade (L1 to L17)",
                                "No qualification requirements needed",
                            ].map((item, i) => (
                                <motion.li key={i}
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 text-sm md:text-lg font-bold text-slate-600 italic"
                                >
                                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-white border border-[#ed1b24]/10 flex items-center justify-center text-[#ed1b24] mt-0.5 text-xs font-black shadow-sm">0{i+1}</span>
                                    <span className="pt-1">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Earnings */}
                    <div className="space-y-8">
                        <div className="vi-card p-8 lg:p-10 relative overflow-hidden group border-[#ed1b24]/5">
                            <div className="absolute top-0 right-0 px-6 py-3 bg-[#ed1b24]/5 rounded-bl-[2rem] border-b border-l border-[#ed1b24]/10">
                                <span className="text-[#ed1b24] font-black text-[10px] uppercase tracking-widest italic">10% Commission</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-8 uppercase italic tracking-tight">Earnings Breakdown</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-black/5 pb-4">
                                    <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest italic">Registration</span>
                                    <span className="text-slate-900 font-black text-xl italic tracking-tighter">10% INSTANT</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-black/5 pb-4">
                                    <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest italic">Upgrades (L1 – L18)</span>
                                    <span className="text-slate-900 font-black text-xl italic tracking-tighter">10% INSTANT</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest italic">Currency Flow</span>
                                    <span className="text-[#ed1b24] font-black bg-[#ed1b24]/5 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] italic border border-[#ed1b24]/10 animate-pulse">BNB (BEP20)</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-6 uppercase italic tracking-tight flex items-center gap-3">
                                <TrendingUp className="w-6 h-6 text-[#ed1b24]" />
                                Potential Projection
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: "10 Nodes", val: "$50+", color: "bg-white" },
                                    { label: "50 Nodes", val: "$250+", color: "bg-white" },
                                    { label: "100 Nodes", val: "$500+", color: "bg-white" },
                                ].map((stat, i) => (
                                    <motion.div key={i} whileHover={{ y: -5 }} className={`${stat.color} border border-[#ed1b24]/10 rounded-3xl p-6 shadow-xl flex flex-col justify-center items-center group transition-all`}>
                                        <div className="text-slate-400 text-[10px] mb-2 font-black uppercase tracking-widest italic">{stat.label}</div>
                                        <div className="text-xl md:text-2xl font-black text-[#ed1b24] italic tracking-tighter group-hover:scale-110 transition-transform">{stat.val}</div>
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-6 text-center font-black uppercase tracking-widest italic">* Projections based on Level 1 entry only. Upgrades multiply yield significantly.</p>
                        </div>
                    </div>
                </div>

                {/* Info footer */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 py-8 border-t border-black/5 italic">
                    <span className="flex items-center gap-2">Network: <strong className="text-slate-600">BSC Mainnet</strong></span>
                    <span className="hidden sm:block opacity-30">|</span>
                    <span className="flex items-center gap-2">Protocol: <strong className="text-slate-600">AIPCore Hybrid</strong></span>
                    <span className="hidden sm:block opacity-30">|</span>
                    <span className="flex items-center gap-2">Payout: <strong className="text-slate-600">Atomic Settlement</strong></span>
                </div>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="sticky bottom-0 z-50 bg-white/80 backdrop-blur-md border-t border-black/5 px-6 md:px-12 py-5 flex items-center justify-between gap-8">
                <Link href="/presentation"
                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-800 hover:scale-105 italic shadow-xl">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:block">Back to Hub</span>
                </Link>
                <div className="flex gap-3">
                    {['direct-referral', 'matrix-income', 'level-income', 'reward-pools'].map((s, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${s === 'direct-referral' ? 'w-10 bg-[#ed1b24] shadow-lg shadow-[#ed1b24]/20' : 'w-4 bg-[#ed1b24]/10'}`} />
                    ))}
                </div>
                <Link href="/presentation/matrix-income"
                    className="flex items-center gap-3 bg-[#ed1b24] text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#ed1b24]/20 transition-all hover:scale-105 hover:bg-[#ed1b24]/90 border border-[#ed1b24]/20 italic">
                    <span>Next: Matrix Income</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                </Link>
            </div>
        </div>
    );
}



