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
            href: `https://twitter.com/intent/tweet?text=Join%20AIPCore%20Engine%20and%20earn%20algorithmic%20rewards%20through%20our%20decentralized%20protocol!%20Register%20here:%20${encodeURIComponent(referralLink)}`,
        },
        {
            name: 'WhatsApp',
            icon: <MessageCircle className="w-5 h-5" />,
            color: 'from-green-500 to-emerald-600',
            href: `https://wa.me/?text=${encodeURIComponent('Join AIPCore and earn algorithmic rewards through our decentralized protocol! Register here: ' + referralLink)}`,
        },
        {
            name: 'Telegram',
            icon: <Send className="w-5 h-5" />,
            color: 'from-blue-400 to-cyan-600',
            href: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join AIPCore and earn algorithmic rewards through our decentralized protocol!')}`,
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
            highlight: 'Up to 24 Layers',
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
            highlight: '3 reward pools',
        },
    ];

    return (
        <div className="-m-6 p-6 min-h-[calc(100vh-48px)] bg-white text-gray-500 flex flex-col items-center">
            <div className="max-w-7xl w-full space-y-6">
            {/* Header section with Node link card */}
            <div className="relative overflow-hidden bg-slate-50 rounded-2xl p-6 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-5xl font-black text-[#e30613] uppercase tracking-wider [text-shadow:0_1px_1px_rgba(255,255,255,0.8)]">Share & Earn Rewards</h1>
                        <p className="text-gray-500 font-bold text-lg">Your Node is the gateway for others to join the network.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 space-y-5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
                            <div>
                                <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-2">Your Node ID</h3>
                                <div className="text-4xl font-black text-[#e30613] [text-shadow:0_1px_1px_rgba(255,255,255,0.8)]">#{userId > 0 ? userId : '—'}</div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">Your Node Invitation Link</h3>
                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl shadow-sm border border-slate-200 group">
                                    <div className="flex-1 font-mono text-sm text-gray-600 font-bold truncate">
                                        {referralLink || '---'}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(referralLink, 'link')}
                                        className="p-2 bg-red-50 text-[#e30613] border border-red-200 rounded-lg hover:bg-[#e30613] hover:text-white transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]"
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
                                    className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${social.color} text-white font-black hover:-translate-y-1 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_1px_1px_2px_rgba(255,255,255,0.3)] group`}
                                >
                                    <div className="flex items-center gap-3">
                                        {social.icon}
                                        <span className="drop-shadow-sm">Share on {social.name}</span>
                                    </div>
                                    <Share2 className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Why promote section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative overflow-hidden bg-slate-50 rounded-2xl p-6 lg:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] group hover:-translate-y-1 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center mb-6 text-amber-500 font-black text-xl">10%</div>
                    <h3 className="text-xl font-black text-gray-800 mb-2">Direct Reward</h3>
                    <p className="text-gray-500 font-bold text-sm">Earn an instant 10% direct reward whenever someone registers a new Node using your ID.</p>
                </div>

                <div className="relative overflow-hidden bg-[#f4f8f4] rounded-2xl p-6 lg:p-8 border border-[#c8e6c9] shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] group hover:-translate-y-1 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center mb-6 text-blue-500 font-black text-xl">17L</div>
                    <h3 className="text-xl font-black text-gray-800 mb-2">Sponsorship Depth</h3>
                    <p className="text-gray-500 font-bold text-sm">Unlock up to 17 layers of sponsorship rewards currently active on the protocol.</p>
                </div>

                <div className="relative overflow-hidden bg-[#f4f8f4] rounded-2xl p-6 lg:p-8 border border-[#c8e6c9] shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] group hover:-translate-y-1 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 bg-purple-50 border border-purple-200 rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center mb-6 text-purple-500 font-black text-xl">70%</div>
                    <h3 className="text-xl font-black text-gray-800 mb-2">Matrix Propagation</h3>
                    <p className="text-gray-500 font-bold text-sm">Benefit from automated matrix spillover as new nodes are placed in the binary structure.</p>
                </div>
            </div>

            {/* Reward Breakdown cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {incomeCards.map((card, i) => (
                    <div
                        key={i}
                        className="relative overflow-hidden bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] group hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                        <div className="text-4xl mb-3 drop-shadow-sm">{card.icon}</div>
                        <h3 className="text-lg font-black text-gray-800 mb-2">{card.title}</h3>
                        <p className="text-gray-500 font-bold text-sm mb-4">{card.desc}</p>
                        <div className="inline-block bg-amber-50 text-amber-600 border border-amber-200 text-xs font-black uppercase tracking-wider px-3 py-1 rounded">
                            {card.highlight}
                        </div>
                    </div>
                ))}
            </div>

            {/* How it works educational section */}
            <div className="relative overflow-hidden bg-slate-50 rounded-3xl p-8 md:p-12 mt-12 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] text-center">
                <h2 className="text-3xl font-black text-[#e30613] mb-12 tracking-wider uppercase [text-shadow:0_1px_1px_rgba(255,255,255,0.8)]">How Sponsorship Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-[#3f3f46] -z-0"></div>

                    <div className="relative z-10 space-y-4 bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
                        <div className="w-20 h-20 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto text-amber-500 font-black text-3xl shadow-[inset_1px_1px_3px_rgba(255,255,255,1)]">1</div>
                        <h4 className="text-lg font-black text-gray-800 uppercase tracking-widest">Invite Nodes</h4>
                        <p className="text-gray-500 font-bold text-sm leading-relaxed">Share your Link or Node ID with your community and network.</p>
                    </div>

                    <div className="relative z-10 space-y-4 bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
                        <div className="w-20 h-20 bg-blue-50 border-2 border-blue-200 rounded-full flex items-center justify-center mx-auto text-blue-500 font-black text-3xl shadow-[inset_1px_1px_3px_rgba(255,255,255,1)]">2</div>
                        <h4 className="text-lg font-black text-gray-800 uppercase tracking-widest">Unlock Layers</h4>
                        <p className="text-gray-500 font-bold text-sm leading-relaxed">When your direct nodes unlock higher layers, you receive instant rewards.</p>
                    </div>

                    <div className="relative z-10 space-y-4 bg-white border border-[#c8e6c9] shadow-sm p-6 rounded-2xl">
                        <div className="w-20 h-20 bg-rose-50 border-2 border-rose-200 rounded-full flex items-center justify-center mx-auto text-rose-500 font-black text-3xl shadow-[inset_1px_1px_3px_rgba(255,255,255,1)]">3</div>
                        <h4 className="text-lg font-black text-gray-800 uppercase tracking-widest">Compound Rewards</h4>
                        <p className="text-gray-500 font-bold text-sm leading-relaxed">Each time a node in your sponsorship network unlocks a layer, a reward is triggered.</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
