'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export default function Presentation() {
    const [mounted, setMounted] = useState(false);
    const [expanded, setExpanded] = useState<number | null>(null);

    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const incomeStreams = [
        {
            number: '1',
            title: 'Direct Referral Income',
            icon: '🤝',
            mainStat: '10%',
            mainLabel: 'Commission',
            details: ['On Registration & Upgrades', 'Levels 1 to 24', 'Unlimited Width'],
            badge: 'INSTANT PAYMENT',
            borderColor: 'border-cyan-400/40',
            bgGlow: 'from-cyan-500/20 to-blue-600/10',
            badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
            titleColor: 'text-cyan-300',
            expandBg: 'bg-cyan-900/20 border-cyan-500/20',
            link: '/presentation/direct-referral',
            expandDetails: [
                { label: 'Commission Rate', value: '10% instant on every referral' },
                { label: 'Coverage', value: 'Registration + all 24 level upgrades' },
                { label: 'Payment', value: 'Direct to wallet, no waiting' },
                { label: 'Requirement', value: 'No qualifications needed' },
                { label: 'Potential (100 refs)', value: '$500+ from Level 1 alone' },
            ],
        },
        {
            number: '2',
            title: 'Matrix Level Income',
            icon: '🔺',
            mainStat: '70%',
            mainLabel: 'Distribution',
            details: ['2×2 Binary Matrix', 'Auto Spillover', 'Levels 2 to 24'],
            badge: '24 LAYERS DEEP',
            borderColor: 'border-purple-400/40',
            bgGlow: 'from-purple-500/20 to-pink-600/10',
            badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            titleColor: 'text-purple-300',
            expandBg: 'bg-purple-900/20 border-purple-500/20',
            link: '/presentation/matrix-income',
            expandDetails: [
                { label: 'Distribution', value: '70% of upgrade cost to upline' },
                { label: 'Structure', value: '2×2 Binary — auto fill L→R' },
                { label: 'Spillover', value: 'Global spillover supported' },
                { label: 'Levels', value: 'L2 to L24 (23 levels)' },
                { label: 'Qualification', value: 'Must be at higher level than payer' },
            ],
        },
        {
            number: '3',
            title: 'Level Income',
            icon: '💰',
            mainStat: '20%',
            mainLabel: 'Total Dist.',
            details: ['24 Unilevel Layers', 'L1-5: 2%, L6-10: 1%', 'L11-24: 0.35% each'],
            badge: 'PASSIVE INCOME',
            borderColor: 'border-green-400/40',
            bgGlow: 'from-green-500/20 to-emerald-600/10',
            badgeBg: 'bg-green-500/20 text-green-300 border-green-500/30',
            titleColor: 'text-green-300',
            expandBg: 'bg-green-900/20 border-green-500/20',
            link: '/presentation/level-income',
            expandDetails: [
                { label: 'Levels 1–5', value: '2.00% per level (Foundation)' },
                { label: 'Levels 6–10', value: '1.00% per level (Growth)' },
                { label: 'Levels 11–24', value: '0.35% per level (Deep)' },
                { label: 'Total', value: '~20% total distribution' },
                { label: 'Requirement', value: 'Must be upgraded higher than payer' },
            ],
        },
        {
            number: '4',
            title: 'Reward Pools',
            icon: '🏆',
            mainStat: '5%',
            mainLabel: 'Global Revenue',
            details: ['Top Performers', 'Achiever Bonuses', 'Periodic Distribution'],
            badge: 'GLOBAL SHARE',
            borderColor: 'border-yellow-400/40',
            bgGlow: 'from-yellow-500/20 to-orange-600/10',
            badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
            titleColor: 'text-yellow-300',
            expandBg: 'bg-yellow-900/20 border-yellow-500/20',
            link: '/presentation/reward-pools',
            expandDetails: [
                { label: 'Allocation', value: '5% of all global revenue' },
                { label: 'Top Performers', value: 'Highest direct referral volume' },
                { label: 'Achievers', value: 'Rank & team growth milestones' },
                { label: 'Leaders', value: 'Consistent active participation' },
                { label: 'Payout', value: 'Periodic — automated on-chain' },
            ],
        },
    ];

    const toggle = (i: number) => setExpanded(expanded === i ? null : i);

    return (
        <div className="min-h-screen bg-[#050510] font-sans text-white">

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] z-10" />
                <div className="absolute w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* Main Content */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">GICLUB</span>
                        <span className="text-white/80"> — 4 Income Streams</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">Tap a card to expand details</p>
                </motion.div>

                {/* 2×2 Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    {incomeStreams.map((stream, index) => {
                        const isOpen = expanded === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.12, duration: 0.5 }}
                                className={`relative rounded-2xl border ${stream.borderColor} bg-gradient-to-br ${stream.bgGlow} backdrop-blur-xl overflow-hidden transition-all duration-300`}
                            >
                                <div className="absolute inset-0 bg-black/40 rounded-2xl pointer-events-none" />

                                {/* Card Header — always visible, clickable */}
                                <button
                                    onClick={() => toggle(index)}
                                    className="relative z-10 w-full text-left p-5 md:p-6 flex items-start justify-between gap-3 group"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="text-4xl md:text-5xl mt-0.5">{stream.icon}</div>
                                        <div className="flex-1">
                                            <h2 className={`text-xl md:text-2xl font-bold ${stream.titleColor} mb-1`}>
                                                {stream.number}. {stream.title}
                                            </h2>
                                            <div className="text-2xl md:text-3xl font-black text-white leading-tight">{stream.mainStat}</div>
                                            <div className="text-xs text-white/50 font-semibold uppercase tracking-wide">{stream.mainLabel}</div>
                                            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
                                                {stream.details.map((d, i) => (
                                                    <span key={i} className="text-xs text-gray-400">{d}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* View More button */}
                                    <div className={`flex flex-col items-center gap-1 shrink-0 px-3 py-2 rounded-xl border transition-all duration-200 ${isOpen ? `${stream.badgeBg} scale-95` : 'border-white/10 bg-white/5 text-white/50 group-hover:border-white/20 group-hover:text-white/80'}`}>
                                        <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                                            {isOpen ? 'Less' : 'View More'}
                                        </span>
                                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </div>
                                </button>

                                {/* Expandable Content */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="expand"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className={`relative z-10 mx-4 mb-5 rounded-xl border p-4 ${stream.expandBg} space-y-2`}>
                                                {stream.expandDetails.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-start gap-3 text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                                        <span className="text-gray-400 shrink-0">{item.label}</span>
                                                        <span className="text-white font-semibold text-right">{item.value}</span>
                                                    </div>
                                                ))}

                                                {/* Badge + Go to slide */}
                                                <div className="flex items-center justify-between pt-2 gap-3 flex-wrap">
                                                    <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded border ${stream.badgeBg}`}>
                                                        {stream.badge}
                                                    </span>
                                                    <Link
                                                        href={stream.link}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black transition-all hover:scale-105 ${stream.badgeBg} border`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        View Full Slide <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Extra Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Link href="/presentation/how-to-join">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                            className="p-5 rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-900/20 to-cyan-900/10 backdrop-blur-xl cursor-pointer hover:scale-[1.02] transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">⚙️</span>
                                <div>
                                    <h3 className="text-xl font-bold text-teal-300 group-hover:text-teal-200 transition-colors">How to Join & Upgrade</h3>
                                    <p className="text-sm text-gray-500">Step-by-step registration & upgrade guide</p>
                                </div>
                                <ArrowRight className="ml-auto w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
                            </div>
                        </motion.div>
                    </Link>
                    <Link href="/presentation/income-calculator">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                            className="p-5 rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-yellow-900/10 backdrop-blur-xl cursor-pointer hover:scale-[1.02] transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">📊</span>
                                <div>
                                    <h3 className="text-xl font-bold text-orange-300 group-hover:text-orange-200 transition-colors">Detailed Income Calculator</h3>
                                    <p className="text-sm text-gray-500">Level costs, matrix income, earning scenarios</p>
                                </div>
                                <ArrowRight className="ml-auto w-5 h-5 text-white/20 group-hover:text-white/60 transition-colors" />
                            </div>
                        </motion.div>
                    </Link>
                </div>

                {/* Bottom Summary */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center space-y-4">
                    <div className="inline-block px-6 md:px-8 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-gray-300 text-base md:text-lg font-semibold">Total Investment: </span>
                        <span className="text-white text-base md:text-lg font-black">$5 to Start</span>
                        <span className="text-gray-400 text-base md:text-lg"> (24 Levels) · </span>
                        <span className="text-yellow-400 text-base md:text-lg font-bold italic">Unlimited Potential</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="text-yellow-500">⚙️</span>
                            <span><strong className="text-white">Network:</strong> BSC Mainnet</span>
                        </div>
                        <span className="text-white/20 hidden sm:block">|</span>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span><strong className="text-white">Payment:</strong> Native BNB</span>
                            <span className="text-yellow-500">🪙</span>
                        </div>
                    </div>
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white transition-colors text-sm">
                            <ArrowLeft size={16} /> Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
