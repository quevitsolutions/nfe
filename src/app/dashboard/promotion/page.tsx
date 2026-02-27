'use client';

import { useAccount } from 'wagmi';
import { useUserIdByAddress } from '@/lib/hooks/useContract';
import { useState, useEffect } from 'react';
import { Copy, Share2, CheckCheck, Link2, Users, Gift, Twitter, MessageCircle, Send } from 'lucide-react';

const BASE_URL = 'https://giclub.online';

export default function PromotionPage() {
    const { address, isConnected } = useAccount();
    const [isMounted, setIsMounted] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedId, setCopiedId] = useState(false);
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const { data: userData } = useUserIdByAddress(address);
    const userId = userData ? Number(userData) : 0;

    const referralLink = userId > 0 ? `${BASE_URL}/register?ref=${userId}` : `${BASE_URL}/register`;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const copyToClipboard = async (text: string, type: 'link' | 'id') => {
        try {
            await navigator.clipboard.writeText(text);
            if (type === 'link') {
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
            } else {
                setCopiedId(true);
                setTimeout(() => setCopiedId(false), 2000);
            }
        } catch {
            // Fallback for insecure context
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
    };

    const socialLinks = [
        {
            name: 'Twitter / X',
            icon: <Twitter className="w-5 h-5" />,
            color: 'from-sky-500 to-blue-600',
            href: `https://twitter.com/intent/tweet?text=Join%20Great%20Income%20Club%20and%20earn%20passive%20income%20through%20our%20decentralized%20network!%20Register%20here:%20${encodeURIComponent(referralLink)}`,
        },
        {
            name: 'WhatsApp',
            icon: <MessageCircle className="w-5 h-5" />,
            color: 'from-green-500 to-emerald-600',
            href: `https://wa.me/?text=${encodeURIComponent('Join Great Income Club and earn passive income through our decentralized network! Register here: ' + referralLink)}`,
        },
        {
            name: 'Telegram',
            icon: <Send className="w-5 h-5" />,
            color: 'from-blue-400 to-cyan-600',
            href: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join Great Income Club and earn passive income through our decentralized network!')}`,
        },
    ];

    const incomeCards = [
        {
            title: 'Direct Referral',
            desc: 'Earn instantly when someone joins using your referral link and registers.',
            icon: '💰',
            highlight: 'Instant payout',
        },
        {
            title: 'Level Income',
            desc: 'Earn from your level\'s entire matrix as your network grows deeper.',
            icon: '📈',
            highlight: 'Up to 18 levels',
        },
        {
            title: 'Binary Matrix',
            desc: 'Earn from both your left and right matrix trees. Unlimited depth.',
            icon: '🌲',
            highlight: 'Unlimited depth',
        },
        {
            title: 'Reward Pools',
            desc: 'Qualify for Bronze, Silver, Gold global reward pools as you upgrade.',
            icon: '🏆',
            highlight: '3 tier pools',
        },
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
                <Share2 className="w-8 h-8 text-yellow-400" />
                <h1 className="text-2xl md:text-3xl font-bold text-white">Promotion</h1>
            </div>

            {/* Your Referral ID Banner */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider font-medium">Your Referral ID</p>
                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                            #{userId > 0 ? userId : '—'}
                        </div>
                        <p className="text-gray-400 text-sm mt-2">
                            {userId > 0
                                ? 'Share your ID or link to start earning referral income.'
                                : 'Connect your wallet to get your referral ID.'}
                        </p>
                    </div>

                    {userId > 0 && (
                        <button
                            onClick={() => copyToClipboard(String(userId), 'id')}
                            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-all hover:scale-105"
                        >
                            {copiedId ? <CheckCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copiedId ? 'Copied!' : 'Copy ID'}
                        </button>
                    )}
                </div>
            </div>

            {/* Referral Link */}
            {userId > 0 && (
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                        <Link2 className="w-5 h-5 text-blue-400" />
                        <h2 className="text-lg font-bold text-white">Your Referral Link</h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 bg-black/30 rounded-xl p-4 border border-white/10 overflow-hidden">
                            <p className="text-sm text-blue-300 font-mono break-all">{referralLink}</p>
                        </div>
                        <button
                            onClick={() => copyToClipboard(referralLink, 'link')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${copiedLink
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white/10 hover:bg-white/20 text-white hover:scale-105'
                                }`}
                        >
                            {copiedLink ? <CheckCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copiedLink ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                </div>
            )}

            {/* Social Sharing */}
            {userId > 0 && (
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-4">Share On Social Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${social.color} text-white font-semibold hover:scale-105 transition-all shadow-lg`}
                            >
                                {social.icon}
                                Share on {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Income Overview */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Gift className="w-6 h-6 text-purple-400" />
                    <h2 className="text-xl font-bold text-white">What Your Referrals Earn You</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {incomeCards.map((card, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setActiveCard(i)}
                            onMouseLeave={() => setActiveCard(null)}
                            className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border transition-all cursor-default ${activeCard === i ? 'border-yellow-500/50 bg-white/10 scale-[1.01]' : 'border-white/10'
                                }`}
                        >
                            <div className="text-4xl mb-3">{card.icon}</div>
                            <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                            <p className="text-gray-400 text-sm mb-4">{card.desc}</p>
                            <div className="inline-block bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30">
                                {card.highlight}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-2 mb-6">
                    <Users className="w-6 h-6 text-green-400" />
                    <h2 className="text-xl font-bold text-white">How Referrals Work</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {[
                        { step: '1', title: 'Share', desc: 'Copy your referral link or ID above and share it anywhere.' },
                        { step: '2', title: 'They Register', desc: 'Your contact visits the link, connects wallet, and registers.' },
                        { step: '3', title: 'You Earn', desc: 'You immediately earn direct referral income. Future network growth earns you level and binary income too.' },
                    ].map((s) => (
                        <div key={s.step} className="flex-1 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-black text-xl mb-3 shadow-lg shadow-yellow-500/20">
                                {s.step}
                            </div>
                            <h3 className="text-white font-bold mb-1">{s.title}</h3>
                            <p className="text-gray-400 text-sm">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
