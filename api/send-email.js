import nodemailer from 'nodemailer';
import multer from 'multer';

// Configuration de multer en mémoire
const upload = multer({ storage: multer.memoryStorage() });

// Fonction utilitaire pour exécuter le middleware multer dans Vercel
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  console.log('--- REQUÊTE REÇUE SUR VERCEL SERVERLESS ---');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    // Exécuter multer pour récupérer le fichier PDF
    await runMiddleware(req, res, upload.single('convention_pdf'));

    const { _replyto, ...formData } = req.body;
    const pdfFile = req.file;

    // Validation de l'email du client
    if (!_replyto || !_replyto.includes('@')) {
      console.error('Erreur: Email client invalide:', _replyto);
      return res.status(400).json({
        success: false,
        message: 'Email du client invalide',
        error: 'Veuillez fournir une adresse email valide'
      });
    }

    console.log('Email client validé:', _replyto);

    if (!pdfFile) {
      console.error('Erreur: Fichier PDF manquant');
      return res.status(400).json({ success: false, message: 'Fichier PDF manquant' });
    }

    const emailUser = (process.env.EMAIL_USER || '').trim();
    const transporter = nodemailer.createTransport({
      host: 'mail.dmplus-group.com', // Serveur SMTP LWS
      port: 465, // Port SSL pour LWS
      secure: true, // SSL requis pour LWS
      auth: {
        user: process.env.EMAIL_USER || 'investment@dmplus-group.com', // Authentification LWS
        pass: process.env.EMAIL_PASS // Mot de passe du compte LWS
      }
    });

    // Helper pour les labels lisibles
    const fieldLabels = {
      nom: 'Nom', prenoms: 'Prénoms', dateNaissance: 'Date de naissance', lieuNaissance: 'Lieu de naissance',
      nationalite: 'Nationalité', typePiece: 'Type de pièce', numeroPiece: 'N° de pièce',
      email: 'Email', telephonePrincipal: 'Téléphone principal', telephoneSecondaire: 'Téléphone secondaire',
      whatsapp: 'WhatsApp', adresse: 'Adresse', ville: 'Ville', paysResidence: 'Pays de résidence', codePostal: 'Code postal',
      profession: 'Profession', revenuMensuel: 'Revenu mensuel', patrimoineEstime: 'Patrimoine estimé',
      origineFonds: 'Origine des fonds', objectifInvestissement: 'Objectif d\'investissement',
      servicesSouhaites: 'Services souhaités', frequenceSuivi: 'Fréquence de suivi', modeConsultation: 'Mode de consultation',
      membreBRVM: 'Membre BRVM', iban: 'IBAN', depotInitial: 'Dépôt initial', instructionsSpeciales: 'Instructions spéciales',
      hasSGIAccount: 'Compte SGI existant', wantsSGIAssistance: 'Assistance ouverture SGI',
      sgiPreferenceType: 'Préférence SGI', selectedSGI: 'SGI choisie'
    };

    const categoryIcons = {
      'Informations personnelles': '👤',
      'Coordonnées': '',
      'Situation financière': '',
      'Services souhaités': ''
    };

    const categoryColors = {
      'Informations personnelles': '#1e3a5f',
      'Coordonnées': '#0f4c35',
      'Situation financière': '#4a1f0f',
      'Services souhaités': '#2d1f4f'
    };

    const categories = {
      'Informations personnelles': ['nom', 'prenoms', 'dateNaissance', 'lieuNaissance', 'nationalite', 'typePiece', 'numeroPiece'],
      'Coordonnées': ['email', 'telephonePrincipal', 'telephoneSecondaire', 'whatsapp', 'adresse', 'ville', 'paysResidence', 'codePostal'],
      'Situation financière': ['profession', 'revenuMensuel', 'patrimoineEstime', 'origineFonds', 'objectifInvestissement'],
      'Services souhaités': ['servicesSouhaites', 'frequenceSuivi', 'modeConsultation', 'membreBRVM', 'iban', 'depotInitial', 'instructionsSpeciales', 'hasSGIAccount', 'wantsSGIAssistance', 'sgiPreferenceType', 'selectedSGI']
    };

    // 1. EMAIL POUR L'ENTREPRISE (IMMÉDIAT - INFOS CLIENT + PDF)
    const companyEmail = 'investment@dmplus-group.com';

    let summaryHtml = '';
    Object.entries(categories).forEach(([category, fields]) => {
      const color = categoryColors[category] || '#1a1a2e';
      const icon = categoryIcons[category] || '📋';
      const rows = fields
        .filter(f => formData[f])
        .map(f => `
          <tr>
            <td style="padding: 8px 14px; font-size: 12px; color: #64748b; font-weight: 600; width: 40%; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${fieldLabels[f] || f}</td>
            <td style="padding: 8px 14px; font-size: 12px; color: #1e293b; font-weight: 500; border-bottom: 1px solid #f1f5f9; vertical-align: top;">${formData[f]}</td>
          </tr>`)
        .join('');
      if (!rows) return;
      summaryHtml += `
        <div style="margin-bottom: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <div style="background: ${color}; padding: 10px 16px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 16px;">${icon}</span>
            <span style="color: #deb833; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;">${category}</span>
          </div>
          <table style="width: 100%; border-collapse: collapse; background: #ffffff;">${rows}</table>
        </div>`;
    });

    const clientFullName = `${formData.prenoms || ''} ${formData.nom || ''}`.trim() || 'Nouveau Client';
    const offerLabel = formData.selectedOffer === 'marche-financier' ? 'Horizon' : formData.selectedOffer === 'prestige' ? 'Patrimoine' : formData.selectedOffer === 'corporate' ? 'Corporate' : formData.selectedOffer || '—';

    const mailCompanyOptions = {
      from: '"DM MIND PLUS INVESTMENT" <investment@dmplus-group.com>',
      to: companyEmail,
      replyTo: _replyto,
      subject: `🆕 Nouvelle inscription : ${clientFullName} — ${offerLabel}`,
      html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:30px 10px;">
  <tr><td align="center">
    <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

      <!-- HEADER -->
      <tr><td style="background: linear-gradient(135deg, #0a0f1e 0%, #1a2744 50%, #0d1b33 100%); border-radius: 16px 16px 0 0; padding: 36px 40px; text-align: center;">
        <div style="font-size: 11px; color: #deb833; font-weight: 800; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 10px;">DM+ INVESTMENT</div>
        <div style="font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: 0.04em; margin-bottom: 6px;">Nouvelle Inscription</div>
        <div style="width: 50px; height: 3px; background: #deb833; margin: 12px auto 16px; border-radius: 2px;"></div>
        <div style="display: inline-block; background: #deb833; color: #0a0f1e; font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; padding: 6px 18px; border-radius: 20px;">Formule ${offerLabel}</div>
      </td></tr>

      <!-- ALERT BAND -->
      <tr><td style="background: #deb833; padding: 12px 40px; text-align: center;">
        <span style="font-size: 13px; font-weight: 700; color: #0a0f1e;">⚡ Action requise — Un nouveau client vient de soumettre son dossier</span>
      </td></tr>

      <!-- CLIENT HERO CARD -->
      <tr><td style="background: #ffffff; padding: 28px 40px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background: linear-gradient(135deg, #f8faff, #eef2ff); border: 1px solid #dde3f0; border-radius: 12px; padding: 20px 24px;">
              <div style="font-size: 10px; color: #94a3b8; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px;">Client</div>
              <div style="font-size: 22px; font-weight: 900; color: #0a0f1e; margin-bottom: 4px;">${clientFullName}</div>
              <div style="font-size: 12px; color: #64748b;">
                📧 ${_replyto || '—'} &nbsp;|&nbsp; 📱 ${formData.telephonePrincipal || '—'}${formData.whatsapp ? ' &nbsp;|&nbsp; 💬 WhatsApp: ' + formData.whatsapp : ''}
              </div>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- SUMMARY -->
      <tr><td style="background: #ffffff; padding: 0 40px 28px;">
        <div style="font-size: 11px; color: #94a3b8; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 14px; padding-top: 4px; border-top: 1px solid #f1f5f9; padding-top: 16px;">Détail du dossier</div>
        ${summaryHtml}
      </td></tr>

      <!-- PDF NOTICE -->
      <tr><td style="background: #f8fafc; border-top: 2px solid #deb833; border-bottom: 2px solid #deb833; padding: 16px 40px; text-align: center;">
        <span style="font-size: 13px; color: #1e293b;">📎 <strong>Le document PDF contractuel est joint à cet email.</strong></span>
      </td></tr>

      <!-- ACTION CTA -->
      <tr><td style="background: #ffffff; padding: 28px 40px; text-align: center;">
        <div style="font-size: 13px; color: #475569; margin-bottom: 16px;">Cliquez pour contacter le client directement :</div>
        <a href="mailto:${_replyto}" style="display: inline-block; background: linear-gradient(135deg, #deb833, #c9a520); color: #0a0f1e; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 14px 32px; border-radius: 8px; text-decoration: none; margin: 0 6px;">✉ Répondre au client</a>
        ${formData.telephonePrincipal ? `<a href="tel:${formData.telephonePrincipal}" style="display: inline-block; background: #0a0f1e; color: #deb833; font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 14px 32px; border-radius: 8px; text-decoration: none; margin: 0 6px;">📞 Appeler</a>` : ''}
      </td></tr>

      <!-- FOOTER -->
      <tr><td style="background: linear-gradient(135deg, #0a0f1e, #1a2744); border-radius: 0 0 16px 16px; padding: 24px 40px; text-align: center;">
        <div style="font-size: 11px; color: #deb833; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 6px;">DM MIND PLUS INVESTMENT</div>
        <div style="font-size: 11px; color: #64748b;">Médina rue 37x24, Dakar, Sénégal &nbsp;|&nbsp; +221 76 619 34 10 &nbsp;|&nbsp; investment@dmplus-group.com</div>
        <div style="margin-top: 10px; font-size: 10px; color: #334155;">Ce message est destiné exclusivement aux équipes internes de DM+ Investment.</div>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>
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
      from: '"DM MIND PLUS INVESTMENT" <investment@dmplus-group.com>', // Doit être l'adresse authentifiée sur LWS
      to: _replyto, // Envoyer au client (n'importe quel client)
      subject: 'Votre inscription DM+ Invest a été reçue avec succès',
      replyTo: 'investment@dmplus-group.com', // Le client répond sur l'adresse Gmail
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'DM+ Invest System',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal'
      },
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Bonjour <strong>${formData.prenoms || ''}</strong>,</p>
          <p>Nous vous remercions pour votre inscription sur la plateforme DM+ Investment.</p>
          <p>Votre demande a bien été enregistrée. Les informations transmises nous permettront de mieux comprendre votre profil, vos objectifs d’investissement, votre horizon de placement ainsi que le niveau d’accompagnement souhaité.</p>
          <p>Chez DM+ Investment, notre ambition est de vous aider à investir avec méthode, à mieux structurer vos décisions financières et à construire progressivement une stratégie patrimoniale adaptée à votre situation.</p>
          <p>Notre équipe procédera à l’analyse de votre profil et reviendra vers vous dans les meilleurs délais afin de vous orienter vers l’accompagnement le plus adapté.</p>
          <p>Selon votre besoin, cet accompagnement pourra porter notamment sur :</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>la compréhension des opportunités d’investissement ;</li>
            <li>l’analyse du marché financier ;</li>
            <li>la construction d’une stratégie patrimoniale ;</li>
            <li>le suivi de vos objectifs financiers ;</li>
            <li>l’accès progressif à nos outils digitaux de gestion et de pilotage.</li>
          </ul>
          <p>Nous vous invitons à rester disponible sur le numéro WhatsApp ou l’adresse e-mail renseignés lors de votre inscription.</p>
          <p>Merci encore pour votre confiance</p>
          <br>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin-bottom: 15px; font-size: 14px; line-height: 1.5;">
              <strong>Service Relation Client</strong><br>
              <strong>DIGITAL MIND+ INVEST</strong><br>
              +221 76 663 82 19 / 33 829 58 06<br>
              <a href="mailto:investment@dmplus-group.com" style="color: #1a73e8;">investment@dmplus-group.com</a><br>
              <a href="https://www.dmplus-group.com" style="color: #1a73e8;">www.dmplus-group.com</a>
            </p>
            <img src="https://ci3.googleusercontent.com/mail-sig/AIorK4xLmyMadHj5ik8nWyu9cW0sPlPdlrePUqhjbLuf-aZyiwiRQtXJ186nXJFQT1WE9EIGHMLD8Q-NjPC2" alt="Signature DM+ Invest" style="max-width: 100%; height: auto; border: none; outline: none; text-decoration: none;" />
          </div>
        </div>
      `,
      text: `
