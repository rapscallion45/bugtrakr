import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import { thunk } from "redux-thunk"
import { useSession } from "next-auth/react"
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout"
import BugDetails from "../pages/dashboard/projects/[projectId]/bugs/[id]"
import ProjectDetails from "../pages/dashboard/projects/[projectId]"
import ProjectForm from "../components/ProjectForm/ProjectForm"
import BugsTableMobile from "../components/BugsTable/BugsTableMobile"
import rootReducer from "../redux/reducers"
import ThemeConfig from "../theme/ThemeConfig"
import createEmotionCache from "../utils/createEmotionCache"

jest.mock("../pages/api/auth/[...nextauth]", () => ({ authOptions: {} }))
jest.mock("next-auth/next", () => ({}))
const mockRouter = {
  query: { projectId: "project-2", id: "removed" },
  pathname: "/dashboard/my-bugs",
  replace: jest.fn(),
  push: jest.fn(),
}
jest.mock("next/router", () => ({
  __esModule: true,
  default: { push: jest.fn() },
  useRouter: () => mockRouter,
}))
jest.mock("next-auth/react")
jest.mock("../components/NavBar/NavBar", () => () => null)
jest.mock("../components/NavSideBar/NavSideBar", () => () => null)
jest.mock("../hooks/useNotifier", () => () => {})
const users = [
  { id: "old", username: "Existing member" },
  { id: "new", username: "New teammate" },
]
const projects = [
  {
    id: "project-2",
    name: "Client bugs",
    bugs: [],
    updatedAt: new Date(0),
    members: [],
    createdBy: { id: "1", username: "member" },
    createdAt: new Date(0),
  },
]
const bug = {
  id: "bug-1",
  projectId: "project-2",
  title: "Wrong total",
  description: "Total is incorrect",
  priority: "low" as const,
  isResolved: false,
  notes: [],
  createdAt: new Date("2026-01-01"),
  createdBy: { id: "tester", username: "Tester" },
}
function setup(children: React.ReactNode) {
  const state = rootReducer(undefined, { type: "init" })
  const store = createStore(rootReducer, { ...state, projects: { data: projects }, bugs: { data: [bug] } }, applyMiddleware(thunk))
  return render(
    <Provider store={store}>
      <ThemeConfig emotionCache={createEmotionCache()}>{children}</ThemeConfig>
    </Provider>,
  )
}
function json(value: unknown) {
  return { ok: true, text: async () => JSON.stringify(value) }
}
beforeEach(() => {
  ;(useSession as jest.Mock).mockReturnValue({
    status: "authenticated",
    data: { user: { uid: "1" } },
  })
})
test.each(["members", "create"])("%s picker loads the directory after signing in", async (mode) => {
  global.fetch = jest.fn(async (url) => json(url === "/api/users" ? users : { id: "1" })) as jest.Mock
  setup(
    <DashboardLayout>
      <ProjectForm editMode={mode === "members" ? "members" : null} projectId={"project-2"} currentMembers={["old"]} />
    </DashboardLayout>,
  )
  const picker = screen.getByRole("combobox")
  fireEvent.mouseDown(picker)
  const option = await screen.findByRole("option", { name: /New teammate/ })
  if (mode === "members") expect(screen.queryByRole("option", { name: /Existing member/ })).toBeNull()
  fireEvent.click(option)
  expect(fetch).toHaveBeenCalledWith("/api/users", expect.anything())
  if (mode === "members") {
    fireEvent.click(screen.getByRole("button", { name: "Submit" }))
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/projects/project-2/members",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ id: "project-2", members: ["new"] }),
        }),
      ),
    )
  } else {
    fireEvent.change(screen.getByLabelText("Project Name"), { target: { value: "New project" } })
    fireEvent.click(screen.getByRole("button", { name: "Create Project" }))
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/projects",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ name: "New project", members: ["new"] }),
        }),
      ),
    )
  }
})
test("a signed-out dashboard redirects without rendering protected content", async () => {
  ;(useSession as jest.Mock).mockReturnValue({ status: "unauthenticated", data: null })
  setup(
    <DashboardLayout>
      <span>Private dashboard</span>
    </DashboardLayout>,
  )
  expect(screen.queryByText("Private dashboard")).toBeNull()
  expect(mockRouter.replace).toHaveBeenCalledWith("/login")
})
test.each([
  ["Update Bug", "Submit", "PUT", "", false],
  ["Close Bug", "Close", "POST", "/close", false],
  ["Reopen Bug", "Reopen", "POST", "/reopen", true],
  ["Delete Bug", "Delete", "DELETE", "", false],
])("mobile My Bugs sends %s to the owning project", async (menu, confirm, method, suffix, isResolved) => {
  global.fetch = jest.fn(async () => json(bug)) as jest.Mock
  setup(<BugsTableMobile isMyBugs bugs={[{ ...bug, isResolved }]} />)
  fireEvent.click(screen.getByRole("button", { name: "Actions for Wrong total" }))
  fireEvent.click(await screen.findByRole("menuitem", { name: String(menu) }))
  const dialog = await screen.findByRole("dialog")
  fireEvent.click(within(dialog).getByRole("button", { name: String(confirm) }))
  await waitFor(() => expect(fetch).toHaveBeenCalledWith(`/api/projects/project-2/bugs/bug-1${suffix}`, expect.objectContaining({ method })))
})

test("a deleted bug bookmark ends in a missing-record message", async () => {
  global.fetch = jest.fn(async (url) => json(url === "/api/projects" ? projects : [])) as jest.Mock
  setup(<BugDetails />)
  expect(await screen.findByText("This bug could not be found.")).toBeVisible()
})
test.each([
  [BugDetails, "Failed to load bug details."],
  [ProjectDetails, "Failed to load project details."],
] as const)("shows a terminal error when detail data fails to load", async (Details, message) => {
  global.fetch = jest.fn(async (url) => {
    if (url === "/api/projects") return json(projects)
    throw new Error("Offline")
  }) as jest.Mock
  setup(<Details />)
  expect(await screen.findByText(message)).toBeVisible()
  expect(screen.queryByRole("progressbar")).toBeNull()
})
