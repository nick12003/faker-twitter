import { appWithTranslation } from 'next-i18next';

import Layout from '@/components/Layout';
import RegisterModal from '@/components/Layout/modals/RegisterModal';
import LoginModal from '@/components/Layout/modals/LoginModal';
import nextI18nConfig from '../../next-i18next.config';
import '@/styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default appWithTranslation(App, nextI18nConfig);
