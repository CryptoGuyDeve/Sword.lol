"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    type?: "words" | "chars";
    trigger?: "visible" | "scroll";
    start?: string;
    delay?: number;
    duration?: number;
}

export default function TextReveal({
    children,
    className,
    type = "words",
    trigger = "scroll",
    start = "top 80%",
    delay = 0,
    duration = 1,
}: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = children.split(" ");

    useGSAP(() => {
        const targets = containerRef.current?.querySelectorAll(".reveal-text");

        if (!targets || targets.length === 0) return;

        const fromVars = {
            y: "100%",
            opacity: 0,
            rotateX: -90,
        };

        const toVars = {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: duration,
            ease: "power3.out",
            stagger: 0.02,
            delay: delay,
        };

        if (trigger === "scroll") {
            gsap.fromTo(targets, fromVars, {
                ...toVars,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: start,
                    toggleActions: "play none none reverse",
                }
            });
        } else {
            gsap.fromTo(targets, fromVars, toVars);
        }

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={cn("overflow-hidden inline-flex flex-wrap gap-x-[0.25em]", className)}>
            {type === "words" ? (
                words.map((word, i) => (
                    <span key={i} className="reveal-text inline-block origin-bottom transform-style-3d">
                        {word}
                    </span>
                ))
            ) : (
                children.split("").map((char, i) => (
                    <span key={i} className="reveal-text inline-block origin-bottom transform-style-3d">
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))
            )}
        </div>
    );
}
