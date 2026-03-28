import React from "react";

export default function ContractsPage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
                Smart Contracts — Technical Transparency
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Verified Protocol Logic</h2>
                <p className="mb-6">
                    The AIPCore protocol is governed by immutable smart contracts deployed on the Binance Smart Chain (BSC). All logic is open-source and verified on BscScan, providing the ultimate level of trust through code.
                </p>

                <div className="space-y-6">
                    {/* AIPCore Main Contract */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">AIPCore (Main Engine)</h3>
                                <p className="text-xs text-blue-400">Core Logic & Distribution</p>
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Verified</span>
                        </div>
                        <div className="bg-black/40 p-3 rounded-xl font-mono text-xs text-yellow-500 break-all mb-4">
                            0x1730695A5fdD0AE666406E849BcDAe8d83b8CF3c
                        </div>
                        <p className="text-sm mb-4">
                            Manages node registration, layer upgrades, and the 40/50/10 reward distribution logic. This contract is the "brain" of the protocol.
                        </p>
                        <a href="https://bscscan.com/address/0x1730695A5fdD0AE666406E849BcDAe8d83b8CF3c#code" target="_blank" className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-2">
                            View on BscScan ↗
                        </a>
                    </div>

                    {/* RewardPool Contract */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">RewardPool</h3>
                                <p className="text-xs text-blue-400">Global Volume Sharing</p>
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Verified</span>
                        </div>
                        <div className="bg-black/40 p-3 rounded-xl font-mono text-xs text-yellow-500 break-all mb-4">
                            0x39f2021f368404C9e470AE3E912C617707c200D1
                        </div>
                        <p className="text-sm mb-4">
                            Handles the accumulation and proportional distribution for the Bronze, Silver, and Gold Global Reward Pools.
                        </p>
                        <a href="https://bscscan.com/address/0x39f2021f368404C9e470AE3E912C617707c200D1#code" target="_blank" className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-2">
                            View on BscScan ↗
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">De-facto Immutability</h2>
                <p className="text-sm">
                    The protocol has been designed with minimal owner control. All reward distributions are hard-coded. While the admin has limited maintenance functions (like updating the price oracle address), the core economic 40/50/10 split cannot be modified.
                </p>
            </section>
        </div>
    );
}
