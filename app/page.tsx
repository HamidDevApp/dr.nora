import CinematicHero from "@/components/home/CinematicHero";
import Marquee from "@/components/home/Marquee";
import Manifesto from "@/components/home/Manifesto";
import Expertises from "@/components/home/Expertises";
import DoctorFeature from "@/components/home/DoctorFeature";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";

// Accueil : récit en plein écran, de l'ambiance (Hero) à la prise de rendez-vous.
// Les sections animées sont des composants client ; la page reste un composant serveur.
export default function Home() {
  return (
    <>
      <CinematicHero />
      <Marquee />
      <Manifesto />
      <Expertises />
      <DoctorFeature />
      <Reviews />
      <Contact />
    </>
  );
}
