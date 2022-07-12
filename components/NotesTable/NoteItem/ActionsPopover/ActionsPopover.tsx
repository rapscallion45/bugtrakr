import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha } from '@mui/material/styles';
import { Button, Box, IconButton } from '@mui/material';
import MenuPopover from '../../../MenuPopover/MenuPopover';
import ConfirmDialog from '../../../ConfirmDialog/ConfirmDialog';
import FormDialog from '../../../FormDialog/FormDialog';
import NoteForm from '../../../NoteForm/NoteForm';
import { noteActions } from '../../../../redux/actions';
import { AppState } from '../../../../redux/reducers';
import { INote } from '../../../../redux/types/types';

interface ActionsPopoverProps {
  note: INote;
  bugId: string | string[];
  projectId: string | string[];
  isAdmin: boolean;
  isMobile: boolean;
  iconSize?: 'small' | 'inherit' | 'large';
}

const ActionsPopover: FC<ActionsPopoverProps> = function ActionsPopover({
  note,
  bugId,
  projectId,
  isAdmin,
  isMobile,
  iconSize,
}) {
  const dispatch = useDispatch();
  const { data: bugs } = useSelector((state: AppState) => state.bugs);
  const { deletingNote } = bugs.find((b) => b.id === bugId);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: number, closeDialog: () => void) => {
    dispatch(noteActions.deleteNote(projectId, bugId, id, closeDialog));
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
        {isAdmin && (
          <>
            <FormDialog
              triggerBtn={{
                type: 'menu',
                icon: EditOutlinedIcon,
                iconStyle: { marginRight: '10px' },
                text: 'Edit Note',
                closeMenu: handleCloseMenu,
              }}
              title="Edit Note"
            >
              <NoteForm
                isEditMode
                projectId={projectId}
                bugId={bugId}
                noteId={note?.id}
                currentBody={note?.body}
              />
            </FormDialog>
            <ConfirmDialog
              title="Confirm Delete Note"
              contentText="Are you sure you want to permanently delete this note?"
              actionBtnText="Delete"
              triggerBtn={{
                type: 'menu',
                text: 'Delete Note',
                icon: DeleteOutlineIcon,
                iconStyle: { marginRight: '10px' },
                closeMenu: handleCloseMenu,
              }}
              processing={deletingNote}
              actionFunc={(closeDialog) => handleDelete(note?.id, closeDialog)}
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
