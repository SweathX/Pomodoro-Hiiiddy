# CLAUDE.md - Guide pour le développement

Ce fichier fournit le contexte et les bonnes pratiques pour travailler sur le projet Pomodoro Hiiiddy.

## Vue d'ensemble du projet

Timer Pomodoro personnalisé pour un streamer Twitch avec :
- Thème visuel forêt/bambou cozy
- Emotes animées du streamer
- Version overlay pour OBS (fond transparent)
- Suivi des statistiques et objectifs de stream

## Architecture

### Stack technique
- **Next.js 14** avec App Router et export statique
- **React 18** avec hooks
- **TypeScript** strict
- **Tailwind CSS v4** (nouvelle syntaxe `@theme`)
- **Framer Motion** pour les animations
- **Zustand** pour l'état global avec persistance localStorage

### Structure des fichiers clés

```
src/
├── app/
│   ├── layout.tsx        # Layout + Google Font Fredoka
│   ├── page.tsx          # Page principale
│   └── overlay/page.tsx  # Overlay OBS (fond transparent)
├── components/
│   ├── index.ts          # Barrel exports
│   ├── Timer.tsx         # Assemblage principal
│   ├── TimerDisplay.tsx  # Affichage MM:SS
│   ├── Controls.tsx      # Boutons play/pause/reset/skip
│   ├── Stats.tsx         # Sessions et temps de travail
│   ├── ObjectiveDisplay.tsx  # Objectif d'heures du stream
│   ├── Emote.tsx         # Emotes animées selon l'état
│   ├── BambooFrame.tsx   # Cadre décoratif
│   ├── WoodButton.tsx    # Bouton style bois
│   └── BackgroundDecorations.tsx  # Bambous et feuilles SVG
├── stores/
│   └── timerStore.ts     # État Zustand (timer, stats, objectif)
├── hooks/
│   └── useTimer.ts       # Logique du countdown
└── styles/
    └── theme.css         # Variables CSS du thème
```

## Conventions de code

### Composants React

```tsx
// Toujours 'use client' pour les composants avec état/hooks
'use client';

// Imports groupés : React, libs externes, puis internes
import { motion } from 'framer-motion';
import { useTimerStore } from '@/stores/timerStore';

// Interface avant le composant
interface MonComposantProps {
  prop1: string;
  prop2?: number;
}

// Export nommé (pas default)
export function MonComposant({ prop1, prop2 = 0 }: MonComposantProps) {
  // ...
}
```

### Zustand - Utilisation correcte

```tsx
// BON : Sélecteurs individuels pour la réactivité
const sessionsToday = useTimerStore((state) => state.stats.sessionsToday);
const totalWorkTime = useTimerStore((state) => state.stats.totalWorkTimeToday);

// MAUVAIS : Destructurer tout le store (re-render inutiles)
const { stats } = useTimerStore();
```

### Accès à l'état hors composant (dans useEffect/setInterval)

```tsx
// BON : getState() pour lire l'état actuel dans un callback
useEffect(() => {
  const interval = setInterval(() => {
    useTimerStore.getState().tick();
  }, 1000);
  return () => clearInterval(interval);
}, []);

// MAUVAIS : Utiliser une valeur capturée dans la closure
const tick = useTimerStore((state) => state.tick);
useEffect(() => {
  const interval = setInterval(tick, 1000); // tick ne se met pas à jour
}, []);
```

### Tailwind CSS v4

Le projet utilise Tailwind v4 avec la nouvelle syntaxe :

```css
/* theme.css - Définition des variables */
@theme {
  --color-bamboo-light: #6b9b65;
  --color-bamboo-medium: #4a7c45;
  --color-cream-light: #f5e6c8;
}
```

```tsx
// Utilisation dans les composants
<div className="bg-bamboo-medium text-cream-light">
```

### Framer Motion

```tsx
// Animation simple
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Animation répétée
<motion.span
  animate={{ opacity: [1, 0.3, 1] }}
  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
>
```

## Erreurs courantes à éviter

### 1. Types Framer Motion avec les boutons

```tsx
// MAUVAIS : Spread de props HTML sur motion.button
interface ButtonProps extends HTMLMotionProps<'button'> {}
// Cause des conflits de types

// BON : Définir explicitement les props nécessaires
interface WoodButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
```

### 2. Keys React dans les listes

```tsx
// BON : Key unique et stable
{items.map((item, i) => (
  <div key={`item-${i}`}>  // ou key={item.id} si disponible

// MAUVAIS : Index seul pour des listes dynamiques
{items.map((item, i) => (
  <div key={i}>  // Problèmes si l'ordre change
```

### 3. Infinity en TypeScript

```tsx
// BON
repeat: Number.POSITIVE_INFINITY

// MAUVAIS (peut causer des erreurs de lint)
repeat: Infinity
```

### 4. Images Next.js

```tsx
// Toujours utiliser le composant Image de Next.js
import Image from 'next/image';

<Image
  src="/emotes/think.png"
  alt="Description"
  width={100}
  height={100}
  className="..."
/>
```

### 5. Hydration mismatch

Pour les valeurs qui diffèrent entre serveur et client (localStorage) :

```tsx
// Le middleware persist de Zustand gère ça automatiquement
// Mais si besoin manuel :
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null; // ou un skeleton
```

## Fonctionnalités du timer

### États du timer (TimerMode)
- `idle` : En attente, prêt à démarrer
- `work` : Session de travail (25 min par défaut)
- `break` : Pause courte (5 min)
- `longBreak` : Pause longue après 4 sessions (15 min)

### Cycle automatique
1. Travail → Pause (ou Pause longue si 4 sessions)
2. Pause → Travail
3. Reset des sessions après une pause longue

### Mapping des emotes
```tsx
const EMOTE_MAP = {
  idle: 'wave.png',
  work: 'think.png',
  break: 'happy.png',
  longBreak: 'sleep.png',
  milestone: 'stars.png',
};
```

## Commandes utiles

```bash
# Développement
npm run dev

# Build statique (pour OBS/hébergement)
npm run build

# Lint
npm run lint
```

## Points d'attention pour les modifications

1. **Ajouter un composant** : L'exporter dans `components/index.ts`
2. **Modifier le thème** : Éditer `src/styles/theme.css`
3. **Ajouter une stat** : Modifier l'interface `Stats` dans `timerStore.ts`
4. **Nouvelle emote** : Ajouter le PNG dans `public/emotes/` et mettre à jour `Emote.tsx`

## Tests manuels à faire

- [ ] Le timer démarre/pause correctement
- [ ] Les stats s'incrémentent en temps réel
- [ ] L'objectif de stream persiste après refresh
- [ ] L'overlay OBS a bien un fond transparent
- [ ] Les emotes changent selon l'état
- [ ] Les animations sont fluides
