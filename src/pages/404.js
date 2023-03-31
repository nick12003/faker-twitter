import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

const NotFound = () => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Head>
        <title>{`404 - ${t('nav.notFound')}`}</title>
      </Head>
    </>
  );
};

export default NotFound;
