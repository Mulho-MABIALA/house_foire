# 🎄 Secret Santa - Tirage au Sort Secret pour Noël

Une application web complète et festive pour organiser un tirage au sort secret où chaque participant tire le nom d'une autre personne à qui il devra offrir un cadeau pour Noël.

## ✨ Caractéristiques

### 🎯 Fonctionnalités principales
- **Gestion des participants** : Ajouter, modifier et supprimer facilement les participants
- **Tirage automatisé** : Génération d'un tirage aléatoire garantissant :
  - Pas d'auto-attribution (A ≠ A)
  - Pas de doublons
  - Distribution équitable
- **Confidentialité totale** : Chaque participant ne voit que la personne à qui offrir un cadeau
- **Persistance des données** : Sauvegarde automatique dans le navigateur (localStorage)
- **Interface festive** : Design coloré aux couleurs de Noël avec thèmes gradient

### 🔧 Architecture technique

#### Structure du projet
```
src/
├── components/              # Composants React
│   ├── HomePage.jsx        # Page d'accueil avec ajout de participants
│   ├── AdminPanel.jsx      # Panneau de gestion des participants
│   └── DrawPage.jsx        # Page du tirage et résultats
├── services/               # Logique métier
│   └── drawService.js      # Algorithme de tirage au sort
├── hooks/                  # Hooks personnalisés
│   └── useSecretSantaState.js  # Gestion d'état globale
├── App.jsx                 # Composant principal
├── App.css                 # Styles et animations
└── index.css               # Configuration Tailwind
```

## 🚀 Démarrage rapide

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Installation
```bash
# Cloner ou télécharger le projet
cd foire_house

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible à `http://localhost:5173/`

### Build pour la production
```bash
npm run build
npm run preview
```

## 📱 Guide d'utilisation

### 1️⃣ **Page d'accueil**
- Entrez le nom de chaque participant dans le champ de texte
- Cliquez sur "Ajouter" ou appuyez sur Entrée
- La liste des participants s'affiche au fur et à mesure
- Minimum 2 participants requis pour effectuer le tirage

### 2️⃣ **Gestion des participants**
- Accédez au bouton "🔧 Gérer les participants"
- Supprimez un participant en cliquant sur "✕ Supprimer"
- Vous pouvez modifier la liste jusqu'au tirage
- Une confirmation est demandée avant suppression

### 3️⃣ **Tirage au sort**
- Cliquez sur "🎲 Lancer le tirage"
- Une page de confirmation s'affiche avec les paramètres du tirage
- Acceptez avec "🎲 LANCER LE TIRAGE !"
- Le tirage est verrouillé (ne peut pas être modifié)

### 4️⃣ **Consultation des résultats**
- Cliquez sur un participant pour révéler sa cible
- Le nom s'affiche en grands caractères festifs
- Seul le participant peut voir son résultat en cliquant
- Tous les autres ne connaissent que leur propre cible

## 🔐 Sécurité et confidentialité

### Garanties du tirage
- **Pas d'auto-attribution** : L'algorithme utilise le Fisher-Yates shuffle avec validation
- **Vérification d'intégrité** : Chaque tirage est validé avant utilisation
- **Confidentialité localStorage** : Les données sont stockées localement, jamais envoyées ailleurs
- **Pas de serveur** : Application 100% front-end

### Validation du tirage
Le service `drawService.js` inclut :
```javascript
- generateDraw()      : Crée un tirage valide
- validateDraw()      : Vérifie l'intégrité
- getDrawForParticipant() : Récupère le résultat d'une personne
```

## 🎨 Design et UX

### Pages disponibles
| Page | Couleurs | Fonction |
|------|----------|----------|
| **Accueil** | Rouge → Vert | Ajout participants |
| **Admin** | Bleu → Violet | Gestion participants |
| **Tirage** | Vert → Rouge | Lancement et résultats |

### Éléments interactifs
- ✅ Validation des entrées (pas de noms vides, pas de doublons)
- 🎁 Emojis festifs pour meilleure UX
- 📱 Responsive design (mobile, tablette, desktop)
- ✨ Animations douces et transitions
- 🌈 Gradients colorés thématiques

## 💾 Persistance des données

L'application utilise `localStorage` pour :
- Sauvegarder les participants
- Mémoriser les résultats du tirage
- Conserver l'état de l'application

**Clé de stockage** : `secret_santa_data`

## 📊 Exemple de structure de données

```javascript
// Résultat du tirage
{
  participants: ["Alice", "Bob", "Charlie"],
  draws: [
    { from: "Alice", to: "Charlie" },
    { from: "Bob", to: "Alice" },
    { from: "Charlie", to: "Bob" }
  ],
  hasDrawn: true
}
```

## 🧪 Tests manuels

### Scénario 1 : Tirage simple
1. Ajouter 3 participants
2. Lancer le tirage
3. Vérifier que chacun a une cible différente de lui-même

### Scénario 2 : Persistance
1. Ajouter des participants et faire un tirage
2. Rafraîchir la page (F5)
3. Vérifier que les données sont conservées

### Scénario 3 : Modification
1. Ajouter des participants
2. Supprimer l'un d'eux
3. Vérifier que le tirage précédent est réinitialisé

## 🛠️ Technologies utilisées

- **React 19** : Framework JavaScript
- **Vite** : Bundler et serveur de développement ultrarapide
- **Tailwind CSS** : Framework CSS utility-first
- **JavaScript pur** : Pas de dépendances externes pour la logique métier

## 📝 Notes de développement

### Hooks personnalisés
- `useSecretSantaState()` : Centralise la gestion d'état avec localStorage

### Services
- `drawService.js` : Contient la logique de tirage indépendante du framework

### Composants sans state
- Tous les composants sont contrôlés via props et callbacks
- Architecture prévisible et facile à maintenir

## 🐛 Dépannage

### Le tirage n'apparaît pas ?
- Vérifier qu'au moins 2 participants sont enregistrés
- Vérifier la console du navigateur pour les erreurs

### Les données ne se sauvegardent pas ?
- Vérifier que localStorage est activé
- Vérifier l'espace disponible dans le navigateur

### Design cassé sur mobile ?
- Le design est responsive, vérifier le viewport meta tag en HTML

## 🎁 Améliorations futures possibles

- [ ] Envoi des résultats par email
- [ ] Mode multi-langues
- [ ] Import/export CSV des participants
- [ ] Animation d'ouverture de cadeaux
- [ ] Thèmes d'apparence customisables
- [ ] Support du dark mode
- [ ] Page de statistiques du tirage

## 📄 Licence

Libre d'utilisation à titre personnel ou commercial.

---

**Joyeuses Fêtes ! 🎄🎁**
