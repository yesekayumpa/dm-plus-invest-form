const EMAIL_ENDPOINT = 'https://dmplus-investment-back.onrender.com/api/v1/email/send';

export const sendEmail = async (emailData) => {
  try {
    const formData = new FormData();
    
    // Champs requis
    formData.append('à', emailData.to);
    formData.append('sujet', emailData.subject);
    formData.append('corps', emailData.body);
    
    // Champs optionnels
    if (emailData.cc && emailData.cc.length > 0) {
      emailData.cc.forEach(ccEmail => {
        formData.append('cc', ccEmail);
      });
    }
    
    // html: true par défaut
    formData.append('html', emailData.html !== undefined ? emailData.html : true);
    
    // Pièce jointe si présente
    if (emailData.attachment) {
      formData.append('pièce jointe', emailData.attachment);
    }
    
    const response = await fetch(EMAIL_ENDPOINT, {
      method: 'POST',
      body: formData
      // NE PAS mettre de header Content-Type manuel - le navigateur le génère automatiquement avec la boundary
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur backend email:', errorText);
      throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
    }
    
    const contentType = response.headers.get("content-type");
    let result;
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = await response.text();
    }
    
    return { success: true, message: 'Email envoyé avec succès', data: result };
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { success: false, message: error.message || 'Erreur lors de l\'envoi de l\'email' };
  }
};
