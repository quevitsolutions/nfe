'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, ArrowUpCircle, Network, Users, Bell } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';

const mobileNavItems = [
  { name: 'Global', href: '/', icon: Home },
  { name: 'Core', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upgrade', href: '/dashboard/upgrade', icon: ArrowUpCircle },
  { name: 'Matrix', href: '/dashboard/matrix-tree', icon: Network },
  { name: 'Alliance', href: '/dashboard/team', icon: Users },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Hide on homepage — homepage has its own layout
  if (pathname === '/') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-2xl border-t border-brand-green/20  flex items-center justify-around h-20 px-2 z-50 lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] safe-area-pb">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1.5 transition-all text-xs font-black uppercase tracking-widest italic group ${
              isActive ? 'text-brand-blue' : 'text-foreground hover:text-brand-blue'
            }`}
          >
            <item.icon className={`w-6 h-6 transition-all ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(0,136,255,0.8)]' : 'group-hover:scale-110'}`} />
            <span>{item.name}</span>
            {isActive && <div className="absolute top-0 w-8 h-1 bg-brand-blue rounded-b-full shadow-[0_5px_15px_rgba(0,136,255,1)]" />}
          </Link>
        );
      })}
      
      {/* Notifications Button */}
      <div className="flex flex-col items-center justify-center h-full px-2">
        <NotificationCenter />
      </div>
    </nav>
  );
}
