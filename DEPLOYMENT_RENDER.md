# Guide de déploiement sur Render

## Architecture
- **Frontend** : Hébergé sur LWS (statique)
- **Backend** : Hébergé sur Render (Node.js + Express + Nodemailer)

## Étape 1 : Créer un compte Render
1. Allez sur https://render.com
2. Créez un compte (gratuit)
3. Connectez votre dépôt GitHub

## Étape 2 : Déployer le backend sur Render

### Option A : Via le fichier render.yaml (recommandé)
1. Poussez le fichier `render.yaml` sur votre dépôt GitHub
2. Dans Render, cliquez sur "New +" → "New Blueprint"
3. Sélectionnez votre dépôt GitHub
4. Render détectera automatiquement le fichier `render.yaml`
5. Cliquez sur "Apply"

### Option B : Manuel
1. Dans Render, cliquez sur "New +" → "Web Service"
2. Sélectionnez votre dépôt GitHub
3. Configurez :
   - **Name** : dmplus-investment-backend
   - **Region** : Europe (Frankfurt)
   - **Branch** : main
   - **Runtime** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`

## Étape 3 : Configurer les variables d'environnement dans Render

Dans votre service Render, allez dans "Environment" et ajoutez :

| Variable | Valeur | Sync |
|----------|--------|------|
| EMAIL_HOST | mail.dmplus-group.com | Yes |
| EMAIL_PORT | 465 | Yes |
| EMAIL_USER | investment@dmplus-group.com | Yes |
| EMAIL_PASS | DMP-group7-inv | No (sensible) |
| PORT | 3002 | Yes |

**Important** : Pour `EMAIL_PASS`, cliquez sur "Sync" → "No" pour ne pas synchroniser avec le dépôt.

## Étape 4 : Mettre à jour le frontend

Dans le fichier `.env` local, mettez à jour l'URL du backend :

```env
VITE_API_URL=https://dmplus-investment-backend.onrender.com
```

Rebuild le frontend et déployez sur LWS.

## Étape 5 : Vérifier le déploiement

1. Dans Render, vérifiez que le service est "Live"
2. Notez l'URL de votre service (ex: https://dmplus-investment-backend.onrender.com)
3. Testez l'endpoint : `https://dmplus-investment-backend.onrender.com/api/health`
4. Vous devriez voir : `{"message":"Serveur DM+ Invest opérationnel"}`

## Étape 6 : Tester l'envoi d'emails

1. Soumettez le formulaire sur votre site LWS
2. Vérifiez les logs Render (Logs tab)
3. Vous devriez voir :
   - `Success: Confirmation envoyée au client d'abord.`
   - `Success: Copie envoyée à l'entreprise avec les données et le PDF.`

## Dépannage

### Erreur : "Connection refused"
- Vérifiez que le port 465 est ouvert dans Render
- Vérifiez les credentials SMTP dans le panel LWS

### Erreur : "Authentication failed"
- Vérifiez que `EMAIL_USER` et `EMAIL_PASS` sont corrects
- Vérifiez que le compte email existe dans LWS

### Erreur : "Timeout"
- Render free tier peut mettre le service en veille après 15 min d'inactivité
- Le premier appel peut prendre 30-60 secondes pour démarrer

### CORS errors
- Vérifiez que votre domaine LWS est dans les allowed origins dans `server.js` (lignes 39-47)

## Coûts
- **Render Free Tier** : Gratuit (750 heures/mois)
- **Limites** : 512 MB RAM, 0.1 CPU
- **Pour la production** : Upgrade vers Starter ($7/mois) si besoin
