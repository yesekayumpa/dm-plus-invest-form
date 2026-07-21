import { Settings } from 'lucide-react';

export const MaintenancePage = () => {
    return (
        <div className='relative min-h-screen w-full overflow-hidden bg-black font-sans'>
            
            {/* === Fond identique au hero original === */}
            {/* Image de fond avec zoom cinématique */}
            <img
                src="/samsung.jpg"
                alt="background"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                style={{ animation: 'cinematicZoom 20s ease-in-out infinite alternate' }}
            />

            {/* Dégradé du haut vers le bas (identique au hero original) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />
            {/* Flou léger */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-10" />

            {/* === Contenu centré === */}
            <div className="relative z-20 flex min-h-screen flex-col items-center justify-between px-8 py-16">

                {/* Logo en haut — blanc/inversé comme le hero mobile */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        src="/logo-white.png"
                        alt="DM+ Investment"
                        className="h-20 w-auto"
                        style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                    />
                    <div className="h-px w-8" style={{ backgroundColor: '#deb833', opacity: 0.5 }} />
                </div>

                {/* Texte principal */}
                <div className="text-center space-y-4">
                    <h1 className="font-black text-3xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tighter uppercase">
                        Faites-en + avec <br />
                        <span style={{ color: '#deb833' }}>vos investissements</span>
                    </h1>
                    <p className="text-xs md:text-sm font-bold text-white/60 uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
                        Avec Digital Mind Plus Investment
                    </p>
                </div>

                {/* Badge maintenance */}
                <div
                    className="rounded-full px-8 py-3 backdrop-blur-sm"
                    style={{
                        border: '1px solid rgba(255,255,255,0.3)',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                >
                    <p className="flex items-center justify-center gap-3 text-center text-sm font-medium text-white">
                        <Settings
                            className="animate-spin"
                            style={{ animationDuration: "3s" }}
                        />
                        Site en maintenance — Nous revenons bientôt !
                    </p>
                </div>
            </div>

            {/* Keyframes pour le zoom cinématique */}
            <style>{`
                @keyframes cinematicZoom {
                    from { transform: scale(1.05); }
                    to   { transform: scale(1.25); }
                }
            `}</style>
        </div>
    );
};
