'use client';

import { useAccount, useChainId } from 'wagmi';
import { useUserIdByAddress, useNodeInfo, useClaim } from '@/lib/hooks/useContract';
import { formatBNB, formatCurrency } from '@/lib/contract';
import { Gift, Wallet, Award, ArrowUpRight, Ban } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RewardsPage() {
    const { address, isConnected } = useAccount();
    const [isMounted, setIsMounted] = useState(false);

    // Get user ID mapped from wallet
    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    // Fetch RewardPool Info
    const { data: nodeInfo, refetch: refetchNodeInfo } = useNodeInfo(userId);

    // Claim Hook
    const { claim, isPending, isConfirming, isSuccess, error } = useClaim();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Refresh after successful claim
    useEffect(() => {
        if (isSuccess && userId > 0) {
            refetchNodeInfo();
        }
    }, [isSuccess, userId, refetchNodeInfo]);

    if (!isMounted || !isConnected) return null;

    if (userId === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
                <Ban className="w-16 h-16 text-red-500/50 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Unregistered Address</h2>
                <p>Register a node first to start earning rewards.</p>
            </div>
        );
    }

    // Mapping nodeInfo array elements (from RewardPool.sol getNodeInfo)
    const currentPoolId = nodeInfo ? Number(nodeInfo[0]) : 0;
    const poolName = nodeInfo ? String(nodeInfo[1]) : 'None';
    const nfeTier = nodeInfo ? Number(nodeInfo[2]) : 0;
    const claimableBNB = nodeInfo ? nodeInfo[3] : BigInt(0);
    const lifetimeCap = nodeInfo ? nodeInfo[4] : BigInt(0);
    const lifetimeClaimed = nodeInfo ? nodeInfo[5] : BigInt(0);
    const capRemaining = nodeInfo ? nodeInfo[6] : BigInt(0);
    const isCapReached = nodeInfo ? Boolean(nodeInfo[7]) : false;
    const totalDeposited = nodeInfo ? nodeInfo[8] : BigInt(0);

    const handleClaim = () => {
        if (userId > 0) {
            claim(userId);
        }
    };

    // Pool Colors
    const getPoolColor = (id: number) => {
        switch (id) {
            case 3: return 'from-yellow-400 to-yellow-600 shadow-yellow-500/20'; // Gold
            case 2: return 'from-gray-300 to-gray-500 shadow-gray-500/20';       // Silver
            case 1: return 'from-orange-700 to-orange-900 shadow-orange-500/20'; // Bronze
            default: return 'from-slate-700 to-slate-900 shadow-slate-900/20';   // None
        }
    };

    const getProgressPercentage = () => {
        if (lifetimeCap === BigInt(0)) return 0;
        const cap = Number(lifetimeCap);
        const claimed = Number(lifetimeClaimed);
        const percent = (claimed / cap) * 100;
        return Math.min(100, Math.max(0, percent));
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Reward Pool</h1>

            {/* Top Pool Status Banner */}
            <div className={`p-8 rounded-2xl bg-gradient-to-br ${getPoolColor(currentPoolId)} border border-white/20 shadow-lg relative overflow-hidden backdrop-blur-md`}>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-20 transform rotate-12">
                    <Award className="w-64 h-64" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="text-white/80 font-medium mb-1 tracking-wider uppercase">Active Membership</div>
                        <div className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-2">
                            {poolName} Pool
                        </div>
                        <div className="text-lg text-white/90">
                            NodeFlowEngine Tier: <span className="font-bold">{nfeTier}</span>
                        </div>
                    </div>

                    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 w-full md:w-auto min-w-[300px]">
                        <div className="text-sm text-white/70 mb-1">Available to Claim</div>
                        <div className="text-3xl font-bold text-white mb-4">
                            {formatBNB(claimableBNB)} BNB
                        </div>

                        <button
                            onClick={handleClaim}
                            disabled={isPending || isConfirming || Number(claimableBNB) === 0 || isCapReached}
                            className={`w-full py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${isCapReached
                                    ? 'bg-red-500/50 text-white cursor-not-allowed'
                                    : Number(claimableBNB) > 0 && !isPending && !isConfirming
                                        ? 'bg-white text-black hover:bg-gray-100 hover:scale-[1.02] shadow-xl'
                                        : 'bg-white/20 text-white/50 cursor-not-allowed'
                                }`}
                        >
                            <Gift className="w-5 h-5" />
                            {isPending || isConfirming
                                ? 'Claiming...'
                                : isCapReached
                                    ? 'Cap Reached'
                                    : 'Claim Rewards'
                            }
                        </button>

                        {error && (
                            <div className="text-red-300 text-xs mt-3 bg-red-900/50 p-2 rounded">
                                {(error as any).shortMessage || error.message}
                            </div>
                        )}
                        {isSuccess && (
                            <div className="text-green-300 text-xs mt-3 bg-green-900/50 p-2 rounded">
                                Successfully claimed!
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-400 font-medium">Total Deposited</h3>
                    </div>
                    <div className="text-2xl font-bold text-white">{formatBNB(totalDeposited)} BNB</div>
                    <div className="text-sm text-gray-500 mt-1">Via NodeFlowEngine</div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-500/20 text-green-400 rounded-xl">
                            <ArrowUpRight className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-400 font-medium">Lifetime Claimed</h3>
                    </div>
                    <div className="text-2xl font-bold text-white">{formatBNB(lifetimeClaimed)} BNB</div>
                    <div className="text-sm text-gray-500 mt-1">Total withdrawn</div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
                            <Award className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-400 font-medium">Lifetime Cap</h3>
                    </div>
                    <div className="text-2xl font-bold text-white">{formatBNB(lifetimeCap)} BNB</div>
                    <div className="text-sm text-gray-500 mt-1">Maximum earnings</div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-yellow-500/20 text-yellow-400 rounded-xl">
                            <Gift className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-400 font-medium">Cap Remaining</h3>
                    </div>
                    <div className="text-2xl font-bold text-white">{formatBNB(capRemaining)} BNB</div>
                    <div className="text-sm text-gray-500 mt-1">Available to earn</div>
                </div>
            </div>

            {/* Progress Bar Section */}
            {currentPoolId > 0 && (
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Cap Progress</h3>
                            <p className="text-sm text-gray-400">Track how close you are to your pool's earnings cap.</p>
                        </div>
                        <div className="text-2xl font-black text-white">
                            {getProgressPercentage().toFixed(2)}%
                        </div>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-4 mb-4 overflow-hidden border border-white/5">
                        <div
                            className={`h-4 rounded-full transition-all duration-1000 bg-gradient-to-r ${getPoolColor(currentPoolId)}`}
                            style={{ width: `${getProgressPercentage()}%` }}
                        ></div>
                    </div>

                    <div className="flex justify-between text-sm font-mono text-gray-400">
                        <span>0 BNB</span>
                        <span>{formatBNB(lifetimeCap)} BNB Limit</span>
                    </div>

                    {isCapReached && (
                        <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                            <p className="text-red-400 font-medium">
                                You have reached your lifetime earnings cap for the {poolName} pool!
                                Upgrade your tier in NodeFlowEngine to enter a higher pool and increase your cap limit.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
