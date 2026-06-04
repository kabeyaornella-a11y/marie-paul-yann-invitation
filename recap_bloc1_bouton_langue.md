# RÉCAPITULATIF — Phase 3 Bloc 1
## Bouton langue `#lang-sw`

---

## COMMIT & PREVIEW

| Info | Valeur |
|------|--------|
| Commit hash | `8f7c6c5` |
| Branche | `claude/marie-paul-invitation-refactor-flWRQ` |
| Preview URL | `https://claude-marie-paul-invitation-refactor-flwrq--resilient-cocada-318dc3.netlify.app` |
| Fichiers modifiés | `style.css` (+18 lignes) · `script.js` (-45 lignes, +17 lignes) |

---

## OBJECTIF TRAITÉ

- Bouton FR/EN visible sur le hero
- Disparaît dès que l'utilisateur commence à scroller
- Ne réapparaît pas dans les autres sections
- Bouton musique non touché

---

## DIAGNOSTIC INITIAL

**3 causes identifiées :**

1. **4 fonctions scroll concurrentes** avec des seuils de déclenchement différents (6 px, 8 px, basé sur hero viewport…)
2. **3 classes CSS concurrentes** (`eventia-lang-hidden`, `eventia-hide-lang`, `eventia-scrolled`) ciblées de façon incohérente par les règles CSS
3. **Position instable** : conflit `position:absolute !important` (ligne 7490) vs `position:relative !important` (plusieurs autres lignes)

---

## CE QUI A ÉTÉ SUPPRIMÉ

### Fonctions JS supprimées (5 fonctions, 4 IIFEs)

| Fonction | Localisation | Seuil | Classes gérées |
|----------|-------------|-------|----------------|
| `updateLangVisibility()` | IIFE i18n | Basé sur `hero.getBoundingClientRect()` | `eventia-lang-hidden` |
| `setLangVisibility()` | IIFE 2 | > 8 px | `eventia-hide-lang` |
| `langVisibility()` | IIFE 3 | > 6 px | toutes les 3 |
| `controlLang()` v1 | IIFE lang control | > 8 px | `eventia-scrolled` |
| `controlLang()` v2 | Patch V44 IIFE | > 6 px | toutes les 3 + reset inline styles |

### Listeners scroll supprimés : 5
### Listeners resize nettoyés : 4 (appels `controlLang`/`langVisibility`/`setLangVisibility` retirés des lambdas)

---

## CE QUI A ÉTÉ AJOUTÉ

### script.js — Nouvelle IIFE `syncLang()`

```js
/* === PHASE 3 BLOC 1 — Bouton langue : contrôle unique === */
(function() {
  function syncLang() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    var hidden = y > 0;
    document.body.classList.toggle('lang-hidden',         hidden);
    document.body.classList.toggle('eventia-lang-hidden', hidden);
    document.body.classList.toggle('eventia-hide-lang',   hidden);
    document.body.classList.toggle('eventia-scrolled',    hidden);
  }
  window.addEventListener('scroll', syncLang, {passive: true});
  ready(function() { syncLang(); });
})();
```

**Seuil : `y > 0`** — disparaît dès le 1er pixel de scroll.
**1 seul listener scroll** pour le bouton langue.
**4 classes synchronisées** en un seul appel.

### style.css — Bloc d'autorité finale

```css
/* === PHASE 3 BLOC 1 — Bouton langue : autorité finale === */
#lang-sw {
  position: relative !important;
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  transition: opacity 0.22s ease, visibility 0.22s ease !important;
}
body.lang-hidden #lang-sw,
body.eventia-lang-hidden #lang-sw,
body.eventia-hide-lang #lang-sw,
body.eventia-scrolled #lang-sw {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  display: flex !important;
}
```

---

## MÉTRIQUES AVANT / APRÈS

| Métrique | Avant Bloc 1 | Après Bloc 1 |
|----------|-------------|-------------|
| Fonctions contrôlant #lang-sw | 5 | **1** (`syncLang`) |
| Listeners scroll pour #lang-sw | 5 | **1** |
| Seuil de disparition | 6 px (le plus court gagne) | **0 px** (dès le 1er scroll) |
| Classes CSS synchronisées | 3 classes concurrentes | **4 classes unifiées** |
| Lignes script.js | 1 365 | **1 342** (-23) |
| Lignes style.css | 8 163 | **8 181** (+18) |
| `resize` listeners | 15 | **14** |
| `node --check script.js` | ✓ OK | ✓ OK |

---

## CE QUI N'A PAS ÉTÉ TOUCHÉ

- Structure HTML (`#topnav`, `#lang-sw`, boutons FR/EN)
- Design du bouton (couleurs, tailles, border-radius, font)
- `#topnav` reste `position:fixed`
- Bouton musique `#mus-btn` — inchangé
- `setLang()` globale — inchangée

---

## PROCHAINE CORRECTION — Bloc 2

**Shimmer prénoms** (`.h-names`, `.final-h-names`)
- Animation CSS uniquement
- Conserver ChopinScript
- Conserver taille et position

*En attente de validation Bloc 1 avant de procéder.*
