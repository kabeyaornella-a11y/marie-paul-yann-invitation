# RAPPORT D'AUDIT — Invitation Marie-Paul & Yann
## Phase 1 — Analyse V44 (aucune modification effectuée)
### Fichier : `index.html` — 9 982 lignes / 492 KB

---

## RÉSUMÉ DES RÉSULTATS

### Structure du fichier

| Élément | Détail |
|---------|--------|
| Blocs `<style>` | **2** — bloc principal (l.27–8113 = 378 KB) + patch V44 (l.9757–9832 = 11 KB) |
| Blocs `<script>` | **2** — bloc principal (l.8533–9753 = 70 KB) + patch V44 (l.9835–9980 = 7 KB) |
| HTML pur | **23 KB** |
| **Total fichier** | **492 KB / 9 982 lignes** |

### Problèmes détectés

| Métrique | Compte |
|----------|--------|
| `!important` total | **4 362** (4 308 dans bloc 1 + 52 dans patch V44) |
| @keyframes dupliqués | `rsvpConfettiReal` ×3, `citShimmer` ×2 |
| Fonctions JS dupliquées (conflictuelles) | `ready` ×9, `fitTimeline` ×2, `updateContainerVars` ×2, `controlLang` ×2, `showVerse` ×2, `fitFrames` ×2 |
| `DOMContentLoaded` | **14** |
| `resize` listeners | **15** |
| IIFEs | **30** |
| Sélecteurs CSS dupliqués | **60** |

---

## RISQUE IMPORTANT IDENTIFIÉ

`q()` et `qa()` ne sont **pas définies globalement** dans le bloc JS principal.  
Elles existent uniquement dans le patch V44 (IIFE fermée, ligne 9839) et dans quelques IIFEs locales.  
Les IIFEs du bloc 1 qui les appellent sans les redéfinir localement pourraient produire un `ReferenceError` selon l'ordre d'exécution sur certains navigateurs (notamment iOS Safari).

---

---

# AUDIT COMPLET — audit.md

## 1. BLOCS `<style>` ET `<script>`

| Bloc | Lignes | Poids |
|------|--------|-------|
| `<style>` bloc 1 (principal) | 27 → 8113 | 378 KB |
| `<style>` bloc 2 (patch V44) | 9757 → 9832 | 11 KB |
| `<script>` bloc 1 (principal) | 8533 → 9753 | 70 KB |
| `<script>` bloc 2 (patch V44) | 9835 → 9980 | 7 KB |

**Total CSS : 390 KB — Total JS : 78 KB — HTML pur : 23 KB**

---

## 2. OCCURRENCES `!important`

| Bloc | Occurrences |
|------|-------------|
| `<style>` bloc 1 | 4 308 |
| `<style>` bloc 2 (patch) | 52 |
| **TOTAL** | **4 362** |

### Top 20 sélecteurs avec le plus de `!important`

| Occurrences | Sélecteur |
|-------------|-----------|
| 9 | `.rsvp-chapter` |
| 9 | `.final-photo-wrap` |
| 8 | `.story2-cit-text` |
| 8 | `.rsvp-form input,.rsvp-form select,.rsvp-form textarea` |
| 8 | `.rsvp-form` |
| 8 | `#topnav` |
| 8 | `#programme` |
| 7 | `html,body` |
| 7 | `@media(max-width:430px)` |
| 7 | `.story2-text` |
| 7 | `.presence-options` |
| 7 | `#lang-sw` |
| 6 | `html, body` |
| 6 | `@media(max-width:640px)` |
| 6 | `.timeline-b-v7 .tl-item.r .col-text` |
| 6 | `.timeline-b-v7 .tl-item.r .col-icon` |
| 6 | `.timeline-b-v7 .tl-item.r .col-dot` |
| 6 | `.timeline-b-v7 .tl-item.l .col-text` |
| 6 | `.timeline-b-v7 .tl-item.l .col-icon` |
| 6 | `.timeline-b-v7 .tl-item.l .col-dot` |

