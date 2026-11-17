import { useState } from "react"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import useAppDispatch from "./useAppDispatch"
import { alertActions } from "../redux/actions"

export default function useCredentialsLogin() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [pending, setPending] = useState<"login" | "demo" | null>(null)

  async function login(username: string, password: string, mode: "login" | "demo" = "login") {
    setPending(mode)
    try {
      const result = await signIn("credentials", { redirect: false, username, password })
      if (!result?.ok || result.error) throw new Error(result?.error || "Sign-in failed.")
      await router.push("/dashboard")
    } catch (error) {
      dispatch(
        alertActions.enqueueSnackbar({
          message: error instanceof Error ? error.message : "Could not sign in. Please try again.",
          options: { variant: "error", key: Date.now() },
        }),
      )
    } finally {
      setPending(null)
    }
  }
  const handleDemoLogin = () => login(process.env.DEMO_LOGIN_USERNAME, process.env.DEMO_LOGIN_PASSWORD, "demo")
  return {
    login,
    handleDemoLogin,
    loggingIn: pending === "login",
    demoLoggingIn: pending === "demo",
  }
}
