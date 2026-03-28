'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function LevelIncomeSlide() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050510] flex flex-col font-sans text-white">

            {/* ── TOP NAV BAR ── */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-black/60 backdrop-blur-md border-b border-white/10">
                <Link href="/presentation/matrix-income" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm tracking-widest uppercase font-mono hidden sm:block">Matrix Income</span>
                    <span className="text-sm font-mono sm:hidden">Prev</span>
                </Link>
                <span className="text-xs text-white/80 font-mono uppercase tracking-widest">Slide 3 / 4 — Level Income</span>
                <Link href="/presentation/reward-pools" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <span className="text-sm tracking-widest uppercase font-mono hidden sm:block">Reward Pools</span>
                    <span className="text-sm font-mono sm:hidden">Next</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* ── BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none -z-0">
                <div className="absolute w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-8 flex flex-col gap-6">

                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 mb-4 p-1 animate-pulse">
                        <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center border border-white/20">
                            <span className="text-3xl md:text-4xl">📊</span>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">
                        Income Stream #3:{' '}
                        <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            Level Income
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-green-400 font-mono tracking-widest uppercase">18-Tier Distribution Plan</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                    {/* Left: Commission Breakdown */}
                    <div className="space-y-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white border-b border-white/10 pb-2">Commission Breakdown</h3>
                        <div className="space-y-3">
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                                className="flex items-center justify-between bg-white/5 p-4 rounded-xl border-l-4 border-green-400">
                                <div>
                                    <span className="block text-base md:text-lg font-bold text-white">Levels 1 – 5</span>
                                    <span className="text-sm text-neural-gold">Foundation Team</span>
                                </div>
                                <div className="text-2xl md:text-3xl font-black text-green-400">1.50%</div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                                className="flex items-center justify-between bg-white/5 p-4 rounded-xl border-l-4 border-emerald-500">
                                <div>
                                    <span className="block text-base md:text-lg font-bold text-white">Levels 6 – 10</span>
                                    <span className="text-sm text-neural-gold">Growth Network</span>
                                </div>
                                <div className="text-2xl md:text-3xl font-black text-emerald-500">1.00%</div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                                className="flex items-center justify-between bg-white/5 p-4 rounded-xl border-l-4 border-teal-600">
                                <div>
                                    <span className="block text-base md:text-lg font-bold text-white">Tiers 11 – 17</span>
                                    <span className="text-sm text-neural-gold">Deep Structure</span>
                                </div>
                                <div className="text-2xl md:text-3xl font-black text-teal-600">0.35%</div>
                            </motion.div>
                        </div>
                        <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/10">
                            <span className="text-neural-gold text-base">Total Distribution</span>
                            <span className="text-2xl font-bold text-white">~15%</span>
                        </div>
                    </div>

                    {/* Right: Qualification & Examples */}
                    <div className="space-y-5">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}
                            className="bg-red-500/10 rounded-2xl p-5 border border-red-500/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 px-2 py-1 bg-red-500/20 rounded-bl-xl">
                                <span className="text-red-400 font-bold text-xs uppercase">Important Rules</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                <span>⚡</span> Qualification Requirements
                            </h3>
                            <ul className="text-gray-200 text-sm md:text-base leading-relaxed space-y-2 list-disc pl-5">
                                <li>
                                    <strong className="text-white bg-red-500/20 px-1 rounded">TIER UPGRADE</strong>:{' '}
                                    You must hold a tier level <strong className="text-red-300">&ge; the package</strong> being purchased.
                                </li>
                                <li>
                                    <strong className="text-white bg-red-500/20 px-1 rounded">2 DIRECTS</strong>:{' '}
                                    To unlock Layer 6 and deeper (L6-L17), you must have personally referred at least 2 direct nodes.
                                </li>
                            </ul>
                            <div className="mt-3 text-xs text-red-400 italic">
                                * If you fail either check, the commission is permanently passed up to the Treasury.
                            </div>
                        </motion.div>

                        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                            <h3 className="text-lg font-bold text-green-300 mb-3">Earning Example</h3>
                            <p className="text-sm text-neural-gold mb-3">Team Member Level 5 Upgrade ($80)</p>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-black/30 p-3 rounded-lg text-center">
                                    <span className="block text-white/80 text-xs mb-1">If in Layers 1–5</span>
                                    <span className="block text-white font-bold text-lg">$1.20</span>
                                    <span className="block text-green-500 text-xs">(1.5%)</span>
                                </div>
                                <div className="bg-black/30 p-3 rounded-lg text-center">
                                    <span className="block text-white/80 text-xs mb-1">If in Layers 6–10</span>
                                    <span className="block text-white font-bold text-lg">$0.80</span>
                                    <span className="block text-green-500 text-xs">(1.0%)</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-xs text-white/80 font-mono border-t border-white/5 pt-3">
                            Build Wide &amp; Deep for Max Income
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="sticky bottom-0 z-50 bg-black/70 backdrop-blur-md border-t border-white/10 px-4 md:px-8 py-3 flex items-center justify-between gap-4">
                <Link href="/presentation/matrix-income"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:block">Matrix Income</span>
                    <span className="sm:hidden">Prev</span>
                </Link>
                <div className="flex gap-2">
                    {['direct-referral', 'matrix-income', 'level-income', 'reward-pools'].map((s, i) => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${s === 'level-income' ? 'bg-green-400 scale-125' : 'bg-white/20'}`} />
                    ))}
                </div>
                <Link href="/presentation/reward-pools"
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-green-500/20 transition-all hover:scale-105">
                    <span className="hidden sm:block">Next: Reward Pools</span>
                    <span className="sm:hidden">Next</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
