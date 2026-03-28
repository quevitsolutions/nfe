'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ChevronRight, ChevronDown, User, Search, Loader2, GitBranch, Layers, Info, Maximize2, Minimize2, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTeamUsers, useUserIdByAddress, useUserStats } from '@/lib/hooks/useContract';

// ─── Helpers ────────────────────────────────────────────────────────────────

function shortAddr(addr: string | undefined) {
    if (!addr || addr === '0x0000000000000000000000000000000000000000') return '—';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function safeNum(v: any): number {
    if (v === null || v === undefined) return 0;
    if (typeof v === 'bigint') return Number(v);
    if (typeof v === 'number') return v;
    try { return Number(v); } catch { return 0; }
}

function parseNode(member: any) {
    return {
        nodeId:          safeNum(member.nodeId),
        wallet:          String(member.wallet ?? ''),
        tier:            safeNum(member.tier),
        directNodes:     safeNum(member.directNodes),
        totalMatrixNodes: safeNum(member.totalMatrixNodes),
    };
}

function isValidNode(n: ReturnType<typeof parseNode>, parentId: number) {
    return (
        n.nodeId > 0 &&
        n.nodeId !== parentId &&
        n.wallet.toLowerCase() !== '0x0000000000000000000000000000000000000000'
    );
}

function parseChildren(raw: unknown, parentId: number) {
    const arr = raw && Array.isArray(raw) ? raw : [];
    return arr.map(parseNode).filter(n => isValidNode(n, parentId));
}

// ─── Components ─────────────────────────────────────────────────────────────

function TreeNode({
    userId,
    address,
    tier,
    directNodes,
    totalNetwork,
    depth,
    isFirst = false
}: {
    userId: number;
    address: string;
    tier: number;
    directNodes: number;
    totalNetwork: number;
    depth: number;
    isFirst?: boolean;
}) {
    const [isExpanded, setIsExpanded] = useState(depth < 1); // Expand first level by default
    const { data: raw, isLoading, isFetching } = useTeamUsers(userId, 0, 100);
    const children = parseChildren(raw, userId);
    
    const hasChildren = directNodes > 0 || children.length > 0;

    const layerGradient = 
        tier >= 15 ? 'from-yellow-400 to-orange-500' :
        tier >= 9  ? 'from-red-400 to-red-600' :
                     'from-blue-500 to-indigo-600';

    return (
        <div className="relative">
            {/* Visual connector for non-root nodes */}
            {depth > 0 && (
                <div className="absolute -left-6 top-7 w-6 h-px bg-gray-300" />
            )}
            
            <motion.div 
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`group relative z-10 mb-3 transition-all duration-300 overflow-hidden bg-slate-50 border border-slate-200 shadow-[0_8px_20px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.04)] ${
                    isExpanded ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl hover:-translate-y-0.5 hover:shadow-lg'
                }`}
            >
                <div 
                    className="p-4 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
                    onClick={() => hasChildren && setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110 ${layerGradient}`}>
                            <User className="w-5 h-5 text-white" />
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[#e30613] font-black [text-shadow:0_1px_1px_rgba(255,255,255,0.8)]">Node #{userId}</span>
                                {depth === 0 && (
                                    <span className="px-1.5 py-0.5 rounded-full bg-blue-50 text-[#e30613] text-[10px] font-black uppercase tracking-wider border border-blue-200">Root</span>
                                )}
                            </div>
                            <p className="text-gray-500 font-mono font-bold text-xs">{address}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 md:ml-auto">
                        <div className="text-center min-w-[60px]">
                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Tier</p>
                            <p className={`font-black text-sm ${
                                tier >= 15 ? 'text-amber-500' : tier >= 9 ? 'text-red-500' : 'text-blue-500'
                            }`}>{tier}</p>
                        </div>
                        <div className="text-center min-w-[60px]">
                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Directs</p>
                            <p className="text-white font-black text-sm">{directNodes}</p>
                        </div>
                        <div className="text-center min-w-[60px]">
                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Network</p>
                            <p className="text-white font-black text-sm">{totalNetwork}</p>
                        </div>
                        
                        {hasChildren && (
                            <div className="ml-2 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                                {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-10 border-l border-[#3f3f46] pl-4 space-y-1 overflow-hidden"
                    >
                        {isLoading || isFetching ? (
                            <div className="flex items-center gap-2 text-gray-500 py-3 italic text-sm font-bold">
                                <Loader2 className="w-4 h-4 animate-spin text-[#e30613]" />
                                <span>Syncing deep node data...</span>
                            </div>
                        ) : children.length > 0 ? (
                            children.map(child => (
                                <TreeNode
                                    key={child.nodeId}
                                    userId={child.nodeId}
                                    address={shortAddr(child.wallet)}
                                    tier={child.tier}
                                    directNodes={child.directNodes}
                                    totalNetwork={child.totalMatrixNodes}
                                    depth={depth + 1}
                                />
                            ))
                        ) : (
                            <div className="py-3 px-4 rounded-xl bg-white border border-dashed border-[#3f3f46] text-gray-500 font-bold text-xs italic">
                                Termination node — No further connections detected.
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ReferralTreePage() {
    const { address } = useAccount();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResultId, setSearchResultId] = useState<number | null>(null);

    const { data: userData } = useUserIdByAddress(address);
    const myUserId = userData ? Number(userData) : 0;

    const { data: userIdFromSearch } = useUserIdByAddress(
        searchQuery.startsWith('0x') ? searchQuery : undefined
    );

    const handleSearch = () => {
        if (!searchQuery) { setSearchResultId(null); return; }
        if (searchQuery.startsWith('0x') && userIdFromSearch) {
            const id = Number(userIdFromSearch);
            if (id > 0) setSearchResultId(id);
        } else if (!isNaN(Number(searchQuery)) && Number(searchQuery) > 0) {
            setSearchResultId(Number(searchQuery));
        }
    };

    const rootId = searchResultId || myUserId;
    const { data: rootStats } = useUserStats(rootId);

    const rootAddress = rootId === myUserId && address ? shortAddr(address) : `Node ID #${rootId}`;
    const rootTier     = rootStats ? safeNum((rootStats as any)[3]) : 0;
    const rootDirects  = rootStats ? safeNum((rootStats as any)[1]) : 0;
    const rootNetwork  = rootStats ? safeNum((rootStats as any)[2]) : 0;

    return (
        <div className="-m-6 p-6 min-h-[calc(100vh-48px)] bg-gradient-to-b from-[#e31837] to-[#b01025] text-white flex flex-col items-center">
            <div className="max-w-7xl w-full space-y-8 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/20">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-wider uppercase mb-2 flex items-center gap-4">
                        <GitBranch className="w-10 h-10 text-white rotate-90" />
                        SPONSORSHIP TREE
                    </h1>
                    <p className="text-white/70 font-bold">Advanced layered visualization of your autonomous node hierarchy.</p>
                </motion.div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search Node ID or Address..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            className="w-full bg-white border border-[#3f3f46] rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-800 font-bold focus:outline-none focus:border-[#2471a3] shadow-sm placeholder:text-gray-500"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-[#2471a3] text-white border border-[#1a5276] font-black uppercase text-xs rounded-2xl hover:bg-[#1a5276] transition-colors shadow-sm"
                    >
                        Focus
                    </button>
                    {searchResultId && (
                        <button
                            onClick={() => { setSearchQuery(''); setSearchResultId(null); }}
                            className="p-3 bg-red-50 border border-red-200 text-red-500 rounded-2xl hover:bg-red-100 transition-colors"
                        >
                            <Minimize2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Tree Container */}
            <div className="relative overflow-hidden bg-white border border-slate-100 shadow-[inset_0_4px_10px_rgba(0,0,0,0.02)] rounded-3xl p-8 min-h-[600px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2471a3]/30 to-transparent" />
                
                <div className="relative z-10 max-w-4xl mx-auto">
                    {rootId > 0 ? (
                        <TreeNode
                            userId={rootId}
                            address={rootAddress}
                            tier={rootTier}
                            directNodes={rootDirects}
                            totalNetwork={rootNetwork}
                            depth={0}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 text-center">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border-4 border-[#e30613]/30 border-t-[#e30613] rounded-full mb-6" 
                            />
                            <h3 className="text-[#e30613] font-black text-xl mb-2 [text-shadow:0_1px_1px_rgba(255,255,255,0.8)] uppercase">INITIALIZING TREE DATA</h3>
                            <p className="text-gray-500 font-bold text-sm">Synchronizing your node connections with the blockchain...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Documentation / Legend Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="relative overflow-hidden bg-slate-50 border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-[#e30613] font-black uppercase tracking-[0.2em] text-xs">
                        <Layers className="w-4 h-4 text-[#e30613]" />
                        Tier Categorization
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-blue-500 rounded-full shadow-sm" />
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Beginner (1-8)</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-red-500 rounded-full shadow-sm" />
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Elite (9-14)</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-amber-500 rounded-full shadow-sm" />
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Apex (15-18)</p>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-[#f4f8f4] border border-[#c8e6c9] shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-purple-600 font-black uppercase tracking-[0.2em] text-xs">
                        <Info className="w-4 h-4 text-purple-600" />
                        Network Statistics
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 font-bold italic">
                        <p>Recursive syncing enabled. Data updates automatically on node expansion.</p>
                        <Network className="w-4 h-4 opacity-50" />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
