"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const TEXT =
  "Chaque visage a son histoire. Avant tout geste, un diagnostic médical. Puis des soins mesurés, choisis pour votre peau, pour un résultat qui vous ressemble.";

// Manifeste éditorial : les mots s'illuminent un à un au rythme du défilement.
export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section id="manifeste" aria-label="Notre approche" className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne-700">L&apos;approche</p>
        <p
          ref={ref}
          className="mt-8 font-serif text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.15] text-ink"
        >
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}
