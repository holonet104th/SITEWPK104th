# Product

## Register

brand

## Users

Deux publics, un même terminal :

- **Visiteurs / recrues potentielles** — arrivent de l'extérieur (Discord, lien partagé). Contexte : curieux, veulent comprendre ce qu'est le 104e et s'ils veulent rejoindre. Job : se faire une idée crédible de la meute et trouver comment postuler.
- **Membres existants de la meute** — reviennent pour le lore, le roster, l'arsenal, le classement « Ordre des Crocs ». Contexte : immersion, fierté d'appartenance. Job : consulter les archives, vérifier la hiérarchie, vivre l'univers.

## Product Purpose

Portail « holonet » immersif du **104e Bataillon "Wolfpack"** (communauté Star Wars / RP). Il présente le lore du bataillon, ses effectifs, son armurerie, son hangar, ses médailles et son système de classement interne, **et** convertit les visiteurs en recrues — le tout enveloppé dans une expérience de terminal de la République, in-universe de bout en bout. Site statique, hébergé sur GitHub Pages, sans backend. Succès = un visiteur a l'impression de s'être connecté à un vrai terminal classifié de la République, et sait comment rejoindre.

## Brand Personality

Militaire, discipliné, diégétique, fraternel (« la meute »). Voix : tactique, sobre, à la 1re personne d'unité, en français. Objectif émotionnel : crédibilité immersive — pas un site « sur » le 104e, mais le terminal **du** 104e.

## Anti-references

- **Le « style d'IA » de l'ancienne V1** : c'est l'anti-référence n°1. Bans absolus : texte en dégradé, grilles de cartes identiques, eyebrow majuscule tracké au-dessus de chaque section, template hero-metric, bordures latérales colorées, glassmorphism par défaut.
- Néon cyberpunk générique (Tron, RGB gamer).
- Landing SaaS corporate.
- Sci-fi « propre et vide » : ici l'ambiance est militaire et habitée, pas une démo de composants.

## Design Principles

1. **Diégétique avant décoratif** — chaque élément d'UI se lit comme une pièce d'un vrai terminal de la République, pas comme du chrome de site web.
2. **L'immersion ne coûte jamais la lisibilité** — scanlines, boot, holo sont au service du contenu ; contraste et hiérarchie priment toujours.
3. **Le contenu est canon** — 100 % du texte/lore existant est préservé en V2 ; on peut enrichir, jamais supprimer.
4. **Motion intentionnel** — effets diégétiques maîtrisés, avec alternative `prefers-reduced-motion` systématique.
5. **Statique et rapide** — GitHub Pages, pas de backend, médias optimisés (les .webm lourds sont une dette à payer).

## Accessibility & Inclusion

- WCAG AA : corps de texte ≥ 4.5:1 (le cyan sur fond sombre doit être vérifié, pas supposé).
- `prefers-reduced-motion` : alternative pour boot screen, scanlines et animations holo.
- Navigation clavier sur les onglets et la modale ; HTML sémantique.
- Médias lourds avec fallback image (jpg) et `loading`/`preload` raisonnés.
