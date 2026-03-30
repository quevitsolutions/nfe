'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, LayoutDashboard, User, ArrowUpCircle, Network, Users, TrendingUp, Gift, Bell } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';

const mainNav = [
  { name: 'Neural Core', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Focus Upgrade', href: '/dashboard/upgrade', icon: ArrowUpCircle },
  { name: 'Node Matrix', href: '/dashboard/matrix-tree', icon: Network },
  { name: 'Team Alliance', href: '/dashboard/team', icon: Users },
  { name: 'Net Earned', href: '/dashboard/income', icon: TrendingUp },
  { name: 'Reward Pools', href: '/dashboard/rewards', icon: Gift },
];

const externalNav = [
  { name: 'Global Hub', href: '/', icon: Home },
  { name: 'Protocol Specs', href: '/reference/protocol-economics', icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Hide on homepage — homepage has its own floating navbar
  if (pathname === '/') return null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-[var(--sidebar-width)] bg-white  backdrop-blur-2xl border-r border-brand-green/20  z-50 hidden lg:flex flex-col">
      {/* Profile Section */}
      <div className="p-8 border-b border-brand-green/20 ">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20 shadow-inner">
            <User className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <h3 className="font-black text-sm uppercase tracking-tight text-foreground italic">Neural ID</h3>
            <p className="text-xs text-brand-amber font-black tracking-widest uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-ping"></span> Live Sync
            </p>
          </div>
          <div className="ml-auto">
            <NotificationCenter />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-6 space-y-8">
        <div className="px-6 space-y-2">
            <p className="text-xs font-black text-brand-blue uppercase tracking-widest mb-4 px-2 italic opacity-60">Operation Matrix</p>
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-black text-xs uppercase tracking-widest italic group ${
                    isActive
                      ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20 shadow-[0_0_20px_rgba(0,136,255,0.1)]'
                      : 'text-foreground hover:bg-slate-50 hover:text-brand-blue border border-transparent'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-blue' : 'group-hover:text-brand-blue transition-colors'}`} />
                  {item.name}
                </Link>
              );
            })}
        </div>
        
        <div className="px-6 space-y-2">
            <p className="text-xs font-black text-brand-blue uppercase tracking-widest mb-4 px-2 italic opacity-60">External Links</p>
            {externalNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-black text-xs uppercase tracking-widest italic group ${
                    isActive
                      ? 'bg-slate-50 text-brand-blue shadow-inner border border-slate-100'
                      : 'text-foreground hover:bg-slate-50 hover:text-brand-blue'
                  }`}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {item.name}
                </Link>
              );
            })}
        </div>
      </div>

      <div className="p-8 border-t border-brand-green/20 bg-white/50">
        <p className="text-xs font-black uppercase tracking-[0.3em] italic text-brand-blue">
          AIPCORE PROTOCOL v4.1
        </p>
      </div>
    </aside>
  );
}
