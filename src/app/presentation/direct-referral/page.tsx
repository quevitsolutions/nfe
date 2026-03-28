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
                <span className="text-xs text-white/80 font-mono uppercase tracking-widest">Slide 1 / 4 — Direct Referral</span>
                <Link href="/presentation/matrix-income" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
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
                <span className="text-xs text-white/80 font-mono uppercase tracking-widest">Slide 1 / 4 — Direct Referral</span>
                <Link href="/presentation/matrix-income" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
                    <span className="text-sm tracking-widest uppercase font-mono hidden sm:block">Matrix Income</span>
                    <span className="text-sm font-mono sm:hidden">Next</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* ── BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none -z-0">
                <div className="absolute w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-8 flex flex-col gap-8">

                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-400 to-rose-600 shadow-lg shadow-red-500/30 mb-4 p-1 animate-pulse">
                        <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center border border-white/20">
                            <span className="text-3xl md:text-4xl">🤝</span>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight uppercase">
                        Stream #1:{' '}
                        <span className="bg-gradient-to-r from-red-400 to-rose-600 bg-clip-text text-transparent">
                            Direct Income
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-red-400/80 font-mono tracking-widest uppercase">Autonomous Node Network</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                    {/* Left: How It Works */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-red-400 border-b border-red-500/20 pb-3 uppercase tracking-wider">How It Works</h2>
                        <ul className="space-y-3">
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
                                    className="flex items-start gap-3 text-sm md:text-base lg:text-lg text-gray-300"
                                >
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mt-0.5 text-sm">✓</span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Earnings */}
                    <div className="space-y-5">
                        <div className="bg-black/40 border-t border-l border-black/80 border-b border-r border-white/10 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.1)] rounded-[2rem] p-6 lg:p-8 hover:border-white/30 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 px-3 py-1.5 bg-red-500/10 rounded-bl-2xl border-b border-l border-white/5">
                                <span className="text-red-400 font-bold text-sm">10% Commission</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-4">Earnings Breakdown</h3>
                            <div className="space-y-3 text-sm md:text-base">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">Registration (Level 1)</span>
                                    <span className="text-white font-mono font-bold">10% INSTANT</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-gray-400">Upgrades (L1 – L18)</span>
                                    <span className="text-white font-mono font-bold">10% INSTANT</span>
                                </div>
                                <div className="flex justify-between items-center pt-1">
                                    <span className="text-gray-400">Payment Mode</span>
                                    <span className="text-red-400 font-bold bg-red-900/30 px-3 py-1 rounded-full text-xs uppercase tracking-tighter">BNB (BEP20)</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Potential Earnings</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: "10 Referrals", val: "$50+", color: "from-red-500 to-rose-500" },
                                    { label: "50 Referrals", val: "$250+", color: "from-red-600 to-rose-600" },
                                    { label: "100 Referrals", val: "$500+", color: "from-red-700 to-rose-700" },
                                ].map((stat, i) => (
                                    <motion.div key={i} whileHover={{ scale: 1.05 }} className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-xl`}>
                                        <div className="relative overflow-hidden bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border-t border-l border-white/20 border-b border-r border-black/50 shadow-[6px_6px_15px_rgba(0,0,0,0.4),-2px_-2px_8px_rgba(255,255,255,0.02),inset_1px_1px_2px_rgba(255,255,255,0.2)] rounded-xl h-full p-4 flex flex-col justify-center">
                                            <div className="text-gray-300 text-xs mb-1 text-center font-bold">{stat.label}</div>
                                            <div className="text-lg md:text-xl font-black text-white text-center drop-shadow-md">{stat.val}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-xs text-white/80 mt-3 text-center">* Estimates based on Level 1 only. Upgrades increase earnings significantly.</p>
                        </div>
                    </div>
                </div>

                {/* Info footer */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm text-white/80 py-2 border-t border-white/5">
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
                        <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${s === 'direct-referral' ? 'bg-red-500 scale-125 shadow-[0_0_8px_rgba(227,6,19,0.5)]' : 'bg-white/20'}`} />
                    ))}
                </div>
                <Link href="/presentation/matrix-income"
                    className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-800 text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-red-500/20 transition-all hover:scale-105 hover:shadow-red-500/40 border border-red-500/30">
                    <span>Next: Matrix Income</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
