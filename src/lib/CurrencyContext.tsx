'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface Currency {
    code: string;
    name: string;
    symbol: string;
    flag: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
    { code: 'USD', name: 'US Dollar',         symbol: '$',    flag: '🇺🇸' },
    { code: 'INR', name: 'Indian Rupee',       symbol: '₹',    flag: '🇮🇳' },
    { code: 'EUR', name: 'Euro',               symbol: '€',    flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound',      symbol: '£',    flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen',       symbol: '¥',    flag: '🇯🇵' },
    { code: 'CNY', name: 'Chinese Yuan',       symbol: '¥',    flag: '🇨🇳' },
    { code: 'AED', name: 'UAE Dirham',         symbol: 'د.إ',  flag: '🇦🇪' },
    { code: 'SGD', name: 'Singapore Dollar',   symbol: 'S$',   flag: '🇸🇬' },
    { code: 'AUD', name: 'Australian Dollar',  symbol: 'A$',   flag: '🇦🇺' },
    { code: 'CAD', name: 'Canadian Dollar',    symbol: 'C$',   flag: '🇨🇦' },
    { code: 'CHF', name: 'Swiss Franc',        symbol: 'Fr',   flag: '🇨🇭' },
    { code: 'KRW', name: 'South Korean Won',   symbol: '₩',    flag: '🇰🇷' },
    { code: 'BRL', name: 'Brazilian Real',     symbol: 'R$',   flag: '🇧🇷' },
    { code: 'RUB', name: 'Russian Ruble',      symbol: '₽',    flag: '🇷🇺' },
    { code: 'MYR', name: 'Malaysian Ringgit',  symbol: 'RM',   flag: '🇲🇾' },
    { code: 'PHP', name: 'Philippine Peso',    symbol: '₱',    flag: '🇵🇭' },
    { code: 'IDR', name: 'Indonesian Rupiah',  symbol: 'Rp',   flag: '🇮🇩' },
    { code: 'THB', name: 'Thai Baht',          symbol: '฿',    flag: '🇹🇭' },
    { code: 'NGN', name: 'Nigerian Naira',     symbol: '₦',    flag: '🇳🇬' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R',    flag: '🇿🇦' },
    { code: 'TRY', name: 'Turkish Lira',       symbol: '₺',    flag: '🇹🇷' },
    { code: 'MXN', name: 'Mexican Peso',       symbol: 'Mex$', flag: '🇲🇽' },
    { code: 'BNB', name: 'Binance Coin',       symbol: 'BNB',  flag: '🟡' },
    { code: 'BASE', name: 'Base Unit',         symbol: '🛡️',    flag: '🔵' },
];

