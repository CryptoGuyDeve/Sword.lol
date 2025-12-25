"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Ultra-Minimal Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      {/* Global Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] animate-pulse" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay'
      }} />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Modern Label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-block px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
            Evolution of *Bio Links*
          </span>
        </motion.div>

        {/* Powerful Typography with Staggered Reveal */}
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-8xl lg:text-[10.5rem] font-bold tracking-tight leading-[0.85] pointer-events-none"
          >
            <span className="bg-gradient-to-b from-white via-white to-gray-400 text-transparent bg-clip-text inline-block pb-4">
              Own Your
            </span>
            <br />
            <span className="text-white inline-block italic">
              Identity.
            </span>
          </motion.h1>
        </div>

        {/* Minimalist Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl max-w-2xl mx-auto text-gray-300 mb-14 font-normal leading-relaxed tracking-tight"
        >
          The definitive platform for modern creators. <br className="hidden md:block" />
          Secure, beautiful, and unapologetically minimal.
        </motion.p>

        {/* Ultra-Clean CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/signup")}
            className="group relative px-12 py-5 bg-white text-black rounded-none font-bold text-sm uppercase tracking-widest transition-all duration-500"
          >
            <span className="flex items-center space-x-3">
              <span>Start Building</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Magnetic Border Glow Effect */}
            <div className="absolute inset-0 -m-[1px] border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>

          <motion.button
            onClick={() => router.push("/login")}
            className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-white transition-colors duration-500 py-2 border-b border-transparent hover:border-white"
          >
            Sign In
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modern Scrolling Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-700 to-transparent" />
      </motion.div>

      {/* Architectural Corner Accents */}
      <div className="absolute top-8 left-8 w-px h-12 bg-white/5" />
      <div className="absolute top-8 left-8 w-12 h-px bg-white/5" />
      <div className="absolute top-8 right-8 w-px h-12 bg-white/5" />
      <div className="absolute top-8 right-8 w-12 h-px bg-white/5" />
      <div className="absolute bottom-8 left-8 w-px h-12 bg-white/5" />
      <div className="absolute bottom-8 left-8 w-12 h-px bg-white/5" />
      <div className="absolute bottom-8 right-8 w-px h-12 bg-white/5" />
      <div className="absolute bottom-8 right-8 w-12 h-px bg-white/5" />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.05; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
