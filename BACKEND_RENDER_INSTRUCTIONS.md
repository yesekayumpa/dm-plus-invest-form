# Instructions pour ajouter les fonctions d'envoi d'emails au backend Render existant

## À ajouter dans votre backend Render

### 1. Installer les dépendances
```bash
npm install nodemailer multer cors dotenv
```

### 2. Créer la route POST /api/send-email

Ajoutez ce code dans votre fichier de routes principal du backend Render :

```javascript
import nodemailer from 'nodemailer';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configuration de multer pour les fichiers
const upload = multer({ storage: multer.memoryStorage() });

// Configuration du transporteur d'email (SMTP LWS)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'mail.dmplus-group.com',
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: parseInt(process.env.EMAIL_PORT || '465') === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Route pour envoyer l'email avec PDF
router.post('/api/send-email', upload.single('convention_pdf'), async (req, res) => {
  try {
    const { _replyto, ...formData } = req.body;
    const pdfFile = req.file;

    if (!pdfFile) {
      return res.status(400).json({ success: false, message: 'Fichier PDF manquant' });
    }

    const companyEmail = 'investment@dmplus-group.com';

    // Email pour l'entreprise (avec PDF)
    const mailCompanyOptions = {
      from: companyEmail,
      to: companyEmail,
      subject: `NOUVELLE INSCRIPTION REÇUE : ${formData.nom || ''} ${formData.prenoms || ''} (${_replyto || 'email@fourni.com'})`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color: #d97706;">NOUVEAU CLIENT INSCRIT</h2>
          <p><strong>Un client vient de terminer et soumettre son formulaire d'inscription.</strong></p>
          <p><strong>Informations de contact direct du client :</strong></p>
          <ul style="list-style: none; padding-left: 10px;">
            <li><strong>Email du client :</strong> ${_replyto || 'Non fourni'}</li>
            <li><strong>Téléphone principal :</strong> ${formData.telephonePrincipal || 'Non fourni'}</li>
            <li><strong>WhatsApp :</strong> ${formData.whatsapp || 'Non fourni'}</li>
          </ul>
          <p><strong>Document PDF contractuel joint à cet email.</strong></p>
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

    // Email pour le client (sans PDF)
    const clientEmailAddress = _replyto || formData.email;
    const mailClientOptions = {
      from: companyEmail,
      to: clientEmailAddress,
      subject: 'Votre inscription DM+ Invest a été reçue avec succès',
      replyTo: companyEmail,
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
          <p>Pour toute question, notre service client est à votre disposition :</p>
          <ul style="list-style: none; padding-left: 0;">
            <li><strong>Email :</strong> investment@dmplus-group.com</li>
            <li><strong>Téléphone :</strong> + 33 829 58 06 / 221 76 663 82 19</li>
          </ul>
        </div>
      `
    };

    // Envoi des emails
    try {
      if (clientEmailAddress) {
        await transporter.sendMail(mailClientOptions);
        console.log('Success: Confirmation envoyée au client.');
      }
      
      await transporter.sendMail(mailCompanyOptions);
      console.log('Success: Copie envoyée à l\'entreprise avec les données et le PDF.');
    } catch (emailError) {
      console.error("Erreur d'envoi d'email:", emailError);
    }

    res.status(200).json({ success: true, message: 'Soumission enregistrée' });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email', error: error.message });
  }
});
```

### 3. Configurer les variables d'environnement dans Render

Dans votre service Render, ajoutez ces variables d'environnement :

- `EMAIL_HOST` = mail.dmplus-group.com
- `EMAIL_PORT` = 465
- `EMAIL_USER` = investment@dmplus-group.com
- `EMAIL_PASS` = DMP-group7-inv

### 4. Redéployer le backend Render

Après avoir ajouté le code et les variables d'environnement, redéployez votre service Render.