Bonjour ${formData.prenoms || ''},

Nous vous remercions pour votre inscription sur la plateforme DM+ Investment.

Votre demande a bien été enregistrée. Les informations transmises nous permettront de mieux comprendre votre profil, vos objectifs d’investissement, votre horizon de placement ainsi que le niveau d’accompagnement souhaité.

Chez DM+ Investment, notre ambition est de vous aider à investir avec méthode, à mieux structurer vos décisions financières et à construire progressivement une stratégie patrimoniale adaptée à votre situation.

Notre équipe procédera à l’analyse de votre profil et reviendra vers vous dans les meilleurs délais afin de vous orienter vers l’accompagnement le plus adapté.

Selon votre besoin, cet accompagnement pourra porter notamment sur :
- la compréhension des opportunités d’investissement ;
- l’analyse du marché financier ;
- la construction d’une stratégie patrimoniale ;
- le suivi de vos objectifs financiers ;
- l’accès progressif à nos outils digitaux de gestion et de pilotage.

Nous vous invitons à rester disponible sur le numéro WhatsApp ou l’adresse e-mail renseignés lors de votre inscription.

Merci encore pour votre confiance


Service Relation Client
DIGITAL MIND+ INVEST
+221 76 663 82 19 / 33 829 58 06
investment@dmplus-group.com
www.dmplus-group.com
      `
      // PAS DE PIÈCE JOINTE POUR LE CLIENT
    };

    console.log('Envoi des mails...');
    console.log('Email client (_replyto):', _replyto);
    console.log('Email entreprise:', companyEmail);

    try {
      // Envoyer l'email au client d'abord
      console.log('Envoi email au client...');
      await transporter.sendMail(mailClientOptions);
      console.log('Email au client envoyé avec succès');

      // Envoyer l'email à l'entreprise
      console.log('Envoi email à l\'entreprise...');
      await transporter.sendMail(mailCompanyOptions);
      console.log('Email à l\'entreprise envoyé avec succès');

    } catch (error) {
      console.error(' Erreur lors de l\'envoi des emails:', error);

      // Vérifier si c'est une erreur de destinataire invalide
      if (error.message.includes('all recipients were rejected')) {
        console.error('Erreur de destinataire - vérifiez les adresses email');
        return res.status(400).json({
          success: false,
          message: 'Adresse email invalide',
          error: 'L\'adresse email du client semble incorrecte'
        });
      }

      throw error; // Relancer l'erreur pour le bloc catch principal
    }

    console.log('Succès !');
    return res.status(200).json({ success: true, message: 'Emails envoyés avec succès' });

  } catch (error) {
    console.error('ERREUR SERVEUR VERCEL:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi',
      error: error.message
    });
  }
}
