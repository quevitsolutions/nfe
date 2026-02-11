'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther, parseEther } from 'ethers';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useUserInfo, useLevelCosts, useRegister, useContractConfig, useIsRegistered } from '@/lib/hooks/useContract';
import { GENESIS_USER_ID, formatBNB, formatCurrency } from '@/lib/contract';

function RegisterContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { address, isConnected } = useAccount();

    const [referrerId, setReferrerId] = useState<number>(GENESIS_USER_ID);
    const [isProcessing, setIsProcessing] = useState(false);

    // Contract reads
    const { data: levelCosts } = useLevelCosts();
    const { data: config } = useContractConfig();
    const { register, isPending, isConfirming, isSuccess, hash } = useRegister();
    const { data: isRegistered } = useIsRegistered(address);

    // Redirect if already registered
    useEffect(() => {
        if (isConnected && isRegistered) {
            router.push('/dashboard');
        }
    }, [isConnected, isRegistered, router]);

    // Extract referrer ID from URL
    useEffect(() => {
        const refParam = searchParams.get('ref');
        if (refParam) {
            const refId = parseInt(refParam);
            if (!isNaN(refId) && refId > 0) {
                setReferrerId(refId);
            }
        }
    }, [searchParams]);

    // Calculate registration cost
    const registrationCost = levelCosts ? levelCosts[0] : BigInt(0);
    const bnbPrice = config ? Number(config._bnbPrice) / 1e8 : 600;
    const usdCost = levelCosts ? (Number(levelCosts[0]) / 1e18) * bnbPrice : 5;

    // Handle registration
    const handleRegister = async () => {
        if (!isConnected || !levelCosts) return;

        setIsProcessing(true);
        try {
            await register(referrerId, registrationCost);
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Success redirect
    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                router.push('/dashboard');
            }, 3000);
        }
    }, [isSuccess, router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors">
                    <ArrowLeft />
                    <span>Back to Home</span>
                </Link>
                <ConnectButton />
            </nav>

            {/* Registration Form */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                    <h1 className="text-4xl font-bold text-white mb-2">Join Great Income Club</h1>
                    <p className="text-gray-300 mb-8">Register and start earning passive income</p>

                    {/* Referrer Info */}
                    <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4">Your Referrer</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Referrer ID:</span>
                            <span className="text-white font-mono text-xl font-bold">{referrerId}</span>
                        </div>
                        {referrerId === GENESIS_USER_ID && (
                            <p className="text-sm text-yellow-400 mt-2">
                                ✨ You're registering under the Genesis user (root of the matrix)
                            </p>
                        )}
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl p-6 mb-6 border border-yellow-500/20">
                        <h3 className="text-lg font-semibold text-white mb-4">Registration Cost</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Level 0 Cost:</span>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-yellow-400">
                                        {registrationCost ? formatBNB(registrationCost) : '---'} BNB
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        ≈ {formatCurrency(usdCost)}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-3 mt-3">
                                <div className="text-sm text-gray-400 space-y-1">
                                    <div className="flex justify-between">
                                        <span>• 50% Sponsor Income</span>
                                        <span>{formatCurrency(usdCost * 0.5)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>• Level Income Distribution</span>
                                        <span>{formatCurrency(usdCost * 0.15)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>• Binary Matrix</span>
                                        <span>{formatCurrency(usdCost * 0.05)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>• Pool Distribution</span>
                                        <span>{formatCurrency(usdCost * 0.3)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Register Button */}
                    {!isConnected ? (
                        <div className="text-center">
                            <p className="text-gray-400 mb-4">Connect your wallet to register</p>
                            <ConnectButton />
                        </div>
                    ) : isSuccess ? (
                        <div className="bg-green-500/20 border border-green-500 rounded-2xl p-6 text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
                            <p className="text-gray-300 mb-4">Redirecting to dashboard...</p>
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
                        <button
                            onClick={handleRegister}
                            disabled={isPending || isConfirming || isProcessing}
                            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            {isPending || isConfirming || isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    {isPending || isProcessing ? 'Confirming...' : 'Processing...'}
                                </>
                            ) : (
                                `Register for ${registrationCost ? formatBNB(registrationCost) : '---'} BNB`
                            )}
                        </button>
                    )}

                    {/* Info */}
                    <div className="mt-6 text-sm text-gray-400 space-y-2">
                        <p>✓ Instant commission to your sponsor</p>
                        <p>✓ Automatic matrix placement</p>
                        <p>✓ Start earning from 4 income streams</p>
                        <p>✓ Upgrade anytime to unlock higher levels</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        }>
            <RegisterContent />
        </Suspense>
    );
}
