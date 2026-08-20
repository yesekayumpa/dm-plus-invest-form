import sys

with open(r'c:\Users\hp\Downloads\dm-plus-invest-form-main\src\Admin.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace getOfferColor
old_color_func = """  const getOfferColor = (offer) => {
    const map = {
      elite_light: { bg: '#f9fafb', color: '#4b5563', border: '#e5e7eb' },
      elite_premium: { bg: '#fefce8', color: '#b48600', border: '#fef08a' },
      elite_vip: { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
    };
    return map[offer] || { bg: '#f3f4f6', color: '#4b5563', border: '#e5e7eb' };
  };"""

new_color_func = """  const getOfferColor = (offer) => {
    const o = (offer || '').toLowerCase();
    if (o.includes('corporate') || o.includes('premium')) {
      return { bg: '#fefce8', color: '#b48600', border: '#fef08a' }; // Gold
    }
    if (o.includes('marche') || o.includes('vip')) {
      return { bg: '#111827', color: '#ffffff', border: '#111827' }; // Dark
    }
    return { bg: '#f3f4f6', color: '#4b5563', border: '#d1d5db' };
  };"""

content = content.replace(old_color_func, new_color_func)

# We will replace everything from {/* ── Tableau Soumissions ── */} to </main>
import re

start_marker = "{/* ── Tableau Soumissions ── */}"
end_marker = "</main>"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_table_html = """{/* ── Tableau Soumissions ── */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb', borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.03), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '24px 32px', borderBottom: '1px solid #f3f4f6',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: '#ffffff',
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827', letterSpacing: '0.2px' }}>
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
                <p style={{ color: '#991b1b', fontWeight: 600, margin: '0 0 12px', fontSize: '16px' }}>ERREUR DE CONNEXION</p>
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
                    background: '#111827', color: '#ffffff', border: 'none',
                    padding: '10px 24px', borderRadius: '6px', cursor: 'pointer',
                    fontWeight: 500, fontSize: '13px', transition: 'all 0.2s'
                  }}
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
                    borderBottom: index < submissions.length - 1 ? '1px solid #f3f4f6' : 'none',
                  }}>
                    {/* ── Ligne principale ── */}
                    <div
                      onClick={() => toggleExpand(sub.id)}
                      style={{
                        padding: '24px 32px', display: 'flex', alignItems: 'center',
                        gap: '24px', cursor: 'pointer',
                        background: isExpanded ? '#fafafa' : '#ffffff',
                        borderLeft: '4px solid',
                        borderLeftColor: isExpanded ? '#DEB833' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => { 
                        if (!isExpanded) {
                          e.currentTarget.style.background = '#fafafa';
                          e.currentTarget.style.borderLeftColor = '#DEB833';
                        }
                      }}
                      onMouseLeave={(e) => { 
                        if (!isExpanded) {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.borderLeftColor = 'transparent';
                        }
                      }}
                    >
                      {/* Avatar initiales */}
                      <div style={{
                        width: '52px', height: '52px', flexShrink: 0,
                        background: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)',
                        border: '1px solid #fde047',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '15px', fontWeight: 700, color: '#9a6800',
                        letterSpacing: '1px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                      }}>
                        {(sub.nom?.[0] || '?').toUpperCase()}{(sub.prenoms?.[0] || '').toUpperCase()}
                      </div>

                      {/* Nom + email */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          margin: 0, fontWeight: 700, color: '#111827',
                          fontSize: '17px', letterSpacing: '-0.2px',
                        }}>
                          {(sub.nom || '').toUpperCase()} <span style={{ color: '#6b7280', fontWeight: 500 }}>{sub.prenoms}</span>
                        </p>
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>
                            <Mail style={{ width: '14px', height: '14px', color: '#b48600' }} />
                            {sub.email}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', fontWeight: 500 }}>
                            <Phone style={{ width: '14px', height: '14px', color: '#b48600' }} />
                            {sub.telephonePrincipal}
                          </span>
                        </div>
                      </div>

                      {/* Date */}
                      <div style={{ textAlign: 'right', flexShrink: 0, display: 'none', paddingRight: '20px' }} className="md-visible">
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', fontWeight: 600 }}>
                          <Calendar style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
                          {new Date(sub.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </span>
                        <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>
                          {new Date(sub.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {/* Offre */}
                      <span style={{
                        flexShrink: 0, padding: '8px 16px',
                        background: offerStyle.bg, border: `1px solid ${offerStyle.border}`,
                        borderRadius: '24px', fontSize: '12px', fontWeight: 700,
                        color: offerStyle.color, letterSpacing: '0.5px', textTransform: 'uppercase',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                      }}>
                        {getOfferLabel(sub.selectedOffer)}
                      </span>

                      {/* Chevron */}
                      <div style={{ flexShrink: 0, marginLeft: '12px', color: '#9ca3af', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                        <ChevronDown style={{ width: '22px', height: '22px' }} />
                      </div>
                    </div>

                    {/* ── Détails dépliés ── */}
                    {isExpanded && (
                      <div style={{
                        padding: '40px', background: '#fafafa',
                        borderTop: '1px solid #f3f4f6', borderLeft: '4px solid #DEB833',
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
      """
    
    content = content[:start_idx] + new_table_html + content[end_idx:]

    with open(r'c:\Users\hp\Downloads\dm-plus-invest-form-main\src\Admin.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Row design updated successfully")
else:
    print("Could not find start/end markers.")
