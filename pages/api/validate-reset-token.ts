import type { NextApiRequest, NextApiResponse } from 'next';
import { validatePasswordReset } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (!body.resetToken) {
    /* no reset token provided, return error */
    return res
      .status(422)
      .json({ message: 'Unproccesable request, please provide the required fields.' });
  }

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call api */
      try {
        const response = await validatePasswordReset(body);
        const data = await response.json();

        /* send back server response */
        if (response.status === 200) {
          return res.status(200).json({ message: data.message });
        }
        return res.status(response.status).json({
          message: data.message,
        });
      } catch (error) {
        return res.status(501).json({
          message: 'Oops, something went wrong with the request.',
          error,
        });
      }
    default:
      /* Return 404 if someone pings the API with an unsupported method */
      return res.status(404).send('Not found');
  }
}
