# Pomodoro Hiiiddy

Un timer Pomodoro personnalisé avec un thème forêt/bambou cozy, conçu pour les streams de révision sur Twitch.

## Aperçu

Ce projet est un timer Pomodoro moderne et esthétique, créé spécialement pour accompagner les sessions de streaming éducatives. Il s'intègre parfaitement avec OBS grâce à une version overlay dédiée.

### Fonctionnalités

- **Timer Pomodoro classique** : Cycles de travail (25 min), pause (5 min) et pause longue (15 min après 4 sessions)
- **Statistiques en temps réel** : Suivi des sessions complétées et du temps de travail
- **Objectif de stream** : Définissez un objectif d'heures et suivez votre progression avec une barre visuelle
- **Emotes animées** : Les emotes changent selon l'état du timer (travail, pause, repos...)
- **Overlay OBS** : Version avec fond transparent pour intégration stream
- **Persistance** : Les stats et objectifs sont sauvegardés dans le localStorage

## Stack technique

- **Next.js 14** - Framework React avec App Router
- **React 18** - Librairie UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations fluides
- **Zustand** - Gestion d'état globale
- **Lucide React** - Icônes

## Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/pomodoro-hiiiddy.git

# Aller dans le dossier
cd pomodoro-hiiiddy

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Le projet sera accessible sur `http://localhost:3000`

## Utilisation

### Version complète

Accédez à `http://localhost:3000` pour la version complète avec :
- Timer avec contrôles (play/pause, reset, skip)
- Panneau de statistiques
- Objectif de stream éditable
- Décorations animées (bambous, feuilles flottantes)

### Overlay OBS

Pour intégrer le timer dans OBS :

1. Lancez le projet (`npm run dev` ou servez le build statique)
2. Dans OBS, ajoutez une source **Navigateur**
3. URL : `http://localhost:3000/overlay`
4. Dimensions recommandées : 400x300 px
5. Cochez **"Actualiser le navigateur lorsque la scène devient active"**

L'overlay a un fond transparent et affiche uniquement le timer, l'emote et l'indicateur de session.

### Build statique

Pour générer une version statique (idéal pour hébergement) :

```bash
npm run build
```

Les fichiers seront générés dans le dossier `out/`.

## Personnalisation des emotes

Les emotes sont situées dans `/public/emotes/`. Pour les personnaliser :

1. Remplacez les fichiers PNG par vos propres emotes
2. Gardez les mêmes noms de fichiers :
   - `wave.png` - État idle (accueil)
   - `think.png` - Mode travail
   - `happy.png` - Mode pause
   - `sleep.png` - Mode pause longue
   - `stars.png` - Milestone (nouveau record)
   - `heart.png` - Favicon

Les images doivent être détourées avec fond transparent pour un meilleur rendu.

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx          # Layout principal + fonts
│   ├── page.tsx            # Page complète
│   └── overlay/
│       └── page.tsx        # Version overlay OBS
├── components/
│   ├── Timer.tsx           # Composant timer principal
│   ├── TimerDisplay.tsx    # Affichage MM:SS animé
│   ├── Controls.tsx        # Boutons de contrôle
│   ├── Stats.tsx           # Panneau statistiques
│   ├── Emote.tsx           # Emote animée
│   ├── BambooFrame.tsx     # Cadre décoratif bambou
│   ├── WoodButton.tsx      # Bouton style bois
│   ├── ObjectiveDisplay.tsx # Objectif de stream
│   └── BackgroundDecorations.tsx # Bambous et feuilles
├── stores/
│   └── timerStore.ts       # État global Zustand
├── hooks/
│   └── useTimer.ts         # Hook logique timer
└── styles/
    └── theme.css           # Variables CSS thème
```

## Thème visuel

Le design s'inspire d'une ambiance forêt/bambou cozy :

- **Couleurs principales** : Verts forêt, marrons bois, crème
- **Éléments décoratifs** : Cadres bambou, feuilles animées
- **Typographie** : Fredoka (Google Fonts)
- **Animations** : Transitions fluides avec Framer Motion

## Licence

MIT
