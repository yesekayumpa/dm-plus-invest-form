import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// ============================================================================
// 1. CONFIGURATION DES POLICES (FONTS)
// ============================================================================
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle: 'italic' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  ]
});

// ============================================================================
// 2. STYLES DU DOCUMENT
// ============================================================================
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 70,
    paddingHorizontal: 35,
    fontFamily: 'Open Sans',
    fontSize: 9,
    color: '#1f2937',
    lineHeight: 1.5,
  },
  logoContainer: {
    marginBottom: 30,
    width: 120,
  },
  logoImage: {
    width: '100%',
    height: 'auto',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#deb833',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 8,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 2,
  },
  text: {
    marginBottom: 6,
    textAlign: 'justify',
  },
  textBold: {
    fontWeight: 'bold',
  },
  clientBox: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  clientBoxRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  clientBoxLabel: {
    width: 120,
    fontWeight: 'bold',
    fontSize: 8,
  },
  clientBoxValue: {
    flex: 1,
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  articleHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  articleNum: {
    backgroundColor: '#1f2937',
    color: '#deb833',
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 9,
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 9,
    paddingLeft: 10,
    textTransform: 'uppercase',
  },
  subSectionTitle: {
    fontWeight: 'bold',
    fontSize: 9,
    marginTop: 10,
    marginBottom: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingLeft: 10,
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 15,
  },
  bullet: {
    width: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  footerColorBar: {
    width: '30%',
    backgroundColor: '#deb833',
    height: 15,
  },
  footerInfo: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    fontSize: 7,
  },
  footerCol: {
    flex: 1,
  },
  signatureBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  signatureCol: {
    width: '45%',
  },
  signatureHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  signatureContent: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    height: 80,
    padding: 10,
  },
});

// ============================================================================
// 3. COMPOSANTS RÉUTILISABLES (EN-TÊTE ET PIED DE PAGE)
// ============================================================================
const renderHeader = () => (
  <View style={styles.logoContainer} fixed>
    <Image src="/LOGOTYPE 10.png" style={styles.logoImage} />
  </View>
);

const renderFooter = () => (
  <View style={styles.footer} fixed>
    <View style={styles.footerColorBar}></View>
    <View style={styles.footerInfo}>
      <View style={styles.footerCol}>
        <Text style={{ fontWeight: 'bold' }}>DIGITAL MIND + GROUP</Text>
        <Text><Text style={{ fontWeight: 'bold' }}>NINEA :</Text> 006879227</Text>
        <Text><Text style={{ fontWeight: 'bold' }}>RCCM :</Text> SN STL 2018 A0973</Text>
      </View>
      <View style={[styles.footerCol, { alignItems: 'flex-end' }]}>
        <Text>Médina rue 37x24 / Dakar, Sénégal</Text>
        <Text>(+221) 76 619 34 10 / 33 829 58 06</Text>
        <Text>investment@dmplus-group.com</Text>
      </View>
    </View>
  </View>
);

