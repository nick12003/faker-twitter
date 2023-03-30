import prisma from '@/libs/prismadb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
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
        },
        comments: {
          include: {
            user: {
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
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
