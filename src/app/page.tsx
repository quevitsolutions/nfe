'use client';

import { useState, useEffect, useRef } from 'react';
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
        <h3 className="text-lg font-bold text-white">{question}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-yellow-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4">{answer}</div>
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

  const incomeStreams = [
    { icon: '⚡', title: 'Direct Bonus', pct: '10%', desc: 'Instant 10% on every direct referral — paid immediately to your wallet.' },
    {
      icon: '🌊', title: 'Level Income', pct: '25 Levels', desc: 'Earn commissions up to 25 levels deep from your team\u0027s activity.'
    },
    { icon: '🔁', title: 'Matrix Income', pct: '70%', desc: 'Binary matrix spillover — earn even without direct referrals.' },
    { icon: '🏆', title: 'Reward Pools', pct: '5%', desc: 'Global revenue pools shared among top performers and achievers.' },
  ];

  const stats = [
    { label: 'Active Members', value: totalUsers, suffix: '+' },
    { label: 'BNB in Contract', value: Math.round(bnbDistributed * 100) / 100, suffix: '' },
    { label: 'Levels Available', value: maxLevels, suffix: '' },
    { label: 'Contract Uptime', value: 100, suffix: '%' },
  ];

  const steps = [
    { num: '01', title: 'Connect Wallet', desc: 'Link your BSC wallet securely. No central authority, no sign-up forms.', color: 'from-yellow-500 to-orange-500' },
    { num: '02', title: 'Join the Club', desc: 'Register with a sponsor and enter the network on Level 1.', color: 'from-blue-500 to-cyan-500' },
    { num: '03', title: 'Grow & Earn', desc: 'Refer members, upgrade levels, and earn across 5 income streams.', color: 'from-purple-500 to-pink-500' },
  ];

  const faqs = [
    { q: 'Is this a scam?', a: 'No. The entire system runs on a verified BSC smart contract. All logic is open-source and auditable on BscScan. Funds flow directly between wallets — there is no central pool we can touch.' },
    { q: 'How much can I earn?', a: 'Earnings depend on your activity level. Direct bonuses are 10% of referral entry cost. Level income pays across 25 levels. Matrix and pool rewards are additional passive streams.' },
    { q: 'Do I need to refer others?', a: 'No. The binary matrix provides spillover from upline activity. However, referring others significantly multiplies your income potential.' },
    { q: 'What blockchain is this on?', a: 'BNB Smart Chain (BSC) Mainnet. Transactions are fast and fees are low.' },
    { q: 'Can I withdraw anytime?', a: 'Yes. All earnings are sent directly to your connected wallet by the smart contract. There are no lock-up periods.' },
  ];

  return (
    <div className="min-h-screen bg-[#060612] text-white overflow-x-hidden">

      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-yellow-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center"
        style={{ backdropFilter: 'blur(16px)', background: scrollY > 50 ? 'rgba(6,6,18,0.85)' : 'transparent', transition: 'background 0.3s', borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
        <Link href="/" className="flex items-center gap-2">
          <img src="/giclub-logo.svg" alt="GICLUB Intelligence Network" className="h-14 w-auto" style={{ filter: 'drop-shadow(0 0 14px rgba(250,204,21,0.5))' }} />
        </Link>
        <div className="flex items-center gap-3">
          {isConnected && (
            <Link href="/dashboard" className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105">
              Dashboard →
            </Link>
          )}
          <ConnectButton showBalance={{ smallScreen: false, largeScreen: true }} accountStatus="address" />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
        {/* Floating particles */}
        {particles.map((p, i) => <Particle key={i} style={{ width: p.width, height: p.height, top: p.top, left: p.left, animationDuration: p.animationDuration, animationDelay: p.animationDelay }} />)}

        {/* 3D Logo Background Circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '-5%' }}>
          {/* Outer glow ring */}
          <div className="absolute w-[650px] h-[650px] rounded-full animate-spin" style={{
            animationDuration: '40s',
            background: 'conic-gradient(from 0deg, rgba(250,204,21,0.08), rgba(234,88,12,0.05), rgba(250,204,21,0.08), rgba(168,85,247,0.05), rgba(250,204,21,0.08))',
            boxShadow: '0 0 80px rgba(250,204,21,0.1), inset 0 0 80px rgba(250,204,21,0.05)',
          }} />
          {/* Mid glow ring */}
          <div className="absolute w-[550px] h-[550px] rounded-full border border-yellow-500/10 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
          {/* Inner radial gradient */}
          <div className="absolute w-[500px] h-[500px] rounded-full" style={{
            background: 'radial-gradient(circle, rgba(250,204,21,0.06) 0%, rgba(234,88,12,0.03) 40%, transparent 70%)',
          }} />
          {/* Logo centered in circle */}
          <div className="absolute w-[320px] h-[320px] rounded-full flex items-center justify-center animate-pulse" style={{
            animationDuration: '4s',
            background: 'radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)',
            boxShadow: '0 0 120px rgba(250,204,21,0.15), 0 0 60px rgba(234,88,12,0.1)',
          }}>
            <img src="/logo.svg" alt="" className="w-48 h-48 opacity-15" style={{
              filter: 'drop-shadow(0 0 40px rgba(250,204,21,0.6)) drop-shadow(0 0 80px rgba(234,88,12,0.4))',
            }} />
          </div>
          {/* Spinning accent ring */}
          <div className="absolute w-[580px] h-[580px] rounded-full border border-dashed border-yellow-500/5 animate-spin" style={{ animationDuration: '60s' }} />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm animate-bounce" style={{ animationDuration: '3s' }}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <span className="text-yellow-300 text-sm font-semibold tracking-wider">🚀 Live on BSC Mainnet</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[1.05] mb-6">
            <span className="block text-white" style={{ textShadow: '0 0 60px rgba(255,255,255,0.15)' }}>Together We Grow.</span>
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 30px rgba(250,204,21,0.4))' }}>
              Together We Win.
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            A transparent, decentralized ecosystem that distributes <strong className="text-white">100% of revenue</strong> back to the community via smart contract.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register"
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-8 py-4 rounded-full font-black text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">🚀 Join Now <span className="group-hover:translate-x-1 transition-transform inline-block">→</span></span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <a href="#how-it-works"
              className="group bg-white/5 backdrop-blur-md border border-white/15 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-2">
              How It Works <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6 border-y border-white/5 bg-white/2">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 100} className="text-center">
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-yellow-400 font-mono text-sm uppercase tracking-[0.3em]">Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">How It Works</h2>
        </FadeIn>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="group relative bg-white/3 border border-white/8 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
                <div className={`text-6xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-4 opacity-30 group-hover:opacity-60 transition-opacity`}>{s.num}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Presentation CTA */}
        <FadeIn className="text-center mt-12">
          <Link
            href="/presentation"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-8 py-4 rounded-full font-black text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105 active:scale-95"
          >
            🎬 View Full Interactive Presentation <span className="text-xl">→</span>
          </Link>
          <p className="text-gray-500 text-sm mt-3">Income calculator, level guide &amp; more</p>
        </FadeIn>
      </section>

      {/* ── INCOME STREAMS ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-900/10 to-transparent">
        <FadeIn className="text-center mb-16">
          <span className="text-blue-400 font-mono text-sm uppercase tracking-[0.3em]">Earnings</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">5 Income Streams</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">All powered by immutable on-chain logic. Nothing can be changed. Everything verifiable.</p>
        </FadeIn>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {incomeStreams.map((item, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="group h-full bg-white/3 border border-white/8 rounded-3xl p-6 flex flex-col gap-4 hover:border-yellow-500/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-500/10 cursor-default">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <div className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">{item.pct}</div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">{item.desc}</p>
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Presentation Link */}
        <FadeIn className="text-center mt-10">
          <Link
            href="/presentation"
            className="inline-flex items-center gap-2 border border-yellow-500/40 text-yellow-400 px-7 py-3 rounded-full font-bold hover:bg-yellow-500/10 transition-all hover:scale-105 text-sm"
          >
            📊 Explore All Income Streams in Detail →
          </Link>
        </FadeIn>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <span className="text-purple-400 font-mono text-sm uppercase tracking-[0.3em]">Why GICLUB</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-8">Built Different. <br />Built Transparent.</h2>
            <div className="space-y-4">
              {[
                { icon: '🔒', title: 'Immutable Smart Contract', desc: 'Deployed on BSC Mainnet. Code cannot be changed or rugged.' },
                { icon: '⚡', title: 'Instant Payouts', desc: 'Earnings transfer directly to your wallet — zero delay, zero middlemen.' },
                { icon: '🌐', title: 'Truly Decentralized', desc: 'No central server. No account creation. Just your wallet.' },
                { icon: '📊', title: 'Full Transparency', desc: 'All transactions are public on BscScan. Auditable by anyone.' },
              ].map((f, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="flex gap-4 items-start p-4 rounded-2xl bg-white/3 border border-white/6 hover:border-white/15 transition-all group">
                    <div className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 group-hover:scale-110 transition-transform shrink-0">{f.icon}</div>
                    <div>
                      <div className="font-bold text-white">{f.title}</div>
                      <div className="text-gray-400 text-sm mt-1">{f.desc}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="relative">
              {/* Glowing card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 rounded-3xl blur-xl opacity-20 animate-pulse" />
              <div className="relative bg-[#0d0d1a] border border-white/10 rounded-3xl p-8 md:p-10">
                <div className="text-center mb-8">
                  <img src="/logo.svg" alt="GICLUB" className="h-32 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 30px rgba(250,204,21,0.7))' }} />
                  <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Great Income Club</div>
                  <div className="text-gray-400 text-sm mt-2 tracking-wider">BSC MAINNET • IMMUTABLE</div>
                </div>
                <div className="space-y-3">
                  {[
                    ['Contract Status', '✅ Live & Verified'],
                    ['Network', 'BNB Smart Chain'],
                    ['Income Streams', '5 Active'],
                    ['Matrix Depth', '25 Levels'],
                    ['Revenue Distribution', '100% On-chain'],
                  ].map(([key, val], i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-500 text-sm">{key}</span>
                      <span className="text-white text-sm font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
                <Link href="/register" className="mt-8 block w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black text-center py-3 rounded-xl font-black hover:scale-105 transition-transform">
                  Join Now Free →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white/2">
        <FadeIn className="text-center mb-12">
          <span className="text-green-400 font-mono text-sm uppercase tracking-[0.3em]">Questions</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">Frequently Asked</h2>
        </FadeIn>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={i * 60}>
              <FAQItem question={f.q} answer={f.a} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[300px] bg-yellow-500/5 rounded-full blur-[80px] animate-pulse" />
        </div>
        <FadeIn className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6" style={{ textShadow: '0 0 60px rgba(255,255,255,0.1)' }}>
            Start Earning<br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">Today.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">Join thousands of members already growing their wealth on-chain.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register"
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-10 py-5 rounded-full font-black text-xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105">
              <span className="relative z-10">🚀 Get Started Free</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <a href={`https://bscscan.com/address/${CONTRACT_ADDRESSES[56]}`} target="_blank" rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-md border border-white/15 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all hover:scale-105">
              📊 View on BscScan
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 py-12 px-6 bg-black/40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-sm text-gray-500">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="GICLUB" className="h-16 w-auto" style={{ filter: 'drop-shadow(0 0 8px rgba(250,204,21,0.5))' }} />
              <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">GICLUB</span>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed">Decentralized | Transparent | Community-Driven</p>
            <a href={`https://bscscan.com/address/${CONTRACT_ADDRESSES[56]}`} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-3 font-mono text-xs bg-white/5 px-3 py-1 rounded-full hover:bg-white/10 transition-colors">
              Contract: {CONTRACT_ADDRESSES[56].slice(0, 6)}...{CONTRACT_ADDRESSES[56].slice(-4)}
            </a>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">About</h4>
            <p className="text-gray-500 leading-relaxed text-xs">
              Great Income Club is a <strong className="text-gray-300">Community Driven Revenue Sharing</strong> platform.
              100% of revenue is distributed back to members via on-chain smart contract logic.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h4>
            <div className="space-y-2">
              <Link href="/disclaimer" className="block hover:text-white transition-colors text-xs">Disclaimer & Risks</Link>
              <Link href="#" className="block hover:text-white transition-colors text-xs">Terms of Service</Link>
            </div>
            <p className="text-xs text-gray-700 mt-6">© 2025 Great Income Club. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
