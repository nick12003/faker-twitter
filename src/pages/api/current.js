import serverAuth from '@/libs/serverAuth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', error);
    return res.status(400).end();
  }
}
