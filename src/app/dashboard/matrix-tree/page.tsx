'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Network, ZoomIn, ZoomOut, Maximize, ChevronDown, ChevronUp } from 'lucide-react';
import { useMatrixPosition, useUserIdByAddress, useUserStats, useUserInfo } from '@/lib/hooks/useContract';

function MatrixTreeNode({ id, position, defaultExpanded = false }: { id: number; position: string; defaultExpanded?: boolean }) {
    const { data: matrixPosition } = useMatrixPosition(id);
    const { data: userInfo } = useUserInfo(id);
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    if (id === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl bg-white border-2 border-dashed border-[#c8e6c9] flex flex-col items-center justify-center p-3 relative shadow-sm">
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">Empty</div>
                </div>
                <div className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-widest">{position}</div>
            </div>
        );
    }

    const leftChildId = matrixPosition ? Number(matrixPosition[1]) : 0;
    const rightChildId = matrixPosition ? Number(matrixPosition[2]) : 0;
    const level = userInfo ? Number(userInfo[3]) : 1;
    // Always consider it has children slots to show the binary structure
    const hasChildren = true;

    return (
        <div className="flex flex-col items-center">
            {/* Node Card */}
            <div 
                className={`relative w-36 h-36 p-4 flex flex-col items-center justify-center transition-all duration-300 rounded-[2rem] bg-white shadow-sm border ${
                    isExpanded ? 'border-[#2471a3] shadow-md ring-4 ring-blue-50' : 'border-[#c8e6c9] hover:-translate-y-1 hover:shadow-lg cursor-pointer'
                }`}
                onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
            >
                <div className="text-[#1b5e20] font-black text-3xl mb-1 [text-shadow:0_1px_1px_rgba(255,255,255,0.8)]">#{id}</div>
                <div className={`text-xs font-black mt-1 px-3 py-1 rounded border uppercase tracking-wider ${
                    level >= 20 ? 'bg-amber-50 text-amber-600 border-amber-200' :
                    level >= 10 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                    'bg-blue-50 text-blue-600 border-blue-200'
                }`}>
                    Layer {level}
                </div>
                
                {hasChildren && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                        className="absolute -bottom-4 bg-[#f4f8f4] border border-[#c8e6c9] shadow-sm rounded-full p-1.5 text-gray-500 hover:text-[#1b5e20] hover:border-[#2471a3] transition-colors z-10"
                    >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                )}
            </div>
            <div className="mt-6 text-xs font-bold text-gray-500 uppercase tracking-widest">{position}</div>

            {/* Children Container */}
            {isExpanded && (
                <div className="mt-2 flex flex-col items-center">
                    {/* Main vertical drop */}
                    <div className="w-[3px] h-8 bg-gray-300"></div>
                    <div className="flex gap-16 md:gap-32 relative">
                        {/* Horizontal connection line */}
                        <div className="absolute top-0 left-1/4 right-1/4 h-[3px] bg-gray-300" style={{ width: '50%', transform: 'translateX(50%)' }}></div>
                        
                        <div className="flex flex-col items-center relative pt-8">
                            {/* Vertical drop line for left child */}
                            <div className="absolute top-0 w-[3px] h-8 bg-gray-300"></div>
                            <MatrixTreeNode id={leftChildId} position="Left" />
                        </div>
                        <div className="flex flex-col items-center relative pt-8">
                            {/* Vertical drop line for right child */}
                            <div className="absolute top-0 w-[3px] h-8 bg-gray-300"></div>
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
    const leftChildId = matrixPosition ? Number(matrixPosition[1]) : 0;
    const rightChildId = matrixPosition ? Number(matrixPosition[2]) : 0;

    // Get stats for left and right children to calculate leg counts
    const { data: leftChildInfo } = useUserInfo(leftChildId);
    const { data: rightChildInfo } = useUserInfo(rightChildId);

    // Calculate actual leg counts: 1 (the child) + their matrix team
    const leftTeam = leftChildId > 0 && leftChildInfo
        ? 1 + Number(leftChildInfo[5])
        : 0;

    const rightTeam = rightChildId > 0 && rightChildInfo
        ? 1 + Number(rightChildInfo[5])
        : 0;

    const balance = leftTeam + rightTeam > 0 ? ((Math.min(leftTeam, rightTeam) / Math.max(leftTeam, rightTeam)) * 100).toFixed(0) : 0;

    const handleResetZoom = () => {
        setZoom(1);
    };

    return (
        <div className="-m-6 p-6 min-h-[calc(100vh-48px)] bg-gradient-to-b from-[#e31837] to-[#b01025] text-white flex flex-col items-center">
            <div className="max-w-7xl w-full space-y-6">
            {/* Controls */}
            <div className="relative overflow-hidden bg-[#f4f8f4] rounded-2xl p-6 border border-[#c8e6c9] shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-[#1b5e20] mb-1 uppercase tracking-wider [text-shadow:0_1px_1px_rgba(255,255,255,0.8)]">Node Matrix</h2>
                        <p className="text-gray-500 font-bold">View and expand your dynamic matrix structure</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
                            className="p-2 bg-white border border-[#c8e6c9] text-gray-600 rounded-lg hover:bg-[#f4f8f4] hover:text-[#1b5e20] transition-colors shadow-sm"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleResetZoom}
                            className="px-4 py-2 bg-blue-50 border border-blue-200 text-[#1b5e20] rounded-lg transition-colors font-black shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]"
                        >
                            {Math.round(zoom * 100)}%
                        </button>
                        <button
                            onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                            className="p-2 bg-white border border-[#c8e6c9] text-gray-600 rounded-lg hover:bg-[#f4f8f4] hover:text-[#1b5e20] transition-colors shadow-sm"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                        <button onClick={handleResetZoom} className="p-2 bg-white border border-[#c8e6c9] text-gray-600 rounded-lg hover:bg-[#f4f8f4] hover:text-[#1b5e20] transition-colors shadow-sm">
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Binary Tree Visualization - Interactive Expandable */}
            <div className="relative overflow-hidden bg-white rounded-[3rem] p-6 overflow-x-auto min-h-[600px] flex justify-center py-12 border border-[#c8e6c9] shadow-[inset_0_4px_10px_rgba(0,0,0,0.03)]"
                 style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            >
                <div 
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} 
                    className="transition-transform duration-300 ease-in-out"
                >
                    {userId > 0 ? (
                        <MatrixTreeNode id={userId} position="You" defaultExpanded={true} />
                    ) : (
                        <div className="text-center py-20 text-gray-500 font-bold text-lg">
                            Please connect a registered wallet to view your matrix.
                        </div>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative overflow-hidden bg-[#f4f8f4] rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] border border-[#c8e6c9] hover:-translate-y-1 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,1)]">
                            <Network className="w-5 h-5 text-blue-500 drop-shadow-sm" />
                        </div>
                        <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Left Leg</span>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-black text-blue-500 tracking-tighter leading-none flex items-baseline gap-1 [text-shadow:0_1px_1px_rgba(255,255,255,0.8)]">
                            {leftTeam}
                        </div>
                    </div>
                </div>
                
                <div className="relative overflow-hidden bg-[#f4f8f4] rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] border border-[#c8e6c9] hover:-translate-y-1 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-50 border border-purple-200 p-2.5 rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,1)]">
                            <Network className="w-5 h-5 text-purple-500 drop-shadow-sm" />
                        </div>
                        <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Right Leg</span>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-black text-purple-500 tracking-tighter leading-none flex items-baseline gap-1 [text-shadow:0_1px_1px_rgba(255,255,255,0.8)]">
                            {rightTeam}
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden bg-[#f4f8f4] rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] border border-[#c8e6c9] hover:-translate-y-1 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl shadow-[inset_1px_1px_3px_rgba(255,255,255,1)]">
                            <Network className="w-5 h-5 text-emerald-500 drop-shadow-sm" />
                        </div>
                        <span className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Matrix Balance</span>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-black text-emerald-500 tracking-tighter leading-none flex items-baseline gap-1 [text-shadow:0_1px_1px_rgba(255,255,255,0.8)]">
                            {balance}%
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
