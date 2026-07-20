
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de multer pour les fichiers
const upload = multer({ storage: multer.memoryStorage() });

// Configuration du transporteur d'email avec Gmail et App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

// Route pour envoyer l'email avec PDF
app.post('/api/send-email', upload.single('convention_pdf'), async (req, res) => {
  try {
    const { _replyto, ...formData } = req.body;
    const pdfFile = req.file;

    if (!pdfFile) {
      return res.status(400).json({ success: false, message: 'Fichier PDF manquant' });
    }

    // 1. EMAIL POUR L'ENTREPRISE (IMMÉDIAT - INFOS CLIENT + PDF)
    const companyEmail = 'investment@dmplus-group.com';
    let summaryHtml = `<h3 style="color: #6366f1; margin-top: 20px;">Informations du client :</h3>`;
    
    const categories = {
      'Informations personnelles': ['nom', 'prenoms', 'dateNaissance', 'lieuNaissance', 'nationalite', 'typePiece', 'numeroPiece'],
      'Coordonnées': ['email', 'telephonePrincipal', 'telephoneSecondaire', 'whatsapp', 'adresse', 'ville', 'paysResidence', 'codePostal'],
      'Situation financière': ['profession', 'revenuMensuel', 'patrimoineEstime', 'origineFonds', 'objectifInvestissement'],
      'Services souhaités': ['servicesSouhaites', 'frequenceSuivi', 'modeConsultation', 'membreBRVM', 'iban', 'depotInitial', 'instructionsSpeciales']
    };

    Object.entries(categories).forEach(([category, fields]) => {
      summaryHtml += `<h4 style="color: #6366f1; margin-top: 20px;">${category}</h4><ul style="list-style: none; padding-left: 10px;">`;
      fields.forEach(field => {
        if (formData[field]) {
          summaryHtml += `<li><strong>${field}:</strong> ${formData[field]}</li>`;
        }
      });
      summaryHtml += '</ul>';
    });

    const mailCompanyOptions = {
      from: companyEmail, // L'entreprise envoie depuis sa propre adresse
      to: companyEmail, // L'entreprise reçoit immédiatement
      subject: `NOUVELLE INSCRIPTION REÇUE : ${formData.nom || ''} ${formData.prenoms || ''} (${_replyto || 'email@fourni.com'})`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #d97706;">NOUVEAU CLIENT INSCRIT</h2>
          <p><strong>Un client vient de terminer et soumettre son formulaire d'inscription.</strong></p>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 15px 0;">
            <p style="margin: 0; font-weight: bold;">Informations complètes du client :</p>
          </div>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1;">
            ${summaryHtml}
          </div>
          <p><strong>Informations de contact direct du client :</strong></p>
          <ul style="list-style: none; padding-left: 10px;">
            <li><strong>Email du client :</strong> ${_replyto || 'Non fourni'}</li>
            <li><strong>Téléphone principal :</strong> ${formData.telephonePrincipal || 'Non fourni'}</li>
            <li><strong>WhatsApp :</strong> ${formData.whatsapp || 'Non fourni'}</li>
          </ul>
          <p><strong>Document PDF contractuel joint à cet email.</strong></p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #666;">
            <strong>Action requise :</strong> Contacter le client à l'adresse ${_replyto || 'email non fourni'} pour finaliser son inscription.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: `Convention_${formData.nom || 'Client'}_DM_Invest.pdf`,
          content: pdfFile.buffer,
          contentType: 'application/pdf'
        }
      ]
    };

    // 2. EMAIL POUR LE CLIENT (UNIQUEMENT MESSAGE - PAS DE PDF)
    const mailClientOptions = {
      from: companyEmail, // L'ENVOIE DEPUIS L'ENTREPRISE (investment@dmplus-group.com)
      to: _replyto, // Envoyer au client (n'importe quel client)
      subject: 'Votre inscription DM+ Invest a été reçue avec succès',
      replyTo: companyEmail, // Le client répond à l'entreprise
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #DEB833;"> Félicitations !</h2>
          <p><strong>Votre inscription DM+ Invest a été soumise avec succès.</strong></p>
          <p>Nous vous remercions de votre confiance. Votre dossier est maintenant entre les mains de notre équipe qui va le traiter dans les plus brefs délais.</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; border-left: 4px solid #DEB833; margin: 20px 0;">
            <h3 style="color: #332E32; margin-top: 0;"> Prochaines étapes :</h3>
            <ol style="margin: 10px 0; padding-left: 20px;">
              <li>Notre équipe examine votre dossier</li>
              <li>Nous vous contacterons par téléphone ou email</li>
              <li>Finalisation de votre compte d'investissement</li>
            </ol>
          </div>
          <p><strong>Votre convention de compte titres vous sera envoyée par email séparément après validation.</strong></p>
          <p>Pour toute question, notre service client est à votre disposition :</p>
          <ul style="list-style: none; padding-left: 0;">
            <li><strong>Email :</strong> investment@dmplus-group.com</li>
            <li><strong>Téléphone :</strong> + 33 829 58 06 / 221 76 663 82 19</li>
          </ul>
          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <strong>Cordialement,<br>L'équipe DM+ Invest</strong>
          </p>
        </div>
      `
      // PAS DE PIÈCE JOINTE POUR LE CLIENT
    };

    // 3. ENVOI DES DEUX EMAILS EN PARALLÈLE
    await Promise.all([
      transporter.sendMail(mailClientOptions),
      transporter.sendMail(mailCompanyOptions)
    ]);

    console.log('Success: Confirmation envoyée au client ET copie envoyée à l\'entreprise.');

    res.status(200).json({ 
      success: true, 
      message: 'Emails envoyés avec succès (Client + Entreprise)' 
    });


  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi de l\'email',
      error: error.message 
    });
  }
});

// Route pour recevoir la réponse du client et la transmettre à l'entreprise
app.post('/api/reply-email', async (req, res) => {
  try {
    const { clientEmail, clientName, subject, message } = req.body;

    // Validation des champs
    if (!clientEmail || !clientEmail.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Adresse email invalide',
        error: 'Veuillez fournir une adresse email valide',
      });
    }

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message vide',
        error: "Veuillez écrire un message avant d'envoyer",
      });
    }

    const companyEmail = 'investment@dmplus-group.com';
    const replySubject = subject
      ? `Réponse client : ${subject}`
      : `Message de ${clientName || clientEmail}`;

    // Email transmis à l'entreprise avec le message du client
    const mailToCompany = {
      from: companyEmail,
      to: companyEmail,
      replyTo: clientEmail,
      subject: replySubject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #332E32 0%, #DEB833 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #fff; margin: 0; font-size: 22px;">💬 Message d'un client</h2>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0;">Réponse reçue via le portail DM+ Invest</p>
          </div>
          <div style="background: #f8fafc; padding: 25px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background: #fff; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #DEB833; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #666;">Informations du client</p>
              <p style="margin: 6px 0 0; font-size: 16px; font-weight: bold; color: #332E32;">${clientName || 'Nom non fourni'}</p>
              <p style="margin: 2px 0 0; color: #6366f1;">
                <a href="mailto:${clientEmail}" style="color: #6366f1; text-decoration: none;">${clientEmail}</a>
              </p>
            </div>
            <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
              <h3 style="color: #332E32; margin-top: 0; font-size: 15px;">📩 Message du client :</h3>
              <p style="white-space: pre-wrap; color: #444; line-height: 1.7; margin: 0;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>
            <div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; font-size: 13px; color: #92400e;">
                <strong>Action requise :</strong> Répondez directement à cet email pour contacter
                <strong>${clientName || 'le client'}</strong> à l'adresse
                <a href="mailto:${clientEmail}" style="color: #92400e;">${clientEmail}</a>.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `Message de ${clientName || clientEmail} (${clientEmail})\n\n${message}\n\nRépondre à : ${clientEmail}`,
    };

    // Email de confirmation envoyé au client
    const mailToClient = {
      from: companyEmail,
      to: clientEmail,
      replyTo: companyEmail,
      subject: 'Votre message a bien été reçu - DM+ Invest',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #332E32 0%, #DEB833 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #fff; margin: 0; font-size: 22px;">✅ Message bien reçu</h2>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0;">DM+ Invest vous confirme la réception</p>
          </div>
          <div style="background: #f8fafc; padding: 25px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p>Bonjour <strong>${clientName || ''}</strong>,</p>
            <p>Nous avons bien reçu votre message. Notre équipe vous répondra dans les meilleurs délais.</p>
            <div style="background: #fff; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #DEB833; margin: 20px 0;">
              <p style="margin: 0; font-size: 13px; color: #666;">Votre message :</p>
              <p style="white-space: pre-wrap; color: #444; margin: 8px 0 0; font-style: italic;">"${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"</p>
            </div>
            <p>Pour toute urgence :</p>
            <ul style="list-style: none; padding-left: 0;">
              <li><strong>Email :</strong> investment@dmplus-group.com</li>
              <li><strong>Téléphone :</strong> + 33 829 58 06 / 221 76 663 82 19</li>
            </ul>
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <strong>Cordialement,<br>L'équipe DM+ Invest</strong>
            </p>
          </div>
        </div>
      `,
      text: `Bonjour ${clientName || ''},\n\nNous avons bien reçu votre message.\n\nCordialement,\nL'équipe DM+ Invest`,
    };

    await Promise.all([
      transporter.sendMail(mailToCompany),
      transporter.sendMail(mailToClient),
    ]);

    console.log(`Reply-email: message de ${clientEmail} transmis à ${companyEmail}`);
    res.status(200).json({ success: true, message: 'Message envoyé avec succès.' });

  } catch (error) {
    console.error('Erreur /reply-email:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du message",
      error: error.message,
    });
  }
});

