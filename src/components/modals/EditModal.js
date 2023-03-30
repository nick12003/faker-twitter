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

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
    editModal.isOpen,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', { name, username, bio, profileImage, coverImage });
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
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label={t('modal.profileImagePlaceholder')}
      />
      <ImageUpload
        value={coverImage}
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
