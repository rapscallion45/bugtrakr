import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { loginUser } from '../../lib/api';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req?.body ?? {};
  try {
    const data = await loginUser({ username, password });

    /**
     * Set secure false when running on local host (http), and set
     * httpOnly cookie to prevent clientside javascript from accessing it
     */
    res.setHeader('Set-Cookie', [
      cookie.serialize('fplfrogAuth', String(data?.login?.authToken ?? ''), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        maxAge: 60 * 60 * 24 * 2 /* 48 hours for auth token */,
        sameSite: 'strict',
      }),
      cookie.serialize('fplfrogRefresh', String(data?.login?.refreshToken ?? ''), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 /* 1 week for refresh token */,
        sameSite: 'strict',
      }),
    ]);

    /* Only send back message with successful or not - dont send JWT to client! */
    if (data?.login?.authToken && data?.login?.refreshToken && data?.login?.user) {
      const { id, email, firstName, lastName } = data.login.user;
      return res.status(200).json({
        id,
        email,
        firstName,
        lastName,
      });
    } 
      return res.status(401).json({ message: 'Login failed, please check your credentials' });
    
  } catch (error) {
    return res.status(501).json({
      message: 'Oops, something went wrong with the request.',
      error,
    });
  }
}
