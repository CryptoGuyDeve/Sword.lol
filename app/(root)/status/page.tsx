"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiActivity, FiServer, FiShield, FiDatabase, FiCpu, FiGlobe, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const StatusPage = () => {
    const [systems, setSystems] = useState([
        { id: "API_GATEWAY", name: "API Gateway", status: "Operational", uptime: "99.99%", latency: "24ms", load: "12%", icon: <FiCpu /> },
        { id: "IDENTITY_SRV", name: "Identity Service", status: "Operational", uptime: "100%", latency: "12ms", load: "8%", icon: <FiShield /> },
        { id: "STORAGE_NODE", name: "Asset Storage", status: "Operational", uptime: "99.95%", latency: "45ms", load: "64%", icon: <FiDatabase /> },
        { id: "CDN_EDGE", name: "Global CDN", status: "Operational", uptime: "100%", latency: "8ms", load: "31%", icon: <FiGlobe /> },
        { id: "ANALYTICS_PROC", name: "Analytics Processor", status: "Operational", uptime: "99.90%", latency: "120ms", load: "45%", icon: <FiActivity /> },
        { id: "BROADCAST_HUB", name: "Broadcast Hub", status: "Operational", uptime: "99.98%", latency: "56ms", load: "22%", icon: <FiServer /> },
    ]);

    const [lastIncident, setLastIncident] = useState({
        title: "Scheduled Calibration Complete",
        time: "2 hours ago",
        details: "System-wide database optimization protocol successfully synchronized across all edge nodes."
    });

    // Simulate live fluctuations
    useEffect(() => {
        const interval = setInterval(() => {
            setSystems(prev => prev.map(sys => ({
                ...sys,
                latency: `${Math.floor(parseInt(sys.latency) + (Math.random() * 10 - 5))}ms`,
                load: `${Math.floor(parseInt(sys.load) + (Math.random() * 4 - 2))}%`
            })));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen bg-[#0E0E0E] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
            />

            {/* Ambient Shading */}
            <div className="absolute inset-0 pointer-events-none z-[1]">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
            </div>

            {/* Global Grain Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48">

                {/* Header Section */}
                <div className="mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
                                SYSTEM_ACCESS / STATUS_MONITOR
                            </span>
                            <div className="h-px w-12 bg-white/10" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter italic mb-8">
                            Status<span className="text-gray-600 font-normal">.</span>
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-12">
                            <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">ALL_SYSTEMS_OPERATIONAL</span>
                            </div>
                            <p className="text-zinc-500 font-medium italic tracking-tight text-lg max-w-md">
                                Real-time synchronization data and network health metrics from the Sword broadcast grid.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* System Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 overflow-hidden shadow-2xl mb-32">
                    {systems.map((sys, index) => (
                        <motion.div
                            key={sys.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05, duration: 1 }}
                            className="bg-black/40 p-12 hover:bg-white group transition-all duration-700 relative flex flex-col gap-12"
                        >
                            <div className="flex justify-between items-start">
                                <div className="text-4xl text-gray-700 group-hover:text-black transition-colors duration-700">
                                    {sys.icon}
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-500 group-hover:text-black uppercase">
                                        {sys.id}
                                    </span>
                                    <span className="text-[14px] font-bold text-green-500 group-hover:text-black transition-colors">
                                        {sys.uptime}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold tracking-tighter italic text-zinc-300 group-hover:text-black transition-colors">
                                    {sys.name}
                                </h3>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-600 group-hover:text-black/40 uppercase">Latency</span>
                                        <div className="text-lg font-bold tracking-tight group-hover:text-black transition-colors">{sys.latency}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-600 group-hover:text-black/40 uppercase">System Load</span>
                                        <div className="text-lg font-bold tracking-tight group-hover:text-black transition-colors">{sys.load}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Geometric Detail */}
                            <div className="absolute bottom-12 right-12 w-16 h-8 flex items-end gap-1 opacity-20 group-hover:opacity-100 transition-all duration-700">
                                {[4, 7, 5, 8, 6, 9, 7].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [`${h * 10}%`, `${(h + 2) * 10}%`, `${h * 10}%`] }}
                                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                                        className="w-1 bg-zinc-700 group-hover:bg-black"
                                    />
                                ))}
                            </div>

                            {/* Corner Accents on Hover */}
                            <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/5 group-hover:border-black/20 transition-all duration-700" />
                            <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/5 group-hover:border-black/20 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>

                {/* Incident Log Node */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative p-16 border border-white/5 bg-white/[0.02] flex flex-col md:flex-row justify-between gap-16 overflow-hidden group"
                >
                    <div className="space-y-6 max-w-xl z-10">
                        <div className="flex items-center gap-4">
                            <FiCheckCircle className="text-green-500" />
                            <h3 className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/40 uppercase">LATEST_INCIDENT_REPORT</h3>
                        </div>
                        <h4 className="text-3xl font-bold tracking-tighter italic">{lastIncident.title}</h4>
                        <p className="text-zinc-400 font-medium italic tracking-tight leading-relaxed">
                            {lastIncident.details}
                        </p>
                    </div>
                    <div className="flex flex-col items-end justify-center gap-4 z-10">
                        <span className="text-4xl font-bold tracking-tighter italic text-white group-hover:text-zinc-400 transition-colors">{lastIncident.time}</span>
                        <div className="h-px w-24 bg-white/10 group-hover:w-48 transition-all duration-1000" />
                        <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">Status: Resolved</span>
                    </div>

                    {/* Background Meta Detail */}
                    <div className="absolute top-8 right-8 text-[120px] font-bold italic opacity-[0.01] pointer-events-none group-hover:opacity-[0.02] transition-opacity duration-1000">
                        LOG_05
                    </div>
                </motion.div>

                {/* Secondary Meta Stream */}
                <div className="mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-700 uppercase">Calibration Node</span>
                            <span className="text-[10px] font-bold italic text-zinc-500 tracking-widest uppercase">Global_Symmetry</span>
                        </div>
                        <div className="h-8 w-px bg-zinc-800" />
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-700 uppercase">Encryption</span>
                            <span className="text-[10px] font-bold italic text-zinc-500 tracking-widest uppercase">AES_256_GCM</span>
                        </div>
                    </div>
                    <div className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase italic">
                        Scanning for temporal anomalies...
                    </div>
                </div>

            </main>

            {/* Vertical Branding */}
            <div className="fixed bottom-12 left-6 hidden 2xl:block opacity-20">
                <div className="text-[8px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">MONITOR_CORE_v2.6</div>
            </div>

            <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
        </div>
    );
};

export default StatusPage;
