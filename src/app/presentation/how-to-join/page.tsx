'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Wallet, Link2, LogIn, CreditCard, ChevronUp, TrendingUp, CheckCircle2, Info } from 'lucide-react';

const joinSteps = [
    {
        num: 1,
        title: 'CONNECT WALLET',
        icon: <Wallet className="w-6 h-6" />,
        details: [
            'Install MetaMask or compatible wallet',
            'Connect to BSC Mainnet (Chain ID: 56)',
            'Ensure you have BNB for gas + registration',
        ],
    },
    {
        num: 2,
        title: 'GET REFERRAL LINK',
        icon: <Link2 className="w-6 h-6" />,
        details: [
            'Obtain referral link from sponsor',
            'Or use default referrer if no sponsor',
            'Keep link for your own referrals later',
        ],
    },
    {
        num: 3,
        title: 'PROTOCOL REGISTRATION',
        icon: <LogIn className="w-6 h-6" />,
        details: [
            'Visit platform website',
            "Click 'Register' or 'Join'",
            'Enter referral address',
            'Approve transaction in wallet',
        ],
    },
    {
        num: 4,
        title: 'ATOMIC SETTLEMENT',
        icon: <CreditCard className="w-6 h-6" />,
        details: [
            'Level 1 cost: $5 paid in BNB',
            'Zero Admin Fees! 100% Distribution',
            'Total: Just the $5 + BNB gas',
            'Transaction confirms in seconds',
        ],
    },
];

const upgradeSteps = [
    {
        num: 1,
        title: 'AUDIT STATUS',
        icon: <CheckCircle2 className="w-6 h-6" />,
        details: [
            'View current level in dashboard',
            'See available upgrade levels',
            'Review costs for next levels',
        ],
    },
    {
        num: 2,
        title: 'COST CALCULATION',
        icon: <Info className="w-6 h-6" />,
        details: [
            'Each level has fixed USD cost',
            'BNB amount adjusts with live oracle price',
            'Zero Admin Fees! 100% Distribution',
            'Can upgrade multiple levels at once',
        ],
    },
    {
        num: 3,
        title: 'UPGRADE EXECUTION',
        icon: <ChevronUp className="w-6 h-6" />,
        details: [
            "Click 'Upgrade' in dashboard",
            'Select number of levels',
            'Approve BNB amount',
            'Confirm transaction',
        ],
    },
    {
        num: 4,
        title: 'YIELD SCALING',
        icon: <TrendingUp className="w-6 h-6" />,
        details: [
            'Higher levels = more income potential',
            'Unlock royalty layers',
            'Qualify for more commissions',
            'Increase matrix earnings',
        ],
    },
];

const levelCosts = [
    { level: 1, cost: '$5' },
    { level: 5, cost: '$80' },
    { level: 10, cost: '$2,560' },
    { level: 15, cost: '$81,920' },
    { level: 17, cost: '$327,680' },
];

