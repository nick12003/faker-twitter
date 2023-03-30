import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import PostFeed from '@/components/posts/PostFeed';

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
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      <UserHero userId={userId} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </>
  );
};

export default UserView;
