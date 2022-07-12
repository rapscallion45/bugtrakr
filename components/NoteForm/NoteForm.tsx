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
  const { creating, updating, formik } = useNoteFormController(
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
          disabled={creating}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!creating && 'Create Note'}
          {creating && <CircularProgress size={25} color="inherit" />}
        </Button>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={updating}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!updating && 'Submit'}
          {updating && <CircularProgress size={25} color="inherit" />}
        </Button>
      )}
    </form>
  );
};

export default NoteForm;
