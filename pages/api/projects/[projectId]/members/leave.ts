import withBackendIdentity from "../../../../../lib/backendIdentity"
import { leaveProject } from "../../../../../lib/api"

export default withBackendIdentity(async (req, res, identity) => {
  /* get req params */
  const { method, body } = req

  /* determine which request type this is */
  switch (method) {
    case "POST":
      /* call api */
      try {
        const response = await leaveProject(identity.token, body.id)

        /* send back server response */
        if (response.status === 204) {
          return res.status(200).json({ message: "Leave ok." })
        }

        const data = await response.json()
        return res.status(400).json({ message: data.message })
      } catch (error) {
        return res.status(501).json({
          message: "Oops, something went wrong with the request.",
          error,
        })
      }
    default:
      /* Return 404 if someone pings the API with an unsupported method */
      return res.status(404).send("Not found")
  }
})
