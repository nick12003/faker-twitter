import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import { zhCN, en } from 'date-fns/locale';
import { useRouter } from 'next/router';
import { BiCalendar } from 'react-icons/bi';

import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModal from '@/hooks/useEditModal';
import useFollow from '@/hooks/useFollow';

import Button from '../Button';

const UserBio = ({ fetchedUser }) => {
  const { t } = useTranslation(['common']);
  const { locale, query } = useRouter();
  const { data: currentUser } = useCurrentUser();

  const isNotFound = fetchedUser?.notFound;

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(fetchedUser?.id);

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
    <>
      <div className="border-b-[1px] border-color pb-4">
        <div className="flex justify-end p-2 min-h-[56px]">
          {currentUser?.id === fetchedUser?.id ? (
            <Button secondary label={t('profile.edit')} onClick={editModal.onOpen} />
          ) : (
            <>
              {!isNotFound && (
                <Button
                  onClick={toggleFollow}
                  label={isFollowing ? t('unFollowBtn') : t('followBtn')}
                  secondary={!isFollowing}
                  outline={isFollowing}
                />
              )}
            </>
          )}
        </div>
        <div className="mt-8 px-4">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">{fetchedUser?.name ?? `@${query?.userId}`}</p>
            {!isNotFound && <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>}
          </div>
          {!isNotFound && (
            <>
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
            </>
          )}
        </div>
      </div>
      {isNotFound && (
        <div className="flex items-center justify-center">
          <dir className="py-10 px-5 my-8 mx-auto">
            <div className="text-4xl">{t('profile.notFound')}</div>
            <div className="mt-2 text-neutral-500">{t('profile.searchOther')}</div>
          </dir>
        </div>
      )}
    </>
  );
};

export default UserBio;
