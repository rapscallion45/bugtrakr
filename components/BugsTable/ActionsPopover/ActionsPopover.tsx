import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '@mui/icons-material/Info';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, IconButton, Typography } from '@mui/material';
import MenuPopover from '../../MenuPopover/MenuPopover';
import Link from '../../Link/Link';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog';
import FormDialog from '../../FormDialog/FormDialog';
import BugForm from '../../BugForm/BugForm';
import { bugActions } from '../../../redux/actions';

interface BugsMenuProps {
  bugId: string;
  currentData: any;
  isResolved: boolean;
  isMobile: boolean;
  iconSize?: 'small' | 'default' | 'large';
  projectId: string | string[];
}

const ActionsPopover: FC<BugsMenuProps> = function ActionsPopover({
  bugId,
  currentData,
  isResolved,
  isMobile,
  iconSize,
  projectId,
}) {
  const dispatch = useDispatch();
  const { deleting, reopening, closing } = useSelector((state) => state.bugs);
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
            {currentData.title}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          component={Link}
          href={`/dashboard/bugs/${bugId}`}
          onClick={handleCloseMenu}
          sx={{ typography: 'body2', py: 1, px: 2.5 }}
        >
          <InfoIcon sx={{ marginRight: '10px' }} />
          Bug Details
        </MenuItem>
        <FormDialog
          triggerBtn={{
            type: 'menu',
            icon: EditOutlinedIcon,
            iconStyle: { marginRight: '10px' },
            text: 'Update Bug',
            closeMenu: handleCloseMenu,
          }}
          title="Update Bug"
        >
          <BugForm isEditMode projectId={projectId} currentData={currentData} bugId={bugId} />
        </FormDialog>

        {isResolved ? (
          <ConfirmDialog
            title="Confirm Reopen Bug"
            contentText={`Are you sure you want to reopen bug "${currentData?.title}"?`}
            actionBtnText="Reopen"
            triggerBtn={{
              type: 'menu',
              text: 'Reopen Bug',
              icon: ReplayIcon,
              iconStyle: { marginRight: '10px' },
              closeMenu: handleCloseMenu,
            }}
            processing={reopening}
            actionFunc={(closeDialog) => handleDelete(bugId, closeDialog)}
          />
        ) : (
          <ConfirmDialog
            title="Confirm Close Bug"
            contentText={`Are you sure you want to close bug "${currentData?.title}"?`}
            actionBtnText="Close"
            triggerBtn={{
              type: 'menu',
              text: 'Close Bug',
              icon: DoneOutlineIcon,
              iconStyle: { marginRight: '10px' },
              closeMenu: handleCloseMenu,
            }}
            processing={closing}
            actionFunc={(closeDialog) => handleDelete(bugId, closeDialog)}
          />
        )}
        <ConfirmDialog
          title="Confirm Delete Bug"
          contentText={`Are you sure you want to permanently delete bug "${currentData?.title}"?`}
          actionBtnText="Delete"
          triggerBtn={{
            type: 'menu',
            text: 'Delete Bug',
            icon: DeleteOutlineIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
            color: 'error',
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
export default ActionsPopover;
