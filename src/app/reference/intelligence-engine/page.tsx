import React from "react";

export default function AIPCoreIntelligencePage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-red-400 to-rose-600 bg-clip-text text-transparent mb-8 uppercase tracking-tighter font-mono">
                Protocol Economics — The 100% Distribution Model
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-red-500/30 pb-2">Intelligent Wealth Distribution</h2>
                <p className="mb-4">
                    In traditional matrix protocols, growth is often stifled by "dead branches" — areas of the network where participation stops, creating gaps that prevent sponsors from earning. The <strong>AIPCore Intelligence Engine</strong> solves this through algorithmic pathfinding.
                </p>
                <p className="mb-4">
                    Our protocol doesn't just place nodes randomly. It uses a high-efficiency binary search logic to ensure that every registration and upgrade flows to the most productive part of the community structure.
                </p>
            </section>

            <div className="grid grid-cols-1 gap-6 mb-10">
                <div className="bg-red-900/5 border border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 bg-red-500/10 rounded-bl-3xl">
                        <span className="text-red-400 font-black text-xs uppercase tracking-widest font-mono">CORE MODULE</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Matrix Optimization Module (MOM)</h2>
                    <p className="mb-4 text-sm">
                        The MOM is responsible for node placement. When a registration is triggered, the engine calculates the "Optimal Depth Path" using a logarithmic depth search. It identifies the first available position in the binary tree that maximizes the reward spread across the 17 matrix layers.
                    </p>
                    <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                        <li>Prevents matrix gaps and unbalanced branches.</li>
                        <li>Ensures "spillover" is distributed logically rather than randomly.</li>
                        <li>Maintains a perfectly symmetrical growth curve across the global network.</li>
                    </ul>
                </div>

                <div className="bg-rose-900/5 border border-rose-500/20 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 bg-rose-500/10 rounded-bl-3xl">
                        <span className="text-rose-400 font-black text-xs uppercase tracking-widest font-mono">REWARD ENGINE</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Proportional Accrual Module (PAM)</h2>
                    <p className="text-sm mb-4">
                        The PAM governs both the <strong>RewardPool</strong> and <strong>Layer Rewards</strong>. It ensures that the 15% layer distribution and 5% global pools are calculated with absolute precision across millions of nodes without increasing gas costs.
                    </p>
                    <p className="text-sm">
                        Whenever a Layer upgrade occurs, the PAM instantly calculates the accrual for every share in the Bronze, Silver, and Gold pools, while simultaneously pushing the 15% layer rewards to the referral tree.
                    </p>
                </div>

                <div className="bg-red-900/5 border border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 bg-red-600/10 rounded-bl-3xl">
                        <span className="text-red-500 font-black text-xs uppercase tracking-widest font-mono">SECURITY</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Immutable Protocol Governance</h2>
                    <p className="text-sm">
                        All intelligence in AIPCore is hard-coded into the smart contract. There are no "admin keys" that can change the 10/70/15/5 split or the 0% platform fee. The engine's intelligence is its immutability — providing a secure, trustless foundation that will behave exactly the same way in 10 years as it does today.
                    </p>
                </div>
            </div>

            <section>
                <div className="bg-gradient-to-br from-red-900/30 to-rose-900/30 border border-red-500/20 p-10 rounded-2xl text-center shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter font-mono">The Philosophy of Pure Math</h2>
                    <p className="mb-6 text-sm italic font-bold text-rose-300 uppercase tracking-widest">
                        &quot;Transparency is the highest form of trust.&quot;
                    </p>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter">
                        By hard-coding the 10/70/15/5 split and removing platform fees, AIPCore ensures that the economic engine is powered solely by the community, for the community. The system is designed to be a permanent decentralized standard for reward-driven finance.
                    </p>
                </div>
            </section>

            <section className="mb-8 p-6 bg-gradient-to-r from-red-900/20 to-rose-900/20 border border-red-500/20 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-3 uppercase tracking-tighter">System Synchronization Loop</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                        <span className="font-black text-red-500 mb-1 font-mono text-xs">MOM</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">Optimizes Path</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                        <span className="font-black text-rose-500 mb-1 font-mono text-xs">PAM</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">Accrues Rewards</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                        <span className="font-black text-red-400 mb-1 font-mono text-xs">BNB ORACLE</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">Syncs Layers</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                        <span className="font-black text-white mb-1 font-mono text-xs">CONTRACT</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400">Ensures Distribution</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-red-500/30 pb-2">AI + Code Symbiosis</h2>
                <p className="mb-4">
                    By removing human intervention from the distribution cycle, AIPCore achieves a state of "Algorithmic Autonomy." The system's intelligence is its fairness — ensuring that no individual, however influential, can alter the flow of community wealth.
                </p>
                <p>
                    All distribution logic is transparent on BscScan, verified and audited. The AIPCore engine demonstrates that when you remove greed and replace it with optimized math, you create a protocol that can truly serve a global community.
                </p>
            </section>
        </div>
    );
}