---

## 3. @KEYFRAMES DUPLIQUÉS

| Nom | Occurrences | Statut |
|-----|-------------|--------|
| `rsvpConfettiReal` | 3× | ⚠️ DUPLIQUÉ |
| `citShimmer` | 2× | ⚠️ DUPLIQUÉ |

**Total keyframes définis :** 41 (dont 2 noms dupliqués = 3 définitions redondantes)

### Liste complète des @keyframes

```
verseSweep, sparkle, shimmer, sacredLineSweep, sacredGoldMove, s2zoom,
rsvpConfettiReal (×3), rsvpConfetti, rP, heroStarsUpV44, heroFloat,
fadeInUp, eventiaVerseSweep, eventiaVerseSweepV44, eventiaV44Shimmer,
eventiaV25FinalShimmer, eventiaV25BibleSweep, eventiaV24PhraseSweep,
eventiaStar, eventiaShimmer, eventiaShimmerNames, eventiaSacredSweep,
eventiaNameShimmer, eventiaHeroShimmer, eventiaFinalNameShimmer,
eventiaDotRing, eventiaDotPulse, eventiaAxisGlow, esActDust,
dotSoftLight, dotPulseV12, dotPulse, dotGoldPulse, citationShimmer,
citShimmer (×2), btnSpark, blink, axisSoftLight, axisPulse, axisGlowMove
```

---

## 4. FONCTIONS JS DUPLIQUÉES

### Redéfinitions réellement conflictuelles (scope global ou cross-IIFE)

| Fonction | Lignes | Occurrences | Risque |
|----------|--------|-------------|--------|
| `ready()` | 8876, 8907, 9003, 9439, 9569, 9589, 9676, 9711, **9838** | 9× | ⚠️ Redondant, pas dangereux |
| `fitTimeline()` | 8764, **9398** | 2× | ⚠️ La 2e redéfinit la 1ère au scope global |
| `updateContainerVars()` | 9634, **9842** | 2× | ⚠️ Redéfinition dans patch V44 |
| `controlLang()` | 9648, **9851** | 2× | ⚠️ Redéfinition dans patch V44 |
| `showVerse()` | 9678, **9723** | 2× | ⚠️ Redéfinition dans même bloc |
| `fitFrames()` | 9683, **9718** | 2× | ⚠️ Redéfinition dans même bloc |

### Fonctions locales à des IIFEs différentes (pas conflictuelles)

| Fonction | Lignes | Note |
|----------|--------|------|
| `resize()` | 8594, 8690 | Dans IIFEs séparées — OK |
| `show()` | 8794, 8867 | Dans IIFEs séparées (carousels) — OK |

---

## 5. DOMContentLoaded — 14 occurrences

| Ligne | Type | Contexte |
|-------|------|---------|
| 8876 | `function ready()` définition n°1 | IIFE porte |
| 8907 | `function ready()` définition n°2 | IIFE étoiles hero |
| 9003 | `function ready()` définition n°3 | IIFE RSVP confetti |
| 9269 | `window.addEventListener('DOMContentLoaded'...)` | Direct — anchor nav |
| 9380 | `document.addEventListener('DOMContentLoaded'...)` | Direct — setVH/clampPage |
| 9432 | `document.addEventListener('DOMContentLoaded'...)` | Direct — lockTopControls/fitTimeline |
| 9439 | `function ready()` définition n°4 | IIFE main boot |
| 9561 | `document.addEventListener('DOMContentLoaded', boot)` | Boot i18n |
| 9569 | `function ready()` définition n°5 | IIFE timeline tight |
| 9589 | `function ready()` définition n°6 | IIFE forceTimeline |
| 9656 | `document.addEventListener('DOMContentLoaded'...)` | Direct — updateContainerVars |
| 9676 | `function ready()` définition n°7 | IIFE lang scroll |
| 9711 | `function ready()` définition n°8 | IIFE frames |
| 9838 | `function ready()` définition n°9 | Patch V44 |

