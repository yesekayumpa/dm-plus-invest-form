import { Fragment } from "react";
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Mail, FileText, AlertCircle, Building, Globe, Cookie, Link, Scale, BookOpen, Crown, ScrollText } from "lucide-react";

const privacyTranslations = {
  FR: {
    articles: [
      {
        icon: Building,
        title: "ARTICLE 1 : INFORMATIONS LÉGALES",
        content: [
          "Dénomination sociale : DM+ Investment",
          "Société mère : DM+ Group",
          "Siège social : Medina, Rue 35 angle 24, Dakar (Sénégal)",
          "Email : investment@dmplus-group.com",
          "Téléphone : 33 829 58 06 / 76 663 82 19",
          "Site : www.dmplus-group.com"
        ]
      },
      {
        icon: Database,
        title: "ARTICLE 2 : FINALITÉ DE LA COLLECTE",
        content: [
          "Les données recueillies via ce dossier d'adhésion sont destinées exclusivement à la gestion d'une relation d'élite. Elles servent à construire votre profilage investisseur, gérer vos tableaux de bord personnalisés, et assurer le suivi rigoureux de vos portefeuilles sur la BRVM.",
          "DM+ Investment est l'unique responsable du traitement. Vos informations ne sont jamais cédées à des tiers sans votre consentement explicite, sauf obligation légale."
        ]
      },
      {
        icon: Lock,
        title: "ARTICLE 3 : CONFIDENTIALITÉ ÉLITE",
        content: [
          "La Société accorde une importance capitale à la sécurité de vos données. Nous utilisons des protocoles de cryptage de grade bancaire et des mesures organisationnelles strictes pour protéger votre patrimoine informationnel contre toute perte ou accès non autorisé."
        ]
      },
      {
        icon: Scale,
        title: "ARTICLE 4 : RESPONSABILITÉ & RISQUES",
        content: [
          "Important : Les recommandations fournies par DM+ Investment ont un caractère indicatif. L'investissement financier (BRVM) comporte des risques de volatilité et de perte en capital. L'adhérent reconnaît être seul responsable de ses décisions finales d'investissement."
        ]
      }
    ],
    lastUpdated: "28 mars 2026",
    headerTitle: "CONDITIONS GÉNÉRALES",
    headerSubtitle: "Dossier Adhésion Élite DM+ Invest",
    certified: "Contrat Certifié",
    introText: "En tant qu'institution d'excellence, DM+ Investment s'engage à traiter chaque dossier avec la plus haute rigueur déontologique et juridique. Les présentes conditions définissent le cadre de notre partenariat de confiance.",
    lastUpdateLabel: "Dernière mise à jour :"
  },
  EN: {
    articles: [
      {
        icon: Building,
        title: "ARTICLE 1: LEGAL INFORMATION",
        content: [
          "Company name: DM+ Investment",
          "Parent company: DM+ Group",
          "Registered office: Medina, Rue 35 angle 24, Dakar (Senegal)",
          "Email: investment@dmplus-group.com",
          "Phone: 33 829 58 06 / 76 663 82 19",
          "Website: www.dmplus-group.com"
        ]
      },
      {
        icon: Database,
        title: "ARTICLE 2: PURPOSE OF DATA COLLECTION",
        content: [
          "The data collected via this membership file are exclusively intended for the management of an elite relationship. They serve to build your investor profiling, manage your personalized dashboards, and ensure rigorous monitoring of your portfolios on the BRVM.",
          "DM+ Investment is the sole responsible for the processing. Your information is never transferred to third parties without your explicit consent, except as required by law."
        ]
      },
      {
        icon: Lock,
        title: "ARTICLE 3: ELITE CONFIDENTIALITY",
        content: [
          "The Company attaches paramount importance to the security of your data. We use banking-grade encryption protocols and strict organizational measures to protect your information assets against any loss or unauthorized access."
        ]
      },
      {
        icon: Scale,
        title: "ARTICLE 4: LIABILITY & RISKS",
        content: [
          "Important: The recommendations provided by DM+ Investment are for informational purposes only. Financial investment (BRVM) involves volatility and capital loss risks. The member acknowledges being solely responsible for their final investment decisions."
        ]
      }
    ],
    lastUpdated: "March 28, 2026",
    headerTitle: "GENERAL CONDITIONS",
    headerSubtitle: "DM+ Invest Elite Membership File",
    certified: "Certified Contract",
    introText: "As an institution of excellence, DM+ Investment commits to processing each file with the highest ethical and legal rigor. These conditions define the framework of our partnership of trust.",
    lastUpdateLabel: "Last update:"
  }
};

