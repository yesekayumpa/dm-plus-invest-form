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
  // Mapping pour forcer les données dans le format attendu par le back-end (Masterclass)
  const mappedData = {
    nomPrenom: `${data.prenom || ''} ${data.nom || ''}`.trim(),
    email: data.email || "",
    adresse: data.adresse || "",
    telephone: data.telephonePrincipal || "",
    profession: data.profession || "",
    statut: data.statut ? data.statut.toUpperCase() : "AUTRE",
    
    // Champs obligatoires pour passer la validation du back-end actuel
    outils: ["Excel"],
    autreOutil: "Source: Formulaire Investissement",
    autreOutilApprendre: null,
    niveauProgrammation: "INTERMEDIAIRE1",
    niveauExcel: "INTERMEDIAIRE",
    niveauR: "INTERMEDIAIRE2",
    connaitShiny: "OUI",
    experienceProvisionnement: "OUI",
    // On sauvegarde les vraies données d'investissement dans le champ attentes (texte libre)
    attentes: `Investissement - Capital: ${data.capitalInvestir || 'N/A'}, Horizon: ${data.horizonInvestissement || 'N/A'}, Risque: ${data.toleranceRisque || 'N/A'}`,
    participeEdition2: "OUI"
  };

  const response = await fetch(SUBMISSIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(mappedData)
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP POST: ${response.status}`);
  }

  return response.json();
};
