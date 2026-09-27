
import { GallerySection } from '@/sections/Gallery';
import Hero from '@/sections/Hero';
import React from 'react';

const page = () => {
  return (
    <div className='bg-foreground selection:text-foreground selection:bg-background min-h-dvh text-background font-outfit'>
      <section className='relative z-10 min-h-screen bg-foreground'>
        <Hero />
      </section>
      {/* gallery viewing section  */}
      <div className='min-h-[150vh]' />
      <GallerySection />
      <div
        className="pointer-events-none z-10 relative h-[60vh] w-full"
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent, color-mix(in srgb, var(--foreground) 20%, transparent), color-mix(in srgb, var(--foreground) 40%, transparent), color-mix(in srgb, var(--foreground) 60%, transparent), color-mix(in srgb, var(--foreground) 80%, transparent), var(--foreground))'
        }}
      />
      <section className='relative z-10 min-h-screen bg-foreground'>

      </section>
    </div>
  );
};

export default page;