const PrivacyPolicy = ({ onClose, lang = "FR" }) => {
  const pt = privacyTranslations[lang] || privacyTranslations.FR;
  const articles = pt.articles;
  const lastUpdated = pt.lastUpdated;

  return (
    <div className={clsx('bg-white', 'font-sans', 'text-slate-600', 'max-h-[70vh]', 'flex', 'flex-col')}>
      {/* Institutional Header */}
      <div className={clsx('sticky', 'top-0', 'z-10', 'bg-white/95', 'backdrop-blur-md', 'border-b', 'border-slate-100', 'pb-6', 'mb-8', 'flex', 'items-center', 'justify-between')}>
        <div className={clsx('flex', 'items-center', 'gap-4')}>
          <div className={clsx('h-12', 'w-12', 'flex', 'items-center', 'justify-center', 'rounded-xl', 'bg-[#deb833]/5', 'text-[#deb833]', 'border', 'border-[#deb833]/10')}>
            <ScrollText size={24} />
          </div>
          <div>
            <h1 className={clsx('font-display', 'text-2xl', 'font-black', 'text-slate-950', 'leading-none', 'tracking-tighter', 'uppercase')}>
              {pt.headerTitle}
            </h1>
            <p className={clsx('text-[9px]', 'font-black', 'uppercase', 'tracking-[0.2em]', 'text-slate-400', 'mt-1.5')}>{pt.headerSubtitle}</p>
          </div>
        </div>
        <div className={clsx('hidden', 'sm:flex', 'items-center', 'gap-2', 'px-3', 'py-1.5', 'border', 'border-slate-100', 'rounded-full')}>
           <Shield size={12} className="text-[#deb833]" />
           <span className={clsx('text-[9px]', 'font-black', 'text-slate-500', 'uppercase', 'tracking-widest')}>{pt.certified}</span>
        </div>
      </div>

      {/* Contract Content */}
      <div className={clsx('flex-1', 'overflow-y-auto', 'pr-4', 'custom-scrollbar', 'space-y-10')}>
        <div className="space-y-8">
          <div className={clsx('bg-slate-50/50', 'rounded-3xl', 'p-6', 'border', 'border-slate-100', 'italic', 'font-serif', 'text-sm', 'leading-relaxed', 'text-slate-500')}>
            "{pt.introText}"
          </div>

          {articles.map((article, index) => (
            <div key={index} className="animate-elite" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={clsx('flex', 'items-center', 'gap-3', 'mb-4')}>
                <div className={clsx('h-1.5', 'w-1.5', 'rounded-full', 'bg-[#deb833]')} />
                <h3 className={clsx('text-[10px]', 'font-black', 'uppercase', 'tracking-[0.3em]', 'text-[#deb833]', 'font-sans')}>
                  {article.title}
                </h3>
              </div>
              <div className={clsx('pl-5', 'space-y-3')}>
                {article.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className={clsx('text-[11px]', 'leading-relaxed', 'font-medium', 'text-slate-500', 'font-sans')}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer of Modal */}
        <div className={clsx('pt-12', 'border-t', 'border-slate-100', 'text-center', 'pb-6')}>
          <p className={clsx('text-[8px]', 'font-black', 'text-slate-300', 'uppercase', 'tracking-[0.3em]', 'mb-2')}>{pt.lastUpdateLabel} {lastUpdated}</p>
          <div className={clsx('flex', 'justify-center', 'gap-4')}>
            <img src="/dm-logo-footer.png" alt="" className={clsx('h-6', 'w-auto', 'opacity-20', 'grayscale')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
