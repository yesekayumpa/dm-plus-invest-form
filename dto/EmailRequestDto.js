/**
 * EmailRequestDto - Data Transfer Object pour les requêtes email backend
 * Structure formelle pour validation, documentation et mapping base de données
 * API RESTful avec versioning: /api/v1/email/*
 */

// Configuration de l'API
const API_CONFIG = {
  version: 'v1',
  basePath: '/api',
  endpoints: {
    sendEmail: '/email/send',
    replyEmail: '/email/reply'
  },
  responseFormat: {
    success: 'boolean',
    message: 'string',
    data: 'object',
    errors: 'array',
    timestamp: 'string'
  }
};

// Schéma de base de données correspondant
const DB_SCHEMA = {
  table: 'clients',
  columns: {
    id: { type: 'UUID', primary: true, auto: true },
    created_at: { type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' },
    updated_at: { type: 'TIMESTAMP', nullable: true }
  }
};

// Définition des attributs des champs du formulaire (Backend-oriented)
const FIELD_ATTRIBUTES = {
  // Informations personnelles
  nom: {
    // Validation
    validation: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-ZÀ-ÿ\s\-']+$/,
      trim: true
    },
    // Base de données
    database: {
      column: 'nom',
      type: 'VARCHAR(100)',
      nullable: false,
      indexed: true
    },
    // API
    api: {
      param: 'nom',
      example: 'Dupont',
      description: 'Nom de famille du client'
    },
    // Messages
    messages: {
      error: 'Le nom doit contenir entre 2 et 100 caractères alphabétiques',
      label: 'Nom'
    }
  },
  prenoms: {
    validation: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-ZÀ-ÿ\s\-']+$/,
      trim: true
    },
    database: {
      column: 'prenoms',
      type: 'VARCHAR(100)',
      nullable: false
    },
    api: {
      param: 'prenoms',
      example: 'Jean Pierre',
      description: 'Prénoms du client'
    },
    messages: {
      error: 'Les prénoms doivent contenir entre 2 et 100 caractères alphabétiques',
      label: 'Prénoms'
    }
  },
  dateNaissance: {
    validation: {
      type: 'string',
      required: false,
      format: 'date',
      pattern: /^\d{4}-\d{2}-\d{2}$/
    },
    database: {
      column: 'date_naissance',
      type: 'DATE',
      nullable: true
    },
    api: {
      param: 'dateNaissance',
      example: '1990-05-15',
      description: 'Date de naissance (YYYY-MM-DD)'
    },
    messages: {
      error: 'Format de date invalide (attendu: YYYY-MM-DD)',
      label: 'Date de naissance'
    }
  },
  lieuNaissance: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 100,
      trim: true
    },
    database: {
      column: 'lieu_naissance',
      type: 'VARCHAR(100)',
      nullable: true
    },
    api: {
      param: 'lieuNaissance',
      example: 'Paris',
      description: 'Lieu de naissance'
    },
    messages: {
      error: 'Le lieu de naissance ne peut pas dépasser 100 caractères',
      label: 'Lieu de naissance'
    }
  },
  nationalite: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 50,
      trim: true
    },
    database: {
      column: 'nationalite',
      type: 'VARCHAR(50)',
      nullable: true
    },
    api: {
      param: 'nationalite',
      example: 'Française',
      description: 'Nationalité du client'
    },
    messages: {
      error: 'La nationalité ne peut pas dépasser 50 caractères',
      label: 'Nationalité'
    }
  },
  typePiece: {
    validation: {
      type: 'string',
      required: false,
      enum: ['CNI', 'Passeport', 'Carte de séjour', 'Permis de conduire', 'Autre'],
      trim: true
    },
    database: {
      column: 'type_piece',
      type: 'ENUM',
      values: ['CNI', 'Passeport', 'Carte de séjour', 'Permis de conduire', 'Autre'],
      nullable: true
    },
    api: {
      param: 'typePiece',
      example: 'CNI',
      description: 'Type de pièce d\'identité'
    },
    messages: {
      error: 'Type de pièce invalide',
      label: 'Type de pièce'
    }
  },
  numeroPiece: {
    validation: {
      type: 'string',
      required: false,
      minLength: 5,
      maxLength: 50,
      trim: true,
      uppercase: true
    },
    database: {
      column: 'numero_piece',
      type: 'VARCHAR(50)',
      nullable: true,
      unique: true
    },
    api: {
      param: 'numeroPiece',
      example: '123456789',
      description: 'Numéro de la pièce d\'identité'
    },
    messages: {
      error: 'Le numéro de pièce doit contenir entre 5 et 50 caractères',
      label: 'Numéro de pièce'
    }
  },

  // Coordonnées
  email: {
    validation: {
      type: 'string',
      required: true,
      format: 'email',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      trim: true,
      lowercase: true
    },
    database: {
      column: 'email',
      type: 'VARCHAR(255)',
      nullable: false,
      unique: true,
      indexed: true
    },
    api: {
      param: 'email',
      example: 'client@example.com',
      description: 'Adresse email du client'
    },
    messages: {
      error: 'Format d\'email invalide',
      label: 'Email'
    }
  },
  telephonePrincipal: {
    validation: {
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 20,
      pattern: /^[+]?[\d\s\-()]+$/,
      trim: true
    },
    database: {
      column: 'telephone_principal',
      type: 'VARCHAR(20)',
      nullable: false,
      indexed: true
    },
    api: {
      param: 'telephonePrincipal',
      example: '+33612345678',
      description: 'Numéro de téléphone principal'
    },
    messages: {
      error: 'Le téléphone principal doit contenir entre 8 et 20 caractères numériques',
      label: 'Téléphone principal'
    }
  },
  telephoneSecondaire: {
    validation: {
      type: 'string',
      required: false,
      minLength: 8,
      maxLength: 20,
      pattern: /^[+]?[\d\s\-()]+$/,
      trim: true
    },
    database: {
      column: 'telephone_secondaire',
      type: 'VARCHAR(20)',
      nullable: true
    },
    api: {
      param: 'telephoneSecondaire',
      example: '+33698765432',
      description: 'Numéro de téléphone secondaire'
    },
    messages: {
      error: 'Le téléphone secondaire doit contenir entre 8 et 20 caractères numériques',
      label: 'Téléphone secondaire'
    }
  },
  whatsapp: {
    validation: {
      type: 'string',
      required: false,
      minLength: 8,
      maxLength: 20,
      pattern: /^[+]?[\d\s\-()]+$/,
      trim: true
    },
    database: {
      column: 'whatsapp',
      type: 'VARCHAR(20)',
      nullable: true
    },
    api: {
      param: 'whatsapp',
      example: '+33612345678',
      description: 'Numéro WhatsApp'
    },
    messages: {
      error: 'Le numéro WhatsApp doit contenir entre 8 et 20 caractères numériques',
      label: 'WhatsApp'
    }
  },
  adresse: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 255,
      trim: true
    },
    database: {
      column: 'adresse',
      type: 'VARCHAR(255)',
      nullable: true
    },
    api: {
      param: 'adresse',
      example: '123 Rue de la Paix',
      description: 'Adresse postale complète'
    },
    messages: {
      error: 'L\'adresse ne peut pas dépasser 255 caractères',
      label: 'Adresse'
    }
  },
  ville: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 100,
      trim: true
    },
    database: {
      column: 'ville',
      type: 'VARCHAR(100)',
      nullable: true,
      indexed: true
    },
    api: {
      param: 'ville',
      example: 'Paris',
      description: 'Ville de résidence'
    },
    messages: {
      error: 'La ville ne peut pas dépasser 100 caractères',
      label: 'Ville'
    }
  },
  paysResidence: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 100,
      trim: true
    },
    database: {
      column: 'pays_residence',
      type: 'VARCHAR(100)',
      nullable: true
    },
    api: {
      param: 'paysResidence',
      example: 'France',
      description: 'Pays de résidence'
    },
    messages: {
      error: 'Le pays ne peut pas dépasser 100 caractères',
      label: 'Pays de résidence'
    }
  },
  codePostal: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 20,
      pattern: /^[\d\s\-A-Z]+$/i,
      trim: true,
      uppercase: true
    },
    database: {
      column: 'code_postal',
      type: 'VARCHAR(20)',
      nullable: true
    },
    api: {
      param: 'codePostal',
      example: '75001',
      description: 'Code postal'
    },
    messages: {
      error: 'Format de code postal invalide',
      label: 'Code postal'
    }
  },

  // Situation financière
  profession: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 100,
      trim: true
    },
    database: {
      column: 'profession',
      type: 'VARCHAR(100)',
      nullable: true
    },
    api: {
      param: 'profession',
      example: 'Ingénieur',
      description: 'Profession ou activité'
    },
    messages: {
      error: 'La profession ne peut pas dépasser 100 caractères',
      label: 'Profession'
    }
  },
  revenuMensuel: {
    validation: {
      type: 'string',
      required: false,
      enum: ['< 100 000 FCFA', '100 000 - 500 000 FCFA', '500 000 - 1 000 000 FCFA', '1 000 000 - 5 000 000 FCFA', '> 5 000 000 FCFA'],
      trim: true
    },
    database: {
      column: 'revenu_mensuel',
      type: 'ENUM',
      values: ['< 100 000 FCFA', '100 000 - 500 000 FCFA', '500 000 - 1 000 000 FCFA', '1 000 000 - 5 000 000 FCFA', '> 5 000 000 FCFA'],
      nullable: true
    },
    api: {
      param: 'revenuMensuel',
      example: '500 000 - 1 000 000 FCFA',
      description: 'Tranche de revenu mensuel'
    },
    messages: {
      error: 'Tranche de revenu invalide',
      label: 'Revenu mensuel'
    }
  },
  patrimoineEstime: {
    validation: {
      type: 'string',
      required: false,
      enum: ['< 1 000 000 FCFA', '1 000 000 - 10 000 000 FCFA', '10 000 000 - 50 000 000 FCFA', '50 000 000 - 100 000 000 FCFA', '> 100 000 000 FCFA'],
      trim: true
    },
    database: {
      column: 'patrimoine_estime',
      type: 'ENUM',
      values: ['< 1 000 000 FCFA', '1 000 000 - 10 000 000 FCFA', '10 000 000 - 50 000 000 FCFA', '50 000 000 - 100 000 000 FCFA', '> 100 000 000 FCFA'],
      nullable: true
    },
    api: {
      param: 'patrimoineEstime',
      example: '10 000 000 - 50 000 000 FCFA',
      description: 'Estimation du patrimoine'
    },
    messages: {
      error: 'Tranche de patrimoine invalide',
      label: 'Patrimoine estimé'
    }
  },
  origineFonds: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 255,
      trim: true
    },
    database: {
      column: 'origine_fonds',
      type: 'VARCHAR(255)',
      nullable: true
    },
    api: {
      param: 'origineFonds',
      example: 'Épargne personnelle',
      description: 'Origine des fonds d\'investissement'
    },
    messages: {
      error: 'L\'origine des fonds ne peut pas dépasser 255 caractères',
      label: 'Origine des fonds'
    }
  },
  objectifInvestissement: {
    validation: {
      type: 'string',
      required: false,
      enum: ['Épargne', 'Retraite', 'Revenus complémentaires', 'Croissance du capital', 'Diversification'],
      trim: true
    },
    database: {
      column: 'objectif_investissement',
      type: 'ENUM',
      values: ['Épargne', 'Retraite', 'Revenus complémentaires', 'Croissance du capital', 'Diversification'],
      nullable: true
    },
    api: {
      param: 'objectifInvestissement',
      example: 'Croissance du capital',
      description: 'Objectif principal d\'investissement'
    },
    messages: {
      error: 'Objectif d\'investissement invalide',
      label: 'Objectif d\'investissement'
    }
  },

  // Services souhaités
  servicesSouhaites: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 500,
      trim: true
    },
    database: {
      column: 'services_souhaites',
      type: 'TEXT',
      nullable: true
    },
    api: {
      param: 'servicesSouhaites',
      example: 'Gestion de portefeuille, Conseil en investissement',
      description: 'Services financiers souhaités'
    },
    messages: {
      error: 'La description des services ne peut pas dépasser 500 caractères',
      label: 'Services souhaités'
    }
  },
  frequenceSuivi: {
    validation: {
      type: 'string',
      required: false,
      enum: ['Quotidien', 'Hebdomadaire', 'Mensuel', 'Trimestriel', 'Annuel'],
      trim: true
    },
    database: {
      column: 'frequence_suivi',
      type: 'ENUM',
      values: ['Quotidien', 'Hebdomadaire', 'Mensuel', 'Trimestriel', 'Annuel'],
      nullable: true
    },
    api: {
      param: 'frequenceSuivi',
      example: 'Mensuel',
      description: 'Fréquence de suivi souhaitée'
    },
    messages: {
      error: 'Fréquence de suivi invalide',
      label: 'Fréquence de suivi'
    }
  },
  modeConsultation: {
    validation: {
      type: 'string',
      required: false,
      enum: ['En personne', 'Téléphone', 'Email', 'Visioconférence'],
      trim: true
    },
    database: {
      column: 'mode_consultation',
      type: 'ENUM',
      values: ['En personne', 'Téléphone', 'Email', 'Visioconférence'],
      nullable: true
    },
    api: {
      param: 'modeConsultation',
      example: 'Visioconférence',
      description: 'Mode de consultation préféré'
    },
    messages: {
      error: 'Mode de consultation invalide',
      label: 'Mode de consultation'
    }
  },
  membreBRVM: {
    validation: {
      type: 'string',
      required: false,
      enum: ['Oui', 'Non', 'En cours'],
      trim: true
    },
    database: {
      column: 'membre_brvm',
      type: 'ENUM',
      values: ['Oui', 'Non', 'En cours'],
      nullable: true,
      default: 'Non'
    },
    api: {
      param: 'membreBRVM',
      example: 'Non',
      description: 'Statut de membre BRVM'
    },
    messages: {
      error: 'Statut BRVM invalide',
      label: 'Membre BRVM'
    }
  },
  iban: {
    validation: {
      type: 'string',
      required: false,
      minLength: 15,
      maxLength: 34,
      pattern: /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/,
      trim: true,
      uppercase: true
    },
    database: {
      column: 'iban',
      type: 'VARCHAR(34)',
      nullable: true,
      unique: true
    },
    api: {
      param: 'iban',
      example: 'FR7630006000011234567890189',
      description: 'Numéro IBAN pour les virements'
    },
    messages: {
      error: 'Format IBAN invalide',
      label: 'IBAN'
    }
  },
  depotInitial: {
    validation: {
      type: 'string',
      required: false,
      pattern: /^[0-9]+(?:[.,][0-9]{1,2})?$/,
      trim: true
    },
    database: {
      column: 'depot_initial',
      type: 'DECIMAL(15,2)',
      nullable: true
    },
    api: {
      param: 'depotInitial',
      example: '1000000',
      description: 'Montant du dépôt initial'
    },
    messages: {
      error: 'Format de montant invalide',
      label: 'Dépôt initial'
    }
  },
  instructionsSpeciales: {
    validation: {
      type: 'string',
      required: false,
      maxLength: 1000,
      trim: true
    },
    database: {
      column: 'instructions_speciales',
      type: 'TEXT',
      nullable: true
    },
    api: {
      param: 'instructionsSpeciales',
      example: 'Préférer les communications par email',
      description: 'Instructions ou demandes spéciales'
    },
    messages: {
      error: 'Les instructions spéciales ne peuvent pas dépasser 1000 caractères',
      label: 'Instructions spéciales'
    }
  },

  // Champ système
  _replyto: {
    validation: {
      type: 'string',
      required: false,
      format: 'email',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      trim: true,
      lowercase: true
    },
    database: {
      column: null, // Ce champ n'est pas stocké en base de données
      type: null,
      nullable: true
    },
    api: {
      param: '_replyto',
      example: 'client@example.com',
      description: 'Email de réponse (système Formspree)'
    },
    messages: {
      error: 'Format d\'email de réponse invalide',
      label: 'Email de réponse'
    }
  }
};

