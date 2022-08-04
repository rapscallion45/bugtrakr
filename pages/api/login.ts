import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { loginUser } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { method, body } = req;
  const { username, password } = body ?? {};

  if (!username || !password) {
    /* no account username or password provided, return error */
    return res
      .status(422)
      .json({ message: 'Unproccesable request, please provide the required fields.' });
  }

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call api */
      try {
        const response = await loginUser({ username, password });
        const data = await response.json();

        /* Only send back message with successful or not - don't send JWT to client! */
        if (response.status === 201) {
          /**
           * Set secure false when running on local host (http), and set
           * httpOnly cookie to prevent clientside javascript from accessing it
           */
          res.setHeader('Set-Cookie', [
            cookie.serialize('bugTrakrAuth', String(data?.token ?? ''), {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              path: '/',
              maxAge: 60 * 60 * 24 * 2 /* 48 hours for auth token */,
              sameSite: 'strict',
            }),
          ]);

          return res.status(200).json({
            id: data.id,
            username: data.username,
            demo: false,
          });
        }
        return res.status(response.status).json({ message: data.message });
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
