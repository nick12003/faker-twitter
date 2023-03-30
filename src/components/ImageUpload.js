import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const ImageUpload = ({ onChange, label, value, disabled }) => {
  const { t } = useTranslation(['common']);
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
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
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt={t('modal.uploadImgAlt')} />
        </div>
      ) : (
        <p>{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
