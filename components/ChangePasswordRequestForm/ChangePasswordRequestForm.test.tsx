import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { thunk } from "redux-thunk"
import { useSession } from "next-auth/react"
import rootReducer from "../../redux/reducers"
import ChangePasswordRequestForm from "./ChangePasswordRequestForm"

const mockPush = jest.fn()
jest.mock("next/router", () => ({ useRouter: () => ({ push: mockPush }) }))
jest.mock("next-auth/react")
function setup(demo: boolean) {
  ;(useSession as jest.Mock).mockReturnValue({ data: { user: { demo } } })
  const state = rootReducer(undefined, { type: "init" })
  const store = createStore(rootReducer, { ...state, account: { user: { email: "user@example.test" } } }, applyMiddleware(thunk))
  render(
    <Provider store={store}>
      <ChangePasswordRequestForm />
    </Provider>,
  )
}
test("demo users cannot request a reset", () => {
  setup(true)
  expect(screen.getByRole("button")).toBeDisabled()
})
test("submits the account email and shows progress until completion", async () => {
  let finish: (response: unknown) => void
  global.fetch = jest.fn(
    () =>
      new Promise((resolve) => {
        finish = resolve
      }),
  ) as jest.Mock
  setup(false)
  fireEvent.click(screen.getByRole("button"))
  expect(screen.getByRole("button")).toBeDisabled()
  expect(screen.getByRole("progressbar")).toBeVisible()
  expect(fetch).toHaveBeenCalledWith("/api/change-password", expect.objectContaining({ body: JSON.stringify({ email: "user@example.test" }) }))
  finish({
    ok: true,
    text: async () => JSON.stringify({ email: "user@example.test", info: "Sent" }),
  })
  await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/reset-password"))
  expect(screen.getByRole("button")).toBeEnabled()
})
