"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiLock, FiEye, FiServer, FiActivity, FiArrowLeft, FiCpu } from "react-icons/fi";
import Link from "next/link";

const Privacy = () => {
  const sections = [
    {
      id: "01",
      title: "Introduction",
      icon: <FiShield />,
      content: "Welcome to Sword.lol. Your privacy is paramount. We are committed to protecting your personal data through advanced encryption and minimalist data retention protocols."
    },
    {
      id: "02",
      title: "Data Collection",
      icon: <FiActivity />,
      content: "We collect essential markers including contact details, profile identifiers, and network diagnostics to maintain system integrity and personalized experience.",
      list: ["Identity markers (Name, Email)", "System identifiers (Username)", "Network diagnostics (IP, Device)", "Usage trajectory data"]
    },
    {
      id: "03",
      title: "Data Utilization",
      icon: <FiCpu className="rotate-90" />, // Using FiCpu as a stand-in for processing
      content: "Your data is utilized for system personalization, network security enhancements, and critical update broadcasts.",
      list: ["System personalization", "Security & performance audits", "Broadcast communications", "Fraud prevention protocols"]
    },
    {
      id: "04",
      title: "Tracking Protocols",
      icon: <FiEye />,
      content: "We utilize minimalist tracking technologies to optimize network performance. Metadata can be adjusted via browser configuration."
    },
    {
      id: "05",
      title: "External Nodes",
      icon: <FiServer />,
      content: "Data may be synchronized with trusted external nodes for hosting and analytical processing, strictly adhering to privacy regulations."
    },
    {
      id: "06",
      title: "Security Layers",
      icon: <FiLock />,
      content: "Implementation of industry-standard cryptographic measures to protect your data architecture. No network is entirely invincible."
    }
  ];

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

      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-32 md:py-48">

        {/* Header Section */}
        <div className="mb-32 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
                PRIVACY_PROTOCOL / MODULE_05
              </span>
              <div className="h-px w-12 bg-white/10" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter italic mb-8">
              Privacy<span className="text-gray-600 font-normal">.</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
              <p className="text-zinc-400 font-medium italic tracking-tight text-xl max-w-xl">
                Our commitment to data integrity and architectural transparency within the Sword network.
              </p>
              <div className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase">
                Last Calibration: {new Date().toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden shadow-2xl">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 1 }}
              className="bg-black/40 p-12 hover:bg-white group transition-all duration-700 relative flex flex-col gap-8 min-h-[400px]"
            >
              <div className="flex justify-between items-start">
                <div className="text-4xl text-gray-700 group-hover:text-black transition-colors duration-700">
                  {section.icon}
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 group-hover:text-black opacity-30 group-hover:opacity-10 transition-all">
                  SEC_{section.id}
                </span>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-zinc-400 group-hover:text-black transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm font-medium italic leading-relaxed text-zinc-500 group-hover:text-zinc-800 transition-colors">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="space-y-3 mt-6">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[11px] font-mono tracking-wider text-zinc-600 group-hover:text-zinc-900 transition-colors">
                        <div className="w-1 h-1 bg-zinc-800 group-hover:bg-black rounded-full" />
                        {item.toUpperCase()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Corner Accents on Hover */}
              <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/5 group-hover:border-black/20 transition-all duration-700" />
              <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/5 group-hover:border-black/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Contact Node */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-32 p-16 border border-white/5 bg-white/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-12"
        >
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/40 uppercase">Communications_Point</h3>
            <p className="text-xl font-bold italic tracking-tight">Questions regarding our protocol?</p>
          </div>
          <a
            href="mailto:m.faizurrehman.business@gmail.com"
            className="px-10 py-5 bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-zinc-200 transition-all"
          >
            Initiate Contact
          </a>
        </motion.div>

        {/* Navigation Control */}
        <div className="mt-24 flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="group flex flex-col items-center gap-4 text-gray-600 hover:text-white transition-colors duration-700"
          >
            <div className="h-12 w-px bg-white/10 group-hover:h-16 group-hover:bg-white transition-all duration-700" />
            <span className="text-[9px] font-mono font-bold tracking-[0.5em] uppercase italic">Return to Origin</span>
          </button>
        </div>

      </main>

      {/* Vertical Meta Details */}
      <div className="fixed bottom-12 left-12 hidden xl:block z-10">
        <div className="text-[9px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">Network_Security_Protocol / v2.4</div>
      </div>
      <div className="fixed bottom-12 right-12 hidden xl:block z-10">
        <div className="text-[9px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">Sword_Integrity_Layer</div>
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

export default Privacy;
