import { getSession } from 'next-auth/react';

import prisma from '@/libs/prismadb';

const serverAuth = async (req) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return {};
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // if (!currentUser) {
  //   throw new Error('Not signed in');
  // }

  return { currentUser };
};

export default serverAuth;
