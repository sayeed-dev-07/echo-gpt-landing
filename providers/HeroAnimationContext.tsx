"use client";

import { createContext, useContext, type ReactNode } from "react";

const HeroAnimationContext = createContext(false);

export function HeroAnimationProvider({
    children,
    playHeroAnimation,
}: {
    children: ReactNode;
    playHeroAnimation: boolean;
}) {
    return (
        <HeroAnimationContext.Provider value={playHeroAnimation}>
            {children}
        </HeroAnimationContext.Provider>
    );
}

export function usePlayHeroAnimation() {
    return useContext(HeroAnimationContext);
}
