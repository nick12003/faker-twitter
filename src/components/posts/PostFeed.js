import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';
import Spinner from '../Spinner';

const PostFeed = ({ userId }) => {
  const { data: posts = [], isLoading } = usePosts(userId);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {posts.map((post) => (
            <PostItem userId={userId} key={post.id} data={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default PostFeed;
