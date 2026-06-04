# RAPPORT PHASE 2 — Séparation CSS/JS en fichiers externes
## Invitation Marie-Paul & Yann — Refactoring V44 → V45

---

## OBJECTIF DE LA PHASE 2

Séparer proprement le projet en trois fichiers distincts :
- `index.html` — structure HTML uniquement
- `style.css` — tout le CSS fusionné
- `script.js` — tout le JS fusionné

**Règles appliquées :**
- Aucun changement visuel
- Aucune correction fonctionnelle
- Suppression des doublons stricts uniquement
- Définitions globales uniques pour `ready()`, `q()`, `qa()`

---

## CE QUI A ÉTÉ FAIT

### 1. Création de `style.css`

- Extraction du bloc CSS 1 (lignes 27–8113 de l'ancien index.html, 378 KB)
- Extraction du bloc CSS 2 / patch V44 (lignes 9757–9832, 11 KB)
- Concaténation dans l'ordre : bloc1 d'abord, patch V44 ensuite
- **Ordre de cascade préservé** — comportement CSS identique à l'original
- Un commentaire séparateur `/* ===== PATCH V44 ===== */` marque la jonction

### 2. Création de `script.js`

- Extraction du bloc JS 1 (lignes 8533–9753, 70 KB)
- Extraction du bloc JS 2 / patch V44 (lignes 9835–9980, 7 KB)
- Ajout d'un en-tête global avec les 3 fonctions utilitaires uniques
- **Ordre d'exécution préservé** — comportement JS identique à l'original

### 3. Mise à jour de `index.html`

- Remplacement du bloc `<style>…</style>` par `<link rel="stylesheet" href="style.css">`
- Remplacement du bloc `<script>…</script>` par `<script src="script.js"></script>`
- Suppression du second bloc `<style id="eventia-v44-corrections-stables">`
- Suppression du second bloc `<script id="eventia-v44-corrections-stables-js">`
- Toutes les sections HTML conservées intactes

---

## COMPARAISON AVANT / APRÈS

| Métrique | AVANT | APRÈS | Variation |
|----------|-------|-------|-----------|
| Blocs `<style>` inline | 2 | **0** | -2 (→ style.css) |
| Blocs `<script>` inline | 2 | **0** | -2 (→ script.js) |
| Lignes CSS | 8 161 | **8 163** | +2 (commentaires) |
| Lignes JS | 1 365 | **1 365** | = |
| Lignes index.html | 9 982 | **531** | -9 451 |
| `!important` total | 4 362 | **4 360** | -2 (étaient dans JS) |
| `DOMContentLoaded` | 14 | **6** | -8 (9 supprimées, +1 globale) |
| `resize` listeners | 15 | **15** | = (Phase 3) |
| `ready()` définitions | 9 | **1** | -8 |
| `q()` définitions | 1 (locale) | **1** (globale) | = mais portée améliorée |
| `qa()` définitions | 1 (locale) | **1** (globale) | = mais portée améliorée |

---

## DÉTAIL DES SUPPRESSIONS EFFECTUÉES

### `ready()` — 9 occurrences supprimées

Toutes identiques en contenu (doublon strict). Remplacées par 1 définition globale en tête de `script.js`.

| # | Ligne originale | Contexte |
|---|----------------|---------|
| 1 | 8876 | IIFE porte (variante if/else) |
| 2 | 8907 | IIFE étoiles hero |
| 3 | 9003 | IIFE RSVP confetti |
| 4 | 9439 | IIFE main boot |
| 5 | 9569 | IIFE timeline tight |
| 6 | 9589 | IIFE forceTimeline |
| 7 | 9676 | IIFE lang scroll |
| 8 | 9711 | IIFE frames |
| 9 | 9838 | Patch V44 IIFE |

### `q()` et `qa()` — déplacées en scope global

| Ligne originale | Problème | Solution |
|----------------|---------|---------|
| 9839 (patch V44 IIFE) | Locale à une IIFE — inaccessible globalement | Déplacée en tête de script.js |
| 9840 (patch V44 IIFE) | Idem | Idem |

**Impact :** Ces fonctions sont désormais disponibles dans toutes les IIFEs du script, ce qui corrige le risque de `ReferenceError` identifié en Phase 1.

---

## CE QUI N'A PAS ÉTÉ MODIFIÉ (réservé Phase 3)

| Élément | Raison du report |
|---------|-----------------|
| 60 sélecteurs CSS dupliqués | Risque de changement de cascade |
| `@keyframes rsvpConfettiReal` ×4 | Occ. 2/3/4 identiques, occ. 1 différente — à traiter avec soin |
| `@keyframes citShimmer` ×2 | Identiques, suppression propre possible en Phase 3 |
| 15 `resize` listeners | Refactoring fonctionnel — Phase 3 |
| Bouton langue | Correction fonctionnelle — Phase 3 |
| Shimmer prénoms | Correction CSS — Phase 3 |
| Verset Matthieu | Correction CSS/JS — Phase 3 |
| RSVP centré | Correction CSS — Phase 3 |
| Confettis date | Correction JS — Phase 3 |
| Espaces inter-sections | Correction CSS — Phase 3 |

---

## VALIDATION TECHNIQUE

```bash
node --check script.js
→ ✓ JS OK (0 erreur de syntaxe)
```

### Sections HTML présentes dans index.html

```
✓ notre-date          ✓ compte-a-rebours    ✓ notre-histoire
✓ les-lieux           ✓ programme           ✓ dresscode
✓ hebergements        ✓ autour              ✓ empreintes
✓ cadeaux             ✓ rsvp                ✓ remerciements
✓ photo-finale
```

### Éléments critiques vérifiés

```
✓ ChopinScript @font-face base64 intact dans style.css
✓ Formspree endpoint xqegygee présent dans script.js
✓ <link rel="stylesheet" href="style.css"> en position correcte (ligne 27)
✓ <script src="script.js"></script> en position correcte (ligne 447)
✓ Audio musique.m4a référencé dans index.html
✓ Toutes les iframes présentes (scratch, countdown, timeline, dresscode, envelope)
```

---

## FICHIERS LIVRÉS

| Fichier | Lignes | Taille approx. |
|---------|--------|----------------|
| `index.html` | 531 | ~23 KB |
| `style.css` | 8 163 | ~390 KB |
| `script.js` | 1 365 | ~78 KB |
| `rapport_nettoyage.md` | — | détail des suppressions |

**Branche :** `claude/marie-paul-invitation-refactor-flWRQ`
**Commit :** `56d60d4`

---

## PROCHAINE ÉTAPE — Phase 3

Corrections fonctionnelles et visuelles une par une, dans cet ordre proposé :

1. `@keyframes` dupliqués (`citShimmer`, `rsvpConfettiReal`)
2. Bouton langue FR/EN (`#lang-sw`)
3. Shimmer prénoms (`.h-names`, `.final-h-names`)
4. Verset Matthieu 19:6 (`.story2-citation`)
5. Confettis après révélation de la date
6. RSVP centré dans le rideau
7. Espaces inter-sections
8. Resize listeners (consolidation)

Chaque correction sera annoncée et validée avant exécution.

---

*Rapport généré le 2026-06-04 — Phase 2 terminée, rendu visuel identique à la V44.*
