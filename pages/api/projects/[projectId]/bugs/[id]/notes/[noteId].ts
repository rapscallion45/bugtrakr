import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../auth/[...nextauth]';
import { deleteNote, updateNote } from '../../../../../../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { method, query, body } = req;
  const session = await getServerSession(req, res, authOptions);

  /* determine which request type this is */
  switch (method) {
    case 'DELETE':
      /* check if we have a project Id note Id - if not return error */
      if (!query.projectId || !query.noteId) {
        return res
          .status(422)
          .json({ message: 'Unproccesable request, no project or note ID provided.' });
      }

      /* call api */
      try {
        const response = await deleteNote(session.user.token, query.projectId, query.noteId);

        /* send back server response */
        if (response.status === 204) {
          return res.status(200).json({ message: 'Note deleted.' });
        }
        return res.status(400).json({ message: 'Failed to delete note.' });
      } catch (error) {
        return res.status(501).json({
          message: 'Oops, something went wrong with the request.',
          error,
        });
      }
    case 'PUT':
      /* check if we have a project Id and note Id - if not return error */
      if (!query.projectId || !query.noteId) {
        return res
          .status(422)
          .json({ message: 'Unproccesable request, no project or note ID provided.' });
      }

      /* call api */
      try {
        const response = await updateNote(session.user.token, query.projectId, query.noteId, body);
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
