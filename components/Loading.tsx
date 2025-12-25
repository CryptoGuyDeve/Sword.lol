"use client";

import { motion } from "framer-motion";

interface LoadingProps {
    fullScreen?: boolean;
    text?: string;
    size?: "sm" | "md" | "lg";
}

const Loading = ({ fullScreen = false, text = "INITIALIZING", size = "md" }: LoadingProps) => {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-16 h-16",
        lg: "w-24 h-24"
    };

    const containerClasses = fullScreen
        ? "fixed inset-0 bg-black flex items-center justify-center z-50 selection:bg-white selection:text-black"
        : "flex flex-col items-center justify-center py-24 selection:bg-white selection:text-black";

    return (
        <div className={containerClasses}>
            {fullScreen && (
                <>
                    {/* Stage 3: Ambient Shading */}
                    <div className="absolute inset-0 pointer-events-none z-[1]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/[0.03] blur-[150px] rounded-full" />
                    </div>

                    {/* Global Grain Texture */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-[2] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    {/* Background Grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
                    />
                </>
            )}

            <div className="relative z-10 flex flex-col items-center">
                {/* Architectural Loading Indicator */}
                <div className={`relative ${sizeClasses[size]}`}>
                    {/* Outer Rotating Frame */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-white/10 rounded-none shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
                    />

                    {/* Inner Rotating Frame */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border border-white/20 rounded-none"
                    />

                    {/* Center Core */}
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-[35%] bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    />

                    {/* Corner Accents */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/60" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/60" />
                </div>

                {text && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-10 text-center"
                    >
                        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/40 italic">
                            {text}
                        </span>
                        <div className="flex items-center gap-3 mt-3 justify-center">
                            <div className="h-[1px] w-4 bg-white/10" />
                            <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">
                                ARCH_CORE / STAGING
                            </span>
                            <div className="h-[1px] w-4 bg-white/10" />
                        </div>
                    </motion.div>
                )}
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

export default Loading;
