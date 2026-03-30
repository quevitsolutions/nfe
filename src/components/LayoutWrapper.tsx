'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isDashboard = pathname?.startsWith('/dashboard');

  if (isHomePage || isDashboard) {
    return (
      <div className="min-h-screen bg-[#020617]">
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-[#020617] min-h-screen has-sidebar">
      <Sidebar />
      <main className="main-content flex-1 w-full overflow-x-hidden">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
