"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Balanced spring for luxury smoothness without lag
  const springConfig = { damping: 35, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener("mousemove", handleMouseMove);
    
    // Support interactive elements
    const interactables = document.querySelectorAll('button, a, .group');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
        left: -12,
        top: -12,
      }}
      animate={{
        scale: isHovered ? 2 : 1, // Reduced max scale for better stability
        backgroundColor: isHovered ? "rgba(0, 90, 198, 0.15)" : "rgba(0, 90, 198, 1)",
        borderColor: isHovered ? "rgba(0, 90, 198, 1)" : "transparent",
      }}
      className="fixed pointer-events-none z-[99999] w-6 h-6 rounded-full border border-solid flex items-center justify-center mix-blend-difference hidden md:flex will-change-transform"
    >
      <div className="w-1 h-1 bg-white rounded-full opacity-50" />
    </motion.div>
  );
}

