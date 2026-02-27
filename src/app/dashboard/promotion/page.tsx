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
            href: `https://twitter.com/intent/tweet?text=Join%20NodeFlow%20Engine%20and%20earn%20algorithmic%20rewards%20through%20our%20decentralized%20protocol!%20Register%20here:%20${encodeURIComponent(referralLink)}`,
        },
        {
            name: 'WhatsApp',
            icon: <MessageCircle className="w-5 h-5" />,
            color: 'from-green-500 to-emerald-600',
            href: `https://wa.me/?text=${encodeURIComponent('Join NodeFlow Engine and earn algorithmic rewards through our decentralized protocol! Register here: ' + referralLink)}`,
        },
        {
            name: 'Telegram',
            icon: <Send className="w-5 h-5" />,
            color: 'from-blue-400 to-cyan-600',
            href: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join NodeFlow Engine and earn algorithmic rewards through our decentralized protocol!')}`,
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
            highlight: 'Up to 25 Tiers',
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
        <div className="space-y-6">
            {/* Header section with Node link card */}
            <div className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-yellow-500/30">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-5xl font-black text-white">Share & Earn Rewards</h1>
                        <p className="text-gray-400 text-lg">Your Node is the gateway for others to join the network.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Node ID</h3>
                                <div className="text-3xl font-bold text-yellow-400">#{userId > 0 ? userId : '—'}</div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your Node Invitation Link</h3>
                                <div className="flex items-center gap-2 p-3 bg-black/40 rounded-xl border border-white/10 group">
                                    <div className="flex-1 font-mono text-sm text-gray-300 truncate">
                                        {referralLink || '---'}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(referralLink, 'link')}
                                        className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                                    >
                                        {copiedLink ? <CheckCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-1 gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${social.color} text-white font-bold hover:scale-[1.02] transition-all shadow-lg group`}
                                >
                                    <div className="flex items-center gap-3">
                                        {social.icon}
                                        <span>Share on {social.name}</span>
                                    </div>
                                    <Share2 className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Why promote section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-all">
                    <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-4 text-yellow-400 font-bold text-xl">10%</div>
                    <h3 className="text-xl font-bold text-white mb-2">Direct Reward</h3>
                    <p className="text-gray-400 text-sm">Earn an instant 10% direct reward whenever someone registers a new Node using your ID.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all">
                    <div className="w-12 h-12 bg-blue-400/10 rounded-xl flex items-center justify-center mb-4 text-blue-400 font-bold text-xl">17T</div>
                    <h3 className="text-xl font-bold text-white mb-2">Sponsorship Depth</h3>
                    <p className="text-gray-400 text-sm">Unlock up to 17 tiers of sponsorship rewards currently active on the protocol.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all">
                    <div className="w-12 h-12 bg-purple-400/10 rounded-xl flex items-center justify-center mb-4 text-purple-400 font-bold text-xl">70%</div>
                    <h3 className="text-xl font-bold text-white mb-2">Matrix Propagation</h3>
                    <p className="text-gray-400 text-sm">Benefit from automated matrix spillover as new nodes are placed in the binary structure.</p>
                </div>
            </div>

            {/* Reward Breakdown cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {incomeCards.map((card, i) => (
                    <div
                        key={i}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all"
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

            {/* How it works educational section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-8 text-center">How Sponsorship Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-white/10 -z-0"></div>

                    <div className="relative z-10 text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto text-black font-black text-2xl shadow-lg shadow-yellow-500/20">01</div>
                        <h4 className="text-lg font-bold text-white">Invite Nodes</h4>
                        <p className="text-gray-400 text-sm">Share your Link or Node ID with your community and network.</p>
                    </div>

                    <div className="relative z-10 text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto text-white font-black text-2xl shadow-lg shadow-blue-500/20">02</div>
                        <h4 className="text-lg font-bold text-white">Unlock Tiers</h4>
                        <p className="text-gray-400 text-sm">When your direct nodes unlock higher tiers, you receive instant rewards.</p>
                    </div>

                    <div className="relative z-10 text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto text-white font-black text-2xl shadow-lg shadow-pink-500/20">03</div>
                        <h4 className="text-lg font-bold text-white">Compound Rewards</h4>
                        <p className="text-gray-400 text-sm">Each time a node in your sponsorship network unlocks a tier, a reward is triggered.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
