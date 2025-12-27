"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { FiLayers, FiActivity, FiCpu } from "react-icons/fi";

const features = [
  {
    title: "Fast Profile Updates",
    module: "SYNC",
    description: "Instantaneous global delivery for your bio nodes and static files.",
    icon: <FiLayers />
  },
  {
    title: "Profile Analytics",
    module: "STATS",
    description: "Deep insights into your reach without compromising network integrity.",
    icon: <FiActivity />
  },
  {
    title: "Secure Hosting",
    module: "DATA",
    description: "Distributed asset storage with secure AES-256 encryption.",
    icon: <FiCpu />
  },
];

const ThirdHero = () => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0.5, 1], [0, 5]);
  const translateZ = useTransform(scrollYProgress, [0.5, 1], [0, 20]);

  return (
    <div className="relative min-h-screen bg-[#0E0E0E] flex items-center justify-center overflow-hidden py-48 selection:bg-white selection:text-black">

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '120px 120px' }}
      />

      {/* Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white rounded-full blur-[180px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-24 items-center">

          {/* Feature Matrix Plane */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-16"
            >
              <div className="space-y-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.5em] text-white uppercase">ADVANCED TOOLS</span>
                  <div className="h-px w-8 bg-white/30" />
                </div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none italic uppercase text-white">
                  Advanced Features<span className="text-zinc-500 font-normal">.</span>
                </h2>
                <p className="text-lg text-white font-medium italic leading-relaxed max-w-md mx-auto lg:mx-0 opacity-90">
                  A powerful toolkit designed for the modern creator economy. Simple to use, impossible to ignore.
                </p>
              </div>

              <div className="grid gap-12">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="group"
                  >
                    <div className="flex items-start gap-6 border-l border-white/10 pl-8 group-hover:border-white/60 transition-all duration-700">
                      <div className="text-2xl text-white opacity-40 group-hover:opacity-100 transition-all duration-700 mt-1">
                        {f.icon}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-mono font-bold text-white tracking-widest uppercase italic bg-white/5 px-2 py-0.5 group-hover:bg-white group-hover:text-black transition-all">{f.module}</span>
                          <h3 className="text-lg font-bold uppercase tracking-tight italic text-white transition-colors">{f.title}</h3>
                        </div>
                        <p className="text-sm text-white opacity-60 font-medium italic leading-relaxed group-hover:opacity-100 transition-opacity">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ x: 10 }}
                className="mt-12 flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.5em] text-white hover:text-white transition-all duration-700 group"
              >
                <span className="border-b border-white/20 pb-1 group-hover:border-white transition-all">Get Started Now</span>
                <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </motion.button>
            </motion.div>
          </div>

          {/* Perspective Interface Preview */}
          <div className="lg:col-span-7 order-1 lg:order-2 perspective-[3000px]">
            <motion.div
              style={{ rotateX, translateZ }}
              className="relative bg-white/[0.02] border border-white/5 p-4 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.8)]"
            >
              {/* Technical Mockup Overlay */}
              <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[8px] font-mono text-white/80 uppercase tracking-widest">LIVE_STATUS</span>
                </div>
                <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">ENCRYPTED_ID_NODE</span>
              </div>

              {/* Minimalist Dashboard Preview */}
              <div className="relative bg-black h-[500px] md:h-[600px] overflow-hidden border border-white/5 flex flex-col">

                {/* Protocol Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-2 h-[2px] bg-white/40" />
                    <div className="w-2 h-[2px] bg-white/40" />
                  </div>
                  <div className="text-[9px] font-mono text-white font-bold tracking-[0.4em] uppercase italic">SWORD.LOL // DASHBOARD</div>
                  <div className="h-px w-12 bg-white/20" />
                </div>

                {/* UI Skeleton Stream */}
                <div className="flex-1 p-12 overflow-hidden flex gap-12">
                  <div className="w-1/4 space-y-8 border-r border-white/5 pt-4">
                    <div className="h-10 w-10 bg-white/10 border border-white/10" />
                    <div className="space-y-4">
                      <div className="h-[2px] w-full bg-white/20" />
                      <div className="h-[2px] w-2/3 bg-white/10" />
                      <div className="h-[2px] w-3/4 bg-white/10" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-12">
                    <div className="flex justify-between items-end border-b border-white/5 pb-8">
                      <div className="space-y-3">
                        <div className="h-4 w-48 bg-white/10" />
                        <div className="h-[2px] w-32 bg-white/20" />
                      </div>
                      <div className="h-14 w-32 border border-white/10 flex items-center justify-center">
                        <div className="w-4 h-[2px] bg-white/60" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="h-32 bg-black border border-white/10 p-6 flex flex-col justify-between group-hover:bg-white/[0.05] transition-colors">
                        <div className="h-[2px] w-8 bg-white/30" />
                        <div className="h-6 w-16 bg-white/20" />
                      </div>
                      <div className="h-32 bg-black border border-white/10 p-6 flex flex-col justify-between">
                        <div className="h-[2px] w-8 bg-white/30" />
                        <div className="h-6 w-16 bg-white/20" />
                      </div>
                    </div>
                    <div className="flex-1 border border-white/5 p-8 relative overflow-hidden bg-white/[0.02]">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="space-y-4">
                        <div className="h-[2px] w-full bg-white/20" />
                        <div className="h-[2px] w-full bg-white/10" />
                        <div className="h-[2px] w-full bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Glow Inside Mockup */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[100px] rounded-full" />
              </div>

              {/* Data Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 px-8 py-5 bg-white text-black text-[9px] font-bold uppercase tracking-[0.4em] italic shadow-2xl"
              >
                99.9%_UPTIME
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-12 -left-12 px-8 py-5 bg-black border border-white/10 text-white text-[9px] font-bold uppercase tracking-[0.4em] italic shadow-2xl"
              >
                SECURE_STORAGE
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Meta Accents */}
      <div className="absolute bottom-12 left-10 md:left-20 text-[9px] font-mono font-bold tracking-[0.5em] text-white opacity-40 uppercase italic">
        Sword.lol // Build_2025
      </div>
    </div>
  );
};

export default ThirdHero;
