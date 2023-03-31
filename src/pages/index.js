import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

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
  const { t } = useTranslation(['common']);
  return (
    <>
      <Head>
        <title>{t('nav.home')}</title>
      </Head>
      <Form placeholder={t('post.tweetPlaceholder')} />
      <PostFeed />
    </>
  );
}
