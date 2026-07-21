import { Settings } from 'lucide-react';

export const MaintenancePage = ()  => {
    return (
        <div className='relative min-h-screen w-full overflow-hidden' style={{ backgroundColor: '#E0BF3A' }}>
            <div className="absolute inset-0 z-0 h-full w-full">
                <img src="/grid-black.jpg" 
                className='mix-blend-overlay opacity-10 h-full md:w-full' alt="" />
            </div>
            {/* Center content */}
            <div
                className='relative z-20 flex min-h-screen flex-col items-center justify-center px-4 transition-all duration-1000 delay-300'
            >
                {/* Logo */}
                <div className="mb-6 flex items-center gap-2">
                <img src="/logo-white.png" alt="logo" width={250} height={125} />
                </div>

                {/* Main heading */}
                <h1 className="mb-4 text-center font-black text-white">
                <span className="block text-xl uppercase tracking-tight md:text-5xl lg:text-6xl">Faites-en + avec</span>
                <span className="block text-xl uppercase tracking-tight md:text-5xl lg:text-6xl">vots investissements</span>
                </h1>

                {/* Subtitle */}
                <p className="text-center text-sm text-white/80 md:text-base">Avec Digital Mind Plus Investment</p>

                {/* Maintenance notice */}
                <div
                className='mt-12 rounded-full border border-white/30 bg-white/10 px-8 py-3 backdrop-blur-sm transition-all duration-1000 delay-700'
                >
                <p className="flex items-center justify-center gap-3 text-center text-sm font-medium text-white">
                    <Settings 
                    className="animate-spin"
                    style={{ animationDuration: "3s" }}  />
                    Site en maintenance - Nous revenons bientôt!
                </p>
                </div>
            </div>
        </div>
    );
};
