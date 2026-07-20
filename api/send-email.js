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

    // 1. EMAIL POUR L'ENTREPRISE (IMMÉDIAT - INFOS CLIENT + PDF)
    const companyEmail = 'investment@dmplus-group.com';
    let summaryHtml = '';
    
    const categories = {
      'Informations personnelles': ['nom', 'prenoms', 'dateNaissance', 'lieuNaissance', 'nationalite', 'typePiece', 'numeroPiece'],
      'Coordonnées': ['email', 'telephonePrincipal', 'adresse', 'ville', 'paysResidence'],
      'Situation financière': ['professionSecActivite', 'revenus', 'patrimoineExistant', 'capitalInvestir'],
      'Services souhaités': ['selectedOffer', 'servicesSouhaites', 'frequenceSuivi', 'modeConsultation']
    };

    Object.entries(categories).forEach(([category, fields]) => {
      const hasData = fields.some(field => formData[field]);
      if (hasData) {
        summaryHtml += `
          <div style="margin-bottom: 25px;">
            <h4 style="color: #DEB833; margin: 0 0 12px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">${category}</h4>
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
        `;
        fields.forEach(field => {
          if (formData[field]) {
            summaryHtml += `
              <tr>
                <td width="40%" style="padding: 8px 0; color: #666; font-weight: bold; border-bottom: 1px dashed #eee;">${field}</td>
                <td width="60%" style="padding: 8px 0; color: #332E32; border-bottom: 1px dashed #eee;">${formData[field]}</td>
              </tr>
            `;
          }
        });
        summaryHtml += `
            </table>
          </div>
        `;
      }
    });

    const mailCompanyOptions = {
      from: 'investment@dmplus-group.com', // Doit être l'adresse authentifiée sur LWS
      to: companyEmail, // L'entreprise reçoit immédiatement
      replyTo: _replyto, // L'entreprise peut répondre directement au client
      subject: `NOUVELLE INSCRIPTION REÇUE : ${formData.nom || ''} ${formData.prenoms || ''} (${_replyto || 'email@fourni.com'})`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #332E32 0%, #1a171a 100%); padding: 35px 30px; text-align: center; border-bottom: 5px solid #DEB833;">
            <h2 style="color: #DEB833; margin: 0; font-size: 26px; text-transform: uppercase; letter-spacing: 1px;">Nouveau Client Inscrit</h2>
            <p style="color: #e5e7eb; margin: 12px 0 0; font-size: 16px;">Une nouvelle demande d'inscription a été soumise sur votre portail.</p>
          </div>
          
          <div style="padding: 30px 40px; background-color: #ffffff;">
            
            <div style="background: #fdfaf2; padding: 25px; border-radius: 10px; border-left: 5px solid #DEB833; margin-bottom: 35px;">
              <h3 style="margin: 0 0 15px 0; color: #332E32; font-size: 18px; display: flex; align-items: center;">Contacts Rapides</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 15px;">
                <tr>
                  <td width="30%" style="padding: 6px 0; color: #555;">Email :</td>
                  <td width="70%" style="padding: 6px 0;"><strong><a href="mailto:${_replyto}" style="color: #DEB833; text-decoration: none;">${_replyto || 'Non fourni'}</a></strong></td>
                </tr>
                <tr>
                  <td width="30%" style="padding: 6px 0; color: #555;">Téléphone :</td>
                  <td width="70%" style="padding: 6px 0;"><strong>${formData.telephonePrincipal || 'Non fourni'}</strong></td>
                </tr>
                <tr>
                  <td width="30%" style="padding: 6px 0; color: #555;">WhatsApp :</td>
                  <td width="70%" style="padding: 6px 0;"><strong>${formData.whatsapp || 'Non fourni'}</strong></td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 30px;">
              ${summaryHtml}
            </div>

            <div style="background: #332E32; color: #fff; padding: 25px; border-radius: 10px; text-align: center; margin-top: 40px;">
              <p style="margin: 0; font-size: 15px; line-height: 1.5;">
                <span style="color: #DEB833; font-weight: bold; font-size: 16px; display: block; margin-bottom: 8px;">Le document PDF contractuel est joint à cet email.</span>
                Veuillez contacter ce client pour finaliser son inscription.
              </p>
            </div>
            
          </div>
          
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">
            <p style="margin: 0;">Ceci est un message automatique généré par le portail DM+ Invest.</p>
          </div>
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
      from: 'investment@dmplus-group.com', // Doit être l'adresse authentifiée sur LWS
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
              <a href="mailto:investment@dmplus-group.com" style="color: #DEB833;">investment@dmplus-group.com</a><br>
              <a href="https://www.dmplus-group.com" style="color: #DEB833;">www.dmplus-group.com</a>
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
