'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { TrendingUp, TrendingDown, DollarSign, Filter, PieChart, Clock, ArrowRight } from 'lucide-react';
import { useIncomeBreakdown, useContractConfig, useIncomeHistory, useUserIdByAddress, useBnbPrice } from '@/lib/hooks/useContract';
import { formatBNB, formatCurrency, getIncomeTypeName } from '@/lib/contract';
import { useCurrency } from '@/lib/CurrencyContext';

export default function IncomePage() {
    const { isConnected, address } = useAccount();
    const [filter, setFilter] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 50;

    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    const { data: incomeBreakdown } = useIncomeBreakdown(userId);
    const { data: config } = useContractConfig();
    const { data: incomeHistory } = useIncomeHistory(userId, 500);

    const { data: currentBnbPrice } = useBnbPrice();
    const bnbPrice = currentBnbPrice ? Number(currentBnbPrice) / 1e8 : 600;
    const totalIncomeBNB = incomeBreakdown ? (Number((incomeBreakdown as any)[0]) || 0) / 1e18 : 0;
    const totalIncomeUSD = totalIncomeBNB * bnbPrice;

    const { formatConverted, selectedCurrency } = useCurrency();

    const incomeTypes = [
        { id: 1, name: 'Sponsor', color: 'bg-brand-green', amount: (incomeBreakdown as any)?.[1] },
        { id: 2, name: 'Layer', color: 'bg-brand-red', amount: (incomeBreakdown as any)?.[2] },
        { id: 3, name: 'Matrix', color: 'bg-brand-green', amount: (incomeBreakdown as any)?.[3] },
        { id: 4, name: 'Missed', color: 'bg-brand-red', amount: (incomeBreakdown as any)?.[5], isLost: true },
    ];

    const formattedHistory = incomeHistory && Array.isArray(incomeHistory)
        ? incomeHistory.map((income: any) => ({
            type: Number(income.rewardType),
            amount: (Number(income.amount) / 1e18).toFixed(6),
            from: Number(income.id),
            tier: Number(income.tier),
            layerDepth: Number(income.layer),
            timestamp: Number(income.time) * 1000,
            isLost: !!income.isMissed,
        }))
        : [];

    const filteredHistory = filter !== null
        ? formattedHistory.filter(item => 
              filter === 4 ? item.isLost 
            : filter === 5 ? (item.type === 3 && item.isLost)
            : item.type === filter && !item.isLost
          )
        : formattedHistory;

    const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
    const paginatedHistory = filteredHistory.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="space-y-8 pb-12">
            {/* 1. Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 relative overflow-hidden bg-white backdrop-blur-xl rounded-[2.5rem] border border-brand-green/20  shadow-2xl p-10 group">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-[0.05] text-brand-green group-hover:scale-110 transition-transform duration-700">
                        <TrendingUp className="w-56 h-56" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center">
                                    <PieChart className="w-6 h-6 text-brand-green" />
                                </div>
                                <span className="text-sm font-black text-brand-blue uppercase tracking-[0.2em]">Total Realized Income</span>
                            </div>
                            
                            <div className="space-y-1">
                                <div className="flex items-baseline justify-center md:justify-start gap-4">
                                    <span className="text-5xl lg:text-7xl font-black text-variable-amber tracking-tighter italic">
                                        {formatBNB((incomeBreakdown as any)?.[0] || BigInt(0))}
                                    </span>
                                    <span className="text-2xl lg:text-3xl font-black text-foreground uppercase tracking-tighter italic">BNB</span>
                                </div>
                                <p className="text-xl lg:text-2xl font-black text-foreground italic">
                                    ≈ <span className="text-variable-amber">{formatConverted(totalIncomeBNB)}</span>
                                    <span className="text-sm text-brand-red ml-2 uppercase tracking-widest italic">{selectedCurrency.code}</span>
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-px h-px md:h-32 bg-white mx-2 hidden md:block" />

                         <div className="space-y-2 text-center md:text-right">
                             <div className="text-xs font-black text-brand-blue uppercase tracking-widest leading-none mb-2 italic">Neural Network Status</div>
                             <div className="text-xs font-black text-brand-green bg-brand-green/10 px-4 py-2 rounded-full uppercase tracking-widest inline-block border border-brand-green/20 italic">Synchronized</div>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-white backdrop-blur-xl rounded-[2.5rem] p-8 border border-brand-green/20  shadow-2xl hover:shadow-xl transition-all group">
                    <div className="absolute bottom-[-10%] right-[-10%] opacity-[0.05] text-brand-red group-hover:scale-110 transition-transform duration-500">
                        <TrendingDown className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 text-center space-y-4">
                        <div className="w-12 h-12 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto text-brand-red border border-brand-green/20  group-hover:bg-brand-red group-hover:text-foreground  transition-all">
                            <TrendingDown className="w-6 h-6" />
                        </div>
                        <div>
                             <h4 className="text-lg font-black text-sharp-green tracking-tight italic uppercase">Missed Rewards</h4>
                             <p className="text-xs font-black text-brand-blue uppercase tracking-widest mb-4 italic">Protocol Spillover</p>
                             <div className="text-3xl font-black text-brand-red tracking-tighter italic">
                                 {formatBNB((incomeBreakdown as any)?.[5] || BigInt(0))} <span className="text-sm">BNB</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Type Breakdown Pill-Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {incomeTypes.map((type) => {
                    const amountBNB = type.amount ? (Number(type.amount) || 0) / 1e18 : 0;
                    const percentage = totalIncomeBNB > 0 ? (amountBNB / totalIncomeBNB) * 100 : 0;

                    return (
                        <div key={type.id} className="bg-white backdrop-blur-xl rounded-[2rem] p-6 border border-brand-green/20  shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
                            <div className={`absolute left-0 top-0 h-full w-1 ${type.color} opacity-40`} />
                            <div className="flex flex-col space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black uppercase tracking-widest text-brand-blue italic">{type.name}</span>
                                    <div className={`w-2 h-2 rounded-full ${type.color} group-hover:scale-150 transition-transform`} />
                                </div>
                                <div className="text-2xl font-black text-variable-amber tracking-tighter italic">
                                    {formatBNB(type.amount || BigInt(0))}
                                </div>
                                <div className="h-1 w-full bg-white rounded-full overflow-hidden">
                                     <div className={`h-full ${type.color} rounded-full`} style={{ width: `${type.isLost ? 0 : percentage}%` }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. Reward History Ledger */}
            <div className="bg-white backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 border border-brand-green/20  shadow-2xl space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-brand-green/20 ">
                            <Clock className="w-6 h-6 text-brand-green" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-sharp-green tracking-tight uppercase italic">Reward Ledger</h2>
                            <p className="text-xs font-black text-brand-blue uppercase tracking-widest italic">Neural transaction synchronizer</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => { setFilter(null); setCurrentPage(1); }}
                            className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border ${filter === null
                                ? 'bg-brand-green text-foreground border-brand-green shadow-xl'
                                : 'bg-white border-brand-green/20  text-foreground  hover:text-brand-green'
                            }`}
                        >
                            All Logs
                        </button>
                        {incomeTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => { setFilter(type.id); setCurrentPage(1); }}
                                className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border ${filter === type.id
                                    ? 'bg-brand-green text-foreground border-brand-green shadow-xl'
                                    : 'bg-white border-brand-green/20  text-foreground  hover:text-brand-green'
                                }`}
                            >
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto -mx-8 lg:mx-0">
                    <table className="w-full min-w-[700px] border-separate border-spacing-y-2 text-foreground font-medium">
                        <thead>
                            <tr className="text-left text-xs font-black text-sharp-green uppercase tracking-[0.2em] italic">
                                <th className="px-8 pb-4">Classification</th>
                                <th className="px-8 pb-4">Origin Node</th>
                                <th className="px-8 pb-4">Protocol Data</th>
                                <th className="px-8 pb-4">Timestamp</th>
                                <th className="px-8 pb-4 text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {paginatedHistory.map((item, index) => (
                                <tr key={index} className="bg-white hover:bg-white transition-all group border border-brand-green/20 ">
                                    <td className="px-8 py-5 rounded-l-[1.5rem] border-l border-y border-brand-green/20  group-hover:border-brand-green/20 ">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2.5 h-2.5 rounded-full ${item.isLost ? 'bg-brand-red shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-brand-green shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`} />
                                            <span className={`font-black uppercase tracking-widest text-xs italic ${item.isLost ? 'text-sharp-red' : 'text-foreground'}`}>
                                                {getIncomeTypeName(item.type)} {item.isLost ? '(Lost)' : ''}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 border-y border-brand-green/20  group-hover:border-brand-green/20 ">
                                        <div className="text-sm font-black text-variable-amber tracking-tighter italic">Node #{item.from}</div>
                                    </td>
                                    <td className="px-8 py-5 border-y border-brand-green/20  group-hover:border-brand-green/20 ">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black text-sharp-red uppercase tracking-widest italic">L {item.layerDepth}</span>
                                            <div className="w-1.5 h-1.5 bg-brand-green/40 rounded-full group-hover:scale-150 transition-transform" />
                                            <span className="text-xs font-black text-sharp-green uppercase tracking-widest italic">T {item.tier}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 border-y border-brand-green/20  group-hover:border-brand-green/20 ">
                                        <div className="text-xs font-black text-foreground uppercase tracking-widest italic leading-none">{new Date(item.timestamp).toLocaleString()}</div>
                                    </td>
                                    <td className="px-8 py-5 rounded-r-[1.5rem] border-r border-y border-brand-green/20  group-hover:border-brand-green/20  text-right">
                                        <div className={`text-base font-black tracking-tighter italic ${item.isLost ? 'text-sharp-red' : 'text-variable-amber'}`}>
                                            {item.amount} <span className="text-xs text-brand-blue ml-0.5 uppercase italic">BNB</span>
                                        </div>
                                        <div className="text-xs text-foreground font-black mt-0.5 uppercase tracking-tighter">
                                            {formatConverted(parseFloat(item.amount))} {selectedCurrency.code !== 'BNB' ? selectedCurrency.code : ''}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center pt-8 border-t border-brand-green/20 ">
                        <p className="text-[10px] font-black text-foreground uppercase tracking-widest italic">Neural Stream Page {currentPage} of {totalPages}</p>
                        <div className="flex gap-2">
                             <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-3 rounded-2xl bg-white border border-brand-green/20  text-brand-red disabled:opacity-30 hover:bg-white transition-all shadow-sm"
                            >
                                <ArrowRight className="w-5 h-5 rotate-180" />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-3 rounded-2xl bg-brand-green text-foreground shadow-xl disabled:opacity-30 hover:scale-105 active:scale-95 transition-all"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