---

## 6. RESIZE LISTENERS — 15 actifs simultanément

| Ligne | Cible | Fonction |
|-------|-------|---------|
| 8595 | `window` | `resize` (glow canvas porte) |
| 8692 | `window` | `resize` (hero canvas étoiles) |
| 8776 | `window` | `fitTimeline` |
| 8827 | `window` | `sz` (countdown) |
| 9376 | `window` | `setVH + stabilizeFrames + lockNav` |
| 9377 | `window.visualViewport` | `setVH` |
| 9421 | `window` | `lockTopControls + fitTimeline` |
| 9531 | `window` | `updateLangVisibility` |
| 9563 | `window` | `updateLang + fitTimelineTight` |
| 9594 | `window` | `forceTimeline` |
| 9613 | `window` | `refresh` (anchor nav) |
| 9655 | `window` | `updateContainerVars + controlLang` |
| 9705 | `window` | `setLangVisibility + fitFrames` |
| 9750 | `window` | `langVisibility + fitFrames` |
| 9977 | `window` | `updateContainerVars + controlLang` (**patch V44 — duplique ligne 9655**) |

---

## 7. IIFEs — 30 au total

| # | Ligne de départ | Rôle (estimé) |
|---|----------------|---------------|
| 1 | 8583 | Porte — vidéo, glow canvas, doEnter |
| 2 | 8757 | Hero canvas — étoiles montantes |
| 3 | 8763 | Hero canvas (suite) |
| 4 | 8782 | Animations hero |
| 5 | 8791 | Carousel lieux (1ère occurrence) |
| 6 | 8823 | Carousel lieux (2ème occurrence — potentiel doublon) |
| 7 | 8848 | Gold particles (#gp-canvas) |
| 8 | 8863 | Story2 blocks reveal |
| 9 | 8875 | Timeline fit |
| 10 | 8906 | Scroll reveals (IntersectionObserver) |
| 11 | 8929 | Progress bar |
| 12 | 9002 | RSVP confettis |
| 13 | 9025 | Activities section |
| 14 | 9105 | Hébergements carousel 3D |
| 15 | 9125 | (suite carousel 3D) |
| 16 | 9220 | updateNav (anchor nav dots) |
| 17 | 9261 | syncMusicButton |
| 18 | 9283 | Scratch postMessage listener |
| 19 | 9316 | RSVP confettis (launchRsvpConfetti) |
| 20 | 9334 | Boot i18n (assignI18n, applyLang, boot) |
| 21 | 9385 | Main boot (forceVerse, shimmer, wireRsvp…) |
| 22 | 9438 | Scroll lang visibility |
| 23 | 9536 | Timeline tight |
| 24 | 9568 | forceTimeline |
| 25 | 9588 | Anchor nav (suite) |
| 26 | 9599 | Frames sizing |
| 27 | 9632 | Lang control |
| 28 | 9675 | Lang + frames (patch) |
| 29 | 9710 | Lang + frames (patch — duplique 9675) |
| 30 | 9836 | Patch V44 principal |

---

## 8. SÉLECTEURS CSS DUPLIQUÉS — 60 sélecteurs

| Occurrences | Sélecteur |
|-------------|-----------|
| 8× | `.rsvp-chapter` |
| 4× | `.timeline-b-v7 .icon-img, .tl-item.l .icon-img, ...` |
| 4× | `.final-couple { display: none !important }` |
| 3× | `.countdown-lustre` |
| 3× | `.timeline-b-v7` |
| 3× | `.timeline-b-v7 .timeline` |
| 3× | `.timeline-exact-frame` |
| 3× | `.h-intro` |
| 3× | `#rsvp.rsvp-chapter` |
| 3× | `.rsvp-chapter > .es-inner, .rsvp-chapter .rsvp-form { display: none !important }` |
| 2× | `.scratch-frame` |
| 2× | `.dress-frame` |
| 2× | `#hero .h-q1, #hero .h-q2 { transform: translateX(-50%) !important }` |
| … | (47 autres sélecteurs dupliqués 2–3 fois) |

---

## 9. SECTIONS HTML PRÉSENTES (par ID)

| ID | Présent |
|----|---------|
| `progress-bar` | ✓ |
| `anchor-nav` | ✓ |
| `topnav` | ✓ |
| `lang-sw` | ✓ |
| `enter` | ✓ |
| `wash` | ✓ |
| `cta` | ✓ |
| `hero` | ✓ |
| `hero-veil` | ✓ |
| `notre-date` | ✓ |
| `compte-a-rebours` | ✓ |
| `notre-histoire` | ✓ |
| `les-lieux` | ✓ |
| `programme` | ✓ |
| `dresscode` | ✓ |
| `hebergements` | ✓ |
| `autour` | ✓ |
| `empreintes` | ✓ |
| `cadeaux` | ✓ |
| `rsvp` | ✓ |
| `rsvp-success` | ✓ |
| `remerciements` | ✓ |
| `photo-finale` | ✓ |

---

## 10. CE QUI FONCTIONNE / CE QUI EST POTENTIELLEMENT CASSÉ

### Ce qui fonctionne

| Élément | Statut |
|---------|--------|
| Structure HTML complète | ✓ Toutes les sections présentes |
| `setLang()`, `toggleMusic()`, `sendRsvp()` | ✓ Définies globalement avant les IIFEs |
| Formspree endpoint `xqegygee` | ✓ Présent (ligne 9194) |
| ChopinScript base64 @font-face | ✓ Intact dans bloc CSS 1 |
| Séquence d'ouverture (porte vidéo + glow) | ✓ IIFE cohérente |
| Audio loop (`musique.m4a`) | ✓ Présent |
| Iframes (scratch, countdown, timeline, dresscode, envelope) | ✓ Toutes référencées |

### Ce qui est potentiellement cassé / risqué

| Problème | Description | Sévérité |
|----------|-------------|----------|
| `q()` et `qa()` non globales | Définies uniquement dans le patch V44 (IIFE fermée) et quelques IIFEs locales. Les IIFEs du bloc 1 qui les appellent pourraient planter. | ⚠️ Élevé |
| `fitTimeline()` redéfinie | Ligne 9398 redéfinit la fonction globale de la ligne 8764. La version du patch gagne, la version originale est écrasée. | ⚠️ Moyen |
| `controlLang()` redéfinie | Version patch (9851) vs version principale (9648). La dernière gagne, les deux sont quasi-identiques. | ⚠️ Faible |
| 15 resize listeners simultanés | Risque de jank sur mobile/iOS. `fitTimeline()` est appelée via 3 listeners distincts. | ⚠️ Moyen |
| 14 DOMContentLoaded | Race condition potentielle sur iOS Safari au démarrage. | ⚠️ Moyen |
| Carousel IIFE en double (l.8791 et l.8823) | Deux IIFEs similaires pour le carousel lieux — la 2e peut écraser l'état de la 1ère. | ⚠️ Moyen |
| `gCtx = glowC.getContext('2d')` sans null-check | Si `#glow` absent du DOM, plante immédiatement. HTML présent donc risque faible. | ⚠️ Faible |

---

## OBJECTIF PHASE 2 (à faire après validation)

- Créer `style.css` : extraction du CSS des 2 blocs `<style>`, sans modification du contenu
- Créer `script.js` : extraction du JS des 2 blocs `<script>`, sans modification du contenu
- Modifier `index.html` : remplacer les blocs inline par `<link href="style.css">` et `<script src="script.js">`
- **Aucune correction fonctionnelle ou visuelle à cette étape**
- Rendu visuel identique à la version actuelle

---

*Rapport généré le 2026-06-04 — Phase 1 audit uniquement, aucune modification effectuée.*
