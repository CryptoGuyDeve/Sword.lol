"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const smootherRef = useRef<ScrollSmoother | null>(null);

    useEffect(() => {
        // Create wrapper and content divs for ScrollSmoother
        const wrapper = document.querySelector("#smooth-wrapper");
        const content = document.querySelector("#smooth-content");

        if (!wrapper || !content) return;

        // Initialize GSAP ScrollSmoother
        smootherRef.current = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
            smoothTouch: 0.1,
        });

        return () => {
            smootherRef.current?.kill();
            smootherRef.current = null;
        };
    }, []);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">{children}</div>
        </div>
    );
}
