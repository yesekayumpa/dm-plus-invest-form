import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  ]
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 55,
    paddingHorizontal: 35,
    fontFamily: 'Open Sans',
    fontSize: 9,
    color: '#1f2937',
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  headerLeft: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    textAlign: 'right',
    fontSize: 8,
    color: '#4b5563',
  },
  headerYellow: {
    color: '#b45309', // DM+ dark yellow
    fontWeight: 'bold',
  },
  titleBar: {
    backgroundColor: '#fde68a', // amber-200
    padding: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 15,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 9,
    marginTop: 10,
    marginBottom: 4,
  },
  text: {
    marginBottom: 6,
    textAlign: 'justify',
  },
  // Table generic
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  tableCell: {
    padding: 4,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
  },
  tableCellHeader: {
    backgroundColor: '#fef3c7', // amber-50
    fontWeight: 'bold',
  },
  label: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 2,
  },
  value: {
    fontSize: 9,
    minHeight: 12,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  fieldLabel: {
    fontWeight: 'bold',
    width: 120,
  },
  fieldLine: {
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 35,
    right: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#f59e0b',
    paddingTop: 5,
    fontSize: 8,
    color: '#6b7280',
  },
  gridHead: {
    backgroundColor: '#fde68a',
    fontWeight: 'bold',
  },
});

// Fonctions de rendu simplifiées pour éviter les erreurs de props null dans react-pdf
const renderHeader = () => (
  <View style={styles.header} fixed>
    <View>
      <Text style={styles.headerLeft}>DM+ Investment</Text>
    </View>
    <View style={styles.headerRight}>
      <Text><Text style={styles.headerYellow}>DM+ Investment — Conseil financier indépendant</Text></Text>
      <Text>Medina, Rue 35 angle 24, Dakar (Sénégal)</Text>
      <Text>Tél : 33 829 58 06 / 76 663 82 19 | investment@dmplus-group.com</Text>
      <Text>www.dmplus-group.com</Text>
    </View>
  </View>
);

const renderTitleBar = (title = "FORMULAIRE D'ADHÉSION — CONVENTION DE COMPTE TITRES") => (
  <Text style={styles.titleBar} fixed>{title}</Text>
);

const renderFooter = () => (
  <View style={styles.footer} fixed>
    <Text>DM+ Group — Medina, Rue 35 angle 24, Dakar (Sénégal) | Tél : 33 829 58 06 / 76 663 82 19</Text>
    <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} />
  </View>
);

