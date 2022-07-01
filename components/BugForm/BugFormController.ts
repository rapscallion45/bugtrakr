import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IBugPayload } from '../../redux/types/types';
import { bugActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useBugFormController = (
  bugId: string,
  isEditMode: boolean,
  projectId: string | string[],
  currentData: IBugPayload,
  closeDialog: () => void
) => {
  const dispatch = useDispatch();
  const { creating, updating } = useSelector((state: AppState) => state.bugs);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Bug title is required')
      .max(60, 'Bug title must not exceed 60 characters'),
    description: Yup.string().required('Bug description is required'),
  });

  const handleSubmit = (payload: IBugPayload) => {
    if (isEditMode) {
      dispatch(bugActions.updateBug(projectId, bugId, payload, closeDialog));
    } else {
      dispatch(bugActions.createBug(projectId, payload, closeDialog));
    }
  };

  const formik = useFormik({
    initialValues: {
      title: currentData?.title || '',
      description: currentData?.description || '',
      priority: currentData?.priority || 'low',
    },
    validationSchema,
    onSubmit: ({ title, description, priority }) => {
      handleSubmit({ title, description, priority });
    },
  });

  return { creating, updating, formik };
};
export default useBugFormController;
