import { useState } from "react";
import clsx from "clsx";
import { 
  Check, 
  TrendingUp, 
  Gem, 
  Factory, 
  Layout, 
  FileText, 
  X, 
  ChevronDown,
  Globe,
  Database,
  Star,
  Zap,
  BarChart3,
  Building2
} from "lucide-react";

const membershipTranslations = {
  FR: {
    conditionsTitle: "CONDITIONS GÉNÉRALES",
    conditionsBrand: "DM+ INVESTMENT",
    conditionsSub: "Conditions d'Adhésion",
    documentContractuel: "Document Contractuel",
    conditionsGeneralesAdhesion: "CONDITIONS GÉNÉRALES D'ADHÉSION",
    conditionsIntro: "En cochant la case d'acceptation, vous reconnaissez avoir pris connaissance et acceptez les présentes Conditions Générales d'Adhésion ainsi que la Politique de Confidentialité de DM+ Investment.",
    selectTitle: "SÉLECTIONNEZ VOTRE",
    selectAccent: "FORMULE D'ACCOMPAGNEMENT",
    selectDesc: "Découvrez nos formules conçues pour optimiser votre patrimoine sur la BRVM selon votre profil et vos objectifs.",
    voirPlus: "Voir plus",
    voirMoins: "Voir moins",
    selectionner: "Sélectionner",
    selectionne: "Sélectionné ✓",
    inclus: "Inclus dans la formule :",
    avantages: "Avantages supplémentaires :",
    fonctionnalites: "Fonctionnalités exclusives :",
    cibleIdeale: "Cible idéale",
    obligatoire: "Case à cocher obligatoire:",
    obligatoireText: "Je reconnais avoir pris connaissance et j'accepte les présentes Conditions Générales d'Adhésion ainsi que la Politique de Confidentialité de DM+ Investment.",
    lexique: "LEXIQUE",
    art1Title: "INFORMATIONS LÉGALES",
    art1Sub: "DM+ Investment et DM+ Group",
    art2Title: "FINALITÉ DE LA COLLECTE DES DONNÉES",
    art2Sub: "Utilisation des données personnelles",
    art3Title: "BASE LÉGALE DU TRAITEMENT",
    art3Sub: "Fondement juridique",
    art4Title: "DURÉE DE CONSERVATION DES DONNÉES",
    art4Sub: "Période de rétention",
    art5Title: "DROITS DE L'UTILISATEUR",
    art5Sub: "Droits RGPD et loi sénégalaise",
    art6Title: "CONFIDENTIALITÉ ET SÉCURITÉ",
    art6Sub: "Protection des données",
    art7Title: "PROPRIÉTÉ INTELLECTUELLE",
    art7Sub: "Droits d'auteur et marques",
    art8Title: "RESPONSABILITÉ",
    art8Sub: "Limites de responsabilité",
    art9Title: "COOKIES",
    art9Sub: "Gestion des cookies",
    art10Title: "LIENS HYPERTEXTES",
    art10Sub: "Sites tiers",
    art11Title: "MODIFICATION DES CONDITIONS GÉNÉRALES",
    art11Sub: "Mises à jour contractuelles",
    art12Title: "DROIT APPLICABLE ET JURIDICTION",
    art12Sub: "Litiges et tribunaux compétents",
  },
  EN: {
    conditionsTitle: "GENERAL CONDITIONS",
    conditionsBrand: "DM+ INVESTMENT",
    conditionsSub: "Membership Conditions",
    documentContractuel: "Contractual Document",
    conditionsGeneralesAdhesion: "GENERAL MEMBERSHIP CONDITIONS",
    conditionsIntro: "By checking the acceptance box, you acknowledge that you have read and accept these General Membership Conditions as well as the Privacy Policy of DM+ Investment.",
    selectTitle: "SELECT YOUR",
    selectAccent: "MEMBERSHIP PLAN",
    selectDesc: "Discover our plans designed to optimize your wealth on the BRVM according to your profile and objectives.",
    voirPlus: "See more",
    voirMoins: "See less",
    selectionner: "Select",
    selectionne: "Selected ✓",
    inclus: "Included in the plan:",
    avantages: "Additional benefits:",
    fonctionnalites: "Exclusive features:",
    cibleIdeale: "Ideal target",
    obligatoire: "Mandatory checkbox:",
    obligatoireText: "I acknowledge that I have read and accept these General Membership Conditions as well as the Privacy Policy of DM+ Investment.",
    lexique: "GLOSSARY",
    art1Title: "LEGAL INFORMATION",
    art1Sub: "DM+ Investment and DM+ Group",
    art2Title: "PURPOSE OF DATA COLLECTION",
    art2Sub: "Use of personal data",
    art3Title: "LEGAL BASIS FOR PROCESSING",
    art3Sub: "Legal foundation",
    art4Title: "DATA RETENTION PERIOD",
    art4Sub: "Retention period",
    art5Title: "USER RIGHTS",
    art5Sub: "GDPR and Senegalese law rights",
    art6Title: "CONFIDENTIALITY AND SECURITY",
    art6Sub: "Data protection",
    art7Title: "INTELLECTUAL PROPERTY",
    art7Sub: "Copyrights and trademarks",
    art8Title: "LIABILITY",
    art8Sub: "Limits of liability",
    art9Title: "COOKIES",
    art9Sub: "Cookie management",
    art10Title: "HYPERLINKS",
    art10Sub: "Third-party sites",
    art11Title: "MODIFICATION OF GENERAL CONDITIONS",
    art11Sub: "Contractual updates",
    art12Title: "APPLICABLE LAW AND JURISDICTION",
    art12Sub: "Disputes and competent courts",
  }
};

