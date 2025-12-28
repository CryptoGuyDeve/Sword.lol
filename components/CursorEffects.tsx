"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPoint {
    x: number;
    y: number;
    id: number;
}

const CursorEffects = ({ effect }: { effect: string }) => {
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (effect === "none") return;

        let counter = 0;
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });

            if (counter % 3 === 0) { // Throttle trail creation
                setTrail((prev) => [
                    ...prev.slice(-20), // Keep last 20 points
                    { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() },
                ]);
            }
            counter++;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [effect]);

    if (effect === "none") return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <AnimatePresence>
                {trail.map((point) => (
                    <motion.div
                        key={point.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ left: point.x, top: point.y }}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                        {effect === "sparkle" && (
                            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-pulse" />
                        )}
                        {effect === "fire" && (
                            <div className="w-3 h-3 bg-orange-500 rounded-full blur-[2px]" />
                        )}
                        {effect === "neon" && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full blur-[2px] shadow-[0_0_15px_blue]" />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Main Cursor Follower (Optional) */}
            {effect !== "none" && (
                <motion.div
                    animate={{ x: mousePos.x, y: mousePos.y }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-white/50 rounded-full"
                />
            )}
        </div>
    );
};

export default CursorEffects;
