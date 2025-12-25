"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

const features = [
  {
    title: "Instant Propagation",
    description: "Global edge delivery for your bio links and assets.",
  },
  {
    title: "Advanced Analytics",
    description: "Deep insights into your audience without compromising privacy.",
  },
  {
    title: "Secure Hosting",
    description: "Encrypted asset storage with lightning-fast retrieval.",
  },
];

const ThirdHero = () => {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0.5, 1], [0, 10]);
  const translateZ = useTransform(scrollYProgress, [0.5, 1], [0, 50]);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-40">
      {/* Stage 3: Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[150px]"
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/[0.02] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-500/[0.02] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-24 items-center">

          {/* Left Column - Content */}
          <div className="lg:col-span-5 order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter leading-tight">
                Refined Control. <br />
                <span className="text-gray-300 italic">Absolute Simplicity.</span>
              </h2>

              <p className="text-lg text-gray-300 mb-16 font-normal leading-relaxed max-w-md mx-auto lg:mx-0 opacity-80">
                A toolkit designed for the modern *era* of creator economy. Performance that feels *invisible*.
              </p>

              <div className="space-y-12">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className="group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-1 h-1 bg-white opacity-40 group-hover:opacity-100 transition-opacity" />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] italic">{f.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400 font-normal group-hover:text-gray-200 transition-colors">{f.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ gap: "2rem" }}
                className="mt-20 flex items-center gap-6 text-xs uppercase tracking-[0.4em] font-bold text-gray-300 hover:text-white transition-all duration-500 group"
              >
                <span>Full Developer API</span>
                <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100" />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Parallax Mockup */}
          <div className="lg:col-span-7 order-1 lg:order-2 perspective-[2000px]">
            <motion.div
              style={{ rotateX, translateZ }}
              className="relative bg-white/[0.02] border border-white/5 p-4 rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              {/* Inner UI container with grain */}
              <div className="relative bg-black rounded-lg overflow-hidden border border-white/5 aspect-[1.1] md:aspect-auto md:h-[600px] flex flex-col">
                {/* Browser bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                  <div className="text-[10px] text-gray-600 tracking-widest font-light">SWORD.LOL / DASHBOARD</div>
                  <div className="w-2 h-2" />
                </div>

                {/* Main UI Area */}
                <div className="flex-1 p-8 md:p-12 overflow-hidden">
                  <div className="grid grid-cols-12 gap-6 h-full">
                    {/* UI Sidebar Skeleton */}
                    <div className="col-span-3 space-y-6">
                      <div className="h-10 w-10 bg-white/5 rounded-full" />
                      <div className="space-y-3">
                        <div className="h-2 w-full bg-white/10 rounded" />
                        <div className="h-2 w-2/3 bg-white/5 rounded" />
                        <div className="h-2 w-3/4 bg-white/5 rounded" />
                      </div>
                    </div>

                    {/* UI Main Skeleton */}
                    <div className="col-span-9 space-y-8">
                      <div className="flex justify-between items-end">
                        <div className="h-8 w-1/2 bg-white/10 rounded" />
                        <div className="h-10 w-24 bg-white rounded" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="h-32 bg-white/[0.03] border border-white/5 rounded-xl p-6">
                          <div className="h-2 w-12 bg-white/10 rounded mb-4" />
                          <div className="h-6 w-20 bg-white/20 rounded" />
                        </div>
                        <div className="h-32 bg-white/[0.03] border border-white/5 rounded-xl p-6">
                          <div className="h-2 w-12 bg-white/10 rounded mb-4" />
                          <div className="h-6 w-20 bg-white/20 rounded" />
                        </div>
                      </div>
                      <div className="h-40 bg-white/[0.03] border border-white/5 rounded-xl p-6 overflow-hidden relative">
                        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
                        <div className="space-y-4">
                          <div className="h-2 w-full bg-white/10 rounded" />
                          <div className="h-2 w-full bg-white/5 rounded" />
                          <div className="h-2 w-2/3 bg-white/5 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Glow Inside Mockup */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[80px] rounded-full" />
              </div>

              {/* External Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 px-6 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest shadow-2xl"
              >
                99.9% UPTIME
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 px-6 py-4 bg-black border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest shadow-2xl"
              >
                ENCRYPTED STORAGE
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdHero;
