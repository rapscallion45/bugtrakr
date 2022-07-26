import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { loginUser } from '../../lib/api';

const { DEMO_LOGIN_USERNAME, DEMO_LOGIN_PASSWORD } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* get req params */
  const { method } = req;

  /* determine which request type this is */
  switch (method) {
    case 'POST':
      /* call api */
      try {
        const response = await loginUser({
          username: DEMO_LOGIN_USERNAME,
          password: DEMO_LOGIN_PASSWORD,
        });
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
            cookie.serialize('bugTrakrDemo', String('demo'), {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              path: '/',
              maxAge: 60 * 60 * 24 * 2 /* 48 hours for demo token */,
              sameSite: 'strict',
            }),
          ]);

          const { id, username } = data;
          return res.status(200).json({
            id,
            username,
            demo: true,
          });
        }
        return res
          .status(response.status)
          .json({ message: 'Demo login unavailable at this time.' });
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
