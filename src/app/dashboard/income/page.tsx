'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { TrendingUp, TrendingDown, DollarSign, Filter } from 'lucide-react';
import { useIncomeBreakdown, useContractConfig, useIncomeHistory, useUserIdByAddress, useBnbPrice } from '@/lib/hooks/useContract';
import { formatBNB, formatCurrency, getIncomeTypeName } from '@/lib/contract';



export default function IncomePage() {
    const { isConnected, address } = useAccount();
    const [filter, setFilter] = useState<number | null>(null);

    // Get user ID from connected wallet address
    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    const { data: incomeBreakdown } = useIncomeBreakdown(userId);
    const { data: config } = useContractConfig();
    const { data: incomeHistory } = useIncomeHistory(userId, 100);

    const { data: currentBnbPrice } = useBnbPrice();
    const bnbPrice = currentBnbPrice ? Number(currentBnbPrice) / 1e8 : 600; // Dynamic BNB price or fallback
    const totalIncomeBNB = incomeBreakdown ? Number(incomeBreakdown[0]) / 1e18 : 0;
    const totalIncomeUSD = totalIncomeBNB * bnbPrice;

    const incomeTypes = [
        { id: 0, name: 'Referral', color: 'yellow', amount: incomeBreakdown?.[1] },
        { id: 1, name: 'Direct', color: 'blue', amount: incomeBreakdown?.[4] },
        { id: 2, name: 'Level', color: 'green', amount: incomeBreakdown?.[2] },
        { id: 3, name: 'Binary', color: 'pink', amount: incomeBreakdown?.[3] },
    ];

    // Filter and format real income history
    const formattedHistory = incomeHistory && Array.isArray(incomeHistory)
        ? incomeHistory.map((income: any) => ({
            rewardId: Number(income.id),
            type: Number(income.rewardType),
            amount: (Number(income.amount) / 1e18).toFixed(6),
            from: Number(income.fromId || 0), // Adjusting based on ABI
            tier: Number(income.tier || 0),
            timestamp: Number(income.time) * 1000,
            isLost: !!income.isMissed,
        }))
        : [];

    const filteredHistory = filter !== null
        ? formattedHistory.filter(item => item.type === filter)
        : formattedHistory;

    return (
        <div className="space-y-6">
            {/* Total Income */}
            <div className="bg-gradient-to-r from-green-400/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl">
                        <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-gray-300 text-lg">Total Lifetime Rewards</h2>
                        <div className="text-3xl md:text-5xl font-bold text-white break-all">{formatBNB(incomeBreakdown?.[0] || BigInt(0))} BNB</div>
                        <div className="text-2xl text-green-400">{formatCurrency(totalIncomeUSD)}</div>
                    </div>
                </div>
            </div>

            {/* Reward Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {incomeTypes.map((type) => {
                    const amountBNB = type.amount ? Number(type.amount) / 1e18 : 0;
                    const amountUSD = amountBNB * bnbPrice;
                    const percentage = totalIncomeBNB > 0 ? (amountBNB / totalIncomeBNB) * 100 : 0;

                    return (
                        <div
                            key={type.id}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-gray-300 font-semibold">{type.name === 'Referral' ? 'Sponsor' : type.name} Rewards</h3>
                                <TrendingUp className={`w-5 h-5 text-${type.color}-400`} />
                            </div>
                            <div className={`text-3xl font-bold text-${type.color}-400 mb-1`}>
                                {formatBNB(type.amount || BigInt(0))} BNB
                            </div>
                            <div className="text-gray-400 mb-2">{formatCurrency(amountUSD)}</div>
                            <div className="text-sm text-white font-medium">{percentage.toFixed(1)}% of total</div>
                        </div>
                    );
                })}
            </div>

            {/* Reward History */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Reward History</h2>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter(null)}
                            className={`px-4 py-2 rounded-lg transition-colors ${filter === null
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            All
                        </button>
                        {incomeTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setFilter(type.id)}
                                className={`px-4 py-2 rounded-lg transition-colors ${filter === type.id
                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                    }`}
                            >
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Reward ID</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Reward Type</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">From Node</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Active Tier</th>
                                <th className="text-left text-gray-400 font-semibold p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistory.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-gray-400 p-8">
                                        No income records found
                                    </td>
                                </tr>
                            ) : (
                                filteredHistory.map((record, index) => (
                                    <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="p-4 text-gray-300">#{record.rewardId}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${record.type === 0 ? 'bg-yellow-500/20 text-yellow-400' : ''}
                        ${record.type === 1 ? 'bg-blue-500/20 text-blue-400' : ''}
                        ${record.type === 2 ? 'bg-green-500/20 text-green-400' : ''}
                        ${record.type === 3 ? 'bg-pink-500/20 text-pink-400' : ''}
                      `}>
                                                {getIncomeTypeName(record.type)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-300">#{record.from}</td>
                                        <td className="p-4 text-gray-300">Tier {record.tier.toString()}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.isLost
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-green-500/20 text-green-400'
                                                }`}>
                                                {record.isLost ? 'Lost' : 'Received'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
