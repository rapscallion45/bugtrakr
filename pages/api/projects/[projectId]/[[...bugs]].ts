import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { getBugs, createBug, deleteBug, updateBug } from '../../../../lib/api';

export default async function bugs(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { method, query, body } = req;
  const cookies = cookie.parse(req.headers.cookie);
  const authToken = cookies?.bugTrakrAuth || '';

  /* check if we have a project Id, if not return error */
  if (!query.projectId) {
    return res.status(422).json({ message: 'Unproccesable request, no project ID provided.' });
  }

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
    case 'POST':
      /* call api */
      try {
        const response = await createBug(authToken, query.projectId, body);
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
        if (!query.bugs[1]) {
          /* no bug ID provided, return error */
          return res.status(422).json({ message: 'Unproccesable request, no bug ID provided.' });
        }

        const response = await deleteBug(authToken, query.projectId, query.bugs[1]);

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
        if (!query.bugs[1]) {
          /* no bug ID provided, return error */
          return res.status(422).json({ message: 'Unproccesable request, bug ID not provided.' });
        }

        const response = await updateBug(authToken, query.projectId, query.bugs[1], body);
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
