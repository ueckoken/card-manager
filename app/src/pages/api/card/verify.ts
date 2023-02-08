import { prisma } from '@/lib/prisma';

// get all cards using prisma
export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    // return method not allowed
    res.status(405).json({ error: 'Method not allowed' });
    return
  }
  // allow if api-key is valid
  if (req.headers['x-api-key'] !== "a") {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const idm = req.body.idm;
  if (!idm) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }
  const card = await prisma.card.findUnique({
    where: {
      idm: idm
    }
  });

  // return error if card expired
  if (!card) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  if (card?.expiredAt! < new Date() && card?.expiredAt! !== null) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  res.status(200).json({
    verified: true
  })
  await prisma.$disconnect();
  return
}