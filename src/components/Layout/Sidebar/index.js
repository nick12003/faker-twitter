import { signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = () => {
  const { t } = useTranslation(['common']);
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BsHouseFill,
      label: t('nav.home'),
      href: '/',
    },
    {
      icon: BsBellFill,
      label: t('nav.notifications'),
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      icon: FaUser,
      label: t('nav.profile'),
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          {currentUser && (
            <SidebarItem onClick={() => signOut()} icon={BiLogOut} label={t('nav.logout')} />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