// ============================================================================
// 4. COMPOSANT PRINCIPAL : DOCUMENT PDF
// ============================================================================
export const PdfDocument = ({ data }) => {
  const safeData = data || {};
  
  const isHorizon = safeData.selectedOffer === 'marche-financier';
  const isPatrimoine = safeData.selectedOffer === 'prestige';
  const isCorporate = safeData.selectedOffer === 'corporate';

  return (
    <Document>
      {/* ===================================================================== */}
      {/* PAGE 1 : INFORMATIONS CLIENT ET OBJET DE LA CONVENTION */}
      {/* ===================================================================== */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>CONVENTION DE CONSEIL EN INVESTISSEMENT</Text>
          <Text style={styles.mainTitle}>& GESTION PATRIMONIALE</Text>
          <Text style={styles.subTitle}>Gestion patrimoniale - Investissement BRVM - Conseil financier</Text>
        </View>

        <Text style={styles.text}>Entre les soussignés</Text>
        
        <Text style={styles.text}>
          <Text style={styles.textBold}>DM+ Investment</Text>, Société par Actions Simplifiée (SAS) au capital de <Text style={styles.textBold}>1 000 000 FCFA</Text>, immatriculée au Registre du Commerce sous le numéro <Text style={styles.textBold}>RC SN DKR 2026 B 21469</Text>, dont le siège social est situé à Médina rue 37x24, Dakar, Sénégal, représentée par <Text style={styles.textBold}>Monsieur GBANE ALMAMY MAHAMA</Text>, en sa qualité de Directeur Général,
        </Text>
        <Text style={[styles.text, { fontStyle: 'italic', marginBottom: 10 }]}>ci-après dénommée « le Conseiller »</Text>
        
        <Text style={[styles.text, styles.textBold, { marginBottom: 10 }]}>et</Text>

        <View style={styles.clientBox}>
          <Text style={[styles.textBold, { fontSize: 8, marginBottom: 5 }]}>Monsieur / Madame / Mademoiselle :</Text>
          <View style={styles.clientBoxRow}>
            <Text style={styles.clientBoxLabel}>Nom & Prénom :</Text>
            <Text style={styles.clientBoxValue}>{safeData.prenoms || ''} {safeData.nom || ''}</Text>
          </View>
          <View style={styles.clientBoxRow}>
            <Text style={styles.clientBoxLabel}>{safeData.typePiece || 'CIN'} :</Text>
            <Text style={styles.clientBoxValue}>{safeData.numeroPiece || ''}</Text>
          </View>
          <View style={styles.clientBoxRow}>
            <Text style={styles.clientBoxLabel}>Compte Système N° :</Text>
            <Text style={styles.clientBoxValue}></Text>
            <Text style={styles.clientBoxLabel}>Agence :</Text>
            <Text style={styles.clientBoxValue}>DAKAR</Text>
          </View>
          <View style={styles.clientBoxRow}>
            <Text style={styles.clientBoxLabel}>Identifiant unique :</Text>
            <Text style={styles.clientBoxValue}></Text>
            <Text style={styles.clientBoxLabel}>Nationalité :</Text>
            <Text style={styles.clientBoxValue}>{safeData.nationalite || ''}</Text>
          </View>
        </View>
        
        <Text style={[styles.text, { fontStyle: 'italic', marginBottom: 20 }]}>ci-après dénommé(e) « le Client »</Text>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 1</Text>
          <Text style={styles.articleTitle}>OBJET DE LA CONVENTION</Text>
        </View>
        
        <Text style={styles.text}>La présente convention a pour objet de définir les conditions dans lesquelles <Text style={styles.textBold}>DM+ Investment</Text> fournit au Client des services de <Text style={styles.textBold}>conseil en investissement, gestion patrimoniale et accompagnement financier, dans le cadre de la formule souscrite.</Text></Text>
        <Text style={styles.text}>DM+ Investment intervient en qualité de <Text style={[styles.textBold, { color: '#d97706' }]}>conseiller indépendant.</Text> Son rôle est d'analyser la situation patrimoniale du Client, de formuler des recommandations adaptées à ses objectifs et d'accompagner la mise en œuvre des décisions d'investissement. <Text style={styles.textBold}>DM+ Investment ne détient pas les fonds du Client et ne procède à aucune opération sans l'accord préalable et explicite du Client.</Text></Text>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 2</Text>
          <Text style={styles.articleTitle}>FORMULE SOUSCRITE</Text>
        </View>

        <Text style={[styles.text, { fontStyle: 'italic', marginBottom: 10 }]}>Le Client souscrit à la formule suivante :</Text>
        
        <View style={[styles.clientBox, { marginTop: 0 }]}>
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox}><Text style={{ fontSize: 7, fontWeight: 'bold' }}>{isHorizon ? 'X' : ''}</Text></View>
            <Text style={styles.text}>DM+ Invest Horizon — 30 000 FCFA / trimestre</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox}><Text style={{ fontSize: 7, fontWeight: 'bold' }}>{isPatrimoine ? 'X' : ''}</Text></View>
            <Text style={styles.text}>DM+ Invest Patrimoine — 75 000 FCFA / trimestre</Text>
          </View>
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox}><Text style={{ fontSize: 7, fontWeight: 'bold' }}>{isCorporate ? 'X' : ''}</Text></View>
            <Text style={styles.text}>DM+ Invest Corporate — À partir de 500 000 FCFA / mois</Text>
          </View>
        </View>

        {renderFooter()}
      </Page>

      {/* ===================================================================== */}
      {/* PAGE 2 : DÉTAILS DE LA FORMULE ET PRESTATIONS (ART. 3) */}
      {/* ===================================================================== */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        
        <Text style={[styles.textBold, { marginBottom: 10 }]}>Détail de la formule souscrite :</Text>
        
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Montant de l'abonnement : <Text style={styles.textBold}>{isHorizon ? '30 000' : isPatrimoine ? '75 000' : '___________'}</Text> FCFA</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.text}>Périodicité : </Text>
            <View style={[styles.checkbox, { width: 8, height: 8, marginHorizontal: 5 }]}><Text style={{ fontSize: 6 }}>{isCorporate ? 'X' : ''}</Text></View>
            <Text style={styles.text}>Mensuelle </Text>
            <View style={[styles.checkbox, { width: 8, height: 8, marginHorizontal: 5 }]}><Text style={{ fontSize: 6 }}>{isHorizon || isPatrimoine ? 'X' : ''}</Text></View>
            <Text style={styles.text}>Trimestrielle</Text>
          </View>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Commission AUM : <Text style={styles.textBold}>{isCorporate ? '0,3 à 0,5' : '1'}</Text> % / an</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Date de prise d'effet : ________________________</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Date d'échéance initiale : ________________________</Text>
        </View>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 3</Text>
          <Text style={styles.articleTitle}>PRESTATIONS DE DM+ INVESTMENT</Text>
        </View>

        <Text style={[styles.text, { fontStyle: 'italic', marginBottom: 15 }]}>Dans le cadre de la formule souscrite, DM+ Investment s'engage à fournir les prestations suivantes :</Text>

        <Text style={styles.subSectionTitle}>3.1 Diagnostic patrimonial initial</Text>
        <Text style={styles.text}>Analyse complète de la situation financière, patrimoniale et fiscale du Client. Identification des objectifs d'investissement, de l'horizon de placement et du profil de risque. Ce diagnostic est réalisé lors du premier rendez-vous — entièrement offert, sans engagement.</Text>

        <Text style={styles.subSectionTitle}>3.2 Conseil en investissement</Text>
        <Text style={styles.text}>Recommandations personnalisées sur les opportunités d'investissement disponibles sur les marchés financiers de l'UEMOA — notamment la BRVM — ainsi que sur les produits d'épargne et de placement adaptés au profil et aux objectifs du Client.</Text>

        <Text style={styles.subSectionTitle}>3.3 Construction et suivi du portefeuille</Text>
        <Text style={styles.text}>Élaboration d'une stratégie d'allocation d'actifs adaptée aux objectifs du Client. Suivi régulier du portefeuille, ajustements selon l'évolution des marchés et reporting périodique sur les performances.</Text>

        <Text style={styles.subSectionTitle}>3.4 Accompagnement à l'ouverture de compte SGI</Text>
        <Text style={styles.text}>Assistance complète dans les démarches d'ouverture d'un compte titres auprès d'une Société de Gestion et d'Intermédiation (SGI) partenaire agréée — obligatoire pour investir sur la BRVM. Ce service est inclus sans frais supplémentaires dans les formules Horizon et Patrimoine.</Text>
        <Text style={[styles.text, { fontStyle: 'italic', fontSize: 8 }]}>Note : les frais de courtage SGI lors des transactions sont à la charge exclusive du Client et varient selon la SGI partenaire choisie.</Text>

        <Text style={styles.subSectionTitle}>3.5 Reporting</Text>
        <Text style={styles.text}>Production de rapports périodiques sur la performance du portefeuille et l'évolution du patrimoine, selon la périodicité définie dans la formule souscrite — trimestriel pour Horizon, mensuel pour Patrimoine et Elite Corporate.</Text>

        <Text style={styles.subSectionTitle}>3.6 Rendez-vous conseil</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Organisation des rendez-vous de suivi conformément à la formule souscrite — en présentiel ou par visioconférence selon les disponibilités des parties. Les dates sont arrêtées d'un commun accord avec un préavis minimum de 48 heures.</Text>
        </View>

        {renderFooter()}
      </Page>

      {/* ===================================================================== */}
      {/* PAGE 3 : OBLIGATIONS (ART. 4), HONORAIRES (ART. 5), RISQUES (ART. 6) */}
      {/* ===================================================================== */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 4</Text>
          <Text style={styles.articleTitle}>OBLIGATIONS DU CLIENT</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Fournir des informations complètes, exactes et sincères sur sa situation financière, patrimoniale et fiscale</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Informer DM+ Investment de tout changement significatif de sa situation dans un délai raisonnable</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Prendre lui-même les décisions d'investissement sur la base des recommandations formulées — DM+ Investment n'agit pas en qualité de mandataire de gestion</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Assurer la disponibilité des fonds nécessaires à la mise en œuvre des décisions d'investissement</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Régler les honoraires dans les délais prévus</Text>
        </View>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 5</Text>
          <Text style={styles.articleTitle}>HONORAIRES & CONDITIONS FINANCIÈRES</Text>
        </View>

        <Text style={styles.subSectionTitle}>5.1 Abonnement</Text>
        <Text style={styles.text}>Le Client s'acquitte d'un abonnement selon la périodicité et le montant définis à l'Article 2. L'abonnement est dû dès la prise d'effet de la convention, indépendamment du niveau d'activité du portefeuille.</Text>

        <Text style={styles.subSectionTitle}>5.2 Commission sur actifs gérés (AUM)</Text>
        <Text style={styles.text}>Une commission annuelle est prélevée sur les actifs effectivement gérés par DM+ Investment, selon le taux défini à l'Article 2. Cette commission est prélevée <Text style={styles.textBold}>trimestriellement</Text>, au prorata des actifs gérés à la date de prélèvement.</Text>

        <Text style={styles.subSectionTitle}>5.3 Missions spécifiques</Text>
        <Text style={styles.text}>Toute mission spécifique non couverte par l'abonnement — étude de faisabilité, conseil en transmission patrimoniale, restructuration, conseil immobilier — fait l'objet d'un <Text style={styles.textBold}>devis préalable accepté par écrit</Text> par le Client avant tout engagement.</Text>

        <Text style={styles.subSectionTitle}>5.4 Modalités de paiement</Text>
        <View style={styles.bulletPoint}>
          <View style={styles.checkbox}><Text></Text></View>
          <Text style={styles.text}>Virement bancaire</Text>
        </View>
        <View style={styles.bulletPoint}>
          <View style={styles.checkbox}><Text></Text></View>
          <Text style={styles.text}>Mobile Money (Wave / Orange Money)</Text>
        </View>
        <View style={styles.bulletPoint}>
          <View style={styles.checkbox}><Text></Text></View>
          <Text style={styles.text}>Chèque bancaire</Text>
        </View>

        <Text style={styles.subSectionTitle}>5.5 Retard de paiement</Text>
        <Text style={styles.text}>Tout retard de paiement supérieur à 30 jours entraîne la suspension des prestations jusqu'à régularisation.</Text>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 6</Text>
          <Text style={styles.articleTitle}>AVERTISSEMENT SUR LES RISQUES</Text>
        </View>

        <Text style={styles.text}>Le Client reconnaît avoir été informé que :</Text>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Tout investissement sur les marchés financiers comporte des risques, notamment de perte en capital</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Les performances passées ne préjugent pas des performances futures</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>Les recommandations formulées par DM+ Investment sont basées sur les informations disponibles à la date de leur formulation et peuvent évoluer</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>DM+ Investment ne garantit aucun rendement ni aucun niveau de performance</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>L'investissement sur la BRVM est soumis aux fluctuations des marchés de l'UEMOA</Text>
        </View>

        {renderFooter()}
      </Page>

      {/* ===================================================================== */}
      {/* PAGE 4 : CONFIDENTIALITÉ, DURÉE, RÉSILIATION ET RESPONSABILITÉ */}
      {/* ===================================================================== */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 7</Text>
          <Text style={styles.articleTitle}>CONFIDENTIALITÉ & PROTECTION DES DONNÉES</Text>
        </View>
        
        <Text style={styles.text}>DM+ Investment s'engage à maintenir la <Text style={styles.textBold}>stricte confidentialité</Text> de toutes les informations communiquées par le Client dans le cadre de la présente convention. Ces informations ne peuvent être divulguées à des tiers sans l'accord préalable écrit du Client, sauf obligation légale ou réglementaire.</Text>
        <Text style={styles.text}>Le Client autorise DM+ Investment à traiter ses données personnelles et financières dans le strict cadre de la relation contractuelle, conformément à la réglementation en vigueur sur la protection des données personnelles. Cette obligation de confidentialité survit à la résiliation de la convention pour une durée de <Text style={styles.textBold}>3 ans</Text> à compter de la date de résiliation.</Text>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 8</Text>
          <Text style={styles.articleTitle}>DURÉE & RENOUVELLEMENT</Text>
        </View>

        <Text style={styles.text}>La présente convention est conclue pour une <Text style={styles.textBold}>durée initiale de 12 mois</Text> à compter de sa date de prise d'effet. Elle est renouvelable <Text style={styles.textBold}>tacitement</Text> par périodes successives de même durée, sauf dénonciation par l'une des parties dans les conditions prévues à l'Article 9.</Text>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 9</Text>
          <Text style={styles.articleTitle}>RÉSILIATION</Text>
        </View>

        <Text style={styles.subSectionTitle}>9.1 Résiliation à l'initiative du Client</Text>
        <Text style={styles.text}>Le Client peut résilier la convention à tout moment, sous réserve d'un préavis de :</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>1 mois pour les formules à abonnement mensuel</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>1 trimestre pour les formules à abonnement trimestriel</Text>
        </View>
        <Text style={styles.text}>La résiliation est notifiée par email ou courrier à DM+ Investment. Les honoraires correspondant à la période de préavis restent intégralement dus.</Text>

        <Text style={styles.subSectionTitle}>9.2 Résiliation à l'initiative de DM+ Investment</Text>
        <Text style={styles.text}>DM+ Investment peut résilier la convention, avec un préavis de 30 jours, en cas de manquement grave du Client à ses obligations — notamment : défaut de paiement persistant, fourniture d'informations inexactes ou incomplètes, refus de coopération compromettant l'exercice du conseil.</Text>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 10</Text>
          <Text style={styles.articleTitle}>ÉVOLUTION DE LA FORMULE</Text>
        </View>

        <Text style={styles.text}>Le Client peut à tout moment demander le passage à une formule supérieure, <Text style={styles.textBold}>sans frais de transition</Text>. La différence d'honoraires est calculée au prorata de la période restante et fait l'objet d'un avenant écrit signé par les deux parties. Toute modification de la formule prend effet à la date convenue d'un commun accord.</Text>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 11</Text>
          <Text style={styles.articleTitle}>RESPONSABILITÉ</Text>
        </View>

        <Text style={styles.text}>DM+ Investment est tenu à une <Text style={styles.textBold}>obligation de moyens</Text> et non de résultats. Sa responsabilité ne peut être engagée que pour des fautes avérées dans la fourniture des prestations définies à l'Article 3, dans la limite des honoraires perçus au titre des 12 derniers mois précédant le fait générateur.</Text>
        <Text style={styles.text}>DM+ Investment ne peut être tenu responsable des pertes résultant des décisions d'investissement prises par le Client sur la base de ses recommandations, ni des évolutions défavorables des marchés financiers, ni de tout événement de force majeure.</Text>

        {renderFooter()}
      </Page>

      {/* ===================================================================== */}
      {/* PAGE 5 : DISPOSITIONS GÉNÉRALES ET SIGNATURES */}
      {/* ===================================================================== */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}

        <View style={[styles.articleHeader, { marginTop: 0 }]}>
          <Text style={styles.articleNum}>ART. 12</Text>
          <Text style={styles.articleTitle}>RÈGLEMENT DES DIFFÉRENDS</Text>
        </View>

        <Text style={styles.text}>En cas de litige relatif à l'interprétation ou à l'exécution de la présente convention, les parties s'engagent à rechercher une solution amiable dans un délai de <Text style={styles.textBold}>30 jours</Text> à compter de la notification du différend. À défaut d'accord amiable, le litige sera soumis aux <Text style={styles.textBold}>juridictions compétentes de Dakar, Sénégal</Text>, auxquelles les parties font expressément attribution de juridiction.</Text>

        <View style={styles.articleHeader}>
          <Text style={styles.articleNum}>ART. 13</Text>
          <Text style={styles.articleTitle}>DISPOSITIONS GÉNÉRALES</Text>
        </View>

        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>○</Text>
          <Text style={styles.text}>La présente convention annule et remplace tout accord antérieur entre les parties portant sur le même objet</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>○</Text>
          <Text style={styles.text}>Toute modification doit faire l'objet d'un avenant écrit signé par les deux parties</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>○</Text>
          <Text style={styles.text}>La nullité d'une clause n'entraîne pas la nullité de l'ensemble de la convention</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>○</Text>
          <Text style={styles.text}>La convention est régie par le droit sénégalais</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>○</Text>
          <Text style={styles.text}>Elle est établie en deux exemplaires originaux — un pour chaque partie</Text>
        </View>

        <Text style={[styles.text, { marginTop: 40 }]}>La signature du titulaire doit être précédée de la mention manuscrite " lu et approuvé "</Text>

        <View style={styles.signatureBox}>
          <View style={styles.signatureCol}>
            <Text style={styles.signatureHeader}>Pour DM+ Investment</Text>
            <View style={styles.signatureContent}>
              <Text style={styles.textBold}>GBANE ALMAMY MAHAMA</Text>
              <Text style={{ fontStyle: 'italic', color: '#6b7280', marginBottom: 5 }}>Directeur Général</Text>
              <Text style={{ color: '#6b7280' }}>Digital Mind+ Group</Text>
            </View>
          </View>

          <View style={styles.signatureCol}>
            <Text style={styles.signatureHeader}>Pour le Client</Text>
            <View style={styles.signatureContent}>
              <Text style={{ color: '#6b7280' }}>Nom & Prénom : ____________________</Text>
            </View>
          </View>
        </View>

        {renderFooter()}
      </Page>

      {/* ===================================================================== */}
      {/* PAGE 6 : ANNEXE - QUESTIONNAIRE DE PROFILAGE */}
      {/* ===================================================================== */}
      <Page size="A4" style={styles.page}>
        {renderHeader()}
        {renderFooter()}

        <View style={[styles.titleContainer, { marginBottom: 10 }]}>
          <Text style={styles.mainTitle}>ANNEXE - QUESTIONNAIRE DE PROFILAGE ET PRÉFÉRENCES</Text>
        </View>

        <Text style={[styles.textBold, { marginBottom: 5 }]}>1. Profil Professionnel</Text>
        <View style={[styles.clientBox, { marginBottom: 10, marginTop: 5, padding: 8 }]}>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Statut pro. :</Text><Text style={styles.clientBoxValue}>{safeData.statutPro || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Secteur d'activité :</Text><Text style={styles.clientBoxValue}>{safeData.professionSecActivite || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Employeur :</Text><Text style={styles.clientBoxValue}>{safeData.employeur || 'N/A'}</Text></View>
        </View>

        <Text style={[styles.textBold, { marginBottom: 5 }]}>2. Objectifs et Horizon d'Investissement</Text>
        <View style={[styles.clientBox, { marginBottom: 10, marginTop: 5, padding: 8 }]}>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Profil Client :</Text><Text style={styles.clientBoxValue}>{safeData.profilClient || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Objectif Principal :</Text><Text style={styles.clientBoxValue}>{safeData.objectifPrincipal || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Horizon Inv. :</Text><Text style={styles.clientBoxValue}>{safeData.horizonInvestissement || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Tolérance Risque :</Text><Text style={styles.clientBoxValue}>{safeData.toleranceRisque || 'N/A'}</Text></View>
        </View>

        <Text style={[styles.textBold, { marginBottom: 5 }]}>3. Expérience et Situation Financière</Text>
        <View style={[styles.clientBox, { marginBottom: 10, marginTop: 5, padding: 8 }]}>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Expérience Inv. :</Text><Text style={styles.clientBoxValue}>{safeData.experienceInvestissement || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Instruments Exp. :</Text><Text style={styles.clientBoxValue}>{safeData.instrumentsExp || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Revenus Mensuels :</Text><Text style={styles.clientBoxValue}>{safeData.revenus || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Capital à Investir :</Text><Text style={styles.clientBoxValue}>{safeData.capitalInvestir || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Patrimoine Existant :</Text><Text style={styles.clientBoxValue}>{safeData.patrimoineExistant || 'N/A'}</Text></View>
        </View>

        <Text style={[styles.textBold, { marginBottom: 5 }]}>4. Services et Préférences</Text>
        <View style={[styles.clientBox, { marginBottom: 10, marginTop: 5, padding: 8 }]}>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Services Souhaités :</Text><Text style={styles.clientBoxValue}>{safeData.servicesSouhaites || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Fréquence Suivi :</Text><Text style={styles.clientBoxValue}>{safeData.frequenceSuivi || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Mode Consult. :</Text><Text style={styles.clientBoxValue}>{safeData.modeConsultation || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Membre BRVM ? :</Text><Text style={styles.clientBoxValue}>{safeData.membreBRVM || 'N/A'}</Text></View>
          <View style={styles.clientBoxRow}><Text style={styles.clientBoxLabel}>Dépôt Initial :</Text><Text style={styles.clientBoxValue}>{safeData.depotInitial || 'N/A'}</Text></View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
