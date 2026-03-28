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
    const { register, isPending, isConfirming, isSuccess, hash, error: registerError } = useRegister();
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
    // getConfig returns a tuple — access by name or index (index 3 = _bnbPrice)
    const registrationCost = levelCosts ? levelCosts[0] : BigInt(0);
    const rawBnbPrice = config
        ? (Number((config as any)._bnbPrice ?? (config as any)[3]) || 0)
        : 0;
    const bnbPrice = rawBnbPrice > 0 ? rawBnbPrice / 1e8 : 600;
    const usdCost = (registrationCost && bnbPrice)
        ? (Number(registrationCost) / 1e18) * bnbPrice
        : 0;

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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#8b0000] to-neutral-950">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 text-white hover:text-[#e30613] transition-colors">
                        <ArrowLeft />
                        <span>Back</span>
                    </Link>
                    <Link href="/">
                        <img src="/aipcore-logo.svg" alt="AIPCore" className="h-10 w-auto drop-shadow-[0_0_10px_rgba(227,6,19,0.3)]" />
                    </Link>
                </div>
                <ConnectButton />
            </nav>

            {/* Registration Form */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="relative overflow-hidden bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl border-t border-l border-white/20 border-b border-r border-black/80 shadow-[10px_10px_20px_rgba(0,0,0,0.6),-2px_-2px_10px_rgba(255,255,255,0.05),inset_1px_1px_2px_rgba(255,255,255,0.2)] rounded-[3rem] p-8 lg:p-12">
                    <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-widest italic drop-shadow-md">Initialize Node</h1>
                    <p className="text-[#e30613] mb-8 font-medium">Register your Node ID and synchronize with the protocol</p>

                    {/* Referrer Info */}
                    <div className="bg-black/40 border-t border-l border-black/80 border-b border-r border-white/10 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.1)] rounded-2xl p-6 mb-8">
                        <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tighter drop-shadow-lg">Node Sponsorship</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-[#e30613] font-medium">Sponsor ID:</span>
                            <span className="text-white font-mono text-xl font-black">{referrerId}</span>
                        </div>
                        {referrerId === GENESIS_USER_ID && (
                            <p className="text-sm text-red-500 font-bold mt-2 italic">
                                ✨ Root Node Sync
                            </p>
                        )}
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-black/40 border-t border-l border-black/80 border-b border-r border-red-500/20 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.1)] rounded-2xl p-6 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e30613]/50 to-transparent" />
                        <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tighter drop-shadow-lg">Protocol Cost</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300 font-medium">Layer 1 Activation:</span>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-[#e30613]">
                                        {registrationCost ? formatBNB(registrationCost) : '---'} BNB
                                    </div>
                                    <div className="text-sm text-[#e30613] font-medium">
                                        ≈ {formatCurrency(usdCost)}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-3 mt-3">
                                <div className="text-sm text-[#e30613] space-y-1 font-medium italic">
                                    <div className="flex justify-between">
                                        <span>• 10% Sponsor Reward</span>
                                        <span>{formatCurrency(usdCost * 0.10)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>• 15% Layer Reward Distribution</span>
                                        <span>{formatCurrency(usdCost * 0.15)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>• 70% Matrix Propagation</span>
                                        <span>{formatCurrency(usdCost * 0.70)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>• 5% Pool Contribution</span>
                                        <span>{formatCurrency(usdCost * 0.05)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Register Button */}
                    {!isConnected ? (
                        <div className="text-center">
                            <p className="text-[#e30613] mb-4">Connect your wallet to register</p>
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
                                    className="text-[#e30613] hover:underline text-sm"
                                >
                                    View Transaction
                                </a>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleRegister}
                            disabled={isPending || isConfirming || isProcessing || !registrationCost}
                            className="w-full relative overflow-hidden bg-[#e30613] text-white py-4 rounded-full font-black text-xl shadow-[0_4px_15px_rgba(227,6,19,0.5),inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.2)] hover:scale-105 hover:shadow-[0_8px_25px_rgba(227,6,19,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 border border-red-500"
                        >
                            {isPending || isConfirming || isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    {isPending || isProcessing ? 'Confirm in wallet...' : 'Processing on-chain...'}
                                </>
                            ) : (
                                `Register for ${registrationCost ? formatBNB(registrationCost) : '...'} BNB`
                            )}
                        </button>
                    )}

                    {/* Error display */}
                    {registerError && (
                        <div className="mt-4 bg-red-500/20 border border-red-500/40 rounded-xl p-4 text-sm text-red-300">
                            <p className="font-semibold mb-1">Transaction failed:</p>
                            <p className="font-mono text-xs break-all">{(registerError as any).shortMessage || registerError.message}</p>
                        </div>
                    )}

                    {/* Info */}
                    <div className="mt-6 text-sm text-[#e30613] space-y-2">
                        <p>✓ Instant reward to your sponsor</p>
                        <p>✓ Automated matrix node placement</p>
                        <p>✓ Participate in 4 algorithmic flow streams</p>
                        <p>✓ Unlock layers anytime to expand rewards</p>
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
