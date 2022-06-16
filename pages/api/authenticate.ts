import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { refreshToken } from '../../lib/api';

export default async function authenticate(req: NextApiRequest, res: NextApiResponse) {
  const cookies = cookie.parse(req.headers.cookie);
  const token = cookies?.fplfrogRefresh || '';
  const data = await refreshToken({ token });

  /**
   * Set secure false when running on local host (http), and set
   * httpOnly cookie to prevent clientside javascript from accessing it
   */
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('fplfrogAuth', String(data?.refreshJwtAuthToken?.authToken ?? ''), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      maxAge: 60 * 60 * 24 * 2 /* 48 hours for auth token */,
      sameSite: 'strict',
    })
  );

  /* Only send back message with successful or not - dont send JWT to client! */
  if (data?.refreshJwtAuthToken?.authToken) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Session expired, please login again' });
  }
}
