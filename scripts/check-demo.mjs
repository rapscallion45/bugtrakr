import assert from "node:assert/strict"
import process from "node:process"

const origin = new URL(process.argv[2] || "https://bugtrakr.vercel.app").origin
const cookies = new Map()
async function request(path, options = {}) {
  const response = await fetch(origin + path, {
    redirect: "manual",
    ...options,
    headers: { cookie: [...cookies.values()].join("; "), ...options.headers },
  })
  for (const value of response.headers.getSetCookie()) {
    const pair = value.split(";")[0]
    cookies.set(pair.slice(0, pair.indexOf("=")), pair)
  }
  assert.equal(response.status, 200, path + " returned " + response.status)
  return response
}
const { csrfToken } = await (await request("/api/auth/csrf")).json()
await request("/api/auth/callback/credentials", {
  method: "POST",
  body: new URLSearchParams({ csrfToken, username: "demo", password: "password", json: "true" }),
})
const { user } = await (await request("/api/auth/session")).json()
assert.ok(user?.demo && user.uid, "Demo session was not established")
assert.ok(!("token" in user), "Backend token in public session")
const dashboard = await (await request("/dashboard")).text()
assert.ok(dashboard.includes("All Projects"), "Missing dashboard")
const projects = await (await request("/api/projects")).json()
assert.ok(Array.isArray(projects), "Expected a project list")
const project = projects.find((item) => item.name === "BugTrakr demo")
assert.ok(project, "Missing seeded demo project")
const bugs = await (await request("/api/projects/" + encodeURIComponent(project.id) + "/bugs")).json()
assert.ok(Array.isArray(bugs), "Expected a bug list")
const members = await (await request("/api/users")).json()
assert.ok(Array.isArray(members), "Expected a member directory")
console.log("Verified demo session, dashboard, project, bugs and member directory at " + origin)
