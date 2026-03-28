'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    LayoutDashboard,
    TrendingUp,
    Users,
    GitBranch,
    Network,
    ArrowUpCircle,
    Megaphone,
    Gift,
    Menu,
    X
} from 'lucide-react';

import { useState } from 'react';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Income History', path: '/dashboard/income', icon: TrendingUp },
    { name: 'Node Network', path: '/dashboard/team', icon: Users },
    { name: 'Sponsorship Tree', path: '/dashboard/referral-tree', icon: GitBranch },
    { name: 'Node Matrix', path: '/dashboard/matrix-tree', icon: Network },
    { name: 'Node Layers', path: '/dashboard/upgrade', icon: ArrowUpCircle },
    { name: 'Reward Pools', path: '/dashboard/rewards', icon: Gift },
    { name: 'Promotion', path: '/dashboard/promotion', icon: Megaphone },
];


export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-20 lg:pb-0 font-sans">
            {/* Desktop Sidebar (Vi Style - Floating Card) */}
            <aside className="hidden lg:flex fixed inset-y-0 left-0 w-72 flex-col p-6 z-40">
                <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col h-full overflow-hidden">
                    <div className="p-8 border-b border-slate-50">
                        <Link href="/dashboard" className="block text-center">
                            <span className="text-3xl font-black text-[#1b5e20] tracking-tighter">AIPCORE</span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`
                                        flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-300 group
                                        ${isActive
                                            ? 'bg-[#1b5e20] text-white shadow-[0_8px_20px_rgba(27,94,32,0.2)]'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-[#1b5e20]'
                                        }
                                    `}
                                >
                                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110`} />
                                    <span className="font-bold tracking-tight">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-6 mt-auto">
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                            <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 text-center">Node Protocol v2.5</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:ml-72 flex flex-col min-h-screen">
                {/* Mobile Header (Clean Vi style) */}
                <header className="lg:hidden bg-white/80 backdrop-blur-xl sticky top-0 z-30 px-6 py-4 flex justify-between items-center border-b border-slate-100 shadow-sm">
                    <span className="text-xl font-black text-[#1b5e20] tracking-tighter">AIPCORE</span>
                    <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
                </header>

                {/* Desktop Header */}
                <header className="hidden lg:flex justify-between items-center px-8 py-6 sticky top-0 z-30 bg-[#F8FAFC]/80 backdrop-blur-md">
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        {navItems.find(item => item.path === pathname)?.name || 'Home'}
                    </h1>
                    <ConnectButton showBalance={{ smallScreen: false, largeScreen: true }} accountStatus="address" />
                </header>

                {/* Main Page Content */}
                <main className="flex-1 p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation (Screenshot-inspired) */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-t border-slate-100 px-2 py-3 z-50 flex justify-around items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
                {navItems.slice(0, 5).map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    
                    // Simple short names for bottom bar
                    const shortName = item.name === 'Dashboard' ? 'Home' : 
                                    item.name === 'Income History' ? 'Income' :
                                    item.name === 'Node Network' ? 'Nodes' :
                                    item.name === 'Node Layers' ? 'Layers' : 'Reward';

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex flex-col items-center gap-1 group relative px-3 py-1`}
                        >
                            <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-[#1b5e20] text-white shadow-lg -translate-y-1' : 'text-slate-400'}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-[#1b5e20]' : 'text-slate-400'}`}>
                                {shortName}
                            </span>
                            {isActive && (
                                <div className="absolute -bottom-1 w-1 h-1 bg-[#1b5e20] rounded-full"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
