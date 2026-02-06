# Procédure de Déploiement sur VPS

## 📋 Mise à jour du site sur le VPS

Après avoir poussé vos modifications sur GitHub, suivez ces étapes pour mettre à jour le site en production :

### 1️⃣ Connexion au VPS
```bash
ssh debian@votre-vps-ip
```

### 2️⃣ Navigation vers le répertoire du site
```bash
cd /var/www/netbfrs
```

### 3️⃣ Récupération des modifications depuis GitHub
```bash
sudo git pull origin main
```

Si vous rencontrez des problèmes de permissions, utilisez :
```bash
sudo su
git fetch --all
git reset --hard origin/main
```

### 4️⃣ Redémarrage d'Apache pour appliquer les changements
```bash
sudo systemctl restart apache2
```

Ou pour un rechargement sans coupure :
```bash
sudo systemctl reload apache2
```

### 5️⃣ Vérification du statut d'Apache (optionnel)
```bash
sudo systemctl status apache2
```

### 6️⃣ Nettoyage du cache navigateur

**Sur votre navigateur**, effectuez un hard refresh pour voir les changements CSS :
- **Windows/Linux** : `Ctrl + Shift + R`
- **Mac** : `Cmd + Shift + R`

---

## 🔄 Version CSS

Chaque fois que vous modifiez le fichier `styles.css`, pensez à incrémenter la version dans `index.html` :

```html
<link rel="stylesheet" href="styles.css?v=X">
```

Incrémentez le numéro de version (ex: v4 → v5) pour forcer le rechargement du CSS par les navigateurs.

---

## 📝 Résumé des commandes rapides

```bash
cd /var/www/netbfrs
sudo git pull origin main
sudo systemctl restart apache2
```

Puis **Ctrl + Shift + R** dans le navigateur.

---

## ⚠️ En cas de problème

### Le site ne se met pas à jour
1. Vérifiez que le `git pull` a bien récupéré les fichiers
2. Redémarrez Apache avec `sudo systemctl restart apache2`
3. Videz complètement le cache du navigateur
4. Vérifiez la version CSS dans le HTML

### Erreur de permissions Git
```bash
sudo su
cd /var/www/netbfrs
git fetch --all
git reset --hard origin/main
exit
sudo systemctl restart apache2
```

### Apache ne redémarre pas
```bash
# Vérifier les erreurs de configuration
sudo apache2ctl configtest

# Voir les logs d'erreur
sudo tail -f /var/log/apache2/error.log
```
