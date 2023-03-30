import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { ClipLoader } from 'react-spinners';

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

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <PostItem data={fetchedPost} />
      <Form postId={postId} isComment placeholder={t('post.replyPlaceholder')} />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
