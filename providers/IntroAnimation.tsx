"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const topPanelRef = useRef<HTMLDivElement>(null);
    const bottomPanelRef = useRef<HTMLDivElement>(null);
    const topTextRef = useRef<HTMLParagraphElement>(null);
    const bottomTextRef = useRef<HTMLParagraphElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sessionKey = 'echogpt-intro-played';
        try {
            if (window.sessionStorage.getItem(sessionKey) === 'true') {
                gsap.set(containerRef.current, { display: 'none' });
                onComplete();
                return;
            }
        } catch {
            // Continue with the intro if session storage is unavailable.
        }

        const mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)"
        }, (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean };

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(containerRef.current, { display: 'none' });
                    try {
                        window.sessionStorage.setItem(sessionKey, 'true');
                    } catch {
                        // The intro still completes if session storage is unavailable.
                    }
                    onComplete();
                }
            });

            const xOffset = isMobile ? -30 : -80;
            const blurStart = isMobile ? "blur(0px)" : "blur(16px)";
            const blurEnd = "blur(0px)";

            // 1. Text Entrance 
            tl.fromTo(topTextRef.current,
                { x: xOffset, opacity: 0, filter: blurStart },
                { x: 0, opacity: 1, filter: blurEnd, duration: 1.2, ease: "power3.out" },
                0.2
            )
                .fromTo(bottomTextRef.current,
                    { x: Math.abs(xOffset), opacity: 0, filter: blurStart },
                    { x: 0, opacity: 1, filter: blurEnd, duration: 1.2, ease: "power3.out" },
                    0.2
                );

            // 2. Text Exit 
            tl.to(topTextRef.current, {
                x: xOffset,
                opacity: 0,
                filter: blurStart,
                duration: 0.8,
                ease: "power3.in",
                delay: 1
            })
                .to(bottomTextRef.current, {
                    x: Math.abs(xOffset),
                    opacity: 0,
                    filter: blurStart,
                    duration: 0.8,
                    ease: "power3.in"
                }, "<");

            // 3. Center line expands
            tl.to(lineRef.current, {
                scaleX: 1,
                duration: 0.6,
                ease: "expo.inOut"
            });

            // 4. Split screen panels
            tl.to(topPanelRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "expo.inOut"
            })
                .to(bottomPanelRef.current, {
                    yPercent: 100,
                    duration: 1.2,
                    ease: "expo.inOut"
                }, "<")
                .to(lineRef.current, {
                    opacity: 0,
                    duration: 0.1
                }, "<");
        });

        return () => mm.revert();
    }, { scope: containerRef, dependencies: [onComplete], revertOnUpdate: true });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-999 w-full h-dvh flex flex-col overflow-hidden pointer-events-auto bg-transparent"
        >
            {/* Top Split Panel */}
            <div
                ref={topPanelRef}
                className="relative w-full h-1/2 bg-background flex justify-center items-end overflow-hidden z-10 origin-top will-change-transform"
            >
                <div
                    ref={lineRef}
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground scale-x-0 origin-center z-20 will-change-transform"
                />
            </div>

            {/* Bottom Split Panel */}
            <div
                ref={bottomPanelRef}
                className="relative w-full h-1/2 bg-background z-10 origin-bottom will-change-transform"
            />


            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 font-header text-[clamp(3rem,12vw,10rem)] leading-none font-semibold tracking-tight text-foreground pointer-events-none uppercase px-4 text-center">

                {/* Top Text Block */}
                <div className="h-1/2 w-full flex items-end justify-center pb-2 md:pb-4 overflow-hidden">
                    <p ref={topTextRef} className="opacity-0 will-change-transform">
                        A NEW WAY
                    </p>
                </div>

                {/* Bottom Text Block */}
                <div className="h-1/2 w-full flex items-start justify-center pt-2 md:pt-4 overflow-hidden">
                    <p ref={bottomTextRef} className="opacity-0 text-foreground/80 will-change-transform">
                        TO THINK.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default IntroAnimation;
