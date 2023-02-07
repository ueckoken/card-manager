import { PrismaClient, Prisma } from '@prisma/client'
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient()
// get all cards using prisma
export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
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

    if (cards.length == 0) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(cards);
  }
  // return method not allowed
  res.status(405).json({ error: 'Method not allowed' });
}