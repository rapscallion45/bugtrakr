import process from "node:process"
import next from "next"
// Run against a production build with an isolated local BugTrakr API.
import { test } from "node:test"
import assert from "node:assert/strict"
import http from "node:http"
import { randomBytes } from "node:crypto"

async function listen(server) {
  await new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", resolve)
  })
  return "http://127.0.0.1:" + server.address().port
}

test("production credentials sign-in opens the dashboard and authorizes the member directory", async (t) => {
  const token = randomBytes(32).toString("hex")
  const backend = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json")
    if (req.url === "/login" && req.method === "POST") {
      let body = ""
      for await (const chunk of req) body += chunk
      const { username, password } = JSON.parse(body)
      if (username === "member" && password === "test-only") {
        res.statusCode = 201
        return res.end(JSON.stringify({ id: "local-id", username, token }))
      }
    }
    if (req.url === "/users" && req.headers["x-auth-token"] === token) {
      return res.end(JSON.stringify([{ id: "colleague", username: "Teammate" }]))
    }
    res.statusCode = 401
    return res.end(JSON.stringify({ message: "Unauthorized" }))
  })
  process.env.API_REST_URL = await listen(backend)
  t.after(() => backend.close())
  let handle
  const site = http.createServer((req, res) => handle(req, res))
  const origin = await listen(site)
  t.after(() => site.close())
  Object.assign(process.env, {
    NODE_ENV: "production",
    NEXTAUTH_URL: origin,
    NEXTAUTH_SECRET: randomBytes(32).toString("hex"),
    NEXT_TELEMETRY_DISABLED: "1",
  })
  const app = next({ dev: false, dir: process.cwd() })
  await app.prepare()
  t.after(() => app.close())
  handle = app.getRequestHandler()
  const cookies = new Map()
  async function request(path, options = {}) {
    const cookie = [...cookies.values()].join("; ")
    const res = await fetch(origin + path, {
      ...options,
      redirect: "manual",
      headers: { cookie, ...options.headers },
    })
    for (const field of res.headers.getSetCookie()) {
      const pair = field.split(";")[0]
      cookies.set(pair.slice(0, pair.indexOf("=")), pair)
    }
    return res
  }
  const initial = await request("/dashboard")
  assert.equal(initial.status, 307)
  assert.equal(new URL(initial.headers.get("location"), origin).pathname, "/login")
  const { csrfToken } = await (await request("/api/auth/csrf")).json()
  const result = await request("/api/auth/callback/credentials", {
    method: "POST",
    body: new URLSearchParams({
      csrfToken,
      username: "member",
      password: "test-only",
      callbackUrl: origin + "/dashboard",
      json: "true",
    }),
  })
  assert.equal(result.status, 200)
  assert.equal((await result.json()).url, origin + "/dashboard")
  const session = await (await request("/api/auth/session")).json()
  assert.equal(session.user.uid, "local-id")
  assert.equal("token" in session.user, false)
  const dashboard = await request("/dashboard")
  assert.equal(dashboard.status, 200)
  const html = await dashboard.text()
  assert.ok(html.includes("All Projects"))
  assert.ok(!html.includes(token))
  const directory = await request("/api/users")
  assert.equal(directory.status, 200)
  assert.deepEqual(await directory.json(), [{ id: "colleague", username: "Teammate" }])
})
