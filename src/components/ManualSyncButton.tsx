'use client';

import { useState } from 'react';
import { RefreshCw, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import CONTRACT_ADDRESSES from '@/config/contracts.json';

const IS_MAINNET = process.env.NEXT_PUBLIC_USE_MAINNET === 'true';
const ADDRESSES = IS_MAINNET ? CONTRACT_ADDRESSES.mainnet : CONTRACT_ADDRESSES.testnet;

const REWARDPOOL_ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nodeId",
                "type": "uint256"
            }
        ],
        "name": "registerNode",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;

interface ManualSyncButtonProps {
    nodeId: number;
    missingRequirements?: string;
    isQualifiedForNext?: boolean;
}

export function ManualSyncButton({ nodeId, missingRequirements, isQualifiedForNext }: ManualSyncButtonProps) {
    const [status, setStatus] = useState<'idle' | 'checking' | 'ineligible' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    
    const { writeContractAsync, data: txHash } = useWriteContract();

    // Wait for blockchain confirmation
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: txHash,
    });

    const handleSync = async () => {
        if (!nodeId) return;
        setStatus('checking');
        setErrorMessage('');
        
        try {
            if (isQualifiedForNext === false && missingRequirements) {
                setStatus('ineligible');
                setErrorMessage(`Missing Requirements: ${missingRequirements}`);
                setTimeout(() => setStatus('idle'), 8000);
                return;
            }

            await writeContractAsync({
                address: ADDRESSES.RewardPool as `0x${string}`,
                abi: REWARDPOOL_ABI,
                functionName: 'registerNode',
                args: [BigInt(nodeId)],
            });
            
            setStatus('success');
            setTimeout(() => setStatus('idle'), 10000);
            
        } catch (error: any) {
            console.error('Manual sync error:', error);
            if (error.message?.includes('qualification criteria') || error.message?.includes('Gas') || error.message?.includes('revert')) {
                setStatus('ineligible');
                setErrorMessage(missingRequirements ? `Missing Requirements: ${missingRequirements}` : 'The protocol has not detected your eligibility for the next tier yet.');
            } else {
                setStatus('error');
                setErrorMessage('Transaction failed or rejected by wallet.');
            }
            setTimeout(() => setStatus('idle'), 8000);
        }
    };

    const isPending = status === 'checking' || isConfirming;

    return (
        <div className="flex flex-col gap-3 w-full">
            <button
                onClick={handleSync}
                disabled={isPending || status === 'success' || isConfirmed}
                className={`w-full relative flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden border ${
                    status === 'success' || isConfirmed 
                    ? 'bg-emerald-500 text-white border-emerald-400' 
                    : status === 'ineligible' || status === 'error'
                    ? 'bg-rose-500 text-white border-rose-400Shadow-rose-500/20'
                    : 'bg-white border-slate-100 text-[#1b5e20] hover:bg-slate-50 shadow-slate-100'
                }`}
            >
                {isPending ? (
                    <>
                        <RefreshCw className="w-5 h-5 animate-spin relative z-10" />
                        <span className="relative z-10">{isConfirming ? 'Finalizing...' : 'Sychronizing...'}</span>
                    </>
                ) : status === 'success' || isConfirmed ? (
                    <>
                        <CheckCircle2 className="w-5 h-5 text-white relative z-10" />
                        <span className="relative z-10">Synced Successfully</span>
                    </>
                ) : status === 'ineligible' || status === 'error' ? (
                    <>
                        <ShieldAlert className="w-5 h-5 text-white relative z-10" />
                        <span className="relative z-10">Criteria Conflict</span>
                    </>
                ) : (
                    <>
                        <Zap className="w-5 h-5 text-[#1b5e20] relative z-10 group-hover:scale-110 transition-transform" />
                        <span className="relative z-10">Manual Protocol Sync</span>
                    </>
                )}
            </button>
            {errorMessage && (
                <div className="text-[10px] text-rose-500 font-bold bg-rose-50 rounded-2xl p-4 text-center border border-rose-100 animate-in slide-in-from-top-2">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