const MembershipConditions = ({ onClose, isStep = false, selectedTier, onTierSelect, lang = "FR" }) => {
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [expandedServices, setExpandedServices] = useState({});
  const mt = membershipTranslations[lang] || membershipTranslations.FR;

  const toggleServices = (tierId, e) => {
    if (e) e.stopPropagation();
    setExpandedServices(prev => ({
      ...prev,
      [tierId]: !prev[tierId]
    }));
  };

  const toggleArticle = (articleId) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  const tiers = lang === "EN" ? [
    {
      id: "marche-financier",
      title: "DM+ INVEST HORIZON",
      subtitle: "Saver & individual investor",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      discount: null,
      oldPrice: null,
      currentPrice: "30 000",
      priceSuffix: "FCFA / quarter",
      offer: null,
      renewalPrice: "AUM Commission: 1% / year, billed quarterly",
      featured: false,
      features: {
        basic: [
          { icon: Globe, text: "Access to DM+ BRVM markets platform" },
          { icon: BarChart3, text: "Construction of a personalized portfolio" },
          { icon: Database, text: "Bonds + alternative assets" }
        ],
        premium: [
          { icon: Check, text: "Quarterly monitoring with detailed reporting", badge: null },
          { icon: Check, text: "1 advisory meeting per quarter", badge: null },
          { icon: Check, text: "Market opportunity alerts", badge: null }
        ],
        exclusive: []
      },
      includedBox: {
        title: "SGI account opening support",
        desc: "Full assistance for opening your securities account with a partner SGI — included at no extra cost."
      },
      target: "Employees, entrepreneurs, African diaspora — capital 500,000 to 5,000,000 FCFA"
    },
    {
      id: "prestige",
      title: "DM+ INVEST PATRIMOINE",
      subtitle: "Senior executives, business leaders",
      icon: Gem,
      color: "from-[#deb833] to-[#b8962a]",
      discount: null,
      oldPrice: null,
      currentPrice: "75 000",
      priceSuffix: "FCFA / quarter",
      offer: null,
      renewalPrice: "AUM Commission: 1%/year — Specific mission fees: from 150,000 FCFA",
      featured: true,
      features: {
        basic: [
          { icon: Globe, text: "All Horizon plan content" },
          { icon: BarChart3, text: "Global wealth advisory (financial + real estate + estate)" },
          { icon: Database, text: "Diversified multi-asset portfolio" },
          { icon: Zap, text: "Wealth transfer strategy" },
          { icon: Star, text: "Priority access to opportunities" }
        ],
        premium: [
          { icon: Check, text: "Personalized monthly reporting", badge: null },
          { icon: Check, text: "Access to DM+ Investment premium platform", badge: null }
        ],
        exclusive: [
          { icon: Star, text: "2 meetings per quarter with a dedicated advisor" },
          { icon: Star, text: "Complete global wealth advisory" },
          { icon: Star, text: "Tax optimization and transfer strategy" }
        ]
      },
      includedBox: {
        title: "SGI account opening support",
        desc: "Full assistance for opening your securities account with a partner SGI — included at no extra cost."
      },
      target: "Senior executives, business leaders"
    },
    {
      id: "corporate",
      title: "DM+ INVEST CORPORATE",
      subtitle: "SMEs, mid-caps, institutions",
      icon: Factory,
      color: "from-slate-700 to-slate-900",
      discount: null,
      oldPrice: null,
      currentPrice: "From 500 000",
      priceSuffix: "FCFA / month",
      offer: null,
      featured: false,
      features: {
        basic: [
          { icon: Building2, text: "Treasury audit & investment advisory" },
          { icon: BarChart3, text: "Institutional portfolio management" },
          { icon: Database, text: "KPI BI integration with DM+ Analytics" }
        ],
        premium: [
          { icon: Check, text: "Personalized monthly board reporting", badge: null },
          { icon: Check, text: "Strategic investment recommendations", badge: null }
        ],
        exclusive: [
          { icon: Star, text: "Dedicated senior advisor — exclusive single point of contact" },
          { icon: Star, text: "Monthly investment committee with executive presentation" },
          { icon: Star, text: "Access to DM+ Investment premium platform" }
        ]
      },
      target: "SMEs, mid-caps, institutions"
    }
  ] : [
    {
      id: "marche-financier",
      title: "DM+ INVEST HORIZON",
      subtitle: "Épargnant & investisseur particulier",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      discount: null,
      oldPrice: null,
      currentPrice: "30 000",
      priceSuffix: "FCFA / trimestre",
      offer: null,
      featured: false,
      features: {
        basic: [
          { icon: Globe, text: "Accès à la plateforme DM+ marchés BRVM" },
          { icon: BarChart3, text: "Construction d'un portefeuille personnalisé" },
          { icon: Database, text: "Obligations + actifs alternatifs" }
        ],
        premium: [
          { icon: Check, text: "Suivi trimestriel avec reporting détaillé", badge: null },
          { icon: Check, text: "1 rendez-vous conseil par trimestre", badge: null },
          { icon: Check, text: "Alertes opportunités marchés", badge: null }
        ],
        exclusive: []
      },
      target: "Salariés, entrepreneurs, diaspora africaine"
    },
    {
      id: "prestige",
      title: "DM+ INVEST PATRIMOINE",
      subtitle: "Cadres supérieurs, chefs d'entreprise",
      icon: Gem,
      color: "from-[#deb833] to-[#b8962a]",
      discount: null,
      oldPrice: null,
      currentPrice: "75 000",
      priceSuffix: "FCFA / trimestre",
      offer: null,
      featured: true,
      features: {
        basic: [
          { icon: Globe, text: "Tout le contenu de la formule Horizon" },
          { icon: BarChart3, text: "Conseil patrimonial global (financier + immobilier + successoral)" },
          { icon: Database, text: "Portefeuille diversifié multi-actifs" },
        ],
        premium: [
          { icon: Check, text: "Reporting mensuel personnalisé", badge: null },
          { icon: Check, text: "Accès plateforme DM+ Investment premium", badge: null },
          { icon: Star, text: "2 rendez-vous par trimestre avec conseiller dédié" },
        ],
      
      },
      target: "Cadres supérieurs, chefs d'entreprise"
    },
    {
      id: "corporate",
      title: "DM+ INVEST CORPORATE",
      subtitle: "PME, ETI, institutions",
      icon: Factory,
      color: "from-slate-700 to-slate-900",
      discount: null,
      oldPrice: null,
      currentPrice: "À partir de 500 000",
      priceSuffix: "FCFA / mois",
      offer: null,
      featured: false,
      features: {
        basic: [
          { icon: Building2, text: "Audit & conseil de trésorerie et placement" },
          { icon: BarChart3, text: "Gestion de portefeuille institutionnel" },
          { icon: Database, text: "Intégration KPI BI avec DM+ Analytics" }
        ],
        premium: [
          { icon: Check, text: "Reporting mensuel personnalisé comité de direction", badge: null },
          { icon: Check, text: "Recommandations de placement stratégiques", badge: null },
          { icon: Star, text: "Conseiller senior dédié — interlocuteur unique exclusif" },
        ],
      },
      target: "PME, ETI, institutions"
    }
  ];

  return (
    <div className={clsx('bg-white', 'font-sans', 'text-slate-600')}>
      {!isStep && (
        <div className={clsx('sticky', 'top-0', 'z-10', 'bg-white/95', 'backdrop-blur-md', 'border-b', 'border-slate-100', 'pb-6', 'mb-8', 'flex', 'items-center', 'justify-between', 'px-2')}>
          <div className={clsx('flex', 'items-center', 'gap-4')}>
            <div className={clsx('h-12', 'w-12', 'flex', 'items-center', 'justify-center', 'rounded-xl', 'bg-[#deb833]/5', 'text-[#deb833]', 'border', 'border-[#deb833]/10')}>
              <Layout size={24} />
            </div>
            <div>
              <h1 className={clsx('font-display', 'text-2xl', 'font-black', 'text-[#332E32]', 'leading-none', 'tracking-tighter', 'uppercase')}>
                {mt.conditionsTitle} <span className="text-[#deb833]">{mt.conditionsBrand}</span>
              </h1>
              <p className={clsx('text-[9px]', 'font-black', 'uppercase', 'tracking-[0.2em]', 'text-slate-400', 'mt-1.5')}>{mt.conditionsSub}</p>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className={clsx('h-10', 'w-10', 'flex', 'items-center', 'justify-center', 'rounded-full', 'bg-slate-50', 'border', 'border-slate-200', 'text-slate-400', 'hover:text-[#332E32]', 'transition-colors')}
            >
              <X size={18} />
            </button>
          )}
        </div>
      )}

      {/* Section Conditions Générales */}
      {!isStep && (
        <div className={clsx('max-w-4xl', 'mx-auto', 'px-4', 'pb-8')}>
          <div className={clsx('bg-linear-to-r', 'from-[#deb833]/5', 'to-[#b8962a]/2', 'border', 'border-[#deb833]/20', 'rounded-2xl', 'p-8', 'mb-8')}>
            <div className={clsx('text-center', 'space-y-4')}>
              <div className={clsx('inline-flex', 'items-center', 'gap-3', 'px-4', 'py-2', 'bg-[#deb833]/10', 'border', 'border-[#deb833]/20', 'rounded-full')}>
                <FileText size={16} className="text-[#deb833]" />
                <span className={clsx('text-[11px]', 'font-black', 'text-[#deb833]', 'uppercase', 'tracking-wider')}>{mt.documentContractuel}</span>
              </div>
              <h2 className={clsx('text-xl', 'font-black', 'text-[#332E32]', 'tracking-tight')}>
                {mt.conditionsGeneralesAdhesion}
              </h2>
              <p className={clsx('text-[11px]', 'text-slate-600', 'leading-relaxed', 'max-w-2xl', 'mx-auto')}>
                {mt.conditionsIntro}
              </p>
            </div>
          </div>

          {/* Articles */}
          <div className="space-y-6">
            {[
              { id: 'article1', num: 1, title: mt.art1Title, sub: mt.art1Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <div><strong>{lang==='EN'?'Company name:':'Dénomination sociale:'}</strong> DM+ Investment</div>
                  <div><strong>{lang==='EN'?'Parent company:':'Société mère:'}</strong> DM+ Group</div>
                  <div><strong>{lang==='EN'?'Registered office:':'Siège social:'}</strong> Medina, Rue 35 angle 24, Dakar (Sénégal)</div>
                  <div><strong>{lang==='EN'?'Contact email:':'Email de contact:'}</strong> investment@dmplus-group.com</div>
                  <div><strong>{lang==='EN'?'Phone:':'Téléphone:'}</strong> 33 829 58 06 / 76 663 82 19</div>
                  <div><strong>{lang==='EN'?'Website:':'Site internet:'}</strong> www.dmplus-group.com</div>
                </div>
              )},
              { id: 'article2', num: 2, title: mt.art2Title, sub: mt.art2Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'The personal data collected via the membership form are exclusively intended to establish and manage a commercial relationship with the User.':'Les données personnelles collectées via le formulaire d\'adhésion sont exclusivement destinées à établir et gérer une relation commerciale avec l\'Utilisateur.'}</p>
                  <ul className={clsx('space-y-1', 'list-disc', 'list-inside')}>
                    {lang==='EN'?<>
                      <li>Creation and management of your member account</li>
                      <li>Responding to your information or assistance requests</li>
                      <li>Information on our offers, products and financial market news (BRVM and others)</li>
                      <li>Realizing your investor profiling and developing an investment strategy adapted to your risk profile</li>
                      <li>Managing access to our digital client portal and your personalized dashboards</li>
                    </>:<>
                      <li>Création et gestion de votre compte membre</li>
                      <li>Réponse à vos demandes d'information ou d'assistance</li>
                      <li>Information sur nos offres, produits et actualités des marchés financiers (BRVM et autres)</li>
                      <li>Réalisation de votre profiling d'investisseur et élaboration d'une stratégie d'investissement adaptée à votre profil de risque</li>
                      <li>Gestion de l'accès à notre portail client digital et à vos tableaux de bord personnalisés</li>
                    </>}
                  </ul>
                </div>
              )},
              { id: 'article3', num: 3, title: mt.art3Title, sub: mt.art3Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'The processing of personal data is based on your consent, expressed by filling out and submitting the membership form.':'Le traitement des données personnelles repose sur votre consentement, exprimé par le remplissage et la soumission du formulaire d\'adhésion.'}</p>
                  <p>{lang==='EN'?'It is also based on pre-contractual and contractual measures, in particular for account opening, subscription to advisory services or investment support.':'Il repose également sur les mesures précontractuelles et contractuelles, notamment pour l\'ouverture de compte, la souscription aux services de conseil ou l\'accompagnement en investissement.'}</p>
                </div>
              )},
              { id: 'article4', num: 4, title: mt.art4Title, sub: mt.art4Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'Personal data is retained by the Company for a period consistent with the purposes for which it was collected.':'Les données personnelles sont conservées par la Société pour une durée conforme aux finalités pour lesquelles elles ont été collectées.'}</p>
                  <ul className={clsx('space-y-1', 'list-disc', 'list-inside')}>
                    {lang==='EN'?<>
                      <li>Throughout the duration of the commercial relationship</li>
                      <li>Archived for five (5) years after the end of the relationship for administrative, statistical and legal reasons, or in accordance with applicable financial regulatory requirements</li>
                    </>:<>
                      <li>Pendant toute la durée de la relation commerciale</li>
                      <li>Archivées pendant cinq (5) ans après la fin de la relation pour des raisons administratives, statistiques et légales, ou conformément aux exigences réglementaires financières applicables</li>
                    </>}
                  </ul>
                </div>
              )},
              { id: 'article5', num: 5, title: mt.art5Title, sub: mt.art5Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'In accordance with Senegalese law n° 2008-12 of January 25, 2008, you have the right to access, rectify, update, erase and object to the processing of your personal data for legitimate reasons.':'Conformément à la loi sénégalaise n° 2008-12 du 25 janvier 2008, vous disposez d\'un droit d\'accès, de rectification, de mise à jour, d\'effacement et d\'opposition au traitement de vos données personnelles pour des motifs légitimes.'}</p>
                  <p>{lang==='EN'?'You can also withdraw your consent at any time.':'Vous pouvez également retirer votre consentement à tout moment.'}</p>
                  <p>{lang==='EN'?'To exercise these rights or for any questions regarding data processing, send a request with valid proof of identity to the address indicated in Article 1.':'Pour exercer ces droits ou pour toute question concernant le traitement des données, envoyez une demande avec une preuve d\'identité valide à l\'adresse indiquée à l\'article 1.'}</p>
                </div>
              )},
              { id: 'article6', num: 6, title: mt.art6Title, sub: mt.art6Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'DM+ Investment is solely responsible for data processing.':'DM+ Investment est seul responsable du traitement des données.'}</p>
                  <p>{lang==='EN'?'Information is never transferred or sold to third parties without your explicit consent, except as required by law.':'Les informations ne sont jamais transférées ou vendues à des tiers sans votre consentement explicite, sauf obligation légale.'}</p>
                  <p>{lang==='EN'?'We implement all appropriate technical and organizational measures to ensure the security and confidentiality of your data.':'Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité de vos données.'}</p>
                </div>
              )},
              { id: 'article7', num: 7, title: mt.art7Title, sub: mt.art7Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'All content on the site (texts, images, logos, graphics, etc.) is protected by intellectual property law.':'L\'ensemble du contenu du site (textes, images, logos, graphismes, etc.) est protégé par le droit de la propriété intellectuelle.'}</p>
                  <p>{lang==='EN'?'Any reproduction, representation, modification or exploitation of this content, without express authorization, is prohibited.':'Toute reproduction, représentation, modification ou exploitation de ce contenu, sans autorisation expresse, est interdite.'}</p>
                </div>
              )},
              { id: 'article8', num: 8, title: mt.art8Title, sub: mt.art8Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'DM+ Investment cannot be held liable for direct or indirect damages resulting from the use of the site or services.':'DM+ Investment ne saurait être tenue responsable des dommages directs ou indirects résultant de l\'utilisation du site ou des services.'}</p>
                  <p>{lang==='EN'?'Investment advice is provided for informational purposes and does not engage the Company\'s liability in the event of loss.':'Les conseils en investissement sont fournis à titre informatif et n\'engagent pas la responsabilité de la Société en cas de perte.'}</p>
                </div>
              )},
              { id: 'article9', num: 9, title: mt.art9Title, sub: mt.art9Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'The site uses cookies to improve navigation, personalize content and compile statistics.':'Le site utilise des cookies pour améliorer la navigation, personnaliser le contenu et réaliser des statistiques.'}</p>
                  <p>{lang==='EN'?'By continuing to browse, you accept the use of cookies. You can refuse cookies, but this may affect certain site features.':'En continuant à naviguer, vous acceptez l\'utilisation de cookies. Vous pouvez refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.'}</p>
                </div>
              )},
              { id: 'article10', num: 10, title: mt.art10Title, sub: mt.art10Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'The site may contain links to third-party sites (partners, financial institutions, etc.).':'Le site peut contenir des liens vers des sites tiers (partenaires, institutions financières, etc.).'}</p>
                  <p>{lang==='EN'?'DM+ Investment has no control over the content or privacy practices of these third-party sites and disclaims any liability for damage.':'DM+ Investment n\'exerce aucun contrôle sur le contenu ou les pratiques de confidentialité de ces sites tiers et décline toute responsabilité en cas de dommage.'}</p>
                </div>
              )},
              { id: 'article11', num: 11, title: mt.art11Title, sub: mt.art11Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'DM+ Investment reserves the right to modify these General Conditions at any time without notice.':'DM+ Investment se réserve le droit de modifier les présentes Conditions Générales à tout moment sans préavis.'}</p>
                  <p>{lang==='EN'?'The new version will be applicable as soon as it is published online. It is your responsibility to consult them regularly.':'La nouvelle version sera applicable dès sa mise en ligne. Il vous incombe de les consulter régulièrement.'}</p>
                  <p>{lang==='EN'?'Continued use of the service after modification implies acceptance of the new conditions.':'La poursuite de l\'utilisation du service après modification implique l\'acceptation des nouvelles conditions.'}</p>
                </div>
              )},
              { id: 'article12', num: 12, title: mt.art12Title, sub: mt.art12Sub, content: (
                <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                  <p>{lang==='EN'?'These General Conditions are governed by Senegalese law.':'Les présentes Conditions Générales sont régies par le droit sénégalais.'}</p>
                  <p>{lang==='EN'?'In the event of a dispute related to the use of the membership form, the site, the client portal or DM+ Investment services, and in the absence of an amicable resolution, the courts of Dakar shall have sole jurisdiction.':'En cas de litige lié à l\'utilisation du formulaire d\'adhésion, du site, du portail client ou des services de DM+ Investment, et en l\'absence de résolution amiable, les tribunaux de Dakar sont seuls compétents.'}</p>
                </div>
              )},
            ].map(({ id, num, title, sub, content }) => (
              <div key={id} className={clsx('bg-white', 'border', 'border-slate-200', 'rounded-xl', 'overflow-hidden')}>
                <button 
                  onClick={() => toggleArticle(id)}
                  className={clsx('w-full', 'px-6', 'py-4', 'flex', 'items-center', 'justify-between', 'hover:bg-slate-50', 'transition-colors')}
                >
                  <div className={clsx('flex', 'items-center', 'gap-4')}>
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-black text-sm ${num >= 6 ? 'bg-[#deb833]/10 text-[#deb833]' : 'bg-[#deb833]/10 text-[#deb833]'}`}>{num}</div>
                    <div className="text-left">
                      <h3 className={clsx('font-black', 'text-[#332E32]', 'text-sm')}>{title}</h3>
                      <p className={clsx('text-[10px]', 'text-slate-500')}>{sub}</p>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === id ? 'rotate-180' : ''}`} />
                </button>
                {expandedArticle === id && (
                  <div className={clsx('px-6', 'py-4', 'border-t', 'border-slate-100', 'bg-slate-50/30')}>
                    {content}
                  </div>
                )}
              </div>
            ))}

            {/* Lexique */}
            <div className={clsx('bg-gradient-to-r', 'from-[#deb833]/[0.05]', 'to-[#b8962a]/[0.02]', 'border', 'border-[#deb833]/20', 'rounded-xl', 'p-6')}>
              <h3 className={clsx('font-black', 'text-[#332E32]', 'text-sm', 'mb-4')}>{mt.lexique}</h3>
              <div className={clsx('space-y-3', 'text-[11px]', 'text-slate-600')}>
                <div><strong>{lang==='EN'?'Personal data:':'Données à caractère personnel:'}</strong> {lang==='EN'?'Any information relating to an identified or identifiable natural person.':'Toute information concernant une personne physique identifiée ou identifiable.'}</div>
                <div><strong>{lang==='EN'?'Data processing:':'Traitement de données:'}</strong> {lang==='EN'?'Any operation applied to data (collection, recording, storage, modification, use, communication, erasure, etc.).':'Toute opération appliquée aux données (collecte, enregistrement, conservation, modification, utilisation, communication, effacement, etc.).'}</div>
                <div><strong>BRVM:</strong> {lang==='EN'?'Bourse Régionale des Valeurs Mobilières (UEMOA financial market).':'Bourse Régionale des Valeurs Mobilières (marché financier de l\'UEMOA).'}</div>
                <div><strong>{lang==='EN'?'Digital client portal:':'Portail digital client:'}</strong> {lang==='EN'?'Secure online space allowing members to access their information, documents and personalized dashboards.':'Espace en ligne sécurisé permettant aux membres d\'accéder à leurs informations, documents et tableaux de bord personnalisés.'}</div>
                <div><strong>{lang==='EN'?'User / Member:':'Utilisateur / Adhérent:'}</strong> {lang==='EN'?'Any natural person filling out the membership form and using DM+ Investment services.':'Toute personne physique remplissant le formulaire d\'adhésion et utilisant les services de DM+ Investment.'}</div>
              </div>
            </div>

            {/* Case d'acceptation */}
            <div className={clsx('bg-gradient-to-r', 'from-[#deb833]/[0.08]', 'to-[#b8962a]/[0.05]', 'border', 'border-[#deb833]/30', 'rounded-xl', 'p-6')}>
              <label className={clsx('flex', 'items-start', 'gap-4', 'cursor-pointer')}>
                <input 
                  type="checkbox" 
                  className={clsx('mt-1', 'h-5', 'w-5', 'rounded', 'border-2', 'border-[#deb833]', 'bg-white', 'text-[#deb833]', 'focus:ring-0', 'focus:ring-offset-0')}
                />
                <div className="flex-1">
                  <p className={clsx('text-[11px]', 'font-black', 'text-slate-700', 'leading-relaxed')}>
                    <strong>{mt.obligatoire}</strong> {mt.obligatoireText}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Offres - mode étape */}
      {isStep && (
        <div className={clsx('space-y-6', 'pb-20', 'lg:pb-6', 'overflow-visible', 'px-2', 'md:px-3', 'lg:px-4')}>
          <div className={clsx('text-center', 'mb-8', 'space-y-2', 'animate-fade-in')}>
            <h2 className={clsx('text-xl', 'lg:text-2xl', 'font-black', 'text-[#332E32]', 'tracking-tight', 'uppercase')}>
              {mt.selectTitle} <span className="text-[#deb833]">{mt.selectAccent}</span>
            </h2>
            <p className={clsx('text-[11px]', 'lg:text-[13px]', 'font-medium', 'text-slate-500', 'max-w-2xl', 'mx-auto', 'leading-relaxed')}>
              {mt.selectDesc}
            </p>
          </div>

          <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4', 'items-start', 'max-w-6xl', 'mx-auto')}>
            {tiers.map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <div 
                  key={tier.id} 
                  className={`relative bg-white border rounded-2xl transition-all duration-300 cursor-pointer hover:shadow-xl ${tier.featured ? 'border-[#deb833] shadow-lg' : 'border-slate-200 shadow-md'} ${selectedTier === tier.id ? 'ring-2 ring-[#deb833] ring-offset-2' : ''}`}
                  onClick={() => isStep && onTierSelect && onTierSelect(tier.id)}
                >
                  <div className={clsx('p-5', 'flex', 'flex-col')}>
                    <div className="mb-2">
                      <h3 className={clsx('text-lg', 'font-black', 'text-[#332E32]', 'tracking-tight')}>{tier.title}</h3>
                      <p className={clsx('text-xs', 'text-slate-600', 'mt-1')}>{tier.subtitle}</p>
                    </div>

                    <div className="mb-3">
                      {tier.oldPrice && (
                        <div className="mb-1">
                          <span className={clsx('text-sm', 'text-slate-400', 'line-through')}>{tier.oldPrice} FCFA</span>
                        </div>
                      )}
                      <div className={clsx('flex', 'items-baseline', 'gap-1')}>
                        <span className={clsx('text-2xl', 'font-black', 'text-[#332E32]')}>{tier.currentPrice}</span>
                        <span className={clsx('text-sm', 'text-slate-600')}>{tier.priceSuffix}</span>
                      </div>
                      <div className={clsx('mt-1', 'text-[10px]', 'text-slate-500')}>{tier.renewalPrice}</div>
                    </div>

                    <div className="overflow-hidden">
                      <div className={clsx('h-px', 'bg-slate-200', 'mb-4')}></div>
                      <div className={clsx('space-y-4', 'mb-4', 'max-h-[600px]', 'overflow-y-auto')}>
                        <div>
                          <p className={clsx('text-xs', 'font-bold', 'text-slate-700', 'mb-2', 'uppercase', 'tracking-wider')}>{mt.inclus}</p>
                          <div className="space-y-2">
                            {tier.features.basic.map((feature, fIdx) => {
                              const FeatureIcon = feature.icon;
                              return (
                                <div key={fIdx} className={clsx('flex', 'items-start', 'gap-2')}>
                                  <div className={clsx('mt-0.5', 'flex-shrink-0', 'text-slate-500')}><FeatureIcon size={14} /></div>
                                  <span className={clsx('text-xs', 'text-slate-600')}>{feature.text}</span>
                                </div>
                              );
                            })}
                          </div>
                          {tier.includedBox && (
                            <div className={clsx('bg-[#79347d]/5', 'border', 'border-[#79347d]/20', 'p-2.5', 'rounded-lg', 'mt-3')}>
                              <div className={clsx('flex', 'items-start', 'gap-2')}>
                                <FileText size={14} className={clsx('text-[#79347d]', 'mt-0.5', 'flex-shrink-0')} />
                                <div>
                                  <span className={clsx('text-[11px]', 'font-bold', 'text-[#79347d]', 'tracking-wide', 'block', 'mb-0.5')}>{tier.includedBox.title}</span>
                                  <p className={clsx('text-[10px]', 'text-slate-500', 'leading-relaxed')}>{tier.includedBox.desc}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {tier.features.premium && tier.features.premium.length > 0 && (
                          <div>
                            <p className={clsx('text-xs', 'font-bold', 'text-slate-700', 'mb-2', 'uppercase', 'tracking-wider')}>{mt.avantages}</p>
                            <div className="space-y-2">
                              {tier.features.premium.map((feature, fIdx) => (
                                <div key={fIdx} className={clsx('flex', 'items-start', 'gap-2')}>
                                  <div className={clsx('mt-0.5', 'flex-shrink-0', 'text-slate-600')}><Check size={14} /></div>
                                  <div className="flex-1">
                                    <span className={clsx('text-xs', 'text-slate-600')}>{feature.text}</span>
                                    {feature.badge && (
                                      <span className={clsx('ml-2', 'inline-flex', 'items-center', 'bg-slate-100', 'text-slate-700', 'px-2', 'py-0.5', 'rounded', 'text-[9px]', 'font-bold', 'uppercase', 'tracking-wider')}>{feature.badge}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {tier.features.exclusive && tier.features.exclusive.length > 0 && (
                          <div>
                            <p className={clsx('text-xs', 'font-bold', 'text-slate-700', 'mb-2', 'uppercase', 'tracking-wider')}>{mt.fonctionnalites}</p>
                            <div className="space-y-2">
                              {tier.features.exclusive.map((feature, fIdx) => {
                                const FeatureIcon = feature.icon || Star;
                                return (
                                  <div key={fIdx} className={clsx('flex', 'items-start', 'gap-2')}>
                                    <div className={clsx('mt-0.5', 'flex-shrink-0', 'text-[#deb833]')}><FeatureIcon size={14} /></div>
                                    <div className="flex-1"><span className={clsx('text-xs', 'text-slate-600')}>{feature.text}</span></div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className={clsx('p-3', 'bg-slate-50', 'rounded-lg')}>
                          <div className={clsx('text-[10px]', 'uppercase', 'tracking-wider', 'font-black', 'mb-1', 'text-slate-400')}>{mt.cibleIdeale}</div>
                          <p className={clsx('text-xs', 'text-slate-600')}>{tier.target}</p>
                        </div>
                      </div>
                      <div className={clsx('h-px', 'bg-slate-100', 'mb-4')}></div>
                    </div>

                    <button 
                      className={`w-full py-3 px-5 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-300 ${tier.featured ? 'bg-[#deb833] text-white hover:bg-[#b8962a]' : 'bg-white text-slate-900 border-2 border-slate-200 hover:border-[#deb833] hover:text-[#deb833]'}`}
                    >
                      {selectedTier === tier.id ? mt.selectionne : mt.selectionner}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipConditions;
