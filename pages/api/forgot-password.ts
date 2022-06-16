import type { NextApiRequest, NextApiResponse } from 'next';
import { forgotPassword } from '../../lib/api';

export default async function passwordForgot(req: NextApiRequest, res: NextApiResponse) {
  /* simply act as proxy between client and backend */
  const data = await forgotPassword(req?.body ?? {})
    .then((response) => response.text())
    .then((text) => JSON.parse(text));

  /* send back server response */
  if (!data.data) {
    res.status(data.code).json({ message: data.message });
  } else {
    res.status(404).json({
      message: data.message,
    });
  }
}
