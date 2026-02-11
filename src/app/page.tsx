'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Wallet, Zap, Shield, Eye, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { useContractConfig } from '@/lib/hooks/useContract';
import { formatBNB } from '@/lib/contract';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-colors hover:bg-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center"
      >
        <h3 className="text-xl font-bold text-white">{question}</h3>
        {isOpen ? <ChevronUp className="w-6 h-6 text-yellow-400" /> : <ChevronDown className="w-6 h-6 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-400 border-t border-white/5 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const { data: config } = useContractConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-3xl font-bold text-white">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Great Income Club
          </span>
        </div>
        <ConnectButton />
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          Build Your
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            Passive Income
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Join the revolutionary decentralized income platform on BSC.
          Earn from referrals, levels, and binary matrix with 25 levels deep!
        </p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="px-4 py-2 rounded-full bg-white/10 text-yellow-400 font-semibold border border-yellow-500/30">Decentralized</span>
          <span className="px-4 py-2 rounded-full bg-white/10 text-blue-400 font-semibold border border-blue-500/30">Transparent</span>
          <span className="px-4 py-2 rounded-full bg-white/10 text-green-400 font-semibold border border-green-500/30">Unstoppable</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/register"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            Join Now <ArrowRight />
          </Link>
          <Link
            href="/dashboard"
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Smart Contract Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center hover:bg-white/5 transition-colors">
            <div className="bg-gradient-to-br from-purple-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Admin Control</h3>
            <p className="text-gray-400">
              A fully decentralized protocol where no admin can change rules or access funds. 100% community owned.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center hover:bg-white/5 transition-colors">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">100% Transparency</h3>
            <p className="text-gray-400">
              All transactions are verifiable on the blockchain. Smart contract logic is open and immutable.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center hover:bg-white/5 transition-colors">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant Income</h3>
            <p className="text-gray-400">
              No withdrawal requests needed. Earnings are instantly transferred directly to your wallet.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20 pt-0">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Four Ways to Earn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-colors">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Referral Income</h3>
            <p className="text-gray-400">
              Earn 50% instant commission when someone joins with your referral link
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Direct Income</h3>
            <p className="text-gray-400">
              Receive 10% from your direct referrals' upgrades
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Level Income</h3>
            <p className="text-gray-400">
              Earn up to 15 layers deep from your team's upgrades
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors">
            <div className="bg-gradient-to-br from-pink-400 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Binary Matrix</h3>
            <p className="text-gray-400">
              Collect 5% from 35 layers in the binary matrix structure
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-black">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Connect Wallet</h3>
            <p className="text-gray-400">
              Use MetaMask or any Web3 wallet to connect to BSC network
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Register</h3>
            <p className="text-gray-400">
              Register with a referral link starting from just $5 USD
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Build Team</h3>
            <p className="text-gray-400">
              Share your referral link and build your passive income team
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-pink-400 to-rose-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
              4
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Earn  & Upgrade</h3>
            <p className="text-gray-400">
              Receive income instantly and upgrade to unlock higher earnings
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <FAQItem
            question="Is Great Income Club safe?"
            answer="Yes. The platform is built on a verified smart contract on the BSC blockchain. No admin has access to your funds, and the code cannot be changed."
          />
          <FAQItem
            question="How do I start earning?"
            answer="You can start with just $5 USD (in BNB). Simply register using a referral link, and you'll instantly be qualified to earn from spillover and direct referrals."
          />
          <FAQItem
            question="Do I need to withdraw my earnings?"
            answer="No! All earnings are instantly transferred directly to your connected wallet (MetaMask, Trust Wallet, etc.) the moment they are generated."
          />
          <FAQItem
            question="What is the Binary Matrix?"
            answer="The Binary Matrix is a powerful 2x2 structure that fills automatically from top to bottom, left to right. This allows you to earn from 'spillover' members placed by your upline."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-1 rounded-3xl">
          <div className="bg-gray-900 p-12 rounded-[22px]">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of members building passive income on blockchain
            </p>
            <Link
              href="/register?ref=36999"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <div className="mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Great Income Club
            </span>
          </div>
          <p className="mb-4">Decentralized | Transparent | Unstoppable</p>
          <div className="text-sm">
            Contract: {config && config._owner ? String(config._owner).slice(0, 6) + '...' + String(config._owner).slice(-4) : '0x2442...e674'}
          </div>
        </div>
      </footer>
    </div>
  );
}
