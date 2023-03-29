import { appWithTranslation } from 'next-i18next';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/Layout';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import EditModal from '@/components/modals/EditModal';
import nextI18nConfig from '../../next-i18next.config';
import '@/styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <EditModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default appWithTranslation(App, nextI18nConfig);
