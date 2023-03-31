import prisma from '@/libs/prismadb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', error);
    return res.status(400).end();
  }
}
