import '@/app/components/global.css';
import { inter } from './components/fonts';
import SessionWrapper from './components/SessionWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Wrap children so all components can access the session */}
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}