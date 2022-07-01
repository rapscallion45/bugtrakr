import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { getProjects, deleteProject, updateProject, createProject } from '../../lib/api';

export default async function projects(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { body, method } = req;
  const cookies = cookie.parse(req.headers.cookie);
  const authToken = cookies?.bugTrakrAuth || '';

  /* determine which request type this is */
  switch (method) {
    case 'GET':
      /* call api */
      try {
        const response = await getProjects(authToken);
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
    case 'DELETE':
      /* call api */
      try {
        if (!body.id) {
          /* no account id provided, return error */
          return res
            .status(422)
            .json({ message: 'Unproccesable request, no project ID provided.' });
        }

        const response = await deleteProject(authToken, body.id);

        /* send back server response */
        if (response.status === 204) {
          return res.status(200).json({ message: 'Project deleted.' });
        }
        return res.status(400).json({ message: 'Failed to delete project.' });
      } catch (error) {
        return res.status(501).json({
          message: 'Oops, something went wrong with the request.',
          error,
        });
      }
    case 'POST':
      /* call api */
      try {
        if (!body.name) {
          /* no project name provided, return error */
          return res
            .status(422)
            .json({ message: 'Unproccesable request, project must have a name.' });
        }

        const response = await createProject(authToken, body);
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
    case 'PUT':
      /* call api */
      try {
        if (!body.id || !body.name) {
          /* no project name or ID provided, return error */
          return res
            .status(422)
            .json({ message: 'Unproccesable request, project name and ID not provided.' });
        }

        const response = await updateProject(authToken, body);
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
