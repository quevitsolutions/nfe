'use client';

import { useContractInfo } from '@/lib/hooks/useContract';
import { formatBNB } from '@/lib/contract';
import { Globe, Users, TrendingUp, Activity, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';

export default function EcosystemPage() {
    const [isMounted, setIsMounted] = useState(false);
    const chainId = useChainId();

    const { data: contractInfo } = useContractInfo();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Mapping contractInfo array elements (from RewardPool.sol getContractInfo)
    const totalReceived = contractInfo ? contractInfo[0] : BigInt(0);
    const totalDistributed = contractInfo ? contractInfo[1] : BigInt(0);
    const pendingInContract = contractInfo ? contractInfo[2] : BigInt(0);
    const bronzeNodes = contractInfo ? Number(contractInfo[3]) : 0;
    const silverNodes = contractInfo ? Number(contractInfo[4]) : 0;
    const goldNodes = contractInfo ? Number(contractInfo[5]) : 0;
    const rewardPoolAddress = contractInfo ? String(contractInfo[6]) : '';
    const engineAddress = contractInfo ? String(contractInfo[7]) : '';

    const totalEcosystemNodes = bronzeNodes + silverNodes + goldNodes;

    // BscScan Base URL
    const bscScanUrl = chainId === 97 ? 'https://testnet.bscscan.com/address/' : 'https://bscscan.com/address/';

    const copyToClipboard = (text: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Globe className="w-8 h-8 text-blue-400" />
                <h1 className="text-2xl md:text-3xl font-bold text-white">Ecosystem Health</h1>
            </div>

            {/* Top Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <h3 className="text-blue-200 font-medium">Total Received</h3>
                    </div>
                    <div className="text-3xl font-black text-white">{formatBNB(totalReceived)} BNB</div>
                    <div className="text-sm text-blue-400/70 mt-1">Lifetime 5% fees collected</div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-5 h-5 text-purple-400" />
                        <h3 className="text-purple-200 font-medium">Total Distributed</h3>
                    </div>
                    <div className="text-3xl font-black text-white">{formatBNB(totalDistributed)} BNB</div>
                    <div className="text-sm text-purple-400/70 mt-1">Lifetime rewards claimed</div>
                </div>

                <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md rounded-2xl p-6 border border-green-500/20 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10">
                        <ShieldCheck className="w-32 h-32" />
                    </div>
                    <div className="flex items-center gap-3 mb-2 relative z-10">
                        <ShieldCheck className="w-5 h-5 text-green-400" />
                        <h3 className="text-green-200 font-medium">Pending In Contract</h3>
                    </div>
                    <div className="text-3xl font-black text-white relative z-10">{formatBNB(pendingInContract)} BNB</div>
                    <div className="text-sm text-green-400/70 mt-1 relative z-10">Waiting to be claimed</div>
                </div>
            </div>

            {/* Qualified Pool Memberships */}
            <h2 className="text-xl font-bold text-white mb-4 mt-8 flex items-center gap-2">
                <Users className="w-6 h-6 text-gray-400" />
                Qualified Network Nodes ({totalEcosystemNodes})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Gold Pool */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 hover:bg-white/10 transition group">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
                            GOLD
                        </h3>
                        <div className="bg-yellow-500/20 text-yellow-500 text-xs px-3 py-1 rounded-full font-bold border border-yellow-500/30">
                            35% Split
                        </div>
                    </div>
                    <div className="flex items-end gap-3">
                        <div className="text-5xl font-bold text-white">{goldNodes}</div>
                        <div className="text-gray-400 mb-1">active nodes</div>
                    </div>
                    <div className="mt-6 text-sm text-gray-500 group-hover:text-yellow-400/70 transition">
                        Requires Tier 14+, 4 Directs, 50 Matrix
                    </div>
                </div>

                {/* Silver Pool */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-gray-400/30 hover:bg-white/10 transition group">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
                            SILVER
                        </h3>
                        <div className="bg-gray-400/20 text-gray-300 text-xs px-3 py-1 rounded-full font-bold border border-gray-400/30">
                            35% Split
                        </div>
                    </div>
                    <div className="flex items-end gap-3">
                        <div className="text-5xl font-bold text-white">{silverNodes}</div>
                        <div className="text-gray-400 mb-1">active nodes</div>
                    </div>
                    <div className="mt-6 text-sm text-gray-500 group-hover:text-gray-300/70 transition">
                        Requires Tier 10+, 3 Directs, 20 Matrix
                    </div>
                </div>

                {/* Bronze Pool */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30 hover:bg-white/10 transition group">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-700">
                            BRONZE
                        </h3>
                        <div className="bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full font-bold border border-orange-500/30">
                            30% Split
                        </div>
                    </div>
                    <div className="flex items-end gap-3">
                        <div className="text-5xl font-bold text-white">{bronzeNodes}</div>
                        <div className="text-gray-400 mb-1">active nodes</div>
                    </div>
                    <div className="mt-6 text-sm text-gray-500 group-hover:text-orange-400/70 transition">
                        Requires Tier 6+, 2 Directs, 10 Matrix
                    </div>
                </div>
            </div>

            {/* Smart Contract Transparency */}
            <h2 className="text-xl font-bold text-white mb-4 mt-8">Smart Contracts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* NodeFlowEngine Contract */}
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-5 border border-white/5 flex flex-col justify-between">
                    <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">Core Engine Contract</div>
                        <div className="font-mono text-sm text-white break-all">{engineAddress || 'Loading...'}</div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => copyToClipboard(engineAddress)}
                            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition"
                            title="Copy Address"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                        <a
                            href={`${bscScanUrl}${engineAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition"
                        >
                            View on BscScan <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>

                {/* RewardPool Contract */}
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-5 border border-white/5 flex flex-col justify-between">
                    <div>
                        <div className="text-sm font-medium text-gray-400 mb-1">Reward Pool Contract</div>
                        <div className="font-mono text-sm text-white break-all">{rewardPoolAddress || 'Loading...'}</div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => copyToClipboard(rewardPoolAddress)}
                            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition"
                            title="Copy Address"
                        >
                            <Copy className="w-4 h-4" />
                        </button>
                        <a
                            href={`${bscScanUrl}${rewardPoolAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition"
                        >
                            View on BscScan <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>

            </div>

        </div>
    );
}