interface CurrencyContextValue {
    selectedCurrency: Currency;
    setSelectedCurrency: (currency: Currency) => void;
    /** Convert a BNB amount to the selected currency */
    convertBNB: (bnbAmount: number) => number;
    /** Format a converted amount with symbol */
    formatConverted: (bnbAmount: number) => string;
    /** Convert a USD amount to the selected currency */
    convertFromUSD: (usdAmount: number) => number;
    /** Format a USD amount with symbol */
    formatFromUSD: (usdAmount: number) => string;
    /** USD rate per 1 BNB (from chain oracle) */
    bnbPriceUSD: number;
    setBnbPriceUSD: (price: number) => void;
    /** Map of currency code → USD rate */
    fxRates: Record<string, number>;
    isFetchingRates: boolean;
    lastUpdated: Date | null;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = 'aipcore_currency';
const FX_CACHE_KEY = 'aipcore_fx_cache';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// Fallback rates relative to USD (updated periodically as defaults)
const FALLBACK_FX: Record<string, number> = {
    USD: 1,
    INR: 83.5,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.8,
    CNY: 7.24,
    AED: 3.67,
    SGD: 1.34,
    AUD: 1.53,
    CAD: 1.36,
    CHF: 0.90,
    KRW: 1330,
    BRL: 4.97,
    RUB: 89.5,
    MYR: 4.71,
    PHP: 56.4,
    IDR: 15750,
    THB: 35.2,
    NGN: 1540,
    ZAR: 18.6,
    TRY: 32.1,
    MXN: 17.2,
    BASE: 1,
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [selectedCurrency, setSelectedCurrencyState] = useState<Currency>(SUPPORTED_CURRENCIES[0]); // INR default
    const [bnbPriceUSD, setBnbPriceUSD] = useState(600);
    const [fxRates, setFxRates] = useState<Record<string, number>>(FALLBACK_FX);
    const [isFetchingRates, setIsFetchingRates] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    // Load saved currency preference from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const found = SUPPORTED_CURRENCIES.find(c => c.code === saved);
                if (found) setSelectedCurrencyState(found);
            }
        } catch {}
    }, []);

    // Fetch exchange rates (USD base) from open exchange API
    const fetchFxRates = useCallback(async () => {
        // Check cache first
        try {
            const cached = localStorage.getItem(FX_CACHE_KEY);
            if (cached) {
                const { rates, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_TTL_MS) {
                    setFxRates(rates);
                    setLastUpdated(new Date(timestamp));
                    return;
                }
            }
        } catch {}

        setIsFetchingRates(true);
        try {
            // Free tier from exchangerate-api (no key needed for open endpoint)
            const res = await fetch(
                'https://open.er-api.com/v6/latest/USD',
                { next: { revalidate: 900 } } as RequestInit
            );
            if (res.ok) {
                const data = await res.json();
                if (data.rates) {
                    setFxRates(data.rates);
                    setLastUpdated(new Date());
                    try {
                        localStorage.setItem(FX_CACHE_KEY, JSON.stringify({
                            rates: data.rates,
                            timestamp: Date.now(),
                        }));
                    } catch {}
                }
            }
        } catch {
            // Silently fall through to fallback rates
        } finally {
            setIsFetchingRates(false);
        }
    }, []);

    useEffect(() => {
        fetchFxRates();
        // Refresh every 15 min
        const interval = setInterval(fetchFxRates, CACHE_TTL_MS);
        return () => clearInterval(interval);
    }, [fetchFxRates]);

    const setSelectedCurrency = useCallback((currency: Currency) => {
        setSelectedCurrencyState(currency);
        try {
            localStorage.setItem(STORAGE_KEY, currency.code);
        } catch {}
    }, []);

    /** Convert BNB amount → selected currency */
    const convertBNB = useCallback((bnbAmount: number): number => {
        if (selectedCurrency.code === 'BNB') return bnbAmount;
        const usdValue = bnbAmount * bnbPriceUSD;
        const rate = fxRates[selectedCurrency.code] ?? 1;
        return usdValue * rate;
    }, [selectedCurrency, bnbPriceUSD, fxRates]);

    /** Format converted amount with proper locale & symbol */
    const formatConverted = useCallback((bnbAmount: number): string => {
        if (selectedCurrency.code === 'BNB') {
            return `${bnbAmount.toFixed(6)} BNB`;
        }
        const amount = convertBNB(bnbAmount);
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: selectedCurrency.code,
                minimumFractionDigits: 2,
                maximumFractionDigits: selectedCurrency.code === 'JPY' || selectedCurrency.code === 'KRW' || selectedCurrency.code === 'IDR' ? 0 : 2,
            }).format(amount);
        } catch {
            return `${selectedCurrency.symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }, [selectedCurrency, convertBNB]);

    /** Convert USD amount → selected currency */
    const convertFromUSD = useCallback((usdAmount: number): number => {
        const rate = fxRates[selectedCurrency.code] ?? 1;
        return usdAmount * rate;
    }, [selectedCurrency, fxRates]);

    /** Format USD amount with proper locale & symbol */
    const formatFromUSD = useCallback((usdAmount: number): string => {
        if (selectedCurrency.code === 'BNB') {
            return `${(usdAmount / bnbPriceUSD).toFixed(4)} BNB`;
        }
        if (selectedCurrency.code === 'BASE') {
            return `${usdAmount.toFixed(2)} BASE`;
        }
        const amount = convertFromUSD(usdAmount);
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: selectedCurrency.code,
                minimumFractionDigits: 2,
                maximumFractionDigits: selectedCurrency.code === 'JPY' || selectedCurrency.code === 'KRW' || selectedCurrency.code === 'IDR' ? 0 : 2,
            }).format(amount);
        } catch {
            return `${selectedCurrency.symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }, [selectedCurrency, convertFromUSD, bnbPriceUSD]);

    return (
        <CurrencyContext.Provider value={{
            selectedCurrency,
            setSelectedCurrency,
            convertBNB,
            formatConverted,
            convertFromUSD,
            formatFromUSD,
            bnbPriceUSD,
            setBnbPriceUSD,
            fxRates,
            isFetchingRates,
            lastUpdated,
        }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency(): CurrencyContextValue {
    const ctx = useContext(CurrencyContext);
    if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
    return ctx;
}
