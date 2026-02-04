# NETBFRS Académie - Site Web

Site web professionnel pour l'académie NETBFRS, spécialisée dans la formation en informatique, réseaux et cybersécurité.

## 📋 Description

NETBFRS propose un parcours complet de formation du BTS SIO option SISR au Master Cybersécurité, en passant par le Bachelor Réseaux. Ce site présente l'académie, ses formations et permet aux visiteurs de prendre contact.

## 🎯 Formations Proposées

- **BTS SIO Option SISR** (2 ans)
  - Administration systèmes Windows/Linux
  - Gestion de réseaux informatiques
  - Cybersécurité de base
  - Support et assistance aux utilisateurs

- **Bachelor Réseaux** (Bac+3)
  - Architecture réseaux avancée
  - Sécurité des infrastructures
  - Virtualisation et Cloud
  - Gestion de projets techniques

- **Master Cybersécurité** (Bac+5)
  - Tests d'intrusion (Pentesting)
  - Analyse de malwares
  - Réponse aux incidents
  - Conformité et gouvernance

## 🚀 Fonctionnalités du Site

- ✨ Design moderne et responsive
- 🎨 Animations fluides et effets visuels
- 📱 Navigation mobile optimisée
- 📝 Formulaire de contact interactif
- 📊 Statistiques animées
- 🎯 **Système de quiz interactif (CCNA, CCNP, Cybersécurité, Linux)**
- 🔝 Bouton scroll to top
- 💌 Inscription newsletter
- ⚡ Performance optimisée

## 📁 Structure du Projet

```
NETBFRS/
│
├── index.html          # Page principale
├── styles.css          # Styles et animations
├── script.js           # Fonctionnalités JavaScript
├── quiz-data.js        # Base de données des questions
├── quiz.js             # Système de quiz interactif
└── README.md          # Documentation
```

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec Flexbox/Grid
- **JavaScript** - Interactivité et animations
- **Font Awesome** - Icônes

## 💻 Installation et Utilisation

1. **Cloner ou télécharger le projet**
   ```bash
   git clone [url-du-repo]
   cd NETBFRS
   ```

2. **Ouvrir le site**
   - Double-cliquer sur `index.html`
   - Ou utiliser un serveur local (recommandé) :
   
   ```bash
   # Avec Python 3
   python -m http.server 8000
   
   # Avec Node.js
   npx serve
   ```

3. **Accéder au site**
   - Ouvrir dans le navigateur : `http://localhost:8000`

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `styles.css` avec des variables CSS :

```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #00a8e8;
    --accent-color: #00c896;
    --dark-blue: #003d7a;
}
```

### Contenu
- **Textes** : Modifier directement dans `index.html`
- **Images** : Remplacer les placeholders par vos propres images
- **Coordonnées** : Mettre à jour les informations de contact dans la section `#contact`

### Statistiques
Modifier les valeurs dans la section "À Propos" :
```html
<div class="stat-item">
    <h4>500+</h4>
    <p>Étudiants Formés</p>
</div>
```

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints à :
- 768px (tablettes)
- 480px (mobiles)

## ⚙️ Fonctionnalités JavaScript

- **Navigation mobile** : Menu hamburger avec animation
- **Scroll smooth** : Navigation fluide entre sections
- **Animations au scroll** : Éléments qui apparaissent progressivement
- **Compteurs animés** : Statistiques qui s'incrémentent
- **Validation formulaire** : Vérification des champs en temps réel
- **Notifications** : Messages de confirmation
- **Effet parallaxe** : Sur la section hero

## 🌐 Navigateurs Supportés

- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)

## 📝 TODO / Améliorations Futures

- [ ] Intégrer un backend pour le formulaire de contact
- [ ] Ajouter plus de questions aux quiz (base de 100+ questions par catégorie)
- [ ] Système de sauvegarde des scores utilisateurs
- [ ] Classement/leaderboard des meilleurs scores
- [ ] Timer optionnel pour les quiz
- [ ] Export des résultats en PDF
- [ ] Ajouter une galerie photos de l'académie
- [ ] Créer une page blog/actualités
- [ ] Ajouter des témoignages d'anciens étudiants
- [ ] Intégrer un système de candidature en ligne
- [ ] Ajouter une section FAQ
- [ ] Créer un espace étudiant/connexion
- [ ] Multilingue (EN/FR)

## 🔧 Maintenance

Pour mettre à jour le site :

1. **Modifier le contenu** dans `index.html`
2. **Ajuster les styles** dans `styles.css`
3. **Ajouter des fonctionnalités** dans `script.js`
4. **Tester** sur différents navigateurs et tailles d'écran

## 📞 Contact

Pour toute question concernant le site ou l'académie :

- **Email** : contact@netbfrs.fr
- **Téléphone** : +33 1 23 45 67 89
- **Adresse** : 123 Avenue de la République, 75000 Paris

## 📄 Licence

© 2026 NETBFRS Académie. Tous droits réservés.

---

**Développé avec 💙 pour l'excellence en formation**
