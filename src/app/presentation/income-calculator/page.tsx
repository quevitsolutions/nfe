'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const TIER_COSTS = [
    5, 7.5, 15, 30, 60, 120, 240, 480, 960, 1920,
    3840, 7680, 15360, 30720, 61440, 122880, 245760
]; // Limited to 17 tiers as per latest contract spec

const levelIncomePercents = [
    2, 2, 2, 2, 2,           // L1-5
    1, 1, 1, 1, 1,           // L6-10
    0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35 // L11-24
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
        { id: 'levels' as const, label: '📊 Level Costs', color: 'text-yellow-400' },
        { id: 'matrix' as const, label: '🔺 Matrix Income', color: 'text-purple-400' },
        { id: 'level-income' as const, label: '💰 Level Income', color: 'text-green-400' },
        { id: 'scenarios' as const, label: '🏆 Earning Scenarios', color: 'text-blue-400' },
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
                <div className="absolute w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] top-1/3 right-1/4" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent uppercase">NodeFlow Engine</span>
                        <span className="text-white/60"> CALCULATOR</span>
                    </h1>
                    <p className="text-gray-500 mt-2">All 17 Tiers · All 4 Reward Flows · Operational Protocol</p>
                </motion.div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm tracking-wider transition-all border ${activeTab === tab.id
                                ? `${tab.color} bg-white/10 border-white/20 scale-105`
                                : 'text-gray-500 bg-white/5 border-white/5 hover:bg-white/10'
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
                                <h2 className="text-2xl font-black text-yellow-400 mb-4">COMPLETE TIER COSTS — ALL 17 TIERS</h2>
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-yellow-900/30 text-yellow-400">
                                            <th className="p-2 text-left border border-white/10">Tier</th>
                                            <th className="p-2 text-right border border-white/10">USD Cost</th>
                                            <th className="p-2 text-right border border-white/10">Admin Fee (5%)</th>
                                            <th className="p-2 text-right border border-white/10">Cumulative</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TIER_COSTS.map((cost, i) => {
                                            const cumulative = TIER_COSTS.slice(0, i + 1).reduce((a, b) => a + b, 0);
                                            const adminFee = cost * 0.05;
                                            return (
                                                <tr key={i} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.05]'} hover:bg-white/10 transition-colors`}>
                                                    <td className="p-2 border border-white/10 font-bold text-white">T{i + 1}</td>
                                                    <td className="p-2 border border-white/10 text-right text-gray-300">{fmtUSD(cost)}</td>
                                                    <td className="p-2 border border-white/10 text-right text-gray-400">{fmtUSD(adminFee)}</td>
                                                    <td className="p-2 border border-white/10 text-right text-yellow-300 font-semibold">{fmtUSD(cumulative)}</td>
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
                                        <li>• <span className="text-yellow-400">Admin fee</span> is consistent 5% per level</li>
                                        <li>• <strong className="text-white">BNB amount</strong> adjusts with market price</li>
                                        <li>• Cumulative cost grows exponentially</li>
                                    </ul>
                                </div>
                                <div className="p-6 rounded-2xl bg-yellow-900/10 border border-yellow-500/20">
                                    <h3 className="text-lg font-bold text-yellow-400 mb-3">PAYMENT DISTRIBUTION:</h3>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li>- Admin Fee: <strong className="text-white">5%</strong></li>
                                        <li>- Reward Fund: <strong className="text-white">5%</strong></li>
                                        <li>- Direct Referral: <strong className="text-white">10%</strong></li>
                                        <li>- Level Income: <strong className="text-white">~20%</strong></li>
                                        <li>- Matrix Income: <strong className="text-white">~70%</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 text-center">
                            <p className="text-yellow-300 font-bold">Dynamic BNB Pricing via Chainlink Oracle | BSC Mainnet</p>
                        </div>
                    </motion.div>
                )}

                {/* TAB: Matrix Income */}
                {activeTab === 'matrix' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        {/* Formula */}
                        <div className="p-6 rounded-2xl bg-purple-900/15 border border-purple-500/20 flex flex-col md:flex-row items-center gap-6">
                            <div className="text-5xl">🔺</div>
                            <div>
                                <h2 className="text-2xl font-black text-purple-400">MATRIX INCOME FORMULA:</h2>
                                <p className="text-xl text-white mt-1">70% of Upgrade Cost → <span className="text-purple-300">First Qualified Upline</span></p>
                            </div>
                            <div className="ml-auto text-sm text-gray-400 max-w-sm">
                                Income earned when a member in your downline upgrades, calculated as 70% of their upgrade cost, goes to the first qualified upline in the chain.
                            </div>
                        </div>

                        {/* Qualification */}
                        <div className="p-5 rounded-xl bg-green-900/10 border border-green-500/20">
                            <h3 className="text-lg font-bold text-green-400 mb-2">✅ QUALIFICATION REQUIREMENTS:</h3>
                            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                                <span>✅ Your level &gt; Payer&apos;s level</span>
                                <span>✅ Within 24 layers</span>
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
                                        {LEVEL_COSTS.map((cost, i) => (
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
                            <h3 className="text-xl font-bold text-white mb-4">EXAMPLE SCENARIOS:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                                {[
                                    { label: 'Scenario A', desc: "You're L10, someone in layer 5 upgrades to L7", result: fmtUSD(240 * 0.7), color: 'border-green-500/30 bg-green-900/10', emoji: '✅' },
                                    { label: 'Scenario B', desc: "You're L13, 5 people upgrade to L10 this month", result: fmtUSD(1920 * 0.7 * 5), color: 'border-blue-500/30 bg-blue-900/10', emoji: '🚀' },
                                    { label: 'Scenario C', desc: "You're L8, someone in layer 3 upgrades to L9", result: '$0', color: 'border-red-500/30 bg-red-900/10', emoji: '❌' },
                                    { label: 'Scenario D', desc: "You're L13 with 200-person team, 20 upgrades/month", result: '$20k-$50k', color: 'border-yellow-500/30 bg-yellow-900/10', emoji: '👑' },
                                ].map((s, i) => (
                                    <div key={i} className={`p-4 rounded-xl border ${s.color}`}>
                                        <h4 className="font-bold text-white mb-1">{s.emoji} {s.label}</h4>
                                        <p className="text-xs text-gray-400 mb-3">{s.desc}</p>
                                        <div className="text-xl font-black text-white">→ You earn: {s.result}</div>
                                        {s.result === '$0' && <p className="text-xs text-red-400 mt-1">(Not qualified - they&apos;re higher level)</p>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl bg-red-900/10 border border-red-500/20">
                                <h4 className="font-bold text-red-400 mb-2">⚠️ WHAT IF NOT QUALIFIED?</h4>
                                <ul className="text-sm text-gray-400 space-y-1">
                                    <li>- Income goes to next qualified upline</li>
                                    <li>- Or to root user if no one qualified</li>
                                    <li>- This is &quot;lost income&quot; - motivation to qualify!</li>
                                </ul>
                            </div>
                            <div className="p-5 rounded-xl bg-green-900/10 border border-green-500/20">
                                <h4 className="font-bold text-green-400 mb-2">💡 QUALIFICATION TIPS:</h4>
                                <ol className="text-sm text-gray-400 space-y-1 list-decimal pl-4">
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
                                <h2 className="text-2xl font-black text-green-400 mb-4">LEVEL INCOME STRUCTURE</h2>
                                <p className="text-gray-400 mb-4">Total: ~20% across 24 unilevel layers</p>
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-green-900/30 text-green-300">
                                            <th className="p-2 text-left border border-white/10">Level</th>
                                            <th className="p-2 text-right border border-white/10">Commission %</th>
                                            <th className="p-2 text-right border border-white/10">Per $1,000 Upgrade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {levelIncomePercents.map((pct, i) => (
                                            <tr key={i} className={`${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.05]'}`}>
                                                <td className="p-2 border border-white/10 font-bold text-white">L{i + 1}</td>
                                                <td className="p-2 border border-white/10 text-right text-green-300">{pct}%</td>
                                                <td className="p-2 border border-white/10 text-right text-gray-300">${(1000 * pct / 100).toFixed(1)}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-green-900/30 font-bold">
                                            <td className="p-2 border border-white/10 text-green-400">TOTAL</td>
                                            <td className="p-2 border border-white/10 text-right text-green-400">~19.9%</td>
                                            <td className="p-2 border border-white/10 text-right text-green-400">$199</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Right Side Info */}
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h3 className="text-lg font-bold text-white mb-3">📋 EXAMPLE CALCULATION:</h3>
                                    <p className="text-gray-300 text-sm mb-3">Team member upgrades to L10 ($1,920)</p>
                                    <ul className="space-y-2 text-sm text-gray-400">
                                        <li>• As L1 upline: <strong className="text-white">${(1920 * 0.02).toFixed(0)}</strong> (2.00%)</li>
                                        <li>• As L5 upline: <strong className="text-white">${(1920 * 0.02).toFixed(0)}</strong> (2.00%)</li>
                                        <li>• As L10 upline: <strong className="text-white">${(1920 * 0.01).toFixed(0)}</strong> (1.00%)</li>
                                        <li>• As L15 upline: <strong className="text-white">${(1920 * 0.0035).toFixed(1)}</strong> (0.35%)</li>
                                    </ul>
                                </div>

                                <div className="p-6 rounded-2xl bg-green-900/10 border border-green-500/20">
                                    <h3 className="text-lg font-bold text-green-400 mb-3">📈 MONTHLY INCOME PROJECTIONS:</h3>
                                    {[
                                        { label: 'Small Network', desc: '50 upgrades/month, avg $200', vol: '$10,000', earn: '$100 - $500' },
                                        { label: 'Medium Network', desc: '200 upgrades/month, avg $500', vol: '$100,000', earn: '$1,000 - $5,000' },
                                        { label: 'Large Network', desc: '1000 upgrades/month, avg $1,000', vol: '$1,000,000', earn: '$10,000 - $50,000' },
                                    ].map((p, i) => (
                                        <div key={i} className="mb-3 p-3 rounded-lg bg-black/30 border border-white/5">
                                            <span className="text-green-300 font-bold text-sm">{p.label}</span>
                                            <span className="text-gray-500 text-xs"> ({p.desc})</span>
                                            <div className="text-xs text-gray-400 mt-1">→ Total volume: {p.vol}</div>
                                            <div className="text-xs text-white font-semibold">→ Your commission: {p.earn}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                    <h4 className="font-bold text-yellow-400 mb-2">🌿 POWER OF COMPOUNDING:</h4>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• Build deep networks for exponential growth!</li>
                                        <li>• 24 levels deep = massive earning potential</li>
                                        <li>• Passive income from your entire downline</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20 text-center">
                            <p className="text-green-300 font-bold">Passive income from 24 levels deep | Qualification-based rewards</p>
                        </div>
                    </motion.div>
                )}

                {/* TAB: Earning Scenarios */}
                {activeTab === 'scenarios' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        <h2 className="text-3xl font-black text-center">
                            <span className="bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">Team Building & Earning Scenarios</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                            {[
                                {
                                    title: 'SMALL TEAM', members: '10 Active Members', color: 'border-green-500/30', titleBg: 'bg-green-900/30 text-green-400',
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
                                    title: 'MEDIUM TEAM', members: '50 Active Members', color: 'border-blue-500/30', titleBg: 'bg-blue-900/30 text-blue-400',
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
                                    title: 'LARGE TEAM', members: '200 Active Members', color: 'border-orange-500/30', titleBg: 'bg-orange-900/30 text-orange-400',
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
                                    title: 'ENTERPRISE', members: '1000+ Active Members', color: 'border-yellow-500/30', titleBg: 'bg-yellow-900/30 text-yellow-400',
                                    team: ['50+ Direct referrals', '950+ Deep network', 'Average level: L12', 'You at L13 (All royalty tiers)'],
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
                                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Team Structure</h4>
                                            <ul className="text-xs text-gray-400 space-y-1">
                                                {s.team.map((t, j) => <li key={j}>- {t}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Monthly Income</h4>
                                            <ul className="text-xs text-gray-300 space-y-1">
                                                {s.income.map((inc, j) => <li key={j}>• {inc}</li>)}
                                            </ul>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/5 text-center">
                                            <span className="text-xs text-gray-500">Monthly Total:</span>
                                            <div className="text-xl font-black text-white">{s.total}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Key Factors */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <h4 className="font-bold text-white mb-3">KEY FACTORS:</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                                    <span>✅ Team activity level</span>
                                    <span>✅ Direct referral count</span>
                                    <span>✅ Upgrade frequency</span>
                                    <span>✅ Royalty tier eligibility</span>
                                    <span>✅ Your qualification status</span>
                                </div>
                            </div>
                            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                                <h4 className="font-bold text-white mb-3">GROWTH MULTIPLIERS:</h4>
                                <ul className="space-y-1 text-sm text-gray-400">
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
