import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { deleteBug, updateBug } from '../../../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { method, query, body } = req;
  const cookies = cookie.parse(req.headers.cookie);
  const authToken = cookies?.bugTrakrAuth || '';

  /* check if we have a project Id, if not return error */
  if (!query.projectId || !query.id) {
    return res
      .status(422)
      .json({ message: 'Unproccesable request, no project or bug ID provided.' });
  }

  /* determine which request type this is */
  switch (method) {
    case 'DELETE':
      /* call api */
      try {
        const response = await deleteBug(authToken, query.projectId, query.id);

        /* send back server response */
        if (response.status === 204) {
          return res.status(200).json({ message: 'Bug deleted.' });
        }
        return res.status(400).json({ message: 'Failed to delete bug.' });
      } catch (error) {
        return res.status(501).json({
          message: 'Oops, something went wrong with the request.',
          error,
        });
      }
    case 'PUT':
      /* call api */
      try {
        const response = await updateBug(authToken, query.projectId, query.id, body);
        const data = await response.json();

        /* send back server response */
        if (response.status === 201) {
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
