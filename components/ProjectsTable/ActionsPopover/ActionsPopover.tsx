import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const anchorRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleAddUser = () => {
    if (currentMembers.length) handleClose();
    handleClose();
  };

  const handleDelete = () => {
    dispatch(projectActions.deleteProject(projectId));
    handleClose();
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        {!isMobile && <MoreHorizIcon color="primary" fontSize={iconSize || 'medium'} />}
        {isMobile && <MoreVertIcon fontSize={iconSize || 'medium'} />}
      </IconButton>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
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
          onClick={handleClose}
          sx={{ typography: 'body2', py: 1, px: 2.5 }}
        >
          <InfoIcon sx={{ marginRight: '10px' }} />
          Project Details
        </MenuItem>
        {isAdmin && (
          <>
            <MenuItem onClick={handleEdit} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
              <EditOutlinedIcon sx={{ marginRight: '10px' }} />
              Edit Name
            </MenuItem>
            <MenuItem onClick={handleAddUser} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
              <PersonAddIcon sx={{ marginRight: '10px' }} />
              Add Users
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
              <DeleteOutlineIcon sx={{ marginRight: '10px' }} />
              Delete
            </MenuItem>
          </>
        )}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};
export default ActionsPopover;
