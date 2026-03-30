'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Network, ZoomIn, ZoomOut, Maximize, ChevronDown, ChevronUp } from 'lucide-react';
import { useMatrixPosition, useUserIdByAddress, useUserStats, useUserInfo } from '@/lib/hooks/useContract';

const safeNum = (val: any): number => {
    if (val === undefined || val === null) return 0;
    const n = Number(val);
    return isNaN(n) ? 0 : n;
};

function MatrixTreeNode({ id, position, defaultExpanded = false }: { id: number; position: string; defaultExpanded?: boolean }) {
    const { data: matrixPosition } = useMatrixPosition(id);
    const { data: userInfo } = useUserInfo(id);
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    if (id === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl bg-brand-mint border-2 border-dashed border-brand-green/10 flex flex-col items-center justify-center p-3 relative opacity-50">
                    <div className="text-foreground text-sm font-black uppercase tracking-widest italic">Node Empty</div>
                </div>
                <div className="mt-4 text-xs font-black text-brand-blue uppercase tracking-tighter italic">{position} SLOT</div>
            </div>
        );
    }

    const leftChildId = matrixPosition ? safeNum((matrixPosition as any)[1]) : 0;
    const rightChildId = matrixPosition ? safeNum((matrixPosition as any)[2]) : 0;
    const level = userInfo ? safeNum((userInfo as any)[3]) : 1;
    // Always consider it has children slots to show the binary structure
    const hasChildren = true;

    return (
        <div className="flex flex-col items-center">
            {/* Node Card */}
            <div 
                className={`relative w-40 h-40 p-4 flex flex-col items-center justify-center transition-all duration-500 rounded-[2.5rem] bg-white shadow-xl border ${
                    isExpanded ? 'border-brand-green ring-8 ring-brand-green/10' : 'border-brand-green/10 hover:border-brand-green/30 hover:-translate-y-2 cursor-pointer'
                }`}
                onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
            >
                <div className="text-brand-green font-black text-4xl mb-1 italic">#{id}</div>
                <div className={`text-xs font-black mt-2 px-3 py-1 rounded-full uppercase tracking-tighter italic ${
                    level >= 15 ? 'bg-brand-red text-foreground' :
                    level >= 8 ? 'bg-brand-green text-foreground' :
                    'bg-white text-brand-blue border border-brand-green/10'
                }`}>
                    Layer {level}
                </div>
                
                {hasChildren && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className="absolute -bottom-5 bg-white border border-brand-green/10 shadow-xl rounded-full p-2 text-brand-green hover:bg-brand-green hover:text-foreground transition-all transform hover:scale-110 z-10"
                    >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                )}
            </div>
            <div className="mt-8 text-xs font-black text-brand-blue uppercase tracking-widest italic">{position} NODE</div>

            {/* Children Container */}
            {isExpanded && (
                <div className="mt-4 flex flex-col items-center">
                    {/* Main vertical drop */}
                    <div className="w-[3px] h-10 bg-brand-green/10"></div>
                    <div className="flex gap-12 md:gap-40 lg:gap-64 relative">
                        {/* Horizontal connection line */}
                        <div className="absolute top-0 left-1/4 right-1/4 h-[3px] bg-brand-green/10" style={{ width: '50%', transform: 'translateX(50%)' }}></div>
                        
                        <div className="flex flex-col items-center relative pt-10">
                            {/* Vertical drop line for left child */}
                            <div className="absolute top-0 w-[3px] h-10 bg-brand-green/10"></div>
                            <MatrixTreeNode id={leftChildId} position="Left" />
                        </div>
                        <div className="flex flex-col items-center relative pt-10">
                            {/* Vertical drop line for right child */}
                            <div className="absolute top-0 w-[3px] h-10 bg-brand-green/10"></div>
                            <MatrixTreeNode id={rightChildId} position="Right" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MatrixTreePage() {
    const { address } = useAccount();
    const [zoom, setZoom] = useState(1);
    
    // Get user ID from connected wallet address
    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    // Get matrix position to calculate top level leg stats
    const { data: matrixPosition } = useMatrixPosition(userId);
    const leftChildId = matrixPosition ? safeNum((matrixPosition as any)[1]) : 0;
    const rightChildId = matrixPosition ? safeNum((matrixPosition as any)[2]) : 0;

    // Get stats for left and right children to calculate leg counts
    const { data: leftChildInfo } = useUserInfo(leftChildId);
    const { data: rightChildInfo } = useUserInfo(rightChildId);

    // Calculate actual leg counts: 1 (the child) + their matrix team
    const leftTeam = leftChildId > 0 && leftChildInfo
        ? 1 + safeNum((leftChildInfo as any)[5])
        : 0;

    const rightTeam = rightChildId > 0 && rightChildInfo
        ? 1 + safeNum((rightChildInfo as any)[5])
        : 0;

    const balance = leftTeam + rightTeam > 0 ? ((Math.min(leftTeam, rightTeam) / Math.max(leftTeam, rightTeam)) * 100).toFixed(0) : 0;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setZoom(0.5);
            } else {
                setZoom(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleResetZoom = () => {
        setZoom(window.innerWidth < 768 ? 0.5 : 1);
    };

    return (
        <div className="-m-6 p-6 min-h-[calc(100vh-48px)] bg-brand-mint text-foreground flex flex-col items-center">
            <div className="max-w-7xl w-full space-y-6">
            {/* Controls */}
            <div className="relative overflow-hidden bg-white border border-brand-green/10 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-brand-green mb-1 uppercase tracking-tighter italic">Neural Matrix</h2>
                        <p className="text-brand-blue font-bold uppercase tracking-widest text-xs italic">Real-time node propagation visualization</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
                            className="p-3 bg-brand-mint border border-brand-green/10 rounded-xl text-brand-blue hover:text-brand-green transition-all shadow-sm"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                            className="p-3 bg-brand-mint border border-brand-green/10 rounded-xl text-brand-blue hover:text-brand-green transition-all shadow-sm"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleResetZoom}
                            className="p-3 bg-brand-mint border border-brand-green/10 rounded-xl text-brand-blue hover:text-brand-green transition-all shadow-sm"
                        >
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Binary Tree Visualization - Interactive Expandable */}
            <div className="relative overflow-hidden bg-white rounded-[3rem] p-6 overflow-x-auto min-h-[600px] flex justify-center py-20 border border-brand-green/10 shadow-2xl w-full"
                 style={{ backgroundImage: 'radial-gradient(rgba(34, 197, 94, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            >
                <div 
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} 
                    className="transition-transform duration-300 ease-in-out"
                >
                    {userId > 0 ? (
                        <MatrixTreeNode id={userId} position="You" defaultExpanded={true} />
                    ) : (
                        <div className="text-center py-20 text-brand-red font-black uppercase tracking-widest italic animate-pulse">
                            Wallet Connection Required for Neural Sync
                        </div>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative overflow-hidden bg-white rounded-[2rem] p-5 shadow-xl border border-brand-green/10 hover:-translate-y-1 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-brand-mint border border-brand-green/20 p-2.5 rounded-xl">
                            <Network className="w-5 h-5 text-brand-green" />
                        </div>
                        <span className="text-xs md:text-sm text-foreground font-black uppercase tracking-widest italic">Logic: Left Prop</span>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-brand-green tracking-tighter leading-none italic">
                            {String(leftTeam).padStart(2, '0')}
                        </div>
                    </div>
                </div>
                
                <div className="relative overflow-hidden bg-white rounded-[2rem] p-5 shadow-xl border border-brand-green/10 hover:-translate-y-1 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-brand-mint border border-brand-green/20 p-2.5 rounded-xl">
                            <Network className="w-5 h-5 text-brand-green" />
                        </div>
                        <span className="text-xs md:text-sm text-foreground font-black uppercase tracking-widest italic">Logic: Right Prop</span>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-brand-green tracking-tighter leading-none italic">
                            {String(rightTeam).padStart(2, '0')}
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-white rounded-[2rem] p-5 shadow-xl border border-brand-green/10 hover:-translate-y-1 transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-brand-red/10 border border-brand-red/20 p-2.5 rounded-xl">
                            <Network className="w-5 h-5 text-brand-red" />
                        </div>
                        <span className="text-xs md:text-sm text-foreground font-black uppercase tracking-widest italic">Matrix Sync</span>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-brand-red tracking-tighter leading-none italic">
                            {balance}%
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}


