"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(useGSAP);

gsap.config({
    force3D: true
})

const allImages = [
    "https://i.pinimg.com/736x/06/82/94/068294a6afecd61f42cce5410db44cc1.jpg",
    "https://i.pinimg.com/736x/4b/01/1c/4b011c892d363c1b596053179a0a5517.jpg",
    "https://i.pinimg.com/736x/b9/c5/28/b9c528ba6b4258f7c810a3e71a660156.jpg",
    "https://i.pinimg.com/736x/6d/fa/b0/6dfab03ede8aeb7f0bd783bb07c16c0d.jpg",
    "https://i.pinimg.com/736x/31/13/14/311314e91ce4cfa69b7988df690ffb2b.jpg",
    "https://i.pinimg.com/736x/5d/23/e8/5d23e8cea42ba4a5513f6ab32f0b40c7.jpg",
    "https://i.pinimg.com/736x/79/b6/c2/79b6c218d0f5c77e5c656e6e6014a0f0.jpg",
    "https://i.pinimg.com/736x/f7/e6/cd/f7e6cd79c2d79e7798b02d9348bedc66.jpg",
    "https://i.pinimg.com/736x/13/8a/19/138a19787b2bc751594793af26f557f6.jpg",
    "https://i.pinimg.com/1200x/a0/a6/15/a0a61587182246e4b47fafe12427012b.jpg",
    "https://i.pinimg.com/736x/4f/0c/4c/4f0c4c1255514c5fc1496ca758b1ce43.jpg",
    "https://i.pinimg.com/736x/79/9b/a6/799ba64a19cd0bef189328167483a4dd.jpg",
    "https://i.pinimg.com/736x/f4/67/6c/f4676ce41be2d23260f7482d82c5d953.jpg",
    "https://i.pinimg.com/736x/b7/36/c7/b736c70e995f19d8cf42e8290bb30ef7.jpg",
    "https://i.pinimg.com/736x/d3/bf/02/d3bf025441c1c2b0bb1b4779cfc34c02.jpg",
    "https://i.pinimg.com/736x/27/25/78/2725780b9b363d8ddae84b1c6a533b0e.jpg",
    "https://i.pinimg.com/736x/0c/18/96/0c189669d7310de00c049d6b450c6f89.jpg"
];


const row1Images = allImages.slice(0, 6);
const row2Images = allImages.slice(6, 12);
const row3Images = allImages.slice(12, 17);


const RowItems = ({ images }: { images: string[] }) => (
    <div className="flex items-center gap-4 md:gap-6 px-2 md:px-3">
        {images.map((img, idx) => (
            <div
                key={idx}

                className="relative w-40 sm:w-56 md:w-72 aspect-3/4 shrink-0 overflow-hidden rounded-2xl bg-foreground/5"
            >
                <Image
                    src={img}
                    alt={`Gallery Artwork ${idx}`}
                    fill
                    loading="eager"
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 224px, 288px"
                    className="object-cover grayscale opacity-80"
                />
            </div>
        ))}
    </div>
);

export const GallerySection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Top Row: Left to Right
        gsap.fromTo('.row-l2r-1',
            { xPercent: -50 },
            { xPercent: 0, repeat: -1, duration: 45, ease: "none", force3D: true }
        );

        // Middle Row: Right to Left
        gsap.fromTo('.row-r2l',
            { xPercent: 0 },
            { xPercent: -50, repeat: -1, duration: 35, ease: "none", force3D: true }
        );

        // Bottom Row: Left to Right
        gsap.fromTo('.row-l2r-2',
            { xPercent: -50 },
            { xPercent: 0, repeat: -1, duration: 40, ease: "none", force3D: true }
        );
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="fixed top-0 z-0 [clip-path:inset(0)] flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background"
        >
            <div className="absolute top-2 md:top-6 -left-2 z-20 w-full px-4 sm:px-6 md:px-12">
                <h2 className="font-header text-2xl sm:text-4xl md:text-5xl xl:text-6xl  font-semibold text-[crimson]">
                    Image Studio Capabilities
                </h2>
            </div>

            {/* Rotated Container for the angled look */}
            <div className="relative flex w-full scale-[1.15] -rotate-6 flex-col gap-4 md:gap-6 pointer-events-none">

                {/* Row 1: Left to Right */}
                <div className="row-l2r-1 flex w-max will-change-transform">
                    <RowItems images={row1Images} />
                    <RowItems images={row1Images} /> {/* Duplicated for seamless loop */}
                </div>

                {/* Row 2: Right to Left */}
                <div className="row-r2l flex w-max will-change-transform">
                    <RowItems images={row2Images} />
                    <RowItems images={row2Images} />
                </div>

                {/* Row 3: Left to Right */}
                <div className="row-l2r-2 flex w-max will-change-transform">
                    <RowItems images={row3Images} />
                    <RowItems images={row3Images} />
                </div>

            </div>

            {/* Vignette/Shadow effect on the edges to fade out the marquee seamlessly */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent" />
        </section>
    );
};
