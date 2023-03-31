import { useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';
import usePost from './usePost';
import usePosts from './usePosts';

const useLike = ({ postId, userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const { status } = useSession();

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (status !== 'authenticated') {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete('/api/like', { data: { postId } });
      } else {
        request = () => axios.post('/api/like', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success(t('message.liked'));
    } catch (error) {
      console.error(error);
      toast.error(t('message.error'));
    }
  }, [status, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost, loginModal]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
