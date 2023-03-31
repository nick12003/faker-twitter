import { useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { Formik, FastField } from 'formik';
import * as yup from 'yup';

import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';

import Input from '../Input';
import Modal from '../Modal';
import ImageUpload from '../ImageUpload';

const validSchema = yup.object().shape({
  username: yup.string().required(),
  name: yup.string().required(),
});

/**
 * 從資料庫傳來的是url，但要修改時要先將img file upload到雲端圖庫，再將雲端圖庫的url存至資料庫
 */

const initialValues = ({ name, username, bio, profileImageInfo, coverImageInfo }) => ({
  name: name ?? '',
  username: username ?? '',
  bio: bio ?? '',
  profileImage: '',
  profileImageInfo: profileImageInfo ?? {},
  coverImage: '',
  coverImageInfo: coverImageInfo ?? {},
});

const EditModal = () => {
  const { t } = useTranslation(['common']);
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const formikRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async ({ name, username, bio, profileImage, coverImage, profileImageInfo, coverImageInfo }) => {
      try {
        setIsLoading(true);

        // 如果值為null或undefined會被轉換成字串，所以最好是所有的default都為空字串
        var formData = new FormData();
        formData.append('name', name);
        formData.append('username', username);
        formData.append('bio', bio);
        formData.append('profileImage', profileImage);
        formData.append('profileDeleteHash', profileImageInfo?.deletehash ?? '');
        formData.append('coverImage', coverImage);
        formData.append('coverDeleteHash', coverImageInfo?.deletehash ?? '');

        await axios.patch('/api/edit', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        mutateFetchedUser();
        mutateCurrentUser();
        toast.success(t('message.updated'));

        editModal.onClose();
      } catch (error) {
        console.error(error);
        toast.error(t('message.error'));
      } finally {
        setIsLoading(false);
      }
    },
    [editModal, mutateFetchedUser, mutateCurrentUser, t]
  );

  const handleSubmit = () => {
    formikRef?.current?.submitForm();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Formik
        enableReinitialize
        initialValues={initialValues(currentUser ?? {})}
        validationSchema={validSchema}
        innerRef={formikRef}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => {
          return (
            <>
              <ImageUpload
                value={values.profileImageInfo?.link}
                disabled={isLoading}
                onChange={(image) => setFieldValue('profileImage', image)}
                label={t('modal.profileImagePlaceholder')}
              />
              <ImageUpload
                value={values.coverImageInfo?.link}
                disabled={isLoading}
                onChange={(image) => setFieldValue('coverImage', image)}
                label={t('modal.coverImagePlaceholder')}
              />
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
              <FastField name="bio">
                {({ field, meta: { touched, error } }) => (
                  <Input
                    label={t('modal.bioPlaceholder')}
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

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title={t('modal.editTitle')}
      actionLabel={t('saveBtn')}
      onClose={editModal.onClose}
      onSubmit={handleSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
