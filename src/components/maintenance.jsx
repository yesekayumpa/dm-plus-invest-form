import { Settings } from 'lucide-react';

export const MaintenancePage = () => {
    return (
        <div
            className='relative min-h-screen w-full flex flex-col items-center justify-center px-4 font-sans'
            style={{
                backgroundColor: '#C5A017', // Couleur dorée exacte de l'image
                backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px', // Taille de la grille
            }}
        >
            {/* Logo */}
            <div className="mb-10 flex items-center gap-2">
                <img src="/logo-white.png" alt="logo" width={220} height={110} style={{ filter: 'brightness(0) invert(1)' }} />
            </div>

            {/* Main heading */}
            <h1 className="mb-4 text-center font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <span className="block text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter" style={{ lineHeight: '1.1', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    Faites-en + avec
                </span>
                <span className="block text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter" style={{ lineHeight: '1.1', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    vots investissements
                </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-12 text-center text-sm md:text-lg text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                Avec Digital Mind Plus Investment
            </p>

            {/* Maintenance notice */}
            <div className='rounded-full border border-white/40 bg-transparent px-8 py-3 backdrop-blur-sm'>
                <p className="flex items-center justify-center gap-3 text-center text-sm md:text-base font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <Settings 
                        className="animate-spin"
                        style={{ animationDuration: "3s" }}
                        size={18}
                    />
                    Site en maintenance - Nous revenons bientôt!
                </p>
            </div>
        </div>
    );
};
