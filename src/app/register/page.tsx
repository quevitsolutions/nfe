'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatEther, parseEther } from 'ethers';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useUserInfo, useRegistrationCost, useRegister, useContractConfig, useIsRegistered } from '@/lib/hooks/useContract';
import { GENESIS_USER_ID, formatBNB, formatCurrency } from '@/lib/contract';

function RegisterContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { address, isConnected } = useAccount();

    const [referrerId, setReferrerId] = useState<number>(GENESIS_USER_ID);
    const [isProcessing, setIsProcessing] = useState(false);

    // Contract reads
    const { data: regCostData, isLoading: isCostLoading } = useRegistrationCost();
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

    // Calculate registration cost — use tier 1 cost directly (contract is 1-indexed)
    const registrationCost: bigint = (regCostData as bigint | undefined) ?? BigInt(0);
    const rawBnbPrice = config
        ? (Number((config as any)._bnbPrice ?? (config as any)[3]) || 0)
        : 0;
    const bnbPrice = rawBnbPrice > 0 ? rawBnbPrice / 1e8 : 600;
    const usdCost = (registrationCost && bnbPrice)
        ? (Number(registrationCost) / 1e18) * bnbPrice
        : 0;

    // Handle registration
    const handleRegister = async () => {
        if (!isConnected || !registrationCost || registrationCost === BigInt(0)) return;

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
        <div className="min-h-screen bg-brand-mint flex flex-col items-center justify-center p-4">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 text-slate-800 hover:text-brand-red transition-colors font-bold uppercase tracking-widest text-xs">
                        <ArrowLeft size={16} />
                        <span>Back</span>
                    </Link>
                    <Link href="/">
                        <img src="/aipcore-logo.svg" alt="AIPCore" className="h-10 w-auto" />
                    </Link>
                </div>
                <ConnectButton />
            </nav>

            {/* Registration Form */}
            <div className="max-w-2xl mx-auto px-6 py-12 w-full">
                <div className="relative overflow-hidden bg-white border border-brand-green/10 shadow-2xl rounded-[3rem] p-8 lg:p-12">
                    <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter italic text-brand-red">
                        AIP <span className="text-slate-800">finance</span>
                    </h1>
                    <p className="text-slate-500 mb-8 font-bold uppercase tracking-widest text-xs">Register your personal node logic</p>

                    {/* Referrer Info */}
                    <div className="bg-brand-mint/50 border border-brand-green/10 rounded-2xl p-6 mb-8">
                        <h3 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tighter">Node Sponsorship</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Sponsor ID:</span>
                            <span className="text-brand-green font-mono text-2xl font-black">{referrerId}</span>
                        </div>
                        {referrerId === GENESIS_USER_ID && (
                            <p className="text-sm text-brand-red font-bold mt-2 italic uppercase tracking-widest text-[10px]">
                                ✨ Root Node Sync
                            </p>
                        )}
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-brand-mint/50 border border-brand-green/10 rounded-2xl p-6 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-green/20" />
                        <h3 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tighter">Protocol Activation</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Activation Cost:</span>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-brand-green">
                                        {registrationCost ? formatBNB(registrationCost) : '---'} BNB
                                    </div>
                                    <div className="text-sm text-slate-400 font-bold">
                                        ≈ {formatCurrency(usdCost)}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-brand-green/10 pt-3 mt-3">
                                <div className="text-sm text-brand-green space-y-1 font-bold italic uppercase tracking-tighter text-[10px]">
                                    <div className="flex justify-between">
                                        <span>• 10% Direct Reward Logic</span>
                                        <span>{formatCurrency(usdCost * 0.10)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>• 15% Layer Distribution</span>
                                        <span>{formatCurrency(usdCost * 0.15)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>• 70% Matrix Propagation</span>
                                        <span>{formatCurrency(usdCost * 0.70)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>• 5% Ecosystem Contribution</span>
                                        <span>{formatCurrency(usdCost * 0.05)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Register Button */}
                    {!isConnected ? (
                        <div className="text-center">
                            <p className="text-brand-red mb-4 font-bold uppercase tracking-widest text-xs italic">Connect your wallet to synchronize node</p>
                            <ConnectButton />
                        </div>
                    ) : isSuccess ? (
                        <div className="bg-brand-green/10 border border-brand-green/20 rounded-2xl p-6 text-center">
                            <div className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tighter">Registration Successful!</h3>
                            <p className="text-brand-green font-bold mb-4 uppercase tracking-widest text-[10px]">Initializing Neural Dashboard...</p>
                            {hash && (
                                <a
                                    href={`https://bscscan.com/tx/${hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-brand-red font-bold hover:underline text-xs uppercase tracking-widest"
                                >
                                    View Logic on BscScan
                                </a>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleRegister}
                            disabled={isPending || isConfirming || isProcessing || registrationCost === BigInt(0) || isCostLoading}
                            className="w-full relative overflow-hidden bg-brand-red text-white py-5 rounded-full font-black text-xl shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest"
                        >
                            {isPending || isConfirming || isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    {isPending || isProcessing ? 'Confirm in wallet...' : 'Processing on-chain...'}
                                </>
                            ) : (
                                `${isCostLoading ? 'Loading cost...' : `Register for ${registrationCost > BigInt(0) ? formatBNB(registrationCost) : '...'} BNB`}`
                            )}
                        </button>
                    )}

                    {/* Error display */}
                    {registerError && (
                        <div className="mt-4 bg-red-50 border border-red-300 rounded-xl p-4 text-sm text-red-700">
                            <p className="font-semibold mb-1">Transaction failed:</p>
                            <p className="font-mono text-xs break-all">{(registerError as any).shortMessage || registerError.message}</p>
                        </div>
                    )}

                    {/* Info */}
                    <div className="mt-8 text-xs text-slate-400 space-y-2 font-bold uppercase tracking-widest italic">
                        <p className="flex items-center gap-2"><span className="text-brand-green text-lg">✓</span> Instant reward to your sponsor</p>
                        <p className="flex items-center gap-2"><span className="text-brand-green text-lg">✓</span> Automated matrix node placement</p>
                        <p className="flex items-center gap-2"><span className="text-brand-green text-lg">✓</span> Participate in 4 algorithmic streams</p>
                        <p className="flex items-center gap-2"><span className="text-brand-green text-lg">✓</span> Global neural sync enabled</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-brand-mint flex items-center justify-center">
                <div className="text-brand-green text-xl font-black animate-pulse uppercase tracking-[0.3em]">SYNCHRONIZING CORE DATA...</div>
            </div>
        }>
            <RegisterContent />
        </Suspense>
    );
}