const renderClientInfoTable = (data) => (
  <View style={[styles.table, { marginBottom: 10 }]}>
    <View style={[styles.tableRow, styles.tableCellHeader]}>
      <View style={[styles.tableCell, { flex: 2 }]}><Text style={styles.label}>Ouvert le :</Text><Text style={[styles.value, { color: '#9ca3af' }]}>jj/mm/aaaa</Text></View>
      <View style={[styles.tableCell, { flex: 2 }]}><Text style={styles.label}>Date de mise à jour :</Text><Text style={[styles.value, { color: '#9ca3af' }]}>jj/mm/aaaa</Text></View>
      <View style={[styles.tableCell, { flex: 1 }]}><Text style={styles.label}>Identifiant unique :</Text><Text style={styles.value}></Text></View>
      <View style={[styles.tableCell, { flex: 1 }]}><Text style={styles.label}>Nationalité :</Text><Text style={styles.value}>{data?.nationalite || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 1 }]}><Text style={styles.label}>Ville :</Text><Text style={styles.value}>{data?.ville || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 1, borderRightWidth: 0 }]}><Text style={styles.label}>Code postal :</Text><Text style={styles.value}>{data?.codePostal || ''}</Text></View>
    </View>
    <View style={[styles.tableRow, styles.tableCellHeader]}>
      <View style={[styles.tableCell, { flex: 2 }]}><Text style={styles.label}>Prénom & Nom :</Text><Text style={styles.value}>{data?.prenoms || ''} {data?.nom || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 3 }]}><Text style={styles.label}>Adresse :</Text><Text style={styles.value}>{data?.adresse || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 3, borderRightWidth: 0 }]}><Text style={styles.label}>Date de naissance :</Text><Text style={styles.value}>{formatDate(data?.dateNaissance)} à {data?.lieuNaissance || ''}</Text></View>
    </View>
    <View style={[styles.tableRow, styles.tableCellHeader]}>
      <View style={[styles.tableCell, { flex: 2 }]}><Text style={styles.label}>Profession :</Text><Text style={styles.value}>{data?.professionSecActivite || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 2 }]}><Text style={styles.label}>Pièce d'identité :</Text><Text style={styles.value}>{data?.typePiece || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 1 }]}><Text style={styles.label}>N° :</Text><Text style={styles.value}>{data?.numeroPiece || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 1 }]}><Text style={styles.label}>Délivré le :</Text><Text style={[styles.value, { color: '#9ca3af' }]}>jj/mm/aaaa</Text></View>
      <View style={[styles.tableCell, { flex: 1, borderRightWidth: 0 }]}><Text style={styles.label}>Validité :</Text><Text style={[styles.value, { color: '#9ca3af' }]}>jj/mm/aaaa</Text></View>
    </View>
    <View style={[styles.tableRow, styles.tableCellHeader]}>
      <View style={[styles.tableCell, { flex: 2 }]}><Text style={styles.label}>Tél. personnel :</Text><Text style={styles.value}>{data?.telephonePrincipal || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 2 }]}><Text style={styles.label}>Tél. professionnel :</Text><Text style={styles.value}>{data?.telephonePro || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 3, borderRightWidth: 0 }]}><Text style={styles.label}>Mobile :</Text><Text style={styles.value}>{data?.whatsapp || data?.telephoneSecondaire || ''}</Text></View>
    </View>
    <View style={[styles.tableRow, styles.tableCellHeader, { borderBottomWidth: 0 }]}>
      <View style={[styles.tableCell, { flex: 2 }]}><Text style={styles.label}>Société :</Text><Text style={styles.value}>{data?.employeur || ''}</Text></View>
      <View style={[styles.tableCell, { flex: 5, borderRightWidth: 0 }]}><Text style={styles.label}>Email :</Text><Text style={styles.value}>{data?.email || ''}</Text></View>
    </View>
  </View>
);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const getExperienceLabel = (value) => {
  const labels = {
    'debutant': 'Débutant - aucune expérience préalable',
    'initie': 'Initié - quelques notions de base',
    'intermediaire': 'Intermédiaire - j\'ai déjà investi',
    'confirme': 'Confirmé - je gère un portefeuille actif'
  };
  return labels[value] || value || 'Non renseigné';
};

const getHorizonLabel = (value) => {
  const labels = {
    'courtTerme': 'Court terme (< 1 an)',
    'moyenTerme': 'Moyen terme (1 à 3 ans)',
    'longTerme': 'Long terme (3 à 7 ans)',
    'tresLongTerme': 'Très long terme (+ 7 ans)'
  };
  return labels[value] || value || 'Non renseigné';
};

const getRiskLabel = (value) => {
  const labels = {
    'prudent': 'Prudent - Préservation du capital, rendement modéré',
    'equilibre': 'Équilibré - Mix sécurité / performance',
    'dynamique': 'Dynamique - Recherche de performance, tolérance à la volatilité',
    'agressif': 'Agressif - Maximisation des rendements, forte prise de risque'
  };
  return labels[value] || value || 'Non renseigné';
};