class EmailRequestDto {
  /**
   * Récupère les attributs complets d'un champ spécifique
   * @param {string} fieldName - Nom du champ
   * @returns {Object|null} - Attributs complets du champ (validation, database, api, messages)
   */
  static getFieldAttributes(fieldName) {
    return FIELD_ATTRIBUTES[fieldName] || null;
  }

  /**
   * Récupère les attributs de validation d'un champ
   * @param {string} fieldName - Nom du champ
   * @returns {Object|null} - Attributs de validation
   */
  static getValidationAttributes(fieldName) {
    return FIELD_ATTRIBUTES[fieldName]?.validation || null;
  }

  /**
   * Récupère les attributs de base de données d'un champ
   * @param {string} fieldName - Nom du champ
   * @returns {Object|null} - Attributs de base de données
   */
  static getDatabaseAttributes(fieldName) {
    return FIELD_ATTRIBUTES[fieldName]?.database || null;
  }

  /**
   * Récupère les attributs API d'un champ
   * @param {string} fieldName - Nom du champ
   * @returns {Object|null} - Attributs API
   */
  static getApiAttributes(fieldName) {
    return FIELD_ATTRIBUTES[fieldName]?.api || null;
  }

  /**
   * Récupère les messages d'un champ
   * @param {string} fieldName - Nom du champ
   * @returns {Object|null} - Messages (error, label)
   */
  static getMessages(fieldName) {
    return FIELD_ATTRIBUTES[fieldName]?.messages || null;
  }

