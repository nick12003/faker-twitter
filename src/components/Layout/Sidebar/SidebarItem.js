import React, { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs';

import useLoginModal from '@/hooks/useLoginModal';

const SidebarItem = ({ label, icon: Icon, href, auth, onClick, alert }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { status } = useSession();

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();

      if (onClick) {
        return onClick();
      }

      if (auth && status !== 'authenticated') {
        loginModal.onOpen();
      } else if (href) {
        router.push(href);
      }
    },
    [router, href, auth, loginModal, onClick, status]
  );

  const Dot = () =>
    alert ? <BsDot className="text-primary absolute -top-4 left-0" size={70} /> : null;

  return (
    <Link href={href ?? '/'} passHref legacyBehavior>
      <a onClick={handleClick} className="flex flex-row items-center group/nav">
        <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 nav-hover lg:hidden">
          <Icon size={28} />
          <Dot />
        </div>
        <div className="relative hidden lg:flex items-row gap-4 p-4 rounded-full nav-hover items-center">
          <Icon size={24} />
          <p className="hidden lg:block text-xl">{label}</p>
          <Dot />
        </div>
      </a>
    </Link>
  );
};

export default SidebarItem;
