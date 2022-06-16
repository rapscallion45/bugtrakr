import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { getUserById, updateUserById } from '../../lib/api';

export default async function accountDetails(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { body, method } = req;
  const cookies = cookie.parse(req.headers.cookie);
  const authToken = cookies?.fplfrogAuth || '';
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
        const data = await getUserById(id, authToken);

        /* send back server response */
        if (data?.user) {
          return res.status(200).json(data?.user);
        }
        return res.status(400).json({ message: 'Request failed.' });
      } catch (error) {
        return res.status(501).json({
          message: 'Oops, something went wrong with the request.',
          error,
        });
      }
    case 'PUT':
      /* call api */
      try {
        const data = await updateUserById(id, authToken, user);

        /* send back server response */
        if (data?.updateUser?.user) {
          return res.status(200).json(data?.updateUser?.user);
        }
        return res.status(400).json({ message: 'Failed to update profile.' });
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
