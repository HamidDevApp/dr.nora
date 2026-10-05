"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SERVICE_CATEGORIES } from "@/lib/services";
import { IMAGES } from "@/lib/images";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { ArrowIcon } from "@/components/ui/icons";

const spring = { type: "spring", stiffness: 70, damping: 18, mass: 0.9 } as const;

// Trois expertises en rangées asymétriques : grande image en parallaxe,
// carte en verre qui la chevauche, côté alterné d'une rangée à l'autre.
export default function Expertises() {
  return (
    <section id="soins" aria-labelledby="soins-title" className="relative overflow-hidden bg-ivory pb-28 md:pb-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne-700">Expertises</p>
            <TextReveal
              id="soins-title"
              text="Trois disciplines, un même regard médical."
              italicFrom={3}
              className="mt-5 font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.02] text-ink"
            />
          </div>
          <p className="text-[15px] leading-relaxed text-stone lg:col-span-4 lg:col-start-9">
            Tous les soins sont réalisés par le Dr Nora, après consultation. Aucun tarif n&apos;est
            affiché : il est défini après consultation médicale, selon votre peau et vos objectifs.
          </p>
        </div>

        <div className="mt-20 space-y-24 md:space-y-36">
          {SERVICE_CATEGORIES.map((cat, i) => {
            const img = IMAGES.services[cat.id];
            const flip = i % 2 === 1;
            return (
              <article key={cat.id} className="relative grid items-center lg:grid-cols-12">
                {/* Image : survol = zoom + voile + pastille */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={spring}
                  className={`lg:col-span-7 ${flip ? "lg:col-start-6 lg:row-start-1" : "lg:col-start-1"}`}
                >
                  <Link
                    href={`/${cat.id}`}
                    aria-label={`Découvrir : ${cat.label}`}
                    className="group relative block overflow-hidden rounded-[2rem] bg-sand"
                  >
                    <ParallaxImage
                      src={img.src}
                      alt={img.alt}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="aspect-[4/5] sm:aspect-[16/11]"
                      imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/35" />
                    <span className={`absolute top-6 font-serif ${flip ? "right-6 lg:right-8" : "left-6 lg:left-8"} text-7xl leading-none text-ivory/90 md:text-8xl`}>
                      0{i + 1}
                    </span>
                    <span className={`absolute bottom-6 inline-flex ${flip ? "right-6 lg:right-8" : "left-6 lg:left-8"} translate-y-3 items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2.5 text-sm font-medium text-ivory opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100`}>
                      Découvrir
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>

                {/* Carte en verre qui chevauche l'image */}
                <motion.div
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ ...spring, delay: 0.12 }}
                  className={`relative z-10 -mt-20 mx-3 sm:mx-8 lg:mx-0 lg:mt-0 lg:col-span-5 lg:row-start-1 ${
                    flip ? "lg:col-start-1 lg:-mr-24" : "lg:col-start-8 lg:-ml-24"
                  }`}
                >
                  <div className="rounded-[1.75rem] border border-white/60 bg-ivory/75 p-7 shadow-[0_30px_80px_-40px_rgba(31,42,46,0.45)] backdrop-blur-xl sm:p-10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne-700">
                      {cat.shortLabel}
                    </p>
                    <h3 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">{cat.label}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-stone">{cat.intro}</p>
                    <ul className="mt-6 divide-y divide-line border-y border-line">
                      {cat.services.map((s) => (
                        <li key={s.title} className="flex items-center justify-between gap-4 py-3 text-[15px] text-ink">
                          {s.title}
                          <span className="text-xs text-stone">Sur devis</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${cat.id}`}
                      className="group/link mt-7 inline-flex items-center gap-2 text-[15px] font-medium text-ink"
                    >
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover/link:bg-[length:100%_1px]">
                        Découvrir la page {cat.shortLabel}
                      </span>
                      <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
