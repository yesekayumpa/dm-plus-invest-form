// URL de base de l'API (configurée dans .env via VITE_API_URL)
// Exemple : VITE_API_URL=https://dmplus-investment-back.onrender.com/api/
const BASE_URL = (import.meta.env.VITE_API_URL || 'https://dmplus-investment-back.onrender.com/api').replace(/\/+$/, '');

// Construction de l'endpoint submissions
const SUBMISSIONS_ENDPOINT = `${BASE_URL}/v1/submissions`;

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
  const response = await fetch(SUBMISSIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP POST: ${response.status}`);
  }

  return response.json();
};
