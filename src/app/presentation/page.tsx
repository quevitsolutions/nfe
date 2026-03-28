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
            details: ['On Registration & Upgrades', 'All 18 Reward Tiers', 'Unlimited Width'],
            badge: 'INSTANT PAYMENT',
            borderColor: 'border-cyan-400/40',
            bgGlow: 'from-cyan-500/20 to-blue-600/10',
            badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
            titleColor: 'text-cyan-300',
            expandBg: 'bg-cyan-900/20 border-cyan-500/20',
            link: '/presentation/direct-referral',
            expandDetails: [
                { label: 'Commission Rate', value: '10% instant on every referral' },
                { label: 'Coverage', value: 'Registration + all 17 tier upgrades' },
                { label: 'Payment', value: 'Direct to wallet, no waiting' },
                { label: 'Requirement', value: 'No qualifications needed' },
                { label: 'Potential (100 refs)', value: '$500+ from L1 alone' },
            ],
        },
        {
            number: '2',
            title: 'Matrix Level Income',
            icon: '🔺',
            mainStat: '70%',
            mainLabel: 'Distribution',
            details: ['2×2 Binary Matrix', 'Auto Spillover', 'Tiers L1 to L18'],
            badge: '18 LAYERS DEEP',
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
                { label: 'Matrix Depth', value: 'Earns up to 18 layers deep' },
                { label: 'Qualification', value: 'Must be upgraded > tier level' },
            ],
        },
        {
            number: '3',
            title: 'Level Income',
            icon: '💰',
            mainStat: '15%',
            mainLabel: 'Total Dist.',
            details: ['17 Unilevel Layers', 'L1-5: 1.5%, L6-10: 1.0%', 'L11-17: 0.35% each'],
            badge: 'PASSIVE INCOME',
            borderColor: 'border-green-400/40',
            bgGlow: 'from-green-500/20 to-emerald-600/10',
            badgeBg: 'bg-green-500/20 text-green-300 border-green-500/30',
            titleColor: 'text-green-300',
            expandBg: 'bg-green-900/20 border-green-500/20',
            link: '/presentation/level-income',
            expandDetails: [
                { label: 'Layers 1–5', value: '1.50% per layer (Foundation)' },
                { label: 'Layers 6–10', value: '1.00% per layer (Growth)' },
                { label: 'Layers 11–17', value: '0.35% per layer (Deep)' },
                { label: 'Total', value: '~15% total distribution' },
                { label: 'Qualification', value: '2 Directs for L6+ Layers' },
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
                { label: 'Payout', value: 'Real-Time Auto Distributed' },
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
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                        <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent uppercase">AIPCore</span>
                        <span className="text-white/80 block md:inline md:ml-4"> — 4 Reward Flows</span>
                    </h1>
                    <p className="text-white/80 text-sm mt-3 tracking-widest uppercase">Select an architectural layer to expand technical details</p>
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
                                className={`relative overflow-hidden bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border-t border-l border-white/20 border-b border-r border-black/50 shadow-[6px_6px_15px_rgba(0,0,0,0.4),-2px_-2px_8px_rgba(255,255,255,0.02),inset_1px_1px_2px_rgba(255,255,255,0.2)] rounded-[2rem] transition-all duration-300 group ${isOpen ? `shadow-[10px_10px_30px_rgba(0,0,0,0.7)] scale-[1.01] z-10 ${stream.borderColor}` : ''}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stream.bgGlow} opacity-30 pointer-events-none`} />

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
                                                    <span key={i} className="text-xs text-neural-gold">{d}</span>
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
                                            <div className="relative z-10 mx-5 mb-5 bg-black/40 border-t border-l border-black/80 border-b border-r border-white/10 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.1)] rounded-2xl p-5 space-y-3">
                                                {stream.expandDetails.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-start gap-3 text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                                        <span className="text-neural-gold shrink-0">{item.label}</span>
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
                            className="p-6 relative overflow-hidden bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border-t border-l border-white/20 border-b border-r border-black/50 shadow-[6px_6px_15px_rgba(0,0,0,0.4),-2px_-2px_8px_rgba(255,255,255,0.02),inset_1px_1px_2px_rgba(255,255,255,0.2)] rounded-[2rem] cursor-pointer hover:scale-[1.02] hover:shadow-[8px_8px_20px_rgba(20,184,166,0.2)] transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">⚙️</span>
                                <div>
                                    <h3 className="text-xl font-bold text-teal-300 group-hover:text-teal-200 transition-colors">How to Join & Upgrade</h3>
                                    <p className="text-sm text-white/80">Step-by-step registration & upgrade guide</p>
                                </div>
                                <ArrowRight className="ml-auto w-5 h-5 text-white/20 group-hover:text-neural-gold transition-colors" />
                            </div>
                        </motion.div>
                    </Link>
                    <Link href="/presentation/income-calculator">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                            className="p-6 relative overflow-hidden bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl border-t border-l border-white/20 border-b border-r border-black/50 shadow-[6px_6px_15px_rgba(0,0,0,0.4),-2px_-2px_8px_rgba(255,255,255,0.02),inset_1px_1px_2px_rgba(255,255,255,0.2)] rounded-[2rem] cursor-pointer hover:scale-[1.02] hover:shadow-[8px_8px_20px_rgba(249,115,22,0.2)] transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">📊</span>
                                <div>
                                    <h3 className="text-xl font-bold text-orange-300 group-hover:text-orange-200 transition-colors">Detailed Income Calculator</h3>
                                    <p className="text-sm text-white/80">Level costs, matrix income, earning scenarios</p>
                                </div>
                                <ArrowRight className="ml-auto w-5 h-5 text-white/20 group-hover:text-neural-gold transition-colors" />
                            </div>
                        </motion.div>
                    </Link>
                </div>

                {/* Bottom Summary */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center space-y-4">
                    <div className="inline-block px-6 md:px-8 py-3 bg-black/40 border-t border-l border-black/80 border-b border-r border-yellow-500/20 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.1)] rounded-2xl">
                        <span className="text-gray-300 text-base md:text-lg font-semibold">Total Investment: </span>
                        <span className="text-white text-base md:text-lg font-black">$5 to Start</span>
                        <span className="text-neural-gold text-base md:text-lg"> (18 Tiers L0–L17) · </span>
                        <span className="text-yellow-400 text-base md:text-lg font-bold italic">Unlimited Potential</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-neural-gold">
                            <span className="text-yellow-500">⚙️</span>
                            <span><strong className="text-white">Network:</strong> BSC Mainnet</span>
                        </div>
                        <span className="text-white/20 hidden sm:block">|</span>
                        <div className="flex items-center gap-2 text-sm text-neural-gold">
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
