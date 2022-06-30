import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { projectActions } from '../../redux/actions';

const usePrjectFormController = (editMode, projectId, currentName, currentMembers, closeDialog) => {
  const dispatch = useDispatch();
  const [selectedMembers, setSelectedMembers] = useState<string[]>(currentMembers);
  const { creating, updating } = useSelector((state) => state.projects);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Project name is required')
      .max(60, 'Project name must not exceed 60 characters'),
  });

  const handleSubmit = (name: string) => {
    switch (editMode) {
      case 'members':
        break;
      case 'name':
        dispatch(projectActions.updateProject(projectId, name, closeDialog));
        break;
      default:
        dispatch(projectActions.createProject(name, selectedMembers, closeDialog));
        break;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: currentName || '',
    },
    validationSchema,
    onSubmit: ({ name }) => {
      handleSubmit(name);
    },
  });

  const handleEditMembers = () => {
    dispatch(projectActions.updateProjectMembers(projectId, selectedMembers, closeDialog));
  };

  return { creating, updating, formik, setSelectedMembers, handleEditMembers };
};
export default usePrjectFormController;
