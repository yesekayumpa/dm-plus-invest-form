import { Settings } from 'lucide-react';

export const MaintenancePage = () => {
    return (
        <div
            className='relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4'
            style={{
                backgroundColor: '#C4A020',
                backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)
                `,
                backgroundSize: '35px 35px',
            }}
        >
            {/* Logo */}
            <div className="mb-8 flex items-center justify-center">
                <img src="/logo-white.png" alt="DM+ Investment" width={200} height={100} style={{ filter: 'brightness(0) invert(1)' }} />
            </div>

            {/* Main heading */}
            <h1 className="mb-3 text-center font-black text-white" style={{ textShadow: 'none' }}>
                <span className="block uppercase" style={{ fontSize: 'clamp(1.8rem, 6vw, 4.5rem)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                    Faites-en + avec
                </span>
                <span className="block uppercase" style={{ fontSize: 'clamp(1.8rem, 6vw, 4.5rem)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                    vos investissements
                </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-10 text-center text-white/75" style={{ fontSize: '0.9rem' }}>
                Avec Digital Mind Plus Investment
            </p>

            {/* Maintenance notice */}
            <div style={{
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.35)',
                backgroundColor: 'rgba(255,255,255,0.12)',
                padding: '10px 28px',
                backdropFilter: 'blur(8px)',
            }}>
                <p className="flex items-center justify-center gap-3 text-center text-white" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                    <Settings
                        className="animate-spin flex-shrink-0"
                        style={{ animationDuration: "3s" }}
                        size={15}
                    />
                    Site en maintenance - Nous revenons bientôt!
                </p>
            </div>
        </div>
    );
};
