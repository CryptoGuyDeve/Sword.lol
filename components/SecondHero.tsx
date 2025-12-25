"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Zap, Globe, Github } from "lucide-react";

const stats = [
  { label: "Views", value: "50K+", sub: "Total profile engagement" },
  { label: "Users", value: "1.7K+", sub: "Verified creators" },
  { label: "Files", value: "32K+", sub: "Securely hosted assets" },
  { label: "SLA", value: "99.9%", sub: "Guaranteed uptime" },
];

const plans = [
  {
    title: "Free",
    price: "$0",
    features: ["Custom Links", "Social Integration", "100MB Hosting"],
    popular: false,
  },
  {
    title: "Premium",
    price: "$4.00",
    features: ["Priority Support", "Custom Domains", "Unlimited Hosting"],
    popular: true,
  },
];

const SecondHero = () => {
  return (
    <div className="relative bg-black text-white py-40 px-6 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter"
          >
            Engineered for <br className="md:block hidden" />
            <span className="text-gray-300 italic">Digital Sophistication.</span>
          </motion.h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 mb-40">
          {/* Main Stat Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-6 lg:col-span-8 bg-white/[0.03] border border-white/5 p-12 flex flex-col justify-between min-h-[400px]"
          >
            <div>
              <Zap className="w-8 h-8 text-white mb-8" />
              <h3 className="text-4xl font-bold mb-4 tracking-tight">Scale *Without* Limits.</h3>
              <p className="text-gray-400 font-normal max-w-md leading-relaxed italic">Our infrastructure is built to handle millions of requests while maintaining absolute minimalist beauty.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Side Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-3 lg:col-span-4 bg-white/[0.03] border border-white/5 p-12 flex flex-col justify-between"
          >
            <Shield className="w-6 h-6 text-gray-300 mb-8" />
            <div>
              <h4 className="text-xl font-bold mb-2 italic">Privacy First.</h4>
              <p className="text-sm text-gray-400 font-normal leading-relaxed opacity-70">Zero tracking. Zero bloat. Just your identity, pure and *simple*.</p>
            </div>
          </motion.div>

          {/* Bottom Bento Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-3 lg:col-span-4 bg-white/[0.03] border border-white/5 p-12"
          >
            <Globe className="w-6 h-6 text-gray-300 mb-8" />
            <h4 className="text-xl font-bold mb-2">Global CDN.</h4>
            <p className="text-sm text-gray-400 font-normal">Edge delivery for instant loading anywhere in the world.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-6 lg:col-span-8 bg-white/[0.03] border border-white/5 p-12 flex items-center justify-between"
          >
            <div className="max-w-md">
              <h4 className="text-2xl font-bold mb-2">Claim Your Name.</h4>
              <p className="text-sm text-gray-400 font-normal">The first step to owning your digital destiny starts with a unique sword.lol handle.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="username"
                className="bg-black border border-white/10 px-6 py-3 text-sm focus:outline-none focus:border-white transition-colors w-40"
              />
              <button className="bg-white text-black p-3 hover:bg-gray-200 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Ultra-Minimal Pricing */}
        <div className="text-center mb-24">
          <h3 className="text-xs uppercase font-bold tracking-[0.4em] text-gray-400 mb-4">Pricing</h3>
          <h2 className="text-4xl font-bold tracking-tighter italic">Transparent & Fair.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 max-w-4xl mx-auto overflow-hidden">
          {plans.map((plan, i) => (
            <div key={i} className="bg-black p-16 flex flex-col justify-between group hover:bg-white/[0.01] transition-colors duration-700">
              <div className="mb-12">
                <div className="flex justify-between items-start mb-8">
                  <h4 className="text-2xl font-bold tracking-tight">{plan.title}</h4>
                  {plan.popular && <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border border-white/10 px-3 py-1.5">Recommended</span>}
                </div>
                <div className="text-6xl font-bold mb-8 leading-none">{plan.price} <span className="text-sm text-gray-400 font-normal">/ Lifetime</span></div>
                <ul className="space-y-5">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-400 font-normal group-hover:text-white transition-colors">
                      <div className="w-1 h-1 bg-white/40 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/signup" className="block text-center border border-white/10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-500">
                Register
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondHero;
