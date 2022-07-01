import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { getBugs } from '../../../../lib/api';

export default async function bugs(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { method, query } = req;
  const cookies = cookie.parse(req.headers.cookie);
  const authToken = cookies?.bugTrakrAuth || '';

  /* determine which request type this is */
  switch (method) {
    case 'GET':
      /* call api */
      try {
        const response = await getBugs(authToken, query.projectId);
        const data = await response.json();

        /* send back server response */
        if (response.status === 200) {
          return res.status(200).json(data);
        }
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
