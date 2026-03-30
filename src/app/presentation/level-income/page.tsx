'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, TrendingUp, Layers, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function LevelIncomeSlide() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#f8faf8] flex flex-col font-sans text-slate-800 relative overflow-hidden">

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* ── TOP NAV BAR ── */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md border-b border-brand-green/10">
                <Link href="/presentation/matrix-income" className="flex items-center gap-3 text-slate-500 hover:text-brand-green transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:block">Matrix Income</span>
                    <span className="sm:hidden">Prev</span>
                </Link>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic">Slide 3 / 4 — Level Income</span>
                <Link href="/presentation/reward-pools" className="flex items-center gap-3 text-slate-500 hover:text-brand-green transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                    <span className="hidden sm:block">Reward Pools</span>
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
                        className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-brand-mint border border-brand-green/10 shadow-xl mb-8 group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-brand-green/5 group-hover:scale-150 transition-transform duration-700" />
                        <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-brand-green relative z-10" />
                    </motion.div>
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">
                        Stream #3:{' '}
                        <span className="text-brand-green">Level Income</span>
                    </h1>
                    <p className="text-[10px] md:text-xs text-slate-400 font-black tracking-[0.4em] uppercase italic">18-Tier Binary Distribution Architecture</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

                    {/* Left: Commission Breakdown */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-800 border-b-2 border-brand-green/10 pb-4 uppercase italic tracking-tight flex items-center gap-3">
                            <Layers className="w-6 h-6 text-brand-green" />
                            Commission Matrix
                        </h3>
                        <div className="space-y-4">
                            {[
                                { range: "Layers 1 – 5", label: "Foundation Team", pct: "1.50%", accent: "brand-green text-brand-green" },
                                { range: "Layers 6 – 10", label: "Expansion Network", pct: "1.00%", accent: "slate-900 text-slate-900" },
                                { range: "Tiers 11 – 18", label: "Global Hierarchy", pct: "0.35%", accent: "brand-red text-brand-red" },
                            ].map((item, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                                    className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-brand-mint shadow-xl hover:border-brand-green/20 transition-all group">
                                    <div>
                                        <span className="block text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">{item.range}</span>
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">{item.label}</span>
                                    </div>
                                    <div className={`text-3xl font-black italic tracking-tighter ${item.accent}`}>{item.pct}</div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-green/5 group-hover:scale-110 transition-transform" />
                            <span className="text-white/40 text-[10px] uppercase tracking-widest font-black italic relative z-10">Aggregate Distribution</span>
                            <span className="text-3xl font-black text-white italic tracking-tighter relative z-10">~15.00%</span>
                        </div>
                    </div>

                    {/* Right: Qualification & Logic */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-800 border-b-2 border-brand-green/10 pb-4 uppercase italic tracking-tight flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-brand-green" />
                            Protocol Rules
                        </h3>
                        
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}
                            className="bg-white rounded-[2.5rem] p-8 border border-brand-red/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 px-4 py-2 bg-brand-red/5 rounded-bl-[1.5rem]">
                                <span className="text-brand-red font-black text-[9px] uppercase tracking-widest italic">Qualification Required</span>
                            </div>
                            
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-brand-mint flex items-center justify-center text-brand-green flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                                        <strong className="text-slate-900 uppercase">Tier Parification</strong>: Your node level must be equal to or higher than the package being distributed.
                                    </p>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-brand-mint flex items-center justify-center text-brand-green flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                                        <strong className="text-slate-900 uppercase">Dual-Direct Sync</strong>: Layers 6 and deeper require a minimum of 2 personally propagated nodes to unlock.
                                    </p>
                                </li>
                            </ul>
                            <div className="mt-6 pt-6 border-t border-brand-green/5 text-[9px] text-slate-400 font-black uppercase tracking-widest italic">
                                * Commissions not meeting criteria are autonomously routed to the Global Reserve.
                            </div>
                        </motion.div>

                        <div className="bg-brand-mint rounded-[2.5rem] p-8 border border-brand-green/10 shadow-inner group overflow-hidden">
                            <div className="flex items-center gap-4 mb-6">
                                <Zap className="w-5 h-5 text-brand-green" />
                                <h3 className="text-sm font-black text-brand-green uppercase tracking-[0.3em] italic">Projection Logic</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-brand-green/5">
                                    <span className="block text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1 italic">Layer 5 ($80)</span>
                                    <span className="block text-slate-900 font-black text-2xl italic tracking-tighter">$1.20</span>
                                    <span className="block text-brand-green text-[9px] font-black uppercase tracking-widest italic">(1.50%)</span>
                                </div>
                                <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-brand-green/5">
                                    <span className="block text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1 italic">Layer 7 ($80)</span>
                                    <span className="block text-slate-900 font-black text-2xl italic tracking-tighter">$0.80</span>
                                    <span className="block text-slate-400 text-[9px] font-black uppercase tracking-widest italic">(1.00%)</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic pt-4">
                            Maximize Team Parity for Higher Returns
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="sticky bottom-0 z-50 bg-white/80 backdrop-blur-md border-t border-brand-green/10 px-6 md:px-12 py-5 flex items-center justify-between gap-8">
                <Link href="/presentation/matrix-income"
                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-800 hover:scale-105 italic shadow-xl">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:block">Matrix Income</span>
                    <span className="sm:hidden">Prev</span>
                </Link>
                <div className="flex gap-3">
                    {['direct-referral', 'matrix-income', 'level-income', 'reward-pools'].map((s, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${s === 'level-income' ? 'w-10 bg-brand-green shadow-lg shadow-brand-green/20' : 'w-4 bg-brand-green/10'}`} />
                    ))}
                </div>
                <Link href="/presentation/reward-pools"
                    className="flex items-center gap-3 bg-brand-green text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-brand-green/20 transition-all hover:scale-105 hover:bg-brand-green/90 border border-brand-green/20 italic">
                    <span className="hidden sm:block">Next: Reward Pools</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                </Link>
            </div>
        </div>
    );
}
