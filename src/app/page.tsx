'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useBalance } from 'wagmi';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Activity, Terminal, Shield, Cpu, Zap, Globe, BarChart3, Users } from 'lucide-react';
import { CONTRACT_ADDRESSES, AIPCORE_ABI } from '@/lib/contract';

/* â”€â”€â”€ Animated Counter â”€â”€â”€ */
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

/* â”€â”€â”€ Fade-in on Scroll â”€â”€â”€ */
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
    <div ref={ref} className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* â”€â”€â”€ FAQ Item â”€â”€â”€ */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`glass-card overflow-hidden transition-all duration-300 ${isOpen ? 'border-brand-amber/40 bg-brand-amber/5' : 'border-white/5'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 text-left flex justify-between items-center gap-4 group">
        <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-amber' : 'text-slate-300 group-hover:text-white'}`}>{question}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-brand-amber shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 text-slate-400 border-t border-white/5 pt-4 text-sm leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full bg-white/5 blur-sm animate-heartbeat" style={style} />
);

export default function Home() {
  const { isConnected } = useAccount();
  const [scrollY, setScrollY] = useState(0);

  // â”€â”€ Fetch real stats from smart contract â”€â”€
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
  ];

  const archItems = [
    { icon: <Cpu className="w-8 h-8 text-brand-blue" />, title: 'Nodes', desc: 'Each participant is assigned a unique Node ID in the global registry.', glow: 'glow-blue' },
    { icon: <Globe className="w-8 h-8 text-brand-blue" />, title: 'Layers', desc: 'Each layer upgrade unlocks deeper reward layers within the hierarchy.', glow: 'glow-blue' },
    { icon: <Terminal className="w-8 h-8 text-brand-blue" />, title: 'Flow Logic', desc: 'Contract distributes rewards algorithmically based on node connections.', glow: 'glow-blue' },
    { icon: <Shield className="w-8 h-8 text-brand-blue" />, title: 'Security', desc: 'Immutable smart contracts ensure zero bias and 100% autonomy.', glow: 'glow-blue' },
  ];

  const stats = [
    { label: 'Active Nodes', value: totalUsers, suffix: '', color: 'text-brand-blue' },
    { label: 'Network Value', value: Math.round(bnbDistributed * 100) / 100, suffix: ' BNB', color: 'text-brand-amber' },
    { label: 'Reward Layers', value: maxLevels, suffix: '', color: 'text-brand-green' },
    { label: 'Uptime', value: 100, suffix: '%', color: 'text-brand-blue' },
  ];

  const steps = [
    { num: '01', title: 'Create Node', desc: 'Register your Node ID and secure your spot in the protocol.', color: 'border-brand-green/30' },
    { num: '02', title: 'Neural Sync', desc: 'Connect with your sponsor to join the global structure.', color: 'border-brand-green/30' },
    { num: '03', title: 'Unlock Layers', desc: 'Activate reward flows by propagating through the network.', color: 'border-brand-green/30' },
    { num: '04', title: 'Auto-Earn', desc: 'Rewards flow directly to your wallet via on-chain compute.', color: 'border-brand-green/30' },
  ];

  const faqs = [
    { q: 'What is AIPCore?', a: 'AIPCore is a decentralized, on-chain community coordination protocol that distributes rewards algorithmically based on network expansion.' },
    { q: 'Is it fully autonomous?', a: 'Yes. There is no manual payout. Everything is governed by immutable smart contracts on the BNB Smart Chain.' },
    { q: 'How do rewards flow?', a: 'Rewards flow instantly from node to node based on connection logic, with zero intermediary delay.' },
    { q: 'What are the risks?', a: 'As an algorithmic protocol, rewards depend on network activity. Participate only with funds you are comfortable allocating.' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden font-sans selection:bg-brand-amber selection:text-black">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-brand-blue/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-[10%] right-[-15%] w-[50%] h-[50%] bg-brand-green/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-15%] left-[20%] w-[70%] h-[60%] bg-brand-amber/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-mesh-gradient opacity-20" />
      </div>

      {/* â”€â”€ NAVBAR â”€â”€ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-300 ${scrollY > 50 ? 'bg-[#020617]/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img src="/aipcore-logo.svg" alt="AIPCore" className="h-10 w-auto transition-all duration-300 drop-shadow-[0_0_20px_rgba(0,136,255,0.4)]" />
            <div className="absolute -inset-4 bg-brand-blue/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {isConnected && (
            <Link href="/dashboard" className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 group">
              <Activity className="w-4 h-4 text-brand-green group-hover:animate-pulse" />
              Dashboard
            </Link>
          )}
          <ConnectButton />
        </div>
      </nav>

      {/* â”€â”€ HERO â”€â”€ */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {particles.map((p, i) => <Particle key={i} style={{ width: p.width, height: p.height, top: p.top, left: p.left, animationDuration: p.animationDuration, animationDelay: p.animationDelay }} />)}

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-3 mb-10 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green"></span>
              </span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-brand-green/90">Autonomous Protocol Sync Active</span>
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black leading-[0.8] mb-12 tracking-tighter uppercase">
              <span className="block text-white drop-shadow-2xl">EVOLUTION OF</span>
              <span className="text-gradient-multi animate-neural-slow px-6 filter drop-shadow-[0_0_20px_rgba(0,136,255,0.3)]">CAPITAL</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
              AIPCORE is a decentralized node protocol that coordinates global capital flows <span className="text-brand-amber border-b-2 border-brand-amber/30 px-1 font-black">algorithmically</span> across a neural reward matrix.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/register"
                className="w-full sm:w-auto bg-brand-amber hover:bg-brand-amber/90 text-black px-14 py-6 rounded-full font-black text-xl shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:scale-105 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-4 group">
                <Zap className="w-6 h-6 fill-current group-hover:animate-bounce" />
                Initiate Sync
              </Link>
              <a href={`https://bscscan.com/address/${contractAddress}`} target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-14 py-6 rounded-full font-black text-xl hover:scale-105 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-4">
                <Terminal className="w-6 h-6 text-brand-blue" />
                Trace Logic
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* â”€â”€ ARCHITECTURE â”€â”€ */}
      <section className="py-32 px-6 relative bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter text-white">Protocol <span className="text-brand-blue filter drop-shadow-[0_0_15px_rgba(0,136,255,0.4)]">Architecture</span></h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-bold uppercase tracking-widest">Sophisticated on-chain reward flows powered by immutable neural logic.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {archItems.map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className={`glass-card p-12 h-full group ${item.glow} hover:bg-brand-blue/5`}>
                  <div className="mb-10 p-5 bg-white/5 rounded-3xl w-fit group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-5 tracking-tight uppercase text-white">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-bold uppercase text-[10px] tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ STATS â”€â”€ */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue/5 blur-3xl rounded-full" />
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 100} className="glass-card text-center p-8 border-white/5">
              <div className={`text-3xl md:text-5xl font-black mb-3 tracking-tighter ${s.color}`}>
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-slate-500 text-[11px] font-black uppercase tracking-[0.3em]">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* â”€â”€ HOW IT WORKS â”€â”€ */}
      <section id="how-it-works" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/5 blur-[120px] rounded-full" />
        <FadeIn className="text-center mb-24 relative z-10">
          <span className="text-brand-green font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">System Sequencing</span>
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">Protocol <span className="text-brand-green filter drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">Sync</span></h2>
        </FadeIn>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 150} className="relative">
              <div className={`glass-card p-12 h-full border-t-4 ${s.color} hover:bg-brand-green/5`}>
                <div className="text-6xl font-black text-white/10 mb-8 font-mono">{s.num}</div>
                <h3 className="text-2xl font-black text-white mb-5 tracking-tight uppercase">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed font-bold text-[10px] uppercase tracking-widest opacity-80">{s.desc}</p>
              </div>
              {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[2px] bg-gradient-to-r from-brand-green/20 to-transparent" />}
            </FadeIn>
          ))}
        </div>
      </section>

      {/* â”€â”€ FAQ â”€â”€ */}
      <section className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">F.A.Q</h2>
            <p className="text-slate-500 mt-4 font-bold tracking-widest uppercase text-sm">Everything you need to know about the neural core.</p>
          </FadeIn>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <FadeIn key={i} delay={i * 60}>
                <FAQItem question={f.q} answer={f.a} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ FINAL CTA â”€â”€ */}
      <section className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-amber/15 blur-[180px] rounded-full animate-pulse" />
        <FadeIn className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-[10rem] font-black text-white mb-16 tracking-tighter uppercase leading-none filter drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            JOIN THE <br />
            <span className="text-brand-amber">CORE.</span>
          </h2>
          <Link href="/register"
            className="inline-flex items-center gap-5 bg-brand-amber hover:bg-brand-amber/90 text-black px-20 py-8 rounded-full font-black text-2xl shadow-[0_0_60px_rgba(245,158,11,0.5)] hover:scale-110 transition-all active:scale-95 uppercase tracking-widest group">
            <Cpu className="w-10 h-10 group-hover:rotate-90 transition-transform duration-500" />
            Launch Interface
          </Link>
        </FadeIn>
      </section>

      {/* â”€â”€ FOOTER â”€â”€ */}
      <footer className="border-t border-white/5 py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-1 space-y-8">
            <div className="flex items-center gap-4">
              <img src="/aipcore-logo.svg" alt="AIPCore" className="h-10 w-auto brightness-200" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-bold uppercase tracking-tight">
              An autonomous coordination protocol for the decentralized neural community.
              Powered by immutable code on the BNB Smart Chain.
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em]">Protocol</h4>
            <div className="space-y-4">
              <a href={`https://bscscan.com/address/${contractAddress}`} className="block text-slate-500 hover:text-brand-amber transition-colors text-sm font-bold uppercase tracking-widest">Smart Contract</a>
              <Link href="/dashboard" className="block text-slate-500 hover:text-brand-amber transition-colors text-sm font-bold uppercase tracking-widest">Global Matrix</Link>
              <Link href="/register" className="block text-slate-500 hover:text-brand-amber transition-colors text-sm font-bold uppercase tracking-widest">Node Registry</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em]">Documentation</h4>
            <div className="space-y-4">
              <Link href="/reference" className="block text-slate-500 hover:text-brand-amber transition-colors text-sm font-bold uppercase tracking-widest">Technical Brief</Link>
              <Link href="/disclaimer" className="block text-slate-500 hover:text-brand-amber transition-colors text-sm font-bold uppercase tracking-widest">Risk Guard</Link>
              <Link href="/regulatory-compliance" className="block text-slate-500 hover:text-brand-amber transition-colors text-sm font-bold uppercase tracking-widest">Compliance</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em]">Node Status</h4>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-[11px] font-black tracking-widest uppercase">
                <span className="text-slate-500">Node Sync</span>
                <span className="text-brand-green flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-ping" />
                  ACTIVE
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black tracking-widest uppercase">
                <span className="text-slate-500">Reward Flow</span>
                <span className="text-brand-amber">NOMINAL</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black tracking-widest uppercase py-3 border-t border-white/5">
                <span className="text-slate-500">Engine V4.1</span>
                <span className="text-brand-blue">STABLE</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-600 font-black tracking-[0.3em] uppercase">
          <p>Â© 2026 AIPCORE FINANCE. MULTI-COLOR NODE PROTOCOL.</p>
          <div className="flex gap-10">
            <span className="hover:text-brand-amber transition-colors cursor-help">BNB_SMART_CHAIN_NATIVE</span>
            <span className="text-brand-amber">SECURE_NEURAL_LINK</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
