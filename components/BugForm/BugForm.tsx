import {
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  InputAdornment,
  FormLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import SubjectIcon from '@mui/icons-material/Subject';
import { IBugPayload } from '../../redux/types/types';
import useBugFormController from './BugFormController';

interface BugFormProps {
  closeDialog?: () => void;
  projectId: string | string[];
  isEditMode: boolean;
  currentData?: IBugPayload;
  bugId?: string;
}

const BugForm: React.FC<BugFormProps> = function BugForm({
  closeDialog,
  projectId,
  isEditMode,
  currentData,
  bugId,
}) {
  const { creating, updating, formik } = useBugFormController(
    bugId,
    isEditMode,
    projectId,
    currentData,
    closeDialog
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        id="title"
        name="title"
        label="Bug Title"
        type="text"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
        autoComplete="on"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LabelImportantIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        margin="normal"
        id="description"
        name="description"
        label="Description"
        type="text"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SubjectIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <FormControl>
        <RadioGroup
          value={formik.values.priority}
          onChange={formik.handleChange}
          name="priority"
          row
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <FormLabel sx={{ mr: 2 }}>Priority:</FormLabel>
          <div>
            <FormControlLabel value="low" control={<Radio color="primary" />} label="Low" />
            <FormControlLabel value="medium" control={<Radio color="primary" />} label="Medium" />
            <FormControlLabel value="high" control={<Radio color="primary" />} label="High" />
          </div>
        </RadioGroup>
      </FormControl>
      {!isEditMode ? (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={creating}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!creating && 'Create Bug'}
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

export default BugForm;
