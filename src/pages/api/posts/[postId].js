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
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!post) {
      return res.status(200).json({ notFound: true });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', error);
    return res.status(400).end();
  }
}
