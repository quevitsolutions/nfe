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
    Globe,
    Menu,
    X
} from 'lucide-react';

import { useState } from 'react';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Rewards', path: '/dashboard/income', icon: TrendingUp },
    { name: 'Node Network', path: '/dashboard/team', icon: Users },
    { name: 'Sponsorship Tree', path: '/dashboard/referral-tree', icon: GitBranch },
    { name: 'Node Matrix', path: '/dashboard/matrix-tree', icon: Network },
    { name: 'Node Tiers', path: '/dashboard/upgrade', icon: ArrowUpCircle },
    { name: 'Pools', path: '/dashboard/rewards', icon: Gift },
    { name: 'Ecosystem', path: '/dashboard/ecosystem', icon: Globe },
    { name: 'Promotion', path: '/dashboard/promotion', icon: Megaphone },
];


export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Mobile menu button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 p-2 rounded-lg text-white shadow-lg border border-white/20"
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white/5 backdrop-blur-xl border-r border-white/10
        transform transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-10 px-2 group">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-yellow-400/20 rounded-xl blur-lg group-hover:bg-yellow-400/30 transition-all opacity-0 group-hover:opacity-100"></div>
                            <img src="/nfe-logo.png" alt="NFE" className="h-10 w-auto relative shadow-[0_0_15px_rgba(250,204,21,0.3)] group-hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white tracking-tighter leading-none">NODEFLOW</span>
                            <span className="text-xs font-bold text-yellow-400 tracking-[0.2em]">ENGINE CORE</span>
                        </div>
                    </div>
                </div>

                <nav className="px-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                  ${isActive
                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold'
                                        : 'text-gray-300 hover:bg-white/10'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top bar */}
                <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-4 md:p-6 sticky top-0 z-30">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-bold text-white lg:block hidden">
                            {navItems.find(item => item.path === pathname)?.name || 'Dashboard'}
                        </h1>
                        <div className="flex items-center gap-4 ml-auto">
                            <ConnectButton showBalance={{ smallScreen: false, largeScreen: true }} accountStatus="address" />
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    {children}
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
