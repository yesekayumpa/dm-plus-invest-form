import { Settings } from 'lucide-react';

export const MaintenancePage = () => {
    return (
        <div
            className='relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4'
            style={{
                backgroundColor: '#C9A227',
                backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
            }}
        >
            {/* Logo */}
            <div className="mb-8 flex items-center justify-center">
                <img src="/logo-white.png" alt="DM+ Investment" width={220} height={110} />
            </div>

            {/* Main heading */}
            <h1 className="mb-4 text-center font-black text-white drop-shadow">
                <span className="block text-2xl uppercase tracking-tight md:text-5xl lg:text-6xl">
                    Faites-en + avec
                </span>
                <span className="block text-2xl uppercase tracking-tight md:text-5xl lg:text-6xl">
                    vos investissements
                </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-10 text-center text-sm text-white/80 md:text-base">
                Avec Digital Mind Plus Investment
            </p>

            {/* Maintenance notice */}
            <div className='rounded-full border border-white/30 bg-white/10 px-8 py-3 backdrop-blur-sm'>
                <p className="flex items-center justify-center gap-3 text-center text-sm font-medium text-white">
                    <Settings
                        className="animate-spin flex-shrink-0"
                        style={{ animationDuration: "3s" }}
                        size={16}
                    />
                    Site en maintenance — Nous revenons bientôt !
                </p>
            </div>
        </div>
    );
};
