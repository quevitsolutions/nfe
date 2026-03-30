'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, RefreshCw, Globe, Search } from 'lucide-react';
import { useCurrency, SUPPORTED_CURRENCIES, Currency } from '@/lib/CurrencyContext';

interface CurrencySelectorProps {
    compact?: boolean;
}

export function CurrencySelector({ compact = false }: CurrencySelectorProps) {
    const { selectedCurrency, setSelectedCurrency, isFetchingRates, lastUpdated } = useCurrency();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        }
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    // Focus search on open
    useEffect(() => {
        if (open && searchRef.current) {
            setTimeout(() => searchRef.current?.focus(), 50);
        }
    }, [open]);

    const filtered = SUPPORTED_CURRENCIES.filter(c =>
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (currency: Currency) => {
        setSelectedCurrency(currency);
        setOpen(false);
        setSearch('');
    };

    // Format last updated time
    const lastUpdatedStr = lastUpdated
        ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : null;

    return (
        <div ref={dropdownRef} className="relative" style={{ zIndex: 100 }}>
            {/* Trigger Button */}
            <button
                id="currency-selector-btn"
                onClick={() => setOpen(v => !v)}
                className={`
                    flex items-center gap-2 rounded-2xl border transition-all duration-200 font-black tracking-wide
                    bg-white border-slate-200 text-slate-900 hover:border-[#ed1b24]/60 hover:bg-[#ed1b24]/5
                    ${open ? 'border-[#ed1b24]/60 bg-[#ed1b24]/5 shadow-[0_0_20px_rgba(202,138,4,0.1)]' : ''}
                    ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-xs'}
                `}
                aria-label="Select currency"
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                <Globe className={`text-[#ed1b24] flex-shrink-0 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
                <span className="flex items-center gap-1.5">
                    <span className="text-sm leading-none">{selectedCurrency.flag}</span>
                    <span className="uppercase tracking-widest">{selectedCurrency.code}</span>
                </span>
                {isFetchingRates ? (
                    <RefreshCw className="w-3 h-3 text-[#ed1b24] animate-spin flex-shrink-0" />
                ) : (
                    <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                )}
            </button>

            {/* Dropdown Panel */}
            {open && (
                <div
                    className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden"
                    role="listbox"
                    aria-label="Currency options"
                >
                    {/* Header */}
                    <div className="px-4 pt-4 pb-3 border-b border-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#ed1b24] mb-2">Select Currency</p>
                        {lastUpdatedStr && (
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Rates updated {lastUpdatedStr}</p>
                        )}
                    </div>

                    {/* Search */}
                    <div className="px-4 py-3 border-b border-slate-100">
                        <div className="flex items-center gap-2 bg-[#fcf3eb] border border-slate-200 rounded-xl px-3 py-2">
                            <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search currency..."
                                className="bg-transparent text-slate-900 text-xs font-bold placeholder-white/20 outline-none w-full tracking-wide"
                                aria-label="Search currencies"
                            />
                        </div>
                    </div>

                    {/* Currency List */}
                    <div className="max-h-60 overflow-y-auto py-2 scrollbar-thin">
                        {filtered.length === 0 ? (
                            <p className="text-center text-[10px] text-slate-500 py-4 uppercase tracking-widest">No results</p>
                        ) : (
                            filtered.map(currency => {
                                const isActive = currency.code === selectedCurrency.code;
                                return (
                                    <button
                                        key={currency.code}
                                        role="option"
                                        aria-selected={isActive}
                                        onClick={() => handleSelect(currency)}
                                        className={`
                                            w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-150 text-left
                                            ${isActive
                                                ? 'bg-[#ed1b24]/15 text-[#ed1b24]'
                                                : 'text-slate-600 hover:bg-[#fcf3eb] hover:text-white'
                                            }
                                        `}
                                    >
                                        <span className="text-base leading-none w-6 text-center flex-shrink-0">{currency.flag}</span>
                                        <span className="flex-1 min-w-0">
                                            <span className="text-xs font-black uppercase tracking-widest block">
                                                {currency.code}
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-medium">{currency.name}</span>
                                        </span>
                                        <span className="text-xs font-bold text-slate-500 flex-shrink-0">{currency.symbol}</span>
                                        {isActive && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ed1b24] flex-shrink-0" />
                                        )}
                                    </button>
                                );
                            })
                        )}
                    </div>

                    {/* BNB Special Highlight */}
                    <div className="px-4 py-3 border-t border-slate-100">
                        <p className="text-[9px] text-white/15 uppercase tracking-widest text-center">
                            Base: BNB · Powered by live exchange rates
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}




