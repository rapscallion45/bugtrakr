import cookie from 'cookie';
import { getProjects, deleteProject, updateProject, createProject } from '../../lib/api';

export default async function projects(req, res) {
  /* get req params */
  const { body, method } = req;
  const cookies = cookie.parse(req.headers.cookie);
  const authToken = cookies?.bugTrakrAuth || '';
  const { id, newName, projectData } = body;

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
        if (!id) {
          /* no account id provided, return error */
          return res
            .status(422)
            .json({ message: 'Unproccesable request, no project ID provided.' });
        }

        const response = await deleteProject(authToken, id);

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
        const data = await createProject(authToken, projectData);

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
    case 'PUT':
      /* call api */
      try {
        if (!id) {
          /* no account id provided, return error */
          return res
            .status(422)
            .json({ message: 'Unproccesable request, please provide the required fields.' });
        }

        const response = await updateProject(authToken, id, newName);
        const data = await response.json();

        /* send back server response */
        if (response.status === 200) {
          return res.status(200).json(data?.updateUser?.user);
        }
        return res.status(400).json({ message: 'Failed to update project.' });
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
