# RAPPORT NETTOYAGE — Phase 2
## Séparation index.html → style.css + script.js

---

## COMPARAISON AVANT / APRÈS

| Métrique | AVANT (index.html) | APRÈS (fichiers séparés) |
|----------|--------------------|--------------------------|
| Blocs `<style>` inline | 2 | 0 (→ style.css) |
| Blocs `<script>` inline | 2 | 0 (→ script.js) |
| Lignes CSS | 8 086 (bloc1) + 75 (bloc2) = **8 161** | **8 163** (+2 ligne commentaire séparateur) |
| Lignes JS | 1 220 (bloc1) + 145 (bloc2) = **1 365** | **1 365** (stable) |
| Lignes index.html | 9 982 | **531** |
| `!important` | 4 362 (total fichier) | **4 360** (dans style.css — 2 étaient dans le JS) |
| `DOMContentLoaded` | 14 | **6** (9 suppressions + 1 nouveau global) |
| `resize` listeners | 15 | **15** (inchangé — Phase 3) |
| `ready()` définitions | 9 | **1** (globale unique) |
| `q()` définitions | 1 (locale IIFE) | **1** (globale unique) |
| `qa()` définitions | 1 (locale IIFE) | **1** (globale unique) |

---

## VALIDATION

```
node --check script.js → ✓ JS OK
```

---

## DÉTAIL DES SUPPRESSIONS

### 1. `function ready(fn)` — 9 occurrences supprimées

| # | Ligne originale | Motif | Risque | Impact |
|---|----------------|-------|--------|--------|
| 1 | 8876 | Doublon strict — variante if/else | Nul | Remplacée par la globale en haut de script.js |
| 2 | 8907 | Doublon strict — variante ternaire | Nul | Idem |
| 3 | 9003 | Doublon strict — variante ternaire | Nul | Idem |
| 4 | 9439 | Doublon strict — variante ternaire | Nul | Idem |
| 5 | 9569 | Doublon strict — variante ternaire | Nul | Idem |
| 6 | 9589 | Doublon strict — variante ternaire | Nul | Idem |
| 7 | 9676 | Doublon strict — variante ternaire | Nul | Idem |
| 8 | 9711 | Doublon strict — variante ternaire | Nul | Idem |
| 9 | 9838 | Doublon strict (patch V44) | Nul | Idem |

**Action corrective :** 1 seule définition globale ajoutée en tête de script.js.

---

### 2. `function q(s, r)` — 1 occurrence supprimée

| Ligne originale | Motif | Risque | Impact |
|----------------|-------|--------|--------|
| 9839 (patch V44 IIFE) | Locale à une IIFE, inaccessible globalement | Nul | Déplacée en scope global en tête de script.js — **amélioration : désormais disponible dans toutes les IIFEs** |

---

### 3. `function qa(s, r)` — 1 occurrence supprimée

| Ligne originale | Motif | Risque | Impact |
|----------------|-------|--------|--------|
| 9840 (patch V44 IIFE) | Locale à une IIFE, inaccessible globalement | Nul | Idem — déplacée en scope global |

---

### 4. Bloc `<style id="eventia-v44-corrections-stables">` supprimé de index.html

- Contenu intégralement transféré dans style.css (section `/* ===== PATCH V44 ===== */`)
- Ordre de cascade préservé : bloc1 en premier, patch V44 en dernier → même comportement CSS

---

### 5. Bloc `<script id="eventia-v44-corrections-stables-js">` supprimé de index.html

- Contenu intégralement transféré dans script.js (section `/* ===== PATCH V44 ===== */`)
- Ordre d'exécution préservé : bloc1 en premier, patch V44 en dernier

---

## CE QUI N'A PAS ÉTÉ MODIFIÉ (Phase 3)

| Élément | Statut |
|---------|--------|
| Doublons CSS sélecteurs (60) | Conservés — Phase 3 |
| @keyframes dupliqués (`rsvpConfettiReal` ×4, `citShimmer` ×2) | Conservés — Phase 3 |
| 15 `resize` listeners | Conservés — Phase 3 |
| Corrections visuelles (shimmer, verset, RSVP, etc.) | Aucune — Phase 3 |
| `!important` inutiles | Conservés — Phase 3 |

---

## FICHIERS PRODUITS

| Fichier | Lignes | Taille |
|---------|--------|--------|
| `style.css` | 8 163 | ~390 KB |
| `script.js` | 1 365 | ~78 KB |
| `index.html` | 531 | ~23 KB |

*Phase 2 terminée — rendu visuel identique à la V44. Aucune correction fonctionnelle appliquée.*
