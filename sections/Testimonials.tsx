'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cardData = [
    { id: 1, name: "Alice Johnson", role: "Design Lead", text: "I can compare AI models in one place and choose the right one for each design task." },
    { id: 2, name: "Marcus Lee", role: "Product Manager", text: "Switching between models is simple, so I can explore different answers without changing tools." },
    { id: 3, name: "Sarah Connor", role: "System Administrator", text: "The clear layout makes it easy for our team to find a model and get started." },
    { id: 4, name: "David Chen", role: "Software Developer", text: "I spend less time navigating between AI tools and more time getting useful work done." },
];

const FeedBackCard = ({ data }) => (
    <div className="p-8 border-2 border-background bg-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
        <p className="text-xl md:text-2xl text-background/90 font-medium leading-relaxed">
            &quot;{data.text}&quot;
        </p>
        <div className="flex flex-col mt-4 border-t-2 border-background/20 pt-4">
            <span className="font-bold font-header text-2xl text-background  tracking-wider">{data.name}</span>
            <span className="text-xs text-background/60 ">{data.role}</span>
        </div>
    </div>
);

export default function Testimonials() {
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const cardsContainerRef = useRef(null);

    useGSAP(() => {
        // Keep the headline scroll-responsive while cards remain static.
        gsap.to('.testimonial-text-svg', {
            scale: 0.35,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: () => `top ${svgRef.current?.getBoundingClientRect().bottom ?? 0}px`,
                end: "bottom 50%",
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full bg-foreground text-background min-h-[300vh] pb-32">

            {/* Sticky SVG Container */}
            <div ref={svgRef} className="sticky top-[35vh] z-0 flex items-center justify-center w-full overflow-hidden h-[30vh] pointer-events-none origin-center">
                <svg
                    viewBox="0 0 1200 250"
                    className="testimonial-text-svg w-full h-full select-none px-4 origin-center will-change-transform"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>What users say about EchoGPT</title>

                    <text
                        x="50%" y="50%"
                        textAnchor="middle" dominantBaseline="middle"
                        className="font-sans font-black uppercase"
                        fontSize="170"
                        textLength="1100" lengthAdjust="spacingAndGlyphs"
                        fill="black"
                    >
                        WHAT USERS SAY
                    </text>
                </svg>
            </div>

            {/* Testimonials Cards Grid */}
            <div ref={cardsContainerRef} className="relative z-10 w-full mt-[100vh] px-6 sm:px-12 md:px-20">
                <div className="w-full flex flex-col gap-24 md:gap-32 pt-16 ">
                    {cardData.map((item, index) => {
                        let alignment = 'md:self-start';
                        if (index % 3 === 1) alignment = 'md:self-end';
                        if (index % 3 === 2) alignment = 'md:self-center';

                        return (
                            <div
                                id='feedback'
                                key={item.id}
                                className={`feedback-card w-full md:w-[60%] lg:w-[450px] xl:w-[500px] ${alignment}`}
                            >
                                <FeedBackCard data={item} />
                            </div>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}
