import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import MswInitializer from './MswInitializer';
import GlobalProvider from './GlobalProvider';
import GlobalPortal from './GlobalPortal';

const notoSansKR = Noto_Sans_KR({
  weight: ['300', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | FUNCH',
    default: 'FUNCH',
  },
  description: '뻔한 일상에 웃음 한 방 FUNCH!',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true} className={`${notoSansKR.className} antialiased`}>
        <Layout>
          <MswInitializer>
            <GlobalPortal>
              <GlobalProvider>{children}</GlobalProvider>
            </GlobalPortal>
          </MswInitializer>
        </Layout>
      </body>
    </html>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="pt-header min-w-layout relative min-h-screen overflow-clip">{children}</div>;
};

export default RootLayout;
