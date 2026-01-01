'use client'

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs = [
    {
      question: "How does sword.lol work?",
      answer: "sword.lol is an all-in-one platform for modern creator identity. Sign up, curate your digital presence, and share your unique URL instantly.",
    },
    {
      question: "Is there a free plan available?",
      answer: "We offer a perpetual free plan with essential features. Upgrade only when your audience and requirements scale beyond the limits.",
    },
    {
      question: "What features are included in premium?",
      answer: "Premium unlocks custom domains, advanced analytics, priority edge delivery, and exclusive profile layouts for a lifetime price.",
    },
    {
      question: "How secure is the asset hosting?",
      answer: "Our globally distributed delivery network ensures your assets are encrypted, secure, and served with instant delivery times.",
    },
    {
      question: "Can I use a custom domain?",
      answer: "Yes. Connect any domain you own to your sword.lol profile for a fully branded digital identity.",
    }
  ];

  useGSAP(() => {
    // Title Reveal
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: "100%",
      duration: 1,
      ease: "power3.out"
    });

  }, { scope: containerRef });

  useEffect(() => {
    // Accordion Animation
    answerRefs.current.forEach((el, index) => {
      if (!el) return;

      const isOpen = openIndex === index;

      if (isOpen) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in"
        });
      }
    });
  }, [openIndex]);

  return (
    <div ref={containerRef} className="relative bg-[#0E0E0E] text-white py-40 px-6 overflow-hidden">
      {/* Stage 3: Ambient Shading */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-white/[0.03] to-transparent blur-[100px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-white/[0.01] blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Minimalist Header */}
        <div className="mb-32">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold mb-8 overflow-hidden italic">
            <span
              ref={titleRef}
              className="inline-block"
            >
              QUESTIONS & ANSWERS
            </span>
          </h3>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase italic">Frequently *Asked*<span className="text-zinc-700 font-normal">.</span></h2>
        </div>

        {/* Ultra-Minimal Line FAQ */}
        <div className="border-t border-white/10">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/5">
              <button
                className="w-full text-left py-12 flex justify-between items-center group transition-colors hover:text-white"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-baseline gap-8">
                  <span className="text-[10px] text-zinc-700 font-mono font-bold">0{index + 1}</span>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight italic transition-all group-hover:pl-2">
                    {faq.question}
                  </h3>
                </div>
                <div
                  className={`text-white/20 transition-transform duration-500 ease-out ${openIndex === index ? "rotate-45" : ""}`}
                >
                  <Plus className="w-6 h-6" strokeWidth={1} />
                </div>
              </button>

              <div
                ref={(el) => { answerRefs.current[index] = el; }} // Ensure void return
                className="overflow-hidden h-0 opacity-0"
              >
                <div className="pb-12 pl-[5.5rem] max-w-2xl">
                  <p className="text-zinc-400 font-medium leading-relaxed text-lg italic opacity-90">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Refined Community Link */}
        <div className="mt-40 flex items-center justify-between border-t border-white/10 pt-12">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold italic">Still seeking clarity?</div>
          <a
            href="https://discord.gg/FhECf5pQQH"
            target="_blank"
            className="text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:text-gray-300 transition-colors border-b border-white/20 pb-1 italic"
          >
            Join Discord_PROTOCOL
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
