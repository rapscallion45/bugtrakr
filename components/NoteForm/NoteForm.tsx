import { TextField, Button, InputAdornment, CircularProgress } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import useNoteFormController from './NoteFormController';

interface NoteFormProps {
  closeDialog?: () => void;
  noteId?: number;
  projectId: string | string[];
  bugId: string | string[];
  isEditMode: boolean;
  currentBody?: string;
}

const NoteForm: React.FC<NoteFormProps> = function NoteForm({
  closeDialog,
  noteId,
  projectId,
  bugId,
  isEditMode,
  currentBody,
}) {
  const { creatingNote, updatingNote, formik } = useNoteFormController(
    noteId,
    projectId,
    bugId,
    isEditMode,
    currentBody,
    closeDialog
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        margin="normal"
        id="body"
        name="body"
        label="Note"
        type="text"
        value={formik.values.body}
        onChange={formik.handleChange}
        error={formik.touched.body && Boolean(formik.errors.body)}
        helperText={formik.touched.body && formik.errors.body}
        autoComplete="on"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CommentIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      {!isEditMode ? (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={creatingNote}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!creatingNote && 'Create Note'}
          {creatingNote && <CircularProgress size={25} color="inherit" />}
        </Button>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={updatingNote}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!updatingNote && 'Submit'}
          {updatingNote && <CircularProgress size={25} color="inherit" />}
        </Button>
      )}
    </form>
  );
};

export default NoteForm;
