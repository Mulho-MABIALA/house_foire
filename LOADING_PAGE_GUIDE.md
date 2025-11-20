# Guide : Ajouter l'image de fond à la page de chargement

## 📸 Installation de house.jpg

### Étape 1 : Préparer l'image
1. Placez votre image `house.jpg` dans le dossier : `src/assets/`
2. Assurez-vous que l'image est bien en format `.jpg` ou `.png`

### Étape 2 : Importer l'image dans App.jsx

Modifiez `src/App.jsx` comme suit :

```jsx
// Avant (ligne 1)
import { useState, useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { AdminPanel } from "./components/AdminPanel";
import { DrawPage } from "./components/DrawPage";
import { LoadingPage } from "./components/LoadingPage";
import { useSecretSantaState } from "./hooks/useSecretSantaState";
import houseImage from "./assets/house.jpg";  // ← AJOUTER CETTE LIGNE
import "./App.css";
```

### Étape 3 : Passer l'image au composant LoadingPage

```jsx
// Autour de la ligne 30-33
if (isLoading) {
  return (
    <LoadingPage
      onLoadingComplete={() => setIsLoading(false)}
      backgroundImage={houseImage}  // ← CHANGER null par houseImage
    />
  );
}
```

## 🎨 Caractéristiques de la page de chargement

✅ **Animations festives**
- Flocons de neige animés
- Barre de progression avec gradient
- Points animés "Chargement en cours..."
- Bounce animation sur le titre

✅ **Design responsive**
- S'adapte à tous les écrans
- Image de fond en cover
- Overlay semi-transparent pour lisibilité

✅ **Durée**
- 2.5 secondes par défaut
- Peut être pressée en appuyant sur Espace
- Auto-disparition vers la page d'accueil

## 🔧 Personnalisation

### Changer la durée du chargement
Dans `src/App.jsx` ligne 17, modifiez la valeur :
```jsx
}, 2500);  // 2500ms = 2.5 secondes (modifiez ce nombre)
```

### Personnaliser le texte
Dans `src/components/LoadingPage.jsx`, modifiez :
```jsx
<p className="text-2xl text-red-50 mb-8 drop-shadow-md font-semibold">
  Préparation du tirage au sort...  // ← Modifiez ce texte
</p>
```

### Ajouter des animations personnalisées
Modifiez le CSS dans `src/components/LoadingPage.jsx` ou `src/App.css`

## 🖼️ Recommandations pour l'image

- **Taille** : 1920x1080px minimum (pour haute résolution)
- **Format** : JPG ou PNG
- **Taille fichier** : < 500KB (pour chargement rapide)
- **Contenu** : Image festive/maison avec espace au centre
- **Aspect ratio** : 16:9 (TV/écran large)

## ✅ Vérification

Une fois configuré, vous devriez voir :
1. Page de chargement avec house.jpg en arrière-plan
2. Tous les éléments visibles (titre, barre, flocons)
3. Disparition après 2.5 secondes
4. Navigation vers la page d'accueil

## 🐛 Dépannage

### L'image ne s'affiche pas
- Vérifiez le chemin du fichier : `src/assets/house.jpg`
- Vérifiez l'orthographe exacte
- Redémarrez le serveur dev : `npm run dev`

### L'image est floue
- Augmentez la résolution (2560x1440 ou plus)
- Utilisez un format plus approprié

### Le texte n'est pas lisible
- L'overlay noir (40% opacity) aide à la lisibilité
- Vous pouvez ajuster l'opacité dans `LoadingPage.jsx` ligne 28
