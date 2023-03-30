import { useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { FaFeather } from 'react-icons/fa';
import { useRouter } from 'next/router';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

const SidebarTweetButton = () => {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push('/');
  }, [router]);

  return (
    <button className="w-full group/tweet" onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-primary group-hover/tweet:hover:bg-primary/70 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-primary group-hover/tweet:hover:bg-primary/70 cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          {t('tweetBtn')}
        </p>
      </div>
    </button>
  );
};

export default SidebarTweetButton;
