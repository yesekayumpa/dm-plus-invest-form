// URL de base de l'API (configurée dans .env via VITE_API_URL)
// Exemple : VITE_API_URL=https://dmplus-investment-back.onrender.com/api/
const BASE_URL = (import.meta.env.VITE_API_URL || 'https://dmplus-investment-back.onrender.com/api/v1').replace(/\/+$/, '');

// Construction intelligente de l'endpoint
let SUBMISSIONS_ENDPOINT = `${BASE_URL}/submissions`;
if (!BASE_URL.endsWith('/v1') && !BASE_URL.endsWith('/v1/')) {
  SUBMISSIONS_ENDPOINT = BASE_URL.endsWith('/api') 
    ? `${BASE_URL}/v1/submissions` 
    : `${BASE_URL}/api/v1/submissions`;
}

export const getSubmissionsFromBackend = async () => {
  const response = await fetch(SUBMISSIONS_ENDPOINT, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP GET: ${response.status}`);
  }

  return response.json();
};

export const submitFormToBackend = async (data) => {
  // Mapping exact des données pour le back-end de DM+ Invest
  const mappedData = {
    ...data,
    membreBrvm: data.membreBRVM,
    hasSgiAccount: data.hasSGIAccount,
    selectedSgi: data.selectedSGI,
    wantsSgiAssistance: data.wantsSGIAssistance
  };
  
  // Suppression des anciennes clés avec la mauvaise casse pour éviter les conflits
  delete mappedData.membreBRVM;
  delete mappedData.hasSGIAccount;
  delete mappedData.selectedSGI;
  delete mappedData.wantsSGIAssistance;

  const response = await fetch(SUBMISSIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(mappedData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Détails de l'erreur 400 renvoyée par le serveur :", errorText);
    throw new Error(`Erreur HTTP POST: ${response.status} - ${errorText}`);
  }

  return response.json();
};
