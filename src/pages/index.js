import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Form from '@/components/Form';
import PostFeed from '@/components/posts/PostFeed';

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function Home() {
  return (
    <>
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
