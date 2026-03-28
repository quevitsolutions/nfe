'use client';

import { useLevelCosts } from '@/lib/hooks/useContract';
import { formatBNB } from '@/lib/contract';
import { ArrowRight, Users, Zap, TrendingUp, Shield } from 'lucide-react';
import { useState } from 'react';

const cardColors: Record<string, { bg: string, border: string, text: string, iconBg: string }> = {
    yellow: { bg: 'hover:border-amber-300', border: 'border-amber-200', text: 'text-amber-500', iconBg: 'bg-amber-50' },
    blue: { bg: 'hover:border-blue-300', border: 'border-blue-200', text: 'text-blue-500', iconBg: 'bg-blue-50' },
    purple: { bg: 'hover:border-purple-300', border: 'border-purple-200', text: 'text-purple-500', iconBg: 'bg-purple-50' },
    green: { bg: 'hover:border-emerald-300', border: 'border-emerald-200', text: 'text-emerald-500', iconBg: 'bg-emerald-50' }
};

const IncomeCard = ({ title, icon: Icon, color, children }: any) => {
    const theme = cardColors[color] || cardColors.blue;
    return (
        <div className={`bg-white border border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.05)] rounded-2xl p-6 ${theme.bg} hover:shadow-lg transition-all h-full flex flex-col`}>
            <div className={`${theme.iconBg} ${theme.border} border w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-[inset_1px_1px_2px_rgba(255,255,255,1)]`}>
                <Icon className={`w-8 h-8 ${theme.text}`} />
            </div>
            <h3 className={`text-xl font-black text-gray-800 mb-4 uppercase tracking-widest`}>{title}</h3>
            <div className="text-gray-500 space-y-4 flex-grow font-bold">
                {children}
            </div>
        </div>
    );
};

export default function IncomeStructure() {
    const { data: levelCosts } = useLevelCosts();
    const [activeTab, setActiveTab] = useState('direct');

    // Default to 0.05 BNB if not loaded yet
    const firstLevelCost = levelCosts ? Number(levelCosts[0]) / 1e18 : 0.05;

    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-black text-[#2471a3] text-center mb-12 uppercase tracking-widest [text-shadow:1px_1px_0_#fff,-1px_-1px_0_#e5e7eb,2px_2px_4px_rgba(36,113,163,0.3)]">
                    💰 Contract-Verified Income Structure
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Direct Income */}
                    <IncomeCard title="Direct Income" icon={Zap} color="yellow">
                        <p>Earn <span className="text-amber-500 font-black">10%</span> instantly on every direct referral.</p>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-inner">
                            <div className="flex justify-between text-sm mb-2 text-gray-500">
                                <span>Entry Cost (L1)</span>
                                <span className="text-gray-800 font-black">{firstLevelCost} BNB</span>
                            </div>
                            <div className="flex justify-between text-lg font-black text-emerald-600 border-t border-gray-200 pt-2">
                                <span>You Earn</span>
                                <span>{(firstLevelCost * 0.10).toFixed(4)} BNB</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400">*Unlimited direct referrals allowed.</p>
                    </IncomeCard>

                    {/* Level Income */}
                    <IncomeCard title="Level Income" icon={TrendingUp} color="blue">
                        <p>Earn across <span className="text-blue-500 font-black">18 Levels</span> deep.</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-gray-100 pb-1">
                                <span className="text-gray-500">Level 1-5</span>
                                <span className="text-gray-800 font-black">5%</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-1">
                                <span className="text-gray-500">Level 6-10</span>
                                <span className="text-gray-800 font-black">3%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Level 11-18</span>
                                <span className="text-gray-800 font-black">1%</span>
                            </div>
                        </div>
                    </IncomeCard>

                    {/* Matrix Income */}
                    <IncomeCard title="Matrix Income" icon={Users} color="purple">
                        <p>Binary Structure (2x2) with <span className="text-purple-500 font-black">Spillover</span>.</p>
                        <ul className="list-disc pl-4 space-y-2 text-sm text-gray-600">
                            <li>Non-working income potential</li>
                            <li>Upline support</li>
                            <li>Auto-placement from top</li>
                        </ul>
                    </IncomeCard>

                    {/* Pools */}
                    <IncomeCard title="Reward Pools" icon={Shield} color="green">
                        <p><span className="text-emerald-500 font-black">5%</span> Global Revenue shared.</p>
                        <div className="space-y-2 text-sm mt-4 text-emerald-700 font-bold text-center">
                            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                                Achiever Pool
                            </div>
                            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                                Leader Pool
                            </div>
                        </div>
                    </IncomeCard>
                </div>

                {/* Live Contract Data Badge */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full text-[#2471a3] font-bold text-sm shadow-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        Fetched live from Smart Contract
                    </div>
                </div>
            </div>
        </section>
    );
}
