import type { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '../../lib/api';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  /* simply act as proxy between client and backend */
  const user = req?.body ?? {};

  try {
    const data = await registerUser(user)
      .then((response) => response.text())
      .then((text) => JSON.parse(text));

    /* send back server response */
    if (data) {
      return res.status(data.code).json({ message: data.message });
    } 
      return res.status(400).json({ message: 'Registration failed, please try again' });
    
  } catch (error) {
    return res.status(501).json({
      message: 'Oops, something went wrong with the request.',
      error,
    });
  }
}
