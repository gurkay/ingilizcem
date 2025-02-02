// Yeni bir client component oluşturalım
'use client';

import { usePathname } from 'next/navigation';
import Footer from './_components/layout/footer';

function FooterWrapper() {
    const pathname = usePathname();

    // Footer'ın görünmemesi gereken sayfalar
    const hideFooterPaths = [
        '/dashboard/learning/clozeTest',
        '/dashboard/learning/quiz',
        '/dashboard/learning/wordSynonyms',
        '/dashboard/learning/turkishMean',
        '/dashboard/learning/englishMean',
        '/dashboard/story',
        '/dashboard/story/[slug]',
        '/dashboard/story/quiz',
        '/dashboard/story/translate',
        // diğer sayfalar eklenebilir
    ];

    if (hideFooterPaths.includes(pathname)) {
        return null;
    }

    return <Footer />;
}

export default FooterWrapper;