"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { FiLayers, FiActivity, FiCpu } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const featureListRef = useRef<HTMLDivElement>(null);
  const floating1Ref = useRef<HTMLDivElement>(null);
  const floating2Ref = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const circlePathRef = useRef<SVGCircleElement>(null);

  // Interactive SVG state
  const [svgPath, setSvgPath] = useState("M 0 50 Q 25 50 50 50 T 100 50");

  // 3D Tilt Effect for Mockup
  const handleMockupTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const { left, top, width, height } = mockupRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 8;
    const tiltY = (relativeX - 0.5) * -8;

    gsap.to(mockupRef.current, {
      rotationX: tiltX,
      rotationY: tiltY,
      transformPerspective: 2000,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMockupReset = () => {
    gsap.to(mockupRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
  };

  // SVG Path Animation on Mouse Move
  const handleSvgMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { top, height, width } = containerRef.current.getBoundingClientRect();
    const relativeY = ((clientY - top) / height) * 100;
    const relativeX = (clientX / width) * 100;

    const curve = 50 + ((relativeY - 50) * 0.3);

    gsap.to(svgPathRef.current, {
      attr: { d: `M 0 50 Q ${relativeX * 0.5} ${curve} 50 50 T 100 50` },
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const handleSvgLeave = () => {
    gsap.to(svgPathRef.current, {
      attr: { d: "M 0 50 Q 25 50 50 50 T 100 50" },
      duration: 1.2,
      ease: "elastic.out(1, 0.3)"
    });
  };

  useGSAP(() => {
    // 3D Perspective Rotation on Scroll
    gsap.to(mockupRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      rotateX: 5,
      z: 20,
      ease: "none"
    });

    // Feature List Stagger
    const featureItems = featureListRef.current?.children;
    if (featureItems) {
      gsap.from(featureItems, {
        scrollTrigger: {
          trigger: featureListRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });
    }

    // Floating Elements
    gsap.to(floating1Ref.current, {
      y: -15,
      rotation: 2,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(floating2Ref.current, {
      y: 15,
      rotation: -2,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animated SVG Circle
    gsap.to(circlePathRef.current, {
      attr: { r: 25 },
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleSvgMove}
      onMouseLeave={handleSvgLeave}
      className="relative min-h-screen bg-[#0E0E0E] flex items-center justify-center overflow-hidden py-48 selection:bg-white selection:text-black"
    >
      {/* Animated SVG Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Flowing Path */}
          <path
            ref={svgPathRef}
            d="M 0 50 Q 25 50 50 50 T 100 50"
            stroke="white"
            strokeWidth="0.15"
            fill="none"
            opacity="0.6"
          />
          {/* Pulsing Circle */}
          <circle
            ref={circlePathRef}
            cx="50"
            cy="50"
            r="20"
            stroke="white"
            strokeWidth="0.1"
            fill="none"
            opacity="0.3"
          />
          {/* Grid Lines */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="white" strokeWidth="0.05" opacity="0.2" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="white" strokeWidth="0.05" opacity="0.2" />
          <line x1="25" y1="0" x2="25" y2="100" stroke="white" strokeWidth="0.05" opacity="0.2" />
          <line x1="75" y1="0" x2="75" y2="100" stroke="white" strokeWidth="0.05" opacity="0.2" />
        </svg>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '120px 120px' }}
      />

      {/* Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white rounded-full blur-[180px] opacity-[0.03] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-24 items-center">

          {/* Feature Matrix Plane */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="space-y-16">
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

              <div ref={featureListRef} className="grid gap-12">
                {features.map((f, i) => (
                  <div key={i} className="group">
                    <div className="flex items-start gap-6 border-l-2 border-white/10 pl-8 group-hover:border-white transition-all duration-700">
                      <div className="text-2xl text-white opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 mt-1">
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
                  </div>
                ))}
              </div>

              <button className="mt-12 flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.5em] text-white hover:text-white transition-all duration-700 group hover:translate-x-2">
                <span className="border-b border-white/20 pb-1 group-hover:border-white transition-all">Get Started Now</span>
                <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </button>
            </div>
          </div>

          {/* Perspective Interface Preview */}
          <div className="lg:col-span-7 order-1 lg:order-2 perspective-[3000px]">
            <div
              ref={mockupRef}
              onMouseMove={handleMockupTilt}
              onMouseLeave={handleMockupReset}
              className="relative bg-white/[0.02] border border-white/5 p-4 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.8)] backface-hidden will-change-transform"
            >
              {/* Technical Mockup Overlay */}
              <div className="absolute top-8 left-8 z-20 flex flex-col gap-2 pointer-events-none">
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
                    <div className="h-10 w-10 bg-white/10 border border-white/10 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-[2px] w-full bg-white/20 animate-pulse" />
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
                      <div className="h-14 w-32 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-4 h-[2px] bg-white/60" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="h-32 bg-black border border-white/10 p-6 flex flex-col justify-between hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer group">
                        <div className="h-[2px] w-8 bg-white/30 group-hover:w-12 transition-all" />
                        <div className="h-6 w-16 bg-white/20" />
                      </div>
                      <div className="h-32 bg-black border border-white/10 p-6 flex flex-col justify-between hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer group">
                        <div className="h-[2px] w-8 bg-white/30 group-hover:w-12 transition-all" />
                        <div className="h-6 w-16 bg-white/20" />
                      </div>
                    </div>
                    <div className="flex-1 border border-white/5 p-8 relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
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
              <div
                ref={floating1Ref}
                className="absolute -top-12 -right-12 px-8 py-5 bg-white text-black text-[9px] font-bold uppercase tracking-[0.4em] italic shadow-2xl pointer-events-none"
              >
                99.9%_UPTIME
              </div>
              <div
                ref={floating2Ref}
                className="absolute -bottom-12 -left-12 px-8 py-5 bg-black border border-white/10 text-white text-[9px] font-bold uppercase tracking-[0.4em] italic shadow-2xl pointer-events-none"
              >
                SECURE_STORAGE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta Accents */}
      <div className="absolute bottom-12 left-10 md:left-20 text-[9px] font-mono font-bold tracking-[0.5em] text-white opacity-40 uppercase italic">
        Sword.lol // Build_2026
      </div>
    </div>
  );
};

export default ThirdHero;
