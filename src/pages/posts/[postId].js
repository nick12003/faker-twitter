import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ClipLoader } from 'react-spinners';
import Head from 'next/head';

import usePost from '@/hooks/usePost';

import Form from '@/components/Form';
import PostItem from '@/components/posts/PostItem';
import CommentFeed from '@/components/posts/CommentFeed';

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

const PostView = () => {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId);

  const isNotFound = fetchedPost?.notFound;

  return (
    <>
      <Head>
        <title>{t('nav.tweet')}</title>
      </Head>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : (
        <>
          {isNotFound ? (
            <div className="flex items-center justify-center">
              <dir className="py-10 px-5 my-8 mx-auto">
                <div className="text-4xl">{t('post.notFound')}</div>
                <div className="mt-2 text-neutral-500">{t('post.searchOther')}</div>
              </dir>
            </div>
          ) : (
            <>
              <PostItem data={fetchedPost} />
              <Form postId={postId} isComment placeholder={t('post.replyPlaceholder')} />
              <CommentFeed comments={fetchedPost?.comments} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default PostView;
