import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { loginUser } from '../../lib/api';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req?.body ?? {};
  try {
    const response = await loginUser({ username, password });
    const data = await response.json();

    /**
     * Set secure false when running on local host (http), and set
     * httpOnly cookie to prevent clientside javascript from accessing it
     */
    res.setHeader('Set-Cookie', [
      cookie.serialize('bugTrakrAuth', String(data?.token ?? ''), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        maxAge: 60 * 60 * 24 * 2 /* 48 hours for auth token */,
        sameSite: 'strict',
      }),
    ]);

    /* Only send back message with successful or not - don't send JWT to client! */
    if (response.status === 201) {
      return res.status(200).json({
        id: data.id,
        username: data.username,
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
