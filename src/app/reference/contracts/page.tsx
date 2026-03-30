import React from "react";

export default function ContractsPage() {
    return (
        <div className="space-y-6 text-slate-600 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-8">
                Smart Contracts — Technical Transparency
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-brand-green mb-4 border-b border-brand-green/10 pb-2">Verified Protocol Logic</h2>
                <p className="mb-6 font-medium">
                    The AIPCore protocol is governed by immutable smart contracts deployed on the Binance Smart Chain (BSC). All logic is open-source and verified on BscScan, providing the ultimate level of trust through code.
                </p>

                <div className="space-y-6">
                    {/* AIPCore Main Contract */}
                    <div className="bg-brand-mint border border-brand-green/10 p-8 rounded-3xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-brand-green italic uppercase tracking-tight">AIPCore (Main Engine)</h3>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Core Logic & Distribution</p>
                            </div>
                            <span className="px-3 py-1 bg-brand-green/20 text-brand-green text-[10px] font-black rounded-full uppercase tracking-wider">Verified</span>
                        </div>
                        <div className="bg-white border border-brand-green/10 p-4 rounded-xl font-mono text-xs text-brand-green break-all mb-6 shadow-sm font-bold">
                            0x1730695A5fdD0AE666406E849BcDAe8d83b8CF3c
                        </div>
                        <p className="text-sm mb-6 font-medium">
                            Manages node registration, layer upgrades, and the 40/50/10 reward distribution logic. This contract is the "brain" of the protocol.
                        </p>
                        <a href="https://bscscan.com/address/0x1730695A5fdD0AE666406E849BcDAe8d83b8CF3c#code" target="_blank" className="text-brand-green hover:underline text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            View on BscScan ↗
                        </a>
                    </div>

                    {/* RewardPool Contract */}
                    <div className="bg-brand-mint border border-brand-green/10 p-8 rounded-3xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-brand-green italic uppercase tracking-tight">RewardPool</h3>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Global Volume Sharing</p>
                            </div>
                            <span className="px-3 py-1 bg-brand-green/20 text-brand-green text-[10px] font-black rounded-full uppercase tracking-wider">Verified</span>
                        </div>
                        <div className="bg-white border border-brand-green/10 p-4 rounded-xl font-mono text-xs text-brand-green break-all mb-6 shadow-sm font-bold">
                            0x39f2021f368404C9e470AE3E912C617707c200D1
                        </div>
                        <p className="text-sm mb-6 font-medium">
                            Handles the accumulation and proportional distribution for the Bronze, Silver, and Gold Global Reward Pools.
                        </p>
                        <a href="https://bscscan.com/address/0x39f2021f368404C9e470AE3E912C617707c200D1#code" target="_blank" className="text-brand-green hover:underline text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            View on BscScan ↗
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-brand-green mb-4 border-b border-brand-green/10 pb-2 uppercase tracking-tight">De-facto Immutability</h2>
                <p className="text-sm font-medium">
                    The protocol has been designed with minimal owner control. All reward distributions are hard-coded. While the admin has limited maintenance functions (like updating the price oracle address), the core economic 40/50/10 split cannot be modified.
                </p>
            </section>
        </div>
    );
}


