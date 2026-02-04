# 🚀 Guide de Déploiement NETBFRS

Ce guide vous explique comment déployer le site NETBFRS sur votre VPS Debian 13.

## 📋 Prérequis

- VPS Debian 13
- Accès root ou sudo
- Nom de domaine (optionnel, recommandé pour HTTPS)
- Connexion SSH au VPS

---

## 🌐 Option 1 : GitHub Pages (Gratuit, HTTPS automatique)

**Le plus simple !**

✅ **HTTPS automatique** fourni par GitHub  
✅ CDN mondial intégré  
✅ Aucune configuration serveur  

### Activation :
1. Allez sur : https://github.com/hocineira/NETBFRS/settings/pages
2. **Source** : Deploy from a branch
3. **Branch** : `main`, dossier : `/ (root)`
4. Cliquez **Save**

Votre site sera accessible sur : **https://hocineira.github.io/NETBFRS**

---

## 🖥️ Option 2 : VPS Debian 13 avec Apache (Production)

### ⚠️ Si vous avez installé Nginx par erreur, le supprimer :

```bash
# Arrêter Nginx
sudo systemctl stop nginx
sudo systemctl disable nginx

# Supprimer Nginx complètement
sudo apt remove --purge nginx nginx-common nginx-full -y
sudo apt autoremove -y

# Nettoyer les fichiers de configuration
sudo rm -rf /etc/nginx
sudo rm -rf /var/log/nginx
sudo rm -rf /var/www/html

# Vérifier qu'il n'est plus installé
nginx -v  # Devrait retourner "command not found"
```

### Étape 1 : Connexion au VPS

```bash
ssh root@votre-ip-vps
# ou
ssh votre-user@votre-ip-vps
```

### Étape 2 : Mise à jour du système

```bash
sudo apt update && sudo apt upgrade -y
```

### Étape 3 : Installation d'Apache

```bash
# Installation
sudo apt install apache2 -y

# Démarrer et activer Apache
sudo systemctl start apache2
sudo systemctl enable apache2

# Vérifier le statut
sudo systemctl status apache2

# Vérifier la version
apache2 -v
```

### Étape 4 : Installation de Git

```bash
sudo apt install git -y
```

### Étape 5 : Cloner le repository

```bash
# Créer le dossier web
sudo mkdir -p /var/www/netbfrs

# Cloner le repo
cd /var/www/netbfrs
sudo git clone https://github.com/hocineira/NETBFRS.git .

# Définir les permissions
sudo chown -R www-data:www-data /var/www/netbfrs
sudo chmod -R 755 /var/www/netbfrs
```

### Étape 6 : Configuration Apache

```bash
# Créer le fichier de configuration
sudo nano /etc/apache2/sites-available/netbfrs.conf
```

**Coller cette configuration :**

```apache
<VirtualHost *:80>
    # Remplacer par votre nom de domaine ou IP
    ServerName votre-domaine.fr
    ServerAlias www.votre-domaine.fr
    # Ou si pas de domaine, commenter ServerName et ServerAlias
    
    # Administrateur du site
    ServerAdmin contact@netbfrs.fr
    
    # Répertoire racine du site
    DocumentRoot /var/www/netbfrs
    
    # Configuration du répertoire
    <Directory /var/www/netbfrs>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Logs
    ErrorLog ${APACHE_LOG_DIR}/netbfrs-error.log
    CustomLog ${APACHE_LOG_DIR}/netbfrs-access.log combined
    
    # Cache pour les ressources statiques
    <FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "max-age=31536000, public, immutable"
    </FilesMatch>
    
    # Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
    </IfModule>
    
    # Sécurité
    <IfModule mod_headers.c>
        Header always set X-Frame-Options "SAMEORIGIN"
        Header always set X-Content-Type-Options "nosniff"
        Header always set X-XSS-Protection "1; mode=block"
        Header always set Referrer-Policy "no-referrer-when-downgrade"
    </IfModule>
</VirtualHost>
```

**Sauvegarder :** `Ctrl+O` puis `Entrée`, puis `Ctrl+X`

### Étape 7 : Activer les modules nécessaires et le site

```bash
# Activer les modules Apache
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod deflate
sudo a2enmod expires

# Désactiver le site par défaut
sudo a2dissite 000-default.conf

# Activer votre site
sudo a2ensite netbfrs.conf

# Tester la configuration
sudo apache2ctl configtest

# Si OK (Syntax OK), recharger Apache
sudo systemctl reload apache2
```

### Étape 8 : Configurer le Firewall (si UFW installé)

```bash
# Permettre HTTP et HTTPS
sudo ufw allow 'Apache Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

**✅ Votre site est maintenant accessible sur `http://votre-ip-vps` ou `http://votre-domaine.fr`**

---

## 🔒 Étape 9 : Activer HTTPS avec Let's Encrypt (GRATUIT)

**Prérequis : Avoir un nom de domaine pointant vers votre VPS**

### Installation de Certbot

```bash
# Installer Certbot pour Apache
sudo apt install certbot python3-certbot-apache -y
```

### Obtenir le certificat SSL

```bash
# Remplacer par votre domaine
sudo certbot --apache -d votre-domaine.fr -d www.votre-domaine.fr
```

**Suivre les instructions :**
1. Entrer votre email
2. Accepter les conditions (A)
3. Choisir si vous voulez partager votre email (N ou Y)
4. Choisir l'option 2 : Rediriger HTTP vers HTTPS (recommandé)

### Renouvellement automatique

