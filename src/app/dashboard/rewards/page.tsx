'use client';

import { useAccount } from 'wagmi';
import { 
    useUserIdByAddress, 
    useClaim, 
    useIncomeBreakdown, 
    usePoolViewHelper, 
    useUserInfo, 
    usePoolRequirements 
} from '@/lib/hooks/useContract';
import { formatBNB } from '@/lib/contract';
import { 
    Gift, 
    Wallet, 
    Award, 
    ArrowUpRight, 
    Ban, 
    TrendingUp, 
    Layers, 
    Network, 
    Activity, 
    Cpu,
    CheckCircle2,
    Lock,
    Sparkles,
    ChevronRight
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ManualSyncButton } from '@/components/ManualSyncButton';

export default function RewardsPage() {
    const { address, isConnected } = useAccount();
    const [isMounted, setIsMounted] = useState(false);

    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    const { data: poolView, refetch: refetchPoolView } = usePoolViewHelper(userId);
    const { data: userInfo, refetch: refetchUserInfo } = useUserInfo(userId);
    const { data: coreIncomeData, refetch: refetchCoreIncome } = useIncomeBreakdown(userId);
    const { data: poolReqs } = usePoolRequirements();

    const { claim, isPending: isClaimPending, isConfirming: isClaimConfirming, isSuccess: isClaimSuccess, error: claimError } = useClaim();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isClaimSuccess && userId > 0) {
            refetchPoolView();
            refetchUserInfo();
            refetchCoreIncome();
        }
    }, [isClaimSuccess, userId, refetchPoolView, refetchUserInfo, refetchCoreIncome]);

    if (!isMounted || !isConnected) return null;

    const currentPoolId = poolView ? Number(poolView[0]) : 0;
    const poolName = poolView ? String(poolView[1]) : 'None';
    const claimableBNB = poolView ? poolView[2] as bigint : BigInt(0);
    const lifetimeClaimed = poolView ? poolView[4] as bigint : BigInt(0);
    const capRemaining = poolView ? poolView[5] as bigint : BigInt(0);
    const lifetimeCap = poolView ? poolView[6] as bigint : BigInt(0);
    const totalDeposited = poolView ? poolView[7] as bigint : BigInt(0);
    const nfeLayer = poolView ? Number(poolView[8]) : 0;
    const isQualifiedForNext = poolView ? Boolean(poolView[9]) : false;
    const mq = poolView ? poolView[11] as bigint[] : undefined;

    const isCapReached = lifetimeClaimed >= lifetimeCap && lifetimeCap > BigInt(0);
    
    let missingRequirements = '';
    if (mq && mq.length === 3) {
        const parts = [];
        if (Number(mq[0]) > 0) parts.push(`${mq[0]} layers`);
        if (Number(mq[1]) > 0) parts.push(`${mq[1]} directs`);
        if (Number(mq[2]) > 0) parts.push(`${mq[2]} team`);
        missingRequirements = parts.join(', ');
    }

    const formatPrice = (val: bigint) => (Number(val) / 1e18).toFixed(4);

    return (
        <div className="space-y-8 pb-12">
            {/* 1. Main Reward Banner */}
            <div className={`relative overflow-hidden bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-10 lg:p-12 mb-8`}>
                <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-[0.03] text-[#e30613] rotate-12 transition-transform duration-700 hover:rotate-45">
                    <Gift className="w-80 h-80" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#e30613]/10 rounded-2xl flex items-center justify-center">
                                <Award className="w-6 h-6 text-[#e30613]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Active Status</span>
                                <span className="text-xl font-bold text-slate-800">{currentPoolId === 0 ? 'Awaiting Entry' : `${poolName} Pool Member`}</span>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            {currentPoolId === 0 ? (
                                <div className="space-y-4">
                                     <div className="text-4xl lg:text-5xl font-black text-slate-300 tracking-tighter uppercase">No Active Yield</div>
                                     {mq && Number(mq[0]) === 0 && Number(mq[1]) === 0 && Number(mq[2]) === 0 ? (
                                         <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] space-y-2 animate-in fade-in slide-in-from-bottom-4">
                                             <div className="text-2xl font-black text-[#e30613]">🎉 Qualified for Bronze!</div>
                                             <p className="text-xs font-bold text-[#e30613]/60 uppercase tracking-widest leading-relaxed">Your node has met all requirements.<br/>Click manual sync below if auto-registration is pending.</p>
                                             <div className="animate-bounce pt-2">
                                                 <ManualSyncButton nodeId={userId} />
                                             </div>
                                         </div>
                                     ) : (
                                         <p className="text-sm font-bold text-slate-400 uppercase tracking-widest max-w-[300px]">Unlock global distribution by qualifying for the Bronze Pool.</p>
                                     )}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-6xl lg:text-8xl font-black text-[#e30613] tracking-tighter">
                                            {formatBNB(claimableBNB)}
                                        </span>
                                        <span className="text-2xl lg:text-4xl font-black text-slate-200 uppercase tracking-tighter">BNB</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <button 
                                            onClick={() => claim()}
                                            disabled={isClaimPending || isClaimConfirming || Number(claimableBNB) === 0 || isCapReached}
                                            className={`px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center gap-3 ${
                                                Number(claimableBNB) > 0 && !isCapReached
                                                ? 'bg-[#e30613] text-white hover:scale-105 active:scale-95 shadow-[#e30613]/20'
                                                : 'bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed'
                                            }`}
                                        >
                                            <Gift className="w-5 h-5" />
                                            {isClaimPending || isClaimConfirming ? 'Securing...' : isCapReached ? 'Cap Reached' : 'Claim Yield »'}
                                        </button>
                                        
                                        {isQualifiedForNext && (
                                            <div className="bg-red-50 border border-red-100 p-4 rounded-[1.5rem] flex items-center gap-4 animate-in zoom-in-95">
                                                <Sparkles className="w-5 h-5 text-[#e30613]" />
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-[#e30613] uppercase tracking-widest leading-none mb-1">Level Up Qualified</span>
                                                    <ManualSyncButton nodeId={userId} isQualifiedForNext={true} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-auto min-w-[280px]">
                        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
                             <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Rewards Performance</div>
                             <div className="flex gap-4">
                                 <div className="flex flex-col items-center p-4 bg-white rounded-3xl shadow-sm min-w-[100px] border border-slate-100">
                                     <span className="text-xs font-black text-[#e30613] tracking-tighter">{formatBNB(lifetimeClaimed)}</span>
                                     <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Claimed</span>
                                 </div>
                                 <div className="flex flex-col items-center p-4 bg-white rounded-3xl shadow-sm min-w-[100px] border border-slate-100 text-[#e30613]">
                                      <span className="text-xs font-black tracking-tighter">{formatBNB(capRemaining)}</span>
                                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Remaining Scope</span>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Pool Status & Tiers (Vi Style Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {[
                    { id: 1, name: 'Bronze', color: 'slate', icon: Award, active: currentPoolId >= 1 },
                    { id: 2, name: 'Silver', color: 'slate', icon: Sparkles, active: currentPoolId >= 2 },
                    { id: 3, name: 'Gold', color: 'slate', icon: Award, active: currentPoolId >= 3 },
                ].map((pool) => (
                    <div key={pool.id} className={`relative overflow-hidden bg-white rounded-[3rem] p-10 border transition-all group ${
                        pool.id === currentPoolId 
                        ? 'border-[#e30613] shadow-[0_15px_40px_rgba(227,6,19,0.1)]' 
                        : 'border-slate-100 shadow-sm opacity-80'
                    }`}>
                        <div className={`absolute top-4 right-4 text-[#e30613]/5 group-hover:scale-125 transition-transform`}>
                            <pool.icon className="w-16 h-16" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border transition-all ${
                                pool.id <= currentPoolId 
                                ? 'bg-[#e30613] text-white border-[#e30613] shadow-lg shadow-[#e30613]/20 scale-111' 
                                : 'bg-slate-50 text-slate-200 border-slate-100'
                            }`}>
                                {pool.id <= currentPoolId ? <CheckCircle2 className="w-10 h-10" /> : <Lock className="w-10 h-10" />}
                            </div>
                            
                            <div>
                                <h4 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">{pool.name} Pool</h4>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${pool.id <= currentPoolId ? 'text-[#e30613]' : 'text-slate-400'}`}>
                                    {pool.id < currentPoolId ? 'Full Distribution Active' : pool.id === currentPoolId ? 'Primary Revenue Source' : 'Tier Locked'}
                                </p>
                            </div>

                            {pool.id > currentPoolId && (
                                <div className="w-full pt-4 space-y-3">
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-200 rounded-full w-1/3" />
                                    </div>
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Optimization in progress</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Global Stats */}
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Global Distributed</p>
                    <p className="text-2xl font-black text-slate-800 tracking-tighter">{formatBNB(totalDeposited)} <span className="text-xs">BNB</span></p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Target Nodes</p>
                    <p className="text-2xl font-black text-slate-800 tracking-tighter">8,192 <span className="text-xs">Capacity</span></p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Node Efficiency</p>
                    <p className="text-2xl font-black text-red-500 tracking-tighter">100.0% <span className="text-xs">Uptime</span></p>
                </div>
                <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Synchronizer</p>
                    <p className="text-2xl font-black text-[#e30613] tracking-tighter">PROACTIVE</p>
                </div>
            </div>
            
            {/* Error Handlers */}
            {claimError && (
                <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2rem] text-rose-500 font-bold text-xs uppercase tracking-widest flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Activity className="w-5 h-5" />
                        <span>Execution Rejected: {(claimError as any).shortMessage || claimError.message}</span>
                    </div>
                    <button onClick={() => window.location.reload()} className="hover:underline">Retry Connection</button>
                </div>
            )}

            {isClaimSuccess && (
                <div className="bg-red-50 border border-red-100 p-6 rounded-[2rem] text-[#e30613] font-black text-xs uppercase tracking-widest flex items-center gap-4 animate-in fade-in">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Protocol Yield Successfully Synchronized with Wallet Vault.</span>
                </div>
            )}
        </div>
    );
}
