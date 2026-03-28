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
    Link as LinkIcon
} from 'lucide-react';
import { 
    useUserInfo, 
    useIncomeBreakdown, 
    useContractConfig, 
    useUserIdByAddress, 
    useBnbPrice, 
    useContractUserInfo 
} from '@/lib/hooks/useContract';
import { formatBNB, formatCurrency } from '@/lib/contract';
import Link from 'next/link';
import { KeeperAdminPanel } from '@/components/KeeperAdminPanel';
import { ManualSyncButton } from '@/components/ManualSyncButton';

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
    const { data: currentBnbPrice } = useBnbPrice();

    const bnbPrice = currentBnbPrice ? Number(currentBnbPrice) / 1e8 : 600;

    const { data: walletBalance } = useBalance({
        address: address,
    });

    const totalIncomeBNB = incomeBreakdown
        ? Number(incomeBreakdown[0]) / 1e18
        : 0;
    const totalIncomeUSD = totalIncomeBNB * bnbPrice;

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
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b5e20] mb-4"></div>
                    <p className="text-slate-400 font-black tracking-widest uppercase text-[10px]">Initializing Node Assets...</p>
                </div>
            </div>
        );
    }

    if (!isConnected) return null;

    return (
        <div className="space-y-8 pb-12">
            {/* 1. Main Account Banner */}
            <div className="relative overflow-hidden bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-8 lg:p-12">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-[0.05] text-[#1b5e20] rotate-12 transition-transform duration-700 hover:rotate-45">
                    <Wallet className="w-80 h-80" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1b5e20]/10 rounded-2xl flex items-center justify-center">
                                <Wallet className="w-6 h-6 text-[#1b5e20]" />
                            </div>
                            <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Primary Vault</span>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-baseline gap-4">
                                <span className="text-6xl lg:text-8xl font-black text-[#1b5e20] tracking-tighter">
                                    {walletBalance ? formatBNB(walletBalance.value) : '0.00'}
                                </span>
                                <span className="text-2xl lg:text-4xl font-black text-slate-200 uppercase tracking-tighter">BNB</span>
                            </div>
                            <p className="text-xl lg:text-2xl font-bold text-slate-400">
                                ≈ {formatCurrency(walletBalance ? (Number(walletBalance.value) / 1e18) * bnbPrice : 0)} USD
                            </p>
                        </div>

                        <div className="pt-6 flex flex-wrap gap-4">
                            <div className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex items-center gap-4">
                                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                                <span className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none">
                                    {address ? `${address.slice(0, 10)}...${address.slice(-8)}` : 'Disconnected'}
                                </span>
                            </div>
                            <Link 
                                href="/dashboard/rewards"
                                className="px-8 py-3 bg-[#1b5e20] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(27,94,32,0.3)] hover:scale-105 active:scale-95 transition-all text-center"
                            >
                                Claim rewards »
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-auto min-w-[280px]">
                        <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 text-center space-y-3 relative overflow-hidden group">
                             <div className="absolute top-0 right-0 opacity-[0.03] -mr-4 -mt-4">
                                <Cpu className="w-24 h-24" />
                             </div>
                             <div className="text-sm font-black text-slate-400 uppercase tracking-widest relative z-10">Global Node Identity</div>
                             <div className="text-5xl font-black text-slate-800 tracking-tighter relative z-10">#{userId}</div>
                             <div className="text-[10px] font-bold text-[#1b5e20] bg-[#1b5e20]/5 px-4 py-1 rounded-full uppercase tracking-widest inline-block relative z-10">Active Tier {userInfo ? Number(userInfo[0]) : 1}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Focused Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Referral Expansion Card */}
                <div className="md:row-span-2 relative overflow-hidden bg-gradient-to-br from-[#1b5e20] to-[#2e7d32] rounded-[3.5rem] p-10 text-white flex flex-col shadow-[0_25px_60px_rgba(27,94,32,0.2)] group cursor-default">
                    <div className="absolute bottom-[-10%] right-[-10%] opacity-20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000 ease-out pointer-events-none">
                        <Users className="w-64 h-64" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col h-full space-y-6">
                        <div className="space-y-2">
                             <h3 className="text-4xl font-black tracking-tight leading-[1.1]">Grow Your<br/>Alliance</h3>
                             <p className="text-sm font-bold text-white/60 max-w-[220px]">Earn 10% instant direct rewards by expanding the node protocol.</p>
                        </div>
                        
                        <div className="mt-auto pt-10 space-y-6">
                            <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 space-y-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Your Global Access Link</p>
                                    <p className="text-xs font-mono font-bold truncate text-white/90">{referralLink}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={copyToClipboard}
                                        className="flex-1 py-4 bg-white text-[#1b5e20] rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-3"
                                    >
                                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                        {copied ? 'Link Copied' : 'Share Link'}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center px-2">
                                <button onClick={shareOnTwitter} className="w-12 h-12 bg-white/10 hover:bg-white hover:text-black rounded-2xl flex items-center justify-center transition-all">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                </button>
                                <button onClick={shareOnTelegram} className="w-12 h-12 bg-white/10 hover:bg-white hover:text-[#0088cc] rounded-2xl flex items-center justify-center transition-all">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.25-5.45 3.63-.51.35-.97.52-1.38.51-.45-.01-1.32-.26-1.97-.47-.79-.26-1.42-.4-1.36-.85.03-.23.35-.47.96-.71 3.76-1.63 6.27-2.71 7.53-3.23 3.58-1.48 4.32-1.74 4.81-1.75.11 0 .35.03.5.16.13.13.17.3.18.43z"></path></svg>
                                </button>
                                <button onClick={shareOnWhatsApp} className="w-12 h-12 bg-white/10 hover:bg-white hover:text-[#25D366] rounded-2xl flex items-center justify-center transition-all">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.048c0 2.12.54 4.192 1.561 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.635 0 12.046-5.411 12.049-12.047a11.806 11.806 0 00-3.486-8.451z"></path></svg>
                                </button>
                                <div className="text-[10px] uppercase tracking-widest font-black text-white/40">Spread the net</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-Services Grid */}
                <Link href="/dashboard/income" className="relative overflow-hidden bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group flex flex-col items-center text-center">
                    <div className="absolute bottom-4 right-4 text-[#1b5e20]/10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                        <TrendingUp className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 w-full">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#1b5e20]/5 transition-colors">
                            <TrendingUp className="w-10 h-10 text-[#1b5e20]" />
                        </div>
                        <h4 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">Income</h4>
                        <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">History Ledger</p>
                        <div className="text-4xl font-black text-[#1b5e20] tracking-tighter mb-1">
                            {totalIncomeBNB.toFixed(4)} <span className="text-sm">BNB</span>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">≈ {formatCurrency(totalIncomeUSD)}</p>
                    </div>
                </Link>

                <Link href="/dashboard/matrix-tree" className="relative overflow-hidden bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group flex flex-col items-center text-center">
                    <div className="absolute bottom-4 right-4 text-[#1b5e20]/10 group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500">
                        <Network className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 w-full">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#1b5e20]/5 transition-colors">
                            <Network className="w-10 h-10 text-[#1b5e20]" />
                        </div>
                        <h4 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">Matrix</h4>
                        <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">Placement Team</p>
                        <div className="text-4xl font-black text-[#1b5e20] tracking-tighter">
                            {userInfo ? Number(userInfo[5]) : 0}
                        </div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-3">Active Sync Nodes</p>
                    </div>
                </Link>

                {/* Smaller Utility Grid Cards */}
                <Link href="/dashboard/rewards" className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group">
                    <div className="absolute top-4 right-4 text-[#1b5e20]/5 group-hover:rotate-12 transition-transform">
                        <Gift className="w-16 h-16" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-[#1b5e20]/5 transition-colors text-[#1b5e20]">
                            <Gift className="w-7 h-7" />
                        </div>
                        <div>
                             <h4 className="text-xl font-black text-slate-800 tracking-tight">Reward Pools</h4>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Distribution</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/upgrade" className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group">
                    <div className="absolute top-4 right-4 text-[#1b5e20]/5 group-hover:rotate-12 transition-transform">
                        <ArrowUpCircle className="w-16 h-16" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-[#1b5e20]/5 transition-colors text-[#1b5e20]">
                            <ArrowUpCircle className="w-7 h-7" />
                        </div>
                        <div>
                             <h4 className="text-xl font-black text-slate-800 tracking-tight">Upgrade Node</h4>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Evolution</p>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/team" className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all group">
                    <div className="absolute top-4 right-4 text-[#1b5e20]/5 group-hover:rotate-12 transition-transform">
                        <Users className="w-16 h-16" />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center group-hover:bg-[#1b5e20]/5 transition-colors text-[#1b5e20]">
                            <Users className="w-7 h-7" />
                        </div>
                        <div>
                             <h4 className="text-xl font-black text-slate-800 tracking-tight">Network</h4>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partners: {userInfo ? Number(userInfo[1]) : 0}</p>
                        </div>
                    </div>
                </Link>

            </div>

            {/* Keeper Admin Section */}
            <div className="pt-8">
                 <div className="bg-slate-50 rounded-[3rem] p-6 border border-slate-100">
                    <KeeperAdminPanel />
                 </div>
            </div>

            {/* Hidden Utilities */}
            <div className="hidden">
                 <ManualSyncButton nodeId={userId} />
            </div>
        </div>
    );
}
