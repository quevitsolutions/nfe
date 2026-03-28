'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ArrowUpCircle, Check, Loader2, Layers, ShieldCheck, Zap, TrendingUp, Info, Network } from 'lucide-react';
import { useUpgrade, useLevelCosts, useContractConfig, useUserInfo, useUserIdByAddress } from '@/lib/hooks/useContract';
import { formatBNB, formatCurrency, LEVEL_COSTS_USD } from '@/lib/contract';

export default function UpgradePage() {
    const { isConnected, address } = useAccount();
    const [selectedLevel, setSelectedLevel] = useState<number>(0);

    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    const { data: userInfo } = useUserInfo(userId);
    const { data: levelCosts } = useLevelCosts();
    const { data: config } = useContractConfig();
    const { upgrade, isPending, isConfirming, isSuccess, hash } = useUpgrade();

    const currentLevel = userInfo ? Number(userInfo[3]) : 0;
    
    if (selectedLevel === 0 && currentLevel > 0) {
        setSelectedLevel(Math.min(18, currentLevel + 1));
    }

    const isGenesisUser = userId === 36999;
    const upgradeCost = isGenesisUser || !levelCosts
        ? BigInt(0)
        : levelCosts.slice(currentLevel, selectedLevel).reduce((acc, cost) => acc + (cost || BigInt(0)), BigInt(0));

    const exactUsdCost = LEVEL_COSTS_USD
        .slice(currentLevel, selectedLevel)
        .reduce((a, b) => a + b, 0);

    const handleUpgrade = async () => {
        if (!isConnected || selectedLevel <= currentLevel) return;
        try {
            await upgrade(userId, selectedLevel, upgradeCost);
        } catch (error) {
            console.error('Upgrade failed:', error);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* 1. Header Overview Banner */}
            <div className="relative overflow-hidden bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-10 lg:p-12 mb-8 group">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-[0.03] text-[#e30613] group-hover:scale-110 transition-transform duration-700">
                    <Layers className="w-64 h-64" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#e30613]/10 rounded-2xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-[#e30613]" />
                            </div>
                            <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Protocol Scaling</span>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-baseline gap-4 text-center md:text-left">
                                <span className="text-6xl lg:text-8xl font-black text-[#e30613] tracking-tighter">
                                    Tier {currentLevel}
                                </span>
                                <span className="text-2xl lg:text-3xl font-black text-slate-200 uppercase tracking-tighter">Current Access</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 text-center space-y-4 min-w-[300px]">
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Tier Authority</div>
                         <div className="flex items-center justify-center gap-3">
                             <ShieldCheck className="w-8 h-8 text-[#e30613]" />
                             <span className="text-3xl font-black text-slate-800 tracking-tighter">Verified Node</span>
                         </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 2. Tier Selector Panel */}
                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                            <Layers className="w-5 h-5 text-[#e30613]" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Select Neural Tier</h2>
                    </div>

                    <div className="grid grid-cols-6 gap-3">
                        {Array.from({ length: 18 }, (_, i) => i + 1).map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                disabled={level <= currentLevel}
                                className={`
                                    h-14 rounded-2xl font-black text-xs transition-all border
                                    ${selectedLevel === level
                                        ? 'bg-[#e30613] border-[#e30613] text-white shadow-lg shadow-[#e30613]/20 scale-110 z-10'
                                        : level <= currentLevel
                                            ? 'bg-slate-50 border-slate-100 text-slate-200 cursor-not-allowed'
                                            : 'bg-white border-slate-100 text-slate-400 hover:border-[#e30613]/30 hover:text-slate-600'
                                    }
                                `}
                            >
                                {level < 10 ? `0${level}` : level}
                            </button>
                        ))}
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 space-y-4">
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                            <span className="text-slate-400">Target Scaling:</span>
                            <span className="text-[#e30613]">Tier {selectedLevel}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                            <span className="text-slate-400">Authorization Steps:</span>
                            <span className="text-slate-800">{Math.max(0, selectedLevel - currentLevel)} Layers</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Cost:</span>
                            <span className="text-2xl font-black text-slate-800 tracking-tighter">
                                {formatCurrency(exactUsdCost)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Authentication Panel */}
                <div className="flex flex-col">
                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex-1 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mt-6 -mr-6 opacity-[0.03] text-[#e30613] group-hover:rotate-12 transition-transform duration-500">
                        <ArrowUpCircle className="w-48 h-48" />
                    </div>
                    
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-8">Authorization</h2>

                    {isSuccess ? (
                        <div className="bg-red-50 border border-red-100 rounded-[2.5rem] p-10 text-center animate-in zoom-in-95">
                            <div className="w-20 h-20 bg-[#e30613] shadow-xl rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <Check className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-black text-[#e30613] mb-2 uppercase tracking-tight">Access Granted</h3>
                            <p className="text-xs font-bold text-[#e30613]/60 uppercase tracking-widest mb-6">Your Node is now Synchronized in Tier {selectedLevel}</p>
                            {hash && (
                                <a
                                    href={`${config?.blockExplorers?.default?.url}/tx/${hash}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="px-8 py-3 bg-white border border-red-100 text-[#e30613] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all inline-block"
                                >
                                    View Tx Ledger »
                                </a>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-center space-y-4">
                                <div className="text-5xl lg:text-6xl font-black text-[#e30613] tracking-tighter">
                                    {formatBNB(upgradeCost)} <span className="text-xl text-slate-300 uppercase italic">BNB</span>
                                </div>
                                <div className="text-[10px] font-black text-slate-400 bg-white px-6 py-2 rounded-full uppercase tracking-widest inline-block border border-slate-100 shadow-sm">
                                    Market Value: {formatCurrency(exactUsdCost)}
                                </div>
                            </div>

                            <button
                                onClick={handleUpgrade}
                                disabled={!isConnected || selectedLevel <= currentLevel || isPending || isConfirming}
                                className="w-full relative overflow-hidden bg-[#e30613] text-white py-6 rounded-[2rem] font-black tracking-widest text-sm uppercase shadow-2xl shadow-[#e30613]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center gap-3 group"
                            >
                                {isPending || isConfirming ? (
                                    <>
                                        <Loader2 className="animate-spin w-6 h-6" />
                                        Authenticating Node...
                                    </>
                                ) : (
                                    <>
                                        <ArrowUpCircle className="w-6 h-6 group-hover:animate-bounce" />
                                        Authorize Neural Expansion
                                    </>
                                )}
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50/50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                                    <TrendingUp className="w-4 h-4 text-[#e30613]" />
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Increased Performance</span>
                                </div>
                                <div className="bg-slate-50/50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100">
                                    <Network className="w-4 h-4 text-[#e30613]" />
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Extended Path Scope</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>

            {/* 4. Directory Grid */}
            <div className="bg-slate-50/50 rounded-[3rem] p-10 border border-slate-100 space-y-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm">
                        <Info className="w-5 h-5 text-[#e30613]" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase leading-none">Protocol Tier Directory</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {LEVEL_COSTS_USD.map((cost, index) => (
                        <div
                            key={index}
                            className={`rounded-3xl p-6 border transition-all ${index < currentLevel
                                ? 'bg-red-50 border-red-100'
                                : index < selectedLevel
                                    ? 'bg-white border-[#e30613] shadow-lg shadow-[#e30613]/5 scale-105 z-10'
                                    : 'bg-white border-slate-100 shadow-sm opacity-60'
                                }`}
                        >
                            <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${index < currentLevel ? 'text-red-600' : index < selectedLevel ? 'text-[#e30613]' : 'text-slate-400'}`}>Layer {index + 1}</div>
                            <div className={`text-xl font-black ${index < currentLevel ? 'text-red-700' : index < selectedLevel ? 'text-[#e30613]' : 'text-slate-800'}`}>{formatCurrency(cost)}</div>
                            <div className="text-[9px] font-bold text-slate-300 mt-1 uppercase tracking-tighter">
                                {levelCosts ? formatBNB(levelCosts[index]) : '---'} BNB
                            </div>
                            {index < currentLevel && (
                                <div className="text-[8px] text-[#e30613] font-black uppercase tracking-widest mt-4 bg-white/50 w-fit px-2 py-1 rounded-full flex items-center gap-1 border border-red-100">
                                    <Check className="w-3 h-3" /> Activated
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
