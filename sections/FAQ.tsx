/* eslint-disable react-hooks/refs */
'use client'
import React, { JSX, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Plus } from 'lucide-react';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.config({ force3D: true });


interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

interface FaqCardProps {
    data: FaqItem;
}

// --- MOCK FAQ DATA ---
const faqData: FaqItem[] = [
    {
        id: 1,
        question: "How does the pricing model work?",
        answer: "Our pricing is transparent and scales with your usage. We offer a flat monthly fee for standard features, with optional add-ons for enterprise-level analytics and dedicated support."
    },
    {
        id: 2,
        question: "Can I integrate this with my existing stack?",
        answer: "Absolutely. We provide a robust REST API and native SDKs for React, Vue, and Angular. Most of our clients are fully integrated within a matter of days."
    },
    {
        id: 3,
        question: "What kind of support do you offer?",
        answer: "All tiers include 24/7 email support. Pro and Enterprise tiers gain access to priority routing, a dedicated account manager, and shared Slack channels for real-time debugging."
    },
    {
        id: 4,
        question: "Is there a long-term contract required?",
        answer: "No, all standard plans operate on a month-to-month basis. You can cancel or pause your subscription at any time without penalty. Annual billing is available for a 20% discount."
    }
];

// --- FAQ CARD COMPONENT ---
const FaqCard: React.FC<FaqCardProps> = ({ data }) => {
    const lenis = useLenis();

    // Typing the refs to their respective HTML elements
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    const isOpen = useRef<boolean>(false);

    const { contextSafe } = useGSAP(() => {
        // Entrance animation for the question
        if (titleRef.current && containerRef.current) {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                },
                yPercent: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            });
        }

        // Entrance animation for the icon
        if (iconRef.current && containerRef.current) {
            gsap.from(iconRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                },
                scale: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "back.out(1.7)",
            });
        }
    }, { scope: containerRef });

    // Expand / Collapse Animations
    // contextSafe handles returning a clean function, so we cast it to standard void function
    const toggleCard = contextSafe(() => {
        if (isOpen.current) {
            // Close
            gsap.to(contentRef.current, {
                height: 0,
                duration: 0.6,
                ease: "power3.inOut",
                overwrite: true,
                onComplete: () => {
                    lenis?.resize();
                    ScrollTrigger.refresh();
                }
            });
            gsap.to(iconRef.current, {
                rotation: 0,
                duration: 0.5,
                ease: "power3.inOut"
            });
        } else {
            // Open
            gsap.to(contentRef.current, {
                height: 'auto',
                duration: 0.8,
                ease: "power3.inOut",
                overwrite: true,
                onComplete: () => {
                    lenis?.resize();
                    ScrollTrigger.refresh();
                }
            });
            gsap.to(iconRef.current, {
                rotation: 45, // Turns the Plus into an X
                duration: 0.5,
                ease: "power3.inOut"
            });
        }
        isOpen.current = !isOpen.current;
    }) as () => void; // Typecasting for the onClick handler

    return (
        <div
            ref={containerRef}
            className='w-full relative cursor-pointer group'
            onClick={toggleCard}
            style={{ willChange: 'transform' }}
        >
            {/* Header Area */}
            <div className='flex justify-between items-center py-6 md:py-8'>
                <div className='overflow-hidden py-1 pr-4'>
                    <h3
                        ref={titleRef}
                        className='text-xl sm:text-3xl md:text-4xl font-header font-medium text-background transition-colors duration-300 group-hover:text-background/70'
                    >
                        {data.question}
                    </h3>
                </div>

                {/* Icon */}
                <div ref={iconRef} className='text-background shrink-0 ml-4'>
                    <Plus className='size-8 md:size-10' />
                </div>
            </div>

            {/* Expandable Body */}
            <div
                ref={contentRef}
                className='h-0 overflow-hidden'
            >
                <div className='pb-8 md:pb-12'>
                    <p className='text-background/70 text-base md:text-xl lg:text-2xl max-w-4xl leading-relaxed font-medium'>
                        {data.answer}
                    </p>
                </div>
            </div>

            {/* Animated Bottom Border Line */}
            <div className="w-full h-0.5 bg-background/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-background transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            </div>
        </div>
    );
};

// --- MAIN FAQ SECTION ---
export default function FaqSection(): JSX.Element {
    return (
        <section className="relative w-full bg-foreground text-background py-24 md:py-40 px-4 sm:px-6 md:px-12 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* Left Side: Title & Description */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6 lg:sticky lg:top-40 h-fit z-10">

                    <div className="section-title font-header uppercase text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-background">
                        <p>FAQS</p>
                    </div>

                    <div className="text-background/70 text-lg sm:text-xl max-w-sm leading-relaxed mt-4 font-medium">
                        <p>Everything you need to know about our product, billing, and integration processes.</p>
                    </div>
                </div>

                {/* Right Side: Accordion List */}
                <div className="w-full lg:w-2/3 flex flex-col pt-4">
                    {/* Top border for the first item */}
                    <div className="w-full h-0.5 bg-background/10" />

                    {faqData.map((faq) => (
                        <FaqCard key={faq.id} data={faq} />
                    ))}
                </div>

            </div>
        </section>
    );
}