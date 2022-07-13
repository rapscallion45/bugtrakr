import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { loginUser } from '../../lib/api';

const { DEMO_LOGIN_USERNAME, DEMO_LOGIN_PASSWORD } = process.env;

export default async function demoLogin(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await loginUser({
      username: DEMO_LOGIN_USERNAME,
      password: DEMO_LOGIN_PASSWORD,
    });
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
      const { id, username } = data;
      return res.status(200).json({
        id,
        username,
      });
    }
    return res.status(401).json({ message: 'Demo login unavailable at this time.' });
  } catch (error) {
    return res.status(501).json({
      message: 'Oops, something went wrong with the request.',
      error,
    });
  }
}
