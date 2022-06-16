import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyEmail } from '../../lib/api';

export default async function verify(req: NextApiRequest, res: NextApiResponse) {
  /* simply act as proxy between client and backend */
  const data = await verifyEmail(req?.body ?? {})
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
