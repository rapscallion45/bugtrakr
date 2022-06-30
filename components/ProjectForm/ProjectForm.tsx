import { useSelector } from 'react-redux';
import {
  TextField,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  InputAdornment,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import GroupIcon from '@mui/icons-material/Group';
import usePrjectFormController from './ProjectFormController';

interface BaseType {
  closeDialog?: () => void;
}

interface CreateProject extends BaseType {
  editMode: null;
  currentName?: string;
  currentMembers?: string[];
  projectId?: string;
}

interface EditProjectName extends BaseType {
  editMode: 'name';
  currentName: string;
  projectId: string;
  currentMembers?: string[];
}

interface AddProjectMembers extends BaseType {
  editMode: 'members';
  currentMembers: string[];
  projectId: string;
  currentName?: string;
}

type ProjectFormProps = CreateProject | EditProjectName | AddProjectMembers;

const ProjectForm: React.FC<ProjectFormProps> = function ProjectForm({
  closeDialog,
  editMode,
  currentName,
  currentMembers = [],
  projectId,
}) {
  const { data: users } = useSelector((state) => state.users);
  const { creating, updating, formik, setSelectedMembers, handleEditMembers } =
    usePrjectFormController(editMode, projectId, currentName, currentMembers, closeDialog);

  const selectMembersOnChange = (e: any, selectedOption: User[]) => {
    setSelectedMembers(selectedOption.map((user) => user.id));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {editMode !== 'members' && (
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          id="name"
          name="name"
          label="Project Name"
          type="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          autoComplete="on"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LabelImportantIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      )}
      {editMode !== 'name' && (
        <Autocomplete
          style={{ marginTop: '1.5em' }}
          multiple
          filterSelectedOptions
          onChange={selectMembersOnChange}
          options={
            editMode !== 'members' ? users : users.filter((u) => !currentMembers?.includes(u.id))
          }
          getOptionLabel={(option) => option.username}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              required={editMode === 'members'}
              label="Select Users"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start" style={{ paddingLeft: '0.4em' }}>
                      <GroupIcon color="primary" />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <ListItem dense component="div" {...props}>
              <ListItemAvatar>
                <Avatar>{option.username?.slice(0, 1)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={option.username}
                primaryTypographyProps={{
                  variant: 'h6',
                }}
              />
            </ListItem>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                avatar={<Avatar>{option.username.slice(0, 1)}</Avatar>}
                variant="outlined"
                label={option.username}
                {...getTagProps({ index })}
              />
            ))
          }
        />
      )}
      {editMode === 'members' && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={updating}
          sx={{ padding: '10px 0', marginTop: '20px' }}
          onClick={handleEditMembers}
        >
          {!updating && 'Submit'}
          {updating && <CircularProgress size={25} color="inherit" />}
        </Button>
      )}
      {editMode === 'name' && (
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
      {!editMode && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={creating}
          sx={{ padding: '10px 0', marginTop: '20px' }}
        >
          {!creating && 'Create Project'}
          {creating && <CircularProgress size={25} color="inherit" />}
        </Button>
      )}
    </form>
  );
};

export default ProjectForm;
