'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function DirectReferralSlide() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050510] flex flex-col font-sans text-white">

            {/* ── TOP NAV BAR ── */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 bg-black/60 backdrop-blur-md border-b border-white/10">
                <Link href="/presentation" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm tracking-widest uppercase font-mono hidden sm:block">Back to Presentation</span>
                    <span className="text-sm font-mono sm:hidden">Back</span>
                </Link>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Slide 1 / 4 — Direct Referral</span>
                <Link href="/presentation/matrix-income" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <span className="text-sm tracking-widest uppercase font-mono hidden sm:block">Matrix Income</span>
                    <span className="text-sm font-mono sm:hidden">Next</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* ── BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none -z-0">
                <div className="absolute w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-8 flex flex-col gap-8">

                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 shadow-lg shadow-orange-500/30 mb-4 p-1 animate-pulse">
                        <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center border border-white/20">
                            <span className="text-3xl md:text-4xl">🤝</span>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight">
                        Income Stream #1:{' '}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Direct Referral Income
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-blue-400 font-mono tracking-widest uppercase">Great Income Club on BSC</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                    {/* Left: How It Works */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-blue-400 border-b border-blue-500/20 pb-3">How It Works</h2>
                        <ul className="space-y-3">
                            {[
                                "When someone registers using your referral link",
                                "You earn 10% of their Level 1 registration fee",
                                "Instant payment directly to your wallet",
                                "Earn 10% on EVERY level upgrade (Level 1 to 24)",
                                "No qualification requirements needed",
                            ].map((item, i) => (
                                <motion.li key={i}
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-3 text-sm md:text-base lg:text-lg text-gray-200"
                                >
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mt-0.5 text-sm">✓</span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Earnings */}
                    <div className="space-y-5">
                        <div className="bg-white/5 rounded-2xl p-5 md:p-7 border border-white/10 hover:border-yellow-500/30 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 px-3 py-1.5 bg-yellow-500/10 rounded-bl-2xl border-b border-l border-white/5">
                                <span className="text-yellow-400 font-bold text-sm">10% Commission</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-4">Earnings Breakdown</h3>
                            <div className="space-y-3 text-sm md:text-base">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">Registration (Level 1)</span>
                                    <span className="text-white font-mono">10% Instant</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">Upgrades (L2 – L24)</span>
                                    <span className="text-white font-mono">10% Instant</span>
                                </div>
                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-gray-400">Payment Mode</span>
                                    <span className="text-green-400 font-bold bg-green-900/30 px-3 py-1 rounded-full text-xs">BNB (BEP20)</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Potential Earnings</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: "10 Referrals", val: "$50+", color: "from-blue-500 to-cyan-500" },
                                    { label: "50 Referrals", val: "$250+", color: "from-green-500 to-emerald-500" },
                                    { label: "100 Referrals", val: "$500+", color: "from-purple-500 to-pink-500" },
                                ].map((stat, i) => (
                                    <motion.div key={i} whileHover={{ scale: 1.05 }} className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-xl`}>
                                        <div className="bg-black/80 h-full rounded-[10px] p-3 text-center backdrop-blur-xl">
                                            <div className="text-gray-300 text-xs mb-1">{stat.label}</div>
                                            <div className="text-lg md:text-xl font-black text-white">{stat.val}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-3 text-center">* Estimates based on Level 1 only. Upgrades increase earnings significantly.</p>
                        </div>
                    </div>
                </div>

                {/* Info footer */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm text-gray-500 py-2 border-t border-white/5">
                    <span>Network: <strong className="text-gray-300">BSC Mainnet</strong></span>
                    <span className="hidden sm:block">|</span>
                    <span>Currency: <strong className="text-gray-300">BNB</strong></span>
                    <span className="hidden sm:block">|</span>
                    <span>Payment: <strong className="text-gray-300">Instant P2P</strong></span>
                </div>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="sticky bottom-0 z-50 bg-black/70 backdrop-blur-md border-t border-white/10 px-4 md:px-8 py-3 flex items-center justify-between gap-4">
                <Link href="/presentation"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:block">Hub</span>
                </Link>
                <div className="flex gap-2">
                    {['direct-referral', 'matrix-income', 'level-income', 'reward-pools'].map((s, i) => (
                        <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${s === 'direct-referral' ? 'bg-yellow-400 scale-125' : 'bg-white/20'}`} />
                    ))}
                </div>
                <Link href="/presentation/matrix-income"
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-orange-500/20 transition-all hover:scale-105 hover:shadow-orange-500/40">
                    <span>Next: Matrix Income</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
