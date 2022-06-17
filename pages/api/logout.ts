import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { logoutUser } from '../../lib/api';

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  /* call api to clear user caches */
  logoutUser();

  /* Remove auth and refresh token cookies */
  res.setHeader('Set-Cookie', [
    cookie.serialize('fplfrogAuth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      expires: new Date(0),
      sameSite: 'strict',
    }),
    cookie.serialize('fplfrogRefresh', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      expires: new Date(0),
      sameSite: 'strict',
    }),
  ]);

  /* Cookies removed ok */
  return res.status(200).json({ message: 'Token cookies removed ok' });
}
