import formidable from 'formidable';

import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';

import { uploadImage, deleteImage } from '@/libs/imgurService';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);

    const form = formidable({ multiples: true });

    const formData = new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          reject('error');
        }
        resolve({ fields, files });
      });
    });

    const {
      fields: { name, username, bio, profileDeleteHash, coverDeleteHash },
      files: { profileImage, coverImage },
    } = await formData;

    if (!name || !username) {
      throw new Error('Missing fields');
    }

    const profileImageInfo = await uploadImage(profileImage);
    if (profileImageInfo && profileDeleteHash) {
      await deleteImage(profileDeleteHash);
    }

    const coverImageInfo = await uploadImage(coverImage);
    if (coverImageInfo && coverDeleteHash) {
      await deleteImage(coverDeleteHash);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        ...{ profileImageInfo, coverImageInfo },
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', error);
    return res.status(400).end();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
