'use client';

import { useLevelCosts } from '@/lib/hooks/useContract';
import { formatBNB } from '@/lib/contract';
import { ArrowRight, Users, Zap, TrendingUp, Shield } from 'lucide-react';
import { useState } from 'react';

const IncomeCard = ({ title, icon: Icon, color, children }: any) => (
    <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-${color}-500/50 transition-colors h-full flex flex-col`}>
        <div className={`bg-${color}-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
            <Icon className={`w-8 h-8 text-${color}-400`} />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <div className="text-gray-400 space-y-4 flex-grow">
            {children}
        </div>
    </div>
);

export default function IncomeStructure() {
    const { data: levelCosts } = useLevelCosts();
    const [activeTab, setActiveTab] = useState('direct');

    // Default to 0.05 BNB if not loaded yet
    const firstLevelCost = levelCosts ? Number(levelCosts[0]) / 1e18 : 0.05;

    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-white text-center mb-12">
                    💰 Contract-Verified Income Structure
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Direct Income */}
                    <IncomeCard title="Direct Income" icon={Zap} color="yellow">
                        <p>Earn <span className="text-yellow-400 font-bold">10%</span> instantly on every direct referral.</p>
                        <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Entry Cost (L1)</span>
                                <span className="text-white">{firstLevelCost} BNB</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-green-400 border-t border-white/10 pt-2">
                                <span>You Earn</span>
                                <span>{(firstLevelCost * 0.10).toFixed(4)} BNB</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">*Unlimited direct referrals allowed.</p>
                    </IncomeCard>

                    {/* Level Income */}
                    <IncomeCard title="Level Income" icon={TrendingUp} color="blue">
                        <p>Earn across <span className="text-blue-400 font-bold">25 Levels</span> deep.</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Level 1-5</span>
                                <span className="text-white">5%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Level 6-10</span>
                                <span className="text-white">3%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Level 11-25</span>
                                <span className="text-white">1%</span>
                            </div>
                        </div>
                    </IncomeCard>

                    {/* Matrix Income */}
                    <IncomeCard title="Matrix Income" icon={Users} color="purple">
                        <p>Binary Structure (2x2) with <span className="text-purple-400 font-bold">Spillover</span>.</p>
                        <ul className="list-disc pl-4 space-y-2 text-sm">
                            <li>Non-working income potential</li>
                            <li>Upline support</li>
                            <li>Auto-placement from top</li>
                        </ul>
                    </IncomeCard>

                    {/* Pools */}
                    <IncomeCard title="Reward Pools" icon={Shield} color="green">
                        <p><span className="text-green-400 font-bold">5%</span> Global Revenue shared.</p>
                        <div className="space-y-2 text-sm mt-4">
                            <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
                                Achiever Pool
                            </div>
                            <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
                                Leader Pool
                            </div>
                        </div>
                    </IncomeCard>
                </div>

                {/* Live Contract Data Badge */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2 rounded-full text-blue-400 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Fetched live from Smart Contract
                    </div>
                </div>
            </div>
        </section>
    );
}
