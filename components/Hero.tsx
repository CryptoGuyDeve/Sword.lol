"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const moduleRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  // Mouse position state for advanced effects
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Advanced Interactive SVG Logic
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!pathRef.current || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { top, height, width, left } = containerRef.current.getBoundingClientRect();
    const relativeY = ((clientY - top) / height) * 100;
    const relativeX = ((clientX - left) / width) * 100;

    setMousePos({ x: relativeX, y: relativeY });

    // Primary flowing path
    const strength = 40;
    const curveY = 100 + ((relativeY - 50) * strength / 100);
    const curveX = relativeX;

    gsap.to(pathRef.current, {
      attr: { d: `M 0 100 Q ${curveX} ${curveY} 100 100` },
      duration: 0.4,
      ease: "power2.out"
    });

    // Secondary path (inverse)
    gsap.to(path2Ref.current, {
      attr: { d: `M 0 0 Q ${100 - curveX} ${200 - curveY} 100 0` },
      duration: 0.5,
      ease: "power2.out"
    });

    // Move circle to follow mouse
    gsap.to(circleRef.current, {
      attr: { cx: relativeX, cy: relativeY },
      duration: 0.8,
      ease: "power2.out"
    });

    // Parallax orbs
    gsap.to(orb1Ref.current, {
      x: (relativeX - 50) * 0.3,
      y: (relativeY - 50) * 0.3,
      duration: 1,
      ease: "power2.out"
    });

    gsap.to(orb2Ref.current, {
      x: (relativeX - 50) * -0.2,
      y: (relativeY - 50) * -0.2,
      duration: 1.2,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(pathRef.current, {
      attr: { d: "M 0 100 Q 50 100 100 100" },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    });

    gsap.to(path2Ref.current, {
      attr: { d: "M 0 0 Q 50 0 100 0" },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    });

    gsap.to(circleRef.current, {
      attr: { cx: 50, cy: 50 },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    });

    gsap.to([orb1Ref.current, orb2Ref.current], {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial Cinematic Sequence
    tl.set([moduleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50
    })
      .to(moduleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      })
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      }, "+=0.5");

    // Scroll Parallax for Text
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 200,
      opacity: 0
    });

    // Orb floating animations
    gsap.to(orb1Ref.current, {
      scale: 1.1,
      opacity: 0.04,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(orb2Ref.current, {
      scale: 0.9,
      opacity: 0.03,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Pulsing circle
    gsap.to(circleRef.current, {
      attr: { r: 25 },
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full bg-[#0E0E0E] flex flex-col items-center justify-center text-white overflow-hidden selection:bg-white selection:text-black"
    >
      {/* Advanced Interactive SVG Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
        <svg ref={svgRef} className="w-full h-full" viewBox="0 0 100 200" preserveAspectRatio="none">
          {/* Primary flowing path */}
          <path
            ref={pathRef}
            d="M 0 100 Q 50 100 100 100"
            stroke="white"
            strokeWidth="0.2"
            fill="none"
            opacity="0.8"
          />
          {/* Secondary inverse path */}
          <path
            ref={path2Ref}
            d="M 0 0 Q 50 0 100 0"
            stroke="white"
            strokeWidth="0.15"
            fill="none"
            opacity="0.4"
          />
          {/* Interactive circle that follows mouse */}
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="20"
            stroke="white"
            strokeWidth="0.1"
            fill="none"
            opacity="0.5"
          />
          {/* Decorative grid lines */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.05" opacity="0.2" />
          <line x1="0" y1="150" x2="100" y2="150" stroke="white" strokeWidth="0.05" opacity="0.2" />
          <line x1="33" y1="0" x2="33" y2="200" stroke="white" strokeWidth="0.05" opacity="0.15" />
          <line x1="66" y1="0" x2="66" y2="200" stroke="white" strokeWidth="0.05" opacity="0.15" />
          {/* Diagonal accent lines */}
          <line x1="0" y1="0" x2="20" y2="20" stroke="white" strokeWidth="0.08" opacity="0.3" />
          <line x1="80" y1="180" x2="100" y2="200" stroke="white" strokeWidth="0.08" opacity="0.3" />
        </svg>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={orb1Ref}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[120px] rounded-full"
        />
        <div
          ref={orb2Ref}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/[0.02] blur-[150px] rounded-full"
        />
      </div>

      {/* Global Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
        {/* Module Label */}
        <div ref={moduleRef} className="mb-12 flex items-center justify-center gap-4 opacity-0">
          <div className="h-px w-8 bg-white/10" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-white/40">
            PREMIUM IDENTITY NETWORK
          </span>
          <div className="h-px w-8 bg-white/10" />
        </div>

        {/* Cinematic Title with TextReveal */}
        <div className="mb-12 relative">
          <h1 ref={textRef} className="text-7xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-[0.8] italic mb-6">
            <TextReveal trigger="visible" delay={0.2} className="text-white">Own Your</TextReveal>
            <br />
            <TextReveal trigger="visible" delay={0.6} className="text-white">Identity</TextReveal>
            <span className="text-gray-600 font-normal">.</span>
          </h1>
        </div>

        {/* Minimalist Subtext */}
        <div className="text-lg md:text-2xl max-w-2xl mx-auto text-zinc-400 font-medium italic mb-16 leading-relaxed tracking-tight">
          <TextReveal trigger="visible" delay={1.2} type="words" duration={0.8} className="justify-center">
            The ultimate platform for modern creators. Simple, beautiful, and powerful.
          </TextReveal>
        </div>

        {/* CTA Node with magnetic effect */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-12 opacity-0">
          <button
            onClick={() => router.push("/signup")}
            className="group relative px-16 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-700 overflow-hidden hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-200 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700" />
          </button>

          <button
            onClick={() => router.push("/login")}
            className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-all duration-700 pb-1 border-b border-transparent hover:border-white/20 hover:-translate-y-1"
          >
            SIGN_IN
          </button>
        </div>
      </div>

      {/* Scroll Hint with animation */}
      <div className="absolute bottom-12 right-10 md:right-20 flex flex-col items-center gap-6 animate-pulse opacity-30">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-white" />
          <span className="text-[8px] font-mono font-bold tracking-[0.5em] text-white/40 uppercase italic">SCROLL</span>
        </div>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-12 left-10 md:left-20 z-10 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-zinc-500 uppercase">ONLINE</span>
      </div>

      {/* Corner Accents - animated */}
      <div className="absolute top-10 left-10 w-6 h-6 border-t-2 border-l-2 border-white/10 animate-pulse" />
      <div className="absolute top-10 right-10 w-6 h-6 border-t-2 border-r-2 border-white/10 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-6 h-6 border-b-2 border-l-2 border-white/10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-6 h-6 border-b-2 border-r-2 border-white/10 animate-pulse" />

      {/* Mouse position indicator (subtle) */}
      <div
        className="absolute w-32 h-32 border border-white/5 rounded-full pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

    </div>
  );
};

export default Hero;
