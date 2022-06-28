import type { NextApiRequest, NextApiResponse } from 'next';
import { loginUser } from '../../lib/api';

const { DEMO_LOGIN_USERNAME, DEMO_LOGIN_PASSWORD } = process.env;

export default async function demoLogin(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await loginUser({
      username: DEMO_LOGIN_USERNAME,
      password: DEMO_LOGIN_PASSWORD,
    });
    const data = await response.json();

    /* Only send back message with successful or not - don't send JWT to client! */
    if (response.status === 201) {
      const { id, username } = data;
      return res.status(200).json({
        id,
        username,
      });
    }
    return res.status(401).json({ message: 'Demo login unavailable.' });
  } catch (error) {
    return res.status(501).json({
      message: 'Oops, something went wrong with the request.',
      error,
    });
  }
}
