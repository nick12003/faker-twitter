import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { appWithTranslation } from 'next-i18next';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import NProgress from 'nprogress';

import Layout from '@/components/Layout';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import EditModal from '@/components/modals/EditModal';
import nextI18nConfig from '../../next-i18next.config';
import '@/styles/globals.css';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <EditModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(App, nextI18nConfig);
