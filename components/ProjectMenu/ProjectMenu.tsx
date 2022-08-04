import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Button, Box, IconButton } from '@mui/material';
import MenuPopover from '../MenuPopover/MenuPopover';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import FormDialog from '../FormDialog/FormDialog';
import ProjectForm from '../ProjectForm/ProjectForm';
import { projectActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';

interface ProjectsMenuProps {
  projectId: string;
  currentName: string;
  currentMembers?: string[];
  isAdmin: boolean;
  iconSize?: 'small' | 'inherit' | 'large';
}

const ProjectMenu: FC<ProjectsMenuProps> = function ProjectMenu({
  projectId,
  currentName,
  currentMembers = [],
  isAdmin,
  iconSize,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { deleting } = useSelector((state: AppState) => state.projects);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const handleDelete = (id: string, closeDialog: () => void) => {
    dispatch(projectActions.deleteProject(id, closeDialog, goToDashboard));
  };

  return (
    <>
      <IconButton
        size="large"
        color={anchorEl ? 'primary' : 'default'}
        onClick={handleOpenMenu}
        sx={{
          ...(Boolean(anchorEl) && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <MoreVertIcon fontSize={iconSize || 'medium'} />
      </IconButton>
      <MenuPopover
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        keepMounted
        anchorEl={anchorEl}
        sx={{ width: 220 }}
      >
        {isAdmin && (
          <>
            <FormDialog
              triggerBtn={{
                type: 'menu',
                icon: EditOutlinedIcon,
                iconStyle: { marginRight: '10px' },
                text: 'Edit Project Name',
                closeMenu: handleCloseMenu,
              }}
              title={`Edit Name of Project "${currentName}"`}
            >
              <ProjectForm editMode="name" projectId={projectId} currentName={currentName} />
            </FormDialog>
            <FormDialog
              triggerBtn={{
                type: 'menu',
                icon: PersonAddIcon,
                iconStyle: { marginRight: '10px' },
                text: `Add Users to Project`,
                closeMenu: handleCloseMenu,
              }}
              title={`Add Users to "${currentName}"`}
            >
              <ProjectForm
                editMode="members"
                projectId={projectId}
                currentName={currentName}
                currentMembers={currentMembers}
              />
            </FormDialog>
            <ConfirmDialog
              title="Confirm Delete Project"
              contentText={`Are you sure you want to permanently delete project "${currentName}"?`}
              actionBtnText="Delete"
              triggerBtn={{
                type: 'menu',
                text: 'Delete Project',
                icon: DeleteOutlineIcon,
                iconStyle: { marginRight: '10px' },
                closeMenu: handleCloseMenu,
                color: 'error',
              }}
              processing={deleting}
              actionFunc={(closeDialog) => handleDelete(projectId, closeDialog)}
            />
          </>
        )}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleCloseMenu}>
            Close
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};
export default ProjectMenu;
