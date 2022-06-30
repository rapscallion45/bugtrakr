import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, IconButton, Typography } from '@mui/material';
import MenuPopover from '../../MenuPopover/MenuPopover';
import Link from '../../Link/Link';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog';
import FormDialog from '../../FormDialog/FormDialog';
import ProjectForm from '../../ProjectForm/ProjectForm';
import { projectActions } from '../../../redux/actions';

interface ProjectsMenuProps {
  projectId: string;
  currentName: string;
  currentMembers?: string[];
  isAdmin: boolean;
  isMobile: boolean;
  iconSize?: 'small' | 'default' | 'large';
}

const ActionsPopover: FC<ProjectsMenuProps> = function ActionsPopover({
  projectId,
  currentName,
  currentMembers = [],
  isAdmin,
  isMobile,
  iconSize,
}) {
  const dispatch = useDispatch();
  const { deleting } = useSelector((state) => state.projects);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: string, closeDialog: () => void) => {
    dispatch(projectActions.deleteProject(id, closeDialog));
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
        {!isMobile && <MoreHorizIcon color="primary" fontSize={iconSize || 'medium'} />}
        {isMobile && <MoreVertIcon fontSize={iconSize || 'medium'} />}
      </IconButton>
      <MenuPopover
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        keepMounted
        anchorEl={anchorEl}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="h5" noWrap>
            {currentName}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          component={Link}
          href={`/dashboard/projects/${projectId}`}
          onClick={handleCloseMenu}
          sx={{ typography: 'body', py: 1, px: 2 }}
        >
          <InfoIcon sx={{ marginRight: '10px' }} />
          Project Details
        </MenuItem>
        {isAdmin && (
          <>
            <FormDialog
              triggerBtn={{
                type: 'menu',
                icon: EditOutlinedIcon,
                iconStyle: { marginRight: '10px' },
                text: 'Edit Name',
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
                text: 'Add Users',
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
export default ActionsPopover;
