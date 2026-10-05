// Bandeau défilant des soins, en CSS pur (aucun JavaScript, composité GPU).
const ITEMS = [
  "Épilation laser",
  "Taches pigmentaires",
  "Acide hyaluronique",
  "Skinboosters",
  "Photoréjuvénation",
  "Peelings médicaux",
  "PRP",
  "Bilan nutritionnel",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div aria-hidden className="overflow-hidden border-y border-white/10 bg-ink py-5 text-ivory/80">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-2xl italic">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
          </span>
        ))}
      </div>
    </div>
  );
}
