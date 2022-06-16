import type { NextApiRequest, NextApiResponse } from 'next';
import { loginUser } from '../../lib/api';

const { DEMO_LOGIN_USERNAME, DEMO_LOGIN_PASSWORD } = process.env;

export default async function demoLogin(req: NextApiRequest, res: NextApiResponse) {
  const data = await loginUser({
    username: DEMO_LOGIN_USERNAME,
    password: DEMO_LOGIN_PASSWORD,
  });

  /* Only send back message with successful or not - dont send JWT to client! */
  if (data?.login?.authToken && data?.login?.refreshToken && data?.login?.user) {
    const { id, email, firstName, lastName } = data.login.user;
    res.status(200).json({
      id,
      email,
      firstName,
      lastName,
    });
  } else {
    res.status(401).json({ message: 'Demo login unavailable.' });
  }
}
