import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import Input from '../Input';
import Modal from '../Modal';

const RegisterModal = () => {
  const { t } = useTranslation(['common']);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setUsername('');
    setName('');
  }, [registerModal.isOpen]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      });

      setIsLoading(false);

      toast.success(t('message.created'));

      signIn('credentials', {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      toast.error(t('message.error'));
    } finally {
      setIsLoading(false);
    }
  }, [email, password]);

  const onToggle = useCallback(
    () => {
      if (isLoading) {
        return;
      }

      registerModal.onClose();
      loginModal.onOpen();
    },
    [registerModal, isLoading],
    loginModal
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder={t('modal.emailPlaceholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder={t('modal.namePlaceholder')}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder={t('modal.usernamePlaceholder')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder={t('modal.passwordPlaceholder')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        {t('modal.alreadyAccount')}{' '}
        <span onClick={onToggle} className="cursor-pointer hover:underline text-primary">
          {t('modal.signIn')}
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={t('modal.registerTitle')}
      actionLabel={t('registerBtn')}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
