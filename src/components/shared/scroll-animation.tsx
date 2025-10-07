// @/components/shared/scroll-animation.tsx
"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  transition?: object;
  triggerOnce?: boolean;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const defaultTransition = {
  duration: 0.5,
  ease: "easeOut",
};

export default function ScrollAnimation({
  children,
  className,
  variants = defaultVariants,
  transition = defaultTransition,
  triggerOnce = true,
}: ScrollAnimationProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!triggerOnce) {
      controls.start("hidden");
    }
  }, [controls, inView, triggerOnce]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={transition}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
