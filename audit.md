# AUDIT V44 — index.html
## Fichier : 9 982 lignes / 492 KB total

---

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
| 8595 | `window` | `resize` (glow canvas) |
| 8692 | `window` | `resize` (hero canvas) |
| 8776 | `window` | `fitTimeline` |
| 8827 | `window` | `sz` |
| 9376 | `window` | `setVH + stabilizeFrames + lockNav` |
| 9377 | `window.visualViewport` | `setVH` |
| 9421 | `window` | `lockTopControls + fitTimeline` |
| 9531 | `window` | `updateLangVisibility` |
| 9563 | `window` | `updateLang + fitTimelineTight` |
| 9594 | `window` | `forceTimeline` |
| 9613 | `window` | `refresh` |
| 9655 | `window` | `updateContainerVars + controlLang` |
| 9705 | `window` | `setLangVisibility + fitFrames` |
| 9750 | `window` | `langVisibility + fitFrames` |
| 9977 | `window` | `updateContainerVars + controlLang` (patch V44, duplique l.9655) |

---

## 7. IIFEs — 30 au total

Lignes de départ : 8583, 8757, 8763, 8782, 8791, 8823, 8848, 8863, 8875, 8906, 8929, 9002, 9025, 9105, 9125, 9220, 9261, 9283, 9316, 9334, 9385, 9438, 9536, 9568, 9588, 9599, 9632, 9675, 9710, 9836

---

## 8. SÉLECTEURS CSS DUPLIQUÉS — 60 sélecteurs

| Occurrences | Sélecteur (tronqué) |
|-------------|---------------------|
| 8× | `.rsvp-chapter` |
| 4× | `.timeline-b-v7 .icon-img, ...` |
| 4× | `.final-couple (display: none !important)` |
| 3× | `.countdown-lustre` |
| 3× | `.timeline-b-v7` |
| 3× | `.timeline-b-v7 .timeline` |
| 3× | `.timeline-exact-frame` |
| 3× | `.h-intro` |
| 3× | `#rsvp.rsvp-chapter` |
| 3× | `.rsvp-chapter > .es-inner + .rsvp-form` |
| 2× | `.scratch-frame` |
| 2× | `.dress-frame` |
| 2× | `#hero .h-q1, #hero .h-q2` |
| … | (46 autres sélecteurs dupliqués 2-3 fois) |

---

## 9. SECTIONS HTML PRÉSENTES (par ID)

```
✓ progress-bar       ✓ anchor-nav         ✓ topnav
✓ lang-sw            ✓ enter              ✓ wash
✓ cta                ✓ hero               ✓ hero-veil
✓ notre-date         ✓ compte-a-rebours   ✓ notre-histoire
✓ les-lieux          ✓ programme          ✓ dresscode
✓ hebergements       ✓ autour             ✓ empreintes
✓ cadeaux            ✓ rsvp               ✓ rsvp-success
✓ remerciements      ✓ photo-finale
```

---

## 10. CE QUI FONCTIONNE / CE QUI EST POTENTIELLEMENT CASSÉ

### Fonctionne (code présent et cohérent)
- Structure HTML complète — toutes les sections présentes
- Fonctions globales `setLang()`, `toggleMusic()`, `sendRsvp()` — définies avant les IIFEs
- Formspree endpoint `xqegygee` — présent
- ChopinScript base64 — intact dans le bloc `<style>` 1
- Séquence d'ouverture (porte vidéo + glow canvas) — IIFE cohérente
- Carousels lieux (2 IIFEs similaires — doublon à risque)
- `q()` et `qa()` — définies **uniquement dans le patch V44** (ligne 9839) et dans certaines IIFEs localement. **Non disponibles globalement dans le bloc JS principal.**

### Potentiellement cassé / risqué
| Problème | Description | Impact |
|----------|-------------|--------|
| `q()` et `qa()` non globales | Définies uniquement dans le patch V44 (IIFE) et quelques IIFEs locales. Les IIFEs du bloc 1 qui les utilisent sans les redéfinir localement pourraient planter. | ⚠️ Élevé |
| `fitTimeline()` redéfinie | Ligne 9398 redéfinit la fonction globale de la ligne 8764. La version du patch gagne. | ⚠️ Moyen |
| `controlLang()` redéfinie | Version patch (ligne 9851) utilise `eventia-lang-hidden`, version principale (9648) aussi — cohérent mais redondant. | ⚠️ Faible |
| 15 resize listeners | Risque de jank sur mobile/iOS. `fitTimeline()` appelée via 3 listeners distincts. | ⚠️ Moyen |
| 14 DOMContentLoaded | Race condition potentielle sur iOS Safari au démarrage. | ⚠️ Moyen |
| `gCtx = glowC.getContext('2d')` sans null-check | Si `#glow` absent, plante immédiatement (ligne ~8589). | ⚠️ Faible (HTML présent) |
| Carousel IIFE en double | 2 IIFEs similaires pour le carousel lieux — la 2e peut écraser l'état de la 1ère. | ⚠️ Moyen |

---

## RÉSUMÉ CHIFFRÉ

| Métrique | Valeur |
|----------|--------|
| Blocs `<style>` | **2** |
| Blocs `<script>` | **2** |
| `!important` total | **4 362** |
| @keyframes dupliqués | **2 noms** (rsvpConfettiReal ×3, citShimmer ×2) |
| Fonctions JS dupliquées (conflictuelles) | **6** |
| `DOMContentLoaded` | **14** |
| `resize` listeners | **15** |
| IIFEs | **30** |
| Sélecteurs CSS dupliqués | **60** |
| Poids CSS | **390 KB** |
| Poids JS | **78 KB** |
| Poids HTML pur | **23 KB** |
| Poids total | **492 KB** |
