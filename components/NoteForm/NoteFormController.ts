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
  const { data: bugs } = useSelector((state: AppState) => state.bugs);
  const { creatingNote, updatingNote } = bugs.find((b) => b.id === bugId);

  const validationSchema = Yup.object().shape({
    body: Yup.string().required('Bug description is required'),
  });

  const handleSubmit = (payload: string) => {
    if (isEditMode) {
      dispatch(noteActions.updateNote(projectId, bugId, noteId, payload, closeDialog));
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

  return { creatingNote, updatingNote, formik };
};
export default useNoteFormController;
