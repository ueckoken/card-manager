import { PrismaClient, Prisma } from '@prisma/client'
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient()
// get all cards using prisma
export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    // get token from header using nextauth
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const sub = session.user.sub as string;
    const idm = req.body.idm;
    const name = req.body.name;
    if (!idm || !name) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }
    const card = await prisma.card.findUnique({
      where: {
        idm: idm
      }
    });
    if (card) {
      res.status(409).json({ error: 'Card already registered' });
      return;
    }
    const newCard = await prisma.card.create({
      data: {
        idm: idm,
        userId: sub,
        name: name,
        userName: session.user.name as string,
      }
    });
    res.json(newCard);
    return
  }
  // return method not allowed
  res.status(405).json({ error: 'Method not allowed' });
  return
}