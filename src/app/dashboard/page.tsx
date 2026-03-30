'use client';

import { useAccount, useBalance } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
    TrendingUp, 
    Users, 
    Wallet, 
    ArrowUpCircle, 
    Copy, 
    Check, 
    Network, 
    Gift, 
    Activity, 
    Cpu,
    Terminal,
    Check as CheckIcon
} from 'lucide-react';
import { 
    useUserInfo, 
    useIncomeBreakdown, 
    useContractConfig, 
    useUserIdByAddress, 
    useBnbPrice, 
    useContractUserInfo 
} from '@/lib/hooks/useContract';
import { formatBNB } from '@/lib/contract';
import Link from 'next/link';
import { KeeperAdminPanel } from '@/components/KeeperAdminPanel';
import { ManualSyncButton } from '@/components/ManualSyncButton';
import { useCurrency } from '@/lib/CurrencyContext';

const safeNum = (val: any): number => {
    if (val === undefined || val === null) return 0;
    const n = Number(val);
    return isNaN(n) ? 0 : n;
};

export default function DashboardPage() {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    const { data: config } = useContractConfig();
    const { data: userInfo } = useUserInfo(userId);
    const { data: incomeBreakdown } = useIncomeBreakdown(userId);

    const { data: walletBalance } = useBalance({
        address: address,
    });

    const { formatConverted, selectedCurrency } = useCurrency();

    const totalIncomeBNB = incomeBreakdown
        ? safeNum((incomeBreakdown as any)[0]) / 1e18
        : 0;

    const referralLink = typeof window !== 'undefined'
        ? `${window.location.origin}/register?ref=${userId}`
        : '';

    const copyToClipboard = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = referralLink;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const shareOnTwitter = () => {
        const text = 'Join AIPCore and start technical decentralized growth!';
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`, '_blank');
    };

    const shareOnTelegram = () => {
        const text = 'Join AIPCore and start technical decentralized growth!';
        window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        const text = `Join AIPCore and start technical decentralized growth! ${referralLink}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (!isConnected) {
                router.push('/');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [isConnected, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mb-4"></div>
                    <p className="text-foreground font-black tracking-widest uppercase text-xs">Initializing Neural Nodes...</p>
                </div>
            </div>
        );
    }

    if (!isConnected) return null;

    return (
        <div className="space-y-6 pb-24">
            {/* ─── 1. Neural Authority Header (Hero) ─── */}
            <div className="relative group animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-green to-brand-amber rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative glass-card glass-card-blue overflow-hidden p-8 lg:p-12">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 blur-[100px] -mr-48 -mt-48 animate-pulse"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
                        <div className="space-y-8 flex-1">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center justify-center shadow-inner">
                                    <Wallet className="w-7 h-7 text-brand-blue" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-sm font-black text-brand-blue uppercase tracking-[0.3em] leading-none italic">Primary Neural Vault</h2>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                                        <span className="text-xs font-bold text-foreground uppercase tracking-widest">Protocol v4.1 Active</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-7xl lg:text-9xl font-black text-brand-amber tracking-tighter italic">
                                        {walletBalance ? formatBNB(walletBalance.value) : '0.00'}<span className="text-3xl lg:text-4xl text-brand-blue ml-2 font-black">BNB</span>
                                    </span>
                                </div>
                                <p className="text-2xl lg:text-4xl font-black italic flex items-center gap-4">
                                    <span className="text-foreground text-3xl font-light">≈</span>
                                    <span className="text-brand-green">{formatConverted(walletBalance ? safeNum(walletBalance.value) / 1e18 : 0)}</span>
                                    <span className="text-sm text-brand-blue uppercase tracking-[0.3em] font-black leading-none">{selectedCurrency.code}</span>
                                </p>
                            </div>

                            <div className="pt-4 flex flex-wrap gap-4">
                                <div className="px-6 py-4 bg-white shadow-lg border border-brand-green/20 rounded-2xl flex items-center gap-4 hover:border-brand-blue/30 transition-colors cursor-default group/addr">
                                    <Activity className="w-4 h-4 text-brand-blue group-hover/addr:animate-ping" />
                                    <span className="text-xs font-mono font-bold text-foreground tracking-wider">
                                        {address ? `${address.slice(0, 14)}...${address.slice(-12)}` : 'Disconnected'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-[400px] space-y-4">
                            <div className="glass-card glass-card-amber p-8 relative overflow-hidden group border-brand-amber/30 h-full flex flex-col justify-between">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                                    <Cpu className="w-40 h-40 text-brand-amber" />
                                </div>
                                
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <p className="text-xs font-black text-brand-blue uppercase tracking-widest leading-none mb-2">Neural Authority</p>
                                            <h3 className="text-6xl font-black text-brand-amber tracking-tighter italic">#{userId}</h3>
                                        </div>
                                        <div className="px-4 py-1.5 bg-brand-amber text-white shadow-lg rounded-full text-xs font-black uppercase tracking-widest italic leading-none pt-2">
                                            Tier {userInfo ? safeNum((userInfo as any)[3]) : 1}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-foreground">
                                            <span className="italic">Evolution Scale</span>
                                            <span className="text-brand-amber italic">{Math.round((userInfo ? safeNum((userInfo as any)[3]) : 1) / 18 * 100)}%</span>
                                        </div>
                                        <div className="h-3 bg-white shadow-inner border border-brand-green/20 rounded-full overflow-hidden p-[2px]">
                                            <div 
                                                className="h-full bg-gradient-to-r from-brand-blue via-brand-green to-brand-amber rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(userInfo ? safeNum((userInfo as any)[3]) : 1) / 18 * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <Link 
                                        href="/dashboard/upgrade"
                                        className="w-full py-6 bg-brand-amber text-white rounded-2xl font-black text-sm uppercase tracking-[0.25em] shadow-[0_10px_25px_-5px_rgba(245,158,11,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(245,158,11,0.7)] hover:scale-[1.03] active:scale-95 transition-all text-center flex items-center justify-center gap-4 italic group mt-2"
                                    >
                                        <ArrowUpCircle className="w-6 h-6 group-hover:animate-bounce" />
                                        Focus Upgrade »
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── 2. Systematic Grid Action Items ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                
                {/* Referral Expansion - Wide Card */}
                <div className="lg:col-span-8 glass-card glass-card-amber overflow-hidden p-8 lg:p-12 group animate-in fade-in slide-in-from-left-4 duration-1200">
                    <div className="absolute top-0 right-0 -mt-16 -mr-16 opacity-5 text-brand-amber group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000">
                        <Users className="w-[500px] h-[500px]" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 h-full">
                        <div className="space-y-6 text-center md:text-left flex-1">
                            <h3 className="text-5xl lg:text-7xl font-black tracking-tight uppercase italic leading-[0.85]">
                                Growth<br/><span className="text-brand-amber text-glow-amber">Alliance</span>
                            </h3>
                            <p className="text-base font-black text-foreground uppercase tracking-tighter max-w-sm leading-relaxed">
                                Expand your neural network cluster and earn 10% instant direct rewards by authorized node pairing.
                            </p>
                        </div>

                        <div className="w-full lg:w-96 space-y-6">
                            <div className="bg-white backdrop-blur-2xl rounded-[2.5rem] p-8 border border-brand-amber/10 space-y-6 shadow-2xl">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-blue italic">Global Sync Link</p>
                                        <span className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-brand-green rounded-full animate-ping"></span>
                                            <span className="text-xs font-black text-brand-green uppercase tracking-widest">Active</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center px-5 py-5 bg-white shadow-lg border border-brand-green/20 rounded-2xl group/link">
                                        <p className="text-xs font-mono font-bold truncate text-brand-amber flex-1 tracking-wider">{referralLink}</p>
                                        <button onClick={copyToClipboard} className="text-brand-amber hover:text-foreground transition-all hover:scale-110 ml-4 active:scale-90">
                                            {copied ? <CheckIcon className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4 pt-2">
                                    <div className="flex gap-3">
                                        {[shareOnTwitter, shareOnTelegram, shareOnWhatsApp].map((fn, i) => (
                                            <button key={i} onClick={fn} className="w-12 h-12 bg-white hover:bg-brand-amber/10 rounded-2xl flex items-center justify-center border border-brand-green/20 hover:border-brand-amber/30 transition-all active:scale-90 group/share">
                                                {i === 0 && <svg className="w-5 h-5 fill-brand-blue group-hover/share:fill-brand-amber" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>}
                                                {i === 1 && <svg className="w-5 h-5 fill-brand-blue group-hover/share:fill-brand-amber" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.25-5.45 3.63-.51.35-.97.52-1.38.51-.45-.01-1.32-.26-1.97-.47-.79-.26-1.42-.4-1.36-.85.03-.23.35-.47.96-.71 3.76-1.63 6.27-2.71 7.53-3.23 3.58-1.48 4.32-1.74 4.81-1.75.11 0 .35.03.5.16.13.13.17.3.18.43z"></path></svg>}
                                                {i === 2 && <svg className="w-5 h-5 fill-brand-blue group-hover/share:fill-brand-amber" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.048c0 2.12.54 4.192 1.561 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.046-5.411 12.049-12.047a11.806 11.806 0 00-3.486-8.451z"></path></svg>}
                                        </button>
                                        ))}
                                    </div>
                                    <p className="text-xs font-black text-brand-blue uppercase tracking-[0.2em] leading-none italic">Neural Cluster Broadcast</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Net Earnings - Tall Card */}
                <Link href="/dashboard/income" className="lg:col-span-4 glass-card glass-card-green p-8 lg:p-10 flex flex-col group h-full transition-all animate-in fade-in slide-in-from-right-4 duration-1200">
                    <div className="flex-1 flex flex-col justify-between">
                         <div className="flex justify-between items-start">
                            <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center border border-brand-green/20 group-hover:bg-brand-green/20 group-hover:scale-110 transition-all shadow-inner">
                                <TrendingUp className="w-8 h-8 text-brand-green" />
                            </div>
                            <Activity className="w-6 h-6 text-brand-green animate-pulse" />
                         </div>
                         <div className="space-y-6 pt-16">
                             <div className="space-y-1">
                                <h4 className="text-4xl font-black text-foreground tracking-tighter uppercase italic leading-none">Net Earned</h4>
                                <p className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] mt-1 italic">Authorized Yield</p>
                             </div>
                             <div className="space-y-3">
                                <div className="text-5xl font-black text-brand-green tracking-tighter italic leading-none">
                                    {totalIncomeBNB.toFixed(4)} <span className="text-sm text-brand-blue font-black tracking-widest">BNB</span>
                                </div>
                                <div className="px-5 py-3 bg-white border border-brand-green/20 rounded-2xl inline-block group-hover:border-brand-green/20 transition-all">
                                    <p className="text-lg font-black text-foreground italic leading-none">
                                        ≈ <span className="text-brand-green">{formatConverted(totalIncomeBNB)}</span> <span className="text-xs uppercase font-black text-brand-blue tracking-widest ml-1">{selectedCurrency.code}</span>
                                    </p>
                                </div>
                             </div>
                         </div>
                    </div>
                </Link>

                {/* ─── 3. Systematic Metric Matrix ─── */}
                <Link href="/dashboard/matrix-tree" className="lg:col-span-4 glass-card glass-card-blue p-8 lg:p-10 group animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start">
                             <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center border border-brand-blue/20 group-hover:scale-110 transition-all">
                                <Network className="w-8 h-8 text-brand-blue" />
                             </div>
                             <span className="text-xs font-black text-brand-blue bg-brand-blue/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-brand-blue/20 italic">Live Sync</span>
                        </div>
                        <div className="space-y-4 pt-12">
                             <div>
                                <h4 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight uppercase italic drop-shadow-md">Node Matrix</h4>
                                <p className="text-xs font-bold text-brand-blue uppercase tracking-widest italic">Placement Cluster</p>
                             </div>
                             <div className="text-6xl font-black text-brand-blue text-glow-blue tracking-tighter italic leading-none">
                                {userInfo ? safeNum((userInfo as any)[5]) : 0}
                             </div>
                             <p className="text-xs font-black text-brand-blue bg-white border border-brand-green/20 py-2 px-4 rounded-xl uppercase tracking-[0.2em] inline-block italic">Authorized Nodes</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/team" className="lg:col-span-4 glass-card glass-card-green p-8 lg:p-10 group animate-in fade-in slide-in-from-bottom-4 duration-1200">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start">
                             <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center border border-brand-green/20 group-hover:scale-110 transition-all">
                                <Users className="w-8 h-8 text-brand-green" />
                             </div>
                             <span className="text-xs font-black text-brand-green bg-brand-green/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-brand-green/20 italic">Active Alliance</span>
                        </div>
                        <div className="space-y-4 pt-12">
                             <div>
                                <h4 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight uppercase italic drop-shadow-md">Team Network</h4>
                                <p className="text-xs font-bold text-brand-green uppercase tracking-widest italic">Partner Scaling</p>
                             </div>
                             <div className="text-6xl font-black text-brand-green text-glow-green tracking-tighter italic leading-none">
                                {userInfo ? safeNum((userInfo as any)[1]) : 0}
                             </div>
                             <p className="text-xs font-black text-brand-green bg-white border border-brand-green/20 py-2 px-4 rounded-xl uppercase tracking-[0.2em] inline-block italic">Direct Alliance</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/rewards" className="lg:col-span-4 glass-card glass-card-amber p-8 lg:p-10 group animate-in fade-in slide-in-from-bottom-4 duration-1400">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start">
                             <div className="w-16 h-16 bg-brand-amber/10 rounded-2xl flex items-center justify-center border border-brand-amber/20 group-hover:scale-110 transition-all">
                                <Gift className="w-8 h-8 text-brand-amber" />
                             </div>
                             <Activity className="w-5 h-5 text-brand-amber animate-pulse" />
                        </div>
                        <div className="space-y-6 pt-12">
                             <div className="space-y-1">
                                <h4 className="text-2xl lg:text-3xl font-black text-foreground tracking-tight uppercase italic drop-shadow-md">Pool Systems</h4>
                                <p className="text-xs font-bold text-brand-amber uppercase tracking-widest italic">Incentive Mapping</p>
                             </div>
                             <div className="text-4xl lg:text-5xl font-black text-brand-amber text-glow-amber tracking-tighter italic leading-none">
                                Global Sync
                             </div>
                             <div className="flex items-center gap-3 py-2 px-4 bg-brand-amber/5 border border-brand-amber/10 rounded-xl w-fit">
                                <div className="w-2 h-2 bg-brand-amber rounded-full animate-ping shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                                <span className="text-xs font-black text-brand-amber uppercase tracking-[0.25em] italic leading-none pt-1">Collecting Data</span>
                             </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* ─── 4. Advanced Protocol Modules ─── */}
            <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1500">
                <div className="glass-card glass-card-blue p-8 lg:p-12 relative overflow-hidden group border-brand-green/20 shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-brand-blue group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-1000">
                        <Cpu className="w-64 h-64" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-brand-green/20">
                            <div className="w-14 h-14 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center justify-center shadow-inner">
                                <Terminal className="w-6 h-6 text-brand-blue" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-foreground uppercase italic tracking-tight leading-none">Keeper Protocol Module</h3>
                                <p className="text-xs font-black text-brand-blue uppercase tracking-[0.3em] italic">System Level Authorization</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-[2rem] p-4 lg:p-8 border border-brand-green/20">
                            <KeeperAdminPanel />
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Utils */}
            <div className="hidden">
                 <ManualSyncButton nodeId={userId} />
            </div>
        </div>
    );
}
