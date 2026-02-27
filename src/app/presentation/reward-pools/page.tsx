'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function RewardPoolsSlide() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050510] flex flex-col font-sans text-white">

            {/* ── TOP NAV BAR ── */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-black/60 backdrop-blur-md border-b border-white/10">
                <Link href="/presentation/level-income" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm tracking-widest uppercase font-mono hidden sm:block">Level Income</span>
                    <span className="text-sm font-mono sm:hidden">Prev</span>
                </Link>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Slide 4 / 4 — Reward Pools</span>
                <Link href="/presentation" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <span className="text-sm tracking-widest uppercase font-mono hidden sm:block">Hub</span>
                    <span className="text-sm font-mono sm:hidden">Finish</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* ── BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none -z-0">
                <div className="absolute w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-8 flex flex-col gap-6">

                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 shadow-lg shadow-orange-500/30 mb-4 p-1 animate-pulse">
                        <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center border border-white/20">
                            <span className="text-3xl md:text-4xl">🏆</span>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">
                        Income Stream #4:{' '}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Reward Pools
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-yellow-400 font-mono tracking-widest uppercase">Global Revenue Sharing</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                    {/* Left: Pool Distribution */}
                    <div className="flex flex-col justify-center space-y-5">
                        <h3 className="text-xl md:text-2xl font-bold text-white border-b border-white/10 pb-3">Pool Distribution</h3>

                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-yellow-500 to-orange-600 p-0.5 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                            <div className="bg-black/80 backdrop-blur-xl rounded-[22px] p-6 md:p-8 text-center border border-white/10">
                                <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider mb-2">Total Allocation</div>
                                <div className="text-6xl md:text-8xl font-black text-white mb-2">5%</div>
                                <div className="text-yellow-400 font-bold text-lg">of Global Revenue</div>
                            </div>
                        </motion.div>

                        <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center">
                            A dedicated percentage of <strong className="text-white">EVERY</strong> transaction in the ecosystem
                            is collected into the Global Reward Pool.
                        </p>
                    </div>

                    {/* Right: Qualification */}
                    <div className="space-y-5">
                        <h3 className="text-xl md:text-2xl font-bold text-white">Who Qualifies?</h3>
                        <ul className="space-y-4">
                            {[
                                { title: "Top Performers", desc: "Highest direct referral volume" },
                                { title: "Achievers", desc: "Rank advancements & team growth" },
                                { title: "Community Leaders", desc: "Consistent active participation" },
                            ].map((item, i) => (
                                <motion.li key={i}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-colors">
                                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-lg">★</span>
                                    <div>
                                        <strong className="block text-white text-sm md:text-base">{item.title}</strong>
                                        <span className="text-gray-400 text-sm">{item.desc}</span>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="bg-blue-900/20 rounded-2xl p-5 border border-blue-500/20 text-center">
                            <span className="block text-blue-300 text-xs uppercase tracking-widest mb-1">Payout Frequency</span>
                            <span className="text-xl font-bold text-white">Periodic Distribution</span>
                            <span className="block text-gray-500 text-xs mt-1">(Automated via Smart Contract)</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 pt-2">
                            <span>👑 Recognize Excellence</span>
                            <span>🌍 Global Share</span>
                            <span>🚀 Infinite Motivation</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-2 pb-4">
                    <Link href="/presentation"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-8 py-3 rounded-full font-black text-base shadow-lg shadow-orange-500/30 hover:scale-105 transition-all">
                        🎉 Back to Presentation Hub
                    </Link>
                </div>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="sticky bottom-0 z-50 bg-black/70 backdrop-blur-md border-t border-white/10 px-4 md:px-8 py-3 flex items-center justify-between gap-4">
                <Link href="/presentation/level-income"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:block">Level Income</span>
                    <span className="sm:hidden">Prev</span>
                </Link>
                <div className="flex gap-2">
                    {['direct-referral', 'matrix-income', 'level-income', 'reward-pools'].map((s, i) => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${s === 'reward-pools' ? 'bg-yellow-400 scale-125' : 'bg-white/20'}`} />
                    ))}
                </div>
                <Link href="/presentation"
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
                    <span>Finish</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
