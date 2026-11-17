import { act, fireEvent, render, renderHook, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { signIn, signOut, useSession } from "next-auth/react"
import rootReducer from "../redux/reducers"
import ThemeConfig from "../theme/ThemeConfig"
import createEmotionCache from "../utils/createEmotionCache"
import Sidebar from "../components/NavSideBar/NavSideBar"
import useCredentialsLogin from "../hooks/useCredentialsLogin"

jest.mock("next-auth/react")
jest.mock("next/router", () => ({
  useRouter: () => ({ pathname: "/dashboard", push: jest.fn() }),
}))
jest.mock(
  "../components/ScrollBar/ScrollBar",
  () =>
    ({ children }) =>
      children,
)
function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={createStore(rootReducer)}>
      <ThemeConfig emotionCache={createEmotionCache()}>{children}</ThemeConfig>
    </Provider>
  )
}
test("shows a usable name before the profile has loaded", () => {
  ;(useSession as jest.Mock).mockReturnValue({
    data: { user: { username: "tester", demo: false } },
  })
  render(<Sidebar />, { wrapper })
  expect(screen.getByText(/Hi, tester!/)).toBeVisible()
})
test("Create Account ends the demo and opens registration", () => {
  ;(useSession as jest.Mock).mockReturnValue({ data: { user: { username: "demo", demo: true } } })
  render(<Sidebar />, { wrapper })
  fireEvent.click(screen.getByRole("button", { name: "Create Account" }))
  expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/register" })
})
test("demo sign-in enables retry after a network failure", async () => {
  ;(signIn as jest.Mock).mockRejectedValueOnce(new Error("Offline"))
  const { result } = renderHook(useCredentialsLogin, { wrapper })
  await act(() => result.current.handleDemoLogin())
  expect(result.current.demoLoggingIn).toBe(false)
})
