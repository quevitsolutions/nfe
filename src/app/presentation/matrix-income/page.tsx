'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function MatrixIncomeSlide() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050510] flex flex-col font-sans text-white">

            {/* ── TOP NAV BAR ── */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-black/60 backdrop-blur-md border-b border-white/10">
                <Link href="/presentation/direct-referral" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm tracking-widest uppercase font-mono hidden sm:block">Direct Referral</span>
                    <span className="text-sm font-mono sm:hidden">Prev</span>
                </Link>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Slide 2 / 4 — Matrix Income</span>
                <Link href="/presentation/level-income" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <span className="text-sm tracking-widest uppercase font-mono hidden sm:block">Level Income</span>
                    <span className="text-sm font-mono sm:hidden">Next</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* ── BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none -z-0">
                <div className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-8 flex flex-col gap-6">

                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30 mb-4 p-1 animate-pulse">
                        <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center border border-white/20">
                            <span className="text-3xl md:text-4xl">🕸️</span>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">
                        Income Stream #2:{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Matrix Level Income
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-purple-400 font-mono tracking-widest uppercase">Binary Matrix • Levels 2–24</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">

                    {/* Left: Logic & Rules */}
                    <div className="space-y-4">
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                            <h3 className="text-lg font-bold text-purple-300 mb-4 border-b border-white/10 pb-2">Distribution Logic</h3>
                            <ul className="space-y-4">
                                {[
                                    { label: "Standard Distribution", val: "70%" },
                                    { label: "Spillover / Auto-placed", val: "70%" },
                                ].map((item, i) => (
                                    <li key={i} className="flex justify-between items-center">
                                        <span className="text-gray-300 text-sm">{item.label}</span>
                                        <span className="text-2xl font-bold text-white">{item.val}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-purple-900/20 rounded-2xl p-5 border border-purple-500/20">
                            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                                <span>⚠️</span> Qualification Rule
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Eligible ONLY if receiver has <strong className="text-white">UPGRADED to a HIGHER LEVEL</strong> than the payer.
                            </p>
                            <div className="mt-3 p-2.5 bg-red-900/20 border border-red-500/20 rounded-lg text-xs text-red-200">
                                Otherwise: Income is <strong className="text-red-400">LOST</strong> (passed up/burned).
                            </div>
                        </div>
                    </div>

                    {/* Center: Matrix Visualization */}
                    <div className="flex flex-col items-center justify-center py-4">
                        <div className="relative flex flex-col items-center gap-6">
                            {/* You node */}
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] border-4 border-black z-10">
                                <span className="text-white font-bold text-sm">YOU</span>
                            </motion.div>

                            {/* L1 nodes */}
                            <div className="flex gap-10 md:gap-14">
                                {[1, 2].map((n) => (
                                    <motion.div key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + n * 0.1 }}
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-800 border-2 border-purple-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                                        <span className="text-xs text-gray-400">L1</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* L2 nodes */}
                            <div className="flex gap-3 md:gap-4">
                                {[1, 2, 3, 4].map((n) => (
                                    <motion.div key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + n * 0.1 }}
                                        className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-900 border border-purple-500/30 flex items-center justify-center">
                                        <span className="text-[10px] text-gray-500">L2</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
                            2×2 BINARY STRUCTURE
                        </div>
                    </div>

                    {/* Right: Key Features */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Key Features</h3>
                        <ul className="space-y-3">
                            {[
                                "Earn from Levels 2 to 24",
                                "Auto-filled: Top-to-Bottom, Left-to-Right",
                                "Global Spillover Supported",
                                "Massive income from deep structure",
                            ].map((item, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-3 text-sm text-gray-300">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mt-0.5 text-xs">➤</span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>

                        <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 rounded-xl p-5 border border-white/10">
                            <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Max Potential</div>
                            <div className="text-3xl font-black text-white">UNLIMITED</div>
                            <div className="text-purple-300 text-sm">Exponential Growth</div>
                        </div>
                    </div>
                </div>

                <div className="text-center text-xs text-gray-600 py-2 border-t border-white/5">
                    * Refer to smart contract for exact distribution logic details
                </div>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="sticky bottom-0 z-50 bg-black/70 backdrop-blur-md border-t border-white/10 px-4 md:px-8 py-3 flex items-center justify-between gap-4">
                <Link href="/presentation/direct-referral"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:block">Direct Referral</span>
                    <span className="sm:hidden">Prev</span>
                </Link>
                <div className="flex gap-2">
                    {['direct-referral', 'matrix-income', 'level-income', 'reward-pools'].map((s, i) => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${s === 'matrix-income' ? 'bg-purple-400 scale-125' : 'bg-white/20'}`} />
                    ))}
                </div>
                <Link href="/presentation/level-income"
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-purple-500/20 transition-all hover:scale-105">
                    <span className="hidden sm:block">Next: Level Income</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
