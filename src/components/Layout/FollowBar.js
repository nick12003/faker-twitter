import { useTranslation } from 'next-i18next';

import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';
import Spinner from '../Spinner';

const FollowBar = () => {
  const { t } = useTranslation(['common']);
  const { data: users = [], isLoading } = useUsers();

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className=" bg-[#F7F9F9] dark:bg-[#16181C] rounded-xl p-4">
        <h2 className="text-xl font-semibold">{t('follow.who2Follow')}</h2>
        <div className="flex flex-col gap-6 mt-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {users.map((user) => (
                <div key={user.id} className="flex flex-row gap-4">
                  <Avatar userId={user.id} />
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-neutral-400 text-sm">@{user.username}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
