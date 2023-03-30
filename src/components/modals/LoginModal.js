import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import Input from '../Input';
import Modal from '../Modal';

const LoginModal = () => {
  const { t } = useTranslation(['common']);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [LoginModal.isOpen]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn('credentials', {
        email,
        password,
      });

      toast.success(t('message.loggedIn'));

      loginModal.onClose();
    } catch (error) {
      toast.error(t('message.error'));
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal]);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder={t('modal.emailPlaceholder')}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder={t('modal.passwordPlaceholder')}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        {t('modal.firstUsing')}{' '}
        <span onClick={onToggle} className="cursor-pointer hover:underline text-primary">
          {t('modal.createAccount')}
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={t('modal.loginTitle')}
      actionLabel={t('signInBtn')}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
