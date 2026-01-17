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
  viewport = { once: true, margin: "0px 0px -50px 0px" },
}: MotionWrapperProps) => {
  return (
    <motion.div
      className={`${className} will-change-transform`}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
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
      className={`${className} will-change-transform`}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
};
