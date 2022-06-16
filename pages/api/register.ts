import type { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '../../lib/api';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  /* simply act as proxy between client and backend */
  const user = req?.body ?? {};
  const data = await registerUser(user)
    .then((response) => response.text())
    .then((text) => JSON.parse(text));

  /* send back server response */
  if (data) {
    res.status(data.code).json({ message: data.message });
  } else {
    res.status(400).json({ message: 'Registration failed, please try again' });
  }
}
