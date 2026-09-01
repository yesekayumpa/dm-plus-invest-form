/**
 * Script de test pour la configuration email LWS
 * Exécutez avec: node test-lws-email.js
 */

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

async function testLWSEmailConfig() {
  console.log('=== Test de configuration Email LWS ===\n');
  
  // Affichage de la configuration
  console.log('Configuration SMTP:');
  console.log(`Host: ${process.env.EMAIL_HOST}`);
  console.log(`Port: ${process.env.EMAIL_PORT}`);
  console.log(`User: ${process.env.EMAIL_USER}`);
  console.log(`Secure: ${parseInt(process.env.EMAIL_PORT || '465') === 465}`);
  console.log('');

  try {
    // Création du transporteur avec configuration LWS
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'mail.dmplus-group.com',
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: parseInt(process.env.EMAIL_PORT || '465') === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // Essentiel pour LWS
      },
      debug: true // Active le mode debug
    });

    console.log('1. Test de connexion au serveur SMTP...');
    await transporter.verify();
    console.log('✅ Connexion SMTP réussie!\n');

    // Test d'envoi à l'entreprise
    console.log('2. Test d\'envoi à l\'entreprise...');
    const companyMail = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'TEST LWS - Configuration Email',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Test de configuration Email LWS</h2>
          <p>Ceci est un email de test pour vérifier la configuration SMTP sur LWS.</p>
          <p><strong>Configuration:</strong></p>
          <ul>
            <li>Host: ${process.env.EMAIL_HOST}</li>
            <li>Port: ${process.env.EMAIL_PORT}</li>
            <li>User: ${process.env.EMAIL_USER}</li>
          </ul>
          <p>Si vous recevez cet email, la configuration est correcte!</p>
          <hr>
          <p style="font-size: 12px; color: #666;">
            Test automatique - ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      `
    });
    console.log('✅ Email envoyé à l\'entreprise!');
    console.log(`Message ID: ${companyMail.messageId}\n`);

    // Test d'envoi à un email de test (remplacez par votre email personnel)
    const testEmail = process.env.EMAIL_USER; // Utilise le même email pour le test
    console.log(`3. Test d'envoi à un client de test (${testEmail})...`);
    
    const clientMail = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: testEmail,
      subject: 'TEST LWS - Email de confirmation client',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Test Email de Confirmation</h2>
          <p>Ceci simule l'email de confirmation envoyé aux clients.</p>
          <p><strong>Votre inscription a été reçue avec succès.</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Prochaines étapes :</h3>
            <ol>
              <li>Notre équipe examine votre dossier</li>
              <li>Nous vous contacterons par téléphone ou email</li>
              <li>Finalisation de votre compte d'investissement</li>
            </ol>
          </div>
          <p style="margin-top: 30px;">
            <strong>Cordialement,<br>L'équipe DM+ Invest</strong>
          </p>
        </div>
      `
    });
    console.log('✅ Email de confirmation envoyé au client de test!');
    console.log(`Message ID: ${clientMail.messageId}\n`);

    console.log('=== Tous les tests sont réussis! ===');
    console.log('La configuration email LWS est fonctionnelle.');

  } catch (error) {
    console.error('❌ Erreur lors du test:');
    console.error('Message:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('\n🔧 Solution: Vérifiez vos identifiants EMAIL_USER et EMAIL_PASS dans le fichier .env');
    } else if (error.code === 'ECONNECTION') {
      console.error('\n🔧 Solution: Vérifiez EMAIL_HOST et EMAIL_PORT, et que le pare-feu LWS autorise les connexions SMTP');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('\n🔧 Solution: Le serveur SMTP ne répond pas. Contactez le support LWS');
    }
    
    process.exit(1);
  }
}

// Exécuter le test
testLWSEmailConfig().then(() => {
  console.log('\nTest terminé avec succès.');
  process.exit(0);
}).catch((error) => {
  console.error('Erreur fatale:', error);
  process.exit(1);
});