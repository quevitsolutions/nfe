import React from "react";

export default function AIPCoreIntelligencePage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
                The AIPCore Intelligence Engine: Algorithmic Matrix Optimization
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Intelligent Wealth Distribution</h2>
                <p className="mb-4">
                    In traditional matrix protocols, growth is often stifled by "dead branches" — areas of the network where participation stops, creating gaps that prevent sponsors from earning. The <strong>AIPCore Intelligence Engine</strong> solves this through algorithmic pathfinding.
                </p>
                <p className="mb-4">
                    Our protocol doesn't just place nodes randomly. It uses a high-efficiency binary search logic to ensure that every registration and upgrade flows to the most productive part of the community structure.
                </p>
            </section>

            <div className="grid grid-cols-1 gap-6 mb-10">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 bg-yellow-500/10 rounded-bl-3xl">
                        <span className="text-yellow-400 font-bold text-sm">CORE MODULE</span>
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

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 bg-blue-500/10 rounded-bl-3xl">
                        <span className="text-blue-400 font-bold text-sm">REWARD ENGINE</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Proportional Accrual Module (PAM)</h2>
                    <p className="text-sm mb-4">
                        The PAM governs both the <strong>RewardPool</strong> and <strong>Layer Rewards</strong>. It ensures that the 15% layer distribution and 5% global pools are calculated with absolute precision across millions of nodes without increasing gas costs.
                    </p>
                    <p className="text-sm">
                        Whenever a Layer upgrade occurs, the PAM instantly calculates the accrual for every share in the Bronze, Silver, and Gold pools, while simultaneously pushing the 15% layer rewards to the referral tree.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 bg-purple-500/10 rounded-bl-3xl">
                        <span className="text-purple-400 font-bold text-sm">SECURITY</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Immutable Protocol Governance</h2>
                    <p className="text-sm">
                        All intelligence in AIPCore is hard-coded into the smart contract. There are no "admin keys" that can change the 10/70/15/5 split or the 0% platform fee. The engine's intelligence is its immutability — providing a secure, trustless foundation that will behave exactly the same way in 10 years as it does today.
                    </p>
                </div>
            </div>

            <section className="mb-8 p-6 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-3">System Synchronization Loop</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                        <span className="font-bold text-yellow-400 mb-1">MOM</span>
                        <span className="text-xs">Optimizes Path</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                        <span className="font-bold text-blue-400 mb-1">PAM</span>
                        <span className="text-xs">Accrues Rewards</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                        <span className="font-bold text-green-400 mb-1">BNB ORACLE</span>
                        <span className="text-xs">Syncs Layers</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                        <span className="font-bold text-white mb-1">CONTRACT</span>
                        <span className="text-xs">Ensures Distribution</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">AI + Code Symbiosis</h2>
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
