export default async function exchangeSocialLogin(provider: string, credential: string, currentToken?: string) {
  if (!credential || !["google", "github"].includes(provider)) throw new Error("Invalid sign-in provider.")
  const body = provider === "google" ? { tokenId: credential } : { accessToken: credential }
  const response = await fetch(`${process.env.API_REST_URL}/login-${provider}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(currentToken ? { "x-auth-token": currentToken } : {}),
    },
    body: JSON.stringify(body),
  })
  if (response.status === 409 && provider === "github") {
    throw new Error("Sign in with your existing account, then connect GitHub from My Account.")
  }
  if (!response.ok) throw new Error("BugTrakr could not verify this sign-in.")
  return response.json()
}
