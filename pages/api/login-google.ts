import type { NextApiRequest, NextApiResponse } from 'next';

export default async function loginGoogle(req: NextApiRequest, res: NextApiResponse) {
  res.status(401).json({ message: 'Google signin is currently unavailable.' });
}