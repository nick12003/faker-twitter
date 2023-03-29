import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import useUser from '@/hooks/useUser';

import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <UserHero userId={userId} />
      <UserBio userId={userId} />
    </>
  );
};

export default UserView;
