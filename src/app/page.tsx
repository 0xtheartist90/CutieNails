import type { Metadata } from 'next';

import { CutieLandingPage } from '@/components/cutie-landing-page';

export const metadata: Metadata = {
    title: 'Cutie Nails & Spa',
    description: 'Bilingual salon landing page for Cutie Nails & Spa in Chiang Mai.'
};

const Page = () => {
    return <CutieLandingPage />;
};

export default Page;
