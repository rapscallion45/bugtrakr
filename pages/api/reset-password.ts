import type { NextApiRequest, NextApiResponse } from 'next';
import { resetPassword } from '../../lib/api';

export default async function passwordReset(req: NextApiRequest, res: NextApiResponse) {
  /* simply act as proxy between client and backend */
  const data = await resetPassword(req?.body ?? {})
    .then((response) => response.text())
    .then((text) => JSON.parse(text));

  /* send back server response */
  if (!data.data) {
    res.status(data.code).json({ message: data.message });
  } else {
    res.status(400).json({
      message: data.message,
    });
  }
}
