"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PaintLoadingScreen from "./PaintLoadingScreen";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to ensure animation plays elegantly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PaintLoadingScreen key="loader" />}
      </AnimatePresence>
      <div 
        className={`transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        {!isLoading && children}
      </div>
    </>
  );
}
