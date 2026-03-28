'use client';

import { useState, useEffect } from 'react';
import { Activity, RefreshCw, Layers, ShieldCheck } from 'lucide-react';

export function KeeperAdminPanel() {
    const [health, setHealth] = useState<{ status: string; uptime: string } | null>(null);
    const [syncNodeId, setSyncNodeId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const checkHealth = async () => {
        try {
            const res = await fetch('/api/keeper?action=health');
            const data = await res.json();
            if (data.status) {
                setHealth(data);
            }
        } catch (e) {
            console.error('Keeper health check failed', e);
        }
    };

    useEffect(() => {
        checkHealth();
        const interval = setInterval(checkHealth, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleSync = async () => {
        if (!syncNodeId) return;
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch(`/api/keeper?action=sync&nodeId=${syncNodeId}`);
            const data = await res.json();
            if (data.status === 'queued') {
                setMessage(`✅ Protocol Sync queued for neural node ${syncNodeId}`);
                setSyncNodeId('');
            } else {
                setMessage(`❌ Conflict: ${data.error || 'Unknown endpoint error'}`);
            }
        } catch (e) {
            setMessage('❌ Error triggering neural sync');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-[0.03] text-[#1b5e20] group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck className="w-48 h-48" />
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 text-[#1b5e20]">
                        <Activity className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none mb-1">Genesis Keeper Protocol</h2>
                        <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${health ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                             <span className={`text-[10px] font-black uppercase tracking-widest ${health ? 'text-emerald-600' : 'text-slate-400'}`}>
                                 {health ? 'Synchronized (Live)' : 'Disconnected (Standby)'}
                             </span>
                             {health && <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest ml-2">• Uptime: {health.uptime}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 relative z-10">
                <div className="flex-1 relative">
                    <input
                        type="number"
                        value={syncNodeId}
                        onChange={(e) => setSyncNodeId(e.target.value)}
                        placeholder="ENTER NEURAL ID..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] px-8 py-5 text-xs font-black text-slate-800 placeholder:text-slate-200 uppercase tracking-widest focus:outline-none focus:bg-white focus:border-[#1b5e20]/20 transition-all"
                    />
                </div>
                <button
                    onClick={handleSync}
                    disabled={loading || !syncNodeId}
                    className="px-10 py-5 bg-[#1b5e20] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-[#1b5e20]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3"
                >
                    {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                    Deploy Neural Sync
                </button>
            </div>
            {message && (
                <div className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 animate-in slide-in-from-top-2">
                    <ShieldCheck className="w-4 h-4 text-[#1b5e20]" />
                    {message}
                </div>
            )}
        </div>
    );
}
