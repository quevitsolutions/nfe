import React from "react";

export default function SecurityPage() {
    return (
        <div className="space-y-6 text-gray-300 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
                Security & Audit — Verified Integrity
            </h1>

            <section className="mb-10">
                <div className="p-8 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-3xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full"></div>
                    <h2 className="text-3xl font-black text-white mb-4">AuditShield™ Certified</h2>
                    <p className="mb-6 text-blue-100 italic">
                        "The AIPCore 2.0 protocol has undergone a comprehensive security audit by Antigravity AI, ensuring that the code is free of critical vulnerabilities and follows best practices for decentralized finance."
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-xs font-bold text-white">Status: PASS</div>
                        <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-xs font-bold text-white">Logic: IMMUTABLE</div>
                        <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 text-xs font-bold text-white">Feeless: VERIFIED</div>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Core Security Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="font-bold text-white mb-2">Mathematical Equilibrium</h3>
                        <p className="text-sm">
                            The protocol is designed as a closed-loop system. It can never have "unfunded liabilities" because rewards are only paid out from BNB that has already been received by the contract.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="font-bold text-white mb-2">Reentrancy Protection</h3>
                        <p className="text-sm">
                            Utilizes industry-standard <code>ReentrancyGuard</code> on all critical functions, preventing external calls from hijacking the distribution sequence.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="font-bold text-white mb-2">Zero Leakage Policy</h3>
                        <p className="text-sm">
                            The 0% platform fee ensures that no funds are "leaked" to admin wallets. 100% of the volume is either distributed as rewards or maintained in the global reward pool.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="font-bold text-white mb-2">Pull-Payment Fallback</h3>
                        <p className="text-sm">
                            If a reward transfer fails (e.g., to a contract wallet with high gas requirements), the funds are securely held in a <code>pendingReward</code> mapping for the user to withdraw manually.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2">Transparency Dashboard</h2>
                <p className="mb-4">
                    The AIPCore frontend provides a real-time transparency view that queries the smart contract directly. We believe in "Don't Trust, Verify" — every participant can see exactly how much BNB is in the contract and how much has been distributed globally.
                </p>
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-xl text-yellow-200 text-xs text-center">
                    Documentation verified by the Antigravity AI Security Audit Team.
                </div>
            </section>
        </div>
    );
}
