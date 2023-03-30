import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import { zhCN, en } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { BiCalendar } from 'react-icons/bi';

import useCurrentUser from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';
import useEditModal from '@/hooks/useEditModal';
import useFollow from '@/hooks/useFollow';

import Button from '../Button';

const UserBio = ({ userId }) => {
  const { t } = useTranslation(['common']);
  const { locale } = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    const isEn = locale === 'en';

    return format(new Date(fetchedUser.createdAt), isEn ? 'MMMM yyyy' : 'yyyy年MM月', {
      locale: isEn ? en : zhCN,
    });
  }, [fetchedUser?.createdAt, locale]);

  return (
    <div className="border-b-[1px] border-color pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label={t('profile.edit')} onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? t('unFollowBtn') : t('followBtn')}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">{fetchedUser?.name}</p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p>{fetchedUser?.bio}</p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>
              {t('profile.joined')} {createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p>{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">{t('profile.following')}</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p>{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">{t('profile.followers')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
