import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Button, Box, IconButton } from '@mui/material';
import MenuPopover from '../MenuPopover/MenuPopover';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import FormDialog from '../FormDialog/FormDialog';
import BugForm from '../BugForm/BugForm';
import { bugActions } from '../../redux/actions';
import { AppState } from '../../redux/reducers';
import { IBugPayload } from '../../redux/types/types';

interface BugMenuProps {
  bugId: string;
  projectId: string;
  currentData: IBugPayload;
  iconSize?: 'small' | 'inherit' | 'large';
}

const BugMenu: FC<BugMenuProps> = function BugMenu({ bugId, projectId, currentData, iconSize }) {
  const dispatch = useDispatch();
  const { deleting } = useSelector((state: AppState) => state.bugs);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: string, closeDialog: () => void) => {
    dispatch(bugActions.deleteBug(projectId, id, closeDialog));
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
        <FormDialog
          triggerBtn={{
            type: 'menu',
            icon: EditOutlinedIcon,
            iconStyle: { marginRight: '10px' },
            text: 'Edit Bug Info',
            closeMenu: handleCloseMenu,
          }}
          title="Edit Bug Info"
        >
          <BugForm isEditMode projectId={projectId} currentData={currentData} bugId={bugId} />
        </FormDialog>
        <FormDialog
          triggerBtn={{
            type: 'menu',
            icon: NoteAddIcon,
            iconStyle: { marginRight: '10px' },
            text: `Add Note`,
            closeMenu: handleCloseMenu,
          }}
          title="Add Note to Bug"
        >
          {/* <NoteForm
            editMode="members"
            projectId={projectId}
            currentName={currentName}
            currentMembers={currentMembers}
          /> */}
        </FormDialog>
        <ConfirmDialog
          title="Confirm Delete Bug"
          contentText="Are you sure you want to permanently delete this bug?"
          actionBtnText="Delete"
          triggerBtn={{
            type: 'menu',
            text: 'Delete Bug',
            icon: DeleteOutlineIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
          }}
          processing={deleting}
          actionFunc={(closeDialog) => handleDelete(bugId, closeDialog)}
        />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleCloseMenu}>
            Close
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};
export default BugMenu;
