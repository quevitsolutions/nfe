'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ArrowUpCircle, Check, Loader2 } from 'lucide-react';
import { useUpgrade, useUpgradeCost, useContractConfig, useUserInfo, useUserIdByAddress } from '@/lib/hooks/useContract';
import { formatBNB, formatCurrency, LEVEL_COSTS_USD } from '@/lib/contract';

export default function UpgradePage() {
    const { isConnected, address } = useAccount();
    const [selectedLevel, setSelectedLevel] = useState<number>(1);

    // Get user ID from connected wallet address
    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    const { data: userInfo } = useUserInfo(userId);
    const { data: config } = useContractConfig();
    const { upgrade, isPending, isConfirming, isSuccess, hash } = useUpgrade();

    const currentLevel = userInfo ? Number(userInfo[3]) : 0;
    const numLevels = Math.max(0, selectedLevel - currentLevel);
    const bnbPrice = 600; // Fixed BNB price in USD

    // Check if user is genesis/root user (ID 36999 gets free upgrades)
    const isGenesisUser = userId === 36999;

    // Fetch upgrade cost directly from contract
    const { data: contractUpgradeCost } = useUpgradeCost(currentLevel, numLevels);

    // Use contract cost if available, otherwise 0
    const upgradeCost = isGenesisUser ? BigInt(0) : (contractUpgradeCost ? BigInt(contractUpgradeCost.toString()) : BigInt(0));
    const upgradeCostUSD = (Number(upgradeCost) / 1e18) * bnbPrice;

    const handleUpgrade = async () => {
        if (!isConnected || selectedLevel <= currentLevel) return;

        try {
            await upgrade(userId, selectedLevel, upgradeCost);
        } catch (error) {
            console.error('Upgrade failed:', error);
        }
    };


    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Level Selector */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-6">Select Target Level</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-white mb-4">
                            <span>Current Level:</span>
                            <span className="text-2xl font-bold text-yellow-400">{currentLevel}</span>
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                            {Array.from({ length: 18 }, (_, i) => i + 1).map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                    disabled={level <= currentLevel}
                                    className={`
                    p-3 rounded-lg font-bold transition-all
                    ${selectedLevel === level
                                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black scale-110'
                                            : level <= currentLevel
                                                ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                                                : 'bg-white/5 text-white hover:bg-white/10'
                                        }
                  `}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-400">Upgrading to:</span>
                                <span className="text-white font-bold">Level {selectedLevel}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-400">Levels to unlock:</span>
                                <span className="text-white font-bold">
                                    {Math.max(0, selectedLevel - currentLevel)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">USD Value:</span>
                                <span className="text-white font-bold">
                                    {formatCurrency(
                                        LEVEL_COSTS_USD.slice(currentLevel, selectedLevel).reduce((a, b) => a + b, 0)
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cost & Upgrade */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-6">Upgrade Cost</h2>

                    {isSuccess ? (
                        <div className="bg-green-500/20 border border-green-500 rounded-2xl p-6 text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Upgrade Successful!</h3>
                            <p className="text-gray-300 mb-4">You are now Level {selectedLevel}</p>
                            {hash && (
                                <a
                                    href={`https://testnet.bscscan.com/tx/${hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-400 hover:underline text-sm"
                                >
                                    View Transaction
                                </a>
                            )}
                        </div>
                    ) : (
                        <>
                            {isGenesisUser ? (
                                <div className="bg-gradient-to-r from-green-400/10 to-emerald-500/10 rounded-2xl p-6 mb-6 border border-green-500/20">
                                    <div className="text-center mb-4">
                                        <div className="text-5xl font-bold text-green-400 mb-2">
                                            FREE
                                        </div>
                                        <div className="text-xl text-gray-300">
                                            Genesis User - No Cost
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-4 mt-4">
                                        <div className="text-sm text-gray-400 space-y-2">
                                            <div className="flex justify-between">
                                                <span>You are the Genesis User (ID 36999)</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>All upgrades are free - no payment required</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl p-6 mb-6 border border-yellow-500/20">
                                    <div className="text-center mb-4">
                                        <div className="text-5xl font-bold text-yellow-400 mb-2">
                                            {formatBNB(upgradeCost)} BNB
                                        </div>
                                        <div className="text-xl text-gray-300">
                                            ≈ {formatCurrency(upgradeCostUSD)}
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-4 mt-4">
                                        <div className="text-sm text-gray-400 space-y-2">
                                            <div className="flex justify-between">
                                                <span>Income Distribution:</span>
                                                <span className="text-white">{formatCurrency(upgradeCostUSD * 0.7)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Pool Allocation:</span>
                                                <span className="text-white">{formatCurrency(upgradeCostUSD * 0.3)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleUpgrade}
                                disabled={!isConnected || selectedLevel <= currentLevel || isPending || isConfirming}
                                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                            >
                                {isPending || isConfirming ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        {isPending ? 'Confirming...' : 'Processing...'}
                                    </>
                                ) : (
                                    <>
                                        <ArrowUpCircle />
                                        Upgrade to Level {selectedLevel}
                                    </>
                                )}
                            </button>

                            <div className="mt-4 text-sm text-gray-400 space-y-1">
                                <p>✓ Unlock higher earning levels</p>
                                <p>✓ Increase income from team</p>
                                <p>✓ Expand matrix earnings</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Level Breakdown Table */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">All Levels Cost</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {LEVEL_COSTS_USD.map((cost, index) => (
                        <div
                            key={index}
                            className={`rounded-xl p-4 border ${index < currentLevel
                                ? 'bg-green-500/10 border-green-500/30'
                                : index < selectedLevel
                                    ? 'bg-yellow-500/10 border-yellow-500/30'
                                    : 'bg-white/5 border-white/10'
                                }`}
                        >
                            <div className="text-sm text-gray-400 mb-1">Level {index}</div>
                            <div className="text-lg font-bold text-white">{formatCurrency(cost)}</div>
                            <div className="text-xs text-gray-500">
                                {levelCosts ? formatBNB(levelCosts[index]) : '---'} BNB
                            </div>
                            {index < currentLevel && (
                                <div className="text-xs text-green-400 mt-2">✓ Unlocked</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
