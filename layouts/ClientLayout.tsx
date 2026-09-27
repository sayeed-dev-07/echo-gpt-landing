"use client";

import IntroAnimation from '@/providers/IntroAnimation';
import LenisProvider from '@/providers/LenisProvider';
import { HeroAnimationProvider } from '@/providers/HeroAnimationContext';
import React, { useCallback, useState } from 'react';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const [playHeroAnimation, setPlayHeroAnimation] = useState(false);
    const handleIntroComplete = useCallback(() => setPlayHeroAnimation(true), []);

    return (
        <LenisProvider>
            <HeroAnimationProvider playHeroAnimation={playHeroAnimation}>
                <IntroAnimation onComplete={handleIntroComplete} />
                {children}
            </HeroAnimationProvider>
        </LenisProvider>
    );
};

export default ClientLayout;
