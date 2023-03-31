import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { BiArrowBack } from 'react-icons/bi';

import useUser from '@/hooks/useUser';

import LanguageSwitch from '../LanguageSwitch';
import ThemeSwitch from '../ThemeSwitch';

const labelMap = [
  {
    path: '/',
    showBackArrow: false,
    label: 'nav.home',
  },
  {
    path: '/notifications',
    showBackArrow: true,
    label: 'nav.notifications',
  },
  {
    path: '/users/[userId]',
    showBackArrow: true,
  },
  {
    path: '/posts/[postId]',
    showBackArrow: true,
    label: 'nav.tweet',
  },
  {
    path: '/404',
    showBackArrow: true,
    label: 'nav.notFound',
  },
];

const Header = () => {
  const { t } = useTranslation(['common']);
  const router = useRouter();

  const { userId } = router.query;

  const { data: fetchedUser } = useUser(userId);

  const labelInfo = labelMap.find((info) => info.path === router.pathname);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-color backdrop-blur p-5 sticky top-0 z-10">
      <div className="flex flex-row items-center justify-between gap-2">
        {labelInfo?.showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-xl font-semibold">
          {labelInfo?.label ? t(labelInfo.label) : fetchedUser?.name ?? t('nav.profile')}
        </h1>
        <div className="ml-auto">
          <LanguageSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Header;
