# DIAGNOSTIC — Bouton langue `#lang-sw`
## Phase 3 — Correction n°1 (en attente de validation)

---

## RÉSUMÉ DU PROBLÈME

Le bouton FR/EN disparaît dès **6 px de scroll** au lieu de 30 px.
Il peut aussi apparaître dans une position incorrecte selon le patch CSS qui "gagne".

**3 causes distinctes et liées :**

---

## CAUSE 1 — CSS : 26 définitions contradictoires

`#lang-sw` est défini **26 fois** dans `style.css` avec des comportements incompatibles.

### Conflits de position

| Ligne style.css | Règle | Problème |
|----------------|-------|---------|
| 1139 | `#lang-sw { position:relative !important }` | Force relative |
| 5402 | `#lang-sw { position:relative !important }` | Re-force relative |
| 7490 | `#lang-sw { position:absolute !important; top:0; right:52px }` | ⚠️ Contradiction — force absolute |
| 7554 | `#lang-sw { position:relative !important }` | Annule le absolute |
| 8104 | `#topnav #lang-sw { position:relative !important }` | Version finale patch V44 |

### 3 classes CSS différentes contrôlent la visibilité (incohérence)

| Classe | Ciblée par | Problème |
|--------|-----------|---------|
| `body.eventia-lang-hidden` | Certaines règles seulement | Masquage partiel |
| `body.eventia-hide-lang` | D'autres règles | Masquage partiel |
| `body.eventia-scrolled` | Encore d'autres | Masquage partiel |

### Conflit direct le plus grave

```
Ligne 7694 :
body.eventia-lang-hidden #lang-sw { display:none !important }
← cache avec display:none (spécificité: 0,2,0)

Ligne 8104 :
#topnav #lang-sw { display:flex !important }
← plus spécifique (0,2,0 + ID = gagne), re-affiche !
```

### Top 10 des règles conflictuelles sur #lang-sw

| Lignes | Règle résumée |
|--------|--------------|
| 11–13 | Définition de base (pas de position) |
| 447–468 | `.hidden` → opacity:0 |
| 1139 | `position:relative !important` |
| 1300–1344 | Grande redéfinition avec `!important` partout |
| 1375–1376 | @media mobile : tailles différentes |
| 5402 | `position:relative !important` (répétition) |
| 5496 | `right:14px !important; z-index:2147483002 !important` |
| 5820–5831 | Nouvelle redéfinition complète |
| 7490–7491 | `position:absolute !important` ← le plus dangereux |
| 8104–8105 | Patch V44 final — gagne sur tout le reste |

---

## CAUSE 2 — JS : 4 fonctions scroll en parallèle avec des seuils différents

| Ligne script.js | Fonction | Seuil scroll | Classes ajoutées |
|----------------|---------|-------------|-----------------|
| 991–1004 | `updateLangVisibility()` | basé sur position de `#enter` | `eventia-lang-hidden` |
| 1119–1126 | `controlLang()` | > **8 px** | `eventia-scrolled` |
| 1147 + 1174–1175 | `setLangVisibility()` | > **8 px** | `eventia-hide-lang` |
| 1181–1219 | `langVisibility()` | > **6 px** | **toutes les 3** |
| 1237–1363 | `controlLang()` (patch V44) | > **6 px** | toutes les 3 + reset inline styles |

**Résultat concret :** le bouton disparaît dès **6 px de scroll** car `langVisibility()` et le `controlLang()` du patch tournent en parallèle et ajoutent toutes les classes simultanément.

Le comportement **attendu** est : disparition à **30 px** de scroll.

---

## CAUSE 3 — Position visuelle incohérente

Selon la version de CSS qui "gagne" en dernière position selon le scroll, le bouton peut se retrouver à des positions différentes :

| Source | Position déclarée | right | top |
|--------|------------------|-------|-----|
| Ligne 5496 | — | 14px | — |
| Ligne 7490 | absolute | 52px | 0 |
| Ligne 8104 (V44, gagne) | relative dans #topnav | — | — |
| @media <430px ligne 1375 | — | 43px | 7px |

---

## LIGNES CONCERNÉES

### style.css
```
11, 12, 13
447–468
1139
1300–1344
1375–1376
2317
3788
5402
5484–5498
5527–5528
5820–5846
5999–6024
6319–6344
6618–6646
6998–7016
7150
7165–7186
7293–7298
7490–7491
7554–7558
7620–7694
8104–8105
```

### script.js
```
991–1004   → updateLangVisibility()
1119–1126  → controlLang() v1
1147       → setLangVisibility()
1171–1175  → appels + listeners
1181–1219  → langVisibility() + listeners
1237–1363  → controlLang() v2 patch V44
```

---

## CORRECTION PROPOSÉE (en attente de validation)

### Principe
Ne rien réinventer — normaliser ce qui existe. Ajouter un bloc d'autorité en fin de `style.css` et remplacer les 4 fonctions scroll par une seule dans `script.js`.

### CSS à ajouter à la fin de style.css

```css
/* === PHASE 3 — Bouton langue : autorité unique === */
#lang-sw {
  position: relative !important;      /* dans #topnav qui est fixed */
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: auto;
}
body.lang-hidden #lang-sw {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
/* Compatibilité avec les classes eventia-* existantes */
body.eventia-lang-hidden #lang-sw,
body.eventia-hide-lang #lang-sw,
body.eventia-scrolled #lang-sw {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
```

### JS : remplacer les 4 fonctions par 1 seule

**Supprimer :**
- `updateLangVisibility()` + listeners (lignes 991–1004)
- `setLangVisibility()` + listeners (lignes 1147, 1174–1175)
- `langVisibility()` + listeners (lignes 1181–1219)
- `controlLang()` du patch V44 (lignes 1237–1363) — garder seulement `updateContainerVars()`

**Ajouter à la place :**
```js
(function() {
  function syncLang() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    var hidden = y > 30;
    document.body.classList.toggle('lang-hidden', hidden);
    // Compatibilité avec les classes eventia-* existantes
    document.body.classList.toggle('eventia-lang-hidden', hidden);
    document.body.classList.toggle('eventia-hide-lang', hidden);
    document.body.classList.toggle('eventia-scrolled', hidden);
  }
  window.addEventListener('scroll', syncLang, {passive: true});
  ready(function() { syncLang(); });
})();
```

### Bilan de la correction

| Avant | Après |
|-------|-------|
| 4 fonctions scroll pour le bouton langue | 1 seule (`syncLang`) |
| Seuil : 6 px (le plus court gagne) | Seuil : **30 px** |
| 3 classes CSS différentes | 4 classes synchronisées (lang-hidden + eventia-*) |
| `position:absolute` possible (ligne 7490) | `position:relative` stable dans #topnav |
| Disparition immédiate au scroll | Disparition après 30 px |

### Ce qui ne sera PAS modifié
- Structure HTML (`#topnav`, `#lang-sw`, boutons FR/EN)
- Design visuel du bouton (couleurs, tailles, border-radius)
- `#topnav` reste `position:fixed`
- `setLang()` globale inchangée

---

## STATUT

**En attente de validation pour procéder à la modification.**

*Diagnostic établi le 2026-06-04 — Phase 3, correction n°1*
