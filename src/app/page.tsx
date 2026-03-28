'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useBalance } from 'wagmi';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CONTRACT_ADDRESSES, AIPCORE_ABI } from '@/lib/contract';

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
    <div className="relative overflow-hidden bg-[#0f1117] border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.4)] rounded-[2rem] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_20px_rgba(0,0,0,0.5)]">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 text-left flex justify-between items-center gap-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-tighter">{question}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-yellow-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-neural-gold shrink-0" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 text-neural-gold border-t border-white/5 pt-4 text-sm leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

/* ─── Neural Grid Background ─── */
const NeuralGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  </div>
);

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full bg-neural-gold/30 blur-sm animate-neural" style={style} />
);

export default function Home() {
  const { isConnected } = useAccount();
  const [scrollY, setScrollY] = useState(0);

  // ── Fetch real stats from smart contract ──
  const contractAddress = CONTRACT_ADDRESSES[56] as `0x${string}`;

  const { data: configData } = useReadContract({
    address: contractAddress,
    abi: AIPCORE_ABI,
    functionName: 'getConfig',
    chainId: 56,
  });

  const { data: contractBalance } = useBalance({
    address: contractAddress,
    chainId: 56,
  });

  // Parse real data with fallbacks
  const totalUsers = configData ? Number((configData as any[])[1]) : 0;
  const maxLevels = configData ? Number((configData as any[])[2]) : 18;
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
    { num: '2️⃣', title: 'Layers', desc: 'Each layer upgrade unlocks deeper reward layers within the hierarchy.' },
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
    { num: '01', title: 'Create Node', desc: 'Initialize your presence in the protocol by registering your Node ID.', color: 'from-red-400 to-rose-600' },
    { num: '02', title: 'Connect to Network', desc: 'Synchronize with your sponsor and join the global binary structure.', color: 'from-blue-400 to-purple-500' },
    { num: '03', title: 'Unlock Layers', desc: 'Propagate through the network by activating higher reward layers.', color: 'from-purple-400 to-pink-500' },
    { num: '04', title: 'Earn Algorithmic Rewards', desc: 'Receive on-chain rewards automatically as the engine processes flows.', color: 'from-red-500 to-rose-700' },
  ];

  const faqs = [
    { q: 'What is AIPCore?', a: 'AIPCore is a decentralized, on-chain community coordination protocol that distributes rewards algorithmically based on network expansion and participation.' },
    { q: 'Is it fully autonomous?', a: 'Yes. There is no manual payout and no admin interference in the reward logic. Everything is governed by immutable smart contracts on the BNB Smart Chain.' },
    { q: 'How do rewards flow?', a: 'The engine calculates flows based on node connections. When a node unlocks a layer, the smart contract immediately distributes rewards to qualified upline nodes.' },
    { q: 'What are the risks?', a: 'As an algorithmic protocol, rewards depend on network activity. Ensure you understand the mechanics of layers and matrix propagation before participating.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden font-sans">
      <NeuralGrid />

      {/* Animated background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neural-gold/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center"
        style={{ backdropFilter: 'blur(16px)', background: scrollY > 50 ? 'rgba(15,17,23,0.95)' : 'transparent', transition: 'background 0.3s', borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/aipcore-logo.svg" alt="AIPCore" className="h-12 w-auto drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]" />
        </Link>
        <div className="flex items-center gap-3">
          {isConnected && (
            <Link href="/dashboard" className="bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),_0_4px_8px_rgba(0,0,0,0.3)] border border-yellow-400/30 text-yellow-400 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95">
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
            <div className="flex justify-center mb-8">
              <img 
                src="/aipcore-logo.svg" 
                alt="AIP CORE" 
                className="h-32 w-auto drop-shadow-[0_0_25px_rgba(227,6,19,0.4)] animate-neural-slow" 
              />
            </div>

            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-red-400/30 bg-gradient-to-br from-red-400/20 to-red-400/5 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),_0_4px_8px_rgba(0,0,0,0.3)] backdrop-blur-md animate-neural">
              <span className="w-2 h-2 bg-[#e30613] rounded-full animate-ping" />
              <span className="text-[#e30613] text-sm font-semibold tracking-widest uppercase">Autonomous Node Network v4.0</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[1.05] mb-8 tracking-tighter">
              <span className="block text-white mb-2 uppercase drop-shadow-2xl">Connect To</span>
              <span className="bg-gradient-to-r from-neural-gold via-cyber-cyan to-white bg-clip-text text-transparent uppercase text-glow">AIPCore</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-[#e30613]/80 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
              AIPCore is a decentralized, on-chain community coordination protocol that distributes rewards <span className="text-white">algorithmically</span> based on network expansion and participation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register"
                className="w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-800 text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-[0_4px_15px_rgba(227,6,19,0.5),inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.2)] hover:scale-105 hover:shadow-[0_8px_25px_rgba(227,6,19,0.6)] transition-all border border-red-500 active:scale-95">
                Initialize Node →
              </Link>
              <a href={`https://bscscan.com/address/${contractAddress}`} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto relative overflow-hidden bg-[#0f1117] border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.4)] text-white px-10 py-5 rounded-[2rem] font-bold text-xl hover:scale-105 transition-all active:scale-95">
                View Contract
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ARCHITECTURE SECTION ── */}
      <section className="py-24 px-6 relative border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter text-glow">Protocol Architecture</h2>
            <p className="text-neural-gold text-lg font-medium">Sophisticated reward flows, simplified for participation.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {archItems.map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="relative overflow-hidden bg-[#0f1117] border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.4)] rounded-[2rem] p-8 h-full transition-all group hover:-translate-y-2 hover:shadow-[10px_10px_30px_rgba(0,0,0,0.6)] active:scale-[0.98]">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block drop-shadow-lg">{item.num}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-neural-gold leading-relaxed text-sm font-medium">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 px-6 relative bg-black/20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 100} className="text-center p-6 relative overflow-hidden bg-black/50 border border-white/10 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.6)] rounded-[2rem]">
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tighter text-glow drop-shadow-lg">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-neural-gold/80 text-[10px] font-black uppercase tracking-[0.2em]">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SIMPLE EXPLANATION ── */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-neural-gold to-cyber-cyan p-[1px] rounded-[3rem] overflow-hidden neural-glow">
          <div className="bg-[#0a0a0f] rounded-[2.9rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neural-gold/5 rounded-full blur-3xl animate-neural" />
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase text-glow">Trust the Logic.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full glass border-neural-gold/30 flex items-center justify-center text-neural-gold font-bold">✓</div>
                    <span className="text-lg text-gray-300">Every participant = <strong className="text-white">Neural Node</strong></span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full glass border-neural-gold/30 flex items-center justify-center text-neural-gold font-bold">✓</div>
                    <span className="text-lg text-gray-300">Nodes connect via Neural Links</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full glass border-neural-gold/30 flex items-center justify-center text-neural-gold font-bold">✓</div>
                    <span className="text-lg text-gray-300">On-chain compute distribution</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full glass border-neural-gold/30 flex items-center justify-center text-neural-gold font-bold">✓</div>
                    <span className="text-lg text-gray-300">Zero intervention. Pure Code.</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-neural-gold text-lg italic border-t border-white/10 pt-8 mt-8">
                "Autonomous On-Chain Community Reward Protocol"
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <FadeIn className="text-center mb-16">
          <span className="text-neural-gold font-mono text-xs uppercase tracking-[0.4em]">Protocol Sequencing</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 uppercase tracking-tighter text-glow">The Sync Process</h2>
        </FadeIn>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="relative overflow-hidden bg-[#0f1117] border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.4)] rounded-[2rem] p-8 h-full transition-all hover:-translate-y-2 hover:shadow-[10px_10px_30px_rgba(34,211,238,0.3)]">
                <div className={`text-xs font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-4 tracking-[0.2em] uppercase`}>PHASE {s.num}</div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{s.title}</h3>
                <p className="text-neural-gold text-sm leading-relaxed font-medium">{s.desc}</p>
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
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-neural-gold/5 blur-[150px] animate-neural" />
        <FadeIn className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase text-glow">
            Initialize Your <br />
            <span className="text-[#e30613]">Node.</span>
          </h2>
          <Link href="/register"
            className="inline-block relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-800 text-white px-12 py-6 rounded-[2rem] font-black text-2xl shadow-[0_4px_15px_rgba(227,6,19,0.5),inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.2)] hover:scale-105 hover:shadow-[0_8px_30px_rgba(227,6,19,0.7)] transition-all border border-red-500 active:scale-95">
            Sync To Network →
          </Link>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/aipcore-logo.svg" alt="AIPCore" className="h-10 w-auto" />
              <span className="text-2xl font-black text-white tracking-tighter uppercase">AIP CORE</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed font-medium">
              An autonomous coordination protocol for the decentralized neural community.
              Built on BNB Smart Chain. 100% on-chain compute distribution.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-60">Protocol</h4>
              <a href={`https://bscscan.com/address/${contractAddress}`} className="block text-white/80 hover:text-neural-gold transition-colors text-sm font-medium">On-Chain Logic</a>
              <Link href="/dashboard" className="block text-white/80 hover:text-neural-gold transition-colors text-sm font-medium">Global Dashboard</Link>
              <Link href="/register" className="block text-white/80 hover:text-neural-gold transition-colors text-sm font-medium">Node Registry</Link>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-60">Intelligence</h4>
              <Link href="/reference" className="block text-white/80 hover:text-neural-gold transition-colors text-sm font-medium">Briefing</Link>
              <Link href="/disclaimer" className="block text-white/80 hover:text-neural-gold transition-colors text-sm font-medium">Risk Constraints</Link>
              <Link href="/regulatory-compliance" className="block text-white/80 hover:text-neural-gold transition-colors text-sm font-medium">Compliance</Link>
              <Link href="/presentation" className="block text-white/80 hover:text-neural-gold transition-colors text-sm font-medium">Sync Technicals</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.2em] opacity-60">Neural Status</h4>
            <div className="bg-black/60 border-t border-l border-black/80 border-b border-r border-white/10 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.1)] p-5 rounded-2xl space-y-3">
              <div className="flex justify-between text-[10px] font-black tracking-widest uppercase">
                <span className="text-white/80">Node Sync</span>
                <span className="text-[#e30613]">ACTIVE</span>
              </div>
              <div className="flex justify-between text-[10px] font-black tracking-widest uppercase">
                <span className="text-white/80">Reward Flow</span>
                <span className="text-[#e30613]">NOMINAL</span>
              </div>
              <div className="flex justify-between text-[10px] font-black tracking-widest uppercase">
                <span className="text-white/80">Core Engine</span>
                <span className="text-cyber-cyan">AIPCORE v4.0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2025 AIPCORE PROTOCOL. OPERATIONAL DATA IS IMMUTABLE ON-CHAIN.</p>
          <div className="flex gap-8">
            <span>V4.0.1 CORE ENGINE</span>
            <span className="text-neural-gold">HIGH FIDELITY NODE MATRIX</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

