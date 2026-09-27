"use client";
import React, { useRef, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { usePlayHeroAnimation } from '@/providers/HeroAnimationContext';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, SplitText);
gsap.config({
    force3D: true
})

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const bigTextWrapRef = useRef<HTMLDivElement>(null);
    const bigTextRef = useRef<HTMLHeadingElement>(null);
    const playAnimation = usePlayHeroAnimation();

    const fitHugeText = useCallback(() => {
        const wrap = bigTextWrapRef.current;
        const el = bigTextRef.current;
        if (!wrap || !el) return;
        const baseFontSize = 100;
        el.style.fontSize = `${baseFontSize}px`;

        const wrapWidth = wrap.clientWidth;
        const textWidth = el.scrollWidth;
        if (!wrapWidth || !textWidth) return;
        const SAFETY = 0.995;
        el.style.fontSize = `${(wrapWidth / textWidth) * baseFontSize * SAFETY}px`;
    }, []);

    useLayoutEffect(() => {
        const wrap = bigTextWrapRef.current;
        if (!wrap) return;

        fitHugeText();

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                requestAnimationFrame(fitHugeText);
            });
        }

        const ro = new ResizeObserver(() => fitHugeText());
        ro.observe(wrap);
        window.addEventListener('resize', fitHugeText);

        return () => {
            ro.disconnect();
            window.removeEventListener('resize', fitHugeText);
        };
    }, [fitHugeText]);

    useGSAP(() => {
        if (!playAnimation) return;

        fitHugeText();

        gsap.set(heroRef.current, { visibility: "visible" });

        const links = new SplitText('.gsap-link', {
            type: 'lines',
            mask: 'lines'
        })

        const splitHugeText = new SplitText(bigTextRef.current, {
            type: 'chars, lines',
            mask: 'lines'
        });

        const tl = gsap.timeline();

        tl.from(splitHugeText.chars, {
            yPercent: 120,
            duration: 1.6,
            stagger: 0.04,
            ease: "expo.out"
        });

        tl.from('.gsap-mid-word', {
            yPercent: 120,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out"
        }, "-=1.4");

        tl.from(links.lines, {
            yPercent: 120,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out"
        }, "-=0.9");

        tl.from('.gsap-top-text', {
            yPercent: 120,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8");

        tl.fromTo('.gsap-top-line',
            { xPercent: -101 },
            { xPercent: 0, duration: 1, ease: "expo.inOut" },
            "-=0.7"
        );

        return () => {
            splitHugeText.revert();
        };

    }, { scope: heroRef, dependencies: [playAnimation], revertOnUpdate: true });

    return (
        <section
            ref={heroRef}
            className="invisible  relative flex min-h-dvh w-full flex-col justify-between gap-8 overflow-hidden bg-foreground px-4 py-6 text-background sm:px-6 sm:py-8 md:h-dvh md:min-h-0 md:gap-0 md:px-12 md:pt-8 md:pb-4"
        >
            {/* top header */}
            <div className="flex w-full flex-col items-start justify-between gap-3 md:flex-row md:items-start md:gap-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-bold  tracking-[0.16em] sm:text-[10px] md:gap-4 md:text-xs md:tracking-[0.2em]">
                    <div className="overflow-hidden">
                        <span className="gsap-top-text block will-change-transform">
                            premium ai platform
                        </span>
                    </div>

                    <div className="w-[30px] md:w-[50px] h-[1px] overflow-hidden">
                        <div className="gsap-top-line w-full h-full bg-background will-change-transform"></div>
                    </div>

                    <div className="overflow-hidden">
                        <span className="gsap-top-text block will-change-transform text-background/60">
                            built for curious minds
                        </span>
                    </div>
                </div>

                <div className="overflow-hidden text-left text-[9px] font-bold  tracking-[0.16em]  sm:text-[10px] md:text-right md:text-xs md:tracking-[0.2em]">
                    <span className="gsap-top-text block will-change-transform">
                        @2026 echogpt inc.
                    </span>
                </div>
            </div>


            <div className="relative z-10 flex w-full flex-1 flex-col justify-center gap-12 md:flex-row md:items-center md:justify-between md:gap-0">
                <div className="flex flex-col font-header text-[clamp(2.75rem,12vw,4.5rem)] uppercase leading-[0.82] tracking-tight sm:text-6xl md:text-7xl">
                    {["more", "than", "one", "gpt"].map((word, idx) => (
                        <div key={idx} className="overflow-hidden py-0.5 md:py-1">
                            <div className="gsap-mid-word will-change-transform">
                                {word}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-header text-[clamp(0.875rem,4.4vw,1.5rem)] uppercase sm:flex sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2 sm:text-3xl md:mt-0 md:flex-col md:items-end md:gap-2 md:text-right md:text-4xl">
                    {["access gpt", "discover models", "choose your plan", "start creating"].map((link, idx) => (
                        <Link href={'https://echo-gpt-six.vercel.app/'} target='_blank' key={idx} className="overflow-hidden py-1">
                            <div className="gsap-link hover:text-background/50 cursor-pointer transition-colors will-change-transform">
                                {link}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>


            <div
                ref={bigTextWrapRef}
                className="relative z-0 mt-auto flex w-full items-end justify-center overflow-hidden"
            >
                <h1
                    ref={bigTextRef}
                    className="gsap-huge-text inline-block whitespace-nowrap text-center font-header font-bold uppercase leading-[0.78] text-background will-change-transform"
                >
                    echogpt
                </h1>
            </div>
        </section>
    );
};

export default Hero;