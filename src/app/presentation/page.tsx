'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, Zap, Layers, Gift } from 'lucide-react';

export default function Presentation() {
    const [mounted, setMounted] = useState(false);
    const [expanded, setExpanded] = useState<number | null>(null);

    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const incomeStreams = [
        {
            number: '1',
            title: 'Direct Referral Income',
            icon: <Zap className="w-12 h-12 text-brand-green" />,
            mainStat: '10%',
            mainLabel: 'Commission',
            details: ['On Registration & Upgrades', 'All 18 Reward Tiers', 'Unlimited Width'],
            badge: 'INSTANT PAYMENT',
            borderColor: 'border-brand-green/20',
            bgGlow: 'from-brand-green/20 to-brand-green/5',
            badgeBg: 'bg-brand-mint text-brand-green border-brand-green/20',
            titleColor: 'text-brand-green',
            expandBg: 'bg-brand-mint border-brand-green/10',
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
            icon: <Layers className="w-12 h-12 text-brand-red" />,
            mainStat: '70%',
            mainLabel: 'Distribution',
            details: ['2x2 Binary Matrix', 'Auto Spillover', 'Tiers L1 to L18'],
            badge: '18 LAYERS DEEP',
            borderColor: 'border-brand-red/20',
            bgGlow: 'from-brand-red/20 to-brand-red/5',
            badgeBg: 'bg-brand-mint text-brand-red border-brand-red/20',
            titleColor: 'text-brand-red',
            expandBg: 'bg-brand-mint border-brand-red/10',
            link: '/presentation/matrix-income',
            expandDetails: [
                { label: 'Distribution', value: '70% of upgrade cost to upline' },
                { label: 'Structure', value: '2x2 Binary — auto fill L→R' },
                { label: 'Spillover', value: 'Global spillover supported' },
                { label: 'Matrix Depth', value: 'Earns up to 18 layers deep' },
                { label: 'Qualification', value: 'Must be upgraded > tier level' },
            ],
        },
        {
            number: '3',
            title: 'Level Income',
            icon: <ShieldCheck className="w-12 h-12 text-brand-green" />,
            mainStat: '15%',
            mainLabel: 'Total Dist.',
            details: ['17 Unilevel Layers', 'L1-5: 1.5%, L6-10: 1.0%', 'L11-17: 0.35% each'],
            badge: 'PASSIVE INCOME',
            borderColor: 'border-brand-green/20',
            bgGlow: 'from-brand-green/20 to-brand-green/5',
            badgeBg: 'bg-brand-mint text-brand-green border-brand-green/20',
            titleColor: 'text-brand-green',
            expandBg: 'bg-brand-mint border-brand-green/10',
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
            icon: <Gift className="w-12 h-12 text-brand-red" />,
            mainStat: '5%',
            mainLabel: 'Global Revenue',
            details: ['Top Performers', 'Achiever Bonuses', 'Periodic Distribution'],
            badge: 'GLOBAL SHARE',
            borderColor: 'border-brand-red/20',
            bgGlow: 'from-brand-red/20 to-brand-red/5',
            badgeBg: 'bg-brand-mint text-brand-red border-brand-red/20',
            titleColor: 'text-brand-red',
            expandBg: 'bg-brand-mint border-brand-red/10',
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
        <div className="min-h-screen bg-[#f8faf8] font-sans text-slate-800 relative overflow-hidden">

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute w-[1000px] h-[1000px] bg-brand-green/5 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* Main Content */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-20 animate-in fade-in duration-700">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter italic uppercase">
                        <span className="text-brand-green">AIPCore</span>
                        <span className="text-slate-800 block md:inline md:ml-6"> — 4 Reward Flows</span>
                    </h1>
                    <p className="text-slate-500 text-[10px] font-black mt-6 tracking-[0.4em] uppercase italic">Select an architectural layer to expand technical details</p>
                </motion.div>

                {/* 2x2 Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {incomeStreams.map((stream, index) => {
                        const isOpen = expanded === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.12, duration: 0.5 }}
                                className={`relative overflow-hidden bg-white border border-brand-green/10 rounded-[3rem] transition-all duration-500 group shadow-2xl ${isOpen ? `shadow-brand-green/10 scale-[1.02] z-10 ${stream.borderColor}` : 'hover:scale-[1.01]'}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stream.bgGlow} opacity-10 pointer-events-none`} />

                                {/* Card Header */}
                                <button
                                    onClick={() => toggle(index)}
                                    className="relative z-10 w-full text-left p-8 md:p-10 flex items-start justify-between gap-6 group"
                                >
                                    <div className="flex items-start gap-8 flex-1">
                                        <div className="mt-1 transform group-hover:scale-110 transition-transform duration-500">{stream.icon}</div>
                                        <div className="flex-1">
                                            <h2 className={`text-xl md:text-2xl font-black ${stream.titleColor} mb-2 uppercase italic tracking-tight`}>
                                                {stream.number}. {stream.title}
                                            </h2>
                                            <div className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter italic">{stream.mainStat}</div>
                                            <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1 italic">{stream.mainLabel}</div>
                                            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                                                {stream.details.map((d, i) => (
                                                    <span key={i} className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-brand-mint px-3 py-1 rounded-full border border-brand-green/5 italic">{d}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* View More button */}
                                    <div className={`flex flex-col items-center gap-2 shrink-0 px-5 py-4 rounded-2xl border transition-all duration-300 ${isOpen ? `${stream.badgeBg} shadow-lg shadow-brand-green/10` : 'border-slate-100 bg-brand-mint text-slate-500 group-hover:border-brand-green/20 group-hover:text-brand-green'}`}>
                                        <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap italic">
                                            {isOpen ? 'Less' : 'Proof'}
                                        </span>
                                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />}
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
                                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="relative z-10 mx-8 md:mx-10 mb-10 bg-brand-mint/30 border border-brand-green/10 rounded-[2rem] p-8 space-y-4 shadow-inner">
                                                {stream.expandDetails.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-start gap-4 text-sm border-b border-brand-green/5 pb-3 last:border-0 last:pb-0">
                                                        <span className="text-slate-500 shrink-0 font-black uppercase tracking-widest text-[10px] italic">{item.label}</span>
                                                        <span className="text-slate-800 font-black text-right italic">{item.value}</span>
                                                    </div>
                                                ))}

                                                {/* Badge + Go to slide */}
                                                <div className="flex items-center justify-between pt-6 gap-6 flex-wrap">
                                                    <span className={`inline-block px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border italic ${stream.badgeBg} shadow-sm`}>
                                                        {stream.badge}
                                                    </span>
                                                    <Link
                                                        href={stream.link}
                                                        className={`flex items-center gap-3 px-8 py-3 rounded-2xl text-[10px] font-black transition-all hover:scale-105 shadow-xl uppercase tracking-widest italic ${stream.badgeBg} border`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Scale Operations <ArrowRight className="w-4 h-4" />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <Link href="/presentation/how-to-join">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                            className="p-10 relative overflow-hidden bg-white border border-brand-green/10 rounded-[3rem] cursor-pointer hover:scale-[1.02] shadow-2xl transition-all group"
                        >
                            <div className="flex items-center gap-8">
                                <div className="p-5 bg-brand-mint rounded-3xl border border-brand-green/10 group-hover:bg-brand-green/10 transition-colors">
                                    <Zap className="w-10 h-10 text-brand-green" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-brand-green group-hover:translate-x-1 transition-transform uppercase tracking-tight italic">Node Activation</h3>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 italic">Step-by-step registration & upgrade guide</p>
                                </div>
                                <ArrowRight className="w-8 h-8 text-slate-200 group-hover:text-brand-green group-hover:translate-x-2 transition-all" />
                            </div>
                        </motion.div>
                    </Link>
                    <Link href="/presentation/income-calculator">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                            className="p-10 relative overflow-hidden bg-white border border-brand-green/10 rounded-[3rem] cursor-pointer hover:scale-[1.02] shadow-2xl transition-all group"
                        >
                            <div className="flex items-center gap-8">
                                <div className="p-5 bg-brand-mint rounded-3xl border border-brand-green/10 group-hover:bg-brand-red/10 transition-colors">
                                    <ShieldCheck className="w-10 h-10 text-brand-red" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-brand-red group-hover:translate-x-1 transition-transform uppercase tracking-tight italic">AI Scalability</h3>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 italic">Level costs, matrix income, earning scenarios</p>
                                </div>
                                <ArrowRight className="w-8 h-8 text-slate-200 group-hover:text-brand-red group-hover:translate-x-2 transition-all" />
                            </div>
                        </motion.div>
                    </Link>
                </div>

                {/* Bottom Summary */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center space-y-10">
                    <div className="inline-block px-10 py-6 bg-brand-mint border border-brand-green/10 rounded-[2.5rem] shadow-xl">
                        <span className="text-slate-500 text-lg font-black uppercase tracking-widest italic mr-4">Total Startup Basis:</span>
                        <span className="text-brand-green text-3xl font-black italic tracking-tighter mr-6">$5 Entry</span>
                        <span className="text-brand-red text-lg font-black opacity-40 italic"> [18 Tiers L0–L17] </span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-12 flex-wrap">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-brand-green" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Network: BSC Mainnet</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Layers className="w-5 h-5 text-brand-red" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Assets: Native BNB</span>
                        </div>
                    </div>
                    
                    <div className="pt-6">
                        <Link href="/" className="inline-flex items-center gap-4 text-slate-400 hover:text-brand-green font-black text-[10px] uppercase tracking-[0.5em] transition-all italic group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Home Base
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}



