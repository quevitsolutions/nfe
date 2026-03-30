'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Network, Layers, AlertTriangle, Cpu } from 'lucide-react';

export default function MatrixIncomeSlide() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#f8faf8] flex flex-col font-sans text-slate-800 relative overflow-hidden">

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* ── TOP NAV BAR ── */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md border-b border-brand-green/10">
                <Link href="/presentation/direct-referral" className="flex items-center gap-3 text-slate-500 hover:text-brand-green transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:block">Direct Referral</span>
                    <span className="sm:hidden">Prev</span>
                </Link>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic">Slide 2 / 4 — Matrix Income</span>
                <Link href="/presentation/level-income" className="flex items-center gap-3 text-slate-500 hover:text-brand-green transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                    <span className="hidden sm:block">Level Income</span>
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
                        className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-brand-mint border border-brand-red/10 shadow-xl mb-8 group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-brand-red/5 group-hover:scale-150 transition-transform duration-700" />
                        <Network className="w-10 h-10 md:w-12 md:h-12 text-brand-red relative z-10" />
                    </motion.div>
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">
                        Stream #2:{' '}
                        <span className="text-brand-red">Matrix Income</span>
                    </h1>
                    <p className="text-[10px] md:text-xs text-slate-500 font-black tracking-[0.4em] uppercase italic">Binary Matrix • 18 Tiers (L0–L17) Architecture</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                    {/* Left: Logic & Rules */}
                    <div className="space-y-8">
                        <div className="bg-brand-mint border border-brand-green/10 rounded-[2.5rem] p-8 shadow-xl">
                            <h3 className="text-xl font-black text-brand-green mb-6 border-b border-brand-green/10 pb-4 uppercase italic tracking-tight">Distribution Logic</h3>
                            <ul className="space-y-6">
                                {[
                                    { label: "Standard Yield", val: "70%" },
                                    { label: "Global Spillover", val: "70%" },
                                ].map((item, i) => (
                                    <li key={i} className="flex justify-between items-center">
                                        <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest italic">{item.label}</span>
                                        <span className="text-3xl font-black text-slate-900 italic tracking-tighter">{item.val}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white border border-brand-red/10 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 bg-brand-red/10 rounded-bl-3xl border-b border-l border-brand-red/20 translate-x-1 -translate-y-1">
                                <AlertTriangle className="w-4 h-4 text-brand-red" />
                            </div>
                            <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tight italic">
                                Logic Priority Rule
                            </h3>
                            <p className="text-slate-600 font-bold text-sm leading-relaxed italic">
                                Eligible ONLY if receiver has <strong className="text-brand-red">UPGRADED to a HIGHER LEVEL</strong> than the initiator.
                            </p>
                            <div className="mt-6 p-4 bg-brand-red/5 border border-brand-red/10 rounded-2xl text-[10px] font-black text-brand-red uppercase tracking-widest italic animate-pulse">
                                Failure Result: Income Pass-Up
                            </div>
                        </div>
                    </div>

                    {/* Center: Matrix Visualization */}
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="relative flex flex-col items-center gap-10">
                            {/* You node */}
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                                className="w-18 h-18 md:w-24 md:h-24 rounded-[2rem] bg-brand-red flex items-center justify-center shadow-2xl shadow-brand-red/30 border-2 border-white z-10 group cursor-pointer hover:rotate-12 transition-all">
                                <span className="text-white font-black text-[10px] uppercase tracking-widest italic">YOU</span>
                            </motion.div>

                            {/* L1 nodes */}
                            <div className="flex gap-12 md:gap-20">
                                {[1, 2].map((n) => (
                                    <motion.div key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + n * 0.1 }}
                                        className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-white border-2 border-brand-red/20 flex items-center justify-center shadow-xl group hover:-translate-y-1 transition-all">
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter italic">L1</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* L2 nodes */}
                            <div className="flex gap-4 md:gap-6">
                                {[1, 2, 3, 4].map((n) => (
                                    <motion.div key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + n * 0.1 }}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-mint border border-brand-red/10 flex items-center justify-center opacity-60">
                                        <span className="text-[8px] text-slate-400 font-black italic">L2</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 px-8 py-3 rounded-full bg-brand-mint border border-brand-red/10 text-brand-red text-[10px] font-black uppercase tracking-[0.3em] italic shadow-sm flex items-center gap-3">
                            <Layers className="w-4 h-4" />
                            2×2 Binary Architecture
                        </div>
                    </div>

                    {/* Right: Key Features */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-black text-slate-900 border-b-2 border-brand-green/10 pb-4 uppercase italic tracking-tight flex items-center gap-3">
                            <Cpu className="w-6 h-6 text-brand-green" />
                            Core Engine
                        </h3>
                        <ul className="space-y-6">
                            {[
                                "Earn from Matrix Tiers L0 to L17",
                                "Auto-filled Strategy Deployment",
                                "Native Global Spillover Support",
                                "Scale Yield through Structural Depth",
                            ].map((item, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 text-sm md:text-lg font-bold text-slate-600 italic">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-brand-mint border border-brand-green/10 flex items-center justify-center text-brand-green mt-1 text-[8px] font-black">X</span>
                                    <span className="pt-0.5">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="bg-white border border-brand-green/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-green/[0.02] group-hover:bg-brand-green/[0.05] transition-colors" />
                            <div className="relative z-10">
                                <div className="text-slate-400 text-[10px] uppercase tracking-widest font-black mb-2 italic">Max Structural Potential</div>
                                <div className="text-4xl font-black text-slate-900 italic tracking-tighter">UNLIMITED</div>
                                <div className="text-brand-green text-[10px] font-black uppercase tracking-widest mt-2 italic">Exponential Scaling Enabled</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center font-black uppercase text-[10px] tracking-[0.3em] text-slate-400 py-6 border-t border-brand-green/10 italic">
                    * Verifiable via BSC Smart Contract Protocol Architecture
                </div>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="sticky bottom-0 z-50 bg-white/80 backdrop-blur-md border-t border-brand-green/10 px-6 md:px-12 py-5 flex items-center justify-between gap-8">
                <Link href="/presentation/direct-referral"
                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-800 hover:scale-105 italic shadow-xl">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:block">Direct Referral</span>
                    <span className="sm:hidden">Prev</span>
                </Link>
                <div className="flex gap-3">
                    {['direct-referral', 'matrix-income', 'level-income', 'reward-pools'].map((s, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${s === 'matrix-income' ? 'w-10 bg-brand-red shadow-lg shadow-brand-red/20' : 'w-4 bg-brand-red/10'}`} />
                    ))}
                </div>
                <Link href="/presentation/level-income"
                    className="flex items-center gap-3 bg-brand-green text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-brand-green/20 transition-all hover:scale-105 hover:bg-brand-green/90 border border-brand-green/20 italic">
                    <span className="hidden sm:block">Next: Level Income</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                </Link>
            </div>
        </div>
    );
}



