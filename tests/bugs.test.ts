import sortBugs from "../utils/sortBugs"
import bugs, { selectBugList } from "../redux/reducers/bugs.reducer"
import { bugConstants as c } from "../redux/constants"

const bug = {
  id: "bug",
  projectId: "project",
  title: "Bug",
  description: "",
  priority: "medium" as const,
  createdAt: new Date(0),
  createdBy: { id: "1", username: "tester" },
  notes: [],
  isResolved: false,
}

test.each([
  ["h-l", ["high", "medium", "low"]],
  ["l-h", ["low", "medium", "high"]],
] as const)("sorts %s with all priority levels", (order, expected) => {
  const records = (["high", "low", "medium"] as const).map((priority) => ({ ...bug, priority }))
  expect(sortBugs(records, order).map((b) => b.priority)).toEqual(expected)
})
test("late requests cannot overwrite the project selected since the request began", () => {
  const state = bugs({}, { type: c.GET_REQUEST, scope: "project:b", requestId: 2 })
  expect(bugs(state, { type: c.GET_SUCCESS, scope: "project:a", requestId: 1, bugsData: [] })).toBe(state)
  expect(bugs(state, { type: c.GET_FAILURE, requestId: 1, error: "failed" })).toBe(state)
})
test("closing and reopening apply the dates returned by the server", () => {
  const state = { data: [bug] }
  const closed = bugs(state, {
    type: c.CLOSE_SUCCESS,
    bugId: "bug",
    data: { closedAt: new Date("2026-01-01"), reopenedAt: null },
  })
  expect(closed.data[0]).toMatchObject({ isResolved: true, closedAt: new Date("2026-01-01") })
  const reopened = bugs(closed, {
    type: c.REOPEN_SUCCESS,
    bugId: "bug",
    data: { reopenedAt: new Date("2026-01-02"), closedAt: null },
  })
  expect(reopened.data[0]).toMatchObject({
    isResolved: false,
    reopenedAt: new Date("2026-01-02"),
    closedAt: null,
  })
})

test("switching projects hides the previous list before the new request starts", () => {
  const state = { bugs: { scope: "project:a", data: [{ ...bug, id: "a-only" }] } }
  expect(selectBugList(state, "project:a").data).toEqual([{ ...bug, id: "a-only" }])
  expect(selectBugList(state, "project:b").data).toEqual([])
})