  /**
   * Récupère tous les attributs des champs
   * @returns {Object} - Tous les attributs des champs
   */
  static getAllFieldAttributes() {
    return FIELD_ATTRIBUTES;
  }

  /**
   * Récupère le schéma de base de données
   * @returns {Object} - Schéma de base de données
   */
  static getDatabaseSchema() {
    return DB_SCHEMA;
  }

  /**
   * Récupère les champs requis
   * @returns {Array} - Liste des champs requis
   */
  static getRequiredFields() {
    return Object.entries(FIELD_ATTRIBUTES)
      .filter(([_, attr]) => attr.validation.required)
      .map(([name, _]) => name);
  }

  /**
   * Récupère les champs optionnels
   * @returns {Array} - Liste des champs optionnels
   */
  static getOptionalFields() {
    return Object.entries(FIELD_ATTRIBUTES)
      .filter(([_, attr]) => !attr.validation.required)
      .map(([name, _]) => name);
  }

  /**
   * Applique les transformations de validation (trim, uppercase, lowercase)
   * @param {string} fieldName - Nom du champ
   * @param {any} value - Valeur à transformer
   * @returns {any} - Valeur transformée
   */
  static applyTransformations(fieldName, value) {
    const validation = FIELD_ATTRIBUTES[fieldName]?.validation;
    if (!validation || typeof value !== 'string') {
      return value;
    }

    let transformed = value;

    if (validation.trim) {
      transformed = transformed.trim();
    }

    if (validation.uppercase) {
      transformed = transformed.toUpperCase();
    }

    if (validation.lowercase) {
      transformed = transformed.toLowerCase();
    }

    return transformed;
  }

