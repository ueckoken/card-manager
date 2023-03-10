import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

// get all cards using prisma
export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return
  }
  // get token from header using nextauth
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  // only allow to manager group
  if (!session.user.groups?.includes('/manager')) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }
  const allCards = await prisma.card.findMany();
  res.json(allCards);
  return
}