"use client";
import React, { useRef, useLayoutEffect, useCallback, JSX } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
gsap.config({
    force3D: true
});

// --- INTERFACES ---
interface FooterLinkGroup {
    title: string;
    links: { name: string; url: string }[];
}

// --- MOCK DATA ---
const footerData: FooterLinkGroup[] = [
    {
        title: "Product",
        links: [
            { name: "Features", url: "#" },
            { name: "Integrations", url: "#" },
            { name: "Pricing", url: "#" },
            { name: "Changelog", url: "#" },
        ]
    },
    {
        title: "Company",
        links: [
            { name: "About Us", url: "#" },
            { name: "Careers", url: "#" },
            { name: "Blog", url: "#" },
            { name: "Contact", url: "#" },
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" },
            { name: "Cookie Policy", url: "#" },
        ]
    }
];

export default function CtaAndFooter(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLElement>(null);
    const bigTextWrapRef = useRef<HTMLDivElement>(null);
    const bigTextRef = useRef<HTMLHeadingElement>(null);


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
        fitHugeText();


        if (ctaRef.current) {
            gsap.fromTo('.cta-line-inner',
                { yPercent: 100, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo('.cta-button',
                { scale: 0.8, opacity: 0, y: 30 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: "top 75%",
                    }
                }
            );
        }


        if (footerRef.current) {
            gsap.fromTo('.footer-col',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 85%",
                    }
                }
            );
        }


        if (bigTextRef.current && bigTextWrapRef.current) {
            const splitHugeText = new SplitText(bigTextRef.current, {
                type: 'chars, lines',
                mask: 'lines'
            });

            gsap.from(splitHugeText.chars, {
                yPercent: 120,
                duration: 1.6,
                stagger: 0.04,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: bigTextWrapRef.current,
                    start: "top 95%",
                }
            });

            return () => {
                splitHugeText.revert();
            };
        }
    }, { scope: containerRef, revertOnUpdate: true });

    return (
        <div ref={containerRef} className="relative w-full bg-foreground text-background flex flex-col pt-12">


            <section
                ref={ctaRef}
                className="relative w-full flex flex-col items-center justify-center px-6 md:px-12 py-20 z-10"
            >
                <div className="max-w-4xl w-full flex flex-col items-center text-center gap-10">

                    {/* Clean, Normal Font Heading */}
                    <div className="flex flex-col items-center font-header font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight">
                        <div className="overflow-hidden py-1">
                            <h2 className="cta-line-inner will-change-transform">Ready to elevate your</h2>
                        </div>
                        <div className="overflow-hidden py-1">
                            <h2 className="cta-line-inner will-change-transform text-background/80">AI workflow today?</h2>
                        </div>
                    </div>


                    <Link
                        href="https://echo-gpt-six.vercel.app/"
                        target="_blank"
                        className="cta-button group relative inline-flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 rounded-full bg-background text-foreground overflow-hidden cursor-pointer shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 will-change-transform"
                    >
                        {/* Shimmer/Sweep Background Effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />

                        <span className="relative z-10 text-lg md:text-xl font-bold tracking-wide">
                            Try EchoGPT Now
                        </span>

                        {/* Animated Icon Container */}
                        <div className="relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground text-background transition-transform duration-500 ease-out group-hover:scale-110">
                            <ArrowRight className="size-5 md:size-6 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:-rotate-45" />
                        </div>
                    </Link>
                </div>
            </section>


            <footer
                ref={footerRef}
                className="relative w-full pt-20 px-4 sm:px-6 md:px-12 flex flex-col justify-between overflow-hidden"
            >
                {/* Top Half: Links Grid */}
                <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-8 mb-24 z-10">

                    {/* Brand / Tagline Column */}
                    <div className="footer-col w-full md:w-1/3 flex flex-col gap-4">
                        <h4 className="font-bold font-header text-2xl tracking-tight">EchoGPT.</h4>
                        <p className="text-background/70 font-normal text-base md:text-lg max-w-sm leading-relaxed">
                            Compare AI models in one place, choose the right one, and build faster.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-4">
                        {footerData.map((group, idx) => (
                            <div key={idx} className="footer-col flex flex-col gap-5">
                                <h5 className="font-semibold text-sm text-background/50 uppercase tracking-wider">
                                    {group.title}
                                </h5>
                                <ul className="flex flex-col gap-3">
                                    {group.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <a
                                                href={link.url}
                                                className="text-base font-medium text-background/80 hover:text-background transition-colors duration-200"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>


                <div
                    ref={bigTextWrapRef}
                    className="relative z-0 mt-auto flex w-full items-end justify-center overflow-hidden pb-4 md:pb-8"
                >
                    <h1
                        ref={bigTextRef}
                        className="gsap-huge-text inline-block whitespace-nowrap uppercase text-center font-header font-bold  leading-[0.78] text-background will-change-transform"
                    >
                        echogpt
                    </h1>
                </div>

                {/* Copyright / Bottom Bar */}
                <div className="footer-col w-full border-t border-background/20 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-medium text-background/60 z-10 relative">
                    <p>© {new Date().getFullYear()} EchoGPT Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-background transition-colors">Twitter</a>
                        <a href="#" className="hover:text-background transition-colors">GitHub</a>
                        <a href="#" className="hover:text-background transition-colors">LinkedIn</a>
                    </div>
                </div>
            </footer>


        </div>
    );
}