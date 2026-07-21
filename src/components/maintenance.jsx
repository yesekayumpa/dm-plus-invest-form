import { Settings } from 'lucide-react';

export const MaintenancePage = () => {
    return (
        <div className='relative min-h-screen w-full flex flex-col items-center justify-center px-4 font-sans overflow-hidden' style={{ backgroundColor: '#E0BF3A' }}>
            {/* Background Image Grid */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <img src="/grid-black.jpg" className='mix-blend-overlay opacity-10 h-full md:w-full object-cover' alt="" />
            </div>

            {/* Center content */}
            <div className='relative z-20 flex flex-col items-center justify-center w-full'>
                {/* Logo */}
                <div className="mb-10 flex items-center gap-2">
                    <img src="/logo-white.png" alt="logo" width={220} height={110} style={{ filter: 'brightness(0) invert(1)' }} />
                </div>

                {/* Main heading */}
                <h1 className="mb-4 text-center font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <span className="block text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter" style={{ lineHeight: '1.1' }}>
                        Faites-en + avec
                    </span>
                    <span className="block text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter" style={{ lineHeight: '1.1' }}>
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
        </div>
    );
};