export default function HowToJoinSlide() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#f8faf8] overflow-auto relative font-sans text-slate-800">

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[150px] top-0 left-1/4" />
                <div className="absolute w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[150px] bottom-0 right-1/4" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* Navigation */}
            <Link href="/presentation" className="fixed top-8 left-8 z-50 flex items-center gap-3 text-slate-500 hover:text-brand-green transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:block">Back to Presentation Hub</span>
                <span className="sm:hidden">Back</span>
            </Link>

            <div className="relative z-20 max-w-7xl mx-auto px-8 py-24">

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-brand-mint border border-brand-green/10 shadow-xl mb-8">
                        <TrendingUp className="w-8 h-8 text-brand-green" />
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic drop-shadow-sm">
                        <span className="text-brand-green">JOIN</span>
                        <span className="text-slate-400 mx-4 opacity-50">&</span>
                        <span className="text-brand-red">SCALE</span>
                    </h1>
                    <p className="text-[10px] md:text-xs text-slate-400 font-black tracking-[0.5em] uppercase italic mt-4">Protocol Deployment & Upgrade Archetype</p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-20">

                    {/* LEFT: How to Join */}
                    <div className="space-y-10">
                        <h2 className="text-2xl font-black text-brand-green border-b-2 border-brand-green/10 pb-6 uppercase italic tracking-tight flex items-center gap-4">
                            01. Deployment Protocol
                            <span className="text-slate-400 text-xs font-black opacity-30 italic">(Registration)</span>
                        </h2>
                        <div className="space-y-6">
                            {joinSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex gap-6 items-start p-8 rounded-[2.5rem] bg-white border border-brand-green/5 shadow-2xl hover:border-brand-green/20 transition-all group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-mint flex items-center justify-center text-brand-green font-black text-lg border border-brand-green/10 shadow-inner group-hover:scale-110 transition-transform">
                                        {step.num}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">{step.title}</h3>
                                            <div className="text-brand-green opacity-40">{step.icon}</div>
                                        </div>
                                        <ul className="space-y-3">
                                            {step.details.map((d, j) => (
                                                <li key={j} className="text-sm font-bold text-slate-500 flex items-start gap-3 italic">
                                                    <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 opacity-40" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Registration Complete */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                            className="p-8 rounded-[2rem] bg-slate-900 text-center shadow-3xl group"
                        >
                            <span className="text-brand-green text-xl font-black uppercase italic tracking-widest">Protocol Activation Complete</span>
                            <p className="text-white/40 text-[10px] mt-2 uppercase tracking-[0.3em] font-black italic">Node Priority L1 Established • Yield Stream Open</p>
                        </motion.div>
                    </div>

                    {/* RIGHT: How to Upgrade */}
                    <div className="space-y-10">
                        <h2 className="text-2xl font-black text-brand-red border-b-2 border-brand-red/10 pb-6 uppercase italic tracking-tight flex items-center gap-4">
                            02. Scaling Strategy
                            <span className="text-slate-400 text-xs font-black opacity-30 italic">(Upgrading)</span>
                        </h2>
                        <div className="space-y-6">
                            {upgradeSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex gap-6 items-start p-8 rounded-[2.5rem] bg-white border border-brand-red/5 shadow-2xl hover:border-brand-red/20 transition-all group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-red/5 flex items-center justify-center text-brand-red font-black text-lg border border-brand-red/10 shadow-inner group-hover:scale-110 transition-transform">
                                        {step.num}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">{step.title}</h3>
                                            <div className="text-brand-red opacity-40">{step.icon}</div>
                                        </div>
                                        <ul className="space-y-3">
                                            {step.details.map((d, j) => (
                                                <li key={j} className="text-sm font-bold text-slate-500 flex items-start gap-3 italic">
                                                    <CheckCircle2 className="w-4 h-4 text-brand-red mt-0.5 opacity-40" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Earn More */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                            className="p-8 rounded-[2rem] bg-brand-mint border border-brand-red/10 text-center shadow-3xl"
                        >
                            <span className="text-brand-red text-xl font-black uppercase italic tracking-widest">Exponential Yield Scaling</span>
                            <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-[0.3em] font-black italic">Tier Parification Required • Maximize Matrix Extraction</p>
                        </motion.div>
                    </div>
                </div>

                {/* Quick Reference Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                    className="mb-12"
                >
                    <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.4em] italic text-center">Protocol Cost Reference Archetype</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {levelCosts.map((lc, i) => (
                            <div key={i} className="px-8 py-4 rounded-2xl bg-white border border-brand-mint shadow-xl group hover:-translate-y-1 transition-all">
                                <span className="text-brand-green font-black uppercase text-[10px] tracking-widest italic mr-4">Node Tier {lc.level}</span>
                                <span className="text-slate-900 font-black text-xl italic tracking-tighter">{lc.cost}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Requirements Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                    className="mb-16 text-center"
                >
                    <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.4em] italic">Pre-Deployment Requirements</h3>
                    <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black text-slate-600 uppercase tracking-widest italic">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-brand-green" />
                            BSC-Compatible Web3 Wallet
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-brand-green" />
                            Native BNB Asset (BEP20)
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-brand-green" />
                            Valid Protocol Referral Hash
                        </span>
                    </div>
                </motion.div>

                {/* Bottom Banner */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                    className="w-full p-8 rounded-[3rem] bg-white border border-brand-green/10 text-center shadow-3xl"
                >
                    <p className="text-lg font-black text-slate-900 uppercase tracking-tight italic">
                        Atomic Protocol Activation <span className="text-slate-300 mx-4">|</span>
                        Zero Admin Intervention <span className="text-slate-300 mx-4">|</span>
                        Immediate Asset Liquidity
                    </p>
                </motion.div>

            </div>
        </div>
    );
}



