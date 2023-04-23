import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]'

// get all cards using prisma
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    // return method not allowed
    res.status(405).json({ error: 'Method not allowed' });
    return
  }
  // get token from header using nextauth
  const session = await getServerSession(req, res, authOptions);
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

  const userId = req.body.userId;
  const username = req.body.username;
  if (userId || username) {
    // for administor to register a card for other user
    // only allow to manager group
    if (!session.user.groups?.includes('/manager')) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    const newCard = await prisma.card.create({
      data: {
        idm: idm,
        userId: userId,
        name: name,
        userName: username,
      }
    });
    res.json(newCard);
    await prisma.$disconnect();
    return
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
  await prisma.$disconnect();
  return
}
