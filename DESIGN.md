# Design

> Seed initial dérivé de la V1 existante + direction « Holonet Republic ».
> À affiner pendant `/impeccable shape`. Identité conservée : bleu-gris militaire + cyan holo.

## Theme

Terminal holographique de la République, militaire et habité. Sombre, tactique, lumière émise par l'écran (phosphore holo) plutôt que réfléchie. Net et lisible : l'immersion ne dégrade jamais la lecture. Direction : **Holonet Republic** — HUD propre façon Clone Wars, pas néon cyberpunk.

## Color

Palette en OKLCH, ancrée sur l'identité V1 (à valider en contraste pendant shape).

| Rôle | V1 (hex) | Usage |
|------|----------|-------|
| `--bg` | `#050505` → `#1a202c` (radial) | Fond profond, vide spatial |
| `--surface` | `#1a202c` | Panneaux holo, cartes |
| `--ink` | `#cbd5e0` | Corps de texte (à pousser plus clair si contraste < 4.5:1) |
| `--wolf-blue` | `#7c90b1` | Couleur d'unité, accents structurants |
| `--holo-cyan` | `#00f0ff` | Accent holographique vif, données live, focus |
| `--alert-red` | `#9B2C2C` | Alertes, statuts critiques |
| `--term-green` | `#33ff33` | Logs terminal, statut OK |

Stratégie : **committed** — le bleu-gris/cyan porte l'identité ; rouge et vert sont des signaux fonctionnels (statuts), pas décoratifs. Vérifier chaque texte sur fond holo (le cyan pur sur sombre est limite en petit corps : réserver aux titres/accents, pas au paragraphe).

## Typography

- **Display / titres** : `Orbitron` (uppercase, letter-spacing maîtrisé ≥ -0.04em, pas de tracking excessif).
- **Corps / UI** : `Rajdhani`.
- **Data / terminal** : `Share Tech Mono` (matricules, logs, time, hash).
- Pairing sur axe de contraste (display géométrique vs mono technique). Line-length corps ≤ 70ch.

## Components

- **holo-panel** : panneau diégétique (bord fin cyan/bleu, coins accentués, léger backdrop-blur). Brique de base ; éviter la grille de cartes identiques.
- **boot-screen** : séquence de démarrage terminal (logs, barre de progression, hash).
- **nav tactique** : onglets QG / Archives / Effectifs / Armurerie / Hangar / Médailles / Ordre des Crocs / Recrutement.
- **detail-modal** : fiche détaillée (membre / arme / véhicule / médaille).
- **galaxy-map** : carte galactique interactive (planètes du lore).
- **status chips** : EN DIRECT, ACTIF, PRIORITAIRE (signaux colorés).

## Layout

- App-shell : header fixe (temps galactique + matricule) → nav → section active → footer.
- Sections en onglets (SPA statique, une section visible à la fois).
- Responsive : nav repliée en menu mobile < xl. Tester l'overflow des titres Orbitron à chaque breakpoint.
- Grilles : `repeat(auto-fit, minmax(...))` plutôt que colonnes fixes ; flex pour le 1D.

## Motion

- Boot screen, scanlines, scan-line balayage, apparition des panneaux holo.
- Courbes ease-out (quart/expo), pas de bounce.
- **`prefers-reduced-motion`** : alternative obligatoire (boot raccourci/instantané, scanlines statiques, crossfade au lieu des reveals).
- Scanlines à opacité basse pour ne pas nuire à la lecture.
