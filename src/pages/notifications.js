import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
  return (
    <>
      <NotificationsFeed />
    </>
  );
};

export default Notifications;
