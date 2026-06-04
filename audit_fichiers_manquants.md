# AUDIT — Fichiers manquants et régressions
## Date : 2026-06-04

---

## RÉSUMÉ

Audit déclenché après détection de 5 régressions sur le branch preview Netlify.

**Conclusion principale :** 3 des 5 régressions sont pré-existantes — les fichiers concernés n'ont **jamais** été committés dans le repository git. Le refactoring Phase 2 n'en est pas la cause.

---

## FICHIERS MANQUANTS DU REPOSITORY

### Absents de git (jamais committés)

| Fichier | Référencé dans | Ligne | Impact |
|---------|---------------|-------|--------|
| `scratch/index.html` | `index.html` | 90 | Iframe scratch = "Page not found" |
| `countdown/index.html` | `index.html` | 102 | Iframe countdown = "Page not found" |
| `assets/activities/chateau-fontainebleau.jpg` | `index.html` | — | Image section Activités cassée |
| `assets/activities/foret-fontainebleau.jpg` | `index.html` | — | Image section Activités cassée |
| `assets/activities/parrot-world.jpg` | `index.html` | — | Image section Activités cassée |

### Présent dans git mais vide (0 octets)

| Fichier | Taille | Impact |
|---------|--------|--------|
| `assets/icon_camera.png` | 0 octets | Icône caméra absente |

---

## FICHIERS PRÉSENTS ET CORRECTS

| Fichier | Statut |
|---------|--------|
| `timeline-B-v15c.html` | ✓ Présent (189 KB) |
| `dresscode-v5.html` | ✓ Présent (3.9 MB) |
| `envelope-v13.html` | ✓ Présent (3 MB) |
| `couple-hero.png` | ✓ Présent (2.9 MB) |
| `couple-cadre-baroque.png` | ✓ Présent (5.7 MB) |
| `door-entrance.jpeg` | ✓ Présent (478 KB) |
| `fond-rideaux-rsvp-transparent.png` | ✓ Présent (897 KB) |
| `cadre-frame.png` | ✓ Présent (1 MB) |
| `lustre-principal.png.png` | ✓ Présent (1.5 MB) |
| `mairie-civile-1/2/3.jpg` | ✓ Présents |
| `salle.jpg.jpg`, `salle2-4.jpg/png` | ✓ Présents |
| `couple-story-1/2/4/5.jpg` | ✓ Présents |
| `icone-avion-voyage.svg` | ✓ Présent |
| `icone-cadeaux.svg` | ✓ Présent |
| `icone-iban.svg` | ✓ Présent |
| `musique.m4a` | ✓ Présent (2.7 MB) |

---

## ORIGINE DES RÉGRESSIONS SIGNALÉES

| # | Régression signalée | Cause réelle | Introduite par le refactoring ? |
|---|--------------------|--------------|---------------------------------|
| 1 | Scratch = Page not found | `scratch/index.html` jamais dans git | ❌ Non — pré-existant |
| 2 | Bloc histoire = Page not found | `countdown/index.html` jamais dans git | ❌ Non — pré-existant |
| 3 | Activités = images cassées | `assets/activities/` jamais dans git | ❌ Non — pré-existant |
| 4 | Bouton langue absent | À investiguer (Bloc 1 Phase 3) | ⚠️ Incertain |
| 5 | Shimmer prénoms absent | Connu depuis V44, listé Phase 3 Bloc 2 | ❌ Non — pré-existant |

---

## POURQUOI LA PRODUCTION FONCTIONNE

Le site de production `resilient-cocada-318dc3.netlify.app` possède ces fichiers car ils ont été déployés via un **upload direct Netlify** (drag & drop ou deploy CLI) et non via git. Le **branch preview** ne déploie que les fichiers committés dans git — il ne retrouve pas les fichiers non versionnés.

---

## ACTIONS REQUISES POUR DÉBLOQUER LA PREVIEW

### Priorité 1 — Fichiers critiques (iframes cassées)

Ces deux fichiers (avec leurs dossiers complets) doivent être ajoutés au repo :
```
scratch/
  index.html
  (+ tous les assets du dossier scratch)

countdown/
  index.html
  (+ tous les assets du dossier countdown)
```

### Priorité 2 — Images activités

```
assets/activities/
  chateau-fontainebleau.jpg
  foret-fontainebleau.jpg
  parrot-world.jpg
```

### Priorité 3 — Icône caméra

Remplacer `assets/icon_camera.png` (actuellement vide — 0 octets) par le vrai fichier.

---

## OPTIONS POUR RÉCUPÉRER LES FICHIERS

1. **Upload via GitHub** — Déposer les fichiers directement dans le repository via l'interface GitHub
2. **Fournir les fichiers ici** — Les uploader dans cette session pour que je les commite
3. **Récupérer depuis la production Netlify** — Via l'API Netlify (dès que le MCP sera disponible), télécharger les fichiers du deploy de production

---

## ÉTAT DU REFACTORING

Les fichiers produits par le refactoring sont corrects :

| Fichier | Lignes | État |
|---------|--------|------|
| `index.html` | 531 | ✓ Structure HTML intacte |
| `style.css` | 8 181 | ✓ CSS complet |
| `script.js` | 1 342 | ✓ `node --check` OK |

**Aucun fichier asset n'a été supprimé par le refactoring.**
Les fichiers manquants n'ont jamais été dans le repository.

---

*Audit réalisé le 2026-06-04 — aucune modification effectuée*
