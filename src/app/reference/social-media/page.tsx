import React from "react";
import { Twitter, Youtube, Send } from "lucide-react";

export default function SocialMediaPage() {
    return (
        <div className="space-y-6 text-slate-600 leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-8">
                Official Channels
            </h1>

            <p className="mb-8">
                Connect with the <strong>AIPCore</strong> community and stay updated on the evolution of 100% community-owned finance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Twitter / X */}
                <a
                    href="https://x.com/AIPCore_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-4 bg-white border border-brand-green/10 p-8 rounded-2xl hover:bg-brand-mint hover:border-brand-green/30 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform">
                        <Twitter className="w-8 h-8 text-slate-900 group-hover:text-slate-500" />
                    </div>
                    <span className="font-bold text-lg text-slate-900">X (Twitter)</span>
                    <span className="text-sm text-[#ed1b24]">@AIPCore_official</span>
                </a>

                {/* YouTube */}
                <a
                    href="https://www.youtube.com/@AIPCore_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-4 bg-white border border-brand-green/10 p-8 rounded-2xl hover:bg-brand-mint hover:border-brand-green/30 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform">
                        <Youtube className="w-8 h-8 text-slate-900 group-hover:text-red-500" />
                    </div>
                    <span className="font-bold text-lg text-slate-900">YouTube</span>
                    <span className="text-sm text-[#ed1b24]">@AIPCore_official</span>
                </a>

                {/* Telegram */}
                <a
                    href="https://t.me/AIPCore_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-4 bg-white border border-brand-green/10 p-8 rounded-2xl hover:bg-brand-mint hover:border-brand-green/30 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform">
                        <Send className="w-8 h-8 text-slate-900 group-hover:text-slate-500" />
                    </div>
                    <span className="font-bold text-lg text-slate-900">Telegram</span>
                    <span className="text-sm text-[#ed1b24]">@AIPCore_official</span>
                </a>
            </div>
        </div>
    );
}


