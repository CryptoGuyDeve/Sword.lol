"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { FiTarget, FiZap, FiBarChart2, FiArrowRight, FiCheck, FiCpu, FiPlusCircle } from "react-icons/fi";
import Loading from "@/components/Loading";

// Force dynamic rendering
export const dynamic = "force-dynamic";

const GetViewsPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const pricingTiers = [
        {
            name: "Starter Protocol",
            views: "1,000",
            price: "$5",
            id: "P_001",
            features: ["Standard Priority", "Organic Flow", "Network Injection"],
            accent: "rgba(168,85,247,0.1)"
        },
        {
            name: "Growth Algorithm",
            views: "5,000",
            price: "$20",
            id: "P_002",
            features: ["High Priority", "Targeted Nodes", "Real-time Sync", "Analytics Briefing"],
            accent: "rgba(255,255,255,0.05)",
            recommended: true
        },
        {
            name: "Viral Synthesis",
            views: "10,000",
            price: "$35",
            id: "P_003",
            features: ["Top Tier Priority", "Infinite Recursion", "Global Node Broadast", "24/7 Monitoring"],
            accent: "rgba(255,255,255,0.08)"
        }
    ];

    if (loading) return <Loading fullScreen text="CALIBRATING_ALGORITHMS" />;

    return (
        <div className="flex bg-[#0E0E0E] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black font-sans">
            <Sidebar username={username || "Entity"} id={id as string} />

            <main className="flex-1 relative overflow-y-auto h-screen custom-scrollbar">
                {/* Stage 3: Ambient Shading */}
                <div className="absolute inset-0 pointer-events-none z-[1]">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
                </div>

                {/* Global Grain Texture */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Background Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

                    {/* Header */}
                    <div className="mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-zinc-400 uppercase">
                                    REACH_MODULE / CALIBRATION
                                </span>
                                <div className="h-px w-12 bg-white/10" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic mb-8">
                                Get Views<span className="text-gray-600 font-normal">.</span>
                            </h1>
                            <p className="max-w-xl text-zinc-400 font-medium italic tracking-tight text-lg">
                                Accelerate your node's visibility using Sword's proprietary distribution protocols. Targeted reach across a global decentralized network.
                            </p>
                        </motion.div>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 mb-24 overflow-hidden shadow-2xl">
                        {pricingTiers.map((tier, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="bg-black/40 p-12 flex flex-col relative group transition-all duration-700"
                                style={{ backgroundColor: tier.recommended ? "rgba(255,255,255,0.02)" : "" }}
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <div className="space-y-2">
                                        <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">{tier.id}</span>
                                        {tier.recommended && (
                                            <span className="block text-[8px] font-bold tracking-[0.3em] text-purple-400 uppercase">Recommended Protocol</span>
                                        )}
                                    </div>
                                    <FiZap className={`text-xl ${tier.recommended ? "text-purple-400" : "text-zinc-600"} group-hover:text-white transition-colors duration-500`} />
                                </div>

                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold italic tracking-tight mb-4">{tier.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold tracking-tighter">{tier.price}</span>
                                        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">/ {tier.views} Views</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-16 flex-1">
                                    {tier.features.map((f, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <FiCheck className="text-zinc-700 text-xs" />
                                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-5 text-[10px] font-bold tracking-[0.5em] uppercase transition-all duration-700 flex items-center justify-center gap-3 ${tier.recommended ? "bg-white text-black hover:bg-zinc-200" : "bg-zinc-900 text-zinc-400 border border-white/5 hover:bg-white hover:text-black hover:border-white"}`}>
                                    Initialize Reach <FiArrowRight className="text-xs" />
                                </button>

                                {/* Grid Decorative */}
                                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute top-4 right-4 w-px h-2 bg-white/20" />
                                    <div className="absolute top-4 right-4 h-px w-2 bg-white/20" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Technical Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="bg-white/[0.02] border border-white/5 p-12 md:p-16 relative group"
                        >
                            <FiCpu className="text-zinc-600 text-2xl mb-8 group-hover:text-white transition-colors" />
                            <h4 className="text-xl font-bold italic mb-6 shadow-text">Operational Logic<span className="text-gray-600">.</span></h4>
                            <p className="text-sm text-zinc-400 leading-relaxed italic font-medium">
                                Our algorithm cross-references your profile's metadata against a global pool of active creators. By injecting your node into high-velocity streams, we achieve organic-style reach with surgical precision. 100% Secure.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="bg-white/[0.02] border border-white/5 p-12 md:p-16 relative group"
                        >
                            <FiBarChart2 className="text-zinc-600 text-2xl mb-8 group-hover:text-white transition-colors" />
                            <h4 className="text-xl font-bold italic mb-6 shadow-text">Conversion Tracking<span className="text-gray-600">.</span></h4>
                            <p className="text-sm text-zinc-400 leading-relaxed italic font-medium">
                                Every view generated through our protocol is logged in your real-time analytics suite. Monitor geographical origin, device type, and interaction recursion from your unified dashboard.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.05);
          }
          .shadow-text {
             text-shadow: 0 0 40px rgba(255,255,255,0.05);
          }
        `}</style>
            </main>
        </div>
    );
};

export default GetViewsPage;