  /**
   * Valide un champ individuel selon ses attributs de validation
   * @param {string} fieldName - Nom du champ
   * @param {any} value - Valeur à valider
   * @returns {Object} - Résultat de la validation
   */
  static validateField(fieldName, value) {
    const attributes = FIELD_ATTRIBUTES[fieldName];
    if (!attributes) {
      return { isValid: true, errors: [], warnings: [] };
    }

    const validation = attributes.validation;
    const messages = attributes.messages;
    const errors = [];
    const warnings = [];

    // Vérification champ requis
    if (validation.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors.push(messages?.error || `Le champ ${fieldName} est requis`);
      return { isValid: false, errors, warnings };
    }

    // Si la valeur est vide et non requise, on considère comme valide
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return { isValid: true, errors, warnings };
    }

    // Appliquer les transformations
    const processedValue = this.applyTransformations(fieldName, value);
    const stringValue = String(processedValue);

    // Validation du type
    if (validation.type === 'string' && typeof value !== 'string') {
      errors.push(`Le champ ${fieldName} doit être une chaîne de caractères`);
      return { isValid: false, errors, warnings };
    }

    // Validation de la longueur
    if (validation.minLength && stringValue.length < validation.minLength) {
      errors.push(messages?.error || `Le champ ${fieldName} doit contenir au moins ${validation.minLength} caractères`);
    }