export const PdfDocument = ({ data }) => {
  // Sécurité pour éviter les erreurs si data est manquant
  const safeData = data || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        {renderTitleBar()}

        {/* Top fields */}
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Numéro Compte Titre :</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Numéro Compte Espèce :</Text>
          <View style={styles.fieldLine} />
        </View>
        <View style={[styles.fieldRow, { marginBottom: 10 }]}>
          <Text style={styles.fieldLabel}>Client n° :</Text>
          <View style={{ borderBottomWidth: 1, borderColor: '#d1d5db', width: 200 }} />
        </View>

        {/* Client Info Table */}
        {renderClientInfoTable(safeData)}

        <Text style={styles.text}>Le Titulaire du compte, ci-après dénommé " Le Client " ou " Le Mandant "</Text>
        <Text style={styles.text}>La Compagnie de Gestion Financière et de Bourse , Teneur de Compte, ci-après dénommée « DM+ INVESTMENT » ou « Le Mandataire ».</Text>
        <Text style={styles.text}>Ce compte est ouvert par C à la demande du Client, sur la base d'un formulaire de demande d'ouverture de compte figurant en annexe. Il ne sera considéré comme définitivement ouvert qu'au vu de la présente convention de compte signée par le Client.</Text>
        <Text style={styles.text}>Ce compte sera régi par les dispositions suivantes :</Text>

        <Text style={styles.sectionTitle}>TRANSMISSION DES ORDRES</Text>
        <Text style={styles.articleTitle}>Article 1</Text>
        <Text style={styles.text}>Pour la présente convention, l'ordre de bourse concerne les investissements effectués par le client sur le marché de la Bourse Régionale des Valeurs Mobilières (BRVM). Les ordres sont transmis, par écrit, par le titulaire par voie de courrier ou par télécopie. L'ordre doit indiquer le sens de l'opération (achat ou vente), la désignation ou les caractéristiques de la valeur sur laquelle porte la négociation, leur nombre et, d'une manière générale, toutes les précisions nécessaires à la bonne exécution de l'ordre. Le client fixe la durée de validité de son ordre dans les conditions prévues par le règlement général de la BRVM.</Text>

        <Text style={styles.sectionTitle}>OPÉRATIONS SUR TITRES</Text>
        <Text style={styles.articleTitle}>Article 2</Text>
        <Text style={styles.text}>Les titres inscrits en compte sont sous forme de valeurs mobilières dématérialisées (actions, obligations, droits, parts d'OPCVM...).</Text>

        <Text style={styles.articleTitle}>Article 3</Text>
        <Text style={styles.text}>Les titres figurant dans le compte du Client sont disponibles à première demande pour toute opération de vente ou de transfert à l'exception des titres nantis. Le compte est crédité de l'ensemble des produits générés par les titres inscrits en compte. Le traitement sera fonction des instructions reçues du Client qui peut opter pour un réinvestissement ou pour un retrait par chèque ou virement bancaire.</Text>

        <Text style={styles.sectionTitle}>DÉCLARATIONS ET ENGAGEMENTS DU TITULAIRE</Text>
        <Text style={styles.articleTitle}>Article 4</Text>
        <Text style={styles.text}>Le Client déclare qu'il possède la pleine capacité juridique ainsi que les pouvoirs requis pour intervenir dans la présente convention, qu'il entend effectuer les opérations qu'il prévoit et que les renseignements qu'il a fournis à DM+ INVESTMENT sont exacts et sincères.</Text>
        <Text style={styles.text}>Le Client s'engage à déclarer à DM+ INVESTMENT, par écrit original signé par lui et comprenant les justifications nécessaires, toute modification dans les informations fournies lors de l'ouverture du compte. A défaut, DM+ INVESTMENT ne peut être tenue responsable de l'inexactitude des informations dont elle dispose sur la situation du Client et ses éventuelles conséquences.</Text>
        <Text style={styles.text}>Le Client reconnaît qu'il lui appartient de satisfaire à toute redevance, taxes, impôt et/ou autres droits ou retenues, de quelque nature que ce soit, qui seraient dus au titre des activités de négociation/conservation lui incombant à propos de ses comptes.</Text>

        <Text style={styles.articleTitle}>Article 5</Text>
        <Text style={styles.text}>Le Mandant titulaire autorise le Mandataire à exécuter pour son compte, tout ordre de souscription, d'achat, de vente portant sur les valeurs mobilières et titres assimilés, produits ou instruments financiers, dans la zone UEMOA. Ce contrat ne constitue en aucun cas un mandat de gestion. Le Mandant reconnaît avoir été informé, au moment de la signature du présent contrat, des conditions générales et tarifaires, et s'engage à supporter les commissions et frais en vigueur.</Text>

        {renderFooter()}
      </Page>

      <Page size="A4" style={styles.page}>
        {renderHeader()}
        {renderTitleBar()}

        {/* Offre de services & grille tarifaire */}
        <Text style={[styles.sectionTitle, { textTransform: 'none' }]}>DM+ INVESTMENT — Offre de services & grille tarifaire</Text>
        <Text style={styles.text}>Architecture de l'offre — 3 formules</Text>
        <Text style={styles.text}>DM+ Investment structure son offre autour de 3 formules correspondant aux différents profils clients.</Text>

        <Text style={styles.articleTitle}>DM+ INVEST HORIZON — Épargnant & investisseur particulier</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Cible :</Text> salariés, entrepreneurs, diaspora africaine — capital 500 000 à 5 000 000 FCFA</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Services inclus :</Text> Accès à la plateforme DM+ marchés BRVM, construction d'un portefeuille personnalisé, obligations + actifs alternatifs, suivi trimestriel avec reporting détaillé, 1 rendez-vous conseil par trimestre, alertes opportunités marchés</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Tarification :</Text></Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>• Abonnement : 30 000 FCFA / trimestre</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>• Commission AUM : 1% / an, facturé trimestriellement</Text>

        <Text style={styles.articleTitle}>DM+ INVEST PATRIMOINE — Cadres supérieurs, chefs d'entreprise</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Cible :</Text> cadres supérieurs, chefs d'entreprise</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Services inclus :</Text> tout le contenu Horizon, conseil patrimonial global (financier + immobilier + successoral), portefeuille diversifié multi-actifs, stratégie de transmission patrimoniale, accès prioritaire aux opportunités, reporting mensuel personnalisé, 2 rendez-vous par trimestre avec conseiller dédié, optimisation fiscale et stratégie de transmission</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Tarification :</Text></Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>• Abonnement : 75 000 FCFA / trimestre</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>• Commission AUM : 1% / an</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>• Honoraires mission spécifique : à partir de 150 000 FCFA</Text>

        <Text style={styles.articleTitle}>DM+ INVEST ELITE CORPORATE — PME, ETI, institutions</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Cible :</Text> PME, ETI, institutions</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Services inclus :</Text> audit & conseil de trésorerie et placement, gestion de portefeuille institutionnel, intégration KPI BI avec DM+ Analytics, reporting mensuel personnalisé comité de direction, recommandations de placement stratégiques, conseiller senior dédié — interlocuteur unique exclusif, comité d'investissement mensuel avec présentation aux dirigeants, accès à la plateforme premium DM+ Investment</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Tarification :</Text></Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>• Abonnement : À partir de 500 000 FCFA / mois</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>• Commission AUM : 0,3 à 0,5% / an selon encours</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>• Honoraires ponctuels : devis sur mesure</Text>

        {/* Investor Profile Section */}
        <Text style={[styles.sectionTitle, { textTransform: 'none' }]}>PROFIL INVESTISSEUR & OBJECTIFS</Text>
        <Text style={styles.articleTitle}>Expérience en investissement</Text>
        <Text style={styles.text}>{getExperienceLabel(safeData.experienceInvestissement)}</Text>

        <Text style={styles.articleTitle}>Horizon d'investissement principal</Text>
        <Text style={styles.text}>{getHorizonLabel(safeData.horizonInvestissement)}</Text>

        <Text style={styles.articleTitle}>Objectifs patrimoniaux</Text>
        <Text style={styles.text}>{safeData.patrimoineExistant || 'Non renseigné'}</Text>

        <Text style={styles.articleTitle}>Tolérance au risque</Text>
        <Text style={styles.text}>{getRiskLabel(safeData.toleranceRisque)}</Text>

        <Text style={styles.articleTitle}>Capital à investir</Text>
        <Text style={styles.text}>{safeData.capitalInvestir || 'Non renseigné'} FCFA</Text>

        <Text style={styles.articleTitle}>Instruments financiers</Text>
        <Text style={styles.text}>{safeData.instrumentsExp || 'Non renseigné'}</Text>

        {/* Pricing Table */}
        <Text style={[styles.sectionTitle, { textTransform: 'none' }]}>Grille de tarification DM+ INVESTMENT</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.gridHead]}>
            <View style={[styles.tableCell, { flex: 2 }]}><Text>RUBRIQUES</Text></View>
            <View style={[styles.tableCell, { flex: 1.5 }]}><Text>TAUX / MONTANT FCFA</Text></View>
            <View style={[styles.tableCell, { flex: 2, borderRightWidth: 0 }]}><Text>BASE DE CALCUL</Text></View>
          </View>
          {[
            ['Frais d\'ouverture de compte', '11 700', 'Une seule fois à l\'ouverture'],
            ['Courtage SGI en %', '1.000', 'Montant total de la transaction'],
            ['Facturation ordre SGI en %', '0.100', 'Montant total de la transaction'],
            ['Courtage BRVM en %', '0.200', 'Montant total de la transaction'],
            ['Facturation ordre BRVM en %', '0.100', 'Montant total de la transaction'],
            ['Droits de garde de titres en %', '0.250', 'Valeur du portefeuille du client'],
            ['Commission de transfert de titres', '10 900', 'Commission perçue par transfert'],
            ['Frais de tenue de compte', '1 500 FCFA/trimestre', 'Forfaitaire'],
            ['Commissions de nantissement de titres', '10 000 FCFA', 'Forfait par ligne']
          ].map((row, i) => (
            <View key={i} style={[styles.tableRow, i % 2 === 0 ? { backgroundColor: '#fcfcfc' } : { backgroundColor: '#fef3c7' }, i === 8 ? { borderBottomWidth: 0 } : {}]}>
              <View style={[styles.tableCell, { flex: 2 }]}><Text>{row[0]}</Text></View>
              <View style={[styles.tableCell, { flex: 1.5 }]}><Text>{row[1]}</Text></View>
              <View style={[styles.tableCell, { flex: 2, borderRightWidth: 0 }]}><Text>{row[2]}</Text></View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>CONDITIONS GÉNÉRALES DM+ INVESTMENT</Text>
        <Text style={styles.text}>DM+ Investment est l'entité du DM+ Group spécialisée dans le conseil financier indépendant et l'accompagnement à la décision d'investissement. Les présentes Conditions Générales (CG) régissent l'utilisation du formulaire d'adhésion DM+ Investment ainsi que le traitement des données personnelles qui y sont collectées. En remplissant et en soumettant ce formulaire, vous reconnaissez avoir pris connaissance, compris et accepté sans réserve l'intégralité des présentes.</Text>

        <Text style={styles.articleTitle}>ARTICLE 1 : INFORMATIONS LÉGALES</Text>
        <Text style={styles.text}>Dénomination sociale : DM+ Investment | Société mère : DM+ Group</Text>
        <Text style={styles.text}>Siège social : Medina, Rue 35 angle 24, Dakar (Sénégal)</Text>
        <Text style={styles.text}>Email : investment@dmplus-group.com | Tél : 33 829 58 06 / 76 663 82 19 | Site : www.dmplus-group.com</Text>

        <Text style={styles.articleTitle}>ARTICLE 2 : FINALITÉ DE LA COLLECTE DES DONNÉES</Text>
        <Text style={styles.text}>Les données personnelles recueillies via ce formulaire d'adhésion sont destinées exclusivement à l'établissement et à la gestion d'une relation commerciale avec l'Utilisateur. Elles sont utilisées notamment pour :</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>- Créer et gérer votre compte adhérent</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>- Répondre à vos demandes d'information ou d'assistance</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>- Vous informer sur nos offres, nos produits et les actualités des marchés financiers</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>- Réaliser votre profilage investisseur et construire une stratégie d'investissement</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>- Gérer l'accès à notre portail digital client</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>- Vous assister dans l'ouverture de comptes titres</Text>
        <Text style={[styles.text, { marginLeft: 15 }]}>- Traiter vos réclamations ou vos demandes</Text>
        <Text style={styles.text}>DM+ Investment est l'unique responsable du traitement des données. Ces informations ne sont en aucun cas cédées ou vendues à des tiers sans votre consentement explicite.</Text>

        <Text style={styles.articleTitle}>ARTICLE 3 : BASE JURIDIQUE DU TRAITEMENT</Text>
        <Text style={styles.text}>Le traitement de vos données personnelles repose sur votre consentement, exprimé par le remplissage et l'envoi du présent formulaire d'adhésion, ainsi que sur l'exécution de mesures précontractuelles et contractuelles.</Text>

        <Text style={styles.articleTitle}>ARTICLE 4 : DURÉE DE CONSERVATION DES DONNÉES</Text>
        <Text style={styles.text}>Vos données personnelles sont conservées par la Société pendant toute la durée de la relation commerciale, puis archivées pendant une durée de cinq (5) ans à compter de la fin de cette relation pour des raisons administratives, statistiques et légales.</Text>

        <Text style={styles.articleTitle}>ARTICLE 5 : DROITS DES UTILISATEURS</Text>
        <Text style={styles.text}>Conformément à la loi n° 2008-12 du 25 janvier 2008 relative à la protection des données à caractère personnel au Sénégal, vous disposez d'un droit d'accès, de rectification, de mise à jour, d'effacement et d'opposition au traitement de vos données personnelles pour des motifs légitimes. Vous pouvez également retirer votre consentement à tout moment.</Text>

        {renderFooter()}
      </Page>

      <Page size="A4" style={styles.page}>
        {renderHeader()}
        {renderTitleBar()}

        <Text style={styles.text}>Pour exercer ces droits, adressez votre demande à : investment@dmplus-group.com ou par courrier à DM+ Investment, Medina, Rue 35 angle 24, Dakar (Sénégal).</Text>

        <Text style={styles.articleTitle}>ARTICLE 6 : CONFIDENTIALITÉ ET SÉCURITÉ</Text>
        <Text style={styles.text}>La Société accorde une importance capitale à la confidentialité et à la sécurité de vos données. Nous mettons en oeuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données contre toute perte, altération, divulgation ou accès non autorisé. Conformément à nos valeurs de transparence et d'éthique, vos informations personnelles et financières sont traitées avec la plus stricte confidentialité.</Text>

        <Text style={styles.articleTitle}>ARTICLE 7 : PROPRIÉTÉ INTELLECTUELLE</Text>
        <Text style={styles.text}>L'ensemble du contenu du site internet, du portail digital client, des tableaux de bord personnalisés, des supports de communication, incluant les textes, images, logos, vidéos, marques (« DM+ Investment » et « DM+ Group »), grilles d'analyse, scoring BRVM et outils de simulation, est la propriété exclusive de DM+ Investment et de DM+ Group. Toute reproduction sans autorisation écrite préalable est strictement interdite et constitutive de contrefaçon.</Text>

        <Text style={styles.articleTitle}>ARTICLE 8 : RESPONSABILITÉ</Text>
        <Text style={styles.text}>Important : Les informations et recommandations fournies par DM+ Investment ont un caractère indicatif et ne constituent en aucun cas une garantie de performance ou un conseil en investissement irrévocable. L'investissement en bourse comporte des risques (perte en capital, volatilité, etc.). L'Utilisateur est seul responsable de ses décisions d'investissement. DM+ Investment ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ses services.</Text>

        <Text style={styles.articleTitle}>ARTICLE 9 : COOKIES</Text>
        <Text style={styles.text}>Notre site internet peut utiliser des cookies pour améliorer l'expérience de navigation, personnaliser l'affichage et à des fins de statistiques. En poursuivant votre navigation, vous consentez à l'utilisation de cookies dans les conditions énoncées dans notre politique.</Text>

        <Text style={styles.articleTitle}>ARTICLE 10 : LIENS HYPERTEXTES</Text>
        <Text style={styles.text}>Notre site peut contenir des liens hypertextes vers des sites tiers. DM+ Investment n'exerce aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à leur contenu ou les dommages qui pourraient en résulter.</Text>

        <Text style={styles.articleTitle}>ARTICLE 11 : MODIFICATION DES CONDITIONS GÉNÉRALES</Text>
        <Text style={styles.text}>DM+ Investment se réserve le droit de modifier les présentes Conditions Générales à tout moment et sans préavis. La nouvelle version sera applicable dès sa mise en ligne. Le fait de continuer à utiliser le service après modification vaut acceptation des nouvelles conditions.</Text>

        <Text style={styles.articleTitle}>ARTICLE 12 : DROIT APPLICABLE ET JURIDICTION</Text>
        <Text style={styles.text}>Les présentes Conditions Générales sont régies par le droit sénégalais. En cas de litige, et à défaut de résolution amiable, les tribunaux de Dakar sont seuls compétents.</Text>

        <Text style={styles.sectionTitle}>OBLIGATIONS ET RESPONSABILITÉS DE CGF BOURSE</Text>
        <Text style={styles.articleTitle}>Article 6</Text>
        <Text style={styles.text}>Conformément aux termes de l'instruction N° 4/97 du 29 novembre 1997 de l'AMF-UMOA, CGF BOURSE reçoit les ordres de bourse de son client et les exécute sur la BRVM. L'ordre transmis est aussitôt horodaté. CGF BOURSE s'engage à acheminer les ordres durant l'ouverture du marché, sauf cas de force majeure.</Text>

        <Text style={styles.articleTitle}>Article 7</Text>
        <Text style={styles.text}>CGF BOURSE s'assure de l'identité des titulaires et demande à cette fin toute pièce justificative. CGF BOURSE doit tenir, à la disposition du mandant, les produits générés par les titres inscrits au crédit de son compte.</Text>

        <Text style={styles.articleTitle}>Article 8</Text>
        <Text style={styles.text}>CGF BOURSE fera de son mieux pour remplir ses obligations résultant du présent contrat. Toutefois, CGF BOURSE n'est pas responsable des pertes et préjudices subis par le Client, à moins que ce préjudice ne résulte d'une négligence ou d'une défaillance de sa part.</Text>

        <Text style={styles.articleTitle}>Article 9</Text>
        <Text style={styles.text}>CGF BOURSE a mis à la disposition du Client une interface web, un relevé de compte trimestriel et un avis d'opéré après chaque transaction conformément à l'article 147 du Règlement Général de l'AMF-UMOA.</Text>

        {renderFooter()}
      </Page>

      <Page size="A4" style={styles.page}>
        {renderHeader()}
        {renderTitleBar()}

        <Text style={styles.sectionTitle}>DURÉE - RÉSILIATION</Text>
        <Text style={styles.articleTitle}>Article 10</Text>
        <Text style={styles.text}>La présente convention est conclue pour une durée indéterminée. Elle peut être résiliée à tout moment par l'une ou l'autre des parties par lettre recommandée ou courriel avec accusé de réception.</Text>

        <Text style={styles.articleTitle}>Article 11</Text>
        <Text style={styles.text}>La résiliation entraîne la clôture du compte. Le titulaire règle tous les frais consécutifs à la clôture du compte, notamment les commissions, les droits de garde et autres frais dus.</Text>

        <Text style={styles.sectionTitle}>LITIGES ET INTERPRÉTATIONS DU CONTRAT</Text>
        <Text style={styles.articleTitle}>Article 12</Text>
        <Text style={styles.text}>La présente Convention est régie par le droit Sénégalais. En cas de différend, les Parties devront agir de bonne foi afin de régler à l'amiable par voie de négociations ou de médiation. Dans le cas où le différend demeure non résolu après quatre-vingt-dix (90) jours, il sera soumis aux juridictions sénégalaises exclusivement compétentes.</Text>

        <Text style={styles.sectionTitle}>DISPOSITIONS PARTICULIÈRES</Text>
        <Text style={styles.articleTitle}>Article 13</Text>
        <Text style={styles.text}>Les informations recueillies à l'occasion de la présente convention ne seront utilisées que pour les seules nécessités de la gestion interne et pour satisfaire aux obligations légales et réglementaires, elles seront traitées dans la plus grande confidentialité.</Text>

        <Text style={styles.articleTitle}>Article 14</Text>
        <Text style={styles.text}>L'attention du titulaire est attirée sur le fait qu'il lui appartient de satisfaire aux obligations légales et réglementaires en vigueur qui lui incombent, en particulier en matière de fiscalité, douane, réglementation financière avec l'étranger.</Text>

        {renderFooter()}
      </Page>

      {/* PAGE 6 / 6 */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        {renderTitleBar()}

        <Text style={{ fontWeight: 'bold', fontSize: 11, marginBottom: 2 }}>DEMANDE D'OUVERTURE DE COMPTE</Text>
        <View style={{ borderBottomWidth: 1, borderColor: '#f59e0b', marginBottom: 8, width: '100%' }} />

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8 }}>
          <Text style={{ fontSize: 9 }}>Client n° : </Text>
          <View style={{ borderBottomWidth: 1, borderColor: '#9ca3af', width: 150, marginLeft: 5 }} />
        </View>

        {renderClientInfoTable(safeData)}

        <View style={{ flexDirection: 'row', backgroundColor: '#fef3c7', padding: 6, alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ flex: 1, fontSize: 9 }}>Le titulaire du compte est-il membre du personnel de la BRVM, d'une SGI, du DC/BR ou du AMF-UMOA ?</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 10 }}>OUI [ {safeData.membreBRVM === 'Oui' ? 'X' : '  '} ]   NON [ {safeData.membreBRVM === 'Non' ? 'X' : '  '} ]</Text>
        </View>

        <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10 }}>
          <View style={{ flex: 1, borderRightWidth: 1, borderColor: '#e5e7eb' }}>
            <View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#e5e7eb', height: 60 }}>
              <Text style={styles.articleTitle}>Spécimen de signature du représentant légal :</Text>
            </View>
            <View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#e5e7eb', height: 60 }}>
              <Text style={styles.articleTitle}>Spécimen de signature du titulaire :</Text>
            </View>
            <View style={{ padding: 8, height: 60 }}>
              <Text style={styles.articleTitle}>Spécimen de signature du mandataire :</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#fef3c7', padding: 8, borderBottomWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={styles.articleTitle}>Références bancaires :</Text>
              <Text style={{ fontSize: 8, color: safeData.iban ? '#1f2937' : '#9ca3af' }}>{safeData.iban || 'IBAN / RIB'}</Text>
            </View>
            <View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={styles.articleTitle}>Dépôt initial :</Text>
              <Text style={{ fontSize: 8, color: safeData.depotInitial ? '#1f2937' : '#9ca3af' }}>{safeData.depotInitial ? safeData.depotInitial + ' FCFA' : 'Montant en FCFA'}</Text>
            </View>
            <View style={{ backgroundColor: '#fef3c7', padding: 8, borderBottomWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={styles.articleTitle}>Instructions spéciales :</Text>
              <Text style={{ fontSize: 8, color: safeData.instructionsSpeciales ? '#1f2937' : '#9ca3af' }}>{safeData.instructionsSpeciales || '...'}</Text>
            </View>
            <View style={{ padding: 8 }}>
              <Text style={[styles.articleTitle, { marginBottom: 6 }]}>Documents à remettre :</Text>
              <Text style={styles.text}>1. Convention de compte titre</Text>
              <Text style={styles.text}>2. Avis d'ouverture de compte</Text>
              <Text style={styles.text}>3. Autres</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', backgroundColor: '#fef3c7', padding: 8, borderWidth: 1, borderColor: '#fcd34d', marginBottom: 10 }}>
          <View style={{ width: 10, height: 10, borderWidth: 1, borderColor: '#000', marginRight: 10, marginTop: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 7 }}>{safeData.accepteConditions ? 'X' : ''}</Text>
          </View>
          <Text style={{ flex: 1, fontSize: 9 }}>Je reconnais avoir pris connaissance et j'accepte les présentes <Text style={{ fontWeight: 'bold' }}>Conditions Générales d'Adhésion</Text> ainsi que la <Text style={{ fontWeight: 'bold' }}>Politique de Confidentialité de DM+ Investment.</Text></Text>
        </View>

        <Text style={[styles.text, { marginBottom: 2 }]}>La signature du titulaire doit être précédée de la mention manuscrite : " <Text style={{ fontWeight: 'bold' }}>Lu et approuvé</Text> "</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>Fait en doubles exemplaires, à conserver par le titulaire et par DM+ Investment.</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '31%', borderWidth: 1, borderColor: '#e5e7eb', height: 75 }}>
            <View style={{ backgroundColor: '#fef3c7', padding: 5, alignItems: 'center', borderBottomWidth: 1, borderColor: '#fcd34d' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 9 }}>DM+ Investment</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 5 }}>
              <Text style={{ fontSize: 8, color: '#9ca3af' }}>Signature</Text>
            </View>
          </View>

          <View style={{ width: '31%', paddingTop: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 9 }}>À Dakar le : __________________</Text>
          </View>

          <View style={{ width: '31%', borderWidth: 1, borderColor: '#e5e7eb', height: 75 }}>
            <View style={{ backgroundColor: '#fef3c7', padding: 5, alignItems: 'center', borderBottomWidth: 1, borderColor: '#fcd34d' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 9 }}>Le Représentant Légal</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 5 }}>
              <Text style={{ fontSize: 8, color: '#9ca3af' }}>Signature</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, fontSize: 7, color: '#9ca3af' }}>
          <Text>Préparé par : DM+ Investment, Le : _________________</Text>
          <Text style={{ marginLeft: 30 }}>Approuvé par _________________________ Le _________________</Text>
        </View>

        {renderFooter()}
      </Page>
    </Document>
  );
};

export default PdfDocument;
