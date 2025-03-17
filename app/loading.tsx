"use client";

import { Progress } from "@/components/ui/progress"; // Adjust the import based on your project structure
import { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-4/5 sm:w-1/2 lg:w-1/3">
        <p className="text-center mb-4">Loading...</p>
        <Progress value={progress} />
      </div>
    </div>
  );
};

export default Loading;
