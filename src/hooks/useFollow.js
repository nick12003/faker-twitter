import { useCallback, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';
import useUser from './useUser';

const useFollow = (userId) => {
  const { t } = useTranslation(['common']);
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/follow', { data: { userId } });
      } else {
        request = () => axios.post('/api/follow', { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success(t('message.followed'));
    } catch (error) {
      toast.error(t('message.error'));
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
