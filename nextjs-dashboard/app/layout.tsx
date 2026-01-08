import '@/app/global.css';
import SessionWrapper from '../components/SessionWrapper';
import AuthGuard from '../components/AuthGuard';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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