import { FC, useRef, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, IconButton, Typography } from '@mui/material';
import MenuPopover from '../../MenuPopover/MenuPopover';
import Link from '../../Link/Link';

interface BugsMenuProps {
  bugId: string;
  currentData: any;
  isResolved: boolean;
  isMobile: boolean;
  iconSize?: 'small' | 'default' | 'large';
}

const ActionsPopover: FC<BugsMenuProps> = function ActionsPopover({
  bugId,
  currentData,
  isResolved,
  isMobile,
  iconSize,
}) {
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

  const handleCloseBug = () => {
    if (isResolved) handleClose();
    handleClose();
  };

  const handleAddNote = () => {
    handleClose();
  };

  const handleDelete = () => {
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
            {currentData.title}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          component={Link}
          href={`/dashboard/bugs/${bugId}`}
          onClick={handleClose}
          sx={{ typography: 'body2', py: 1, px: 2.5 }}
        >
          <InfoIcon sx={{ marginRight: '10px' }} />
          Bug Details
        </MenuItem>
        <MenuItem onClick={handleEdit} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
          <EditOutlinedIcon sx={{ marginRight: '10px' }} />
          Update Bug
        </MenuItem>
        <MenuItem onClick={handleCloseBug} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
          {isResolved && (
            <>
              <ReplayIcon sx={{ marginRight: '10px' }} />
              Reopen Bug
            </>
          )}
          {!isResolved && (
            <>
              <DoneOutlineIcon sx={{ marginRight: '10px' }} />
              Close Bug
            </>
          )}
        </MenuItem>
        <MenuItem onClick={handleAddNote} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
          <NoteAddIcon sx={{ marginRight: '10px' }} />
          Add Note
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ typography: 'body2', py: 1, px: 2.5 }}>
          <DeleteOutlineIcon sx={{ marginRight: '10px' }} />
          Delete
        </MenuItem>

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
