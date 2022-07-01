import type { NextApiRequest, NextApiResponse } from 'next';
import { validatePasswordReset } from '../../lib/api';

export default async function validateResetToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    /* simply act as proxy between client and backend */
    const data = await validatePasswordReset(req?.body ?? {})
      .then((response) => response.text())
      .then((text) => JSON.parse(text));

    /* send back server response */
    if (!data.data) {
      return res.status(data.code).json({ message: data.message });
    } 
      return res.status(400).json({
        message: data.message,
      });
    
  } catch (error) {
    return res.status(501).json({
      message: 'Oops, something went wrong with the request.',
      error,
    });
  }
}
