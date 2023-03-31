import Image from 'next/image';

import Avatar from '../Avatar';

const UserHero = ({ fetchedUser }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImageInfo?.link && (
          <Image
            src={fetchedUser.coverImageInfo.link}
            fill
            alt="Cover Image"
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={fetchedUser?.id} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
