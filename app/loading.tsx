"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center justify-center selection:bg-white selection:text-black font-sans">
      {/* Stage 3: Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/[0.03] blur-[150px] rounded-full" />
      </div>

      {/* Global Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Architectural Loading Indicator */}
        <div className="relative w-24 h-24 mb-12">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-white/10 rounded-none"
          />
          {/* Inner Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border border-white/20 rounded-none"
          />
          {/* Center Pulsing Square */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-8 bg-white/40"
          />

          {/* Corner Accents */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-white/40" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-white/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="text-[10px] uppercase font-bold tracking-[0.6em] text-white/40 mb-3 italic">
            Initializing Protocol
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-white/10" />
            <span className="text-[9px] font-mono text-white/20 tracking-widest">
              SYSTEM_STAGING / ARCH_CORE
            </span>
            <div className="h-px w-8 bg-white/10" />
          </div>
        </motion.div>
      </div>

      {/* Floating Meta Details */}
      <div className="fixed bottom-12 left-12 hidden lg:block z-[2]">
        <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-900 uppercase vertical-text italic">
          Network / Syncing
        </div>
      </div>
      <div className="fixed bottom-12 right-12 hidden lg:block z-[2]">
        <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-900 uppercase vertical-text italic">
          Sword.lol / Core
        </div>
      </div>

      <style jsx global>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
    </div>
  );
}
