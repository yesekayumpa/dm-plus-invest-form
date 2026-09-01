# Guide de déploiement sur LWS

## Architecture actuelle
- **Frontend** : React (statique) - À déployer sur LWS
- **Backend** : Node.js + Express - À déployer sur LWS (mutualisé ou VPS)

## ✅ Tests pré-déploiement réussis

### 1. Build React : ✅ SUCCÈS
- Fichiers générés dans `dist/`
- index.html : 629 bytes
- CSS : 74.67 KB (gzip: 11.45 KB)
- JS : 1.95 MB (gzip: 629.80 KB)

### 2. Serveur Node.js : ✅ SUCCÈS
- Démarrage sur port 3002 : ✅
- Configuration Express : ✅
- Routes API : ✅

### 3. Configuration Email LWS : ✅ SUCCÈS
- Connexion SMTP (mail.dmplus-group.com:465) : ✅
- Authentification : ✅
- Envoi email entreprise : ✅
- Envoi email client : ✅

## Étape 1 : Déployer le Frontend sur LWS

### Méthode 1 : Via FTP (recommandée pour mutualisé)
1. Connectez-vous à votre FTP LWS
2. Allez dans le dossier `www`
3. Uploadez tout le contenu du dossier `dist/`
4. Assurez-vous que le fichier `.htaccess` est présent

### Méthode 2 : Via LWS Panel
1. Connectez-vous au panel LWS
2. Allez dans "Gestion des fichiers"
3. Uploadez les fichiers du dossier `dist/`

### Configuration .htaccess
Le fichier `.htaccess` est déjà présent dans `dist/` et contient :
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Étape 2 : Déployer le Backend sur LWS

### Option A : Hébergement Mutualisé LWS

1. **Créer un sous-domaine** pour l'API (ex: api.dmplus-group.com)

2. **Uploader les fichiers backend** :
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - `.env` (avec vos variables d'environnement)
   - Dossier `node_modules` (ou installez via SSH)

3. **Configuration des variables d'environnement** :
   Dans le fichier `.env` sur le serveur LWS :
   ```env
   EMAIL_HOST=mail.dmplus-group.com
   EMAIL_PORT=465
   EMAIL_USER=investment@dmplus-group.com
   EMAIL_PASS=DMP-group7-inv
   PORT=3002
   ```

4. **Installer les dépendances** via SSH :
   ```bash
   cd votre-dossier-backend
   npm install
   ```

5. **Démarrer le serveur** avec PM2 (recommandé) :
   ```bash
   npm install -g pm2
   pm2 start server.js --name dmplus-backend
   pm2 save
   pm2 startup
   ```

### Option B : VPS LWS (recommandée pour Node.js)

1. **Connecter au VPS** via SSH
2. **Installer Node.js** (si pas déjà installé) :
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Cloner ou uploader les fichiers** du backend

4. **Installer les dépendances** :
   ```bash
   npm install
   ```

5. **Configurer le firewall** pour autoriser le port 3002 :
   ```bash
   sudo ufw allow 3002
   ```

6. **Démarrer avec PM2** :
   ```bash
   npm install -g pm2
   pm2 start server.js --name dmplus-backend
   pm2 save
   pm2 startup
   ```

7. **Configurer Nginx** comme reverse proxy (optionnel mais recommandé) :
   ```nginx
   server {
       listen 80;
       server_name api.dmplus-group.com;

       location / {
           proxy_pass http://localhost:3002;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Étape 3 : Mettre à jour le Frontend

Dans le fichier `.env` local, mettez à jour l'URL du backend :

```env
VITE_API_URL=https://api.dmplus-group.com
```

Rebuild le frontend :
```bash
npm run build
```

Uploadez à nouveau les fichiers du dossier `dist/` sur LWS.

## Étape 4 : Vérifier le déploiement

### Test du backend
```bash
curl https://api.dmplus-group.com/api/health
```
Devrait retourner : `{"message":"Serveur DM+ Invest opérationnel"}`

### Test de l'envoi d'email
Soumettez le formulaire sur votre site et vérifiez :
1. Que vous recevez l'email sur `investment@dmplus-group.com`
2. Que le client reçoit l'email de confirmation
3. Les logs du serveur (via `pm2 logs dmplus-backend`)

## Configuration LWS Spécifique

### Ports et Permissions
- **Port backend** : 3002 (assurez-vous qu'il est ouvert dans le firewall)
- **Permissions fichier** : 755 pour les dossiers, 644 pour les fichiers
- **User/Group** : www-data pour les fichiers web

### Email LWS
La configuration SMTP est déjà testée et fonctionnelle :
- **Host** : mail.dmplus-group.com
- **Port** : 465 (SSL)
- **TLS** : rejectUnauthorized: false (configuré pour LWS)

### Limitations LWS
- **Emails** : ~200-500 emails/heure sur mutualisé
- **CPU/RAM** : Limité sur mutualisé, VPS recommandé pour Node.js
- **Node.js** : Vérifiez la version supportée par LWS (actuellement 24.x)

## Monitoring et Maintenance

### Logs avec PM2
```bash
pm2 logs dmplus-backend
pm2 monit
```

### Redémarrage automatique
PM2 gère automatiquement les redémarrages en cas de crash.

### Mises à jour
Pour mettre à jour l'application :
1. Uploadez les nouveaux fichiers
2. `pm2 restart dmplus-backend`
3. Vérifiez les logs

## Sécurité

1. **Variables d'environnement** : Ne jamais commit le fichier `.env`
2. **HTTPS** : Configurez SSL/Let's Encrypt sur LWS
3. **Firewall** : N'ouvrez que les ports nécessaires
4. **Mises à jour** : Gardez Node.js et les dépendances à jour

## Support LWS

En cas de problème :
- **Panel LWS** : Logs et configuration
- **Support LWS** : Ticket support pour problèmes SMTP/Node.js
- **Documentation** : https://docs.lws.fr

## Checklist de déploiement

- [ ] Frontend build et uploadé sur LWS
- [ ] Backend uploadé sur LWS (VPS ou mutualisé)
- [ ] Node.js installé sur le serveur
- [ ] Dépendances installées (`npm install`)
- [ ] Variables d'environnement configurées
- [ ] PM2 installé et configuré
- [ ] Firewall configuré (port 3002 ouvert)
- [ ] Backend testé (`/api/health`)
- [ ] Envoi d'emails testé
- [ ] Frontend configuré avec la bonne URL API
- [ ] HTTPS configuré
- [ ] Monitoring mis en place

## Conclusion

✅ **Tous les tests pré-déploiement sont réussis**
✅ **Configuration email LWS validée**
✅ **Build React optimisé**
✅ **Serveur Node.js fonctionnel**

Le déploiement sur LWS devrait fonctionner sans problème. Suivez les étapes ci-dessus et n'hésitez pas à vérifier les logs à chaque étape.