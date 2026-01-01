"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Activity } from "lucide-react";
import { FiShield, FiZap, FiGlobe } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Views", value: "50K+", sub: "Total profile engagement" },
  { label: "Users", value: "1.7K+", sub: "Verified creators" },
  { label: "Files", value: "32K+", sub: "Securely hosted assets" },
  { label: "SLA", value: "99.9%", sub: "Guaranteed uptime" },
];

const plans = [
  {
    title: "Standard",
    module: "MODULE_01",
    price: "$0",
    features: ["Custom Links", "Social Integration", "100MB Hosting"],
    cta: "Start Free",
    popular: false,
  },
  {
    title: "Architect",
    module: "MODULE_02",
    price: "$4.00",
    features: ["Priority Support", "Custom Domains", "Unlimited Hosting", "Global VIP Storage"],
    cta: "Go Premium",
    popular: true,
  },
];

const SecondHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect Helper
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 10; // Max tilt rotation X
    const tiltY = (relativeX - 0.5) * -10; // Max tilt rotation Y

    gsap.to(card, {
      rotationX: tiltX,
      rotationY: tiltY,
      transformPerspective: 1000,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleResetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    });
  };

  useGSAP(() => {
    // Header Animation
    gsap.from(headerRef.current, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out"
    });

    // Bento Grid Stagger
    const cards = gridRef.current?.children;
    if (cards) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Pricing Plans Stagger
    const pricingCards = pricingRef.current?.children;
    if (pricingCards) {
      gsap.from(pricingCards, {
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      });
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-[#0E0E0E] text-white py-48 px-6 overflow-hidden border-t border-white/5 selection:bg-white selection:text-black">

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
      />

      {/* Ambient Lighting */}
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Area */}
        <div ref={headerRef} className="mb-32">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white/30 uppercase">
              PLATFORM FEATURES / TOOLS
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter italic">
            Simple Controls<span className="text-gray-600 font-normal">.</span>
          </h2>
        </div>

        {/* Bento Matrix Layout */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5 mb-48 overflow-hidden">

          {/* Performance Lead Card */}
          <div
            onMouseMove={handleTilt}
            onMouseLeave={handleResetTilt}
            className="col-span-1 md:col-span-8 bg-black/40 p-12 md:p-16 flex flex-col justify-between min-h-[500px] group transition-colors duration-700 hover:bg-white/[0.01] backface-hidden will-change-transform"
          >
            <div className="pointer-events-none">
              <div className="flex items-center gap-3 mb-10 text-zinc-500">
                <FiZap className="text-xl" />
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase">System Status: Optimized</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter italic uppercase underline decoration-white/10 transition-all duration-700 group-hover:decoration-white/40">
                Everything You Need
              </h3>
              <p className="text-zinc-500 font-medium italic max-w-md leading-relaxed text-lg">
                Build your digital presence with ease. Powerful tools for creators to grow their audience and brand.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-white/5 pointer-events-none">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="text-2xl font-bold tracking-tighter italic">{stat.value}</div>
                  <div className="text-[9px] uppercase font-mono font-bold tracking-[0.2em] text-zinc-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Protocol Card */}
          <div
            onMouseMove={handleTilt}
            onMouseLeave={handleResetTilt}
            className="col-span-1 md:col-span-4 bg-black/60 p-12 flex flex-col justify-between hover:bg-white transition-all duration-700 group/card backface-hidden will-change-transform"
          >
            <div className="flex justify-between items-start pointer-events-none">
              <FiShield className="text-3xl text-zinc-500 group-hover/card:text-black transition-colors duration-700" />
              <span className="text-[9px] font-mono font-bold text-zinc-800 group-hover/card:text-black transition-colors uppercase italic">SECURED</span>
            </div>
            <div className="pointer-events-none">
              <h4 className="text-2xl font-bold mb-4 italic text-zinc-300 group-hover/card:text-black transition-colors duration-700 uppercase">Privacy Focused</h4>
              <p className="text-sm text-zinc-600 font-medium italic leading-relaxed group-hover:text-zinc-800 transition-colors duration-700">
                Your data is yours. We prioritize privacy and security in every single interaction.
              </p>
            </div>
          </div>

          {/* Global Node Card */}
          <div
            onMouseMove={handleTilt}
            onMouseLeave={handleResetTilt}
            className="col-span-1 md:col-span-4 bg-black/60 p-12 border-t border-white/5 flex flex-col gap-12 group/node hover:bg-white transition-all duration-700 backface-hidden will-change-transform"
          >
            <FiGlobe className="text-3xl text-zinc-500 group-hover/node:text-black transition-colors duration-700 pointer-events-none" />
            <div className="pointer-events-none">
              <h4 className="text-2xl font-bold mb-4 italic text-zinc-300 group-hover/node:text-black transition-colors duration-700 uppercase">Lightning Fast</h4>
              <p className="text-sm text-zinc-600 font-medium italic leading-relaxed group-hover/node:text-zinc-800 transition-colors duration-700">
                Instant page loads across our global delivery network.
              </p>
            </div>
          </div>

          {/* Reservation Card */}
          <div
            onMouseMove={handleTilt}
            onMouseLeave={handleResetTilt}
            className="col-span-1 md:col-span-8 bg-black/40 p-12 border-l border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 group backface-hidden will-change-transform"
          >
            <div className="max-w-md pointer-events-none">
              <div className="flex items-center gap-3 mb-6 text-zinc-700">
                <Activity className="w-4 h-4" />
                <span className="text-[9px] font-mono tracking-widest uppercase">USERNAME_SEARCH</span>
              </div>
              <h4 className="text-3xl font-bold mb-2 tracking-tighter italic uppercase">Claim Your Name</h4>
              <p className="text-sm text-zinc-500 font-medium italic">Reserve your unique handle on Sword today.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="text"
                placeholder="search_id"
                className="bg-black/50 border border-white/10 px-8 py-5 text-[10px] font-mono tracking-widest uppercase focus:outline-none focus:border-white transition-all duration-700 w-full md:w-64"
              />
              <button className="bg-white text-black px-6 py-5 hover:bg-zinc-200 transition-all duration-700 group-hover:scale-105">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Protocol */}
        <div className="flex flex-col items-center mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-6 bg-white/10" />
            <span className="text-[10px] font-mono font-bold tracking-[0.5em] text-zinc-600 uppercase">PRICING PLANS</span>
            <div className="h-[2px] w-6 bg-white/10" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter italic uppercase text-center">
            Transparent Pricing<span className="text-gray-600 font-normal">.</span>
          </h2>
        </div>

        <div ref={pricingRef} className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 max-w-5xl mx-auto overflow-hidden">
          {plans.map((plan, i) => (
            <div
              key={i}
              onMouseMove={handleTilt}
              onMouseLeave={handleResetTilt}
              className="bg-black/40 p-16 flex flex-col justify-between group hover:bg-white transition-all duration-1000 relative backface-hidden will-change-transform"
            >
              <div className="mb-16 pointer-events-none">
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-zinc-700 uppercase italic opacity-60 group-hover:text-black">{plan.module}</span>
                    <h4 className="text-3xl font-bold tracking-tighter italic uppercase group-hover:text-black">{plan.title}</h4>
                  </div>
                  {plan.popular && (
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white border border-white/10 px-4 py-2 group-hover:text-black group-hover:border-black/20">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="text-7xl font-bold mb-12 tracking-tighter leading-none group-hover:text-black italic">
                  {plan.price} <span className="text-sm font-mono tracking-widest uppercase opacity-40">/ LIFETIME</span>
                </div>
                <ul className="space-y-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase italic text-zinc-500 group-hover:text-zinc-800 transition-colors">
                      <div className="w-1.5 h-[1.5px] bg-zinc-800 group-hover:bg-black transition-all" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/signup" className="block text-center border border-white/10 py-6 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-700 hover:bg-black hover:text-white group-hover:border-black/20 group-hover:bg-black group-hover:text-white">
                {plan.cta}
              </Link>

              {/* Decorative Corner Label */}
              <div className="absolute bottom-6 right-8 text-[70px] font-bold italic opacity-[0.01] uppercase group-hover:opacity-0 pointer-events-none">
                {plan.title.slice(0, 3)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondHero;
