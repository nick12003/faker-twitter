import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import NotificationsFeed from '@/components/NotificationsFeed';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}

const Notifications = () => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Head>
        <title>{t('nav.notifications')}</title>
      </Head>
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
