import { render, screen } from "@testing-library/react"
import ErrorDialogue from "./ErrorDialogue"

test("renders the error message supplied by the page", () => {
  render(<ErrorDialogue displayText={"Could not load bugs"} />)
  expect(screen.getByRole("heading", { name: "Could not load bugs" })).toBeVisible()
})
