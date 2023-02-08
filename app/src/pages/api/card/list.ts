import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

// get all cards using prisma
export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    // return method not allowed
    res.status(405).json({ error: 'Method not allowed' });
    return
  }
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const sub = session.user.sub;
  const cards = await prisma.card.findMany({
    where: {
      userId: sub
    }
  });
  res.json(cards);
  await prisma.$disconnect();
  return
}