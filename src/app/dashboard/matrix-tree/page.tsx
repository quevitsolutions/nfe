'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Network, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useMatrixPosition, useUserIdByAddress, useUserStats, useUserInfo } from '@/lib/hooks/useContract';

interface MatrixNode {
    id: number;
    address: string;
    level: number;
    left?: MatrixNode;
    right?: MatrixNode;
}



function MatrixNodeComponent({ node, position }: { node?: MatrixNode; position: string }) {
    if (!node) {
        return (
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center">
                    <div className="text-gray-600 text-sm">Empty</div>
                </div>
                <div className="mt-2 text-xs text-gray-500">{position}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div className={`w-32 h-32 rounded-2xl border-2 p-3 flex flex-col items-center justify-center ${node.level >= 20 ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-500' :
                node.level >= 10 ? 'bg-gradient-to-br from-green-400/20 to-emerald-500/20 border-green-500' :
                    'bg-gradient-to-br from-blue-400/20 to-purple-500/20 border-blue-500'
                }`}>
                <div className="text-white font-bold text-lg">#{node.id}</div>
                <div className="text-gray-400 text-xs font-mono mt-1">{node.address}</div>
                <div className={`text-sm font-bold mt-2 ${node.level >= 20 ? 'text-yellow-400' :
                    node.level >= 10 ? 'text-green-400' :
                        'text-blue-400'
                    }`}>
                    Lvl {node.level}
                </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">{position}</div>
        </div>
    );
}

export default function MatrixTreePage() {
    const { isConnected, address } = useAccount();
    const [zoom, setZoom] = useState(1);
    const [currentDepth, setCurrentDepth] = useState(2);

    // Get user ID from connected wallet address
    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    // Get user stats for team counts
    const { data: userStats } = useUserStats(userId);
    const { data: userInfo } = useUserInfo(userId);

    // Get matrix position
    const { data: matrixPosition } = useMatrixPosition(userId);

    const uplineId = matrixPosition ? Number(matrixPosition[0]) : 0;
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

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Binary Matrix</h2>
                        <p className="text-gray-400">View your binary tree structure (35 layers max)</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                            className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                            className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                            <Maximize className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                    <label className="text-gray-400">Depth:</label>
                    <input
                        type="range"
                        min="1"
                        max="35"
                        value={currentDepth}
                        onChange={(e) => setCurrentDepth(Number(e.target.value))}
                        className="flex-1"
                    />
                    <span className="text-white font-bold w-12">{currentDepth}</span>
                </div>
            </div>

            {/* Binary Tree Visualization */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 overflow-x-auto">
                <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} className="transition-transform">
                    {/* Root Node (Current User) */}
                    <div className="flex flex-col items-center gap-8">
                        <MatrixNodeComponent
                            node={userId > 0 ? {
                                id: userId,
                                address: address?.slice(0, 6) + '...' + address?.slice(-4) || '',
                                level: userInfo ? Number(userInfo[3]) : 1
                            } : undefined}
                            position="You"
                        />

                        {/* Level 1 */}
                        <div className="flex gap-24">
                            <div className="flex flex-col items-center gap-8">
                                <div className="w-0.5 h-8 bg-white/20"></div>
                                <MatrixNodeComponent
                                    node={leftChildId > 0 ? {
                                        id: leftChildId,
                                        address: `#${leftChildId}`,
                                        level: leftChildInfo ? Number(leftChildInfo[3]) : 1
                                    } : undefined}
                                    position="Left"
                                />

                                {/* Removed deeper levels for simplicity - use getMatrixUsers for full tree */}
                            </div>

                            <div className="flex flex-col items-center gap-8">
                                <div className="w-0.5 h-8 bg-white/20"></div>
                                <MatrixNodeComponent
                                    node={rightChildId > 0 ? {
                                        id: rightChildId,
                                        address: `#${rightChildId}`,
                                        level: rightChildInfo ? Number(rightChildInfo[3]) : 1
                                    } : undefined}
                                    position="Right"
                                />

                                {/* Removed deeper levels for simplicity */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <Network className="w-8 h-8 text-blue-400 mb-3" />
                    <div className="text-gray-400 mb-1">Left Leg</div>
                    <div className="text-3xl font-bold text-white">{leftTeam}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <Network className="w-8 h-8 text-purple-400 mb-3" />
                    <div className="text-gray-400 mb-1">Right Leg</div>
                    <div className="text-3xl font-bold text-white">{rightTeam}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <Network className="w-8 h-8 text-green-400 mb-3" />
                    <div className="text-gray-400 mb-1">Binary Balance</div>
                    <div className="text-3xl font-bold text-green-400">{balance}%</div>
                </div>
            </div>
        </div>
    );
}
