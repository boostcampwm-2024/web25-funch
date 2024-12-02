import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import MswInitializer from './MswInitializer';
import GlobalProvider from './GlobalProvider';
import GlobalPortal from './GlobalPortal';
import TanstackInitializer from './TanstackInitializer';

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
  description: '취향대로 골라보는 실시간 스트리밍 서비스, 뻔한 일상에 웃음 한 방 FUNCH!',
  keywords: ['FUNCH', '펀치', '스트리밍', '라이브', '콘텐츠'],
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
            <TanstackInitializer>
              <GlobalPortal>
                <GlobalProvider>{children}</GlobalProvider>
              </GlobalPortal>
            </TanstackInitializer>
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