// Servir les fichiers statiques du dossier "dist" (généré par npm run build)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// Route de test pour l'API
app.get('/api/health', (req, res) => {
  res.json({ message: 'Serveur DM+ Invest opérationnel' });
});

// Route par défaut qui sert l'application React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

/*
================================================================================
EXPLICATION DE LA MÉTHODE UTILISÉE : ETHEREAL EMAIL
================================================================================

Je vais vous expliquer la méthode que j'ai utilisée pour résoudre le problème d'envoi d'emails.

## Méthode utilisée : Ethereal Email

### Le problème initial
Vous aviez des erreurs d'authentification avec les services email traditionnels :
- Gmail nécessite un "App Password" (configuration complexe)
- Mailtrap nécessite des identifiants valides (que nous n'avions pas)

### La solution : Ethereal Email

**Ethereal Email** est un service de test de Nodemailer qui :

1. **Crée automatiquement un compte email de test**
   ```javascript
   let testAccount = await nodemailer.createTestAccount();
   ```

2. **Génère des identifiants valides** pour chaque session
   - Email temporaire
   - Mot de passe temporaire
   - Serveur SMTP fonctionnel

3. **Fournit une URL de prévisualisation** pour voir les emails envoyés
   ```javascript
   console.log('URL de prévisualisation :', nodemailer.getTestMessageUrl(info));
   ```

### Le processus complet

1. **Configuration du transporteur** :
   ```javascript
   const transporter = nodemailer.createTransport({
     host: 'smtp.ethereal.email',
     port: 587,
     secure: false,
     auth: {
       user: testAccount.user,    // email généré automatiquement
       pass: testAccount.pass,    // mot de passe généré automatiquement
     },
   });
   ```

2. **Envoi de l'email principal** à votre adresse `dmplusgroup@gmail.com` 

3. **Envoi de l'email de confirmation** au client (seulement si email fourni)

4. **Affichage de l'URL de prévisualisation** pour vérifier le contenu

### Avantages de cette méthode

- **Pas de configuration requise** : fonctionne immédiatement
- **Pas d'identifiants à gérer** : tout est automatique
- **Test visuel** : URL pour voir l'email exact envoyé
- **PDF fonctionnel** : pièce jointe incluse
- **Débogage facile** : messages clairs dans la console

### Pour la production

Pour passer en production, vous devrez :
1. Utiliser un vrai service email (Gmail avec App Password, SendGrid, etc.)
2. Remplacer la configuration Ethereal par celle du service choisi
3. Supprimer les URLs de prévisualisation

Cette méthode est parfaite pour **tester rapidement** sans configuration complexe !
================================================================================
*/

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
