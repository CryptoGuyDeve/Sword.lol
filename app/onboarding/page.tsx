"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    FiArrowRight,
    FiCheck,
    FiLayout,
    FiVideo,
    FiLink,
    FiTrendingUp,
    FiShield,
    FiUser
} from "react-icons/fi";

const steps = [
    {
        title: "The Entity",
        description: "Welcome to Sword.lol. On this platform, you are not just a user—you are an Entity. Your profile is an architectural artifact of your digital presence.",
        icon: <FiUser className="text-4xl" />,
        technical: "IDENTITY_INITIALIZATION / 001"
    },
    {
        title: "Architectural Customization",
        description: "Your dashboard allows you to define your space. Add background videos, custom banners, and unique layouts to reflect your technical identity.",
        icon: <FiVideo className="text-4xl" />,
        technical: "VISUAL_ENGINEERING / 002"
    },
    {
        title: "Network Integration",
        description: "Connect your social nodes. Twitter, Discord, and GitHub integration allow your network to traverse the Sword system seamlessly.",
        icon: <FiLink className="text-4xl" />,
        technical: "NODE_CONNECTIVITY / 003"
    },
    {
        title: "Reach & Influence",
        description: "Ascend the leaderboard and gain reach. Every profile view and follow is logged in real-time within the Sword network analytics.",
        icon: <FiTrendingUp className="text-4xl" />,
        technical: "NETWORK_ASCENSION / 004"
    }
];

export default function OnboardingPage() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isCompleting, setIsCompleting] = useState(false);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = async () => {
        setIsCompleting(true);
        try {
            const res = await fetch("/api/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "complete" }),
            });

            if (res.ok) {
                // Update session to reflect completion
                await update({ onboarding_completed: true });
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Onboarding completion failed:", error);
        } finally {
            setIsCompleting(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center justify-center selection:bg-white selection:text-black font-sans px-6">
            {/* Stage 3: Ambient Shading */}
            <div className="absolute inset-0 pointer-events-none z-[1]">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.03] blur-[150px] rounded-full" />
            </div>

            {/* Global Grain Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
            />

            <div className="relative z-10 w-full max-w-2xl">
                {/* Step Progress */}
                <div className="flex gap-2 mb-12">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-0.5 flex-1 transition-all duration-1000 ${i <= currentStep ? "bg-white" : "bg-white/10"}`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl p-12 md:p-20 relative overflow-hidden"
                    >
                        {/* Architectural Accents */}
                        <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                            <div className="absolute top-8 right-8 w-px h-12 bg-white/10" />
                            <div className="absolute top-8 right-8 h-px w-12 bg-white/10" />
                        </div>

                        <div className="mb-12 text-gray-400">
                            {steps[currentStep].icon}
                        </div>

                        <div className="mb-2">
                            <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-gray-600 uppercase">
                                {steps[currentStep].technical}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 italic">
                            {steps[currentStep].title}<span className="text-gray-600 font-normal">.</span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed mb-16 max-w-lg italic">
                            "{steps[currentStep].description}"
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-700">
                                Step {currentStep + 1} of {steps.length}
                            </div>

                            <button
                                onClick={nextStep}
                                disabled={isCompleting}
                                className="group flex items-center gap-6 px-10 py-5 bg-white text-black font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-gray-200 transition-all duration-700"
                            >
                                {isCompleting ? "Initializing..." : currentStep === steps.length - 1 ? "Complete System" : "Next Protocol"}
                                <FiArrowRight className="text-xs group-hover:translate-x-2 transition-transform duration-700" />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Vertical Accents */}
                <div className="fixed bottom-12 left-12 hidden lg:block z-[2]">
                    <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">
                        ONBOARDING_SEQUENCE / ACTIVE
                    </div>
                </div>
                <div className="fixed bottom-12 right-12 hidden lg:block z-[2]">
                    <div className="text-[10px] font-mono font-bold tracking-[0.5em] text-gray-800 uppercase vertical-text">
                        SYSTEM_VERSION / 1.0.4
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </div>
    );
}
