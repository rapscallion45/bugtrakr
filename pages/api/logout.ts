import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* Remove auth and demo token cookies */
  res.setHeader('Set-Cookie', [
    cookie.serialize('bugTrakrAuth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      expires: new Date(0),
      sameSite: 'strict',
    }),
    cookie.serialize('bugTrakrDemo', String(''), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      maxAge: 60 * 60 * 24 * 2 /* 48 hours for demo token */,
      sameSite: 'strict',
    }),
  ]);

  /* Cookies removed ok */
  return res.status(200).json({ message: 'Token cookies removed ok' });
}
