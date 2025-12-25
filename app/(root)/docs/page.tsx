"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiZap, FiLayout, FiActivity, FiServer, FiShield, FiArrowRight, FiTerminal, FiArrowLeft } from "react-icons/fi";

const Docs = () => {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    {
      id: "getting-started",
      module: "MODULE_01",
      title: "Getting Started",
      icon: <FiZap />,
      content: [
        { subtitle: "Initial Calibration", text: "Welcome to the Sword network. To establish your broadcast node, follow the standard initialization protocol." },
        { subtitle: "Standard Procedure", list: ["Register unique entity identifier (Username)", "Authenticate via security gateway", "Initialize profile metadata", "Deploy social link matrix"] }
      ]
    },
    {
      id: "customization",
      module: "MODULE_02",
      title: "Customization",
      icon: <FiLayout />,
      content: [
        { subtitle: "Visual Parameters", text: "Configure the aesthetic identity of your node. Use high-performance visual modules to calibrate your display." },
        { subtitle: "Available Modules", list: ["Ambient Shading Layer", "Grid Texture Calibration", "High-Contrast Typography Sets", "Dynamic Grain Overlay"] }
      ]
    },
    {
      id: "analytics",
      module: "MODULE_03",
      title: "Network Analytics",
      icon: <FiActivity />,
      content: [
        { subtitle: "Metric Tracking", text: "Monitor the performance and reach of your broadcast node through real-time telemetry." },
        { subtitle: "Core Telemetry", list: ["Entity Synchronizations (Profile Views)", "Protocol Interactions (Link Clicks)", "Geographic Signal Origin", "Temporal Activity Spikes"] }
      ]
    },
    {
      id: "file-hosting",
      module: "MODULE_04",
      title: "Asset Storage",
      icon: <FiServer />,
      content: [
        { subtitle: "Data Persistence", text: "Deploy and host static assets directly on the Sword grid with high-speed CDN distribution." },
        { subtitle: "Storage Tiers", list: ["Standard Protocol: 100MB per asset", "Architect Protocol: Unlimited asset volume", "Secure AES-256 encryption", "Instant Global Propagation"] }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0E0E0E] text-white selection:bg-white selection:text-black font-sans overflow-hidden">

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

      <main className="relative z-10 max-w-7xl mx-auto h-screen flex flex-col pt-32 pb-12">

        {/* Header Area */}
        <div className="px-6 md:px-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
                KNOWLEDGE_BASE / DOC_SEQUENCE
              </span>
              <div className="h-px w-12 bg-white/10" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic">
              Docs<span className="text-gray-600 font-normal">.</span>
            </h1>
          </motion.div>
        </div>

        {/* Documentation Matrix */}
        <div className="flex-1 flex flex-col md:flex-row gap-px bg-white/5 border-t border-b border-white/5 overflow-hidden">

          {/* Module Selection Sidebar */}
          <div className="w-full md:w-80 bg-black/40 p-10 flex flex-col gap-12 overflow-y-auto custom-scrollbar">
            <h2 className="text-[10px] font-mono font-bold tracking-[0.3em] text-zinc-600 uppercase italic">Modules Index</h2>
            <nav className="space-y-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left flex items-center gap-4 transition-all duration-500 group ${activeSection === section.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                  <div className={`text-xl transition-transform duration-500 ${activeSection === section.id ? "scale-110" : "scale-100 group-hover:scale-105"}`}>
                    {section.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase opacity-40">{section.module}</span>
                    <span className="text-sm font-bold tracking-tight italic">{section.title}</span>
                  </div>
                  {activeSection === section.id && (
                    <motion.div layoutId="active-indicator" className="ml-auto w-1 h-1 rounded-full bg-white shadow-[0_0_10px_white]" />
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-12 border-t border-white/5">
              <div className="flex items-center gap-3 text-zinc-700">
                <FiTerminal className="text-lg" />
                <span className="text-[9px] font-mono tracking-widest uppercase">STABLE_BUILD_2025</span>
              </div>
            </div>
          </div>

          {/* Module Content Plane */}
          <div className="flex-1 bg-black/20 p-12 md:p-20 overflow-y-auto custom-scrollbar relative">
            <AnimatePresence mode="wait">
              {sections.map((section) => section.id === activeSection && (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-3xl space-y-16"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl text-white italic font-bold tracking-tighter uppercase">{section.title}</span>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>
                    <p className="text-zinc-400 font-medium italic tracking-tight text-lg leading-relaxed">
                      Technical manual for the {section.title.toLowerCase()} module integrated within the Sword network grid.
                    </p>
                  </div>

                  <div className="grid gap-16">
                    {section.content.map((block, i) => (
                      <div key={i} className="space-y-8 relative">
                        <div className="flex items-center gap-4">
                          <div className="text-[10px] font-mono font-bold text-zinc-700">0{i + 1}</div>
                          <h3 className="text-[11px] font-mono font-bold tracking-[0.4em] text-white/60 uppercase italic">{block.subtitle}</h3>
                        </div>
                        {block.text && (
                          <p className="pl-8 border-l border-white/10 text-zinc-500 font-medium italic leading-relaxed">
                            {block.text}
                          </p>
                        )}
                        {block.list && (
                          <ul className="pl-8 border-l border-white/10 space-y-4">
                            {block.list.map((item, j) => (
                              <li key={j} className="flex items-center gap-3 group/item transition-all duration-500">
                                <div className="w-1.5 h-px bg-zinc-800 group-hover/item:w-4 group-hover/item:bg-white transition-all duration-500" />
                                <span className="text-sm font-medium italic text-zinc-500 group-hover/item:text-white transition-colors">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Aesthetic Meta Detail */}
                        <div className="absolute top-0 right-0 text-[100px] font-bold italic opacity-[0.01] pointer-events-none uppercase">
                          {section.id.slice(0, 3)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Operational Footer */}
                  <div className="pt-24 flex items-center justify-between">
                    <button className="flex items-center gap-4 text-zinc-600 hover:text-white transition-all group">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase italic">Download Protocol PDF</span>
                      <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    <div className="text-[9px] font-mono tracking-[0.3em] text-zinc-800 uppercase italic">
                      Node_Sync: Stable
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Corner Metadata */}
            <div className="absolute top-12 right-12 text-[10px] font-mono font-bold tracking-[0.4em] text-white/5 uppercase vertical-text hidden lg:block">
              PROTOCOL_ACCESS_GRANTED
            </div>
          </div>

        </div>

        {/* Global Footer Meta */}
        <div className="px-6 md:px-10 mt-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="flex items-center gap-8 text-[10px] font-mono tracking-widest text-zinc-500 uppercase italic">
            <span>© 2025 Sword Architecture</span>
            <span className="h-px w-8 bg-zinc-800" />
            <span>Reference Module 04A</span>
          </div>
          <div className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase italic">
            Scanning for protocol updates...
          </div>
        </div>

      </main>

      {/* Vertical Meta Branding */}
      <div className="fixed bottom-12 left-6 hidden 2xl:block opacity-20 pointer-events-none">
        <div className="text-[8px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">DOCS_CORE_v2.8</div>
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

export default Docs;
