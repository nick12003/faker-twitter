import { useCallback, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Formik, FastField } from 'formik';
import * as yup from 'yup';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import Input from '../Input';
import Modal from '../Modal';

const validSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  username: yup.string().required(),
  name: yup.string().required(),
});

const initialValues = {
  email: '',
  password: '',
  username: '',
  name: '',
};

const RegisterModal = () => {
  const { t } = useTranslation(['common']);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const formikRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async ({ email, password, username, name }) => {
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
        console.error(error);
        toast.error(t('message.error'));
      } finally {
        setIsLoading(false);
      }
    },
    [registerModal]
  );

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

  const handleSubmit = () => {
    formikRef?.current?.submitForm();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validSchema}
        innerRef={formikRef}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => {
          return (
            <>
              <FastField name="email">
                {({ field, meta: { touched, error } }) => (
                  <Input
                    label={t('modal.emailPlaceholder')}
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                    error={!!touched && !!error}
                    value={field.value}
                    disabled={isLoading}
                  />
                )}
              </FastField>
              <FastField name="name">
                {({ field, meta: { touched, error } }) => (
                  <Input
                    label={t('modal.namePlaceholder')}
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                    error={!!touched && !!error}
                    value={field.value}
                    disabled={isLoading}
                  />
                )}
              </FastField>
              <FastField name="username">
                {({ field, meta: { touched, error } }) => (
                  <Input
                    label={t('modal.usernamePlaceholder')}
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                    error={!!touched && !!error}
                    value={field.value}
                    disabled={isLoading}
                  />
                )}
              </FastField>
              <FastField name="password">
                {({ field, meta: { touched, error } }) => (
                  <Input
                    label={t('modal.passwordPlaceholder')}
                    type="password"
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                    error={!!touched && !!error}
                    value={field.value}
                    disabled={isLoading}
                  />
                )}
              </FastField>
            </>
          );
        }}
      </Formik>
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
      onSubmit={handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
