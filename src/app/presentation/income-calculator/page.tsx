'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
        { id: 'levels' as const, label: '📊 Level Costs', color: 'text-red-400' },
        { id: 'matrix' as const, label: '🔺 Matrix Income', color: 'text-rose-400' },
        { id: 'level-income' as const, label: '💰 Level Income', color: 'text-red-300' },
        { id: 'scenarios' as const, label: '🏆 Earning Scenarios', color: 'text-rose-300' },
    ];

    return (
        <div className="min-h-screen bg-[#050510] overflow-auto relative font-sans text-white">

            {/* Nav */}
            <Link href="/presentation" className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm tracking-widest uppercase font-mono">Back to Presentation</span>
            </Link>

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] top-1/3 right-1/4" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        <span className="bg-gradient-to-r from-red-400 to-rose-600 bg-clip-text text-transparent uppercase">AIPCore</span>
                        <span className="text-gray-400 uppercase"> CALCULATOR</span>
                    </h1>
                    <p className="text-white/80 mt-2">All 18 Tiers (L0–L17) · All 4 Reward Flows · Live on BSC Mainnet</p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm tracking-wider transition-all border ${activeTab === tab.id
                                ? `${tab.color} bg-white/10 border-white/20 scale-105`
                                : 'text-white/80 bg-white/5 border-white/5 hover:bg-white/10'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB: Level Costs */}
                {activeTab === 'levels' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Table */}
                            <div className="lg:col-span-2 overflow-x-auto">
                                <h2 className="text-2xl font-black text-red-400 mb-4 uppercase tracking-tighter">COMPLETE TIER COSTS — ALL 18 TIERS</h2>
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-red-900/30 text-red-400 uppercase tracking-widest font-mono">
                                            <th className="p-2 text-left border border-white/10">Layer</th>
                                            <th className="p-2 text-right border border-white/10">USD Cost</th>
                                            <th className="p-2 text-right border border-white/10">Cumulative</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {LAYER_COSTS.map((cost, i) => {
                                            const cumulative = LAYER_COSTS.slice(0, i + 1).reduce((a, b) => a + b, 0);
                                            return (
                                                <tr key={i} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.05]'} hover:bg-white/10 transition-colors`}>
                                                    <td className="p-2 border border-white/10 font-bold text-white font-mono">L{i}</td>
                                                    <td className="p-2 border border-white/10 text-right text-gray-300 font-mono">{fmtUSD(cost)}</td>
                                                    <td className="p-2 border border-white/10 text-right text-red-300 font-bold font-mono">{fmtUSD(cumulative)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Key Insights */}
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-4">KEY INSIGHTS:</h3>
                                    <ul className="space-y-3 text-gray-300 text-sm">
                                        <li>• Progressive <strong className="text-white">doubling</strong> structure</li>
                                        <li>• Each level <strong className="text-white">doubles</strong> the previous cost</li>
                                        <li>• <strong className="text-white">BNB amount</strong> adjusts with market price</li>
                                        <li>• Cumulative cost grows exponentially</li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-2xl bg-red-900/10 border border-red-500/20">
                                    <h3 className="text-lg font-bold text-red-400 mb-3 uppercase tracking-widest">PAYMENT DISTRIBUTION:</h3>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li>- Direct Referral (Sponsor): <strong className="text-white">10%</strong></li>
                                        <li>- Binary Matrix: <strong className="text-white">70%</strong></li>
                                        <li>- Layer (Unilevel) Income: <strong className="text-white">~15%</strong></li>
                                        <li>- Reward Pool: <strong className="text-white">5%</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-r from-red-900/20 to-rose-900/20 border border-red-500/20 text-center">
                            <p className="text-red-300 font-bold uppercase tracking-widest text-xs font-mono">Dynamic BNB Pricing via Chainlink Oracle | BSC Mainnet</p>
                        </div>
                    </motion.div>
                )}

                {/* TAB: Matrix Income */}
                {activeTab === 'matrix' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        {/* Formula */}
                        <div className="p-6 rounded-2xl bg-rose-900/15 border border-rose-500/20 flex flex-col md:flex-row items-center gap-6">
                            <div className="text-5xl">🔺</div>
                            <div>
                                <h2 className="text-2xl font-black text-rose-400 uppercase tracking-tighter">MATRIX INCOME FORMULA:</h2>
                                <p className="text-xl text-white mt-1 uppercase font-black">70% of Upgrade Cost → <span className="text-rose-300">First Qualified Upline</span></p>
                            </div>
                            <div className="ml-auto text-sm text-gray-400 max-w-sm font-bold uppercase tracking-widest text-right">
                                Income earned when a member in your downline upgrades, calculated as 70% of their upgrade cost, goes to the first qualified upline in the chain.
                            </div>
                        </div>

                        {/* Qualification */}
                        <div className="p-5 rounded-xl bg-red-900/10 border border-red-500/20">
                            <h3 className="text-lg font-bold text-red-400 mb-2 uppercase tracking-widest">✅ QUALIFICATION REQUIREMENTS:</h3>
                            <div className="flex flex-wrap gap-6 text-sm text-gray-300 font-bold uppercase tracking-tighter">
                                <span>✅ Your level &gt; Payer&apos;s level</span>
                                <span>✅ Within 18 layers</span>
                                <span>✅ Active account</span>
                            </div>
                        </div>

                        {/* Income Table */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">INCOME PER UPGRADE BY LEVEL:</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse max-w-3xl">
                                    <thead>
                                        <tr className="bg-purple-900/30 text-purple-300">
                                            <th className="p-2 text-left border border-white/10">Level</th>
                                            <th className="p-2 text-right border border-white/10">Upgrade Cost</th>
                                            <th className="p-2 text-right border border-white/10">Matrix Income (70%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {LAYER_COSTS.map((cost, i) => (
                                            <tr key={i} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.05]'}`}>
                                                <td className="p-2 border border-white/10 font-bold text-white">L{i + 1}</td>
                                                <td className="p-2 border border-white/10 text-right text-gray-300">{fmtUSD(cost)}</td>
                                                <td className="p-2 border border-white/10 text-right text-purple-300 font-semibold">{fmtUSD(cost * 0.7)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Scenarios */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">EXAMPLE SCENARIOS:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                                {[
                                    { label: 'Scenario A', desc: "You're L10, someone in layer 5 upgrades to L7", result: fmtUSD(320 * 0.7), color: 'border-red-500/30 bg-red-900/10', emoji: '✅' },
                                    { label: 'Scenario B', desc: "You're L13, 5 people upgrade to L10 this month", result: fmtUSD(2560 * 0.7 * 5), color: 'border-rose-500/30 bg-rose-900/10', emoji: '🚀' },
                                    { label: 'Scenario C', desc: "You're L8, someone in layer 3 upgrades to L9", result: '$0', color: 'border-white/10 bg-white/5', emoji: '❌' },
                                    { label: 'Scenario D', desc: "You're L13 with 200-person team, 20 upgrades/month", result: '$20k-$50k', color: 'border-red-500/50 bg-red-900/20', emoji: '👑' },
                                ].map((s, i) => (
                                    <div key={i} className={`p-4 rounded-xl border ${s.color}`}>
                                        <h4 className="font-bold text-white mb-1 uppercase">{s.emoji} {s.label}</h4>
                                        <p className="text-xs text-gray-400 mb-3 font-bold uppercase tracking-tighter">{s.desc}</p>
                                        <div className="text-xl font-black text-white">→ You earn: {s.result}</div>
                                        {s.result === '$0' && <p className="text-xs text-red-400 mt-1 uppercase font-bold">(Not qualified)</p>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl bg-red-900/10 border border-red-500/20">
                                <h4 className="font-bold text-red-400 mb-2 uppercase tracking-widest">⚠️ WHAT IF NOT QUALIFIED?</h4>
                                <ul className="text-sm text-gray-400 space-y-1 font-bold uppercase tracking-tighter">
                                    <li>- Income goes to next qualified upline</li>
                                    <li>- Or to root user if no one qualified</li>
                                    <li>- This is &quot;lost income&quot; - motivation to qualify!</li>
                                </ul>
                            </div>
                            <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/20">
                                <h4 className="font-bold text-rose-400 mb-2 uppercase tracking-widest">💡 QUALIFICATION TIPS:</h4>
                                <ol className="text-sm text-gray-400 space-y-1 list-decimal pl-4 font-bold uppercase tracking-tighter">
                                    <li>Always be higher level than your team</li>
                                    <li>Encourage team to upgrade</li>
                                    <li>Stay active in the system</li>
                                </ol>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* TAB: Level Income */}
                {activeTab === 'level-income' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Table */}
                            <div>
                                <h2 className="text-2xl font-black text-red-400 mb-4 uppercase tracking-tighter">LEVEL INCOME STRUCTURE</h2>
                                <p className="text-gray-400 mb-4 uppercase font-bold tracking-widest">Total: ~15% across 17 unilevel layers</p>
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-red-900/30 text-red-300 font-mono uppercase tracking-widest">
                                            <th className="p-2 text-left border border-white/10">Level</th>
                                            <th className="p-2 text-right border border-white/10">Commission %</th>
                                            <th className="p-2 text-right border border-white/10">Per $1,000 Upgrade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {levelIncomePercents.map((pct, i) => (
                                            <tr key={i} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.05]'}`}>
                                                <td className="p-2 border border-white/10 font-bold text-white font-mono uppercase tracking-tighter">L{i + 1}</td>
                                                <td className="p-2 border border-white/10 text-right text-red-300 font-mono">{pct}%</td>
                                                <td className="p-2 border border-white/10 text-right text-gray-400 font-mono">${(1000 * pct / 100).toFixed(1)}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-red-900/40 font-bold font-mono">
                                            <td className="p-2 border border-white/10 text-red-400">TOTAL</td>
                                            <td className="p-2 border border-white/10 text-right text-red-400">~14.95%</td>
                                            <td className="p-2 border border-white/10 text-right text-red-400">$149.5</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Right Side Info */}
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-widest">📋 EXAMPLE CALCULATION:</h3>
                                    <p className="text-gray-300 text-sm mb-3 uppercase font-bold tracking-tighter">Team member upgrades to L10 ($1,920)</p>
                                    <ul className="space-y-2 text-sm text-gray-400 font-bold uppercase tracking-tighter">
                                        <li>• As L1 upline: <strong className="text-white font-mono">${(1920 * 0.015).toFixed(1)}</strong> (1.50%)</li>
                                        <li>• As L5 upline: <strong className="text-white font-mono">${(1920 * 0.015).toFixed(1)}</strong> (1.50%)</li>
                                        <li>• As L10 upline: <strong className="text-white font-mono">${(1920 * 0.01).toFixed(0)}</strong> (1.00%)</li>
                                        <li>• As L15 upline: <strong className="text-white font-mono">${(1920 * 0.0035).toFixed(1)}</strong> (0.35%)</li>
                                    </ul>
                                </div>

                                <div className="p-6 rounded-2xl bg-red-900/10 border border-red-500/20">
                                    <h3 className="text-lg font-bold text-red-400 mb-3 uppercase tracking-widest">📈 MONTHLY INCOME PROJECTIONS:</h3>
                                    {[
                                        { label: 'Small Network', desc: '50 upgrades/month, avg $200', vol: '$10,000', earn: '$100 - $500' },
                                        { label: 'Medium Network', desc: '200 upgrades/month, avg $500', vol: '$100,000', earn: '$1,000 - $5,000' },
                                        { label: 'Large Network', desc: '1000 upgrades/month, avg $1,000', vol: '$1,000,000', earn: '$10,000 - $50,000' },
                                    ].map((p, i) => (
                                        <div key={i} className="mb-3 p-3 rounded-lg bg-black/30 border border-white/5">
                                            <span className="text-red-300 font-bold text-sm uppercase">{p.label}</span>
                                            <span className="text-white/60 text-xs font-bold uppercase tracking-tighter"> ({p.desc})</span>
                                            <div className="text-xs text-gray-500 mt-1 font-bold uppercase tracking-widest">→ Total volume: {p.vol}</div>
                                            <div className="text-xs text-white font-black uppercase">→ Your commission: {p.earn}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                    <h4 className="font-bold text-red-400 mb-2 uppercase tracking-widest">🌿 POWER OF COMPOUNDING:</h4>
                                    <ul className="text-sm text-gray-400 space-y-1 font-bold uppercase tracking-tighter">
                                        <li>• Build deep networks for exponential growth!</li>
                                        <li>• 17 layers deep = massive earning potential</li>
                                        <li>• Passive income from your entire downline</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-r from-red-900/20 to-rose-900/20 border border-red-500/20 text-center">
                            <p className="text-red-300 font-bold uppercase tracking-widest text-xs font-mono">Passive income from 17 layers deep | Qualification-based rewards</p>
                        </div>
                    </motion.div>
                )}

                {/* TAB: Earning Scenarios */}
                {activeTab === 'scenarios' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <h2 className="text-3xl font-black text-center uppercase tracking-tighter">
                            <span className="bg-gradient-to-r from-red-400 to-rose-600 bg-clip-text text-transparent">Team Building & AI Scenarios</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                            {[
                                {
                                    title: 'SMALL TEAM', members: '10 Active Members', color: 'border-red-500/30', titleBg: 'bg-red-900/30 text-red-400',
                                    team: ['5 Direct referrals', '5 Indirect (2nd level)', 'Average level: L5'],
                                    income: [
                                        'Direct Referrals: $23.75',
                                        'Matrix Income: $170 - $340',
                                        'Level Income: $50 - $100',
                                        'Reward Pools: Not eligible yet',
                                    ],
                                    total: '$243 - $463',
                                },
                                {
                                    title: 'MEDIUM TEAM', members: '50 Active Members', color: 'border-rose-500/30', titleBg: 'bg-rose-900/30 text-rose-400',
                                    team: ['10 Direct referrals', '40 Downline across levels', 'Average level: L8'],
                                    income: [
                                        'Direct Referrals: $47.50',
                                        'Matrix Income: $1,500 - $3,000',
                                        'Level Income: $500 - $1,000',
                                        'Reward Pools: Not eligible yet',
                                    ],
                                    total: '$2,047 - $4,047',
                                },
                                {
                                    title: 'LARGE TEAM', members: '200 Active Members', color: 'border-red-500/40', titleBg: 'bg-red-900/40 text-red-300',
                                    team: ['20 Direct referrals', '180 Downline across levels', 'Average level: L10', 'You at L10 (Royalty eligible)'],
                                    income: [
                                        'Direct Referrals: $95',
                                        'Matrix Income: $8,000 - $15,000',
                                        'Level Income: $2,500 - $5,000',
                                        'Reward Pools: $500 - $1,500',
                                    ],
                                    total: '$11,095 - $21,595',
                                },
                                {
                                    title: 'ENTERPRISE', members: '1000+ Active Members', color: 'border-rose-500/40', titleBg: 'bg-rose-900/40 text-rose-300',
                                    team: ['50+ Direct referrals', '950+ Deep network', 'Average layer: L12', 'You at L13 (All royalty pools)'],
                                    income: [
                                        'Direct Referrals: $237.50',
                                        'Matrix Income: $50,000 - $100,000',
                                        'Level Income: $15,000 - $30,000',
                                        'Reward Pools: $3,000 - $10,000',
                                    ],
                                    total: '$68,237 - $140,237',
                                },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className={`rounded-2xl border ${s.color} bg-black/30 overflow-hidden`}
                                >
                                    <div className={`p-4 ${s.titleBg} text-center`}>
                                        <h3 className="text-lg font-black">{s.title}</h3>
                                        <p className="text-xs opacity-70">({s.members})</p>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div>
                                            <h4 className="text-xs font-bold text-white/50 uppercase mb-2 tracking-widest">Team Structure</h4>
                                            <ul className="text-xs text-gray-500 font-bold uppercase tracking-tighter space-y-1">
                                                {s.team.map((t, j) => <li key={j}>- {t}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-white/80 uppercase mb-2">Monthly Income</h4>
                                            <ul className="text-xs text-gray-300 space-y-1">
                                                {s.income.map((inc, j) => <li key={j}>• {inc}</li>)}
                                            </ul>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/5 text-center">
                                            <span className="text-xs text-white/80">Monthly Total:</span>
                                            <div className="text-xl font-black text-white">{s.total}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Key Factors */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10 shadow-lg">
                                <h4 className="font-bold text-white mb-3 uppercase tracking-widest">KEY FACTORS:</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 font-bold uppercase tracking-tighter">
                                    <span>✅ Team activity level</span>
                                    <span>✅ Direct referral count</span>
                                    <span>✅ Upgrade frequency</span>
                                    <span>✅ Royalty pool eligibility</span>
                                    <span>✅ Your qualification status</span>
                                </div>
                            </div>
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10 shadow-lg">
                                <h4 className="font-bold text-white mb-3 uppercase tracking-widest">GROWTH MULTIPLIERS:</h4>
                                <ul className="space-y-1 text-sm text-gray-400 font-bold uppercase tracking-tighter">
                                    <li>→ Higher Levels = <strong className="text-white">Higher Earnings</strong></li>
                                    <li>→ More Directs = <strong className="text-white">More Qualifications</strong></li>
                                    <li>→ Deeper Network = <strong className="text-white">More Layers</strong></li>
                                    <li>→ Active Team = <strong className="text-white">Consistent Income</strong></li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-center text-gray-600 text-xs italic">Actual earnings depend on team performance and activity levels</p>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
