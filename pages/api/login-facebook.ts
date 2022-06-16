import type { NextApiRequest, NextApiResponse } from 'next';

export default async function loginFacebook(req: NextApiRequest, res: NextApiResponse) {
  res.status(401).json({ message: 'Facebook signin is currently unavailable.' });
}
