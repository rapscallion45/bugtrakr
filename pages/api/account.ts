import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { getUserById, updateUserById } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { body, method } = req;
  const cookies = cookie.parse(req.headers.cookie);
  const authToken = cookies?.bugTrakrAuth || '';
  const demoToken = cookies?.bugTrakrDemo || '';
  const { id, user } = body;

  if (!id) {
    /* no account id provided, return error */
    return res
      .status(422)
      .json({ message: 'Unproccesable request, please provide the required fields.' });
  }

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call api */
      try {
        const response = await getUserById(authToken, id);
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
    case 'PUT':
      /* call api */
      try {
        /* check if we're in demo mode, if so deny access */
        if (demoToken === 'demo') {
          return res.status(401).json({ message: 'Operation not authorized in demo mode.' });
        }

        const response = await updateUserById(authToken, id, user);
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
