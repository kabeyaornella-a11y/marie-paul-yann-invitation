# Rapport V44, corrections ciblées sur la base V42

Base utilisée : MariePaul Yann V42.zip.

## Nettoyage et stabilisation

- Suppression du bloc patch `eventia-v40-final-clean-targeted` et de son JS associé, qui forçait le bouton langue à rester visible et provoquait des conflits.
- Retrait du texte parasite `PATCH EVENTIA...` s'il apparaissait dans le HTML.
- Ajout d'un seul bloc final V44 CSS et d'un seul bloc final V44 JS, placés en fin de document pour neutraliser les règles contradictoires sans régénérer le fichier complet.
- Ajout d'un système de variables de conteneur `--container-w` et `--container-h`, calculées en JavaScript à partir de la taille réelle des sections.

## Corrections fonctionnelles

- Bouton langue visible à sa position initiale, puis masqué dès que l'utilisateur commence à scroller. Le bouton son reste visible.
- Traduction automatique renforcée via `setLang`, avec réapplication des textes dynamiques après changement de langue.
- Bouton calendrier parent ajouté et fichier ICS corrigé dans `scratch/index.html`.
- Note calendrier corrigée : `Le mariage de Marie-Paul & Yann — 22 Mai 2027` puis `Château des Hauts de Provins + Mairie de Gennevilliers`.
- Confettis finaux restaurés et accélérés dans le parent et dans `scratch/index.html`.
- Confettis RSVP au clic sur `Oui avec joie`.
- Verset biblique de `Parole sacrée` forcé en visibilité avec animation de balayage.

## Corrections visuelles

- Phrase héro forcée sur une seule ligne, centrée et calibrée à environ 60 à 66 % de largeur selon le mobile.
- Shimmer restauré sur les prénoms du héros et du final, sans changement de police, de taille ou de position.
- Particules héro transformées en petites étoiles qui montent du bas vers le haut, plus petites et plus lentes.
- Section `Le lendemain` supprimée de la timeline.
- Hauteur de timeline recalibrée après suppression du lendemain.
- Dress code ajusté pour agrandir silhouettes et podium sans couper les silhouettes.
- Espaces vides réduits entre les sections principales, notamment Dress code vers Hébergements, Autour vers Empreintes, Programme vers Dress code.
- RSVP compacté dans l'ouverture centrale des rideaux.
- Bloc `Une petite attention` harmonisé avec une mise en forme plus posée.
- Ponctuation visible normalisée à l'exécution : les tirets longs utilisés comme ponctuation sont remplacés par des virgules dans les textes affichés, sans toucher aux listes.

## Optimisation device et chargement

- Images mises en `decoding=async` et `loading=lazy` si absent.
- Iframes non critiques chargées en lazy.
- Ajustement des hauteurs d'iframes pour mobile, tablette et desktop.
- Ajout de calculs par conteneur pour éviter les positions figées.

## Métriques

- Taille `index.html` avant : 499568 caractères.
- Taille `index.html` après : 504313 caractères.
