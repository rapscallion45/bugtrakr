import type { NextApiRequest, NextApiResponse } from 'next';
import { validatePasswordReset } from '../../lib/api';

export default async function validateResetToken(req: NextApiRequest, res: NextApiResponse) {
  /* simply act as proxy between client and backend */
  const data = await validatePasswordReset(req?.body ?? {})
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
