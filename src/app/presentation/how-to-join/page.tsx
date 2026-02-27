'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const joinSteps = [
    {
        num: 1,
        title: 'CONNECT WALLET',
        icon: '🦊',
        details: [
            'Install MetaMask or compatible wallet',
            'Connect to BSC Mainnet (Chain ID: 56)',
            'Ensure you have BNB for gas + registration',
        ],
    },
    {
        num: 2,
        title: 'GET REFERRAL LINK',
        icon: '🔗',
        details: [
            'Obtain referral link from sponsor',
            'Or use default referrer if no sponsor',
            'Keep link for your own referrals later',
        ],
    },
    {
        num: 3,
        title: 'REGISTER',
        icon: '💻',
        details: [
            'Visit platform website',
            "Click 'Register' or 'Join'",
            'Enter referral address',
            'Approve transaction in wallet',
        ],
    },
    {
        num: 4,
        title: 'PAYMENT',
        icon: '💡',
        details: [
            'Level 1 cost: ~0.008 BNB ($5)',
            'Admin fee: 5% additional',
            'Total: ~0.0084 BNB',
            'Transaction confirms in seconds',
        ],
    },
];

const upgradeSteps = [
    {
        num: 1,
        title: 'CHECK YOUR LEVEL',
        icon: '📊',
        details: [
            'View current level in dashboard',
            'See available upgrade levels',
            'Review costs for next levels',
        ],
    },
    {
        num: 2,
        title: 'CALCULATE COST',
        icon: '🧮',
        details: [
            'Each level has fixed USD cost',
            'BNB amount adjusts with oracle price',
            'Admin fee: 5% additional',
            'Can upgrade multiple levels at once',
        ],
    },
    {
        num: 3,
        title: 'UPGRADE TRANSACTION',
        icon: '⬆️',
        details: [
            "Click 'Upgrade' in dashboard",
            'Select number of levels',
            'Approve BNB amount',
            'Confirm transaction',
        ],
    },
    {
        num: 4,
        title: 'EARN MORE',
        icon: '📈',
        details: [
            'Higher levels = more income potential',
            'Unlock royalty tiers',
            'Qualify for more commissions',
            'Increase matrix earnings',
        ],
    },
];

const levelCosts = [
    { level: 1, cost: '$5' },
    { level: 5, cost: '$60' },
    { level: 10, cost: '$1,920' },
    { level: 15, cost: '$61,440' },
    { level: 20, cost: '$1.96M' },
    { level: 24, cost: '$62.9M' },
];

export default function HowToJoinSlide() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#050510] overflow-auto relative font-sans text-white">

            {/* Navigation */}
            <Link href="/presentation" className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm tracking-widest uppercase font-mono">Back to Presentation</span>
            </Link>

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] top-1/4 left-1/4" />
                <div className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] bottom-1/4 right-1/4" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <div className="text-5xl mb-2">⚙️</div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">HOW TO JOIN</span>
                        <span className="text-white/60"> & </span>
                        <span className="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">UPGRADE</span>
                    </h1>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

                    {/* LEFT: How to Join */}
                    <div>
                        <h2 className="text-3xl font-black text-teal-400 mb-6 text-center">
                            HOW TO JOIN <span className="text-white/40 text-xl">(Registration)</span>
                        </h2>
                        <div className="space-y-4">
                            {joinSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex gap-4 items-start p-5 rounded-2xl bg-gradient-to-r from-teal-900/20 to-transparent border border-teal-500/20 hover:border-teal-400/40 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-300 font-black text-lg border border-teal-500/30">
                                        {step.num}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                            <span className="text-2xl">{step.icon}</span>
                                        </div>
                                        <ul className="space-y-1">
                                            {step.details.map((d, j) => (
                                                <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                                                    <span className="text-teal-500 mt-0.5">•</span> {d}
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
                            className="mt-6 p-4 rounded-xl bg-green-900/20 border border-green-500/30 text-center"
                        >
                            <span className="text-green-400 text-lg font-bold">✅ REGISTRATION COMPLETE</span>
                            <p className="text-gray-400 text-sm mt-1">You&apos;re now Level 1 and can start earning!</p>
                        </motion.div>
                    </div>

                    {/* RIGHT: How to Upgrade */}
                    <div>
                        <h2 className="text-3xl font-black text-blue-400 mb-6 text-center">
                            HOW TO UPGRADE
                        </h2>
                        <div className="space-y-4">
                            {upgradeSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex gap-4 items-start p-5 rounded-2xl bg-gradient-to-r from-transparent to-blue-900/20 border border-blue-500/20 hover:border-blue-400/40 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-black text-lg border border-blue-500/30">
                                        {step.num}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                            <span className="text-2xl">{step.icon}</span>
                                        </div>
                                        <ul className="space-y-1">
                                            {step.details.map((d, j) => (
                                                <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                                                    <span className="text-blue-500 mt-0.5">•</span> {d}
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
                            className="mt-6 p-4 rounded-xl bg-blue-900/20 border border-blue-500/30 text-center"
                        >
                            <span className="text-blue-400 text-lg font-bold">🚀 LEVEL UP = EARN MORE</span>
                            <p className="text-gray-400 text-sm mt-1">Higher levels unlock exponentially higher income potential!</p>
                        </motion.div>
                    </div>
                </div>

                {/* Quick Reference Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                    className="mb-6"
                >
                    <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Quick Reference:</h3>
                    <div className="flex flex-wrap gap-3">
                        {levelCosts.map((lc, i) => (
                            <div key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                                <span className="text-gray-400">Level {lc.level}:</span>{' '}
                                <span className="text-white font-bold">{lc.cost}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Requirements Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                    className="mb-10"
                >
                    <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Requirements:</h3>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                        <span>✅ BSC-compatible wallet</span>
                        <span>✅ BNB for transactions</span>
                        <span>✅ Referral link (or use default)</span>
                    </div>
                </motion.div>

                {/* Bottom Banner */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                    className="w-full p-4 rounded-2xl bg-gradient-to-r from-teal-900/30 to-blue-900/30 border border-white/10 text-center"
                >
                    <p className="text-lg font-bold text-white">
                        Simple 4-Step Process <span className="text-white/30 mx-2">|</span>
                        Instant Activation <span className="text-white/30 mx-2">|</span>
                        Start Earning Immediately
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
