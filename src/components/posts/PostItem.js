import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';
import { zhCN, enUS } from 'date-fns/locale';

import useLoginModal from '@/hooks/useLoginModal';
import useLike from '@/hooks/useLike';

import Avatar from '../Avatar';

const PostItem = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { status } = useSession();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (event) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    async (event) => {
      event.stopPropagation();

      if (status !== 'authenticated') {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, status, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    const isEn = router.locale === 'en';

    return formatDistanceToNowStrict(new Date(data.createdAt), {
      locale: isEn ? enUS : zhCN,
    });
  }, [data.createdAt, router.locale]);

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-color p-5 cursor-pointer item-hover transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p onClick={goToUser} className="font-semibold cursor-pointer hover:underline">
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              {hasLiked && <AiFillHeart color="red" size={20} />}
              {!hasLiked && <AiOutlineHeart size={20} />}
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
