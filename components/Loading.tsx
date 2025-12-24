import { motion } from "framer-motion";

interface LoadingProps {
    fullScreen?: boolean;
    text?: string;
    size?: "sm" | "md" | "lg";
}

const Loading = ({ fullScreen = false, text = "Loading...", size = "md" }: LoadingProps) => {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16"
    };

    const dotSize = {
        sm: "w-1.5 h-1.5",
        md: "w-2 h-2",
        lg: "w-3 h-3"
    };

    const containerClasses = fullScreen
        ? "fixed inset-0 bg-[#0e0e0e] flex items-center justify-center z-50"
        : "flex items-center justify-center py-20";

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center gap-6">
                {/* Animated spinner */}
                <motion.div
                    className={`${sizeClasses[size]} relative`}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-transparent border-t-white rounded-full"></div>
                </motion.div>

                {/* Loading text */}
                <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-400 font-medium">{text}</span>
                    <div className="flex items-center gap-1 ml-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className={`${dotSize[size]} rounded-full bg-gray-400`}
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.15
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
