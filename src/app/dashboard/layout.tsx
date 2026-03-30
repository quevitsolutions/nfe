'use client';

import { ReactNode, useEffect } from 'react';
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
} from 'lucide-react';

import { useState } from 'react';
import { CurrencySelector } from '@/components/CurrencySelector';
import { useCurrency } from '@/lib/CurrencyContext';
import { useBnbPrice } from '@/lib/hooks/useContract';

const navItems = [
    { name: 'Neural Core', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Focus Upgrade', path: '/dashboard/upgrade', icon: ArrowUpCircle },
    { name: 'Node Matrix', path: '/dashboard/matrix-tree', icon: Network },
    { name: 'Team Alliance', path: '/dashboard/team', icon: Users },
    { name: 'Net Earned', path: '/dashboard/income', icon: TrendingUp },
    { name: 'Reward Pools', path: '/dashboard/rewards', icon: Gift },
];

import { ThemeToggle } from '@/components/ThemeToggle';

function DashboardLayoutInner({ children, pathname }: { children: ReactNode; pathname: string }) {
    const { setBnbPriceUSD } = useCurrency();
    const { data: currentBnbPrice } = useBnbPrice();

    // Sync live BNB price to CurrencyContext so all pages share
    useEffect(() => {
        if (currentBnbPrice) {
            setBnbPriceUSD(Number(currentBnbPrice) / 1e8);
        }
    }, [currentBnbPrice, setBnbPriceUSD]);

    return (
        <div 
            className="min-h-screen bg-[#fcf3eb] text-[#001a33] pb-20 lg:pb-0 font-sans font-black uppercase tracking-tighter relative selection:bg-brand-green selection:text-white"
            style={{ 
                backgroundImage: 'radial-gradient(#22c55e 0.5px, transparent 0.5px)', 
                backgroundSize: '24px 24px',
                backgroundColor: '#fcf3eb'
            }}
        >
            
            {/* Main Content Area (Full Width) */}
            <div className="flex flex-col min-h-screen w-full relative z-10">
                
                {/* Mobile Header */}
                <header className="lg:hidden bg-white sticky top-0 z-30 px-4 py-3 flex justify-between items-center border-b-[2px] border-brand-green/30 shadow-xl gap-3">
                    <Link href="/">
                        <img src="/aipcore-logo.svg" alt="AIPCORE" className="h-8 w-auto brightness-0" />
                    </Link>
                    <div className="flex items-center gap-2 ml-auto">
                        <CurrencySelector compact />
                        <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
                    </div>
                </header>

                {/* Desktop Header */}
                <header className="hidden lg:flex justify-between items-center px-12 py-5 sticky top-0 z-40 bg-white border-b-[2px] border-brand-green/30 shadow-2xl">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="group flex-shrink-0">
                            <img src="/aipcore-logo.svg" alt="AIPCORE" className="h-10 w-auto transition-transform group-hover:scale-105 brightness-0" />
                        </Link>
                        <div className="h-8 w-px bg-brand-green/20 mx-2"></div>
                        <h1 className="text-2xl font-black text-foreground tracking-tight uppercase italic whitespace-nowrap">
                            <span className="text-brand-blue mr-2 opacity-80">LOGIC CORE /</span> {navItems.find(item => item.path === pathname)?.name || 'Platform'} 
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden xl:flex items-center px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-xl mr-2 shadow-inner">
                            <span className="w-2 h-2 bg-brand-green rounded-full animate-ping mr-2 shadow-[0_0_10px_rgba(34,197,94,1)]"></span>
                            <span className="text-xs text-brand-green tracking-[0.2em] italic font-black">System Active</span>
                        </div>
                        <CurrencySelector />
                        <ConnectButton showBalance={{ smallScreen: false, largeScreen: true }} accountStatus="address" />
                    </div>
                </header>

                {/* Full Width Dashboard Horizontal Navigation */}
                <nav className="hidden lg:flex items-center justify-center gap-2 px-8 py-4 bg-brand-mint border-b border-brand-green/20 sticky top-[80px] z-30">
                    <div className="flex gap-2 p-2 bg-white shadow-2xl rounded-2xl border border-brand-green/30">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`
                                        flex items-center gap-2.5 px-6 py-2.5 rounded-[1.2rem] transition-all duration-300 group relative overflow-hidden
                                        ${isActive
                                            ? 'bg-brand-blue text-white shadow-[0_8px_20px_rgba(0,136,255,0.5)] border border-brand-blue/50'
                                            : 'text-foreground hover:bg-brand-green/10 hover:text-brand-green border border-transparent'
                                        }
                                    `}
                                >
                                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 z-10 relative`} />
                                    <span className="font-black tracking-widest text-sm italic z-10 relative">{item.name}</span>
                                    {isActive && <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/0 via-white/40 to-brand-blue/0 animate-shimmer"></div>}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Main Page Content */}
                <main className="flex-1 p-4 lg:p-8 w-full max-w-[1920px] mx-auto overflow-x-hidden">
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white  backdrop-blur-2xl border-t border-brand-amber/20 px-2 py-3 z-50 flex justify-around items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05),0_-10px_40px_rgba(245,158,11,0.15)] rounded-t-[2.5rem] safe-area-pb transition-colors duration-500">
                {navItems.slice(0, 5).map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    
                    const shortName = item.name === 'Neural Core' ? 'Core' : 
                                    item.name === 'Net Earned' ? 'Income' :
                                    item.name === 'Node Matrix' ? 'Matrix' :
                                    item.name === 'Focus Upgrade' ? 'Upgrade' : 'Team';

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex flex-col items-center gap-1.5 group relative px-3 py-1 transition-all ${isActive ? 'scale-110' : ''}`}
                        >
                            <Icon className={`w-7 h-7 transition-all drop-shadow-md ${isActive ? 'text-brand-amber scale-110' : 'text-foreground  group-hover:text-brand-blue'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest italic transition-colors ${isActive ? 'text-brand-amber' : 'text-foreground'}`}>
                                {shortName}
                            </span>
                            {isActive && (
                                <div className="absolute top-0 w-8 h-1 bg-brand-amber rounded-b-full shadow-[0_5px_15px_rgba(245,158,11,1)]"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    return <DashboardLayoutInner children={children} pathname={pathname} />;
}




