import '@/styles/globals.scss';
import { Inter, Roboto, Noto_Sans_KR } from 'next/font/google';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${notoSansKr.style.fontFamily}
              ${roboto.style.fontFamily};
          }
        `}
      </style>
      <Layout>
        {/* <CalendarHome/> */}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
