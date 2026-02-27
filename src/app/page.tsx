'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useBalance } from 'wagmi';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CONTRACT_ADDRESSES, GREAT_INCOME_CLUB_ABI } from '@/lib/contract';

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Fade-in on Scroll ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── FAQ Item ─── */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all hover:border-yellow-500/30">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 text-left flex justify-between items-center gap-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-tighter">{question}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-yellow-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4 text-sm leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

/* ─── Floating Particle ─── */
const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full bg-yellow-400/20 blur-sm animate-ping" style={style} />
);

export default function Home() {
  const { isConnected } = useAccount();
  const [scrollY, setScrollY] = useState(0);

  // ── Fetch real stats from smart contract ──
  const contractAddress = CONTRACT_ADDRESSES[56] as `0x${string}`;

  const { data: configData } = useReadContract({
    address: contractAddress,
    abi: GREAT_INCOME_CLUB_ABI,
    functionName: 'getConfig',
    chainId: 56,
  });

  const { data: contractBalance } = useBalance({
    address: contractAddress,
    chainId: 56,
  });

  // Parse real data with fallbacks
  const totalUsers = configData ? Number((configData as any[])[1]) : 0;
  const maxLevels = configData ? Number((configData as any[])[2]) : 25;
  const bnbDistributed = contractBalance ? parseFloat(contractBalance.formatted) : 0;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const particles = [
    { width: 8, height: 8, top: '15%', left: '10%', animationDuration: '3s', animationDelay: '0s' },
    { width: 12, height: 12, top: '25%', left: '85%', animationDuration: '4s', animationDelay: '0.5s' },
    { width: 6, height: 6, top: '60%', left: '5%', animationDuration: '5s', animationDelay: '1s' },
    { width: 10, height: 10, top: '75%', left: '90%', animationDuration: '3.5s', animationDelay: '1.5s' },
    { width: 14, height: 14, top: '40%', left: '50%', animationDuration: '6s', animationDelay: '0.2s' },
    { width: 7, height: 7, top: '85%', left: '30%', animationDuration: '4.5s', animationDelay: '0.8s' },
    { width: 9, height: 9, top: '10%', left: '65%', animationDuration: '3.8s', animationDelay: '1.2s' },
    { width: 5, height: 5, top: '50%', left: '20%', animationDuration: '5.5s', animationDelay: '0.3s' },
  ];

  const archItems = [
    { num: '1️⃣', title: 'Nodes', desc: 'Each participant is assigned a unique Node ID in the global registry.' },
    { num: '2️⃣', title: 'Layers', desc: 'Each tier upgrade unlocks deeper reward layers within the hierarchy.' },
    { num: '3️⃣', title: 'Flow Logic', desc: 'Contract distributes Direct, Layer, and Matrix rewards algorithmically.' },
    { num: '4️⃣', title: 'Price Oracle', desc: 'BNB costs auto-update via USD-pegged oracles for stability.' },
  ];

  const stats = [
    { label: 'Active Nodes', value: totalUsers, suffix: '' },
    { label: 'Network Value', value: Math.round(bnbDistributed * 100) / 100, suffix: ' BNB' },
    { label: 'Reward Layers', value: maxLevels, suffix: '' },
    { label: 'Uptime', value: 100, suffix: '%' },
  ];

  const steps = [
    { num: '01', title: 'Create Node', desc: 'Initialize your presence in the protocol by registering your Node ID.', color: 'from-yellow-400 to-orange-500' },
    { num: '02', title: 'Connect to Network', desc: 'Synchronize with your sponsor and join the global binary structure.', color: 'from-blue-400 to-purple-500' },
    { num: '03', title: 'Unlock Layers', desc: 'Propagate through the network by activating higher reward tiers.', color: 'from-purple-400 to-pink-500' },
    { num: '04', title: 'Earn Algorithmic Rewards', desc: 'Receive on-chain rewards automatically as the engine processes flows.', color: 'from-green-400 to-emerald-500' },
  ];

  const faqs = [
    { q: 'What is NodeFlow Engine?', a: 'NodeFlow Engine is a decentralized, on-chain community coordination protocol that distributes rewards algorithmically based on network expansion and participation.' },
    { q: 'Is it fully autonomous?', a: 'Yes. There is no manual payout and no admin interference in the reward logic. Everything is governed by immutable smart contracts on the BNB Smart Chain.' },
    { q: 'How do rewards flow?', a: 'The engine calculates flows based on node connections. When a node unlocks a layer, the smart contract immediately distributes rewards to qualified upline nodes.' },
    { q: 'What are the risks?', a: 'As an algorithmic protocol, rewards depend on network activity. Ensure you understand the mechanics of layers and matrix propagation before participating.' },
  ];

  return (
    <div className="min-h-screen bg-[#060612] text-white overflow-x-hidden">

      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center"
        style={{ backdropFilter: 'blur(16px)', background: scrollY > 50 ? 'rgba(6,6,18,0.85)' : 'transparent', transition: 'background 0.3s', borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
        <Link href="/" className="flex items-center gap-3">
          <img src="/nfe-logo.png" alt="NodeFlow Engine" className="h-10 w-auto" style={{ filter: 'drop-shadow(0 0 10px rgba(250,204,21,0.5))' }} />
          <span className="text-xl font-black tracking-tighter hidden sm:block uppercase">NODEFLOW <span className="text-yellow-400">ENGINE</span></span>
        </Link>
        <div className="flex items-center gap-3">
          {isConnected && (
            <Link href="/dashboard" className="bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/20 text-yellow-400 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105">
              Dashboard →
            </Link>
          )}
          <ConnectButton showBalance={{ smallScreen: false, largeScreen: true }} accountStatus="address" />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
        {particles.map((p, i) => <Particle key={i} style={{ width: p.width, height: p.height, top: p.top, left: p.left, animationDuration: p.animationDuration, animationDelay: p.animationDelay }} />)}

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
              <span className="text-yellow-300 text-sm font-semibold tracking-widest uppercase">Autonomous On-Chain Protocol</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[1.05] mb-8 tracking-tighter">
              <span className="block text-white mb-2 uppercase">What Is</span>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-200 bg-clip-text text-transparent uppercase">NodeFlow Engine?</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
              NodeFlow Engine is a decentralized, on-chain community coordination protocol that distributes rewards <span className="text-white">algorithmically</span> based on network expansion and participation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register"
                className="w-full sm:w-auto bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_50px_rgba(250,204,21,0.5)] transition-all hover:-translate-y-1">
                Join NodeFlow →
              </Link>
              <a href={`https://bscscan.com/address/${contractAddress}`} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all">
                View Contract
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ARCHITECTURE SECTION ── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Protocol Architecture</h2>
            <p className="text-gray-400 text-lg">Sophisticated reward flows, simplified for participation.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {archItems.map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full hover:border-yellow-500/50 transition-all group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.num}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6 bg-black">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 100} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-yellow-400/60 text-xs font-bold uppercase tracking-widest">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SIMPLE EXPLANATION ── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-400 to-orange-600 rounded-[3rem] p-1 overflow-hidden">
          <div className="bg-[#060612] rounded-[2.9rem] p-8 md:p-16 text-center space-y-8">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Trust the Engine.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">✓</div>
                    <span className="text-lg text-gray-300">Every participant = a <strong className="text-white">Node</strong></span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">✓</div>
                    <span className="text-lg text-gray-300">Nodes connect via referrals</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">✓</div>
                    <span className="text-lg text-gray-300">On-chain reward flow transparency</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">✓</div>
                    <span className="text-lg text-gray-300">No manual payouts. No admin delay.</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-gray-400 text-lg italic border-t border-white/10 pt-8 mt-8">
                "Autonomous On-Chain Community Reward Protocol"
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <FadeIn className="text-center mb-16">
          <span className="text-yellow-400 font-mono text-sm uppercase tracking-[0.3em]">Operational Flow</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 uppercase tracking-tighter">How NodeFlow Works</h2>
        </FadeIn>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 h-full">
                <div className={`text-sm font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-4 tracking-tighter uppercase`}>Step {s.num}</div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 uppercase tracking-tighter">Intelligence Briefing</h2>
        </FadeIn>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * 60}>
              <FAQItem question={f.q} answer={f.a} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 px-6 text-center">
        <FadeIn className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase">
            Initialize Your <br />
            <span className="text-yellow-400">Flow.</span>
          </h2>
          <Link href="/register"
            className="inline-block bg-white text-black px-12 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl">
            Register Node →
          </Link>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/nfe-logo.png" alt="NFE" className="h-12 w-auto" />
              <span className="text-2xl font-black text-white tracking-tighter">NODEFLOW</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              An autonomous coordination protocol for the decentralized community.
              Built on BNB Smart Chain. 100% on-chain distribution logic.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest">Protocol</h4>
              <a href={`https://bscscan.com/address/${contractAddress}`} className="block text-gray-500 hover:text-white transition-colors text-sm">On-Chain Logic</a>
              <Link href="/dashboard" className="block text-gray-500 hover:text-white transition-colors text-sm">Global Dashboard</Link>
              <Link href="/register" className="block text-gray-500 hover:text-white transition-colors text-sm">Node Registry</Link>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest">Documents</h4>
              <Link href="/disclaimer" className="block text-gray-500 hover:text-white transition-colors text-sm">Risk Disclosure</Link>
              <Link href="/presentation" className="block text-gray-500 hover:text-white transition-colors text-sm">Flow Technicals</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Network Status</h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Node Sync</span>
                <span className="text-green-400 font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Reward Flow</span>
                <span className="text-green-400 font-bold">AUTOMATED</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">BNB Pricing</span>
                <span className="text-blue-400 font-bold">ORACLE SYNCED</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2025 NODEFLOW ENGINE PROTOCOL. OPERATIONAL DATA IS IMMUTABLE ON-CHAIN.</p>
          <div className="flex gap-8">
            <span>V4.0.1 CORE ENGINE</span>
            <span className="text-gray-400">HIGH FIDELITY NODE MATRIX</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
