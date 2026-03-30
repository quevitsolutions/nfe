'use client';

import { useState, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { 
    Network, 
    Search, 
    ChevronDown, 
    ChevronRight, 
    UserPlus, 
    Target, 
    Layers, 
    ArrowUpRight, 
    ShieldCheck, 
    UserCircle2, 
    Cpu, 
    Activity ,
    Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMatrixUsers, useUserIdByAddress, useUserStats } from '@/lib/hooks/useContract';

function shortAddr(addr: string | undefined) {
    if (!addr || addr === '0x0000000000000000000000000000000000000000') return '—';
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
}

function safeNum(v: any): number {
    if (v === null || v === undefined) return 0;
    if (typeof v === 'bigint') return Number(v);
    if (typeof v === 'number') return v;
    try { return Number(v); } catch { return 0; }
}

function LayerSection({ 
    userId, 
    level, 
    myNodeId, 
    searchTerm 
}: { 
    userId: number; 
    level: number; 
    myNodeId: number;
    searchTerm: string;
}) {
    const [isExpanded, setIsExpanded] = useState(level === 0);
    const { data: rawNodes, isLoading } = useMatrixUsers(userId, level, 0, 100);

    const members = useMemo(() => {
        const arr = Array.isArray(rawNodes) ? rawNodes : [];
        return arr
            .map((m: any) => ({
                id:           safeNum(m.nodeId),
                wallet:       String(m.wallet ?? ''),
                sponsor:      safeNum(m.sponsor),
                tier:         safeNum(m.tier),
                joinedAt:     safeNum(m.joinedAt),
                isDirect:     safeNum(m.sponsor) === myNodeId,
                totalMatrixNodes: safeNum(m.totalMatrixNodes),
            }))
            .filter(m => m.id > 0 && m.id !== userId)
            .filter(m => 
                m.id.toString().includes(searchTerm) || 
                m.wallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                m.sponsor.toString().includes(searchTerm)
            );
    }, [rawNodes, userId, myNodeId, searchTerm]);

    if (!isLoading && members.length === 0 && searchTerm === '') return null;

    return (
        <div className="mb-6">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-full flex items-center justify-between p-6 transition-all relative overflow-hidden bg-white backdrop-blur-xl border border-brand-green/20  shadow-sm hover:shadow-md group ${
                    isExpanded ? 'rounded-t-[2.5rem] border-b-0' : 'rounded-[2.5rem]'
                }`}
            >
                <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isExpanded ? 'bg-brand-green text-foreground shadow-lg' : 'bg-white text-brand-blue'
                    }`}>
                        <Layers className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-xl font-black text-sharp-green tracking-tight leading-none mb-1 uppercase italic">Layer {level + 1}</h3>
                        <p className="text-sm font-black text-brand-blue uppercase tracking-widest italic">
                            {isLoading ? 'Syncing Protocol...' : `${members.length} Active Nodes`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {isExpanded ? <ChevronDown className="w-6 h-6 text-foreground"/> : <ChevronRight className="w-6 h-6 text-foreground"/>}
                </div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white backdrop-blur-md border-x border-b border-brand-green/20  rounded-b-[2.5rem] overflow-hidden"
                    >
                        <div className="p-4 space-y-3">
                            {isLoading ? (
                                <div className="p-8 text-center text-sm font-black uppercase tracking-widest text-brand-red animate-pulse italic">Analyzing Neural Path...</div>
                            ) : members.length === 0 ? (
                                <div className="p-8 text-center text-sm font-black uppercase tracking-widest text-brand-blue italic hover:text-sharp-blue transition-colors">No nodes in this layer</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4 px-2">
                                    {members.map(m => (
                                        <div key={m.id} className="bg-white border border-brand-green/20  p-5 rounded-[2rem] shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${m.isDirect ? 'bg-brand-green/10 text-brand-green' : 'bg-white text-brand-blue'}`}>
                                                    <UserCircle2 className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-black text-foreground tracking-tighter italic">Node #{m.id}</span>
                                                        {m.isDirect && <span className="text-xs font-black bg-brand-red text-white px-2 py-0.5 rounded-full uppercase tracking-widest italic shadow-sm">Direct</span>}
                                                    </div>
                                                    <p className="text-xs font-black text-brand-blue font-mono italic opacity-100">{shortAddr(m.wallet)}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-black text-brand-blue uppercase tracking-widest mb-1 italic">Layer Tier {m.tier}</div>
                                                <div className="flex items-center gap-1 justify-end text-sm font-black text-variable-amber bg-white px-3 py-1.5 rounded-full uppercase tracking-tighter border border-brand-green/10 group-hover:bg-brand-green group-hover:text-white transition-all shadow-sm italic">
                                                    <Network className="w-4 h-4" />
                                                    {m.totalMatrixNodes} Path Nodes
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function NodeTeamPage() {
    const { isConnected, address } = useAccount();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: myNodeIdData } = useUserIdByAddress(address);
    const myNodeIdNum = myNodeIdData ? Number(myNodeIdData) : 0;
    
    const { data: statsRaw } = useUserStats(myNodeIdNum);
    const stats = statsRaw as any;
    const totalMatrixNodes = stats ? safeNum(stats[5]) : 0;
    const totalReferrals = stats ? safeNum(stats[1]) : 0;

    if (!isConnected) return null;

    return (
        <div className="space-y-8 pb-12">
            {/* 1. Network Overview Banner */}
            <div className="relative overflow-hidden bg-white backdrop-blur-xl rounded-[2.5rem] border border-brand-green/20  shadow-2xl p-10 lg:p-12 mb-8 group">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 opacity-[0.05] text-brand-green group-hover:scale-110 transition-transform duration-700">
                    <Network className="w-64 h-64" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center">
                                <Network className="w-6 h-6 text-brand-green" />
                            </div>
                            <span className="text-base font-black text-brand-blue uppercase tracking-[0.2em] italic">Neural Ecosystem</span>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-baseline gap-4 text-center md:text-left">
                                <span className="text-6xl lg:text-8xl font-black text-variable-amber tracking-tighter italic">
                                    {totalMatrixNodes}
                                </span>
                                <span className="text-2xl lg:text-3xl font-black text-foreground uppercase tracking-tighter italic font-sans leading-none">Nodes</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <Activity className="w-4 h-4 text-brand-green animate-pulse" />
                                <p className="text-xs font-black text-brand-blue uppercase tracking-widest italic">Currently Synchronized in Neural Path</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-auto min-w-[280px]">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-brand-green/20  text-center space-y-3 relative overflow-hidden group shadow-sm backdrop-blur-xl">
                             <div className="absolute bottom-[-20%] left-[-10%] opacity-[0.05] text-brand-red">
                                <UserPlus className="w-32 h-32" />
                             </div>
                             <div className="text-xs font-black text-brand-blue uppercase tracking-widest italic">Direct Alliances</div>
                             <div className="text-5xl font-black text-brand-amber tracking-tighter italic">+{totalReferrals}</div>
                             <div className="text-xs font-black text-brand-red bg-white px-4 py-2 rounded-full uppercase tracking-widest italic shadow-sm border border-brand-red/20">Verified Sponsors</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Global Node Search */}
            <div className="relative group max-w-2xl">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search className="w-6 h-6 text-brand-blue group-focus-within:text-brand-green transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="SCAN NEURAL ID OR WALLET ADDRESS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-brand-green/20  rounded-[2.5rem] py-6 pl-16 pr-8 text-xs font-black text-foreground  placeholder:text-brand-blue uppercase tracking-[0.2em] shadow-xl group-focus-within:shadow-2xl group-focus-within:border-brand-green/30 outline-none transition-all"
                />
            </div>

            {/* 3. Neural Layer List */}
            <div className="pt-4">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-white border border-brand-green/20  rounded-2xl flex items-center justify-center shadow-sm backdrop-blur-xl">
                        <Eye className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                         <h2 className="text-2xl font-black text-brand-green tracking-tight uppercase leading-none italic">Neural Layer Scan</h2>
                         <p className="text-xs font-black text-foreground uppercase tracking-widest mt-1 italic">Analyzing 18 depths of node propagation</p>
                    </div>
                </div>

                <div className="space-y-2">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <LayerSection 
                            key={i} 
                            userId={myNodeIdNum} 
                            level={i} 
                            myNodeId={myNodeIdNum}
                            searchTerm={searchTerm} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}




