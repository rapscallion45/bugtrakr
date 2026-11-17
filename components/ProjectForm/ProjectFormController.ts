import { useState } from "react"
import { useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import useAppDispatch from "../../hooks/useAppDispatch"
import { projectActions } from "../../redux/actions"
import { AppState } from "../../redux/reducers"

const useProjectFormController = (editMode, projectId, currentName, currentMembers, closeDialog) => {
  const dispatch = useAppDispatch()
  const [selectedMembers, setSelectedMembers] = useState<string[]>(editMode === "members" ? [] : currentMembers)
  const { creating, updating } = useSelector((state: AppState) => state.projects)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Project name is required").max(60, "Project name must not exceed 60 characters"),
  })

  const handleSubmit = (name: string) => {
    switch (editMode) {
      case "members":
        break
      case "name":
        dispatch(projectActions.updateProject(projectId, name, closeDialog))
        break
      default:
        dispatch(projectActions.createProject({ name, members: selectedMembers }, closeDialog))
        break
    }
  }

  const formik = useFormik<{ name: string }>({
    initialValues: {
      name: currentName || "",
    },
    validationSchema,
    onSubmit: ({ name }) => {
      handleSubmit(name)
    },
  })

  const handleEditMembers = () => {
    dispatch(projectActions.updateProjectMembers(projectId, selectedMembers, closeDialog))
  }

  return {
    creating,
    updating,
    formik,
    canAddMembers: selectedMembers.length > 0,
    setSelectedMembers,
    handleEditMembers,
  }
}
export default useProjectFormController
