import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';

import Spinner from './Spinner';
import Avatar from './Avatar';
import Button from './Button';

const Form = ({ placeholder, isComment, postId }) => {
  const { t } = useTranslation(['common']);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: session, status } = useSession();

  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      await axios.post(url, { body });

      toast.success(t('message.tweeted'));
      setBody('');
      mutatePosts();
      mutatePost();
    } catch (error) {
      console.error(error);
      toast.error(t('message.error'));
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-b-[1px] border-color px-5 py-2">
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <>
          {status === 'authenticated' ? (
            <div className="flex flex-row gap-4">
              <div>
                <Avatar userId={session.user.id} />
              </div>
              <div className="w-full">
                <textarea
                  disabled={isLoading}
                  onChange={(event) => setBody(event.target.value)}
                  value={body}
                  className="disabled:opacity-80 peer resize-none mt-3 w-full ring-0 outline-none text-[20px] placeholder-neutral-500"
                  placeholder={placeholder}
                ></textarea>
                <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-color transition" />
                <div className="mt-4 flex flex-row justify-end">
                  <Button
                    type="primary"
                    disabled={isLoading || !body}
                    onClick={onSubmit}
                    label={t('tweetBtn')}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8">
              <h1 className="text-2xl text-center mb-4 font-bold">{t('post.welcome')}</h1>
              <div className="flex flex-row items-center justify-center gap-4">
                <Button label={t('signInBtn')} onClick={loginModal.onOpen} type="primary" />
                <Button label={t('registerBtn')} onClick={registerModal.onOpen} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Form;
