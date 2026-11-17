import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/react"
import useMediaQuery from "@mui/material/useMediaQuery"
import BottomNavBar from "./BottomNavBar"

jest.mock("next-auth/react")
jest.mock("@mui/material/useMediaQuery")
jest.mock("next/router", () => ({ useRouter: () => ({ pathname: "/dashboard" }) }))
function setup(authenticated: boolean, desktop = false) {
  ;(useSession as jest.Mock).mockReturnValue({
    data: authenticated ? { user: { uid: "1" } } : null,
  })
  ;(useMediaQuery as jest.Mock).mockImplementation((query) => (query.includes("width") ? desktop : true))
  render(<BottomNavBar />)
}
test("hides navigation for signed-out visitors", () => {
  setup(false)
  expect(screen.queryByRole("link")).toBeNull()
})
test("hides bottom navigation on desktop", () => {
  setup(true, true)
  expect(screen.queryByRole("link")).toBeNull()
})
test("provides mobile dashboard routes and marks the active page", () => {
  setup(true)
  expect(screen.getAllByRole("link")).toHaveLength(3)
  expect(screen.getByRole("link", { name: "All Projects" })).toHaveClass("Mui-selected")
  expect(screen.getByRole("link", { name: "My Bugs" })).toHaveAttribute("href", "/dashboard/my-bugs")
  expect(screen.getByRole("link", { name: "My Account" })).toHaveAttribute("href", "/dashboard/my-account")
})
