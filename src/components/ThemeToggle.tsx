'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9 opacity-0"></div>; // Placeholder to prevent layout shift
    }

    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    return (
        <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 dark:bg-slate-900/50 dark:hover:bg-slate-800/80 transition-all border-slate-900/10 dark:border-white/10 group shadow-inner focus:outline-none"
            title="Toggle Day/Night Mode"
            aria-label="Toggle Theme"
        >
            {currentTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-300 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
            ) : (
                <Moon className="w-5 h-5 text-brand-blue group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
            )}
        </button>
    );
}
