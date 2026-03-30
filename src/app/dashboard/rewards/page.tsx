'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
    Gift, 
    TrendingUp, 
    Activity, 
    ArrowUpCircle,
    Copy,
    Check,
    Wallet
} from 'lucide-react';
import { 
    useUserInfo, 
    useUserIdByAddress, 
    usePoolViewHelper,
    useClaim
} from '@/lib/hooks/useContract';
import { formatBNB } from '@/lib/contract';
import { useCurrency } from '@/lib/CurrencyContext';

export default function RewardsPage() {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    const { data: poolView, refetch: refetchPoolView } = usePoolViewHelper(userId);
    const { data: userInfo, refetch: refetchUserInfo } = useUserInfo(userId);
    const { claim, isPending: isClaimPending, isConfirming: isClaimConfirming, isSuccess: isClaimSuccess } = useClaim();
    const { formatConverted, selectedCurrency } = useCurrency();

    useEffect(() => {
        setIsMounted(true);
        if (!isConnected && isMounted) {
            router.push('/');
        }
    }, [isConnected, isMounted, router]);

    useEffect(() => {
        if (isClaimSuccess && userId > 0) {
            refetchPoolView();
            refetchUserInfo();
        }
    }, [isClaimSuccess, userId, refetchPoolView, refetchUserInfo]);

    if (!isMounted || !isConnected) return null;

    const currentPoolId = poolView ? Number((poolView as any)[0]) || 0 : 0;
    const poolName = poolView ? String((poolView as any)[1]) : 'None';
    const claimableBNB = poolView ? (poolView as any)[2] as bigint : BigInt(0);
    const lifetimeClaimed = poolView ? (poolView as any)[4] as bigint : BigInt(0);
    const capRemaining = poolView ? (poolView as any)[5] as bigint : BigInt(0);
    const lifetimeCap = poolView ? (poolView as any)[6] as bigint : BigInt(0);
    const totalDeposited = poolView ? (poolView as any)[7] as bigint : BigInt(0);
    const nfeLayer = poolView ? Number((poolView as any)[8]) || 0 : 0;
    const isQualifiedForNext = poolView ? Boolean((poolView as any)[9]) : false;
    const mq = poolView ? (poolView as any)[11] as bigint[] : undefined;

    const isCapReached = lifetimeClaimed >= lifetimeCap && lifetimeCap > BigInt(0);
    
    let missingRequirements = '';
    if (mq && mq.length === 3) {
        const parts = [];
        if (Number(mq[0]) > 0) parts.push(`${mq[0]} layers`);
        if (Number(mq[1]) > 0) parts.push(`${mq[1]} directs`);
        if (Number(mq[2]) > 0) parts.push(`${mq[2]} team`);
        missingRequirements = parts.join(', ');
    }

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-1000">
            {/* ─── 1. Header ─── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-amber/10 border border-brand-amber/20 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            <Gift className="w-6 h-6 text-brand-amber" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter uppercase italic leading-none">Pool Rewards</h1>
                    </div>
                    <p className="text-sm font-black text-brand-blue uppercase tracking-[0.4em] ml-1 italic opacity-100">Authorized Incentive Protocols</p>
                </div>
                
                <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-4 rounded-3xl border border-brand-green/20 shadow-xl">
                    <div className="text-right">
                        <p className="text-xs font-black text-brand-blue uppercase tracking-widest leading-none mb-1 italic opacity-100">Neural Status</p>
                        <p className="text-sm font-black text-foreground tracking-tight uppercase italic">{poolName} Synchronized</p>
                    </div>
                    <div className="w-10 h-10 bg-brand-green/10 rounded-xl flex items-center justify-center border border-brand-green/20">
                        <Activity className="w-5 h-5 text-brand-green animate-pulse" />
                    </div>
                </div>
            </div>

            {/* ─── 2. Main Reward Matrix ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Primary Reward Display */}
                <div className="lg:col-span-8 glass-card glass-card-amber p-8 md:p-12 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-5 text-brand-amber group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000">
                        <TrendingUp className="w-96 h-96" />
                    </div>

                    <div className="relative z-10 space-y-10">
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-foreground uppercase tracking-widest italic flex items-center gap-3">
                                Claimable Yield
                                <span className="w-2 h-2 bg-brand-green rounded-full animate-ping"></span>
                            </h3>
                            <div className="flex items-baseline gap-4">
                                <span className="text-7xl md:text-9xl font-black text-brand-amber tracking-tighter text-glow-amber italic leading-none">
                                    {Number(claimableBNB) / 1e18 > 0 ? (Number(claimableBNB) / 1e18).toFixed(4) : '0.000'}
                                </span>
                                <span className="text-2xl md:text-3xl font-black text-brand-blue uppercase tracking-widest italic">BNB</span>
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <div className="px-6 py-3 bg-white border border-brand-green/20 rounded-2xl shadow-lg">
                                    <p className="text-2xl font-black text-foreground italic leading-none">
                                        ≈ <span className="text-brand-green">{formatConverted(Number(claimableBNB) / 1e18)}</span> <span className="text-xs uppercase font-black text-brand-blue tracking-widest ml-1">{selectedCurrency.code}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            <button 
                                onClick={() => claim(userId)}
                                disabled={isClaimPending || isClaimConfirming || claimableBNB === BigInt(0) || isCapReached}
                                className={`px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.3em] italic transition-all active:scale-95 flex items-center gap-4 shadow-2xl ${
                                    claimableBNB > BigInt(0) && !isCapReached
                                    ? 'bg-brand-amber text-white hover:scale-[1.05] hover:shadow-amber-500/50 cursor-pointer' 
                                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-300'
                                }`}
                            >
                                {isClaimPending || isClaimConfirming ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </div>
                                ) : isCapReached ? (
                                    'LIFETIME CAP REACHED'
                                ) : (
                                    <>
                                        <ArrowUpCircle className="w-6 h-6" />
                                        Authorize Claim
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lifetime Stats Matrix */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-card glass-card-blue p-8 border border-brand-blue/20 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-brand-blue group-hover:scale-110 transition-transform">
                            <Activity className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <p className="text-xs font-black text-brand-blue uppercase tracking-widest italic">Lifetime Authorized</p>
                            <div className="space-y-1">
                                <h4 className="text-4xl font-black text-foreground tracking-tighter italic leading-none">{formatBNB(lifetimeClaimed)} <span className="text-xs uppercase text-brand-blue">BNB</span></h4>
                                <p className="text-sm font-black text-brand-green italic">≈ {formatConverted(Number(lifetimeClaimed) / 1e18)}</p>
                            </div>
                            <div className="pt-4 border-t border-brand-blue/10">
                                <p className="text-xs font-black text-brand-blue uppercase tracking-widest mb-3 italic">Capacity Index</p>
                                <div className="h-2 bg-white rounded-full overflow-hidden p-[1px] border border-brand-blue/20">
                                    <div 
                                        className="h-full bg-brand-blue rounded-full transition-all duration-1000"
                                        style={{ width: `${lifetimeCap > BigInt(0) ? Number((lifetimeClaimed * 100n) / lifetimeCap) : 0}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs font-black text-foreground uppercase tracking-tighter">
                                    <span>0%</span>
                                    <span>{lifetimeCap > BigInt(0) ? Number((lifetimeClaimed * 100n) / lifetimeCap) : 0}% Used</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card glass-card-green p-8 border border-brand-green/20 shadow-xl relative overflow-hidden group">
                        <div className="relative z-10 space-y-2">
                            <p className="text-xs font-black text-brand-blue uppercase tracking-widest italic">Remaining Yield Cap</p>
                            <h4 className="text-3xl font-black text-brand-green tracking-tighter italic leading-none">{formatBNB(capRemaining)} <span className="text-xs uppercase text-brand-blue">BNB</span></h4>
                            <p className="text-xs font-black text-brand-blue uppercase tracking-widest italic pt-2">Max Capacity: {formatBNB(lifetimeCap)} BNB</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── 3. Global Synchronicity Status ─── */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1200">
                <div className="glass-card glass-card-blue p-8 md:p-12 border border-brand-green/20 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-brand-blue group-hover:scale-105 transition-transform">
                        <Network className="w-64 h-64" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 pb-6 border-b border-brand-green/10">
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black text-foreground uppercase italic tracking-tight leading-none">Pool Synchronization</h3>
                                <p className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] italic">Current Cluster: {poolName}</p>
                            </div>
                            
                            {isQualifiedForNext ? (
                                <div className="flex items-center gap-3 py-3 px-6 bg-brand-green/10 border border-brand-green/20 rounded-2xl">
                                    <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                                    <span className="text-xs font-black text-brand-green uppercase tracking-widest italic">Ready for Next Tier Upgrade</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-end gap-2 text-right">
                                    <div className="flex items-center gap-3 py-3 px-6 bg-brand-amber/10 border border-brand-amber/20 rounded-2xl">
                                        <Activity className="w-4 h-4 text-brand-amber" />
                                        <span className="text-xs font-black text-brand-amber uppercase tracking-widest italic">Next Level Locked</span>
                                    </div>
                                    {missingRequirements && (
                                        <p className="text-xs font-black text-sharp-red uppercase tracking-widest italic">Needs: {missingRequirements}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Min Tier Required', value: `Level ${nfeLayer}`, icon: ArrowUpCircle, color: 'text-brand-blue' },
                                { label: 'Active Total Deposit', value: `${formatBNB(totalDeposited)} BNB`, icon: Wallet, color: 'text-brand-green' },
                                { label: 'Synchronization Key', value: poolName.toUpperCase(), icon: Cpu, color: 'text-brand-amber' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/50 border border-brand-green/10 p-6 rounded-[2rem] hover:border-brand-green/30 transition-all group/stat">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 ${stat.color} shadow-inner group-hover/stat:scale-110 transition-transform`}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                        <p className="text-xs font-black text-brand-blue uppercase tracking-widest italic">{stat.label}</p>
                                    </div>
                                    <p className="text-2xl font-black text-foreground uppercase italic tracking-tight">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Network(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="16" y="16" width="6" height="6" rx="1" />
            <rect x="2" y="16" width="6" height="6" rx="1" />
            <rect x="9" y="2" width="6" height="6" rx="1" />
            <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
            <path d="M12 12V8" />
        </svg>
    )
}

function Cpu(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
            <path d="M15 2v2" />
            <path d="M15 20v2" />
            <path d="M2 15h2" />
            <path d="M2 9h2" />
            <path d="M20 15h2" />
            <path d="M20 9h2" />
            <path d="M9 2v2" />
            <path d="M9 20v2" />
        </svg>
    )
}
