"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { ArrowRight, ChevronDown } from "lucide-react";

const Hero = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0E0E0E] flex flex-col items-center justify-center text-white overflow-hidden selection:bg-white selection:text-black"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />

      {/* Cinematic Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/[0.02] blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.01, 0.03, 0.01],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-white/5 blur-[100px] rounded-full"
        />
      </div>

      {/* Global Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center"
      >
        {/* Module Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-center justify-center gap-4"
        >
          <div className="h-px w-8 bg-white/10" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-white/40">
            PREMIUM IDENTITY NETWORK
          </span>
          <div className="h-px w-8 bg-white/10" />
        </motion.div>

        {/* Cinematic Title */}
        <div className="mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-[0.8] italic mb-6"
          >
            Own Your<br />
            <span className="text-white">Identity</span>
            <span className="text-gray-600 font-normal">.</span>
          </motion.h1>
        </div>

        {/* Minimalist Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="text-lg md:text-2xl max-w-2xl mx-auto text-zinc-400 font-medium italic mb-16 leading-relaxed tracking-tight"
        >
          The ultimate platform for modern creators. <br className="hidden md:block" />
          Simple, beautiful, and powerful.
        </motion.p>

        {/* CTA Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/signup")}
            className="group relative px-16 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-700 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 bg-zinc-200 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700" />
          </motion.button>

          <motion.button
            onClick={() => router.push("/login")}
            className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-all duration-700 pb-1 border-b border-transparent hover:border-white/20"
          >
            SIGN_IN
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Cinematic Metadata stream */}
      <div className="absolute bottom-12 left-10 md:left-20 z-10 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-zinc-500 uppercase">STATUS: ONLINE</span>
        </div>
        <div className="text-[9px] font-mono tracking-[0.3em] text-zinc-700 uppercase vertical-text h-32 block 2xl:hidden">
          ESTABLISHED_2024
        </div>
      </div>

      {/* Vertical Metadata */}
      <div className="fixed top-1/2 -translate-y-1/2 left-8 hidden 2xl:block z-10 opacity-20 pointer-events-none">
        <div className="text-[8px] font-mono font-bold tracking-[0.6em] text-gray-800 uppercase vertical-text">
          SECURE PLATFORM // DATA ENCRYPTED
        </div>
      </div>

      <div className="fixed top-1/2 -translate-y-1/2 right-8 hidden 2xl:block z-10 opacity-20 pointer-events-none">
        <div className="text-[8px] font-mono font-bold tracking-[0.6em] text-gray-800 uppercase vertical-text">
          99.9% UPTIME // FAST DELIVERY
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-12 right-10 md:right-20 flex flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-white" />
          <span className="text-[8px] font-mono font-bold tracking-[0.5em] text-white/40 uppercase italic">UPLINK</span>
        </div>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/10" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/10" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/10" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/10" />

      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
};

export default Hero;
