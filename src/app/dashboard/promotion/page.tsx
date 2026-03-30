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
            color: 'from-slate-800 to-black',
            textColor: 'text-white',
            href: `https://twitter.com/intent/tweet?text=Join%20AIPCore%20Engine%20and%20earn%20algorithmic%20rewards%20through%20our%20decentralized%20protocol!%20Register%20here:%20${encodeURIComponent(referralLink)}`,
        },
        {
            name: 'WhatsApp',
            icon: <MessageCircle className="w-5 h-5" />,
            color: 'from-brand-green to-emerald-700',
            textColor: 'text-white',
            href: `https://wa.me/?text=${encodeURIComponent('Join AIPCore and earn algorithmic rewards through our decentralized protocol! Register here: ' + referralLink)}`,
        },
        {
            name: 'Telegram',
            icon: <Send className="w-5 h-5" />,
            color: 'from-blue-500 to-indigo-600',
            textColor: 'text-white',
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
            icon: '🎄',
            highlight: 'Unlimited depth',
        },
        {
            title: 'Reward Pools',
            desc: 'Qualify for multi-tier global reward pools as you evolve your node.',
            icon: '🏆',
            highlight: 'Global Rewards',
        },
    ];

    return (
        <div className="-m-6 p-6 min-h-[calc(100vh-48px)] bg-brand-mint text-foreground flex flex-col items-center">
            <div className="max-w-7xl w-full space-y-6">
            {/* Header section with Node link card */}
            <div className="relative overflow-hidden bg-white rounded-2xl p-6 md:p-10 border border-brand-green/10 shadow-2xl">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-5xl font-black text-brand-red uppercase tracking-tighter italic">Neural Growth</h1>
                        <p className="text-foreground font-black uppercase tracking-[0.2em] text-xs italic">Your Node is the gateway for network propagation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="bg-brand-mint border border-brand-green/10 rounded-3xl p-6 lg:p-8 space-y-5 shadow-sm">
                            <div>
                                <h3 className="text-xs font-black text-brand-blue uppercase tracking-widest mb-2 italic leading-none">Node Hierarchy ID</h3>
                                <div className="text-4xl font-black text-brand-green italic">#{userId > 0 ? userId : '—'}</div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs font-black text-foreground uppercase tracking-widest italic leading-none">Invite Token Link</h3>
                                <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-brand-green/10 group">
                                    <div className="flex-1 font-mono text-xs text-foreground font-bold truncate">
                                        {referralLink || '---'}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(referralLink, 'link')}
                                        className="p-2 bg-brand-mint text-brand-green rounded-lg hover:bg-brand-red hover:text-white transition-all shadow-sm"
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
                                    className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${social.color} ${social.textColor} font-black hover:-translate-y-1 transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_1px_1px_2px_rgba(255,255,255,0.3)] group`}
                                >
                                    <div className="flex items-center gap-3">
                                        {social.icon}
                                        <span className="drop-shadow-sm uppercase text-xs tracking-widest">Share on {social.name}</span>
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
                <div className="relative overflow-hidden bg-white rounded-2xl p-6 lg:p-8 border border-brand-green/10 shadow-2xl group hover:-translate-y-1 transition-all">
                    <div className="w-14 h-14 bg-brand-mint border border-brand-green/10 rounded-xl flex items-center justify-center mb-6 text-brand-green font-black text-xl italic">10%</div>
                    <h3 className="text-xl font-black text-foreground mb-2 italic">Direct Rewards</h3>
                    <p className="text-foreground font-bold text-xs italic">Earn instant rewards when others register using your Node ID.</p>
                </div>

                <div className="relative overflow-hidden bg-white rounded-2xl p-6 lg:p-8 border border-brand-green/10 shadow-2xl group hover:-translate-y-1 transition-all">
                    <div className="w-14 h-14 bg-brand-mint border border-brand-green/10 rounded-xl flex items-center justify-center mb-6 text-brand-green font-black text-xl italic">17L</div>
                    <h3 className="text-xl font-black text-foreground mb-2 italic">Network Depth</h3>
                    <p className="text-foreground font-bold text-xs italic">Unlock up to 17 layers of sponsorship rewards on the protocol.</p>
                </div>

                <div className="relative overflow-hidden bg-white rounded-2xl p-6 lg:p-8 border border-brand-green/10 shadow-2xl group hover:-translate-y-1 transition-all">
                    <div className="w-14 h-14 bg-brand-mint border border-brand-green/10 rounded-xl flex items-center justify-center mb-6 text-brand-green font-black text-xl italic">70%</div>
                    <h3 className="text-xl font-black text-foreground mb-2 italic">Matrix Yield</h3>
                    <p className="text-foreground font-bold text-xs italic">Benefit from automated matrix propagation in the binary system.</p>
                </div>
            </div>

            {/* Reward Breakdown cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {incomeCards.map((card, i) => {
                    const cardClass = i % 2 === 0 ? 'card-green' : 'card-red';
                    return (
                    <div
                        key={i}
                        className={`relative overflow-hidden ${cardClass} p-6 group hover:-translate-y-1 transition-all flex flex-col justify-between`}
                    >
                        <div className="text-4xl mb-3 drop-shadow-sm">{card.icon}</div>
                        <h3 className="text-lg font-black text-foreground mb-2 italic tracking-tight">{card.title}</h3>
                        <p className="text-foreground font-bold text-xs mb-4 italic leading-tight uppercase tracking-tight">{card.desc}</p>
                        <div className="inline-block bg-white text-foreground border border-brand-green/10 text-xs font-black uppercase tracking-widest px-3 py-1 rounded w-fit italic">
                            {card.highlight}
                        </div>
                    </div>
                    );
                })}
            </div>


            {/* How it works educational section */}
            <div className="relative overflow-hidden bg-white rounded-3xl p-8 md:p-12 mt-12 border border-brand-green/10 shadow-2xl text-center">
                <h2 className="text-3xl font-black text-brand-red mb-12 tracking-tighter uppercase italic">Neural Propagation</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-brand-green/10 -z-0"></div>

                    <div className="relative z-10 space-y-4 bg-brand-mint border border-brand-green/10 shadow-sm p-6 rounded-2xl">
                        <div className="w-20 h-20 bg-white border border-brand-green/10 rounded-full flex items-center justify-center mx-auto text-brand-green font-black text-3xl italic shadow-sm">1</div>
                        <h4 className="text-xs font-black text-brand-blue uppercase tracking-widest italic">Invite Hubs</h4>
                        <p className="text-foreground font-bold text-xs leading-relaxed italic uppercase">Broadcast your invitation link to your network hubs.</p>
                    </div>

                    <div className="relative z-10 space-y-4 bg-brand-mint border border-brand-green/10 shadow-sm p-6 rounded-2xl">
                        <div className="w-20 h-20 bg-white border border-brand-green/10 rounded-full flex items-center justify-center mx-auto text-brand-green font-black text-3xl italic shadow-sm">2</div>
                        <h4 className="text-xs font-black text-brand-blue uppercase tracking-widest italic">Trigger Layers</h4>
                        <p className="text-foreground font-bold text-xs leading-relaxed italic uppercase">Direct activations unlock higher-tier neural rewards.</p>
                    </div>

                    <div className="relative z-10 space-y-4 bg-brand-mint border border-brand-green/10 shadow-sm p-6 rounded-2xl">
                        <div className="w-20 h-20 bg-white border border-brand-green/10 rounded-full flex items-center justify-center mx-auto text-brand-green font-black text-3xl italic shadow-sm">3</div>
                        <h4 className="text-xs font-black text-brand-blue uppercase tracking-widest italic">Maximize Yield</h4>
                        <p className="text-foreground font-bold text-xs leading-relaxed italic uppercase">Depth propagation secures long-term matrix yields.</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}



