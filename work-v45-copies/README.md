# Copies de travail V45

Ce dossier sert de zone de travail sécurisée.

Objectif : analyser, extraire et corriger l’invitation sans modifier directement les fichiers actifs de la branche `main`.

Fichiers à copier / reconstruire :

- `index.copy.html` : copie de l’index principal
- `timeline-B-v15c.copy.html` : copie de la timeline existante
- `audit-enfants.md` : état des fichiers enfants référencés

Constat initial :

- `index.html` existe et contient environ 9 985 lignes.
- `timeline-B-v15c.html` existe.
- `scratch/index.html` est référencé mais introuvable via GitHub contents API.
- `countdown/index.html` est référencé mais introuvable via GitHub contents API.
- `dresscode-v5.html` existe mais son contenu est vide.
- `envelope-v13.html` existe mais son contenu est vide.

Aucune modification ne doit être faite directement sur `index.html` tant que la copie de travail n’est pas stabilisée.