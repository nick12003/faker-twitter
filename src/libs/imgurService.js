/* these methods only run in nodejs */

import _axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const axios = _axios.create({
  baseURL: process.env.NEXT_IMGUR_API_URL ?? 'https://api.imgur.com/3/image',
  timeout: 20000,
  headers: {
    Authorization: `Client-ID ${process.env.NEXT_IMGUR_CLIENT_ID}`,
  },
});

export const uploadImage = async (file) => {
  if (!file) return undefined;

  const formData = new FormData();
  formData.append('image', fs.createReadStream(file.filepath), file.originalFilename);

  formData.append('album', process.env.NEXT_IMGUR_ALBUM_ID);

  try {
    const result = await axios.post('/', formData, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_IMGUR_ACCESS_TOKE}`,
        ...formData.getHeaders(),
      },
    });

    const { data, success, status } = result.data;

    if (!success || status >= 300) {
      throw new Error(result.data);
    }

    return {
      id: data.id,
      deletehash: data.deletehash,
      link: data.link,
      type: data.type,
    };
  } catch (error) {
    console.log(error);
    throw new Error('UpLoad image error');
  }
};

export const deleteImage = async (imageDeleteHash) => {
  if (!imageDeleteHash) throw new Error('ImageDeleteHash not exist');

  try {
    const result = await axios.delete(`/${imageDeleteHash}`);

    const { success, status } = result.data;

    if (!success || status >= 300) {
      throw new Error(result.data);
    }

    return true;
  } catch (error) {
    console.log(error);
    throw new Error('UpLoad image error');
  }
};
