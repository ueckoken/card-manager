import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

// get all cards using prisma
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    // return method not allowed
    res.status(405).json({ error: 'Method not allowed' });
    return
  }
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
      userId: "TEMP",
      name: name,
      userName: "TEMP",
    }
  });
  res.json(newCard);
  await prisma.$disconnect();
  return
}
