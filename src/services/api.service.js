// Endpoint fixe et simplifié — plus de logique complexe source d'erreurs
const SUBMISSIONS_ENDPOINT = 'https://dmplus-investment-back.onrender.com/api/v1/submissions';

export const getSubmissionsFromBackend = async () => {
  const response = await fetch(SUBMISSIONS_ENDPOINT, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });
  if (!response.ok) throw new Error(`Erreur HTTP GET: ${response.status}`);
  return response.json();
};

export const submitFormToBackend = async (data, file = null) => {
  // Copie des données avec correction de la casse (camelCase → backend)
  const mappedData = { ...data };

  // Renommage membreBRVM → membreBrvm, hasSGIAccount → hasSgiAccount, etc.
  if ('membreBRVM' in mappedData) { mappedData.membreBrvm = mappedData.membreBRVM; delete mappedData.membreBRVM; }
  if ('hasSGIAccount' in mappedData) { mappedData.hasSgiAccount = mappedData.hasSGIAccount; delete mappedData.hasSGIAccount; }
  if ('selectedSGI' in mappedData) { mappedData.selectedSgi = mappedData.selectedSGI; delete mappedData.selectedSGI; }
  if ('wantsSGIAssistance' in mappedData) { mappedData.wantsSgiAssistance = mappedData.wantsSGIAssistance; delete mappedData.wantsSGIAssistance; }

  // Conversion OUI/NON → true/false (les radio buttons du formulaire stockent des strings)
  const ouiNonToBoolean = (val) => {
    if (val === 'OUI') return true;
    if (val === 'NON') return false;
    return val; // laisser tel quel si déjà boolean ou null
  };
  mappedData.hasSgiAccount = ouiNonToBoolean(mappedData.hasSgiAccount);
  mappedData.wantsSgiAssistance = ouiNonToBoolean(mappedData.wantsSgiAssistance);
  if ('membreBrvm' in mappedData) mappedData.membreBrvm = ouiNonToBoolean(mappedData.membreBrvm);

  // Le PDF joint les tableaux en String ("Actions, Obligations").
  // Le backend Spring Boot exige des List<String> → on reconvertit.
  ['instrumentsExp', 'patrimoineExistant', 'servicesSouhaites'].forEach(field => {
    const val = mappedData[field];
    if (typeof val === 'string') {
      mappedData[field] = val.trim() === '' ? [] : val.split(',').map(s => s.trim()).filter(Boolean);
    } else if (!Array.isArray(val)) {
      mappedData[field] = [];
    }
  });

  // Nettoyer uniquement les chaînes vides ("") — garder null, false, 0, et les tableaux vides []
  const cleanData = {};
  
  // Champs spécifiques au frontend à ne pas envoyer au backend (pour éviter les erreurs 500 UnrecognizedPropertyException)
  const frontendOnlyFields = [
    'accepteConditions', 'accepteConditions2', 'accepteConditions3', 'accepteConditions4', 'luConditionsStep1'
  ];

  Object.keys(mappedData).forEach(key => {
    if (mappedData[key] !== undefined && mappedData[key] !== '' && !frontendOnlyFields.includes(key)) {
      cleanData[key] = mappedData[key];
    }
  });

  console.log('Données envoyées au backend :', JSON.stringify(cleanData, null, 2));

  const formData = new FormData();
  // Le backend attend une part nommée "data" contenant le JSON avec Content-Type application/json
  formData.append('data', new Blob([JSON.stringify(cleanData)], { type: 'application/json' }));

  // PDF joint sous le nom "image" (champ attendu par le backend)
  if (file) formData.append('image', file, file.name);

  const response = await fetch(SUBMISSIONS_ENDPOINT, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Erreur backend :', errorText);
    throw new Error(`Erreur HTTP POST: ${response.status} - ${errorText}`);
  }

  return response.json();
};
