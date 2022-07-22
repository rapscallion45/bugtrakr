import type { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* simply act as proxy between client and backend */
  const user = req?.body ?? {};

  try {
    const response = await registerUser(user);
    const data = await response.json();

    /* send back server response */
    if (response.status === 201) {
      return res.status(200).json({ info: data.message, email: data.email });
    }
    return res.status(400).json({ message: data.message });
  } catch (error) {
    return res.status(501).json({
      message: 'Oops, something went wrong with the request.',
      error,
    });
  }
}
