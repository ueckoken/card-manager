import { PrismaClient, Prisma } from '@prisma/client'
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient()
export default async function handler(req: any, res: any) {
  if (req.method === 'DELETE') {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    // delete a card using prisma
    const idm = req.body.idm;
    if (!idm) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }
    const sub = session.user.sub;
    let card;
    if (!session.user.groups?.includes('/manager')) {
      card = await prisma.card.deleteMany({
        where: {
          idm: idm,
          userId: sub
        }
      });
    } else {
      card = await prisma.card.deleteMany({
        where: {
          idm: idm,
        }
      });
    }
    res.json(card);
    return;
  }
  // return method not allowed
  res.status(405).json({ error: 'Method not allowed' });
}