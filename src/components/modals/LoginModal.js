import { useCallback, useState, useRef } from 'react';
import { useTranslation } from 'next-i18next';
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
});

const initialValues = {
  email: '',
  password: '',
};

const LoginModal = () => {
  const { t } = useTranslation(['common']);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const formikRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async ({ email, password }) => {
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
    },
    [loginModal]
  );

  const handleSubmit = () => {
    formikRef?.current?.submitForm();
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validSchema}
        innerRef={formikRef}
        onSubmit={onSubmit}
      >
        {({ submitForm, setFieldValue }) => {
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
              <FastField name="password">
                {({ field, meta: { touched, error } }) => (
                  <Input
                    label={t('modal.passwordPlaceholder')}
                    type="password"
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                    error={!!touched && !!error}
                    value={field.value}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        submitForm();
                      }
                    }}
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
      onSubmit={handleSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
