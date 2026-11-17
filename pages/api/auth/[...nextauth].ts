import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import exchangeSocialLogin from "../../../lib/api/socialLogin"
import { loginUser } from "../../../lib/api"
import { ICredentialsPayload } from "../../../redux/types/types"

export const createAuthOptions = (req?: NextApiRequest): AuthOptions => ({
  /* configure authentication provider(s) */
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload: ICredentialsPayload = {
          username: credentials.username,
          password: credentials.password,
        }

        /* call login API */
        const res = await loginUser(payload)
        const user = await res.json()

        /* error detection */
        if (!res.ok) {
          throw new Error(user.message)
        }

        /* if no error and we have user data, return it */
        if (res.ok && user) {
          return {
            ...user,
            demo: user.username === "demo",
          }
        }

        /* return null if user data could not be retrieved */
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (!account) return token
      let identity = user
      if (account.provider !== "credentials") {
        const credential = account.provider === "google" ? account.id_token : account.access_token
        const current = req && account.provider === "github" ? await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) : null
        identity = await exchangeSocialLogin(account.provider, credential, current?.token)
      }
      if (!identity?.id || !identity.username || typeof identity.token !== "string" || !identity.token) {
        throw new Error("BugTrakr did not return a valid account.")
      }
      return {
        ...token,
        token: identity.token,
        uid: String(identity.id),
        username: identity.username,
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          name: token.name ?? null,
          email: token.email ?? null,
          image: token.picture ?? null,
          uid: token.uid,
          username: token.username,
          demo: token.username === process.env.DEMO_LOGIN_USERNAME,
        },
      }
    },
  },
  /* enable debug messages in the console if you are having problems */
  debug: process.env.NODE_ENV === "development",
})

export const authOptions = createAuthOptions()

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, createAuthOptions(req))
}
