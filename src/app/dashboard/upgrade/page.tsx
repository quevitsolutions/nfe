'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ArrowUpCircle, Check, Loader2, Layers, ShieldCheck, Zap, TrendingUp, Info, Network } from 'lucide-react';
import { useUpgrade, useLevelCosts, useContractConfig, useUserInfo, useUserIdByAddress } from '@/lib/hooks/useContract';
import { formatBNB, formatCurrency, LEVEL_COSTS_USD } from '@/lib/contract';
import { useCurrency } from '@/lib/CurrencyContext';

export default function UpgradePage() {
    const { isConnected, address } = useAccount();
    const [selectedLevel, setSelectedLevel] = useState<number>(0);

    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    const { data: userInfo } = useUserInfo(userId);
    const { data: levelCosts } = useLevelCosts();
    const { data: config } = useContractConfig();
    const { upgrade, isPending, isConfirming, isSuccess, hash } = useUpgrade();
    const { formatFromUSD, selectedCurrency } = useCurrency();

    const currentLevel = userInfo ? Number((userInfo as any)[3]) : 0;
    
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
        <div className="space-y-8 pb-16 animate-in fade-in duration-700">
            {/* 1. Header Overview Banner - Blue Mesh Hero */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-green rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative glass-card glass-card-blue p-10 lg:p-14 overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 blur-[100px] -mr-48 -mt-48 animate-pulse"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="space-y-8">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                    <Zap className="w-7 h-7 text-brand-blue" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-sm font-black text-brand-blue uppercase tracking-[0.4em] italic leading-none">Protocol Expansion</span>
                                    <h2 className="text-2xl font-black text-foreground uppercase italic tracking-wider">Neural Scaling</h2>
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <div className="flex items-baseline gap-6 text-center md:text-left">
                                    <span className="text-7xl lg:text-9xl font-black text-brand-blue tracking-tighter italic text-glow-blue drop-shadow-2xl">
                                        Tier {currentLevel}
                                    </span>
                                    <span className="text-3xl lg:text-4xl font-black text-brand-blue uppercase tracking-tighter italic leading-none">Access</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white backdrop-blur-2xl rounded-[3rem] p-10 border border-brand-blue/20 text-center space-y-6 min-w-[320px] shadow-2xl group-hover:border-brand-blue/40 transition-colors">
                             <div className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] italic">Neural Authority Matrix</div>
                             <div className="flex items-center justify-center gap-4">
                                 <ShieldCheck className="w-10 h-10 text-brand-green animate-heartbeat" />
                                 <span className="text-4xl font-black text-foreground tracking-tighter italic drop-shadow-md">Verified Node</span>
                             </div>
                             <div className="flex gap-2 justify-center">
                                 <div className="w-2 h-2 bg-brand-green rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                 <span className="text-xs font-black text-brand-green uppercase tracking-widest italic">Node Sync: 100%</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 2. Tier Selector Panel - Blue/Amber Glass */}
                <div className="glass-card glass-card-blue p-10 space-y-10 border-brand-green/20  relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-brand-blue -mr-12 -mt-12 group-hover:scale-110 transition-transform">
                        <Layers className="w-48 h-48" />
                    </div>

                    <div className="flex items-center gap-5 relative z-10">
                        <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center justify-center shadow-inner">
                            <Layers className="w-6 h-6 text-brand-blue" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight uppercase italic">Target Layers</h2>
                    </div>

                    <div className="grid grid-cols-6 gap-3 relative z-10">
                        {Array.from({ length: 18 }, (_, i) => i + 1).map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                disabled={level <= currentLevel}
                                className={`
                                    h-16 rounded-2xl font-black text-sm transition-all border shadow-lg
                                    ${selectedLevel === level
                                        ? 'bg-brand-amber text-foreground  border-brand-amber shadow-brand-amber/30 scale-110 z-10 italic glow-amber'
                                        : level <= currentLevel
                                            ? 'bg-brand-green/10 border-brand-green/20 text-brand-green/40 cursor-not-allowed opacity-50'
                                            : 'bg-white border-brand-green/20  text-foreground  hover:border-brand-blue/40 hover:text-brand-blue hover:bg-brand-blue/5'
                                    }
                                `}
                            >
                                {level < 10 ? `0${level}` : level}
                                {level <= currentLevel && <div className="text-[8px] mt-1 font-black leading-none text-brand-green opacity-60">SYNC</div>}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white shadow-lg border border-brand-green/20    border border-brand-blue/10 rounded-[2.5rem] p-8 space-y-6 relative z-10 shadow-inner">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-2">
                                <span className="text-xs font-black text-foreground uppercase tracking-widest italic">Target Scaling:</span>
                                <span className="text-brand-amber font-black italic flex items-center gap-2">
                                    <ArrowUpCircle className="w-4 h-4" />
                                    Tier {selectedLevel}
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <span className="text-xs font-black text-foreground uppercase tracking-widest italic">Authorization Path:</span>
                                <span className="text-brand-blue font-black italic">{Math.max(0, selectedLevel - currentLevel)} Strategic Layers</span>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-brand-green/20 flex justify-between items-center px-2">
                            <span className="text-xs font-black text-foreground uppercase tracking-widest italic leading-none">Expansion Cost:</span>
                            <span className="text-3xl font-black text-brand-amber text-glow-amber tracking-tighter italic">
                                {formatFromUSD(exactUsdCost)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Authentication Panel - Amber Glass Pulse */}
                <div className="flex flex-col">
                <div className="glass-card glass-card-amber p-10 flex-1 relative overflow-hidden group border-brand-amber/20 shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 opacity-[0.03] text-brand-amber group-hover:rotate-12 group-hover:scale-125 transition-transform duration-1000">
                        <ArrowUpCircle className="w-64 h-64" />
                    </div>
                    
                    <div className="flex items-center gap-5 mb-10 relative z-10 pb-6 border-b border-brand-green/20 ">
                        <div className="w-12 h-12 bg-brand-amber/10 border border-brand-amber/20 rounded-2xl flex items-center justify-center shadow-inner">
                            <ShieldCheck className="w-6 h-6 text-brand-amber" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight uppercase italic leading-none">Authentication</h2>
                    </div>

                    {isSuccess ? (
                        <div className="bg-brand-green/10 border border-brand-green/20 rounded-[3rem] p-12 text-center animate-in zoom-in-95 shadow-2xl relative z-10">
                            <div className="w-24 h-24 bg-brand-green shadow-[0_0_40px_rgba(34,197,94,0.5)] rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-heartbeat">
                                <Check className="w-14 h-14 text-foreground"/>
                            </div>
                            <h3 className="text-3xl font-black text-brand-green mb-3 uppercase tracking-tight italic drop-shadow-md">Expansion Verified</h3>
                            <p className="text-sm font-bold text-brand-blue uppercase tracking-[0.25em] mb-10 italic">Your Node is now Synchronized at Tier {selectedLevel}</p>
                            {hash && (
                                <a
                                    href={`${(config as any)?.blockExplorers?.default?.url}/tx/${hash}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="px-10 py-4 bg-brand-green text-foreground rounded-full text-xs font-black uppercase tracking-[0.3em] hover:scale-110 active:scale-95 transition-all inline-block italic shadow-lg"
                                >
                                    View Protocol Ledger »
                                </a>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-10 relative z-10">
                            <div className="bg-white border border-brand-amber/10 rounded-[2.5rem] p-10 text-center space-y-4 shadow-inner group/cost hover:border-brand-amber/30 transition-colors">
                                <div className="text-6xl lg:text-7xl font-black text-brand-amber text-glow-amber tracking-tighter italic drop-shadow-2xl">
                                    {formatBNB(upgradeCost)} <span className="text-2xl text-brand-blue uppercase italic font-black ml-2 tracking-widest">BNB</span>
                                </div>
                                <div className="text-sm font-black text-brand-blue bg-white px-8 py-2.5 rounded-full uppercase tracking-widest inline-block border border-brand-green/20 shadow-sm italic leading-none group-hover:text-brand-amber transition-colors">
                                    Conversion Val: {formatFromUSD(exactUsdCost)}
                                </div>
                            </div>

                            <button
                                onClick={handleUpgrade}
                                disabled={!isConnected || selectedLevel <= currentLevel || isPending || isConfirming}
                                className="w-full relative overflow-hidden bg-brand-amber text-foreground py-8 rounded-[2.5rem] font-black tracking-[0.2em] text-base uppercase shadow-[0_20px_50px_-10px_rgba(245,158,11,0.5)] hover:shadow-[0_25px_60px_-10px_rgba(245,158,11,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center gap-4 group italic"
                            >
                                {isPending || isConfirming ? (
                                    <>
                                        <Loader2 className="animate-spin w-7 h-7" />
                                        Syncing Neural Matrix...
                                    </>
                                ) : (
                                    <>
                                        <ArrowUpCircle className="w-7 h-7 group-hover:animate-bounce" />
                                        Authorize Expansion »
                                    </>
                                )}
                            </button>

                             <div className="grid grid-cols-2 gap-4">                                 <div className="bg-brand-green/5 p-5 rounded-2xl flex items-center gap-4 border border-brand-green/10 shadow-sm hover:bg-brand-green/10 transition-colors group/item">
                                    <TrendingUp className="w-5 h-5 text-brand-green group-hover/item:scale-125 transition-transform" />
                                    <span className="text-xs font-black text-brand-green uppercase tracking-widest italic group-hover:text-brand-green transition-colors">Yield Boost Active</span>
                                </div>
                                <div className="bg-brand-blue/5 p-5 rounded-2xl flex items-center gap-4 border border-brand-blue/10 shadow-sm hover:bg-brand-blue/10 transition-colors group/item">
                                    <Network className="w-5 h-5 text-brand-blue group-hover/item:rotate-12 transition-transform" />
                                    <span className="text-xs font-black text-brand-blue uppercase tracking-widest italic group-hover:text-brand-blue transition-colors">Cluster Depth +</span>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>

            {/* 4. Directory Grid - systematic Layer Mapping */}
            <div className="glass-card p-10 lg:p-14 space-y-12 border-brand-green/20  relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-black  -mr-16 -mt-16 group-hover:scale-110 transition-transform">
                    <Network className="w-96 h-96" />
                </div>
                
                <div className="flex items-center gap-5 relative z-10 pb-8 border-b border-brand-green/20">
                    <div className="w-12 h-12 bg-white border border-brand-green/20 rounded-2xl flex items-center justify-center shadow-inner">
                        <Info className="w-6 h-6 text-brand-blue group-hover:text-brand-blue transition-colors" />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black text-foreground tracking-tight uppercase italic leading-none">Neural Hub Directory</h2>
                        <p className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] italic">Full Protocol Mapping</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 relative z-10">
                    {LEVEL_COSTS_USD.map((cost, index) => (
                        <div
                            key={index}
                            className={`rounded-[2rem] p-7 border transition-all duration-500 group/tier relative overflow-hidden h-full flex flex-col justify-between ${index < currentLevel
                                ? 'bg-brand-green/5 border-brand-green/30 shadow-inner'
                                : index < selectedLevel
                                    ? 'bg-brand-amber/5 border-brand-amber/40 shadow-2xl scale-110 z-10 animate-pulse'
                                    : 'bg-white border-brand-green/20  opacity-40 grayscale hover:opacity-100 hover:grayscale-0 hover:border-brand-blue/40 transition-all'
                                }`}
                        >
                            <div className="space-y-1">
                                <div className={`text-xs font-black uppercase tracking-[0.2em] italic mb-1 ${index < currentLevel ? 'text-brand-green' : index < selectedLevel ? 'text-brand-amber' : 'text-brand-blue'}`}>Layer {index + 1 < 10 ? `0${index + 1}` : index + 1}</div>
                                <div className={`text-2xl font-black italic leading-none ${index < currentLevel ? 'text-foreground' : index < selectedLevel ? 'text-brand-amber' : 'text-brand-blue'}`}>{formatFromUSD(cost)}</div>
                            </div>
                            
                            <div className="pt-6 space-y-4">
                                <div className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1 h-1 bg-brand-blue rounded-full"></span>
                                    {levelCosts ? formatBNB(levelCosts[index]) : '---'} <span className="font-sans opacity-40">BNB</span>
                                </div>
                                {index < currentLevel && (
                                    <div className="text-[9px] text-brand-green font-black uppercase tracking-widest bg-brand-green/10 w-fit px-3 py-1 rounded-full flex items-center gap-2 border border-brand-green/20 italic">
                                        <Check className="w-3.5 h-3.5" /> <span className="animate-pulse">Active</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}





