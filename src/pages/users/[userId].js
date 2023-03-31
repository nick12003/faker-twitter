import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import PostFeed from '@/components/posts/PostFeed';

import useUser from '@/hooks/useUser';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

const UserView = () => {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const { userId } = router.query;
  const { data: fetchedUser } = useUser(userId);

  return (
    <>
      <Head>
        <title>{fetchedUser?.name ?? t('nav.profile')}</title>
      </Head>
      <UserHero fetchedUser={fetchedUser ?? {}} />
      <UserBio fetchedUser={fetchedUser ?? {}} />
      <PostFeed userId={userId} />
    </>
  );
};

export default UserView;
