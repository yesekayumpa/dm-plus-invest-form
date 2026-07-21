import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  console.log('--- RÉPONSE CLIENT REÇUE SUR VERCEL SERVERLESS ---');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const { clientEmail, clientName, subject, message } = req.body;

    // Validation des champs obligatoires
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
        error: 'Veuillez écrire un message avant d\'envoyer',
      });
    }

    // Transporteur SMTP (identique à send-email.js)
    const transporter = nodemailer.createTransport({
      host: 'mail.dmplus-group.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'investment@dmplus-group.com',
        pass: process.env.EMAIL_PASS,
      },
    });

    const companyEmail = 'investment@dmplus-group.com';
    const replySubject = subject
      ? `Réponse client : ${subject}`
      : `Message de ${clientName || clientEmail}`;

    // Email envoyé à l'entreprise avec le message du client
    const mailOptions = {
      from: '"DM+ INVESTMENT" <investment@dmplus-group.com>',                    // Expéditeur authentifié sur LWS
      to: companyEmail,                      // Destinataire : l'entreprise
      replyTo: clientEmail,                  // Répondre directement au client
      subject: replySubject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #332E32 0%, #DEB833 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #fff; margin: 0; font-size: 22px;">Message d'un client</h2>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0;">Réponse reçue via le portail DM+ Invest</p>
          </div>

          <div style="background: #f8fafc; padding: 25px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">

            <div style="background: #fff; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #DEB833; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #666;"> Informations du client</p>
              <p style="margin: 6px 0 0; font-size: 16px; font-weight: bold; color: #332E32;">
                ${clientName || 'Nom non fourni'}
              </p>
              <p style="margin: 2px 0 0; color: #DEB833;">
                <a href="mailto:${clientEmail}" style="color: #DEB833; text-decoration: none;">${clientEmail}</a>
              </p>
            </div>

            <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 20px;">
              <h3 style="color: #332E32; margin-top: 0; font-size: 15px;">Message du client :</h3>
              <p style="white-space: pre-wrap; color: #444; line-height: 1.7; margin: 0;">
                ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
              </p>
            </div>

            <div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; font-size: 13px; color: #DEB833;">
                <strong>Action requise :</strong> Répondez directement à cet email pour contacter
                <strong>${clientName || 'le client'}</strong> à l'adresse
                <a href="mailto:${clientEmail}" style="color: #DEB833;">${clientEmail}</a>.
              </p>
            </div>

            <hr style="margin: 25px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
              Message transmis automatiquement par le portail DM+ Invest
            </p>
          </div>
        </div>
      `,
      text: `
Message d'un client - DM+ Invest
===================================
Client : ${clientName || 'Non fourni'}
Email  : ${clientEmail}

Message :
${message}

---
Pour répondre, utilisez l'adresse : ${clientEmail}
      `,
    };

    console.log('Envoi du message client vers l\'entreprise...');
    await transporter.sendMail(mailOptions);
    console.log('Message transmis avec succès à', companyEmail);

    // Email de confirmation envoyé au client
    const confirmationOptions = {
      from: '"DM+ INVESTMENT" <investment@dmplus-group.com>',
      to: clientEmail,
      replyTo: companyEmail,
      subject: 'Votre message a bien été reçu - DM+ Invest',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #332E32 0%, #DEB833 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #fff; margin: 0; font-size: 22px;"> Message bien reçu</h2>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0;">DM+ Invest vous confirme la réception</p>
          </div>

          <div style="background: #f8fafc; padding: 25px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p>Bonjour <strong>${clientName || ''}</strong>,</p>
            <p>
              Nous avons bien reçu votre message et notre équipe vous répondra dans les meilleurs délais.
            </p>

            <div style="background: #fff; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #DEB833; margin: 20px 0;">
              <p style="margin: 0; font-size: 13px; color: #666;">Votre message :</p>
              <p style="white-space: pre-wrap; color: #444; margin: 8px 0 0; font-style: italic;">
                "${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"
              </p>
            </div>

            <p>Pour toute urgence, vous pouvez nous contacter directement :</p>
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
      text: `
Bonjour ${clientName || ''},

Nous avons bien reçu votre message et notre équipe vous répondra dans les meilleurs délais.

Votre message : "${message}"

Email : investment@dmplus-group.com
Téléphone : + 33 829 58 06 / 221 76 663 82 19

Cordialement,
L'équipe DM+ Invest
      `,
    };

    console.log('Envoi de la confirmation au client:', clientEmail);
    await transporter.sendMail(confirmationOptions);
    console.log('Confirmation envoyée avec succès');

    return res.status(200).json({
      success: true,
      message: 'Message envoyé avec succès. Vous recevrez une réponse sous peu.',
    });

  } catch (error) {
    console.error('ERREUR reply-email:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi du message',
      error: error.message,
    });
  }
}