```bash
# Tester le renouvellement automatique
sudo certbot renew --dry-run

# Certbot créera automatiquement un cron job pour le renouvellement
```

**✅ Votre site est maintenant en HTTPS : `https://votre-domaine.fr` 🎉**

---

## 🔄 Mise à jour du site

### Méthode 1 : Manuelle

```bash
# Se connecter au VPS
ssh root@votre-ip-vps

# Aller dans le dossier
cd /var/www/netbfrs

# Récupérer les dernières modifications
sudo git pull origin main

# Recharger Nginx (si nécessaire)
sudo systemctl reload nginx
```

### Méthode 2 : Script de déploiement automatique

**Créer le script :**

```bash
sudo nano /usr/local/bin/update-netbfrs
```

**Contenu du script :**

```bash
#!/bin/bash
echo "🔄 Mise à jour du site NETBFRS..."

cd /var/www/netbfrs

# Sauvegarder les modifications locales (si existantes)
git stash

# Récupérer les dernières modifications
git pull origin main

# Restaurer les modifications locales
git stash pop 2>/dev/null

# Corriger les permissions
chown -R www-data:www-data /var/www/netbfrs
chmod -R 755 /var/www/netbfrs

# Recharger Apache
systemctl reload apache2

echo "✅ Site mis à jour avec succès !"
```

**Rendre le script exécutable :**

```bash
sudo chmod +x /usr/local/bin/update-netbfrs
```

**Utilisation :**

```bash
sudo update-netbfrs
```

---

## 📊 Monitoring et Logs

### Voir les logs Apache

```bash
# Logs d'accès
sudo tail -f /var/log/apache2/netbfrs-access.log

# Logs d'erreur
sudo tail -f /var/log/apache2/netbfrs-error.log

# Tous les logs Apache
sudo tail -f /var/log/apache2/error.log
```

### Vérifier le statut Apache

```bash
sudo systemctl status apache2
```

### Redémarrer Apache si problème

```bash
sudo systemctl restart apache2
```

---

## 🔧 Dépannage

### Le site ne s'affiche pas

```bash
# 1. Vérifier qu'Apache fonctionne
sudo systemctl status apache2

# 2. Tester la configuration
sudo apache2ctl configtest

# 3. Vérifier les permissions
ls -la /var/www/netbfrs

# 4. Vérifier les logs
sudo tail -50 /var/log/apache2/error.log

# 5. Vérifier les sites activés
sudo apache2ctl -S
```

### Erreur 403 Forbidden

```bash
# Corriger les permissions
sudo chown -R www-data:www-data /var/www/netbfrs
sudo chmod -R 755 /var/www/netbfrs
```

### Erreur 502 Bad Gateway

```bash
# Redémarrer Apache
sudo systemctl restart apache2

# Vérifier la configuration PHP si vous utilisez PHP
sudo systemctl status php8.2-fpm  # ou php7.4-fpm selon votre version
```

### Erreur "AH00558: apache2: Could not reliably determine the server's fully qualified domain name"

```bash
# Ajouter ServerName dans la config globale
echo "ServerName localhost" | sudo tee -a /etc/apache2/apache2.conf
sudo systemctl restart apache2
```

---

## 🎯 Optimisations Avancées (Optionnel)

### 1. Activer HTTP/2

Dans votre configuration Apache (`/etc/apache2/sites-available/netbfrs.conf`), après obtention du SSL :

```bash
# Activer le module HTTP/2
sudo a2enmod http2

# Ajouter au début du fichier VirtualHost SSL (port 443)
Protocols h2 http/1.1
```

Puis recharger :
```bash
sudo systemctl reload apache2
```

### 2. Ajouter un CDN (Cloudflare gratuit)

1. Créer un compte sur https://cloudflare.com
2. Ajouter votre domaine
3. Changer les DNS chez votre registrar
4. Activer le proxy Cloudflare (orange)

### 3. Activer la compression Brotli (meilleure que GZIP)

```bash
# Installer le module Brotli pour Apache
sudo apt install brotli -y

# Activer mod_brotli si disponible
sudo a2enmod brotli 2>/dev/null || echo "Module brotli non disponible"

# Redémarrer Apache
sudo systemctl reload apache2
```

---

## 📝 Checklist de déploiement

- [ ] VPS Debian 13 accessible
- [ ] Nginx supprimé (si installé par erreur)
- [ ] Apache installé et démarré
- [ ] Repository cloné dans `/var/www/netbfrs`
- [ ] Configuration Apache créée (`netbfrs.conf`)
- [ ] Modules Apache activés (rewrite, headers, deflate, expires)
- [ ] Site activé dans Apache
- [ ] Firewall configuré (ports 80 et 443 ouverts)
- [ ] Domaine pointant vers le VPS (si applicable)
- [ ] Certificat SSL installé avec Let's Encrypt
- [ ] HTTPS activé et redirection HTTP → HTTPS
- [ ] Site accessible et fonctionnel
- [ ] Script de mise à jour créé

---

## 📞 Support

Pour toute question ou problème :
- **Repository** : https://github.com/hocineira/NETBFRS
- **Issues** : https://github.com/hocineira/NETBFRS/issues

---

## 🔐 Sécurité Additionnelle (Recommandé)

### Changer le port SSH (optionnel)

```bash
sudo nano /etc/ssh/sshd_config
# Changer Port 22 en Port 2222 (par exemple)
sudo systemctl restart sshd
```

### Installer Fail2Ban (protection contre brute force)

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### Mises à jour automatiques de sécurité

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

**Bon déploiement ! 🚀**
