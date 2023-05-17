import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUser } from '../../../lib/api';
import { ICredentialsPayload } from '../../../redux/types/types';

export const authOptions = {
  /* configure authentication provider(s) */
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const payload: ICredentialsPayload = {
          username: credentials.username,
          password: credentials.password,
        };

        /* call login API */
        const res = await loginUser(payload);
        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        /* if no error and we have user data, return it */
        if (res.ok && user) {
          return user;
        }

        /* return null if user data could not be retrieved */
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },

    /* eslint-disable no-param-reassign */
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      // session.user.refreshToken = token.refreshToken;
      // session.user.accessTokenExpires = token.accessTokenExpires;

      /* return placeholders for now */
      session.user.refreshToken = '';
      session.user.accessTokenExpires = '';
      session.user.name = '';
      session.user.email = '';
      session.user.image = '';

      return session;
    },
  },
  /* enable debug messages in the console if you are having problems */
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
