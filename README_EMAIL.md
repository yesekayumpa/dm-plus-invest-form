# Configuration de l'envoi d'emails pour DM+ Invest

## Étapes de configuration

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de l'email
1. Copiez le fichier `.env.example` vers `.env` :
```bash
cp .env.example .env
```

2. Configurez vos identifiants email dans le fichier `.env` :
```
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_ou_app_password
PORT=3001
```

### 3. Configuration Gmail (recommandé)
Pour utiliser Gmail avec Nodemailer :

#### Option A: Utiliser un App Password (recommandé)
1. Activez la vérification en deux étapes sur votre compte Gmail
2. Allez dans les paramètres de sécurité Google
3. Créez un "App Password"
4. Utilisez cet App Password dans `EMAIL_PASS`

#### Option B: Utiliser OAuth2 (plus sécurisé)
Pour la production, utilisez OAuth2 avec les identifiants Google Cloud.

### 4. Démarrage du serveur
Pour le développement :
```bash
npm run dev:full
```
Cette commande démarre simultanément :
- Le frontend React (port 5173)
- Le serveur backend (port 3001)

Pour démarrer uniquement le serveur backend :
```bash
npm run server
```

### 5. Test
1. Remplissez le formulaire
2. Soumettez-le
3. Vérifiez que vous recevez :
   - Un email à `investment@dmplus-goupe.com` avec le PDF en pièce jointe
   - Un email de confirmation à l'adresse du client

## Fonctionnalités

- ✅ Envoi d'email avec PDF en pièce jointe
- ✅ Email de confirmation automatique au client
- ✅ Organisation des données par catégories
- ✅ Gestion des erreurs
- ✅ Support CORS pour le développement

## Déploiement

Pour la production :
1. Déployez le serveur sur un service (Heroku, Vercel, etc.)
2. Mettez à jour l'URL dans `App.jsx` (ligne 220)
3. Configurez les variables d'environnement du service

## Alternatives

Si vous ne voulez pas gérer de serveur, vous pouvez utiliser :
- **EmailJS** : Service d'email client-side
- **Formspree avec webhook** : Configurer un webhook pour envoyer l'email
- **Netlify Functions** : Fonctions serverless
