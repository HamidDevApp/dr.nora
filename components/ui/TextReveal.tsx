"use client";

import { motion } from "motion/react";

type Tag = "h2" | "h3" | "p";

// Titre révélé mot à mot : chaque mot glisse vers le haut depuis un masque,
// déclenché à l'entrée dans l'écran, avec un ressort.
export function TextReveal({
  text,
  as = "h2",
  className = "",
  id,
  italicFrom,
}: {
  text: string;
  as?: Tag;
  className?: string;
  id?: string;
  /** Index du premier mot mis en italique sauge (accent éditorial). */
  italicFrom?: number;
}) {
  const MotionTag = motion[as];
  const words = text.split(" ");
  return (
    <MotionTag
      id={id}
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.06 }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="reveal-mask inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className={`inline-block ${italicFrom !== undefined && i >= italicFrom ? "italic text-sage-600" : ""}`}
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { type: "spring", stiffness: 90, damping: 18, mass: 0.8 } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </MotionTag>
  );
}
