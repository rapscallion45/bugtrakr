import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]';
import { createNote } from '../../../../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { method, query, body } = req;
  const session = await getServerSession(req, res, authOptions);

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* check if we have a project Id and bug Id - if not return error */
      if (!query.projectId || !query.id) {
        return res
          .status(422)
          .json({ message: 'Unproccesable request, no project or bug ID provided.' });
      }

      /* call api */
      try {
        const response = await createNote(session.user.token, query.projectId, query.id, body);
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
