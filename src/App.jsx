import {
  ArrowLeft, ArrowRight, Check, Crown, Lock, Shield, Sparkles, Target, User, Wallet, Phone, MapPin, Building2, CreditCard, Briefcase, Star, TrendingUp, Users, Quote, ChevronDown, ExternalLink, Globe, Layers, FileText, Layout, Scale, Zap
} from "lucide-react";
import { Fragment, useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import MembershipConditions from "./components/MembershipConditions";
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from './components/PdfDocument';
import './styles/screen-1920.css';

const HERO_IMAGE_SRC = "/samsung.jpg";
const LOGO_DARK_SRC = "/LOGOTYPE 10.png";
const translations = {
  FR: {
    institution: "Institution d'Élite",
    excellence: "Excellence",
    marchés: "Marchés",
    produits: "Produits",
    analyses: "Analyses",
    propos: "À Propos",
    servicesBancaires: "Services Bancaires",
    gestionFortune: "Gestion de Fortune",
    espacePrivé: "Espace Privé",
    heroTitle: "BÂTISSEZ VOTRE",
    heroProsperity: "PROSPÉRITÉ",
    heroExcellence: "SUR L'EXCELLENCE.",
    heroDesc: "L'intelligence financière d'élite pour vos investissements sur la BRVM.",
    heroDescFull: "Accédez aux opportunités de la BRVM avec l'intelligence d'une institution d'élite.",
    startBtn: "Démarrer l'adhésion",
    startBtnFull: "Commencer mon adhésion",
    profilInvestisseur: "PROFIL INVESTISSEUR & OBJECTIFS",
    experienceInvestissement: "Expérience en investissement",
    debutant: "Débutant - aucune expérience préalable",
    initie: "Initié - quelques notions de base",
    intermediaire: "Intermédiaire - j'ai déjà investi",
    confirme: "Confirmé - je gère un portefeuille actif",
    horizonInvestissement: "Horizon d'investissement principal",
    courtTerme: "Court terme (< 1 an)",
    moyenTerme: "Moyen terme (1 à 3 ans)",
    longTerme: "Long terme (3 à 7 ans)",
    tresLongTerme: "Très long terme (+ 7 ans)",
    objectifsPatrimoniaux: "Objectifs patrimoniaux (plusieurs choix possibles)",
    constitutionEpargne: "Constitution d'une épargne",
    transmissionPatrimoniale: "Transmission patrimoniale",
    investissementBRVM: "Investissement BRVM",
    financementImmobilier: "Financement immobilier",
    preparationRetraite: "Préparation de la retraite",
    optimisationFiscale: "Optimisation fiscale",
    diversificationPatrimoine: "Diversification du patrimoine",
    protectionFamille: "Protection de la famille",
    toleranceRisque: "Tolérance au risque",
    prudent: "Prudent - Préservation du capital, rendement modéré",
    equilibre: "Équilibré - Mix sécurité / performance",
    dynamique: "Dynamique - Recherche de performance, tolérance à la volatilité",
    agressif: "Agressif - Maximisation des rendements, forte prise de risque",
    instrumentsFinanciers: "Instruments financiers",
    discoverExcellence: "Découvrir l'Excellence",
    rendementMoyen: "Rendement Moyen",
    rendement: "Rendement",
    années: "Années",
    clients: "Clients",
    success: "SUCCÈS.",
    successDesc: "Votre dossier a été transmis à nos équipes de gestion. Un accusé de réception vous sera envoyé par email.",
    adhérerMaintenant: "Adhérer maintenant",
    dossierElite: "DOSSIER ÉLITE",
    dossierInvestisseur: "OFFRE D'INVESTISSEMENT",
    étapeSuivante: "ÉTAPE SUIVANTE",
    soumettreDossier: "SOUMETTRE MON DOSSIER",
    identiteCivile: "Identité Civile",
    nom: "Nom",
    prenom: "Prénom(s)",
    dateNaissance: "Né(e) le",
    lieuNaissance: "Lieu de naissance",
    nationalite: "Nationalité",
    contact: "Contact",
    email: "Email",
    telephonePrincipal: "Téléphone Principal",
    telephoneSecondaire: "Téléphone Secondaire",
    whatsapp: "WhatsApp",
    residenceActuelle: "Résidence Actuelle",
    ville: "Ville",
    pays: "Pays",
    adresse: "Adresse Complète",
    codePostal: "Code Postal",
    situationPro: "Situation professionnelle",
    statut: "Statut",
    profession: "Profession / Secteur d'activité",
    employeur: "Employeur / Entreprise",
    telPro: "Téléphone professionnel (facultatif)",
    profilClient: "Profil client",
    particulier: "Particulier",
    particulierDesc: "valorisation d'épargne personnelle",
    professionnel: "Professionnel / Entrepreneur",
    professionnelDesc: "placement de trésorerie d'entreprise",
    debutant: "Investisseur débutant",
    debutantDesc: "premier accompagnement structuré",
    diaspora: "Diaspora africaine",
    diasporaDesc: "investissement dans la région d'origine",
    profilRisque: "Profil Risque",
    objectif: "Objectif",
    horizon: "Horizon",
    experience: "Expérience",
    tolerance: "Tolérance Risque",
    capitalInstruments: "Capital & Instruments",
    capitalInvestir: "Capital à investir (FCFA)",
    instruments: {
      actions: "Actions",
      obligations: "Obligations",
      fcp: "FCP"
    },
    statuts: {
      salarie: "Salarié",
      entrepreneur: "Entrepreneur",
      liberal: "Libéral",
      retraite: "Retraité",
      autre: "Autre"
    },
    options: {
      capital: "Capital",
      croissance: "Croissance",
      dynamique: "Dynamique",
      court: "Court",
      long: "Long",
      expert: "Expert",
      basse: "Basse",
      moyenne: "Moyenne",
      elevee: "Élevée"
    },
    select: "Sélectionner...",
    paysList: {
      senegal: "Sénégal",
      coteIvoire: "Côte d'Ivoire",
      mali: "Mali",
      burkina: "Burkina Faso",
      benin: "Bénin",
      togo: "Togo",
      niger: "Niger",
      guinee: "Guinée",
      guineeBissau: "Guinée-Bissau",
      mauritanie: "Mauritanie",
      cameroun: "Cameroun",
      gabon: "Gabon",
      congo: "Congo",
      rdc: "République Démocratique du Congo",
      centrafricaine: "République Centrafricaine",
      tchad: "Tchad",
      nigeria: "Nigeria",
      ghana: "Ghana",
      liberia: "Liberia",
      sierraLeone: "Sierra Leone",
      guineeEquatoriale: "Guinée Équatoriale",
      saotome: "São Tomé et Principe",
      capVert: "Cap-Vert",
      comores: "Comores",
      madagascar: "Madagascar",
      maurice: "Maurice",
      seychelles: "Seychelles",
      djibouti: "Djibouti",
      erythree: "Érythrée",
      ethiopie: "Éthiopie",
      kenya: "Kenya",
      somalie: "Somalie",
      soudan: "Soudan",
      soudanSud: "Soudan du Sud",
      ouganda: "Ouganda",
      tanzanie: "Tanzanie",
      rwanda: "Rwanda",
      burundi: "Burundi",
      angola: "Angola",
      botswana: "Botswana",
      lesotho: "Lesotho",
      malawi: "Malawi",
      mozambique: "Mozambique",
      namibie: "Namibie",
      afriqueSud: "Afrique du Sud",
      eswatini: "Eswatini",
      zambie: "Zambie",
      zimbabwe: "Zimbabwe",
      maroc: "Maroc",
      algerie: "Algérie",
      tunisie: "Tunisie",
      libye: "Libye",
      egypte: "Égypte",
      france: "France",
      belgique: "Belgique",
      suisse: "Suisse",
      canada: "Canada",
      etatsUnis: "États-Unis",
      royaumeUni: "Royaume-Uni",
      allemagne: "Allemagne",
      espagne: "Espagne",
      italie: "Italie",
      portugal: "Portugal",
      paysBas: "Pays-Bas",
      autriche: "Autriche",
      suede: "Suède",
      norvege: "Norvège",
      danemark: "Danemark",
      finlande: "Finlande",
      russie: "Russie",
      chine: "Chine",
      japon: "Japon",
      coreeSud: "Corée du Sud",
      inde: "Inde",
      bresil: "Brésil",
      argentine: "Argentine",
      mexique: "Mexique",
      australie: "Australie",
      autre: "Autre"
    },
    secu: "SÉCURITÉ INSTITUTIONNELLE",
    excellencePatrimoniale: "L'Excellence Patrimoniale",
    solutionsInvestissement: "Solutions d'investissement sur mesure à la BRVM",
    typePiece: "Type de Pièce",
    numeroPiece: "Numéro de Pièce",
    cin: "CNI",
    passeport: "Passeport",
    autre: "Autre",
    validationFinale: "Validation Finale",
    iban: "RIB / IBAN",
    depotInitial: "Dépôt Initial",
    certification: "Je déclare que les informations fournies dans ce formulaire sont exactes, complètes et sincères. Je m'engage à informer DM+ Investment de tout changement de ma situation.",
    certification2: "J'ai pris connaissance de l'offre de services DM+ Investment, des conditions générales et de la grille tarifaire, et j'accepte les termes de la formule sélectionnée.",
    certification3: "J'autorise DM+ Investment à collecter, conserver et traiter mes données personnelles dans le strict cadre de la relation contractuelle, conformément à la réglementation en vigueur.",
    certification4: "Je certifie avoir été informé(e) des risques liés à l'investissement sur les marchés financiers. Les performances passées ne préjugent pas des performances futures.",
    conditions: "conditions d'adhésion",
    agréeUemoa: "Agréé UEMOA",
    institutionAgrée: "Institution Agréée",
    retour: "RETOUR",
    jeConfirmeLecture: "Je confirme avoir pris connaissance des conditions d'adhésion et je souhaite continuer le remplissage du formulaire",
    subIdentite: "Vos informations personnelles",
    subContact: "Vos coordonnées et moyens de contact",
    subResidence: "Votre adresse et lieu de résidence",
    subSituationPro: "Votre activité et revenus professionnels",
    subProfil: "Définissez votre profil pour une stratégie personnalisée",
    subCapital: "Définissez votre capacité d'investissement et vos instruments",
    plusieursChoix: "Plusieurs choix",
    subRisquePrudent: "Faible risque",
    subRisqueEquilibre: "Risque modéré",
    subRisqueDynamique: "Risque élevé",
    subRisqueAgressif: "Risque maximal",
    subActions: "BRVM & marché",
    subObligations: "Revenus fixes",
    subFCP: "Fonds collectifs",
    excellenceCertifiee: "Excellence Certifiée",
    sidePanelTitle: "L'EXCELLENCE",
    sidePanelAccent: "FINANCIÈRE",
    sidePanelSuffix: "À VOTRE PORTÉE.",
    sidePanelDesc: "Nous combinons intelligence de marché et exécution d'élite pour optimiser votre patrimoine sur la BRVM.",
    secu2: "SÉCURITÉ INSTITUTIONNELLE",
    secuDesc: "Agréé par les autorités de l'UEMOA",
    objectifsPerso: "OBJECTIFS PERSONNALISÉS",
    objectifsPersoDesc: "Stratégies sur mesure haute performance",
    stepOffres: "Offres",
    stepIdentite: "Identité",
    stepContact: "Contact",
    stepResidence: "Résidence",
    stepCarriere: "Carrière",
    stepProfil: "Profil",
    stepCapital: "Capital",
    alertSelectOffer: "Veuillez sélectionner une formule d'abonnement avant de continuer.",
    fermer: "Fermer",
    emailError: "Veuillez entrer une adresse email valide",
    emailRequired: "Email requis",
    errorMessage: "Erreur",
    emailSubject: "Inscription Elite Light DM+ Invest",
    pdfFilenamePrefix: "Convention"
  },
  EN: {
    institution: "Elite Institution",
    excellence: "Excellence",
    marchés: "Markets",
    produits: "Products",
    analyses: "Analysis",
    propos: "About Us",
    servicesBancaires: "Banking Services",
    gestionFortune: "Wealth Management",
    espacePrivé: "Private Area",
    heroTitle: "BUILD YOUR",
    heroProsperity: "PROSPERITY",
    heroExcellence: "ON EXCELLENCE.",
    heroDesc: "Elite financial intelligence for your investments on the BRVM.",
    heroDescFull: "Access BRVM opportunities with the intelligence of an elite institution.",
    startBtn: "Start Membership",
    startBtnFull: "Start my membership",
    profilInvestisseur: "INVESTOR PROFILE & OBJECTIVES",
    experienceInvestissement: "Investment experience",
    debutant: "Beginner - no prior experience",
    initie: "Initiated - some basic notions",
    intermediaire: "Intermediate - I have already invested",
    confirme: "Confirmed - I manage an active portfolio",
    horizonInvestissement: "Main investment horizon",
    courtTerme: "Short term (< 1 year)",
    moyenTerme: "Medium term (1 to 3 years)",
    longTerme: "Long term (3 to 7 years)",
    tresLongTerme: "Very long term (+ 7 years)",
    objectifsPatrimoniaux: "Asset objectives (multiple choices possible)",
    constitutionEpargne: "Constitution of savings",
    transmissionPatrimoniale: "Wealth transfer",
    investissementBRVM: "BRVM Investment",
    financementImmobilier: "Real estate financing",
    preparationRetraite: "Retirement preparation",
    optimisationFiscale: "Tax optimization",
    diversificationPatrimoine: "Wealth diversification",
    protectionFamille: "Family protection",
    toleranceRisque: "Risk tolerance",
    prudent: "Prudent - Capital preservation, moderate return",
    equilibre: "Balanced - Mix of security / performance",
    dynamique: "Dynamic - Performance seeking, volatility tolerance",
    agressif: "Aggressive - Maximizing returns, high risk taking",
    instrumentsFinanciers: "Financial instruments",
    discoverExcellence: "Discover Excellence",
    rendementMoyen: "Average Return",
    rendement: "Return",
    années: "Years",
    clients: "Clients",
    success: "SUCCESS.",
    successDesc: "Your file has been sent to our management teams. An acknowledgment will be sent to you by email.",
    adhérerMaintenant: "Join Now",
    dossierElite: "ELITE FILE",
    dossierInvestisseur: "SELECT YOUR INVESTMENT OFFER",
    étapeSuivante: "NEXT STEP",
    soumettreDossier: "SUBMIT MY FILE",
    identiteCivile: "Civil Identity",
    nom: "Last Name",
    jeConfirmeLecture: "I confirm that I have read the membership conditions and I wish to continue filling out the form",
    prenom: "First Name(s)",
    dateNaissance: "Born on",
    lieuNaissance: "Place of birth",
    nationalite: "Nationality",
    contact: "Contact",
    email: "Email",
    telephonePrincipal: "Primary Phone",
    telephoneSecondaire: "Secondary Phone",
    whatsapp: "WhatsApp",
    residenceActuelle: "Current Residence",
    ville: "City",
    pays: "Country",
    adresse: "Full Address",
    codePostal: "Zip Code",
    situationPro: "Professional status",
    statut: "Status",
    profession: "Profession / Industry",
    employeur: "Employer / Company",
    telPro: "Work Phone (optional)",
    profilClient: "Client profile",
    particulier: "Individual",
    particulierDesc: "personal savings enhancement",
    professionnel: "Professional / Entrepreneur",
    professionnelDesc: "corporate treasury investment",
    debutant: "Beginner Investor",
    debutantDesc: "first structured support",
    diaspora: "African Diaspora",
    diasporaDesc: "investment in home region",
    profilRisque: "Risk Profile",
    objectif: "Objective",
    horizon: "Horizon",
    experience: "Experience",
    tolerance: "Risk Tolerance",
    capitalInstruments: "Capital & Instruments",
    capitalInvestir: "Capital to invest (FCFA)",
    instruments: {
      actions: "Stocks",
      obligations: "Bonds",
      fcp: "Mutual Funds"
    },
    statuts: {
      salarie: "Employee",
      entrepreneur: "Entrepreneur",
      liberal: "Freelance",
      retraite: "Retired",
      autre: "Other"
    },
    options: {
      capital: "Capital",
      croissance: "Growth",
      dynamique: "Dynamic",
      court: "Short Term",
      long: "Long Term",
      expert: "Expert",
      basse: "Low",
      moyenne: "Medium",
      elevee: "High"
    },
    select: "Select...",
    paysList: {
      senegal: "Senegal",
      coteIvoire: "Côte d'Ivoire",
      mali: "Mali",
      burkina: "Burkina Faso",
      benin: "Benin",
      togo: "Togo",
      niger: "Niger",
      guinee: "Guinea",
      guineeBissau: "Guinea-Bissau",
      mauritanie: "Mauritania",
      cameroun: "Cameroon",
      gabon: "Gabon",
      congo: "Congo",
      rdc: "Democratic Republic of Congo",
      centrafricaine: "Central African Republic",
      tchad: "Chad",
      nigeria: "Nigeria",
      ghana: "Ghana",
      liberia: "Liberia",
      sierraLeone: "Sierra Leone",
      guineeEquatoriale: "Equatorial Guinea",
      saotome: "São Tomé and Principe",
      capVert: "Cape Verde",
      comores: "Comoros",
      madagascar: "Madagascar",
      maurice: "Mauritius",
      seychelles: "Seychelles",
      djibouti: "Djibouti",
      erythree: "Eritrea",
      ethiopie: "Ethiopia",
      kenya: "Kenya",
      somalie: "Somalia",
      soudan: "Sudan",
      soudanSud: "South Sudan",
      ouganda: "Uganda",
      tanzanie: "Tanzania",
      rwanda: "Rwanda",
      burundi: "Burundi",
      angola: "Angola",
      botswana: "Botswana",
      lesotho: "Lesotho",
      malawi: "Malawi",
      mozambique: "Mozambique",
      namibie: "Namibia",
      afriqueSud: "South Africa",
      eswatini: "Eswatini",
      zambie: "Zambia",
      zimbabwe: "Zimbabwe",
      maroc: "Morocco",
      algerie: "Algeria",
      tunisie: "Tunisia",
      libye: "Libya",
      egypte: "Egypt",
      france: "France",
      belgique: "Belgium",
      suisse: "Switzerland",
      canada: "Canada",
      etatsUnis: "United States",
      royaumeUni: "United Kingdom",
      allemagne: "Germany",
      espagne: "Spain",
      italie: "Italy",
      portugal: "Portugal",
      paysBas: "Netherlands",
      autriche: "Austria",
      suede: "Sweden",
      norvege: "Norway",
      danemark: "Denmark",
      finlande: "Finland",
      russie: "Russia",
      chine: "China",
      japon: "Japan",
      coreeSud: "South Korea",
      inde: "India",
      bresil: "Brazil",
      argentine: "Argentina",
      mexique: "Mexico",
      australie: "Australia",
      autre: "Other"
    },
    secu: "INSTITUTIONAL SECURITY",
    excellencePatrimoniale: "Patrimonial Excellence",
    solutionsInvestissement: "Bespoke investment solutions on the BRVM",
    typePiece: "ID Type",
    numeroPiece: "ID Number",
    cin: "National ID Card",
    passeport: "Passport",
    autre: "Other",
    validationFinale: "Final Validation",
    iban: "RIB / IBAN",
    depotInitial: "Initial Deposit",
    certification: "I declare that the information provided in this form is accurate, complete and sincere. I undertake to inform DM+ Investment of any change in my situation.",
    certification2: "I have read the DM+ Investment service offering, the general conditions and the 2025 fee schedule, and I accept the terms of the selected formula.",
    certification3: "I authorize DM+ Investment to collect, store and process my personal data within the strict framework of the contractual relationship, in accordance with the regulations in force.",
    certification4: "I certify that I have been informed of the risks associated with investing in financial markets. Past performance does not prejudge future performance.",
    conditions: "membership conditions",
    agréeUemoa: "UEMOA Approved",
    institutionAgrée: "Approved Institution",
    retour: "BACK",
    subIdentite: "Your personal information",
    subContact: "Your contact details",
    subResidence: "Your address and place of residence",
    subSituationPro: "Your professional activity and income",
    subProfil: "Define your profile for a personalized strategy",
    subCapital: "Define your investment capacity and instruments",
    plusieursChoix: "Multiple choices",
    subRisquePrudent: "Low risk",
    subRisqueEquilibre: "Moderate risk",
    subRisqueDynamique: "High risk",
    subRisqueAgressif: "Maximum risk",
    subActions: "BRVM & market",
    subObligations: "Fixed income",
    subFCP: "Collective funds",
    excellenceCertifiee: "Certified Excellence",
    sidePanelTitle: "FINANCIAL",
    sidePanelAccent: "EXCELLENCE",
    sidePanelSuffix: "AT YOUR REACH.",
    sidePanelDesc: "We combine market intelligence and elite execution to optimize your wealth on the BRVM.",
    secu2: "INSTITUTIONAL SECURITY",
    secuDesc: "Approved by UEMOA authorities",
    objectifsPerso: "PERSONALIZED OBJECTIVES",
    objectifsPersoDesc: "Tailor-made high-performance strategies",
    stepOffres: "Offers",
    stepIdentite: "Identity",
    stepContact: "Contact",
    stepResidence: "Residence",
    stepCarriere: "Career",
    stepProfil: "Profile",
    stepCapital: "Capital",
    alertSelectOffer: "Please select a subscription plan before continuing.",
    fermer: "Close",
    emailError: "Please enter a valid email address",
    emailRequired: "Email required",
    errorMessage: "Error",
    emailSubject: "Elite Light DM+ Invest Registration",
    pdfFilenamePrefix: "Agreement"
  }
};

function dialFromPaysResidence(pays) {
  if (!pays) return null;
  const n = pays.toLowerCase();
  const entries = [
    ["senegal", "+221"], ["cote d", "+225"], ["ivoire", "+225"], ["burkina", "+226"],
    ["mali", "+223"], ["guinee", "+224"], ["mauritanie", "+222"], ["nigeria", "+234"],
    ["niger", "+227"], ["togo", "+228"], ["benin", "+229"], ["maroc", "+212"],
    ["algerie", "+213"], ["tunisie", "+216"], ["france", "+33"], ["belgique", "+32"]
  ];
  for (const [key, dial] of entries) if (n.includes(key)) return dial;
  return null;
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lang, setLang] = useState('FR');
  const t = translations[lang];
  const [secondaireDial, setSecondaireDial] = useState("+221");
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [showPdfDemo, setShowPdfDemo] = useState(false);
  
  const [formData, setFormData] = useState({
    nom: "", prenoms: "", dateNaissance: "", lieuNaissance: "", nationalite: "",
    typePiece: "", numeroPiece: "", email: "", telephonePrincipal: "", telephoneSecondaire: "",
    whatsapp: "", adresse: "", ville: "", paysResidence: "", codePostal: "",
    statutPro: "", professionSecActivite: "", employeur: "", telephonePro: "", profilClient: "",
    objectifPrincipal: "", horizonInvestissement: "", toleranceRisque: "",
    experienceInvestissement: "", instrumentsExp: [], revenus: "", capitalInvestir: "",
    patrimoineExistant: [], informationsComplementaires: "", servicesSouhaites: [],
    frequenceSuivi: "", modeConsultation: "", membreBRVM: "", iban: "",
    depotInitial: "", instructionsSpeciales: "", accepteConditions: false,
    accepteConditions2: false, accepteConditions3: false, accepteConditions4: false,
    luConditionsStep1: false, selectedOffer: "", modePaiement: "virement"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "accepteConditions" || name === "luConditionsStep1" || name === "accepteConditions2" || name === "accepteConditions3" || name === "accepteConditions4") setFormData(p => ({ ...p, [name]: checked }));
      else setFormData(p => {
        const arr = p[name] || [];
        return checked ? { ...p, [name]: [...arr, value] } : { ...p, [name]: arr.filter(i => i !== value) };
      });
    } else {
      let finalValue = value;
      
      // Restriction pour les numéros de téléphone et le capital (chiffres uniquement)
      const numericFields = ["telephonePrincipal", "telephoneSecondaire", "whatsapp", "telephonePro"];
      if (numericFields.includes(name)) {
        finalValue = value.replace(/\D/g, "");
      }

      setFormData(p => ({ ...p, [name]: finalValue }));
      
      // Clear errors when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
      
      // Validate email field
      if (name === "email" && value) {
        if (!validateEmail(value)) {
          setErrors(prev => ({ ...prev, email: t.emailError }));
        }
      }
      
      if (name === "paysResidence") {
        const d = dialFromPaysResidence(value);
        if (d) setSecondaireDial(d);
      }
    }
  };

  const handleOfferSelect = (offerId) => {
    // Sur mobile, activer automatiquement la confirmation des conditions quand une offre est sélectionnée
    const isMobile = window.innerWidth < 1024;
    setFormData(p => ({ 
      ...p, 
      selectedOffer: offerId,
      ...(isMobile && { luConditionsStep1: true })
    }));
  };

  const nextStep = () => {
  // Validation pour l'étape 1 - nécessite une sélection d'offre et l'acceptation des conditions
  if (step === 1 && (!formData.selectedOffer || !formData.luConditionsStep1)) {
    alert(t.alertSelectOffer);
    return;
  }
  setStep(s => Math.min(s + 1, 7)); window.scrollTo(0,0);
};
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const getFinalData = () => ({
    ...formData,
    instrumentsExp: Array.isArray(formData.instrumentsExp) ? formData.instrumentsExp.join(', ') : formData.instrumentsExp,
    patrimoineExistant: Array.isArray(formData.patrimoineExistant) ? formData.patrimoineExistant.join(', ') : formData.patrimoineExistant,
    servicesSouhaites: Array.isArray(formData.servicesSouhaites) ? formData.servicesSouhaites.join(', ') : formData.servicesSouhaites
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: t.emailRequired }));
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: t.emailError }));
      return;
    }
    
    setIsSubmitting(true);
    try {
      const finalData = getFinalData();
      const myPdf = pdf(<PdfDocument data={finalData} />);
      const blob = await myPdf.toBlob();
      const serverUrl = window.location.hostname === 'localhost' ? 'http://localhost:3002/api/send-email' : '/api/send-email';
      const fd = new FormData();
      Object.keys(finalData).forEach(k => fd.append(k, typeof finalData[k] === 'object' ? JSON.stringify(finalData[k]) : String(finalData[k])));
      fd.append('sujet', t.emailSubject);
      fd.append('_replyto', finalData.email);
      fd.append('convention_pdf', blob, `${t.pdfFilenamePrefix}_${finalData.nom}_DM_Invest.pdf`);
      await fetch(serverUrl, { method: 'POST', body: fd });
      setIsSubmitted(true);
      setTimeout(() => window.location.reload(), 5000);
    } catch (e) { 
      alert(`${t.errorMessage}: ${e.message}`); 
      setIsSubmitting(false);
    }
  };

  const stepsInfo = [
    { title: t.stepOffres, icon: Layout }, { title: t.stepIdentite, icon: User }, { title: t.stepContact, icon: Phone },
    { title: t.stepResidence, icon: MapPin }, { title: t.stepCarriere, icon: Briefcase },
    { title: t.stepProfil, icon: Target }, { title: t.stepCapital, icon: Wallet }
  ];

  if (!showForm) {
    return (
      <div className="elite-light-bg flex flex-col font-sans h-screen min-h-screen">
        {/* Elite Header Light */}
        <header className="elite-header-light !py-2 flex-shrink-0">
           <div className="flex items-center gap-4">
              <img src={LOGO_DARK_SRC} alt="DM+" className="h-8 w-auto sm:h-10 lg:h-12 2xl:h-14" />
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <span className="hidden sm:block text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 2xl:text-xs">Excellence</span>
           </div>
           <div className="flex items-center gap-8">
              <button 
                onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
                className="flex items-center gap-2 px-3 py-1.5 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 hover:bg-slate-50 transition-colors 2xl:text-sm"
              >
                 <Globe size={12} className="text-[#deb833]" />
                 <span>{lang}</span>
              </button>
           </div>
        </header>

        {/* Elite Nav Light */}
        <nav className="elite-nav-light hidden lg:flex flex-shrink-0 !py-1.5">
           {[t.servicesBancaires, t.gestionFortune, t.analyses, t.espacePrivé].map(l => (
             <a key={l} href="#" className="elite-link-light">{l}</a>
           ))}
        </nav>

        {/* Elite Hero Light */}
        <main className="elite-hero-light flex-1">
           {/* Mobile layout: The "Luxury Boutique" Experience */}
           <div className="lg:hidden relative h-full w-full overflow-hidden bg-black">
              {/* Immersive Background with Cinematic Zoom */}
              <img 
                src={HERO_IMAGE_SRC} 
                alt="Elite Advisor" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 scale-125 animate-cinematic-zoom"
              />
              
              {/* Soft Cinematic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
              
              <div className="relative z-20 flex flex-col justify-between h-full px-8 py-16 animate-elite">
                 {/* Top: Minimalist Brand Identity */}
                  <div className="flex flex-col items-center gap-4">
                     <img src={LOGO_DARK_SRC} alt="DM+" className="h-16 w-auto brightness-0 invert opacity-90" />
                     <div className="h-px w-8 bg-[#deb833]/50" />
                  </div>

                  <div className="text-center space-y-4">
                    <h1 className="font-display font-black text-3xl text-white leading-tight tracking-tighter uppercase text-balance">
                       {t.heroTitle} <span className="text-[#deb833]">{t.heroProsperity}</span> <br /> 
                       {t.heroExcellence}
                    </h1>
                    <p className="font-display text-xs lg:text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] max-w-[240px] mx-auto leading-relaxed mt-2">
                       {t.heroDescFull}
                    </p>
                  </div>

                 {/* Bottom: The "Shocking" CTA */}
                 <div className="flex flex-col items-center gap-12">
                    <button 
                      onClick={() => setShowForm(true)}
                      className="group relative h-28 w-28 flex items-center justify-center"
                    >
                       {/* Pulsing Gold Rings */}
                       <div className="absolute inset-0 rounded-full border border-[#deb833]/20 animate-ping" />
                       <div className="absolute inset-2 rounded-full border border-[#deb833]/40 animate-pulse" />
                       
                       {/* Main Button */}
                       <div className="relative h-20 w-20 rounded-full bg-[#deb833] flex items-center justify-center text-white shadow-[0_0_40px_rgba(222,184,51,0.4)] group-active:scale-90 transition-transform">
                          <ArrowRight size={28} strokeWidth={1.5} />
                       </div>
                       
                       {/* Floating Label */}
                       <span className="absolute -bottom-8 whitespace-nowrap text-[8px] font-black uppercase tracking-[0.5em] text-[#deb833] animate-pulse">
                          {t.discoverExcellence}
                       </span>
                    </button>

                    <div className="flex items-center gap-6 opacity-20">
                       <Shield size={14} className="text-white" />
                       <div className="h-4 w-px bg-white" />
                       <Crown size={14} className="text-white" />
                    </div>
                 </div>
              </div>
           </div>

           {/* Desktop layout */}
           <div className="hidden lg:flex lg:flex-col lg:justify-start lg:pt-24 lg:px-20 lg:animate-elite lg:flex-1 2xl:justify-center 2xl:items-center">
              <div className="max-w-xl space-y-3">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                    <Sparkles size={10} className="text-[#deb833]" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 2xl:text-xs">{t.institutionAgrée}</span>
                 </div>
                 
                 <h1 className="font-display  lg:text-3xl xl:text-4xl 2xl:text-5xl font-black leading-[1.5] tracking-tighter text-slate-950 uppercase">
                    {t.heroTitle} <span className="text-[#deb833]">{t.heroProsperity}</span> <br />
                    {t.heroExcellence}
                 </h1>
                 
                 <p className="max-w-md text-[9px] text-slate-400 leading-relaxed font-bold uppercase tracking-widest 2xl:text-sm">
                    {t.heroDescFull}
                 </p>

                  <div className="pt-4">
                    <button 
                      onClick={() => setShowForm(true)}
                      className="ui-btn-elite-gold group flex items-center gap-3 py-2.5 px-8 text-[10px] 2xl:text-sm"
                      style={{ backgroundColor: '#deb833', color: '#ffffff' }}
                    >
                      {t.startBtnFull} 
                    </button>
                  </div>
               </div>
            </div>

           <div className="relative overflow-hidden hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
              <img 
                src={HERO_IMAGE_SRC} 
                alt="Elite Advisor" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-12 left-12 z-20 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-100 shadow-xl">
                 <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5 2xl:text-xs">{t.rendementMoyen}</div>
                 <div className="text-2xl font-black text-slate-950 2xl:text-3xl">+28.4%</div>
                 <div className="mt-3 h-0.5 w-8 bg-[#deb833]" />
              </div>
           </div>
        </main>

        {/* Elite Footer Light */}
        <footer className="h-14 border-t border-slate-100 flex items-center justify-between px-6 lg:px-20 flex-shrink-0 bg-slate-50/50">
           <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 2xl:text-sm">
              © 2026 DM+ INVEST SOLUTIONS | {t.secu}
           </div>
           <div className="flex gap-8 items-center">
              <div className="flex items-center gap-2">
                 <Shield size={14} className="text-[#deb833]" />
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest 2xl:text-sm">{t.agrée}</span>
              </div>
           </div>
        </footer>
      </div>
    );
  }

  return (
    <div className={`${step === 1 ? 'bg-transparent' : 'elite-light-bg'} flex flex-col font-sans min-h-[100dvh] animate-fade-in`}>
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-4 lg:px-8 lg:py-6">
        <header className={`${step === 1 ? 'mb-1 lg:mb-2 pb-2' : 'mb-4 lg:mb-8 pb-4 lg:pb-6'} flex items-center justify-between border-b border-slate-100`}>
          <div className="flex items-center gap-6">
             <button onClick={() => setShowForm(false)} className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-950 transition-colors">
                <ArrowLeft size={18} />
             </button>
             <img src={LOGO_DARK_SRC} alt="DM+" className="h-9 w-auto sm:h-11 lg:h-13 2xl:h-16" />
             <div className="h-4 w-px bg-slate-100" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#deb833] 2xl:text-sm">{t.dossierInvestisseur}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-[#deb833]/5 border border-[#deb833]/10 rounded-full">
                <Lock size={12} className="text-[#deb833]" />
                <span className="text-[9px] font-black text-[#deb833] uppercase 2xl:text-xs">SSL SECURE</span>
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden flex items-center justify-center py-2 lg:py-4">
          {isSubmitted ? (
            <div className="form-card-light w-full max-w-md text-center py-16 animate-elite">
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#deb833]/10 text-[#deb833]">
                <Check size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-950 mb-4 tracking-tighter">{t.success}</h2>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{t.successDesc}</p>
            </div>
          ) : (
            <div className={`mx-auto w-full px-4 lg:px-0 grid gap-6 lg:items-center 2xl:gap-16 ${step === 1 ? 'lg:grid-cols-1 max-w-6xl' : 'max-w-5xl lg:grid-cols-2 2xl:max-w-7xl'}`}>
              
              {step !== 1 && (
                <div className="space-y-8 hidden lg:block animate-elite 2xl:space-y-12">
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#deb833]/5 border border-[#deb833]/10 rounded-full 2xl:px-6 2xl:py-2">
                       <Crown size={12} className="text-[#deb833] 2xl:w-5 2xl:h-5" /><span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#deb833] 2xl:text-sm 2xl:tracking-[0.4em]">{t.excellenceCertifiee}</span>
                    </div>
                    <h2 className="font-display text-3xl font-black text-slate-950 leading-[1.4] tracking-tighter 2xl:text-6xl 2xl:leading-[1.2] 2xl:tracking-tight">{t.sidePanelTitle} <br /> <span className="text-[#deb833]">{t.sidePanelAccent}</span> <br /> {t.sidePanelSuffix}</h2>
                    <p className="max-w-xs text-[9px] text-slate-400 leading-relaxed font-bold uppercase tracking-[0.2em] 2xl:max-w-md 2xl:text-sm 2xl:tracking-[0.3em] 2xl:leading-relaxed">{t.sidePanelDesc}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 2xl:gap-6">
                    {[
                      { icon: Shield, text: t.secu2, desc: t.secuDesc },
                      { icon: Target, text: t.objectifsPerso, desc: t.objectifsPersoDesc }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 group 2xl:gap-6">
                         <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-white border border-slate-100 shadow-lg shadow-slate-200/40 text-[#deb833] group-hover:bg-[#deb833] group-hover:text-white transition-all duration-500 2xl:h-14 2xl:w-14"><item.icon size={18} className="2xl:w-6 2xl:h-6" /></div>
                         <div>
                            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-950 2xl:text-sm 2xl:tracking-[0.3em]">{item.text}</div>
                            <div className="text-[8px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest 2xl:text-xs 2xl:tracking-wider">{item.desc}</div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={`${step === 1 ? 'bg-transparent border-none p-0 shadow-none' : 'form-card-light'} animate-elite flex flex-col ${step === 1 ? 'w-full' : ''}`}>
                
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4 lg:space-y-6 overflow-hidden">
                  <div className={`flex-1 space-y-4 lg:space-y-6 ${step === 1 ? 'overflow-visible' : 'elite-scrollbar scroll-container overflow-y-auto pb-8'} ${step === 1 ? 'max-w-none' : ''}`}>
                    {step === 1 && (
                      <div className="animate-fade-in py-2 space-y-3">
                        <MembershipConditions isStep={true} selectedTier={formData.selectedOffer} onTierSelect={handleOfferSelect} />
                        
                                                
                        <div className="pt-6 pb-4 border-t border-slate-100 hidden lg:flex items-start gap-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                          <label className="relative flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              name="luConditionsStep1"
                              checked={formData.luConditionsStep1}
                              onChange={handleInputChange}
                              className="peer sr-only"
                            />
                            <div className="h-5 w-5 rounded-lg border-2 border-slate-200 bg-white transition-all duration-300 peer-checked:border-[#deb833] peer-checked:bg-[#deb833] group-hover:border-[#deb833]/50 flex items-center justify-center shadow-sm">
                              <Check size={14} className={`text-white transition-transform duration-300 ${formData.luConditionsStep1 ? 'scale-100' : 'scale-0'}`} />
                            </div>
                            <span className="text-xs lg:text-[10px] font-bold text-slate-600 leading-relaxed uppercase tracking-wider group-hover:text-slate-900 transition-colors max-w-lg">
                              {t.jeConfirmeLecture}
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="pb-3 border-b border-slate-100">
                          <div className="text-[13px] font-black uppercase tracking-[0.3em] text-[#deb833]">{t.identiteCivile}</div>
                          <p className="text-[9px] text-slate-400 mt-1">{t.subIdentite}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6">
                          <div className="space-y-1 min-w-0">
                            <label className="ui-field-label-elite">{t.nom}</label>
                            <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} className="ui-input-elite" placeholder={t.nom} />
                          </div>
                          <div className="space-y-1 min-w-0">
                            <label className="ui-field-label-elite">{t.prenom}</label>
                            <input type="text" name="prenoms" value={formData.prenoms} onChange={handleInputChange} className="ui-input-elite" placeholder={t.prenom} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6">
                          <div className="space-y-1 min-w-0">
                            <label className="ui-field-label-elite">{t.dateNaissance}</label>
                            <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleInputChange} className="ui-input-elite" />
                          </div>
                          <div className="space-y-1 min-w-0">
                            <label className="ui-field-label-elite">{t.lieuNaissance}</label>
                            <input type="text" name="lieuNaissance" value={formData.lieuNaissance} onChange={handleInputChange} className="ui-input-elite" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="ui-field-label-elite">{t.nationalite}</label>
                          <select
                            name="nationalite"
                            value={formData.nationalite}
                            onChange={handleInputChange}
                            className="ui-input-elite appearance-none"
                          >
                            <option value="">{t.select}</option>
                            <option value="Sénégal">{t.paysList.senegal}</option>
                            <option value="Côte d'Ivoire">{t.paysList.coteIvoire}</option>
                            <option value="Mali">{t.paysList.mali}</option>
                            <option value="Burkina Faso">{t.paysList.burkina}</option>
                            <option value="Bénin">{t.paysList.benin}</option>
                            <option value="Togo">{t.paysList.togo}</option>
                            <option value="Niger">{t.paysList.niger}</option>
                            <option value="Guinée">{t.paysList.guinee}</option>
                            <option value="Guinée-Bissau">{t.paysList.guineeBissau}</option>
                            <option value="Mauritanie">{t.paysList.mauritanie}</option>
                            <option value="Cameroun">{t.paysList.cameroun}</option>
                            <option value="Gabon">{t.paysList.gabon}</option>
                            <option value="Congo">{t.paysList.congo}</option>
                            <option value="République Démocratique du Congo">{t.paysList.rdc}</option>
                            <option value="République Centrafricaine">{t.paysList.centrafricaine}</option>
                            <option value="Tchad">{t.paysList.tchad}</option>
                            <option value="Nigeria">{t.paysList.nigeria}</option>
                            <option value="Ghana">{t.paysList.ghana}</option>
                            <option value="Liberia">{t.paysList.liberia}</option>
                            <option value="Sierra Leone">{t.paysList.sierraLeone}</option>
                            <option value="Guinée Équatoriale">{t.paysList.guineeEquatoriale}</option>
                            <option value="São Tomé et Principe">{t.paysList.saotome}</option>
                            <option value="Cap-Vert">{t.paysList.capVert}</option>
                            <option value="Comores">{t.paysList.comores}</option>
                            <option value="Madagascar">{t.paysList.madagascar}</option>
                            <option value="Maurice">{t.paysList.maurice}</option>
                            <option value="Seychelles">{t.paysList.seychelles}</option>
                            <option value="Djibouti">{t.paysList.djibouti}</option>
                            <option value="Érythrée">{t.paysList.erythree}</option>
                            <option value="Éthiopie">{t.paysList.ethiopie}</option>
                            <option value="Kenya">{t.paysList.kenya}</option>
                            <option value="Somalie">{t.paysList.somalie}</option>
                            <option value="Soudan">{t.paysList.soudan}</option>
                            <option value="Soudan du Sud">{t.paysList.soudanSud}</option>
                            <option value="Ouganda">{t.paysList.ouganda}</option>
                            <option value="Tanzanie">{t.paysList.tanzanie}</option>
                            <option value="Rwanda">{t.paysList.rwanda}</option>
                            <option value="Burundi">{t.paysList.burundi}</option>
                            <option value="Angola">{t.paysList.angola}</option>
                            <option value="Botswana">{t.paysList.botswana}</option>
                            <option value="Lesotho">{t.paysList.lesotho}</option>
                            <option value="Malawi">{t.paysList.malawi}</option>
                            <option value="Mozambique">{t.paysList.mozambique}</option>
                            <option value="Namibie">{t.paysList.namibie}</option>
                            <option value="Afrique du Sud">{t.paysList.afriqueSud}</option>
                            <option value="Eswatini">{t.paysList.eswatini}</option>
                            <option value="Zambie">{t.paysList.zambie}</option>
                            <option value="Zimbabwe">{t.paysList.zimbabwe}</option>
                            <option value="Maroc">{t.paysList.maroc}</option>
                            <option value="Algérie">{t.paysList.algerie}</option>
                            <option value="Tunisie">{t.paysList.tunisie}</option>
                            <option value="Libye">{t.paysList.libye}</option>
                            <option value="Égypte">{t.paysList.egypte}</option>
                            <option value="France">{t.paysList.france}</option>
                            <option value="Belgique">{t.paysList.belgique}</option>
                            <option value="Suisse">{t.paysList.suisse}</option>
                            <option value="Canada">{t.paysList.canada}</option>
                            <option value="États-Unis">{t.paysList.etatsUnis}</option>
                            <option value="Royaume-Uni">{t.paysList.royaumeUni}</option>
                            <option value="Allemagne">{t.paysList.allemagne}</option>
                            <option value="Espagne">{t.paysList.espagne}</option>
                            <option value="Italie">{t.paysList.italie}</option>
                            <option value="Portugal">{t.paysList.portugal}</option>
                            <option value="Pays-Bas">{t.paysList.paysBas}</option>
                            <option value="Autriche">{t.paysList.autriche}</option>
                            <option value="Suède">{t.paysList.suede}</option>
                            <option value="Norvège">{t.paysList.norvege}</option>
                            <option value="Danemark">{t.paysList.danemark}</option>
                            <option value="Finlande">{t.paysList.finlande}</option>
                            <option value="Russie">{t.paysList.russie}</option>
                            <option value="Chine">{t.paysList.chine}</option>
                            <option value="Japon">{t.paysList.japon}</option>
                            <option value="Corée du Sud">{t.paysList.coreeSud}</option>
                            <option value="Inde">{t.paysList.inde}</option>
                            <option value="Brésil">{t.paysList.bresil}</option>
                            <option value="Argentine">{t.paysList.argentine}</option>
                            <option value="Mexique">{t.paysList.mexique}</option>
                            <option value="Australie">{t.paysList.australie}</option>
                            <option value="Autre">{t.paysList.autre}</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="pb-3 border-b border-slate-100">
                          <div className="text-[13px] font-black uppercase tracking-[0.3em] text-[#deb833]">{t.contact}</div>
                          <p className="text-[9px] text-slate-400 mt-1">{t.subContact}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6">
                          <div className="space-y-1">
                          <label className="ui-field-label-elite">{t.typePiece}</label>
                          <select 
                            name="typePiece" 
                            value={formData.typePiece} 
                            onChange={handleInputChange} 
                            className="ui-input-elite appearance-none"
                          >
                            <option value="">{t.select}</option>
                            <option value="CNI">{t.cin}</option>
                            <option value="Passeport">{t.passeport}</option>
                            <option value="Autre">{t.autre}</option>
                          </select>
                        </div>
                          <div className="space-y-1">
                            <label className="ui-field-label-elite">
                              {t.numeroPiece}
                            </label>
                            <input type="text" name="numeroPiece" value={formData.numeroPiece} onChange={handleInputChange} className="ui-input-elite" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="ui-field-label-elite">{t.email}</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            className={`ui-input-elite ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                            placeholder="exemple@email.com"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs font-medium mt-1">{errors.email}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                            <label className="ui-field-label-elite">{t.telephonePrincipal}</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={secondaireDial} 
                                onChange={(e) => setSecondaireDial(e.target.value.replace(/[^\d+]/g, ""))} 
                                placeholder="+..."
                                className="w-16 ui-input-elite text-center px-1" 
                              />
                              <input 
                                type="tel" 
                                name="telephonePrincipal" 
                                value={formData.telephonePrincipal} 
                                onChange={handleInputChange} 
                                placeholder="Numéro"
                                className="flex-1 ui-input-elite" 
                              />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6">
                          <div className="space-y-1">
                            <label className="ui-field-label-elite">{t.whatsapp}</label>
                            <input 
                              type="tel" 
                              name="whatsapp" 
                              value={formData.whatsapp} 
                              onChange={handleInputChange} 
                              className="ui-input-elite" 
                              placeholder="+221..."
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="pb-3 border-b border-slate-100">
                          <div className="text-[13px] font-black uppercase tracking-[0.3em] text-[#deb833]">{t.residenceActuelle}</div>
                          <p className="text-[9px] text-slate-400 mt-1">{t.subResidence}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 2xl:gap-6">
                           <div className="space-y-1">
                             <label className="ui-field-label-elite">{t.ville}</label>
                             <input type="text" name="ville" value={formData.ville} onChange={handleInputChange} className="ui-input-elite" />
                           </div>
                           <div className="space-y-1">
                             <label className="ui-field-label-elite">{t.pays}</label>
                             <input type="text" name="paysResidence" value={formData.paysResidence} onChange={handleInputChange} className="ui-input-elite" />
                           </div>
                        </div>
                        <div className="space-y-1">
                           <label className="ui-field-label-elite">{t.adresse}</label>
                           <input type="text" name="adresse" value={formData.adresse} onChange={handleInputChange} className="ui-input-elite" />
                        </div>
                        <div className="space-y-1">
                           <label className="ui-field-label-elite">{t.codePostal}</label>
                           <input type="text" name="codePostal" value={formData.codePostal} onChange={handleInputChange} className="ui-input-elite" />
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="pb-3 border-b border-slate-100 mb-4">
                          <div className="text-[13px] font-black uppercase tracking-[0.3em] text-[#deb833]">{t.situationPro}</div>
                          <p className="text-[9px] text-slate-400 mt-1">{t.subSituationPro}</p>
                        </div>                        
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="ui-field-label-elite">{t.statut}</label>
                            <div className="flex flex-wrap gap-3">
                              {[
                                { id: "Salarié", label: t.statuts.salarie },
                                { id: "Entrepreneur", label: t.statuts.entrepreneur },
                                { id: "Libéral", label: t.statuts.liberal },
                                { id: "Retraité", label: t.statuts.retraite },
                                { id: "Autre", label: t.statuts.autre }
                              ].map(s => (
                                <label key={s.id} className="flex items-center gap-2 cursor-pointer group">
                                  <input
                                    type="radio"
                                    name="statutPro"
                                    value={s.id}
                                    checked={formData.statutPro === s.id}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-[#deb833] focus:ring-0"
                                  />
                                  <span className="text-[10px] font-semibold text-slate-700">{s.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="ui-field-label-elite">{t.profession}</label>
                            <input 
                              type="text" 
                              name="professionSecActivite" 
                              value={formData.professionSecActivite} 
                              onChange={handleInputChange} 
                              className="ui-input-elite" 
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="ui-field-label-elite">{t.employeur}</label>
                            <input 
                              type="text" 
                              name="employeur" 
                              value={formData.employeur} 
                              onChange={handleInputChange} 
                              className="ui-input-elite" 
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="ui-field-label-elite">{t.telPro}</label>
                            <input 
                              type="tel" 
                              name="telephonePro" 
                              value={formData.telephonePro} 
                              onChange={handleInputChange} 
                              className="ui-input-elite" 
                              placeholder="+221 33 ..."
                            />
                          </div>
                        </div>

                        <div className="ui-section-label-shock !mb-4 mt-6">{t.profilClient}</div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: "particulier", title: t.particulier, desc: t.particulierDesc },
                            { id: "professionnel", title: t.professionnel, desc: t.professionnelDesc },
                            { id: "debutant", title: t.debutant, desc: t.debutantDesc },
                            { id: "diaspora", title: t.diaspora, desc: t.diasporaDesc }
                          ].map((profil) => (
                            <label key={profil.id} className={`ui-choice-elite ${formData.profilClient === profil.id ? 'ui-choice-selected-elite' : ''}`}>
                              <div className="flex items-center gap-4">
                                <input
                                  type="radio"
                                  name="profilClient"
                                  value={profil.id}
                                  checked={formData.profilClient === profil.id}
                                  onChange={handleInputChange}
                                  className="h-4 w-4 text-[#deb833] focus:ring-0"
                                />
                                <div>
                                  <div className="text-[10px] font-black text-slate-950 uppercase tracking-widest">{profil.title}</div>
                                  <div className="text-[8px] text-slate-400 mt-1">{profil.desc}</div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 6 && (
                      <div className="space-y-5 animate-fade-in">

                        {/* Section title */}
                        <div className="pb-3 border-b border-slate-100">
                          <div className="text-[13px] font-black uppercase tracking-[0.3em] text-[#deb833]">{t.profilInvestisseur}</div>
                          <p className="text-[9px] text-slate-400 mt-1">{t.subProfil}</p>
                        </div>

                        {/* Expérience */}
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{t.experienceInvestissement}</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: "debutant", label: t.debutant },
                              { id: "initie", label: t.initie },
                              { id: "intermediaire", label: t.intermediaire },
                              { id: "confirme", label: t.confirme }
                            ].map((exp) => {
                              const isSelected = formData.experienceInvestissement === exp.id;
                              return (
                                <label key={exp.id} className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${isSelected ? 'border-[#deb833] bg-[#deb833] shadow-sm' : 'border-slate-200 bg-white hover:border-[#deb833]/40'}`}>
                                  <span className={`text-[9px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-700'}`}>{exp.label}</span>
                                  <input type="radio" name="experienceInvestissement" value={exp.id} checked={isSelected} onChange={handleInputChange} className="sr-only" />
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Horizon */}
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{t.horizonInvestissement}</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { id: "courtTerme", label: t.courtTerme, sub: "< 1 an" },
                              { id: "moyenTerme", label: t.moyenTerme, sub: "1-3 ans" },
                              { id: "longTerme", label: t.longTerme, sub: "3-7 ans" },
                              { id: "tresLongTerme", label: t.tresLongTerme, sub: "+ 7 ans" }
                            ].map((hor) => {
                              const isSelected = formData.horizonInvestissement === hor.id;
                              return (
                                <label key={hor.id} className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${isSelected ? 'border-[#deb833] bg-[#deb833] shadow-sm' : 'border-slate-200 bg-white hover:border-[#deb833]/40'}`}>
                                  <span className={`text-[9px] font-black uppercase tracking-wider leading-tight ${isSelected ? 'text-white' : 'text-slate-700'}`}>{hor.label}</span>
                                  <span className={`text-[8px] font-semibold ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>{hor.sub}</span>
                                  <input type="radio" name="horizonInvestissement" value={hor.id} checked={isSelected} onChange={handleInputChange} className="sr-only" />
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Tolérance au risque */}
                        <div className="space-y-3">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{t.toleranceRisque}</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                              { id: "prudent", label: t.prudent, sub: t.subRisquePrudent,  color: "from-emerald-500 to-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
                              { id: "equilibre", label: t.equilibre, sub: t.subRisqueEquilibre, color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
                              { id: "dynamique", label: t.dynamique, sub: t.subRisqueDynamique, color: "from-amber-500 to-amber-600", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
                              { id: "agressif", label: t.agressif, sub: t.subRisqueAgressif, color: "from-red-500 to-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" }
                            ].map((risk) => {
                              const isSelected = formData.toleranceRisque === risk.id;
                              return (
                                <label key={risk.id} className="relative cursor-pointer transition-all duration-200">
                                  <input type="radio" name="toleranceRisque" value={risk.id} checked={isSelected} onChange={handleInputChange} className="sr-only" />
                                  <div className={"flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition-all duration-200 text-center " + (isSelected ? "border-[#deb833] bg-[#deb833] shadow-sm" : "border-slate-200 bg-white hover:border-[#deb833]/40")}>
                                    <span className={"text-[9px] font-black uppercase tracking-wider leading-tight " + (isSelected ? "text-white" : "text-slate-700")}>
                                      {risk.label.split(' - ')[0]}
                                    </span>
                                    <span className={"text-[8px] font-semibold " + (isSelected ? "text-white/70" : "text-slate-400")}>
                                      {risk.sub}
                                    </span>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Objectifs patrimoniaux */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{t.objectifsPatrimoniaux}</label>
                            <span className="text-[8px] text-slate-400 italic">({t.plusieursChoix})</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: "constitutionEpargne", label: t.constitutionEpargne },
                              { id: "transmissionPatrimoniale", label: t.transmissionPatrimoniale },
                              { id: "investissementBRVM", label: t.investissementBRVM },
                              { id: "financementImmobilier", label: t.financementImmobilier },
                              { id: "preparationRetraite", label: t.preparationRetraite },
                              { id: "optimisationFiscale", label: t.optimisationFiscale },
                              { id: "diversificationPatrimoine", label: t.diversificationPatrimoine },
                              { id: "protectionFamille", label: t.protectionFamille }
                            ].map((obj) => {
                              const isChecked = formData.patrimoineExistant && formData.patrimoineExistant.includes(obj.id);
                              return (
                                <label key={obj.id} className={`flex items-center gap-2.5 p-2.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${isChecked ? 'border-[#deb833] bg-[#deb833]/10' : 'border-slate-200 bg-white hover:border-[#deb833]/40'}`}>
                                  <div className={`h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${isChecked ? 'border-[#deb833] bg-[#deb833]' : 'border-slate-300 bg-white'}`}>
                                    {isChecked && <div className="h-2 w-2 rounded-full bg-white"></div>}
                                  </div>
                                  <span className={`text-[8px] font-black uppercase tracking-wider leading-tight ${isChecked ? 'text-slate-900' : 'text-slate-600'}`}>{obj.label}</span>
                                  <input type="checkbox" name="patrimoineExistant" value={obj.id} checked={isChecked} onChange={handleInputChange} className="sr-only" />
                                </label>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* ÉTAPE 7 — Capital, Instruments & Conditions */}
                    {step === 7 && (
                      <div className="space-y-5 animate-fade-in">

                        <div className="pb-3 border-b border-slate-100">
                          <div className="text-[13px] font-black uppercase tracking-[0.3em] text-[#deb833]">{t.capitalInstruments}</div>
                          <p className="text-[9px] text-slate-400 mt-1">{t.subCapital}</p>
                        </div>

                        {/* Capital à investir */}
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{t.capitalInvestir}</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {[
                              { id: "0-500k", label: "0 - 500 000 FCFA" },
                              { id: "500k-1M", label: "500k - 1M FCFA" },
                              { id: "1M-5M", label: "1M - 5M FCFA" },
                              { id: "5M-10M", label: "5M - 10M FCFA" },
                              { id: "10M-50M", label: "10M - 50M FCFA" },
                              { id: "50M+", label: "+ 50 000 000 FCFA" }
                            ].map((cap) => {
                              const isSelected = formData.capitalInvestir === cap.id;
                              return (
                                <label key={cap.id} className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${isSelected ? 'border-[#deb833] bg-[#deb833] shadow-sm' : 'border-slate-200 bg-white hover:border-[#deb833]/40'}`}>
                                  <span className={`text-[8px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-700'}`}>{cap.label}</span>
                                  <input type="radio" name="capitalInvestir" value={cap.id} checked={isSelected} onChange={handleInputChange} className="sr-only" />
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Instruments financiers */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{t.instrumentsFinanciers}</label>
                            <span className="text-[8px] text-slate-400 italic">({t.plusieursChoix})</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: "Actions", label: t.instruments.actions, sub: t.subActions },
                              { id: "Obligations", label: t.instruments.obligations, sub: t.subObligations },
                              { id: "FCP", label: t.instruments.fcp, sub: t.subFCP }
                            ].map((inst) => {
                              const isChecked = formData.instrumentsExp.includes(inst.id);
                              return (
                                <label key={inst.id} className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${isChecked ? 'border-[#deb833] bg-[#deb833] shadow-sm' : 'border-slate-200 bg-white hover:border-[#deb833]/40'}`}>
                                  <span className={`text-[9px] font-black uppercase tracking-wider ${isChecked ? 'text-white' : 'text-slate-700'}`}>{inst.label}</span>
                                  <span className={`text-[8px] ${isChecked ? 'text-white/70' : 'text-slate-400'}`}>{inst.sub}</span>
                                  <input type="checkbox" value={inst.id} name="instrumentsExp" checked={isChecked} onChange={handleInputChange} className="sr-only" />
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Mode de paiement */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Mode de paiement souhaité</label>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {[
                              { id: "virement", label: "Virement bancaire" },
                              { id: "mobile", label: "Mobile Money (Wave / OM)" },
                              { id: "cheque", label: "Chèque bancaire" }
                            ].map((mode) => {
                              const isSelected = formData.modePaiement === mode.id;
                              return (
                                <label key={mode.id} className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${isSelected ? 'border-[#deb833] bg-[#deb833] shadow-sm' : 'border-slate-200 bg-white hover:border-[#deb833]/40'}`}>
                                  <span className={`text-[8px] font-black uppercase tracking-wider ${isSelected ? 'text-white' : 'text-slate-700'}`}>{mode.label}</span>
                                  <input type="radio" name="modePaiement" value={mode.id} checked={isSelected} onChange={handleInputChange} className="sr-only" />
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Conditions Générales */}
                        <div className="bg-[#deb833]/5 border border-[#deb833]/20 p-4 rounded-xl space-y-3">
                          <div className="flex items-start gap-3">
                            <div
                              onClick={() => setFormData(p => ({ ...p, accepteConditions: !p.accepteConditions }))}
                              className={`mt-0.5 h-5 w-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer flex-none ${formData.accepteConditions ? 'border-[#deb833] bg-[#deb833]' : 'border-slate-300 bg-white hover:border-[#deb833]/60'}`}
                            >
                              {formData.accepteConditions && <Check size={11} className="text-white" strokeWidth={3} />}
                            </div>
                            <span
                              onClick={() => setFormData(p => ({ ...p, accepteConditions: !p.accepteConditions }))}
                              className="text-[9px] text-slate-600 leading-relaxed font-semibold cursor-pointer select-none"
                            >
                              {t.certification}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setShowConditions(true); }}
                              className="text-[9px] text-[#deb833] underline underline-offset-2 hover:text-[#b8962a] transition-colors font-black mt-0 self-start"
                            >
                              {t.conditions}
                            </button>
                          </div>
                          <div className="flex items-start gap-3">
                            <div
                              onClick={() => setFormData(p => ({ ...p, accepteConditions2: !p.accepteConditions2 }))}
                              className={`mt-0.5 h-5 w-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer flex-none ${formData.accepteConditions2 ? 'border-[#deb833] bg-[#deb833]' : 'border-slate-300 bg-white hover:border-[#deb833]/60'}`}
                            >
                              {formData.accepteConditions2 && <Check size={11} className="text-white" strokeWidth={3} />}
                            </div>
                            <span
                              onClick={() => setFormData(p => ({ ...p, accepteConditions2: !p.accepteConditions2 }))}
                              className="text-[9px] text-slate-600 leading-relaxed font-semibold cursor-pointer select-none"
                            >
                              {t.certification2}
                            </span>
                          </div>
                          <div className="flex items-start gap-3">
                            <div
                              onClick={() => setFormData(p => ({ ...p, accepteConditions3: !p.accepteConditions3 }))}
                              className={`mt-0.5 h-5 w-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer flex-none ${formData.accepteConditions3 ? 'border-[#deb833] bg-[#deb833]' : 'border-slate-300 bg-white hover:border-[#deb833]/60'}`}
                            >
                              {formData.accepteConditions3 && <Check size={11} className="text-white" strokeWidth={3} />}
                            </div>
                            <span
                              onClick={() => setFormData(p => ({ ...p, accepteConditions3: !p.accepteConditions3 }))}
                              className="text-[9px] text-slate-600 leading-relaxed font-semibold cursor-pointer select-none"
                            >
                              {t.certification3}
                            </span>
                          </div>
                          <div className="flex items-start gap-3">
                            <div
                              onClick={() => setFormData(p => ({ ...p, accepteConditions4: !p.accepteConditions4 }))}
                              className={`mt-0.5 h-5 w-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer flex-none ${formData.accepteConditions4 ? 'border-[#deb833] bg-[#deb833]' : 'border-slate-300 bg-white hover:border-[#deb833]/60'}`}
                            >
                              {formData.accepteConditions4 && <Check size={11} className="text-white" strokeWidth={3} />}
                            </div>
                            <span
                              onClick={() => setFormData(p => ({ ...p, accepteConditions4: !p.accepteConditions4 }))}
                              className="text-[9px] text-slate-600 leading-relaxed font-semibold cursor-pointer select-none"
                            >
                              {t.certification4}
                            </span>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>


                  {/* Boutons de navigation pour les autres étapes */}
                  {step > 1 && (
                    <div className={`flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-slate-100 flex-shrink-0 2xl:gap-6`}>
                      <button 
                        type="button" 
                        onClick={() => step === 2 ? setStep(1) : prevStep()} 
                        className="ui-nav-btn-back w-full sm:w-auto 2xl:h-12 px-4 text-[10px] font-black uppercase tracking-wider"
                        title={t.retour}
                      >
                        {t.retour}
                      </button>
                      <button
                        type={step === 7 ? "submit" : "button"}
                        onClick={step < 7 ? nextStep : undefined}
                        disabled={isSubmitting || (step === 7 && (!formData.accepteConditions || !formData.accepteConditions2 || !formData.accepteConditions3 || !formData.accepteConditions4))}
                        className={`ui-btn-elite-gold py-2 sm:py-3 px-8 sm:px-12 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] w-full sm:w-auto 2xl:h-12 2xl:text-xs mb-4 sm:mb-0 ${isSubmitting || (step === 7 && (!formData.accepteConditions || !formData.accepteConditions2 || !formData.accepteConditions3 || !formData.accepteConditions4)) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {step === 7 ? (isSubmitting ? (lang === 'EN' ? 'PROCESSING...' : 'TRAITEMENT EN COURS...') : t.soumettreDossier) : t.étapeSuivante}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

        {/* Bouton flottant conditionnel - apparaît seulement si une offre est sélectionnée et les conditions acceptées */}
        {step === 1 && formData.selectedOffer && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
            <button 
              type="button" 
              onClick={nextStep} 
              className={`ui-btn-elite-gold py-3 px-6 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] shadow-lg hover:shadow-xl transition-all duration-300 ${!formData.luConditionsStep1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!formData.luConditionsStep1}
            >
              {t.étapeSuivante}
            </button>
          </div>
        )}

        
      {showPrivacyPolicy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl animate-fade-in">
          <div className="absolute inset-0 bg-white/80" onClick={() => setShowPrivacyPolicy(false)} />
          <div className="form-card-light relative max-h-[85vh] w-full max-w-4xl overflow-y-auto border-slate-100">
            <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} lang={lang} />
            <button onClick={() => setShowPrivacyPolicy(false)} className="ui-btn-elite-gold mt-12 w-full" style={{ backgroundColor: '#deb833', color: '#ffffff' }}>{t.fermer}</button>
          </div>
        </div>
      )}

      {showConditions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl animate-fade-in">
          <div className="absolute inset-0 bg-white/80" onClick={() => setShowConditions(false)} />
          <div className="form-card-light relative max-h-[85vh] w-full max-w-5xl overflow-y-auto border-slate-100">
            <MembershipConditions onClose={() => setShowConditions(false)} lang={lang} />
            <button onClick={() => setShowConditions(false)} className="ui-btn-elite-gold mt-12 w-full" style={{ backgroundColor: '#deb833', color: '#ffffff' }}>{t.fermer}</button>
          </div>
        </div>
      )}

      {showPdfDemo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 animate-fade-in">
           <div className="relative h-full w-full max-w-6xl overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl">
             <button onClick={() => setShowPdfDemo(false)} className="absolute right-6 top-6 z-50 rounded-full bg-slate-950 h-10 w-10 flex items-center justify-center text-white border border-white/10 hover:bg-black transition-all">✕</button>
              <PDFViewer width="100%" height="100%" className="border-none"><PdfDocument data={getFinalData()} /></PDFViewer>
           </div>
        </div>
      )}
    </div>
  );
}

export default App;
