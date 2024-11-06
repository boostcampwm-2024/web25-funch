import type { Metadata } from 'next';
import { type PropsWithChildren } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import MswInitializer from './MswInitializer';
import Header from './components/layout/Header';
import GlobalProvider from './GlobalProvider';
import Cabinet from '@components/cabinet/Cabinet';

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
      <body className={`${notoSansKR.className} antialiased`}>
        <Layout>
          <MswInitializer>
            <GlobalProvider>
              <Header />
              <Cabinet />
              {/* {!wideView && <Cabinet />} */}
              <Main>{children}</Main>
            </GlobalProvider>
          </MswInitializer>
        </Layout>
      </body>
    </html>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="pt-header min-w-layout relative min-h-screen overflow-clip">{children}</div>;
};

const Main = ({ children }: PropsWithChildren) => {
  return <main className="funch-desktop:pl-60 w-full pl-20">{children}</main>;
};

export default RootLayout;
