'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    BookOpen,
    HelpCircle,
    Cpu,
    Coins,
    Map,
    Flag,
    Menu,
    X,
    MessageSquare
} from 'lucide-react';

const referenceNavItems = [
    { name: 'Introduction', path: '/reference', icon: BookOpen },
    { name: 'Why AIPCore', path: '/reference/why-aipcore', icon: HelpCircle },
    { name: 'How It Works', path: '/reference/how-it-works', icon: HelpCircle },
    { name: 'Income Interaction', path: '/reference/income-interaction', icon: Coins },
    { name: 'Reward Pools', path: '/reference/reward-pools', icon: Coins },
    { name: 'The AI Engine', path: '/reference/intelligence-engine', icon: Cpu },
    { name: 'Protocol Economics', path: '/reference/protocol-economics', icon: Coins },
    { name: 'Smart Contracts', path: '/reference/contracts', icon: BookOpen },
    { name: 'Security & Audit', path: '/reference/security', icon: Flag },
    { name: 'Roadmap', path: '/reference/roadmap', icon: Map },
    { name: 'Social Media', path: '/reference/social-media', icon: MessageSquare },
    { name: 'Conclusion', path: '/reference/conclusion', icon: Flag },
];

export default function ReferenceLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-brand-mint relative ">
            <div className="fixed inset-0 bg-brand-mint -z-10" />
            <div className="fixed inset-0 bg-gradient-to-br from-brand-green/5 via-transparent to-brand-red/5 -z-10" />
            {/* Mobile menu button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-[#ed1b24] text-white shadow-lg border border-white/20"
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white backdrop-blur-xl border-r border-brand-green/10
                transform transition-transform duration-300 lg:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6">
                    <Link href="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-4 mb-10 px-2 group cursor-pointer">
                        <img src="/aipcore-logo.svg" alt="AIPCORE" className="h-10 w-auto drop-shadow-[0_0_15px_rgba(0,136,255,0.3)] transition-all group-hover:drop-shadow-[0_0_20px_rgba(237, 27, 36,0.5)]" />
                    </Link>
                </div>

                <nav className="px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-120px)] pb-20">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-4 mt-2">Documentation</div>
                    {referenceNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path || (pathname === '/reference/introduction' && item.path === '/reference');

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-mono
                                    ${isActive
                                        ? 'bg-brand-green text-white font-black'
                                        : 'text-slate-500 hover:bg-brand-mint hover:text-brand-green'
                                    }
                                `}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top bar */}
                <header className="bg-white backdrop-blur-xl border-b border-brand-green/10 p-4 md:p-6 sticky top-0 z-30">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-bold text-brand-green lg:block hidden">
                            {referenceNavItems.find(item => item.path === pathname || (pathname === '/reference/introduction' && item.path === '/reference'))?.name || 'Reference'}
                        </h1>
                        <div className="flex items-center gap-4 ml-auto">
                            <ConnectButton showBalance={{ smallScreen: false, largeScreen: true }} accountStatus="address" />
                            <Link href="/dashboard" className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-white/20 text-slate-900 text-sm font-semibold transition-colors border border-slate-200 hidden sm:block">
                                Portal Dashboard
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 md:p-8 max-w-4xl mx-auto">
                    <div className="bg-white backdrop-blur-xl border border-brand-green/10 rounded-2xl p-6 md:p-10 shadow-xl text-slate-600 overflow-hidden relative">
                        {/* Corner decorative light */}
                        <div className="absolute top-0 right-0 p-32 bg-brand-green/5 blur-[100px] pointer-events-none rounded-full"></div>
                        <div className="relative z-10">
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                />
            )}
        </div>
    );
}




