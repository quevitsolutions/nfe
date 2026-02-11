'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TrendingUp, Users, Wallet, ArrowUpCircle, Copy, Check } from 'lucide-react';
import { useUserInfo, useIncomeBreakdown, useContractConfig, useUserIdByAddress, useBnbPrice, useContractUserInfo } from '@/lib/hooks/useContract';
import { formatBNB, formatCurrency } from '@/lib/contract';
import Link from 'next/link';

export default function DashboardPage() {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    // Get user ID from connected wallet address
    const { data: userData } = useUserIdByAddress(address);
    const userId = userData && typeof userData === 'object' && 'id' in userData
        ? Number(userData.id)
        : 0;

    // Fetch user data
    const { data: config } = useContractConfig();
    const { data: userInfo } = useUserInfo(userId);
    const { data: detailsUserInfo } = useContractUserInfo(userId);
    const { data: incomeBreakdown } = useIncomeBreakdown(userId);
    const { data: currentBnbPrice } = useBnbPrice();

    // Calculate BNB price (use contract price or fallback)
    const bnbPrice = currentBnbPrice ? Number(currentBnbPrice) / 1e8 : 600;

    // Calculate total income in USD
    const totalIncomeBNB = incomeBreakdown
        ? Number(incomeBreakdown[0]) / 1e18
        : 0;
    const totalIncomeUSD = totalIncomeBNB * bnbPrice;

    // Referral link
    const referralLink = typeof window !== 'undefined'
        ? `${window.location.origin}/register?ref=${userId}`
        : '';

    const copyToClipboard = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else {
            // Fallback for non-HTTPS
            const textArea = document.createElement("textarea");
            textArea.value = referralLink;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const shareOnTwitter = () => {
        const text = 'Join Great Income Club and start earning passive income!';
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`, '_blank');
    };

    const shareOnTelegram = () => {
        const text = 'Join Great Income Club and start earning passive income!';
        window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        const text = `Join Great Income Club and start earning passive income! ${referralLink}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    // Handle wallet connection check with delay
    useEffect(() => {
        // Give wallet provider time to initialize
        const timer = setTimeout(() => {
            setIsLoading(false);
            if (!isConnected) {
                router.push('/');
            }
        }, 1000); // 1 second delay to allow wallet to connect

        return () => clearTimeout(timer);
    }, [isConnected, router]);

    // Show loading state while checking wallet connection
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
                    <p className="text-gray-300">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!isConnected) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* User ID */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <Users className="w-5 h-5" />
                        </span>
                        <span className="text-gray-400 font-medium">Profile</span>
                    </div>
                    <div className="space-y-1">
                        <div className="text-2xl font-bold text-white">ID: {userId}</div>
                        <div className="text-sm text-gray-400">
                            Referred By: <span className="text-yellow-400 font-mono">#{detailsUserInfo ? Number(detailsUserInfo[2]) : '...'}</span>
                        </div>
                    </div>
                </div>

                {/* Total Income */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-300 font-semibold">Total Income</h3>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {formatBNB(incomeBreakdown?.[0] || BigInt(0))} BNB
                    </div>
                    <div className="text-gray-400">
                        ≈ {formatCurrency(totalIncomeUSD)}
                    </div>
                </div>

                {/* Current Level */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
                            <Wallet className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-gray-300 font-semibold">Current Level</h3>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {userInfo ? userInfo[3].toString() : '---'}
                    </div>
                    <div className="text-gray-400">
                        of 25 levels
                    </div>
                </div>

                {/* Direct Team */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-3 rounded-xl">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-300 font-semibold">Direct Referrals</h3>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {userInfo ? userInfo[1].toString() : '0'}
                    </div>
                    <div className="text-gray-400">
                        Active members
                    </div>
                </div>

                {/* Matrix Balance */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-3 rounded-xl">
                            <ArrowUpCircle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-300 font-semibold">Matrix Position</h3>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        {userInfo ? userInfo[5].toString() : '---'}
                    </div>
                    <div className="text-gray-400">
                        Left / Right
                    </div>
                </div>

                {/* BNB Rate */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-300 font-semibold">BNB Rate</h3>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                        ${bnbPrice}
                    </div>
                    <div className="text-gray-400">
                        Fixed Rate
                    </div>
                </div>
            </div>



            {/* Income Breakdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Income Breakdown</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-gray-400 mb-1">Referral Income</div>
                        <div className="text-xl font-bold text-yellow-400">
                            {formatBNB(incomeBreakdown?.[1] || BigInt(0))} BNB
                        </div>
                        <div className="text-xs text-white font-medium">
                            {formatCurrency((Number(incomeBreakdown?.[1] || BigInt(0)) / 1e18) * bnbPrice)}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-gray-400 mb-1">Direct Income</div>
                        <div className="text-xl font-bold text-blue-400">
                            {formatBNB(incomeBreakdown?.[4] || BigInt(0))} BNB
                        </div>
                        <div className="text-xs text-white font-medium">
                            {formatCurrency((Number(incomeBreakdown?.[4] || BigInt(0)) / 1e18) * bnbPrice)}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-gray-400 mb-1">Level Income</div>
                        <div className="text-xl font-bold text-green-400">
                            {formatBNB(incomeBreakdown?.[2] || BigInt(0))} BNB
                        </div>
                        <div className="text-xs text-white font-medium">
                            {formatCurrency((Number(incomeBreakdown?.[2] || BigInt(0)) / 1e18) * bnbPrice)}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-gray-400 mb-1">Binary Income</div>
                        <div className="text-xl font-bold text-pink-400">
                            {formatBNB(incomeBreakdown?.[3] || BigInt(0))} BNB
                        </div>
                        <div className="text-xs text-white font-medium">
                            {formatCurrency((Number(incomeBreakdown?.[3] || BigInt(0)) / 1e18) * bnbPrice)}
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-sm text-gray-400 mb-1">Lost Income</div>
                        <div className="text-xl font-bold text-red-400">
                            {formatBNB(incomeBreakdown?.[5] || BigInt(0))} BNB
                        </div>
                        <div className="text-xs text-white font-medium">
                            {formatCurrency((Number(incomeBreakdown?.[5] || BigInt(0)) / 1e18) * bnbPrice)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/dashboard/upgrade"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 hover:scale-105 transition-transform"
                >
                    <h3 className="text-2xl font-bold text-black mb-2">Upgrade Level</h3>
                    <p className="text-black/80">Unlock higher earning potential</p>
                </Link>

                <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-4">Your Referral Link</h3>
                    <div className="bg-white/5 rounded-lg p-3 font-mono text-sm text-gray-300 break-all mb-4">
                        {referralLink || '---'}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={copyToClipboard}
                            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg font-semibold hover:scale-105 transition-transform"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    Copy Link
                                </>
                            )}
                        </button>

                        <button
                            onClick={shareOnTwitter}
                            className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                            title="Share on Twitter"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </button>

                        <button
                            onClick={shareOnTelegram}
                            className="px-4 py-2 bg-[#0088cc] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                            title="Share on Telegram"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                        </button>

                        <button
                            onClick={shareOnWhatsApp}
                            className="px-4 py-2 bg-[#25D366] text-white rounded-lg font-semibold hover:scale-105 transition-transform"
                            title="Share on WhatsApp"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
