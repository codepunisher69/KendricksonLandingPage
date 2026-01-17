"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  viewport?: { once: boolean; margin: string };
}

export const FadeIn = ({
  children,
  delay = 0,
  className = "",
  viewport = { once: true, margin: "-50px" },
}: MotionWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={viewport}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
};

export const SlideUp = ({
  children,
  delay = 0,
  className = "",
}: MotionWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={{ once: true, margin: "-50px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
};
