import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import usePost from '@/hooks/usePost';

import Form from '@/components/Form';
import PostItem from '@/components/posts/PostItem';
import CommentFeed from '@/components/posts/CommentFeed';

const PostView = () => {
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
      <Form postId={postId} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
