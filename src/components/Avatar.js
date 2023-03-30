import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import useUser from '@/hooks/useUser';

const Avatar = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();

  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event) => {
      event.stopPropagation();

      router.push(`/users/${userId}`);
    },
    [router, userId]
  );

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-color' : ''}
        ${isLarge ? 'h-32 w-32' : 'h-12 w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  );
};

export default Avatar;
