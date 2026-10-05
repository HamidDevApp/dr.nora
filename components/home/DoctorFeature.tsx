"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SITE } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { CheckIcon } from "@/components/ui/icons";

const spring = { type: "spring", stiffness: 70, damping: 18 } as const;

const PILLARS = [
  {
    title: "Une approche médicale",
    text: "Chaque soin est précédé d'un diagnostic et adapté à votre peau, à votre histoire et à vos attentes.",
  },
  {
    title: "Des résultats naturels",
    text: "Corriger sans transformer : l'objectif est un visage reposé et une peau en meilleure santé.",
  },
  {
    title: "Un suivi dans la durée",
    text: "Esthétique et nutrition se répondent, pour des résultats qui tiennent dans le temps.",
  },
];

// Portrait éditorial : la vraie photo du Dr Nora chevauche un aplat sable,
// chiffres réels uniquement (note Google, nombre d'avis, expertises).
export default function DoctorFeature() {
  const stats = [
    { value: SITE.rating.value.toLocaleString("fr-FR"), label: "Note Google sur 5" },
    { value: String(SITE.rating.count), label: "Avis patients" },
    { value: "3", label: "Expertises réunies" },
  ];

  return (
    <section id="cabinet" aria-labelledby="cabinet-title" className="relative bg-ivory pb-28 md:pb-40">
      <div aria-hidden className="absolute inset-x-0 top-24 bottom-0 bg-sand lg:right-[38%] lg:rounded-r-[3rem]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={spring}
          className="lg:col-span-5 lg:col-start-8 lg:row-start-1"
        >
          <ParallaxImage
            src={IMAGES.hero.src}
            alt={IMAGES.hero.alt}
            sizes="(min-width: 1024px) 40vw, 100vw"
            range={5}
            className="aspect-[4/5] rounded-[2rem] bg-sand shadow-[0_50px_100px_-50px_rgba(31,42,46,0.55)]"
          />
        </motion.div>

        <div className="pt-8 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:pt-44">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne-700">Le Dr Nora</p>
          <TextReveal
            id="cabinet-title"
            text="Une médecin, un cabinet, au cœur d'Agadir Bay."
            italicFrom={5}
            className="mt-5 font-serif text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.05] text-ink"
          />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone">
            Médecin, le Dr Nora Leghzaoui a réuni dans un même cabinet la médecine laser, la médecine
            esthétique et la nutrition. Sa conviction : la beauté de la peau se travaille de
            l&apos;intérieur comme de l&apos;extérieur, avec rigueur et douceur.
          </p>

          {SITE.credentials.length > 0 && (
            <ul className="mt-8 space-y-2.5">
              {SITE.credentials.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] text-ink">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sage-600" />
                  {c}
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: 0.08 * i }}
                className="border-t border-ink/15 pt-4"
              >
                <dd className="font-serif text-5xl leading-none text-ink">{s.value}</dd>
                <dt className="mt-2 text-xs text-stone">{s.label}</dt>
              </motion.div>
            ))}
          </dl>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: 0.1 + 0.08 * i }}
              >
                <h3 className="font-serif text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Magnetic strength={0.25}>
              <Link
                href="/cabinet"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 text-[15px] font-medium text-ivory transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-600"
              >
                Découvrir le cabinet
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
