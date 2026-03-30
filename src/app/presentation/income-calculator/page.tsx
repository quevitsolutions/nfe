'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calculator, BarChart3, TrendingUp, PieChart, ShieldCheck, Zap, Info, ChevronRight } from 'lucide-react';

const LAYER_COSTS = [
    5, 5, 10, 20, 40, 80, 160, 320, 640, 1280,
    2560, 5120, 10240, 20480, 40960, 81920, 163840, 327680
]; // All 18 tiers: L0($5 registration) to L17($327,680) matching contract tierPriceUSD

const levelIncomePercents = [
    1.5, 1.5, 1.5, 1.5, 1.5, // L1-5
    1, 1, 1, 1, 1,           // L6-10
    0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35 // L11-17
];

function fmtUSD(val: number) {
    if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
    if (val >= 100_000) return `$${(val / 1_000).toFixed(0)}K`;
    if (val >= 1_000) return `$${val.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    if (val % 1 === 0) return `$${val}`;
    return `$${val.toFixed(2)}`;
}

export default function IncomeCalculatorPage() {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'levels' | 'matrix' | 'level-income' | 'scenarios'>('levels');
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const tabs = [
        { id: 'levels' as const, label: 'Tier Costs', icon: <PieChart className="w-4 h-4" /> },
        { id: 'matrix' as const, label: 'Matrix Income', icon: <TrendingUp className="w-4 h-4" /> },
        { id: 'level-income' as const, label: 'Unilevel Income', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'scenarios' as const, label: 'Yield Scenarios', icon: <Zap className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-[#f8faf8] overflow-auto relative font-sans text-slate-800 pb-20">

            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute w-[1000px] h-[1000px] bg-brand-green/5 rounded-full blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            {/* Nav */}
            <Link href="/presentation" className="fixed top-8 left-8 z-50 flex items-center gap-3 text-slate-500 hover:text-brand-green transition-all group font-black text-[10px] uppercase tracking-[0.2em] italic">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:block">Back to Presentation Hub</span>
                <span className="sm:hidden">Back</span>
            </Link>

            <div className="relative z-20 max-w-7xl mx-auto px-8 py-24">

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-brand-mint border border-brand-green/10 shadow-xl mb-8">
                        <Calculator className="w-8 h-8 text-brand-green" />
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic drop-shadow-sm mb-4">
                        <span className="text-brand-green">AIPCORE</span>
                        <span className="text-slate-300 mx-4 opacity-50 italic">CALCULATOR</span>
                    </h1>
                    <p className="text-[10px] md:text-xs text-slate-400 font-black tracking-[0.5em] uppercase italic">Quantum Yield Projection Engine · 18 Tiers · Multi-Stream Utility</p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 bg-white/50 p-2 rounded-[2.5rem] border border-brand-green/5 shadow-inner backdrop-blur-sm max-w-4xl mx-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all italic ${activeTab === tab.id
                                ? `bg-slate-900 text-brand-green shadow-2xl scale-105`
                                : 'text-slate-400 hover:bg-brand-mint hover:text-brand-green'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* TAB: Level Costs */}
                    {activeTab === 'levels' && (
                        <motion.div key="levels" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {/* Table */}
                                <div className="lg:col-span-2">
                                    <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase italic tracking-tight flex items-center gap-4">
                                        <PieChart className="w-6 h-6 text-brand-green" />
                                        Tier Cost Archetype
                                    </h2>
                                    <div className="overflow-hidden rounded-[3rem] border border-brand-green/10 shadow-3xl bg-white">
                                        <table className="w-full text-sm border-collapse">
                                            <thead>
                                                <tr className="bg-brand-mint text-brand-green uppercase tracking-widest font-black italic text-[10px]">
                                                    <th className="px-8 py-6 text-left border-b border-brand-green/10">Hierarchy</th>
                                                    <th className="px-8 py-6 text-right border-b border-brand-green/10">Standard Unit (USD)</th>
                                                    <th className="px-8 py-6 text-right border-b border-brand-green/10">Aggregate Cost</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {LAYER_COSTS.map((cost, i) => {
                                                    const cumulative = LAYER_COSTS.slice(0, i + 1).reduce((a, b) => a + b, 0);
                                                    return (
                                                        <tr key={i} className={`hover:bg-brand-mint/30 transition-colors group`}>
                                                            <td className="px-8 py-5 border-b border-brand-green/5 font-black text-slate-900 italic">Tier {i}</td>
                                                            <td className="px-8 py-5 border-b border-brand-green/5 text-right text-slate-400 font-bold italic">{fmtUSD(cost)}</td>
                                                            <td className="px-8 py-5 border-b border-brand-green/5 text-right text-brand-green font-black italic tracking-tighter text-lg">{fmtUSD(cumulative)}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Key Insights */}
                                <div className="space-y-8">
                                    <div className="p-8 rounded-[3rem] bg-white border border-brand-green/5 shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                                            <Info className="w-24 h-24 text-brand-green" />
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 mb-8 uppercase italic tracking-tight">Protocol Logic</h3>
                                        <ul className="space-y-6">
                                            {[
                                                'Geometric 2x Scaling Structure',
                                                'Exponential Tier Cost Progression',
                                                'Oracle-Linked BNB Settlement',
                                                'Permanent Atomic Verification'
                                            ].map((text, i) => (
                                                <li key={i} className="flex items-center gap-4 text-sm font-bold text-slate-500 italic">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="p-8 rounded-[3rem] bg-slate-900 text-white shadow-3xl">
                                        <h3 className="text-[10px] font-black text-white/40 mb-8 uppercase tracking-[0.3em] italic">Yield Distribution Vector</h3>
                                        <ul className="space-y-6">
                                            {[
                                                { label: 'Direct Node Reward', val: '10%', color: 'text-brand-green' },
                                                { label: 'Binary Matrix Flow', val: '70%', color: 'text-brand-green' },
                                                { label: 'Unilevel Aggregate', val: '15%', color: 'text-brand-red' },
                                                { label: 'Global Reward Pool', val: '5%', color: 'text-white' },
                                            ].map((item, i) => (
                                                <li key={i} className="flex justify-between items-center group">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60 italic group-hover:text-white transition-colors">{item.label}</span>
                                                    <span className={`text-2xl font-black italic tracking-tighter ${item.color}`}>{item.val}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-brand-mint/50 border border-brand-green/10 text-center shadow-inner">
                                <p className="text-brand-green font-black uppercase tracking-[0.4em] text-[8px] italic flex items-center justify-center gap-4">
                                    <Zap className="w-3 h-3" />
                                    Dynamic Unit Parity via Chainlink Integrity Protocol
                                    <Zap className="w-3 h-3" />
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* TAB: Matrix Income */}
                    {activeTab === 'matrix' && (
                        <motion.div key="matrix" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                            {/* Formula */}
                            <div className="p-10 rounded-[4rem] bg-white border border-brand-green/10 flex flex-col md:flex-row items-center gap-12 shadow-3xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-brand-green/[0.02]" />
                                <div className="relative z-10 w-24 h-24 rounded-[2rem] bg-brand-mint flex items-center justify-center border border-brand-green/10 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="w-10 h-10 text-brand-green" />
                                </div>
                                <div className="relative z-10 flex-1">
                                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 italic">Matrix Value Propagation</h2>
                                    <p className="text-3xl md:text-5xl text-slate-900 font-black italic tracking-tighter">
                                        <span className="text-brand-green">70% Yield Flow</span> → First Qualified Node
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-10">
                                    <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-brand-green" />
                                        Qualification Protocol
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {[
                                            { label: 'Tier Parity', val: 'My Tier ≥ Payer' },
                                            { label: 'Network Depth', val: 'Within 18 Nodes' },
                                            { label: 'Active Hash', val: 'Protocol Verified' },
                                        ].map((item, i) => (
                                            <div key={i} className="p-6 rounded-[2rem] bg-white border border-brand-mint shadow-xl text-center group hover:border-brand-green/30 transition-all">
                                                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{item.label}</span>
                                                <span className="block text-slate-900 font-black text-[13px] uppercase italic tracking-tighter">{item.val}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-8 rounded-[3rem] bg-slate-900 text-white shadow-3xl group">
                                        <h4 className="text-[10px] font-black text-brand-red mb-6 uppercase tracking-widest italic flex items-center gap-2">
                                            <Info className="w-4 h-4" />
                                            Pass-Up Mechanism
                                        </h4>
                                        <p className="text-white/60 font-bold text-sm leading-relaxed italic">
                                            Yield from non-qualified nodes traverses the hierarchy until reaching the <strong className="text-white">first verified parity node</strong>. Avoid revenue leakage by maintaining tier superiority.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">Yield Vector Per Node Type</h3>
                                    <div className="overflow-hidden rounded-[3rem] border border-brand-green/10 shadow-3xl bg-white">
                                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                            <table className="w-full text-sm border-collapse">
                                                <thead className="sticky top-0 z-10 bg-brand-mint">
                                                    <tr className="text-brand-green uppercase tracking-widest font-black italic text-[9px]">
                                                        <th className="px-8 py-4 text-left">Unit Type</th>
                                                        <th className="px-8 py-4 text-right">Yield Flow (70%)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {LAYER_COSTS.map((cost, i) => (
                                                        <tr key={i} className="hover:bg-brand-mint/30 transition-colors border-b border-brand-green/5">
                                                            <td className="px-8 py-4 font-black text-slate-900 italic">Tier {i} Node</td>
                                                            <td className="px-8 py-4 text-right text-brand-green font-black italic tracking-tighter text-lg">{fmtUSD(cost * 0.7)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* TAB: Level Income */}
                    {activeTab === 'level-income' && (
                        <motion.div key="level-income" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
                                {/* Table */}
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase italic tracking-tight flex items-center gap-3">
                                        <BarChart3 className="w-6 h-6 text-brand-green" />
                                        Unilevel Architecture
                                    </h2>
                                    <div className="overflow-hidden rounded-[3rem] border border-brand-green/10 shadow-3xl bg-white">
                                        <table className="w-full text-sm border-collapse">
                                            <thead>
                                                <tr className="bg-brand-mint text-brand-green uppercase tracking-widest font-black italic text-[10px]">
                                                    <th className="px-8 py-6 text-left border-b border-brand-green/10">Network depth</th>
                                                    <th className="px-8 py-6 text-right border-b border-brand-green/10">Yield %</th>
                                                    <th className="px-8 py-6 text-right border-b border-brand-green/10">Unit Flow</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {levelIncomePercents.map((pct, i) => (
                                                    <tr key={i} className="hover:bg-brand-mint/30 transition-colors">
                                                        <td className="px-8 py-4 border-b border-brand-green/5 font-black text-slate-900 italic">Layer {i + 1}</td>
                                                        <td className="px-8 py-4 border-b border-brand-green/5 text-right text-brand-green font-black italic">{pct}%</td>
                                                        <td className="px-8 py-4 border-b border-brand-green/5 text-right text-slate-400 font-bold italic tracking-tighter text-xs">${(1000 * pct / 100).toFixed(2)} / $1K</td>
                                                    </tr>
                                                ))}
                                                <tr className="bg-slate-900 text-white font-black italic">
                                                    <td className="px-8 py-6 uppercase tracking-widest text-[10px]">Aggregate Net Flow</td>
                                                    <td className="px-8 py-6 text-right text-brand-green">15.00%</td>
                                                    <td className="px-8 py-6 text-right">$150.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Right Side Info */}
                                <div className="space-y-10">
                                    <div className="p-10 rounded-[3.5rem] bg-white border border-brand-green/5 shadow-2xl">
                                        <h3 className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.3em] italic">Projection Modeling ($2,560 Upgrade)</h3>
                                        <ul className="space-y-6">
                                            {[
                                                { label: 'Layer 1-5 Yield', pct: '1.50%', val: '$38.40', color: 'text-brand-green' },
                                                { label: 'Layer 6-10 Yield', pct: '1.00%', val: '$25.60', color: 'text-brand-red' },
                                                { label: 'Tier 11-18 Yield', pct: '0.35%', val: '$8.96', color: 'text-slate-900' },
                                            ].map((item, i) => (
                                                <li key={i} className="flex justify-between items-center group">
                                                    <div className="flex flex-col">
                                                        <span className="text-slate-900 font-black italic text-lg">{item.label}</span>
                                                        <span className="text-[10px] font-black uppercase text-slate-400 italic tracking-widest">{item.pct} Coefficient</span>
                                                    </div>
                                                    <span className={`text-3xl font-black italic tracking-tighter ${item.color}`}>{item.val}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        {[
                                            { label: 'Precision Node Map', desc: '50 Nodes • 5 Directs • Avg T5', earn: '$500+', accent: 'bg-brand-mint' },
                                            { label: 'Expansion Grid', desc: '200 Nodes • 10 Directs • Avg T8', earn: '$5,000+', accent: 'bg-brand-mint' },
                                            { label: 'Quantum Network', desc: '1000 Nodes • 20 Directs • Avg T10', earn: '$25,000+', accent: 'bg-slate-900 text-white' },
                                        ].map((p, i) => (
                                            <div key={i} className={`p-8 rounded-[2.5rem] border border-brand-green/10 shadow-xl flex justify-between items-center group transition-all hover:scale-[1.02] ${p.accent}`}>
                                                <div>
                                                    <span className={`block font-black uppercase text-[10px] tracking-widest italic mb-1 ${p.accent.includes('slate-900') ? 'text-brand-green' : 'text-slate-400'}`}>{p.label}</span>
                                                    <span className={`block font-bold text-xs italic ${p.accent.includes('slate-900') ? 'text-white/40' : 'text-slate-500'}`}>{p.desc}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`block text-2xl font-black italic tracking-tighter ${p.earn.includes('25,000') ? 'text-brand-green' : 'text-slate-900'}`}>{p.earn}</span>
                                                    <span className="block text-[8px] font-black uppercase tracking-widest text-slate-400 italic">Net Projection</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* TAB: Earning Scenarios */}
                    {activeTab === 'scenarios' && (
                        <motion.div key="scenarios" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                                {[
                                    {
                                        title: 'Micro Node', members: '10 Nodes', accent: 'border-brand-green/10', color: 'text-brand-green',
                                        team: ['5 Direct Propagation', '5 Secondary Layers', 'Avg Tier: T3'],
                                        income: [
                                            { label: 'Direct Yield', val: '$23.75' },
                                            { label: 'Matrix Flow', val: '$340.00' },
                                            { label: 'Unilevel Aggregate', val: '$100.00' },
                                        ],
                                        total: '$463.75',
                                    },
                                    {
                                        title: 'Growth Cell', members: '50 Nodes', accent: 'border-brand-green/20', color: 'text-brand-green',
                                        team: ['10 Direct Propagation', '40 Network Nodes', 'Avg Tier: T6'],
                                        income: [
                                            { label: 'Direct Yield', val: '$47.50' },
                                            { label: 'Matrix Flow', val: '$3,000.00' },
                                            { label: 'Unilevel Aggregate', val: '$1,000.00' },
                                        ],
                                        total: '$4,047.50',
                                    },
                                    {
                                        title: 'Strategic Grid', members: '200 Nodes', accent: 'border-brand-red/20', color: 'text-brand-red',
                                        team: ['20 Direct Propagation', '180 Network Nodes', 'Protocol Tier: T10'],
                                        income: [
                                            { label: 'Direct Yield', val: '$95.00' },
                                            { label: 'Matrix Flow', val: '$15,000.00' },
                                            { label: 'Unilevel Aggregate', val: '$5,000.00' },
                                            { label: 'Reward Pool Share', val: '$1,500.00' },
                                        ],
                                        total: '$21,595.00',
                                    },
                                    {
                                        title: 'Quantum Apex', members: '1,000+ Nodes', accent: 'border-slate-900', color: 'text-brand-green', isDark: true,
                                        team: ['50+ Direct Propagation', '950+ Network Nodes', 'Protocol Tier: T15'],
                                        income: [
                                            { label: 'Direct Yield', val: '$237.50' },
                                            { label: 'Matrix Flow', val: '$100K+' },
                                            { label: 'Unilevel Aggregate', val: '$30,000.00' },
                                            { label: 'Reward Pool Share', val: '$10,000.00' },
                                        ],
                                        total: '$140K+',
                                    },
                                ].map((s, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`rounded-[3rem] border ${s.accent} ${s.isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'} overflow-hidden shadow-3xl hover:-translate-y-2 transition-transform group flex flex-col h-full`}
                                    >
                                        <div className={`p-8 ${s.isDark ? 'bg-white/5' : 'bg-brand-mint'} text-center border-b ${s.accent}`}>
                                            <h3 className={`text-2xl font-black italic tracking-tight uppercase ${s.isDark ? 'text-brand-green' : 'text-slate-900'}`}>{s.title}</h3>
                                            <p className={`text-[8px] font-black uppercase tracking-[0.3em] italic mt-2 ${s.isDark ? 'text-white/40' : 'text-slate-400'}`}>{s.members} ARCHETYPE</p>
                                        </div>
                                        <div className="p-8 space-y-8 flex-1">
                                            <div>
                                                <h4 className={`text-[8px] font-black uppercase tracking-widest mb-4 italic ${s.isDark ? 'text-white/20' : 'text-slate-300'}`}>Network Topology</h4>
                                                <ul className="space-y-2">
                                                    {s.team.map((t, j) => (
                                                        <li key={j} className="flex items-center gap-3 text-[10px] font-black italic tracking-tight uppercase transition-colors hover:text-brand-green">
                                                            <ChevronRight className="w-3 h-3 text-brand-green opacity-50" />
                                                            {t}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className={`text-[8px] font-black uppercase tracking-widest mb-4 italic ${s.isDark ? 'text-white/20' : 'text-slate-300'}`}>Yield Vectors</h4>
                                                <ul className="space-y-3">
                                                    {s.income.map((inc, j) => (
                                                        <li key={j} className="flex justify-between items-center">
                                                            <span className={`text-[9px] font-black uppercase italic tracking-widest ${s.isDark ? 'text-white/40' : 'text-slate-400'}`}>{inc.label}</span>
                                                            <span className="text-sm font-black italic tracking-tighter">{inc.val}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={`p-8 ${s.isDark ? 'bg-brand-green text-slate-900' : 'bg-slate-900 text-white'} text-center mt-auto`}>
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 italic">Aggregated Yield</span>
                                            <div className="text-3xl font-black italic tracking-tighter">{s.total}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Control Protocol */}
                            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic py-10 border-t border-brand-green/10">
                                <span className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-green shadow-xl shadow-brand-green/20" />
                                    Active Network Propagation
                                </span>
                                <span className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-red shadow-xl shadow-brand-red/20" />
                                    Tier Parity Verification
                                </span>
                                <span className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                                    Atomic Settlement Cycle
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}


