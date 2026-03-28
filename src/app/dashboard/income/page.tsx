'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { TrendingUp, TrendingDown, DollarSign, Filter, PieChart, Clock, ArrowRight } from 'lucide-react';
import { useIncomeBreakdown, useContractConfig, useIncomeHistory, useUserIdByAddress, useBnbPrice } from '@/lib/hooks/useContract';
import { formatBNB, formatCurrency, getIncomeTypeName } from '@/lib/contract';

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
    const totalIncomeBNB = incomeBreakdown ? Number(incomeBreakdown[0]) / 1e18 : 0;
    const totalIncomeUSD = totalIncomeBNB * bnbPrice;

    const incomeTypes = [
        { id: 1, name: 'Sponsor', color: 'bg-amber-500', amount: incomeBreakdown?.[1] },
        { id: 2, name: 'Layer', color: 'bg-[#e30613]', amount: incomeBreakdown?.[2] },
        { id: 3, name: 'Matrix', color: 'bg-cyan-500', amount: incomeBreakdown?.[3] },
        { id: 4, name: 'Missed', color: 'bg-rose-500', amount: incomeBreakdown?.[5], isLost: true },
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
                <div className="lg:col-span-2 relative overflow-hidden bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-10 group">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-[0.03] text-[#e30613] group-hover:scale-110 transition-transform duration-700">
                        <TrendingUp className="w-56 h-56" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="w-12 h-12 bg-[#e30613]/10 rounded-2xl flex items-center justify-center">
                                    <PieChart className="w-6 h-6 text-[#e30613]" />
                                </div>
                                <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Total Realized Income</span>
                            </div>
                            
                            <div className="space-y-1">
                                <div className="flex items-baseline justify-center md:justify-start gap-4">
                                    <span className="text-5xl lg:text-7xl font-black text-[#e30613] tracking-tighter">
                                        {formatBNB(incomeBreakdown?.[0] || BigInt(0))}
                                    </span>
                                    <span className="text-2xl lg:text-3xl font-black text-slate-200 uppercase tracking-tighter">BNB</span>
                                </div>
                                <p className="text-xl lg:text-2xl font-bold text-slate-400">
                                    ≈ {formatCurrency(totalIncomeUSD)} USD
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-px h-px md:h-32 bg-slate-100 mx-2 hidden md:block" />

                         <div className="space-y-2 text-center md:text-right">
                             <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-2">Network Status</div>
                             <div className="text-xs font-black text-[#e30613] bg-[#e30613]/5 px-4 py-2 rounded-full uppercase tracking-widest inline-block border border-[#e30613]/10">Synchronized</div>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all group">
                    <div className="absolute bottom-[-10%] right-[-10%] opacity-[0.03] text-rose-500 group-hover:scale-110 transition-transform duration-500">
                        <TrendingDown className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 text-center space-y-4">
                        <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-rose-500 border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-all">
                            <TrendingDown className="w-6 h-6" />
                        </div>
                        <div>
                             <h4 className="text-lg font-black text-slate-800 tracking-tight">Missed Rewards</h4>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Protocol Spillover</p>
                             <div className="text-3xl font-black text-rose-500 tracking-tighter">
                                 {formatBNB(incomeBreakdown?.[5] || BigInt(0))} <span className="text-sm">BNB</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Type Breakdown Pill-Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {incomeTypes.map((type) => {
                    const amountBNB = type.amount ? Number(type.amount) / 1e18 : 0;
                    const percentage = totalIncomeBNB > 0 ? (amountBNB / totalIncomeBNB) * 100 : 0;

                    return (
                        <div key={type.id} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className={`absolute left-0 top-0 h-full w-1 ${type.color} opacity-20`} />
                            <div className="flex flex-col space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{type.name}</span>
                                    <div className={`w-2 h-2 rounded-full ${type.color} group-hover:scale-150 transition-transform`} />
                                </div>
                                <div className="text-2xl font-black text-slate-800 tracking-tighter">
                                    {formatBNB(type.amount || BigInt(0))}
                                </div>
                                <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                                     <div className={`h-full ${type.color} rounded-full`} style={{ width: `${type.isLost ? 0 : percentage}%` }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. Reward History Ledger */}
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                            <Clock className="w-6 h-6 text-[#e30613]" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Reward Ledger</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time synchronized transactions</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => { setFilter(null); setCurrentPage(1); }}
                            className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border ${filter === null
                                ? 'bg-[#e30613] text-white border-[#e30613] shadow-lg shadow-[#e30613]/20'
                                : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                            }`}
                        >
                            All Logs
                        </button>
                        {incomeTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => { setFilter(type.id); setCurrentPage(1); }}
                                className={`px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border ${filter === type.id
                                    ? 'bg-[#e30613] text-white border-[#e30613] shadow-lg shadow-[#e30613]/20'
                                    : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto -mx-8 lg:mx-0">
                    <table className="w-full min-w-[700px] border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-left text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                <th className="px-8 pb-4">Classification</th>
                                <th className="px-8 pb-4">Origin Node</th>
                                <th className="px-8 pb-4">Protocol Data</th>
                                <th className="px-8 pb-4">Timestamp</th>
                                <th className="px-8 pb-4 text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody className="space-y-2">
                            {paginatedHistory.map((item, index) => (
                                <tr key={index} className="bg-slate-50/50 hover:bg-white transition-all group border border-slate-100">
                                    <td className="px-8 py-5 rounded-l-[1.5rem] border-l border-y border-slate-50 group-hover:border-slate-100 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${item.isLost ? 'bg-rose-500' : 'bg-[#e30613]'}`} />
                                            <span className={`font-black uppercase tracking-widest text-[10px] ${item.isLost ? 'text-rose-500' : 'text-slate-800'}`}>
                                                {getIncomeTypeName(item.type)} {item.isLost ? '(Lost)' : ''}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 border-y border-slate-50 group-hover:border-slate-100 transition-all">
                                        <div className="text-xs font-black text-slate-500 tracking-tighter">Node #{item.from}</div>
                                    </td>
                                    <td className="px-8 py-5 border-y border-slate-50 group-hover:border-slate-100 transition-all">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">L {item.layerDepth}</span>
                                            <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">T {item.tier}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 border-y border-slate-50 group-hover:border-slate-100 transition-all">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(item.timestamp).toLocaleString()}</div>
                                    </td>
                                    <td className="px-8 py-5 rounded-r-[1.5rem] border-r border-y border-slate-50 group-hover:border-slate-100 transition-all text-right">
                                        <div className={`text-sm font-black tracking-tighter ${item.isLost ? 'text-rose-500' : 'text-[#e30613]'}`}>
                                            {item.amount} <span className="text-[10px] opacity-60 ml-0.5">BNB</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Page {currentPage} of {totalPages}</p>
                        <div className="flex gap-2">
                             <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-3 rounded-2xl bg-white border border-slate-100 text-[#e30613] disabled:opacity-30 hover:bg-slate-50 transition-all"
                            >
                                <ArrowRight className="w-5 h-5 rotate-180" />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-3 rounded-2xl bg-[#e30613] text-white shadow-lg shadow-[#e30613]/20 disabled:opacity-30 hover:scale-105 active:scale-95 transition-all"
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
