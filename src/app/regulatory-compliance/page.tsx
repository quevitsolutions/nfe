import React from "react";
import Link from "next/link";

export default function RegulatoryCompliancePage() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8 md:p-16 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-blue-400 hover:text-blue-300">← Back to Home</Link>
                </div>

                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-500 bg-clip-text text-transparent mb-4">
                    Regulatory Compliance Notice – AIPCORE
                </h1>

                <p className="text-neural-gold mb-8 font-semibold">Effective Date: 1 January 2026</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <p>
                        This Regulatory Compliance Notice is provided to explain the legal and regulatory context under which AIPCORE (the "Protocol") operates.
                    </p>
                    <p>
                        By accessing or interacting with the Protocol, you acknowledge and accept the terms set forth in this Notice.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Decentralized Nature of the Protocol</h2>
                        <p className="mb-2">AIPCORE is a decentralized finance protocol governed by a decentralized autonomous organization (DAO) and executed exclusively through autonomous smart contracts deployed on public blockchain networks.</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>No centralized operator or controlling entity exists</li>
                            <li>No custodial services are provided</li>
                            <li>No user funds are held or managed by the Protocol</li>
                            <li>No discretionary control over transactions is exercised</li>
                            <li>All interactions occur directly between users and smart contracts.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. No Financial or Investment Services</h2>
                        <p className="mb-2">AIPCORE does not:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Act as a bank, broker, exchange, or money services business</li>
                            <li>Provide investment advice, financial advice, or recommendations</li>
                            <li>Offer securities, derivatives, or regulated financial instruments</li>
                        </ul>
                        <p className="mt-2">Any financial outcomes arise solely from user-initiated smart-contract interactions.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. No KYC / AML Obligations</h2>
                        <p className="mb-2">Because the Protocol is:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-2">
                            <li>Non-custodial</li>
                            <li>Permissionless</li>
                            <li>Smart-contract based</li>
                        </ul>
                        <p className="mb-2">AIPCORE does not conduct:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-2">
                            <li>Know-Your-Customer (KYC) checks</li>
                            <li>Anti-Money Laundering (AML) screening</li>
                            <li>Identity verification</li>
                        </ul>
                        <p>Users interact pseudonymously via blockchain wallets.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. User Responsibility for Legal Compliance</h2>
                        <p className="mb-2">Users are solely responsible for ensuring that their use of the Protocol complies with:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-2">
                            <li>Local, national, and international laws</li>
                            <li>Financial, tax, and reporting obligations</li>
                            <li>Digital asset regulations applicable in their jurisdiction</li>
                        </ul>
                        <p>Accessing the Protocol may be restricted or prohibited in certain regions.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5 Jurisdictional Restrictions</h2>
                        <p className="mb-2">The Protocol does not target or market to users in any specific jurisdiction.</p>
                        <p>If the use of decentralized finance protocols is restricted or prohibited under your local laws, you must not access or use aipcore.online.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Regulatory Uncertainty</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Blockchain and DeFi regulations are evolving globally</li>
                            <li>Regulatory interpretations may change without notice</li>
                             <li>Future laws may impact access to or use of the Protocol</li>
                            <li>AIPCORE makes no representation regarding future regulatory status.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. DAO Governance & Legal Status</h2>
                        <p className="mb-2">The Protocol is governed by a DAO composed of token holders or governance participants.</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>DAO participants are not partners, agents, or employees</li>
                            <li>Governance actions do not constitute legal control</li>
                            <li>Voting outcomes are executed through smart-contract logic</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Tax Responsibility</h2>
                        <p className="mb-2">AIPCORE does not calculate, report, or withhold taxes.</p>
                        <p>Users are solely responsible for tracking transactions, reporting taxable events, and complying with tax laws. Consult a qualified tax professional if needed.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Third-Party Interfaces & Services</h2>
                        <p className="mb-2">Users may access the Protocol through third-party interfaces, wallets, or tools.</p>
                        <ul className="list-disc pl-6 space-y-1 mb-2">
                            <li>AIPCORE does not control third-party services</li>
                            <li>Is not responsible for their compliance, availability, or security</li>
                        </ul>
                        <p>Users should review third-party terms independently.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">10. No Guarantees or Protections</h2>
                        <p className="mb-2">Assets interacting with the Protocol are not protected by:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-2">
                            <li>Government guarantees</li>
                            <li>Investor protection schemes</li>
                            <li>Deposit insurance programs</li>
                        </ul>
                        <p>Use of the Protocol is entirely at the user's own risk.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">11. Limitation of Liability</h2>
                        <p className="mb-2">To the maximum extent permitted by law, AIPCORE, DAO participants, developers, contributors, and interface providers shall not be liable for:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Regulatory actions or enforcement</li>
                            <li>Losses resulting from legal changes</li>
                            <li>User non-compliance with laws</li>
                            <li>Jurisdictional restrictions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Notice</h2>
                        <p className="mb-2">This Regulatory Compliance Notice may be updated from time to time. Updates will be reflected on this page with a revised effective date.</p>
                        <p>Continued use of the Protocol constitutes acceptance of the updated Notice.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">13. Contact & Governance Information</h2>
                        <p className="mb-2">For governance participation and protocol discussions, refer to official DAO communication channels.</p>
                        <p>Website: <a href="https://aipcore.online" className="text-blue-400 hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">https://aipcore.online</a></p>
                    </section>

                    <div className="pt-8 border-t border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-2">Important Legal Notice</h3>
                        <p className="mb-2">Decentralized protocols may be subject to regulatory scrutiny or restrictions in certain jurisdictions.</p>
                        <p>Users are responsible for understanding and complying with applicable laws before interacting with the Protocol.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
