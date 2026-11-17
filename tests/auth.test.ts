/** @jest-environment node */
import type { NextApiRequest, NextApiResponse } from "next"
import { encode } from "next-auth/jwt"
import { getServerSession } from "next-auth/next"
import { authOptions, createAuthOptions } from "../pages/api/auth/[...nextauth]"
import users from "../pages/api/users"
import recovery from "../pages/api/change-password"

jest.mock("next-auth/next", () => ({
  ...jest.requireActual("next-auth/next"),
  getServerSession: jest.fn(),
}))
const originalFetch = global.fetch
beforeEach(() => {
  process.env.NEXTAUTH_SECRET = "test-only-session-secret"
  process.env.API_REST_URL = "https://backend.example"
  global.fetch = jest.fn()
})
afterAll(() => {
  global.fetch = originalFetch
})
function response() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as NextApiResponse
}

test.each([
  ["google", { id_token: "google-proof" }, { tokenId: "google-proof" }],
  ["github", { access_token: "github-proof" }, { accessToken: "github-proof" }],
])("%s sign-in exchanges provider proof and forwards only the backend identity to protected routes", async (provider, proof, body) => {
  const identity = { id: "local-123", username: "member", token: "backend-only" }
  ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => identity })
  const jwt = await authOptions.callbacks.jwt({
    token: {},
    account: { provider, ...Object(proof) },
    user: { id: "provider-id" },
  } as unknown as Parameters<typeof authOptions.callbacks.jwt>[0])
  expect(fetch).toHaveBeenCalledWith(`https://backend.example/login-${provider}`, expect.objectContaining({ body: JSON.stringify(body) }))
  const session = await authOptions.callbacks.session({
    session: { user: {}, expires: "" },
    token: jwt,
  } as unknown as Parameters<typeof authOptions.callbacks.session>[0])
  expect(session.user).toMatchObject({ uid: "local-123", username: "member" })
  expect(JSON.stringify(session)).not.toContain("backend-only")
  const cookie = await encode({ token: jwt, secret: process.env.NEXTAUTH_SECRET })
  const res = response()
  ;(fetch as jest.Mock).mockResolvedValueOnce({
    status: 200,
    json: async () => [{ id: "other" }],
  })
  await users(
    {
      method: "GET",
      headers: { cookie: `next-auth.session-token=${cookie}` },
      cookies: { "next-auth.session-token": cookie },
    } as unknown as NextApiRequest,
    res,
  )
  expect(fetch).toHaveBeenLastCalledWith(
    expect.stringMatching(/\/users$/),
    expect.objectContaining({
      headers: expect.objectContaining({ "x-auth-token": "backend-only" }),
    }),
  )
  expect(res.json).toHaveBeenCalledWith([{ id: "other" }])
})

test("a failed provider exchange cannot establish a session", async () => {
  ;(fetch as jest.Mock).mockResolvedValue({ ok: false })
  await expect(
    authOptions.callbacks.jwt({
      account: { provider: "github", access_token: "proof" },
      token: {},
    } as Parameters<typeof authOptions.callbacks.jwt>[0]),
  ).rejects.toThrow("verify")
})
test("credentials sessions also keep the backend token private", async () => {
  const token = await authOptions.callbacks.jwt({
    account: { provider: "credentials" },
    user: { id: "1", username: "member", token: "private-token" },
    token: {},
  } as Parameters<typeof authOptions.callbacks.jwt>[0])
  const session = await authOptions.callbacks.session({ token, session: { user: {} } } as Parameters<typeof authOptions.callbacks.session>[0])
  expect(session.user).toMatchObject({ uid: "1" })
  expect(session.user).not.toHaveProperty("token")
})
test("a signed-out visitor can request a recovery email", async () => {
  ;(getServerSession as jest.Mock).mockResolvedValue(null)
  const email = "member@example.test"
  ;(fetch as jest.Mock).mockResolvedValue({
    status: 201,
    json: async () => ({ email, message: "Sent" }),
  })
  const res = response()
  await recovery({ method: "POST", body: { email } } as NextApiRequest, res)
  expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/change-password$/), expect.objectContaining({ body: JSON.stringify({ email }) }))
  expect(res.status).toHaveBeenCalledWith(200)
})
test("protected directory rejects expired sessions before calling the backend", async () => {
  const res = response()
  await users({ method: "GET", headers: {}, cookies: {} } as unknown as NextApiRequest, res)
  expect(res.status).toHaveBeenCalledWith(401)
  expect(fetch).not.toHaveBeenCalled()
})

test("Connect GitHub forwards the existing authenticated account only to the backend exchange", async () => {
  const sessionCookie = await encode({
    token: { uid: "1", token: "local-proof" },
    secret: process.env.NEXTAUTH_SECRET,
  })
  const req = {
    headers: {},
    cookies: { "next-auth.session-token": sessionCookie },
  } as unknown as NextApiRequest
  ;(fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({ id: "1", token: "renewed", username: "member" }),
  })
  await createAuthOptions(req).callbacks.jwt({
    account: { provider: "github", access_token: "github-proof" },
    token: {},
  } as Parameters<typeof authOptions.callbacks.jwt>[0])
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("/login-github"),
    expect.objectContaining({
      headers: expect.objectContaining({ "x-auth-token": "local-proof" }),
    }),
  )
})
