import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"

interface BackendIdentity {
  token: string
  uid: string
  demo: boolean
}

export default function withBackendIdentity(handler: (req: NextApiRequest, res: NextApiResponse, identity: BackendIdentity) => Promise<void>) {
  return async function authenticatedRequest(req: NextApiRequest, res: NextApiResponse) {
    const jwt = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!jwt?.uid || typeof jwt.token !== "string" || !jwt.token) {
      return res.status(401).json({ message: "Please sign in again." })
    }
    return handler(req, res, {
      token: jwt.token,
      uid: jwt.uid,
      demo: jwt.username === process.env.DEMO_LOGIN_USERNAME,
    })
  }
}
