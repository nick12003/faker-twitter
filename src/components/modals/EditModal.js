import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';

import Input from '../Input';
import Modal from '../Modal';
import ImageUpload from '../ImageUpload';

const EditModal = () => {
  const { t } = useTranslation(['common']);
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  /**
   * 從資料庫傳來的是url，但要修改時要先將img file upload到雲端圖庫，再將雲端圖庫的url存至資料庫
   */
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setProfileImageUrl(currentUser?.profileImageInfo?.link);
    setProfileImage('');
    setCoverImageUrl(currentUser?.coverImageInfo?.link);
    setCoverImage('');
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImageInfo?.link,
    currentUser?.coverImageInfo?.link,
    editModal.isOpen,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // 如果值為null或undefined會被轉換成字串，所以最好是所有的default都為空字串
      var formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('bio', bio);
      formData.append('profileImage', profileImage);
      formData.append('profileDeleteHash', currentUser?.profileImageInfo?.deletehash ?? '');
      formData.append('coverImage', coverImage);
      formData.append('coverDeleteHash', profileImage?.coverImageInfo?.deletehash ?? '');

      await axios.patch('/api/edit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      mutateFetchedUser();

      toast.success(t('message.updated'));

      editModal.onClose();
    } catch (error) {
      toast.error(t('message.error'));
    } finally {
      setIsLoading(false);
    }
  }, [editModal, name, username, bio, mutateFetchedUser, profileImage, coverImage]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImageUrl}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label={t('modal.profileImagePlaceholder')}
      />
      <ImageUpload
        value={coverImageUrl}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label={t('modal.coverImagePlaceholder')}
      />
      <Input
        placeholder={t('modal.namePlaceholder')}
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder={t('modal.usernamePlaceholder')}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder={t('modal.bioPlaceholder')}
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title={t('modal.editTitle')}
      actionLabel={t('saveBtn')}
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
