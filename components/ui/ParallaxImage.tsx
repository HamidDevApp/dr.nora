"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Image en parallaxe douce : le cadre est fixe (pas de CLS), seule l'image
// interne, plus haute de 16 %, se déplace au défilement (transform uniquement).
export function ParallaxImage({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  range = 8,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  range?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${imgClassName}`} />
      </motion.div>
    </div>
  );
}
