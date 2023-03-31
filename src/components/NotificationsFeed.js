import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useTheme } from 'next-themes';
import { BsTwitter } from 'react-icons/bs';

import useNotifications from '@/hooks/useNotifications';
import useCurrentUser from '@/hooks/useCurrentUser';

import getPrimaryColor from '@/libs/getPrimaryColor';

import Spinner from './Spinner';

const NotificationsFeed = () => {
  const { t } = useTranslation(['common']);
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [], isLoading } = useNotifications(currentUser?.id);

  const { theme, resolvedTheme } = useTheme();

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">{t('notifications.empty')}</div>
    );
  }

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {fetchedNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-color"
            >
              <BsTwitter color={isDark ? 'white' : getPrimaryColor()} size={32} />
              <p>{notification.body}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default NotificationsFeed;