    if (validation.maxLength && stringValue.length > validation.maxLength) {
      errors.push(messages?.error || `Le champ ${fieldName} ne peut pas dépasser ${validation.maxLength} caractères`);
    }

    // Validation du pattern
    if (validation.pattern && !validation.pattern.test(stringValue)) {
      errors.push(messages?.error || `Format invalide pour le champ ${fieldName}`);
    }

    // Validation de l'énumération
    if (validation.enum && !validation.enum.includes(stringValue)) {
      errors.push(messages?.error || `Valeur invalide pour le champ ${fieldName}. Valeurs acceptées: ${validation.enum.join(', ')}`);
    }

    // Validation du format email
    if (validation.format === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(stringValue)) {
        errors.push(messages?.error || 'Format d\'email invalide');
      }
    }

    // Validation du format date
    if (validation.format === 'date') {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(stringValue)) {
        errors.push(messages?.error || 'Format de date invalide (attendu: YYYY-MM-DD)');
      } else {
        const date = new Date(stringValue);
        if (isNaN(date.getTime())) {
          errors.push('Date invalide');
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      processedValue
    };
  }

  /**
   * DTO pour l'endpoint /api/v1/email/send
   * @param {Object} data - Données du formulaire d'inscription
   * @param {Buffer} pdfFile - Fichier PDF de la convention
   * @returns {Object} - DTO structuré et validé pour API RESTful
   */
  static createSendEmailDto(data, pdfFile) {
    const validationErrors = [];
    const validationWarnings = [];
    const processedData = {};

    // Validation du fichier PDF
    if (!pdfFile) {
      validationErrors.push('Le fichier PDF est requis');
    }

    // Validation de tous les champs selon leurs attributs
    for (const [fieldName, value] of Object.entries(data)) {
      if (FIELD_ATTRIBUTES[fieldName]) {
        const validation = this.validateField(fieldName, value);
        
        if (!validation.isValid) {
          validationErrors.push(...validation.errors);
        } else {
          // Utiliser la valeur transformée si disponible
          processedData[fieldName] = validation.processedValue !== undefined ? validation.processedValue : value;
        }
        
        if (validation.warnings && validation.warnings.length > 0) {
          validationWarnings.push(...validation.warnings);
        }
      }
    }

    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join('; '));
    }

    // Construction du DTO avec les données traitées
    const formData = {};
    for (const fieldName of Object.keys(FIELD_ATTRIBUTES)) {
      if (fieldName !== '_replyto' && processedData[fieldName] !== undefined) {
        formData[fieldName] = processedData[fieldName];
      }
    }

    return {
      endpoint: `${API_CONFIG.basePath}/${API_CONFIG.version}${API_CONFIG.endpoints.sendEmail}`,
      method: 'POST',
      request: {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: {
          _replyto: processedData._replyto || processedData.email,
          formData: formData,
          convention_pdf: pdfFile
        }
      },
      response: {
        success: true,
        message: 'Soumission enregistrée avec succès',
        data: {
          clientEmail: processedData.email,
          clientName: `${processedData.nom} ${processedData.prenoms}`,
          submittedAt: new Date().toISOString()
        },
        warnings: validationWarnings.length > 0 ? validationWarnings : undefined
      }
    };
  }

  /**
   * DTO pour l'endpoint /api/v1/email/reply
   * @param {Object} data - Données de réponse du client
   * @returns {Object} - DTO structuré et validé pour API RESTful
   */
  static createReplyEmailDto(data) {
    const { clientEmail, clientName, subject, message } = data;

    const validationErrors = [];
    const processedData = {};

    // Validation de l'email du client
    if (!clientEmail || clientEmail.trim() === '') {
      validationErrors.push('L\'email du client est requis');
    } else {
      const emailValidation = this.validateField('email', clientEmail);
      if (!emailValidation.isValid) {
        validationErrors.push(...emailValidation.errors);
      } else {
        processedData.clientEmail = emailValidation.processedValue;
      }
    }

    // Validation du nom du client
    if (clientName) {
      const nameValidation = this.validateField('nom', clientName);
      if (!nameValidation.isValid) {
        validationErrors.push(...nameValidation.errors);
      } else {
        processedData.clientName = nameValidation.processedValue;
      }
    } else {
      processedData.clientName = '';
    }

    // Validation du sujet
    if (subject) {
      if (subject.length > 200) {
        validationErrors.push('Le sujet ne peut pas dépasser 200 caractères');
      } else {
        processedData.subject = subject.trim();
      }
    } else {
      processedData.subject = '';
    }

    // Validation du message
    if (!message || message.trim() === '') {
      validationErrors.push('Le message ne peut pas être vide');
    } else if (message.length > 5000) {
      validationErrors.push('Le message ne peut pas dépasser 5000 caractères');
    } else {
      processedData.message = message.trim();
    }

    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join('; '));
    }

    return {
      endpoint: `${API_CONFIG.basePath}/${API_CONFIG.version}${API_CONFIG.endpoints.replyEmail}`,
      method: 'POST',
      request: {
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          clientEmail: processedData.clientEmail,
          clientName: processedData.clientName,
          subject: processedData.subject,
          message: processedData.message
        }
      },
      response: {
        success: true,
        message: 'Message envoyé avec succès',
        data: {
          recipient: processedData.clientEmail,
          sentAt: new Date().toISOString()
        }
      }
    };
  }

  /**
   * Valide les données d'inscription complète
   * @param {Object} formData - Données du formulaire
   * @returns {Object} - Résultat de la validation avec erreurs et avertissements
   */
  static validateFormData(formData) {
    const errors = [];
    const warnings = [];
    const processedData = {};

    // Validation de tous les champs selon leurs attributs
    for (const [fieldName, value] of Object.entries(formData)) {
      if (FIELD_ATTRIBUTES[fieldName]) {
        const validation = this.validateField(fieldName, value);
        
        if (!validation.isValid) {
          // Séparer les erreurs des avertissements basés sur la criticité
          validation.errors.forEach(error => {
            if (FIELD_ATTRIBUTES[fieldName].validation.required) {
              errors.push(error);
            } else {
              warnings.push(error);
            }
          });
        } else {
          processedData[fieldName] = validation.processedValue !== undefined ? validation.processedValue : value;
        }
        
        if (validation.warnings && validation.warnings.length > 0) {
          warnings.push(...validation.warnings);
        }
      }
    }

    // Vérifications spécifiques (business logic)
    if (processedData.email && processedData._replyto && processedData.email !== processedData._replyto) {
      warnings.push('L\'email du formulaire diffère de l\'email de réponse');
    }

    if (processedData.telephonePrincipal && processedData.telephoneSecondaire === processedData.telephonePrincipal) {
      warnings.push('Les téléphones principal et secondaire sont identiques');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      validatedData: processedData,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Génère le schéma SQL pour la création de table
   * @returns {string} - Requête SQL CREATE TABLE
   */
  static generateCreateTableSQL() {
    const columns = [];
    
    // Colonnes système
    columns.push('id UUID PRIMARY KEY DEFAULT gen_random_uuid()');
    columns.push('created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    columns.push('updated_at TIMESTAMP');

    // Colonnes des champs
    for (const [fieldName, attributes] of Object.entries(FIELD_ATTRIBUTES)) {
      const db = attributes.database;
      if (db.column) {
        let columnDef = `${db.column} ${db.type}`;
        
        if (db.nullable === false) {
          columnDef += ' NOT NULL';
        }
        
        if (db.unique) {
          columnDef += ' UNIQUE';
        }
        
        if (db.indexed) {
          columnDef += ' -- INDEXED';
        }
        
        if (db.default) {
          columnDef += ` DEFAULT '${db.default}'`;
        }
        
        columns.push(columnDef);
      }
    }

    return `CREATE TABLE ${DB_SCHEMA.table} (\n  ${columns.join(',\n  ')}\n);`;
  }

  /**
   * Génère les index SQL pour les champs indexés
   * @returns {Array} - Liste de requêtes SQL CREATE INDEX
   */
  static generateIndexSQL() {
    const indexes = [];
    
    for (const [fieldName, attributes] of Object.entries(FIELD_ATTRIBUTES)) {
      const db = attributes.database;
      if (db.column && db.indexed) {
        const indexName = `idx_${DB_SCHEMA.table}_${db.column}`;
        indexes.push(`CREATE INDEX ${indexName} ON ${DB_SCHEMA.table}(${db.column});`);
      }
    }

    return indexes;
  }

  /**
   * Map les données du formulaire vers les colonnes de base de données
   * @param {Object} formData - Données du formulaire
   * @returns {Object} - Données mappées pour la base de données
   */
  static mapToDatabase(formData) {
    const dbData = {};
    
    for (const [fieldName, value] of Object.entries(formData)) {
      const attributes = FIELD_ATTRIBUTES[fieldName];
      if (attributes && attributes.database.column) {
        dbData[attributes.database.column] = value;
      }
    }

    return dbData;
  }

  /**
   * Map les données de base de données vers le format formulaire
   * @param {Object} dbData - Données de la base de données
   * @returns {Object} - Données au format formulaire
   */
  static mapFromDatabase(dbData) {
    const formData = {};
    
    for (const [fieldName, attributes] of Object.entries(FIELD_ATTRIBUTES)) {
      if (attributes.database.column && dbData[attributes.database.column] !== undefined) {
        formData[fieldName] = dbData[attributes.database.column];
      }
    }

    return formData;
  }

  /**
   * Génère un résumé des attributs pour documentation
   * @returns {Object} - Résumé structuré des attributs
   */
  static getAttributesSummary() {
    const summary = {
      required: [],
      optional: [],
      byCategory: {
        'Informations personnelles': [],
        'Coordonnées': [],
        'Situation financière': [],
        'Services souhaités': [],
        'Système': []
      },
      databaseColumns: []
    };

    const categoryMapping = {
      'Informations personnelles': ['nom', 'prenoms', 'dateNaissance', 'lieuNaissance', 'nationalite', 'typePiece', 'numeroPiece'],
      'Coordonnées': ['email', 'telephonePrincipal', 'telephoneSecondaire', 'whatsapp', 'adresse', 'ville', 'paysResidence', 'codePostal'],
      'Situation financière': ['profession', 'revenuMensuel', 'patrimoineEstime', 'origineFonds', 'objectifInvestissement'],
      'Services souhaités': ['servicesSouhaites', 'frequenceSuivi', 'modeConsultation', 'membreBRVM', 'iban', 'depotInitial', 'instructionsSpeciales'],
      'Système': ['_replyto']
    };

    for (const [fieldName, attributes] of Object.entries(FIELD_ATTRIBUTES)) {
      const fieldInfo = {
        name: fieldName,
        apiParam: attributes.api.param,
        dbColumn: attributes.database.column,
        type: attributes.validation.type,
        required: attributes.validation.required,
        description: attributes.api.description,
        example: attributes.api.example
      };

      if (attributes.validation.required) {
        summary.required.push(fieldInfo);
      } else {
        summary.optional.push(fieldInfo);
      }

      // Catégorisation
      for (const [category, fields] of Object.entries(categoryMapping)) {
        if (fields.includes(fieldName)) {
          summary.byCategory[category].push(fieldInfo);
          break;
        }
      }

      // Colonnes de base de données
      if (attributes.database.column) {
        summary.databaseColumns.push({
          field: fieldName,
          column: attributes.database.column,
          type: attributes.database.type,
          nullable: attributes.database.nullable,
          unique: attributes.database.unique,
          indexed: attributes.database.indexed
        });
      }
    }

    return summary;
  }

  /**
   * Génère la documentation OpenAPI/Swagger pour les endpoints
   * @returns {Object} - Spécification OpenAPI pour les endpoints RESTful
   */
  static generateOpenAPISpec() {
    const properties = {};
    const required = [];

    for (const [fieldName, attributes] of Object.entries(FIELD_ATTRIBUTES)) {
      if (fieldName === '_replyto') continue; // Exclure le champ système

      properties[attributes.api.param] = {
        type: attributes.validation.type,
        description: attributes.api.description,
        example: attributes.api.example
      };

      if (attributes.validation.enum) {
        properties[attributes.api.param].enum = attributes.validation.enum;
      }

      if (attributes.validation.pattern) {
        properties[attributes.api.param].pattern = attributes.validation.pattern.source;
      }

      if (attributes.validation.required) {
        required.push(attributes.api.param);
      }
    }

    return {
      openapi: '3.0.0',
      info: {
        title: 'DM+ Invest Email API',
        version: API_CONFIG.version,
        description: 'API pour la gestion des emails et soumissions de formulaires'
      },
      servers: [
        {
          url: `${API_CONFIG.basePath}/{version}`,
          description: 'Serveur API',
          variables: {
            version: {
              default: API_CONFIG.version,
              description: 'Version de l\'API'
            }
          }
        }
      ],
      paths: {
        [`${API_CONFIG.endpoints.sendEmail}`]: {
          post: {
            summary: 'Soumettre un formulaire d\'inscription',
            description: 'Endpoint pour soumettre un formulaire d\'inscription avec PDF',
            requestBody: {
              required: true,
              content: {
                'multipart/form-data': {
                  schema: {
                    type: 'object',
                    properties: {
                      ...properties,
                      convention_pdf: {
                        type: 'string',
                        format: 'binary',
                        description: 'Fichier PDF de la convention'
                      }
                    },
                    required: [...required, 'convention_pdf']
                  }
                }
              }
            },
            responses: {
              '200': {
                description: 'Soumission réussie',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Soumission enregistrée avec succès' },
                        data: {
                          type: 'object',
                          properties: {
                            clientEmail: { type: 'string' },
                            clientName: { type: 'string' },
                            submittedAt: { type: 'string', format: 'date-time' }
                          }
                        },
                        warnings: { type: 'array', items: { type: 'string' } }
                      }
                    }
                  }
                }
              },
              '400': {
                description: 'Erreur de validation',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string' },
                        errors: { type: 'array', items: { type: 'string' } }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        [`${API_CONFIG.endpoints.replyEmail}`]: {
          post: {
            summary: 'Envoyer une réponse du client',
            description: 'Endpoint pour permettre aux clients d\'envoyer des messages',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      clientEmail: {
                        type: 'string',
                        format: 'email',
                        description: 'Email du client'
                      },
                      clientName: {
                        type: 'string',
                        description: 'Nom du client'
                      },
                      subject: {
                        type: 'string',
                        description: 'Sujet du message'
                      },
                      message: {
                        type: 'string',
                        description: 'Contenu du message'
                      }
                    },
                    required: ['clientEmail', 'message']
                  }
                }
              }
            },
            responses: {
              '200': {
                description: 'Message envoyé avec succès',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: 'Message envoyé avec succès' },
                        data: {
                          type: 'object',
                          properties: {
                            recipient: { type: 'string' },
                            sentAt: { type: 'string', format: 'date-time' }
                          }
                        }
                      }
                    }
                  }
                }
              },
              '400': {
                description: 'Erreur de validation',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string' },
                        errors: { type: 'array', items: { type: 'string' } }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  }

  /**
   * Crée une réponse de succès standardisée
   * @param {string} message - Message de succès
   * @param {Object} data - Données supplémentaires
   * @returns {Object} - Réponse formatée
   */
  static createSuccessResponse(message, data = {}) {
    return {
      success: true,
      message: message,
      data: data,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Crée une réponse d'erreur standardisée
   * @param {string} message - Message d'erreur
   * @param {Array} errors - Liste des erreurs détaillées
   * @returns {Object} - Réponse formatée
   */
  static createErrorResponse(message, errors = []) {
    return {
      success: false,
      message: message,
      errors: errors,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Récupère la configuration de l'API
   * @returns {Object} - Configuration de l'API
   */
  static getApiConfig() {
    return API_CONFIG;
  }

  /**
   * Récupère l'URL complète d'un endpoint
   * @param {string} endpointName - Nom de l'endpoint ('sendEmail' ou 'replyEmail')
   * @returns {string} - URL complète de l'endpoint
   */
  static getEndpointUrl(endpointName) {
    if (!API_CONFIG.endpoints[endpointName]) {
      throw new Error(`Endpoint ${endpointName} non trouvé`);
    }
    return `${API_CONFIG.basePath}/${API_CONFIG.version}${API_CONFIG.endpoints[endpointName]}`;
  }
}

module.exports = EmailRequestDto;