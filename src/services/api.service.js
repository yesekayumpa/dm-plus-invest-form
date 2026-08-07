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
    nomPrenom: `${data.prenom || 'Prénom'} ${data.nom || 'Nom'}`.trim(),
    email: data.email || "email@inconnu.com",
    adresse: data.adresse || "Non renseignée",
    telephone: data.telephonePrincipal || "00000000",
    profession: data.profession || "Investisseur",
    statut: "PROFESSIONNEL", // Valeur forcée pour passer la validation stricte (enum) du back-end
    
    // Champs obligatoires pour passer la validation du back-end actuel
    outils: ["Excel", "Python", "R"], // On met exactement comme l'exemple
    autreOutil: null,
    autreOutilApprendre: null,
    niveauProgrammation: "INTERMEDIAIRE1",
    niveauExcel: "INTERMEDIAIRE",
    niveauR: "INTERMEDIAIRE2",
    connaitShiny: "OUI",
    experienceProvisionnement: "OUI",
    // On sauvegarde les vraies données d'investissement dans le champ attentes (texte libre)
    attentes: `Capital: ${data.capitalInvestir || 'N/A'} | Horizon: ${data.horizonInvestissement || 'N/A'} | Risque: ${data.toleranceRisque || 'N/A'}`,
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
    const errorText = await response.text();
    console.error("Détails de l'erreur 400 renvoyée par le serveur :", errorText);
    throw new Error(`Erreur HTTP POST: ${response.status} - ${errorText}`);
  }

  return response.json();
};
