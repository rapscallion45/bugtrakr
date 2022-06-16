/**
 * Shared mock server API handlers shared between all tests
 */
import { rest } from 'msw';
import acountMock from './accountMock';

const serverMockHandlers = [
  /* Test/mock user authentication route */
  rest.post('/api/authenticate', async (req, res, ctx) =>
    /* No need to test auth cookie, assume auth cookie present */
    res(
      ctx.status(200),
      ctx.json({
        id: acountMock.id,
        email: acountMock.email,
        firstName: acountMock.firstName,
        lastName: acountMock.lastName,
      })
    )
  ),
  /* Test/mock login route */
  rest.post('/api/login', async (req, res, ctx) => {
    const { password, email } = req.body;
    if (
      !password ||
      !email ||
      password !== acountMock.password ||
      email !== acountMock.email ||
      email !== acountMock.username
    )
      return res(ctx.status(404), ctx.json({ meesage: 'Incorrect username or password' }));
    return res(ctx.status(200), ctx.json({ message: 'login ok' }));
  }),
  /* Test/mock forgot password route */
  rest.post('/api/forgot-password', async (req, res, ctx) => {
    const { email } = req.body;
    if (!email || email !== acountMock.email)
      return res(ctx.status(404), ctx.json({ meesage: 'Incorrect email' }));
    return res(ctx.status(200), ctx.json({ message: 'change password request ok' }));
  }),
  /* Test/mock Account data route */
  rest.post('/api/account', async (req, res, ctx) =>
    /* No need to test auth cookie, assume auth cookie present */
    res(
      ctx.status(200),
      ctx.json({
        data: {
          acountMock,
        },
      })
    )
  ),
];

/* eslint-disable import/prefer-default-export */
export { serverMockHandlers };
