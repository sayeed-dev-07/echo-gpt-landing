'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const models = [
    {
        name: "GPT-4o",
        desc: "OpenAI's flagship multimodal model integrating advanced text, vision, and native audio reasoning capabilities.",
        meta: "multimodal",
        bg: "bg-[crimson]"
    },
    {
        name: "Claude 3.5",
        desc: "Anthropic's fastest model featuring extended context windows and unparalleled nuanced text generation.",
        meta: "text & code",
        bg: "bg-orange-100"
    },
    {
        name: "Gemini 1.5",
        desc: "Google's highly efficient architecture with a massive context window for large-scale data analysis.",
        meta: "multimodal",
        bg: "bg-[skyblue]"
    },
    {
        name: "Midjourney",
        desc: "Industry-leading diffusion model producing hyper-realistic and highly stylized image generations.",
        meta: "image gen",
        bg: "bg-teal-100"
    },
    {
        name: "DALL-E 3",
        desc: "Seamlessly translates nuanced text prompts into highly accurate, detailed visual compositions.",
        meta: "image gen",
        bg: "bg-rose-100"
    },
    {
        name: "Llama 3",
        desc: "Meta's highly optimized, open-source large language model designed for versatile deployment.",
        meta: "open source",
        bg: "bg-emerald-100"
    },
    {
        name: "Bard",
        desc: "Google's conversational AI model with real-time web access for up-to-date information retrieval.",
        meta: "text & code",
        bg: "bg-indigo-100"
    },
    {
        name: "Claude 4",
        desc: "Anthropic's latest model with enhanced reasoning, context retention, and safety features.",
        meta: "text & code",
        bg: "bg-yellow-100"
    },
    {
        name: "Gemini 1.5",
        desc: "Google's highly efficient architecture with a massive context window for large-scale data analysis.",
        meta: "multimodal",
        bg: "bg-[skyblue]"
    }
];

export default function App() {
    const containerRef = useRef(null);

    useGSAP(() => {



        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",

            }
        });


        tl.to('.outline-mask-rect', {
            attr: { width: 1200 },
            duration: 1.2,
            ease: "power3.inOut"
        })

            .to('.fill-mask-rect', {
                attr: { width: 1200 },
                duration: 1.2,
                ease: "power3.inOut"
            }, "-=0.7")


    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full bg-foreground text-background min-h-[200vh]">

            {/* SVG Title Animation */}
            <div className="sticky top-[10vh] z-0 flex items-center justify-center w-full overflow-hidden h-auto py-4 pointer-events-none">
                <svg
                    viewBox="0 0 1200 250"
                    className="w-full  h-auto select-none px-4"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* Mask for Outline Wipe */}
                        <clipPath id="outline-wipe">
                            <rect className="outline-mask-rect" x="0" y="0" width="0" height="250" />
                        </clipPath>

                        {/* Mask for Fill Wipe */}
                        <clipPath id="fill-wipe">
                            <rect className="fill-mask-rect" x="0" y="0" width="0" height="250" />
                        </clipPath>
                    </defs>

                    {/* Outlined Text */}
                    <text
                        x="50%" y="50%"
                        textAnchor="middle" dominantBaseline="middle"
                        className="font-header font-black uppercase text-[180px] text-black"
                        fill="none" stroke="currentColor" strokeWidth="4"
                        clipPath="url(#outline-wipe)"
                    >
                        MODELS
                    </text>

                    {/* Solid Text (Fills in over the outline) */}
                    <text
                        x="50%" y="50%"
                        textAnchor="middle" dominantBaseline="middle"
                        className="font-header font-black uppercase text-[180px] text-background"
                        fill="currentColor"
                        clipPath="url(#fill-wipe)"
                    >
                        MODELS
                    </text>
                </svg>
            </div>

            {/* Cards Grid */}
            <div className="relative z-10 w-full mt-[30vh] pb-32 px-4 sm:px-6 md:px-12">
                <div className="w-full pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                        {models.map((model, idx) => (
                            <div key={idx} className="editorial-card flex flex-col border-2 border-background bg-foreground sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ">
                                {/* Top Massive Block */}
                                <div className={`relative w-full aspect-6/3 ${model.bg} border-b-2 border-background flex items-center justify-center overflow-hidden`}>
                                    <h3 className="font-header text-4xl md:text-5xl lg:text-6xl font-black  tracking-tighter text-black text-center px-4 ">
                                        {model.name}
                                    </h3>
                                </div>

                                {/* Bottom Split Block */}
                                <div className="flex flex-1 min-h-[120px] bg-foreground">
                                    <div className="flex-1 p-5 md:p-6 flex items-center">
                                        <p className="text-sm md:text-base text-background/80 leading-relaxed font-medium">
                                            {model.desc}
                                        </p>
                                    </div>
                                    <div className="w-20 sm:w-24 shrink-0 border-l-2 border-background flex items-center justify-center p-3 bg-background text-foreground">
                                        <span
                                            className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-center rotate-180"
                                            style={{ writingMode: 'vertical-rl' }}
                                        >
                                            {model.meta}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}