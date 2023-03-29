import { getSession } from 'next-auth/react';

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
