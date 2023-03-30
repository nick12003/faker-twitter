import prisma from '@/libs/prismadb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        profileImage: false,
        id: true,
        name: true,
        username: true,
        bio: true,
        email: true,
        emailVerified: true,
        image: false,
        coverImage: false,
        hashedPassword: true,
        createdAt: true,
        updatedAt: true,
        followingIds: true,
        hasNotification: true,
        posts: true,
        comments: true,
        notifications: true,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return res.status(200).json({ ...existingUser, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
