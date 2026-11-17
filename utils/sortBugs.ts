import { IBugState, BugSortValues } from "../redux/types/types"

const sortBugs = (bugs: IBugState[], sortBy: BugSortValues) => {
  const priorityRank = { low: 0, medium: 1, high: 2 }
  switch (sortBy) {
    case "oldest":
      return bugs.slice().sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))

    case "a-z":
      return bugs.slice().sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" }))

    case "z-a":
      return bugs.slice().sort((a, b) => b.title.localeCompare(a.title, "en", { sensitivity: "base" }))

    case "h-l":
      return bugs.slice().sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority])
    case "l-h":
      return bugs.slice().sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])

    case "closed":
      return bugs.slice().sort((a, b) => {
        if (!a.closedAt) {
          return 1
        }

        if (!b.closedAt) {
          return -1
        }

        return +new Date(b.closedAt) - +new Date(a.closedAt)
      })

    case "reopened":
      return bugs.slice().sort((a, b) => {
        if (!a.reopenedAt) {
          return 1
        }

        if (!b.reopenedAt) {
          return -1
        }

        return +new Date(b.reopenedAt) - +new Date(a.reopenedAt)
      })

    case "updated":
      return bugs.slice().sort((a, b) => {
        if (!a.updatedAt) {
          return 1
        }

        if (!b.updatedAt) {
          return -1
        }

        return +new Date(b.updatedAt) - +new Date(a.updatedAt)
      })

    case "most-notes":
      return bugs.slice().sort((a, b) => b.notes.length - a.notes.length)

    case "least-notes":
      return bugs.slice().sort((a, b) => a.notes.length - b.notes.length)

    case "newest":
    default:
      return bugs.slice().sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  }
}

export default sortBugs
