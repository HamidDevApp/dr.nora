"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SITE, whatsappUrl } from "@/lib/site";
import { IMAGES } from "@/lib/images";
import { Magnetic } from "@/components/ui/Magnetic";
import { StarRating } from "@/components/ui/StarRating";
import { WhatsAppIcon } from "@/components/ui/icons";

const LINES = [["La", "médecine", "esthétique,"], ["avec", "justesse."]];

// Hero plein écran. Le titre et le zoom d'entrée sont en CSS (globals.css) :
// ils jouent dès le premier rendu, avant l'hydratation. Motion ne pilote que
// la parallaxe liée au défilement, en transform/opacity (compositing GPU).
export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-ink text-ivory"
    >
      {/* Fond : zoom d'entrée en CSS, parallaxe au défilement */}
      <motion.div style={reduce ? undefined : { y: bgY, scale: bgScale }} className="absolute inset-0 -z-20 will-change-transform">
        <div className="hero-zoom absolute inset-0">
          <Image
            src={IMAGES.heroBackdrop.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-end gap-12 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-12 lg:pb-24">
        <motion.div style={reduce ? undefined : { y: contentY, opacity: contentOpacity }} className="lg:col-span-8">
          {/* Mobile : la carte portrait est remplacée par une pastille en verre */}
          <div
            className="fade-in-late mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-1.5 pr-5 pl-1.5 backdrop-blur-md lg:hidden"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image src="/images/dr-nora-visage.jpg" alt="" fill sizes="40px" className="object-cover" />
            </span>
            <span className="text-xs leading-tight">
              <span className="block font-medium">Dr Nora Leghzaoui</span>
              <span className="text-ivory/70">
                {SITE.rating.value.toLocaleString("fr-FR")}/5 · {SITE.rating.count} avis Google
              </span>
            </span>
          </div>
          <p
            className="fade-in-late text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne"
            style={{ animationDelay: "0.2s" }}
          >
            Cabinet médico-laser · Agadir Bay
          </p>

          <h1
            id="hero-title"
            aria-label="La médecine esthétique, avec justesse."
            className="mt-6 font-serif text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] font-medium tracking-[-0.02em]"
          >
            {LINES.map((line, li) => (
              <span key={li} aria-hidden className="block">
                {line.map((w) => {
                  const delay = 0.35 + wordIndex++ * 0.09;
                  return (
                    <span key={w} className="reveal-word mr-[0.22em] last:mr-0">
                      <span className={li === 1 ? "italic text-sage-100" : ""} style={{ animationDelay: `${delay}s` }}>
                        {w}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p
            className="fade-in-late mt-8 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg"
            style={{ animationDelay: "0.9s" }}
          >
            Laser, injections et nutrition, réunis par le Dr Nora Leghzaoui dans un cabinet médical
            face à la baie. Un diagnostic d&apos;abord, puis des soins mesurés pour des résultats naturels.
          </p>

          <div className="fade-in-late mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "1.1s" }}>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ivory px-8 text-[15px] font-medium text-ink transition-colors hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
              >
                Réserver une consultation
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href={whatsappUrl("Bonjour, je souhaite prendre rendez-vous avec le Dr Nora.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 text-[15px] font-medium text-ivory backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* Carte verre : la vraie photo du Dr Nora (trop petite pour un plein écran) */}
        {/* Deux couches : Motion gère la parallaxe (transform), le CSS l'apparition,
            pour que l'animation CSS n'écrase pas le transform de Motion. */}
        <motion.div
          style={reduce ? undefined : { y: cardY }}
          className="hidden w-full max-w-[320px] justify-self-end lg:col-span-4 lg:block"
        >
        <figure
          className="fade-in-late rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <Image
              src={IMAGES.hero.src}
              alt={IMAGES.hero.alt}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <figcaption className="flex items-center justify-between gap-3 px-2 pt-4 pb-1">
            <span>
              <span className="block font-serif text-xl leading-tight">Dr Nora Leghzaoui</span>
              <span className="mt-0.5 block text-xs text-ivory/70">Médecin · Agadir</span>
            </span>
            <span className="text-right">
              <StarRating value={SITE.rating.value} className="h-3.5 w-3.5" />
              <span className="mt-1 block text-xs text-ivory/70">
                {SITE.rating.value.toLocaleString("fr-FR")}/5 · {SITE.rating.count} avis
              </span>
            </span>
          </figcaption>
        </figure>
        </motion.div>
      </div>

      {/* Indicateur de défilement */}
      <a
        href="#manifeste"
        aria-label="Faire défiler vers la suite"
        className="fade-in-late absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory/60 md:flex"
        style={{ animationDelay: "1.5s" }}
      >
        Défiler
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-ivory"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </a>
    </section>
  );
}
