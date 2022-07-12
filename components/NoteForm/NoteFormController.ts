import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { noteActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

const useNoteFormController = (
  noteId: number,
  projectId: string | string[],
  bugId: string | string[],
  isEditMode: boolean,
  currentBody: string,
  closeDialog: () => void
) => {
  const dispatch = useDispatch();
  const { creating, updating } = useSelector((state: AppState) => state.notes);

  const validationSchema = Yup.object().shape({
    body: Yup.string().required('Bug description is required'),
  });

  const handleSubmit = (payload: string) => {
    if (isEditMode) {
      dispatch(noteActions.updateNote(projectId, noteId, payload, closeDialog));
    } else {
      dispatch(noteActions.createNote(projectId, bugId, payload, closeDialog));
    }
  };

  const formik = useFormik({
    initialValues: {
      body: currentBody || '',
    },
    validationSchema,
    onSubmit: ({ body }) => {
      handleSubmit(body);
    },
  });

  return { creating, updating, formik };
};
export default useNoteFormController;
