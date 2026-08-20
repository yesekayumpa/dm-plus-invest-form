import sys
import re

with open(r'c:\Users\hp\Downloads\dm-plus-invest-form-main\src\Admin.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "{/* ── Stats ── */}"
end_marker = "{/* ── Tableau Soumissions ── */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_stats_html = """{/* ── Stats ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px', marginBottom: '48px',
        }}>
          {[
            { 
              icon: <Users style={{ width: '28px', height: '28px', color: '#111827' }} />, 
              iconBg: '#f3f4f6',
              label: 'Total Demandes', 
              value: submissions.length, 
              accent: '#111827' 
            },
            { 
              icon: <TrendingUp style={{ width: '28px', height: '28px', color: '#b48600' }} />, 
              iconBg: '#fefce8',
              label: 'Comptes Premium', 
              value: submissions.filter(s => s.selectedOffer?.includes('premium') || s.selectedOffer?.includes('corporate')).length, 
              accent: '#b48600' 
            },
            { 
              icon: <Star style={{ width: '28px', height: '28px', color: '#92400e' }} />, 
              iconBg: '#fffbeb',
              label: 'Comptes Elite', 
              value: submissions.filter(s => s.selectedOffer?.includes('vip') || s.selectedOffer?.includes('marche')).length, 
              accent: '#92400e' 
            },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '20px', padding: '32px',
              display: 'flex', alignItems: 'center', gap: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), boxShadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative', overflow: 'hidden'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.transform = 'translateY(-6px)'; 
              e.currentTarget.style.boxShadow = '0 25px 30px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'; 
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'; 
            }}
            >
              {/* Ligne d'accent sur la gauche */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: stat.accent }} />
              
              <div style={{
                background: stat.iconBg,
                width: '64px', height: '64px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.03)',
              }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</p>
                <p style={{ margin: '8px 0 0', fontSize: '42px', fontWeight: 800, color: '#111827', lineHeight: 1, letterSpacing: '-1.5px' }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        """
    content = content[:start_idx] + new_stats_html + content[end_idx:]

    with open(r'c:\Users\hp\Downloads\dm-plus-invest-form-main\src\Admin.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Stats design updated successfully")
else:
    print("Could not find start/end markers.")
