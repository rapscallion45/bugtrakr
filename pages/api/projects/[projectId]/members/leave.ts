import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { leaveProject } from '../../../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { method, body } = req;
  const cookies = cookie.parse(req.headers.cookie);
  const authToken = cookies?.bugTrakrAuth || '';

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call api */
      try {
        const response = await leaveProject(authToken, body.id);

        /* send back server response */
        if (response.status === 204) {
          return res.status(200).json({ message: 'Leave ok.' });
        }

        const data = await response.json();
        return res.status(400).json({ message: data.message });
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
