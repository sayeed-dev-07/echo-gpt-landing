import IntroAnimation from '@/providers/IntroAnimation';
import LenisProvider from '@/providers/LenisProvider';
import React from 'react';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <LenisProvider>
            <IntroAnimation />
            {children}
        </LenisProvider>
    );
};

export default ClientLayout;