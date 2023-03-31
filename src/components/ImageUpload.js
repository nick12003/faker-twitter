import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const ImageUpload = ({ onChange, label, value, disabled }) => {
  const { t } = useTranslation(['common']);
  const [imgSrc, setImgSrc] = useState(value);

  const handleChange = useCallback(
    (file) => {
      onChange(file);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files) => {
      const file = files[0];
      handleChange(file);
      // 轉為base64預覽
      const reader = new FileReader();
      reader.onload = (event) => {
        setImgSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <div
      {...getRootProps({
        className: 'w-full p-4 text-center border-2 border-dotted rounded-md border-color',
      })}
    >
      <input {...getInputProps()} />
      {imgSrc ? (
        <div className="flex items-center justify-center">
          <Image src={imgSrc} height="100" width="100" alt={t('modal.uploadImgAlt')} />
        </div>
      ) : (
        <p>{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
