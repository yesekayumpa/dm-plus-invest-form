import sys

with open(r'c:\Users\hp\Downloads\dm-plus-invest-form-main\src\Admin.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_content = """  const getOfferColor = (offer) => {
    const map = {
      elite_light: { bg: '#f9fafb', color: '#4b5563', border: '#e5e7eb' },
      elite_premium: { bg: '#fefce8', color: '#b48600', border: '#fef08a' },
      elite_vip: { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
    };
    return map[offer] || { bg: '#f3f4f6', color: '#4b5563', border: '#e5e7eb' };
  };

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative',
      color: '#111827',
      backgroundColor: '#f9fafb',
    }}>
      {/* Background (Light Luxury) */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: '#f9fafb',
        zIndex: 0,
      }}>
      </div>

      {/* ── Header ── */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 40px', height: '80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src="/LOGOTYPE 10.png"
            alt="Digital Mind+ Investment"
            style={{ height: '36px', width: 'auto', objectFit: 'contain', display: 'block' }}
          />
          <div style={{ width: '1px', height: '32px', background: '#e5e7eb' }} />
          <span style={{
            fontSize: '12px', color: '#b48600',
            letterSpacing: '1.5px', fontWeight: 600, textTransform: 'uppercase'
          }}>Private Portal</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={fetchSubmissions}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              color: '#4b5563', padding: '10px 20px',
              borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.backgroundColor = '#f9fafb'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.backgroundColor = '#ffffff'; }}
          >
            <RefreshCw style={{ width: '14px', height: '14px' }} />
            Actualiser
          </button>

          <button
            onClick={onLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#111827',
              border: '1px solid #111827',
              color: '#ffffff', padding: '10px 20px',
              borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#374151'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#111827'; }}
          >
            <LogOut style={{ width: '14px', height: '14px' }} />
            Déconnexion
          </button>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '48px 24px', animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 400, color: '#111827', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
            Portefeuille <span style={{ fontWeight: 700 }}>Clients</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#6b7280', margin: 0, letterSpacing: '0.2px' }}>
            Supervision des nouvelles demandes de souscription DM+ Invest.
          </p>
        </div>

        {/* ── Stats ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px', marginBottom: '48px',
        }}>
          {[
            { label: 'Total Demandes', value: submissions.length, accent: '#111827' },
            { label: 'Comptes Premium', value: submissions.filter(s => s.selectedOffer?.includes('premium')).length, accent: '#b48600' },
            { label: 'Comptes Elite VIP', value: submissions.filter(s => s.selectedOffer?.includes('vip')).length, accent: '#92400e' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderTop: `3px solid ${stat.accent}`,
              borderRadius: '8px', padding: '32px',
              display: 'flex', alignItems: 'center', gap: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              transition: 'transform 0.3s ease, boxShadow 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'; }}
            >
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</p>
                <p style={{ margin: '8px 0 0', fontSize: '36px', fontWeight: 300, color: '#111827', lineHeight: 1 }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tableau Soumissions ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb', borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '24px 32px', borderBottom: '1px solid #e5e7eb',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: '#ffffff',
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111827', letterSpacing: '0.5px' }}>
                Registre des Souscriptions
              </h2>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '100px', textAlign: 'center' }}>
              <div style={{
                width: '40px', height: '40px', border: '2px solid #e5e7eb',
                borderTopColor: '#DEB833', borderRadius: '50%',
                animation: 'spin 1s linear infinite', margin: '0 auto 24px',
              }} />
              <p style={{ color: '#6b7280', fontSize: '14px', margin: 0, letterSpacing: '1px' }}>SYNCHRONISATION...</p>
            </div>
          ) : fetchError ? (
            <div style={{ padding: '80px 24px', textAlign: 'center' }}>
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: '8px', padding: '40px', maxWidth: '560px', margin: '0 auto',
              }}>
                <p style={{ color: '#991b1b', fontWeight: 600, margin: '0 0 12px', fontSize: '16px', letterSpacing: '0.5px' }}>
                  ERREUR DE CONNEXION
                </p>
                <pre style={{
                  color: '#7f1d1d', fontSize: '13px', margin: '0 0 28px',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-all', textAlign: 'left',
                  background: '#ffffff', border: '1px solid #fecaca',
                  borderRadius: '6px', padding: '16px',
                }}>
                  {fetchError}
                </pre>
                <button
                  onClick={fetchSubmissions}
                  style={{
                    background: '#111827', color: '#ffffff', border: '1px solid #111827',
                    padding: '10px 24px', borderRadius: '6px', cursor: 'pointer',
                    fontWeight: 500, fontSize: '13px', transition: 'all 0.2s', letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#374151'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#111827'; }}
                >
                  Réessayer
                </button>
              </div>
            </div>
          ) : submissions.length === 0 ? (
            <div style={{ padding: '100px', textAlign: 'center' }}>
              <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0, letterSpacing: '1px' }}>AUCUNE DONNÉE DISPONIBLE</p>
            </div>
          ) : (
            <div>
              {submissions.map((sub, index) => {
                const offerStyle = getOfferColor(sub.selectedOffer);
                const isExpanded = expandedId === sub.id;

                return (
                  <div key={sub.id} style={{
                    borderBottom: index < submissions.length - 1 ? '1px solid #e5e7eb' : 'none',
                  }}>
                    {/* ── Ligne principale ── */}
                    <div
                      onClick={() => toggleExpand(sub.id)}
                      style={{
                        padding: '24px 32px', display: 'flex', alignItems: 'center',
                        gap: '24px', cursor: 'pointer',
                        background: isExpanded ? '#f9fafb' : '#ffffff',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.background = '#f9fafb'; }}
                      onMouseLeave={(e) => { if (!isExpanded) e.currentTarget.style.background = '#ffffff'; }}
                    >
                      {/* Avatar initiales */}
                      <div style={{
                        width: '48px', height: '48px', flexShrink: 0,
                        background: '#f3f4f6',
                        border: '1px solid #e5e7eb',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontWeight: 600, color: '#4b5563',
                        letterSpacing: '1px',
                      }}>
                        {(sub.nom?.[0] || '?').toUpperCase()}{(sub.prenoms?.[0] || '').toUpperCase()}
                      </div>

                      {/* Nom + email */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          margin: 0, fontWeight: 500, color: '#111827',
                          fontSize: '16px', letterSpacing: '0.2px',
                        }}>
                          {(sub.nom || '').toUpperCase()} <span style={{ color: '#6b7280', fontWeight: 400 }}>{sub.prenoms}</span>
                        </p>
                        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280' }}>
                            <Mail style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
                            {sub.email}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6b7280' }}>
                            <Phone style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
                            {sub.telephonePrincipal}
                          </span>
                        </div>
                      </div>

                      {/* Date */}
                      <div style={{ textAlign: 'right', flexShrink: 0, display: 'none' }} className="md-visible">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563' }}>
                          <Calendar style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
                          {new Date(sub.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </span>
                        <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#9ca3af' }}>
                          {new Date(sub.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {/* Offre */}
                      <span style={{
                        flexShrink: 0, padding: '6px 12px',
                        background: offerStyle.bg, border: `1px solid ${offerStyle.border}`,
                        borderRadius: '4px', fontSize: '11px', fontWeight: 600,
                        color: offerStyle.color, letterSpacing: '1px', textTransform: 'uppercase'
                      }}>
                        {getOfferLabel(sub.selectedOffer)}
                      </span>

                      {/* Chevron */}
                      <div style={{ flexShrink: 0, color: '#9ca3af', transition: 'transform 0.3s ease', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                        <ChevronDown style={{ width: '20px', height: '20px' }} />
                      </div>
                    </div>

                    {/* ── Détails dépliés ── */}
                    {isExpanded && (
                      <div style={{
                        padding: '40px', background: '#f9fafb',
                        borderTop: '1px solid #e5e7eb',
                        animation: 'fadeIn 0.3s ease-out',
                      }}>
                        <div style={{
                          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px',
                        }}>
                          {/* Identité */}
                          <DetailCard
                            title="Identité & Contact"
                            items={[
                              ['Date de Naissance', `${sub.dateNaissance || '—'} à ${sub.lieuNaissance || '—'}`],
                              ['Nationalité', sub.nationalite || '—'],
                              ['Pièce d\\'identité', `${sub.typePiece || '—'} (${sub.numeroPiece || '—'})`],
                              ['Tél. Secondaire', sub.telephoneSecondaire || 'N/A'],
                              ['WhatsApp', sub.whatsapp || 'N/A'],
                            ]}
                          />
                          {/* Résidence */}
                          <DetailCard
                            title="Résidence"
                            items={[
                              ['Pays', sub.paysResidence || '—'],
                              ['Ville', sub.ville === 'Autre' ? sub.villeCustom : sub.ville || '—'],
                              ['Code Postal', sub.codePostal === 'Autre' ? sub.codePostalCustom : sub.codePostal || '—'],
                              ['Adresse', sub.adresse || '—'],
                            ]}
                          />
                          {/* Profil & Capital */}
                          <DetailCard
                            title="Profil & Capital"
                            items={[
                              ['Statut Pro.', sub.statutPro || '—'],
                              ['Secteur', sub.professionSecActivite || '—'],
                              ['Capital à Investir', sub.capitalInvestir ? `${new Intl.NumberFormat('fr-FR').format(sub.capitalInvestir)} FCFA` : 'N/A'],
                              ['Horizon', sub.horizonInvestissement || '—'],
                              ['Expérience', sub.experienceInvestissement || '—'],
                              ['Tolérance au Risque', sub.toleranceRisque || '—'],
                            ]}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .md-visible { display: block !important; }
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f9fafb; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
    </div>
  );
};

// ─── Petit composant carte de détails ───────────────────────────────────────
const DetailCard = ({ title, items }) => (
  <div>
    <h4 style={{
      margin: '0 0 24px', fontSize: '11px', fontWeight: 600,
      color: '#4b5563', textTransform: 'uppercase', letterSpacing: '2px',
      paddingBottom: '12px', borderBottom: '1px solid #e5e7eb',
    }}>
      {title}
    </h4>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {items.map(([label, value], i) => (
        <li key={i} style={{
          display: 'flex', flexDirection: 'column',
          marginBottom: i < items.length - 1 ? '16px' : 0,
        }}>
          <span style={{ fontSize: '12px', color: '#9ca3af', letterSpacing: '0.5px' }}>{label}</span>
          <span style={{ fontSize: '14px', color: '#111827', marginTop: '4px', fontWeight: 500 }}>{value}</span>
        </li>
      ))}
    </ul>
  </div>
);
"""

# Reconstruct file
start_idx = -1
for i, line in enumerate(lines):
    if line.strip().startswith('const getOfferColor ='):
        start_idx = i
        break

end_idx = -1
for i, line in enumerate(lines):
    if line.strip().startswith('const AdminPage ='):
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    with open(r'c:\Users\hp\Downloads\dm-plus-invest-form-main\src\Admin.jsx', 'w', encoding='utf-8') as f:
        f.writelines(lines[:start_idx])
        f.write(new_content + '\n\n')
        f.writelines(lines[end_idx:])
    print('Successfully updated')
else:
    print(f'Error: start_idx={start_idx}, end_idx={end_idx}')
