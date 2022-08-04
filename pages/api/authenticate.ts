import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { authenticateUser } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const cookies = cookie.parse(req.headers.cookie);
  const authToken = cookies?.bugTrakrAuth || '';
  const demoToken = cookies?.bugTrakrDemo || '';

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call api */
      try {
        const response = await authenticateUser(authToken);
        const data = await response.json();

        /* Signal user auth token is valid */
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
            id: data?.id,
            username: data?.username,
            demo: demoToken === 'demo',
          });
        }
        return res.status(401).json({ message: 'Session expired, please login again' });
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
