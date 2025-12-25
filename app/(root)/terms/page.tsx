"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiLock, FiFileText, FiGlobe, FiAlertCircle, FiArrowLeft, FiCpu } from "react-icons/fi";
import Link from "next/link";

const Terms = () => {
  const sections = [
    {
      id: "01",
      title: "Sync Agreement",
      icon: <FiGlobe />,
      content: "By accessing the Sword broadcast network, you agree to comply with the architectural integrity and operational protocols established by Sword.lol. These terms govern your synchronization with our services."
    },
    {
      id: "02",
      title: "Entity Responsibility",
      icon: <FiCpu />,
      content: "As a registered entity within our grid, you are responsible for maintaining the security of your authentication tokens and all activities conducted through your broadcast node."
    },
    {
      id: "03",
      title: "Broadcast Standards",
      icon: <FiShield />,
      content: "Entities must adhere to the high-performance communication standards of the network. Harassment, unauthorized data extraction, and protocol disruption are strictly prohibited."
    },
    {
      id: "04",
      title: "Data Persistence",
      icon: <FiFileText />,
      content: "Sword.lol reserves the right to optimize network storage. While we prioritize high-availability data persistence, users are encouraged to maintain local backups of their broadcast configurations."
    },
    {
      id: "05",
      title: "Security Protocols",
      icon: <FiLock />,
      content: "We implement rigorous encryption standards. Attempting to bypass the security gateway or exploit network vulnerabilities will result in immediate synchronization termination."
    },
    {
      id: "06",
      title: "Protocol Variations",
      icon: <FiAlertCircle />,
      content: "Sword reserves the right to calibrate these terms at any time. Significant protocol adjustments will be broadcast to the network status dashboard."
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
                LEGAL_FRAMEWORK / MODULE_08
              </span>
              <div className="h-px w-12 bg-white/10" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter italic mb-8 uppercase">
              Terms<span className="text-gray-600 font-normal">.</span>
            </h1>
            <p className="text-zinc-500 font-medium italic tracking-tight text-lg max-w-2xl leading-relaxed">
              Establishing the operational boundaries and sync responsibilities for all entities within the Sword broadcast network.
            </p>
          </motion.div>
        </div>

        {/* Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 overflow-hidden shadow-2xl">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 1 }}
              className="bg-black/40 p-12 hover:bg-white group transition-all duration-700 relative flex flex-col gap-12"
            >
              <div className="flex justify-between items-start">
                <div className="text-4xl text-gray-700 group-hover:text-black transition-colors duration-700">
                  {section.icon}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-700 group-hover:text-black transition-colors uppercase">
                  Protocol_{section.id}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold tracking-tighter italic text-zinc-300 group-hover:text-black transition-colors uppercase">
                  {section.title}
                </h3>
                <p className="text-zinc-500 font-medium italic leading-relaxed group-hover:text-zinc-800 transition-colors">
                  {section.content}
                </p>
              </div>

              {/* Corner Accents on Hover */}
              <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/5 group-hover:border-black/20 transition-all duration-700" />
              <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/5 group-hover:border-black/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Action Node */}
        <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-12">
          <Link href="/" className="group flex flex-col items-center gap-4 text-zinc-600 hover:text-white transition-all duration-700">
            <div className="h-px w-24 bg-white/10 group-hover:w-48 group-hover:bg-white transition-all duration-700" />
            <div className="flex items-center gap-3">
              <FiArrowLeft className="group-hover:-translate-x-2 transition-transform" />
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase italic">Return to Origin</span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-700 uppercase">Last Calibration</span>
              <span className="text-[10px] font-bold italic text-zinc-500 tracking-widest uppercase">Dec_26_2025</span>
            </div>
            <div className="h-10 w-px bg-zinc-800" />
            <div className="flex flex-col">
              <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-700 uppercase">Verification</span>
              <span className="text-[10px] font-bold italic text-zinc-500 tracking-widest uppercase">RSA_Signed</span>
            </div>
          </div>
        </div>

      </main>

      {/* Floating Meta Identifier */}
      <div className="fixed bottom-12 right-12 opacity-5 pointer-events-none hidden xl:block">
        <div className="text-[120px] font-bold italic uppercase tracking-tighter">TERM_SYNC</div>
      </div>

      {/* Vertical Meta Layers */}
      <div className="fixed bottom-12 left-6 hidden 2xl:block opacity-20 pointer-events-none">
        <div className="text-[8px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">LEGAL_CORE_v2.9</div>
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

export default Terms;
