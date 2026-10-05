# Site Dr Nora Leghzaoui

Next.js 15 (App Router) + Tailwind CSS v4 + Motion (ex-Framer Motion). Site multi-pages + 2 pages légales.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # vérifie les types et génère la version de production
```

## Structure

Site multi-pages (App Router) :

| Route | Contenu | Fichier de contenu |
| --- | --- | --- |
| `/` | Accueil cinématique : Hero plein écran, manifeste, expertises, Dr Nora, avis, contact | `components/home/*.tsx` |
| `/laser` | Épilation, taches, cicatrices, photoréjuvénation + plateau technique | `lib/treatments/laser.ts` |
| `/esthetique` | Acide hyaluronique, toxine botulique, PRP, mésothérapie, skinboosters, peeling | `lib/treatments/esthetique.ts` |
| `/nutrition` | Bilan, surpoids, radiofréquence, cryolipolyse | `lib/treatments/nutrition.ts` |
| `/cabinet` | Parcours du Dr Nora, hygiène, expérience patiente, le lieu | `app/cabinet/page.tsx` |
| `/mentions-legales`, `/confidentialite` | Pages légales | `app/*/page.tsx` |

```
app/
  layout.tsx              polices, SEO, Header + Footer + WhatsApp communs à toutes les pages
  page.tsx                accueil
  laser|esthetique|nutrition/page.tsx   3 lignes : métadonnées + <TreatmentPageView data={...} />
  cabinet/page.tsx        page sur mesure
  api/rdv/route.ts        formulaire → Google Sheets
components/
  Header.tsx              menu (lien actif souligné), menu mobile
  Reviews, Contact, Footer, WhatsAppFloat
  home/                   sections de l'accueil
    CinematicHero.tsx     plein écran, titre révélé mot à mot (CSS), parallaxe, carte verre avec la photo du Dr Nora
    Marquee.tsx           bandeau défilant des soins (CSS pur)
    Manifesto.tsx         texte qui s'illumine au défilement
    Expertises.tsx        rangées asymétriques : image en parallaxe + carte verre qui la chevauche
    DoctorFeature.tsx     portrait, chiffres réels (note, avis), lien vers /cabinet
  treatment/
    TreatmentPageView.tsx gabarit des pages de soins
    PageHero.tsx          titre, chapeau, repères, grande image
    TechniqueNav.tsx      sommaire collant (desktop) / onglets collants (mobile), suivi du défilement
    TechniqueSection.tsx  section riche : image, Comment ça marche ?, Indications, Déroulement, FAQ
    BentoGrid.tsx         grille bento (équipements, engagements, hygiène)
    ConsultBand.tsx       bandeau de rendez-vous (sans prix)
  ui/                     Accordion, Reveal, TextReveal, Magnetic, ParallaxImage, SectionHeading, StarRating, icônes, boutons
lib/
  site.ts                 infos du cabinet + menu (NAV)
  images.ts               photos (vraies + provisoires Unsplash) et helper unsplash()
  treatments/             contenu rédactionnel des pages de soins (types.ts = modèle)
  services.ts, reviews.ts, motion.ts
```

## Animations de l'accueil

- Le titre du Hero et le zoom d'entrée sont en CSS (`app/globals.css`) : ils démarrent avant le chargement du JavaScript, sans retarder l'affichage.
- Motion ne gère que ce qui dépend du défilement ou du curseur (parallaxe, mots du manifeste, boutons magnétiques), uniquement via `transform` et `opacity`.
- Les cadres d'images ont une taille fixe (pas de décalage de mise en page, CLS mesuré à 0).
- Si le visiteur a activé « réduire les animations », tout est désactivé ; l'effet magnétique ne s'active qu'avec une souris.

Ajouter une technique = ajouter un objet dans le tableau `techniques` du fichier de contenu : la section, le sommaire et les ancres se génèrent seuls.

## Brancher le formulaire sur Google Sheets

1. Créer une Google Sheet avec, en ligne 1 : `date | name | phone | email | service | message`.
2. Extensions > Apps Script, coller :

```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  SpreadsheetApp.getActiveSheet().appendRow([d.date, d.name, d.phone, d.email, d.service, d.message]);
  return ContentService.createTextOutput("ok");
}
```

3. Déployer > Nouveau déploiement > Application Web, accès « Tout le monde ». Copier l'URL.
4. Sur l'hébergement, définir la variable d'environnement `GOOGLE_SHEETS_WEBHOOK_URL` avec cette URL.

Sans cette variable, en développement la demande s'affiche dans la console ; en production le formulaire affiche une erreur qui renvoie vers WhatsApp.

Le formulaire passe par une route serveur (`app/api/rdv`) : l'hébergement Hostinger doit donc faire tourner Node.js (offre Node.js ou VPS), pas un simple hébergement de fichiers statiques.

## À compléter avant la mise en ligne

- [ ] Photos : la carte du Hero et le portrait « Le Dr Nora » utilisent la vraie photo du Dr Nora, trop petite (944 px) pour un plein écran. Le fond plein écran de l'accueil (`heroBackdrop`) et les visuels des expertises sont provisoires. Idéal : une photo large du cabinet en 2400 px minimum pour le fond. Les autres photos sont provisoires (Unsplash, `lib/images.ts`) : déposer les vraies dans `public/images/` et remplacer chaque `src` par `/images/<fichier>.jpg`
- [ ] `lib/site.ts` : liens Instagram et Facebook réels, diplômes du Dr Nora (`credentials`)
- [ ] `lib/reviews.ts` : coller 4 à 6 avis Google réels (les exemples sont masqués en production)
- [ ] `lib/services.ts` et `lib/treatments/` : valider les soins, les appareils laser et les repères (durées, séances) avec le Dr Nora
- [ ] Nutrition : confirmer que la radiofréquence et la cryolipolyse sont proposées (marquées « À confirmer » sur la page)
- [ ] `/cabinet` : valider les engagements d'hygiène et remplacer les photos du lieu
- [ ] Pages légales : numéro d'inscription à l'Ordre, ICE, déclaration CNDP, adresse de l'hébergeur
- [ ] Vérifier que le 05 28 22 32 60 est bien enregistré sur WhatsApp Business (c'est un fixe)

## Aperçus

Captures dans `apercu/` (desktop et mobile).
