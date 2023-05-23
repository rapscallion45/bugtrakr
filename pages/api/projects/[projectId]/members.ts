import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { updateProjectMembers, removeProjectMember } from '../../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { body, method } = req;
  const session = await getServerSession(req, res, authOptions);

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call api */
      try {
        if (!body.id) {
          /* no project id provided, return error */
          return res
            .status(422)
            .json({ message: 'Unproccesable request, project must have a name.' });
        }

        const response = await updateProjectMembers(session.user.token, body);
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
    case 'DELETE':
      /* call api */
      try {
        if (!body.id || !body.memberId) {
          /* no project and/or member ID provided, return error */
          return res
            .status(422)
            .json({ message: 'Unproccesable request, no project or user ID provided.' });
        }

        const response = await removeProjectMember(session.user.token, body);

        /* send back server response */
        if (response.status === 204) {
          return res.status(200).json({ message: 'User removed from project.' });
        }
        return res.status(400).json({ message: 'Failed to remove user from project.' });
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
