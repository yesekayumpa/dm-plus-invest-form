import React, { useState } from 'react';
import { sendEmail } from '../services/emailService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    subject: '',
    body: '',
    attachment: null,
    html: true
  });
  
  const [loading, setLoading] = useState(false);
  const [slowConnection, setSlowConnection] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSlowConnection(false);
    setMessage({ type: '', text: '' });

    // Timer pour détecter une connexion lente (Render en veille)
    const slowConnectionTimer = setTimeout(() => {
      setSlowConnection(true);
    }, 5000);

    try {
      // Préparer les données
      const emailData = {
        to: formData.to,
        cc: formData.cc ? formData.cc.split(',').map(email => email.trim()).filter(Boolean) : [],
        subject: formData.subject,
        body: formData.body,
        html: formData.html,
        attachment: formData.attachment
      };

      const result = await sendEmail(emailData);
      
      clearTimeout(slowConnectionTimer);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Email envoyé avec succès !' });
        // Réinitialiser le formulaire
        setFormData({
          to: '',
          cc: '',
          subject: '',
          body: '',
          attachment: null,
          html: true
        });
      } else {
        setMessage({ type: 'error', text: result.message || 'Erreur lors de l\'envoi de l\'email' });
      }
    } catch (error) {
      clearTimeout(slowConnectionTimer);
      setMessage({ type: 'error', text: error.message || 'Une erreur est survenue' });
    } finally {
      setLoading(false);
      setSlowConnection(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Formulaire de Contact</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {slowConnection && (
        <div className="slow-connection-warning">
          Envoi en cours, cela peut prendre quelques secondes (le service Render peut être en veille)...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="to">Destinataire (à) *</label>
          <input
            type="email"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cc">CC (séparé par des virgules)</label>
          <input
            type="text"
            id="cc"
            name="cc"
            value={formData.cc}
            onChange={handleChange}
            disabled={loading}
            placeholder="email1@example.com, email2@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Sujet *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Corps du message *</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            disabled={loading}
            rows={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="attachment">Pièce jointe</label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="html"
              checked={formData.html}
              onChange={handleChange}
              disabled={loading}
            />
            Format HTML
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`submit-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Envoi en cours...' : 'Envoyer l\'email'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
