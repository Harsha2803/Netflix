import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { query } = req.query;

  try {
    const results = await prisma.movie.findMany({
      where: {
        title: {
          contains: query as string,
          mode: 'insensitive', // Case-insensitive search
        },
      },
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'An error occurred while fetching results' });
  }
}
