import { Metadata } from 'next'
import './styles/globals.css'
import Header from "./_components/layout/header";
import Footer from "./_components/layout/footer";
import { getServerAuthSession } from "@/utils/auth";
import Providers from "@/components/Providers";
import FooterWrapper from './FooterWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://ingilizcem.net'),
  title: {
    template: '%s | WordMaster',
    default: 'WordMaster - İngilizce Kelime Öğrenme Platformu | English Vocabulary Learning Platform',
  },
  description: 'İngilizce kelime öğrenmek için bilimsel teknikler kullanan akıllı platform. Spaced repetition sistemi ile kalıcı öğrenme. | Smart English vocabulary learning platform using scientific techniques. Permanent learning with spaced repetition system.',
  keywords: [
    // Türkçe Anahtar Kelimeler
    'ingilizce kelime ezberleme',
    'ingilizce kelime öğrenme',
    'ingilizce kelime çalışma',
    'ingilizce kelime kartları',
    'ingilizce kelime tekrar sistemi',
    'online ingilizce kelime öğrenme',
    'ücretsiz ingilizce kelime öğrenme',
    'spaced repetition türkçe',
    // English Keywords
    'english vocabulary learning',
    'learn english words',
    'english vocabulary app',
    'english word memorization',
    'spaced repetition english',
    'vocabulary flashcards',
    'free vocabulary learning',
    'english learning platform'
  ],
  authors: [{ name: 'WordMaster Team' }],
  creator: 'WordMaster',
  publisher: 'WordMaster',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ingilizcem.net',
    languages: {
      'tr-TR': 'https://ingilizcem.net/tr',
      'en-US': 'https://ingilizcem.net/en',
    },
  },
  openGraph: {
    title: 'WordMaster - İngilizce Kelime Öğrenme Platformu',
    description: 'Bilimsel tekniklerle İngilizce kelime öğrenin. Spaced repetition sistemi ile kalıcı öğrenme.',
    url: 'https://ingilizcem.net',
    siteName: 'WordMaster',
    images: [
      {
        url: 'https://ingilizcem.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WordMaster Platform Preview',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordMaster - English Vocabulary Learning Platform',
    description: 'Learn English vocabulary with scientific techniques. Permanent learning with spaced repetition system.',
    images: ['https://ingilizcem.net/twitter-image.jpg'],
  },
  other: {
    'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_CODE',
    'yandex-verification': 'YOUR_YANDEX_VERIFICATION_CODE',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  console.log("session", session);
  return (
    <html lang="tr">
      <head>
        <link rel="alternate" hrefLang="tr" href="https://ingilizcem.net/tr" />
        <link rel="alternate" hrefLang="en" href="https://ingilizcem.net/en" />
        <link rel="canonical" href="https://ingilizcem.net" />
        
        {/* Structured Data - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalApplication",
              "name": "WordMaster",
              "description": "İngilizce kelime öğrenme platformu | English vocabulary learning platform",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Header session={session} />
          <main className="flex-grow">
            {children}
          </main>
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  );
}
