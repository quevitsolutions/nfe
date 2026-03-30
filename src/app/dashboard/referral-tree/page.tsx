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
        tier >= 15 ? 'from-brand-red to-rose-700' :
        tier >= 9  ? 'from-brand-green to-emerald-800' :
                     'from-slate-400 to-slate-600';

    return (
        <div className="relative">
            {/* Visual connector for non-root nodes */}
            {depth > 0 && (
                <div className="absolute -left-6 top-7 w-6 h-px bg-brand-green/20" />
            )}
            
            <motion.div 
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`group relative z-10 mb-3 transition-all duration-300 overflow-hidden bg-white border border-brand-green/10 shadow-xl ${
                    isExpanded ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl hover:-translate-y-0.5 hover:shadow-2xl'
                }`}
            >
                <div 
                    className="p-4 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
                    onClick={() => hasChildren && setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-brand-mint border border-brand-green/10 flex items-center justify-center shadow-sm transform transition-transform group-hover:scale-110`}>
                            <User className="w-5 h-5 text-brand-green" />
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-brand-green font-black text-sm uppercase tracking-tighter italic">Node #{userId}</span>
                                {depth === 0 && (
                                    <span className="px-2 py-0.5 rounded-full bg-brand-red text-white text-xs font-black uppercase tracking-wider italic">Origin</span>
                                )}
                            </div>
                            <p className="text-foreground font-mono font-bold text-xs">{address}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 md:ml-auto">
                        <div className="text-center min-w-[70px]">
                            <p className="text-xs text-brand-blue font-black uppercase tracking-widest italic leading-none">Tier</p>
                            <div className={`w-full h-1 rounded-full bg-gradient-to-r ${layerGradient} mt-1.5 mb-1`} />
                            <p className={`font-black text-sm italic ${
                                tier >= 15 ? 'text-sharp-red' : tier >= 9 ? 'text-sharp-green' : 'text-foreground'
                            }`}>{tier}</p>
                        </div>
                        <div className="text-center min-w-[70px]">
                            <p className="text-xs text-brand-blue font-black uppercase tracking-widest">Directs</p>
                            <p className="text-foreground font-black text-sm">{directNodes}</p>
                        </div>
                        <div className="text-center min-w-[70px]">
                            <p className="text-xs text-brand-blue font-black uppercase tracking-widest">Network</p>
                            <p className="text-foreground font-black text-sm">{totalNetwork}</p>
                        </div>
                        
                        {hasChildren && (
                            <div className="ml-2 w-8 h-8 rounded-lg bg-brand-mint border border-brand-green/10 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all shadow-sm">
                                {isExpanded ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
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
                        className="ml-10 border-l border-brand-green/10 pl-4 space-y-1 overflow-hidden"
                    >
                        {isLoading || isFetching ? (
                            <div className="flex items-center gap-2 text-foreground py-3 italic text-sm font-bold">
                                <Loader2 className="w-4 h-4 animate-spin text-brand-green" />
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
                            <div className="py-3 px-4 rounded-xl bg-brand-green/5 border border-dashed border-brand-green/20 text-foreground font-bold text-xs italic">
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
        <div className="-m-6 p-6 min-h-[calc(100vh-48px)] bg-brand-mint text-foreground flex flex-col items-center">
            <div className="max-w-7xl w-full space-y-8 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-brand-green/10 w-full">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-4xl md:text-5xl font-black text-brand-red tracking-tighter uppercase mb-2 flex items-center gap-4 italic">
                        <GitBranch className="w-10 h-10 text-brand-green rotate-90" />
                        Prop Tree
                    </h1>
                    <p className="text-foreground font-black uppercase tracking-widest text-xs italic">Deep-layer neural hierarchy visualization.</p>
                </motion.div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-blue" />
                        <input
                            type="text"
                            placeholder="SEARCH NODE OR WALLET..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            className="w-full bg-white border border-brand-green/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-foreground font-black focus:outline-none focus:border-brand-green/30 shadow-xl placeholder:text-brand-blue/50 uppercase italic tracking-widest"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-brand-green text-white font-black uppercase text-xs rounded-2xl hover:bg-brand-red transition-all shadow-xl italic"
                    >
                        Sync
                    </button>
                    {searchResultId && (
                        <button
                            onClick={() => { setSearchQuery(''); setSearchResultId(null); }}
                            className="p-3 bg-brand-red/10 border border-brand-red/10 text-brand-red rounded-2xl hover:bg-white transition-colors"
                        >
                            <Minimize2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Tree Container */}
            <div className="relative overflow-hidden bg-white border border-brand-green/5 shadow-2xl rounded-3xl p-8 min-h-[600px] w-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
                
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
                                className="w-16 h-16 border-4 border-brand-green/20 border-t-brand-green rounded-full mb-6" 
                            />
                            <h3 className="text-brand-green font-black text-xl mb-2 uppercase tracking-tighter italic">INITIALIZING TREE DATA</h3>
                            <p className="text-foreground font-bold text-sm">Synchronizing your node connections with the blockchain...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Documentation / Legend Overlay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="relative overflow-hidden bg-white border border-brand-green/10 shadow-2xl rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-brand-red font-black uppercase tracking-[0.2em] text-xs italic">
                        <Layers className="w-4 h-4 text-brand-green" />
                        Tier Calibration
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-white rounded-full shadow-sm" />
                            <p className="text-xs text-foreground font-black uppercase tracking-wider">Beginner (1-8)</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-brand-green rounded-full shadow-sm" />
                            <p className="text-xs text-foreground font-black uppercase tracking-wider">Elite (9-14)</p>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-brand-red rounded-full shadow-sm" />
                            <p className="text-xs text-foreground font-black uppercase tracking-wider">Apex (15-18)</p>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-white border border-brand-green/10 shadow-2xl rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-brand-red font-black uppercase tracking-[0.2em] text-[10px] italic">
                        <Info className="w-4 h-4 text-brand-green" />
                        Neural Data
                    </div>
                    <div className="flex justify-between items-center text-xs text-foreground font-bold italic">
                        <p>Recursive syncing enabled. Data updates automatically on node expansion.</p>
                        <Network className="w-4 h-4 opacity-50 text-[#ed1b24]" />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}





