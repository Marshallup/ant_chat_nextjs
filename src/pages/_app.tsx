import type { AppProps } from 'next/app';
import GlobalStyle from '@/styles/GlobalStyle';
import MainLayout from '@/layouts/MainLayout';
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  )
}

export default MyApp
