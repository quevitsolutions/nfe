'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Trophy, Globe, Star, Zap, CheckCircle2 } from 'lucide-react';

export default function RewardPoolsSlide() {
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
                <Link href="/presentation/level-income" className="flex items-center gap-3 text-slate-500 hover:text-brand-green transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:block">Level Income</span>
                    <span className="sm:hidden">Prev</span>
                </Link>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic">Slide 4 / 4 — Reward Pools</span>
                <Link href="/presentation" className="flex items-center gap-3 text-slate-500 hover:text-brand-green transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                    <span className="hidden sm:block">Presentation Hub</span>
                    <span className="sm:hidden">Finish</span>
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
                        <Trophy className="w-10 h-10 md:w-12 md:h-12 text-brand-green relative z-10" />
                    </motion.div>
                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">
                        Stream #4:{' '}
                        <span className="text-brand-green">Reward Pools</span>
                    </h1>
                    <p className="text-[10px] md:text-xs text-slate-500 font-black tracking-[0.4em] uppercase italic">Global Protocol Revenue Participation</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

                    {/* Left: Pool Distribution */}
                    <div className="flex flex-col justify-center space-y-8">
                        <h3 className="text-2xl font-black text-slate-800 border-b-2 border-brand-green/10 pb-4 uppercase italic tracking-tight flex items-center gap-3">
                            <Globe className="w-6 h-6 text-brand-green" />
                            Pool Framework
                        </h3>

                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
                            className="bg-white border border-brand-green/10 rounded-[3rem] p-1 shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-brand-green/[0.02] group-hover:bg-brand-green/[0.05] transition-colors" />
                            <div className="relative z-10 bg-white rounded-[2.8rem] p-10 md:p-12 text-center">
                                <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-4 font-black italic">Total Global Allocation</div>
                                <div className="text-7xl md:text-9xl font-black text-slate-900 mb-4 italic tracking-tighter drop-shadow-md group-hover:scale-110 transition-transform duration-700">5.00%</div>
                                <div className="text-brand-green font-black text-[10px] uppercase tracking-[0.3em] italic">of Gross Protocol Flow</div>
                            </div>
                        </motion.div>

                        <p className="text-slate-500 font-bold text-sm md:text-base leading-relaxed text-center italic">
                            A fixed percentage of <strong className="text-slate-900">EVERY</strong> node propagation in the ecosystem
                            is autonomously collected into the Global Reward Pool.
                        </p>
                    </div>

                    {/* Right: Qualification */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-800 border-b-2 border-brand-green/10 pb-4 uppercase italic tracking-tight flex items-center gap-3">
                            <Star className="w-6 h-6 text-brand-green" />
                            Eligibility Matrix
                        </h3>
                        <ul className="space-y-6">
                            {[
                                { title: "Strategic Nodes", desc: "Top Direct Referral Volume & Quality" },
                                { title: "Network Pathfinders", desc: "Rapid Tier Advancement & Team Scale" },
                                { title: "Stability Anchors", desc: "Consistent Protocol Participation & Health" },
                            ].map((item, i) => (
                                <motion.li key={i}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-start gap-6 p-6 bg-white border border-brand-mint rounded-[2rem] shadow-xl hover:border-brand-green/30 transition-all group">
                                    <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-mint flex items-center justify-center text-brand-green group-hover:rotate-12 transition-transform shadow-inner">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </span>
                                    <div>
                                        <strong className="block text-slate-900 text-lg font-black uppercase italic tracking-tight mb-1">{item.title}</strong>
                                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">{item.desc}</span>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-2 font-black italic">Settlement Cycle</span>
                            <span className="text-2xl font-black text-white uppercase italic tracking-tighter">Periodic Atomic Payouts</span>
                            <span className="block text-brand-green text-[8px] mt-2 uppercase tracking-[0.4em] font-black italic">(Verifiable Smart Contract Logic)</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-8 pb-12">
                    <Link href="/presentation"
                        className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all italic group">
                        <Zap className="w-5 h-5 text-brand-green group-hover:animate-pulse" />
                        Complete Roadmap Review
                    </Link>
                </div>
            </div>

            {/* ── BOTTOM NAV ── */}
            <div className="sticky bottom-0 z-50 bg-white/80 backdrop-blur-md border-t border-brand-green/10 px-6 md:px-12 py-5 flex items-center justify-between gap-8">
                <Link href="/presentation/level-income"
                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-800 hover:scale-105 italic shadow-xl">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:block">Level Income</span>
                    <span className="sm:hidden">Prev</span>
                </Link>
                <div className="flex gap-3">
                    {['direct-referral', 'matrix-income', 'level-income', 'reward-pools'].map((s, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${s === 'reward-pools' ? 'w-10 bg-brand-green shadow-lg shadow-brand-green/20' : 'w-4 bg-brand-green/10'}`} />
                    ))}
                </div>
                <Link href="/presentation"
                    className="flex items-center gap-3 bg-brand-green text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-brand-green/20 transition-all hover:scale-105 hover:bg-brand-green/90 border border-brand-green/20 italic">
                    <span>Finish Review</span>
                    <ArrowRight className="w-4 h-4 animate-pulse" />
                </Link>
            </div>
        </div>
    );
}



