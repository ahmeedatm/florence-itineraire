# Florence · Carnet de voyage 2026

PWA (Progressive Web App) interactive pour le voyage à Florence du 7 au 12 juin 2026.

## Fonctionnalités

- **Offline-first** : tout le contenu (HTML, fonts, icônes) est mis en cache par un service worker au premier chargement → fonctionne sans réseau pendant le voyage.
- **Checklist persistante** : les cases cochées (réservations, valise, à faire avant départ) sont sauvegardées dans `localStorage` du navigateur.
- **Jour courant** : au chargement, scroll automatique au jour de la date du jour, mis en évidence dans le sommaire.
- **Tap-to-Plans iOS** : tous les liens vers des lieux ouvrent directement l'app Plans (Apple Maps) au lieu du navigateur.

## Installer sur iPhone

1. Ouvrir l'URL dans Safari
2. Bouton **Partager** → *Sur l'écran d'accueil*
3. L'icône Firenze apparaît sur le home screen — l'app s'ouvre en plein écran sans barre Safari, fonctionne hors-ligne après le premier lancement

## Structure

```
.
├── index.html       — le carnet (HTML + CSS + JS inline)
├── manifest.json    — métadonnées PWA
├── sw.js            — service worker (cache offline)
├── fonts/           — Cormorant Garamond + Inter (latin + latin-ext)
└── icons/           — icônes PWA (180/192/512 PNG + SVG source)
```

## Mise à jour du contenu

Éditer `index.html`, commit, push. Au rechargement de la PWA, le service worker détecte le nouveau contenu (changer aussi `const CACHE = 'florence-v2'` dans `sw.js` pour forcer le refresh du cache).
