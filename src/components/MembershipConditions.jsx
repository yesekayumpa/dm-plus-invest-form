import { useState } from "react";
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
  Mail,
  Star,
  Shield,
  Zap,
  Users,
  BarChart3,
  Briefcase,
  Building2
} from "lucide-react";

const MembershipConditions = ({ onClose, isStep = false, selectedTier, onTierSelect }) => {
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [expandedServices, setExpandedServices] = useState({});
  const [expandedCards, setExpandedCards] = useState({});

  const toggleServices = (tierId, e) => {
    if (e) e.stopPropagation();
    setExpandedServices(prev => ({
      ...prev,
      [tierId]: !prev[tierId]
    }));
  };

  const toggleCard = (tierId, e) => {
    if (e) e.stopPropagation();
    setExpandedCards(prev => ({
      ...prev,
      [tierId]: !prev[tierId]
    }));
  };

  const toggleArticle = (articleId) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };
  
  const tiers = [
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
      renewalPrice: "Commission AUM : 1% / an, facturé trimestriellement",
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
      includedBox: {
        title: "Accompagnement ouverture compte SGI",
        desc: "Assistance complète pour l'ouverture de votre compte titres auprès d'une SGI partenaire — inclus sans frais supplémentaires."
      },
      target: "Salariés, entrepreneurs, diaspora africaine — capital 500 000 à 5 000 000 FCFA"
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
      renewalPrice: "Commission AUM : 1% / an - Honoraires mission spécifique : à partir de 150 000 FCFA",
      featured: true,
      features: {
        basic: [
          { icon: Globe, text: "Tout le contenu de la formule Horizon" },
          { icon: BarChart3, text: "Conseil patrimonial global (financier + immobilier + successoral)" },
          { icon: Database, text: "Portefeuille diversifié multi-actifs" },
          { icon: Zap, text: "Stratégie de transmission patrimoniale" },
          { icon: Star, text: "Accès prioritaire aux opportunités" }
        ],
        premium: [
          { icon: Check, text: "Reporting mensuel personnalisé", badge: null },
          { icon: Check, text: "Accès plateforme DM+ Investment premium", badge: null }
        ],
        exclusive: [
          { icon: Star, text: "2 rendez-vous par trimestre avec conseiller dédié" },
          { icon: Star, text: "Conseil patrimonial global complet" },
          { icon: Star, text: "Optimisation fiscale et stratégie de transmission" }
        ]
      },
      includedBox: {
        title: "Accompagnement ouverture compte SGI",
        desc: "Assistance complète pour l'ouverture de votre compte titres auprès d'une SGI partenaire — inclus sans frais supplémentaires."
      },
      target: "Cadres supérieurs, chefs d'entreprise"
    },
    {
      id: "corporate",
      title: "DM+ INVEST ELITE CORPORATE",
      subtitle: "PME, ETI, institutions",
      icon: Factory,
      color: "from-slate-700 to-slate-900",
      discount: null,
      oldPrice: null,
      currentPrice: "À partir de 500 000",
      priceSuffix: "FCFA / mois",
      offer: null,
      renewalPrice: "Commission AUM : 0,3 à 0,5% / an selon encours · Honoraires ponctuels : devis sur mesure",
      featured: false,
      features: {
        basic: [
          { icon: Building2, text: "Audit & conseil de trésorerie et placement" },
          { icon: BarChart3, text: "Gestion de portefeuille institutionnel" },
          { icon: Database, text: "Intégration KPI BI avec DM+ Analytics" }
        ],
        premium: [
          { icon: Check, text: "Reporting mensuel personnalisé comité de direction", badge: null },
          { icon: Check, text: "Recommandations de placement stratégiques", badge: null }
        ],
        exclusive: [
          { icon: Star, text: "Conseiller senior dédié — interlocuteur unique exclusif" },
          { icon: Star, text: "Comité d'investissement mensuel avec présentation aux dirigeants" },
          { icon: Star, text: "Accès à la plateforme premium DM+ Investment" }
        ]
      },
      target: "PME, ETI, institutions"
    }
  ];

  return (
    <div className="bg-white font-sans text-slate-600">
      {!isStep && (
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-100 pb-6 mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#deb833]/5 text-[#deb833] border border-[#deb833]/10">
              <Layout size={24} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-black text-slate-950 leading-none tracking-tighter uppercase">
                CONDITIONS GÉNÉRALES <span className="text-brand">DM+ INVESTMENT</span>
              </h1>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1.5">Conditions d'Adhésion</p>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-950 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      )}

      {/* Section Conditions Générales */}
      {!isStep && (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <div className="bg-linear-to-r from-brand/5 to-[#b8962a]/2 border border-brand/20 rounded-2xl p-8 mb-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand/10 border border-brand/20 rounded-full">
                <FileText size={16} className="text-brand" />
                <span className="text-[11px] font-black text-brand uppercase tracking-wider">Document Contractuel</span>
              </div>
              <h2 className="text-xl font-black text-slate-950 tracking-tight">
                CONDITIONS GÉNÉRALES D'ADHÉSION
              </h2>
              <p className="text-[11px] text-slate-600 leading-relaxed max-w-2xl mx-auto">
                En cochant la case d'acceptation, vous reconnaissez avoir pris connaissance et acceptez les présentes Conditions Générales d'Adhésion ainsi que la Politique de Confidentialité de DM+ Investment.
              </p>
            </div>
          </div>

          {/* Articles des Conditions Générales */}
          <div className="space-y-6">
            {/* Article 1 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article1')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-black text-sm">1</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">INFORMATIONS LÉGALES</h3>
                    <p className="text-[10px] text-slate-500">DM+ Investment et DM+ Group</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article1' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article1' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <div><strong>Dénomination sociale:</strong> DM+ Investment</div>
                    <div><strong>Société mère:</strong> DM+ Group</div>
                    <div><strong>Siège social:</strong> Medina, Rue 35 angle 24, Dakar (Sénégal)</div>
                    <div><strong>Email de contact:</strong> investment@dmplus-group.com</div>
                    <div><strong>Téléphone:</strong> 33 829 58 06 / 76 663 82 19</div>
                    <div><strong>Site internet:</strong> www.dmplus-group.com</div>
                  </div>
                </div>
              )}
            </div>

            {/* Article 2 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article2')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-black text-sm">2</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">FINALITÉ DE LA COLLECTE DES DONNÉES</h3>
                    <p className="text-[10px] text-slate-500">Utilisation des données personnelles</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article2' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article2' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>Les données personnelles collectées via le formulaire d'adhésion sont exclusivement destinées à établir et gérer une relation commerciale avec l'Utilisateur.</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Création et gestion de votre compte membre</li>
                      <li>Réponse à vos demandes d'information ou d'assistance</li>
                      <li>Information sur nos offres, produits et actualités des marchés financiers (BRVM et autres)</li>
                      <li>Réalisation de votre profiling d'investisseur et élaboration d'une stratégie d'investissement adaptée à votre profil de risque</li>
                      <li>Gestion de l'accès à notre portail client digital et à vos tableaux de bord personnalisés</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Article 3 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article3')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-black text-sm">3</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">BASE LÉGALE DU TRAITEMENT</h3>
                    <p className="text-[10px] text-slate-500">Fondement juridique</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article3' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article3' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>Le traitement des données personnelles repose sur votre consentement, exprimé par le remplissage et la soumission du formulaire d'adhésion.</p>
                    <p>Il repose également sur les mesures précontractuelles et contractuelles, notamment pour l'ouverture de compte, la souscription aux services de conseil ou l'accompagnement en investissement.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Article 4 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article4')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-black text-sm">4</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">DURÉE DE CONSERVATION DES DONNÉES</h3>
                    <p className="text-[10px] text-slate-500">Période de rétention</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article4' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article4' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>Les données personnelles sont conservées par la Société pour une durée conforme aux finalités pour lesquelles elles ont été collectées.</p>
                    <p>Pratiquement, les données sont conservées :</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Pendant toute la durée de la relation commerciale</li>
                      <li>Archivées pendant cinq (5) ans après la fin de la relation pour des raisons administratives, statistiques et légales, ou conformément aux exigences réglementaires financières applicables</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Article 5 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article5')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-black text-sm">5</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">DROITS DE L'UTILISATEUR</h3>
                    <p className="text-[10px] text-slate-500">Droits RGPD et loi sénégalaise</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article5' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article5' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>Conformément à la loi sénégalaise n° 2008-12 du 25 janvier 2008, vous disposez d'un droit d'accès, de rectification, de mise à jour, d'effacement et d'opposition au traitement de vos données personnelles pour des motifs légitimes.</p>
                    <p>Vous pouvez également retirer votre consentement à tout moment.</p>
                    <p>Pour exercer ces droits ou pour toute question concernant le traitement des données, envoyez une demande avec une preuve d'identité valide à l'adresse indiquée à l'article 1.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Article 6 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article6')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-[#deb833]/10 text-[#deb833] flex items-center justify-center font-black text-sm">6</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">CONFIDENTIALITÉ ET SÉCURITÉ</h3>
                    <p className="text-[10px] text-slate-500">Protection des données</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article6' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article6' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>DM+ Investment est seul responsable du traitement des données.</p>
                    <p>Les informations ne sont jamais transférées ou vendues à des tiers sans votre consentement explicite, sauf obligation légale.</p>
                    <p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité de vos données.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Article 7 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article7')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-[#deb833]/10 text-[#deb833] flex items-center justify-center font-black text-sm">7</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">PROPRIÉTÉ INTELLECTUELLE</h3>
                    <p className="text-[10px] text-slate-500">Droits d'auteur et marques</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article7' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article7' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>L'ensemble du contenu du site (textes, images, logos, graphismes, etc.) est protégé par le droit de la propriété intellectuelle.</p>
                    <p>Toute reproduction, représentation, modification ou exploitation de ce contenu, sans autorisation expresse, est interdite.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Article 8 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article8')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-[#deb833]/10 text-[#deb833] flex items-center justify-center font-black text-sm">8</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">RESPONSABILITÉ</h3>
                    <p className="text-[10px] text-slate-500">Limites de responsabilité</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article8' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article8' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>DM+ Investment ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou des services.</p>
                    <p>Les conseils en investissement sont fournis à titre informatif et n'engagent pas la responsabilité de la Société en cas de perte.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Article 9 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article9')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-[#deb833]/10 text-[#deb833] flex items-center justify-center font-black text-sm">9</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">COOKIES</h3>
                    <p className="text-[10px] text-slate-500">Gestion des cookies</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article9' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article9' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>Le site utilise des cookies pour améliorer la navigation, personnaliser le contenu et réaliser des statistiques.</p>
                    <p>En continuant à naviguer, vous acceptez l'utilisation de cookies. Vous pouvez refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Article 10 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article10')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-[#deb833]/10 text-[#deb833] flex items-center justify-center font-black text-sm">10</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">LIENS HYPERTEXTES</h3>
                    <p className="text-[10px] text-slate-500">Sites tiers</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article10' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article10' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>Le site peut contenir des liens vers des sites tiers (partenaires, institutions financières, etc.).</p>
                    <p>DM+ Investment n'exerce aucun contrôle sur le contenu ou les pratiques de confidentialité de ces sites tiers et décline toute responsabilité en cas de dommage.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Article 11 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article11')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-[#deb833]/10 text-[#deb833] flex items-center justify-center font-black text-sm">11</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">MODIFICATION DES CONDITIONS GÉNÉRALES</h3>
                    <p className="text-[10px] text-slate-500">Mises à jour contractuelles</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article11' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article11' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>DM+ Investment se réserve le droit de modifier les présentes Conditions Générales à tout moment sans préavis.</p>
                    <p>La nouvelle version sera applicable dès sa mise en ligne. Il vous incombe de les consulter régulièrement.</p>
                    <p>La poursuite de l'utilisation du service après modification implique l'acceptation des nouvelles conditions.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Article 12 */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleArticle('article12')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-[#deb833]/10 text-[#deb833] flex items-center justify-center font-black text-sm">12</div>
                  <div className="text-left">
                    <h3 className="font-black text-slate-950 text-sm">DROIT APPLICABLE ET JURIDICTION</h3>
                    <p className="text-[10px] text-slate-500">Litiges et tribunaux compétents</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${expandedArticle === 'article12' ? 'rotate-180' : ''}`} />
              </button>
              {expandedArticle === 'article12' && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <p>Les présentes Conditions Générales sont régies par le droit sénégalais.</p>
                    <p>En cas de litige lié à l'utilisation du formulaire d'adhésion, du site, du portail client ou des services de DM+ Investment, et en l'absence de résolution amiable, les tribunaux de Dakar sont seuls compétents.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Lexique */}
            <div className="bg-gradient-to-r from-[#deb833]/[0.05] to-[#b8962a]/[0.02] border border-[#deb833]/20 rounded-xl p-6">
              <h3 className="font-black text-slate-950 text-sm mb-4">LEXIQUE</h3>
              <div className="space-y-3 text-[11px] text-slate-600">
                <div>
                  <strong>Données à caractère personnel:</strong> Toute information concernant une personne physique identifiée ou identifiable.
                </div>
                <div>
                  <strong>Traitement de données:</strong> Toute opération appliquée aux données (collecte, enregistrement, conservation, modification, utilisation, communication, effacement, etc.).
                </div>
                <div>
                  <strong>BRVM:</strong> Bourse Régionale des Valeurs Mobilières (marché financier de l'UEMOA).
                </div>
                <div>
                  <strong>Portail digital client:</strong> Espace en ligne sécurisé permettant aux membres d'accéder à leurs informations, documents et tableaux de bord personnalisés.
                </div>
                <div>
                  <strong>Utilisateur / Adhérent:</strong> Toute personne physique remplissant le formulaire d'adhésion et utilisant les services de DM+ Investment.
                </div>
              </div>
            </div>

            {/* Case d'acceptation */}
            <div className="bg-gradient-to-r from-[#deb833]/[0.08] to-[#b8962a]/[0.05] border border-[#deb833]/30 rounded-xl p-6">
              <label className="flex items-start gap-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1 h-5 w-5 rounded border-2 border-[#deb833] bg-white text-[#deb833] focus:ring-0 focus:ring-offset-0"
                />
                <div className="flex-1">
                  <p className="text-[11px] font-black text-slate-700 leading-relaxed">
                    <strong>Case à cocher obligatoire:</strong> Je reconnais avoir pris connaissance et j'accepte les présentes Conditions Générales d'Adhésion ainsi que la Politique de Confidentialité de DM+ Investment.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Affichage des offres uniquement en mode étape du formulaire */}
      {isStep && (
        <div className="space-y-6 pb-20 lg:pb-6 overflow-visible px-2 md:px-3 lg:px-4">
          <div className="text-center mb-8 space-y-2 animate-fade-in">
            <h2 className="text-xl lg:text-2xl font-black text-slate-950 tracking-tight uppercase">
              SÉLECTIONNEZ VOTRE <span className="text-[#deb833]">FORMULE D'ACCOMPAGNEMENT</span>
            </h2>
            <p className="text-[11px] lg:text-[13px] font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Découvrez nos formules conçues pour optimiser votre patrimoine sur la BRVM selon votre profil et vos objectifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start max-w-6xl mx-auto">
            {tiers.map((tier, idx) => {
              const Icon = tier.icon;
              const isExpanded = !!expandedCards[tier.id];
              return (
                <div 
                  key={tier.id} 
                  className={`relative bg-white border rounded-2xl transition-all duration-300 cursor-pointer hover:shadow-xl ${tier.featured ? 'border-[#deb833] shadow-lg' : 'border-slate-200 shadow-md'} ${selectedTier === tier.id ? 'ring-2 ring-[#deb833] ring-offset-2' : ''}`}
                  onClick={() => isStep && onTierSelect && onTierSelect(tier.id)}
                >
                  <div className="p-5 flex flex-col">
                    {/* Title */}
                    <div className="mb-2">
                      <h3 className="text-lg font-black text-slate-950 tracking-tight">
                        {tier.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        {tier.subtitle}
                      </p>
                    </div>

                    {/* Price Section */}
                    <div className="mb-3">
                      {tier.oldPrice && (
                        <div className="mb-1">
                          <span className="text-sm text-slate-400 line-through">{tier.oldPrice} FCFA</span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-950">{tier.currentPrice}</span>
                        <span className="text-sm text-slate-600">{tier.priceSuffix}</span>
                      </div>
                      <div className="mt-1 text-[10px] text-slate-500">
                        {tier.renewalPrice}
                      </div>
                    </div>

                    {/* Per-card Voir plus / Voir moins button */}
                    <button
                      onClick={(e) => toggleCard(tier.id, e)}
                      className={`w-full flex items-center justify-center gap-1.5 py-2 mb-3 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                        tier.featured
                          ? 'border-[#deb833]/40 text-[#deb833] hover:bg-[#deb833]/5'
                          : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {isExpanded ? 'Voir moins' : 'Voir plus'}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Expandable Features Section */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="h-px bg-slate-200 mb-4"></div>

                      <div className="space-y-4 mb-4">
                        {/* Basic Features */}
                        <div>
                          <p className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Inclus dans la formule :</p>
                          <div className="space-y-2">
                            {tier.features.basic.map((feature, fIdx) => {
                              const FeatureIcon = feature.icon;
                              return (
                                <div key={fIdx} className="flex items-start gap-2">
                                  <div className="mt-0.5 flex-shrink-0 text-slate-500">
                                    <FeatureIcon size={14} />
                                  </div>
                                  <span className="text-xs text-slate-600">{feature.text}</span>
                                </div>
                              );
                            })}
                          </div>
                          {tier.includedBox && (
                            <div className="bg-[#79347d]/5 border border-[#79347d]/20 p-2.5 rounded-lg mt-3">
                              <div className="flex items-start gap-2">
                                <FileText size={14} className="text-[#79347d] mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="text-[11px] font-bold text-[#79347d] tracking-wide block mb-0.5">
                                    {tier.includedBox.title}
                                  </span>
                                  <p className="text-[10px] text-slate-500 leading-relaxed">
                                    {tier.includedBox.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Premium Features */}
                        {tier.features.premium && tier.features.premium.length > 0 && (
                          <div>
                            <p className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                              Avantages supplémentaires :
                            </p>
                            <div className="space-y-2">
                              {tier.features.premium.map((feature, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2">
                                  <div className="mt-0.5 flex-shrink-0 text-slate-600">
                                    <Check size={14} />
                                  </div>
                                  <div className="flex-1">
                                    <span className="text-xs text-slate-600">{feature.text}</span>
                                    {feature.badge && (
                                      <span className="ml-2 inline-flex items-center bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                                        {feature.badge}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Exclusive Features */}
                        {tier.features.exclusive && tier.features.exclusive.length > 0 && (
                          <div>
                            <p className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                              Fonctionnalités exclusives :
                            </p>
                            <div className="space-y-2">
                              {tier.features.exclusive.map((feature, fIdx) => {
                                const FeatureIcon = feature.icon || Star;
                                return (
                                  <div key={fIdx} className="flex items-start gap-2">
                                    <div className="mt-0.5 flex-shrink-0 text-[#deb833]">
                                      <FeatureIcon size={14} />
                                    </div>
                                    <div className="flex-1">
                                      <span className="text-xs text-slate-600">{feature.text}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Target */}
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <div className="text-[10px] uppercase tracking-wider font-black mb-1 text-slate-400">
                            Cible idéale
                          </div>
                          <p className="text-xs text-slate-600">{tier.target}</p>
                        </div>
                      </div>

                      <div className="h-px bg-slate-100 mb-4"></div>
                    </div>

                    {/* CTA Button — always at the very bottom */}
                    <button 
                      className={`w-full py-3 px-5 rounded-lg font-black text-xs uppercase tracking-wider transition-all duration-300 ${tier.featured ? 'bg-[#deb833] text-white hover:bg-[#b8962a]' : 'bg-white text-slate-900 border-2 border-slate-200 hover:border-[#deb833] hover:text-[#deb833]'}`}
                    >
                      {selectedTier === tier.id ? 'Sélectionné ✓' : 'Sélectionner'}
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

