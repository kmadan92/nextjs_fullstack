import '@/app/global.css';
import SessionWrapper from '../components/SessionWrapper';
import AuthGuard from '../components/AuthGuard';
import { inter } from '@/app/fonts'

export const metadata = {
  // 1. Basic Metadata
  title: {
    template: '%s | Life With Kiaan', // Child pages can just send "About" and it becomes "About | Kiaan Portfolio"
    default: 'Life With Kiaan', // Default for the homepage
  },
  description: 'Collection of Kiaan\'s and his Family\'s Memory',

  // 2. SEO & Bots
  keywords: ['Kiaan', 'Life With Kiaan', 'Kiaan Madan'],
  authors: [{ name: 'Kapil Madan' }],
  creator: 'Kapil Madan',
  publisher: 'Kapil Madan',

  // 3. Social Media (Open Graph)
  metadataBase: new URL("https://lifewithkiaan"),
  openGraph: {
    title: 'Life With Kiaan',
    description: 'Collection of Kiaan\'s and his Family\'s Memory',
    url: 'https://lifewithkiaan.com',
    siteName: 'Life With Kiaan',
    images: [
      {
        url: '/kiaan-memory.png', // Must be in the public folder
        width: 1200,
        height: 630,
        alt: 'Life with kiaan preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // 4. Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Life With Kiaan',
    description: 'Collection of Kiaan\'s and his Family\'s Memory.',
    images: ['/kiaan-memory.png'],
  },

  // 5. Icons (Favicon)
  icons: {
    icon: '/kiaan-memory.png'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body >
        {/* Wrap children so all components can access the session */}
        <SessionWrapper>
          <AuthGuard>
            {children}
          </AuthGuard>
        </SessionWrapper>
      </body>
    </html>
  );
}