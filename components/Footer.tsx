"use client";

import React from "react";
import Link from "next/link";
import { FaTiktok, FaDiscord, FaTelegramPlane } from "react-icons/fa";
import { Gamepad, Sparkles, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const footerLinks = {
    platform: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
    ],
    architecture: [
      { name: "About Core", href: "/about" },
      { name: "Network Status", href: "/status" },
      { name: "Support Hub", href: "/help" },
      { name: "Contact Protocol", href: "mailto:codeandmotion.business@gmail.com" },
    ],
    legal: [
      { name: "Privacy Protocol", href: "/privacy" },
      { name: "Terms of Sync", href: "/terms" },
      { name: "Cookie Security", href: "/cookies" },
    ],
  };

  return (
    <footer className="relative bg-[#0E0E0E] text-white overflow-hidden selection:bg-white selection:text-black">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />

      {/* Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/[0.02] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] blur-[150px] rounded-full" />
      </div>

      {/* Global Grain Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32">

        {/* Top Sequence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-32">

          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
                  FOOTER_SEQUENCE / MODULE_06
                </span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <Link href="/">
                <h2 className="text-4xl font-bold tracking-tighter italic hover:opacity-70 transition-opacity">
                  Sword<span className="text-gray-600 font-normal">.</span>lol
                </h2>
              </Link>
              <p className="mt-8 text-zinc-500 font-medium italic tracking-tight text-lg leading-relaxed max-w-sm">
                The premier platform for high-performance identities and secure broadcast nodes. Architectural, minimal, and premium.
              </p>
            </motion.div>

            {/* Social Matrix */}
            <div className="flex gap-4">
              {[
                { icon: FaDiscord, href: "https://discord.gg/FhECf5pQQH", label: "DISCORD" },
                { icon: FaTiktok, href: "https://www.tiktok.com/@sward.lol", label: "TIKTOK" },
                { icon: FaTelegramPlane, href: "#", label: "TELEGRAM" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="w-12 h-12 bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:bg-white hover:text-black transition-all duration-700 group relative"
                >
                  <social.icon className="w-5 h-5 bg-transparent" />
                  {/* Architectural Accent */}
                  <div className="absolute top-0 left-0 w-1 h-1 bg-white/10 group-hover:bg-black/20" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {Object.entries(footerLinks).map(([category, links], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1, duration: 1 }}
              >
                <h3 className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase mb-8 italic">
                  {category}
                </h3>
                <ul className="space-y-4">
                  {links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium italic text-zinc-500 hover:text-white transition-all duration-500 flex items-center gap-3 group"
                      >
                        <div className="w-0 h-px bg-white group-hover:w-4 transition-all duration-500" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Synchronize Node (Newsletter) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="bg-white/[0.02] border border-white/5 p-12 md:p-20 relative overflow-hidden group"
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="space-y-4 max-w-md">
              <h3 className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/40 uppercase">SYNCHRONIZE_PROTOCOL</h3>
              <p className="text-3xl font-bold tracking-tighter italic">Receive broadcast updates directly to your terminal.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-px bg-white/10 border border-white/10 w-full md:w-auto overflow-hidden shadow-2xl">
              <input
                type="email"
                placeholder="ADDRESS@PROTOCOL.COM"
                className="px-8 py-5 bg-black/40 text-white text-[10px] font-mono tracking-widest placeholder:text-zinc-700 focus:outline-none min-w-[300px]"
              />
              <button className="px-10 py-5 bg-white text-black text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-zinc-200 transition-all">
                SYNCHRONIZE
              </button>
            </div>
          </div>
          {/* Background Meta Detail */}
          <div className="absolute top-8 right-8 text-[40px] font-bold italic opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000">
            SYNC_NODE_06
          </div>
        </motion.div>

        {/* Bottom Metadata Layer */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-600 uppercase">
              © 2025 SWORD.LOL
            </span>
            <div className="h-px w-8 bg-zinc-800" />
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-zinc-700">
              STABLE_BUILD // RSA_VERIFIED
            </div>
          </div>

          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-zinc-600 uppercase italic">
              ESTABLISHED_GENESIS_2024
            </div>
            <button
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-3 text-zinc-700 hover:text-white transition-all duration-700"
            >
              <div className="h-8 w-[1px] bg-white/10 group-hover:h-12 group-hover:bg-white transition-all duration-700" />
              <span className="text-[8px] font-mono font-bold tracking-[0.5em] uppercase italic">UPLINK</span>
            </button>
          </div>
        </div>

      </div>

      {/* Vertical Meta Branding */}
      <div className="fixed bottom-12 left-6 hidden 2xl:block z-10 opacity-30">
        <div className="text-[8px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">ARCHITECTURAL_CORE_v2.5</div>
      </div>

      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
