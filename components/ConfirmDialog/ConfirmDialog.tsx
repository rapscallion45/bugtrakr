import { useState } from 'react';
import {
  Button,
  IconButton,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Fab,
  CircularProgress,
} from '@mui/material';
import HideOnScroll from '../HideOnScroll/HideOnScroll';
import { TriggerButtonTypes } from '../types';

const ConfirmDialog: React.FC<{
  title: string;
  contentText: string;
  actionBtnText: string;
  triggerBtn: TriggerButtonTypes;
  processing: boolean;
  actionFunc: (closeDialog: () => void) => void;
}> = function ConfirmDialog({
  title,
  contentText,
  actionBtnText,
  triggerBtn,
  processing,
  actionFunc,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    if (triggerBtn.type === 'menu' && triggerBtn.closeMenu) triggerBtn.closeMenu();
  };

  const handleConfirmedAction = () => {
    actionFunc(handleDialogClose);
  };

  const triggerButton = () => {
    if (triggerBtn.type === 'icon') {
      return (
        <IconButton
          color={triggerBtn.color || 'primary'}
          onClick={handleDialogOpen}
          size={triggerBtn.size || 'medium'}
          className={triggerBtn.className}
          style={triggerBtn.style}
        >
          <triggerBtn.icon fontSize={triggerBtn.iconSize || 'inherit'} />
        </IconButton>
      );
    }
    if (triggerBtn.type === 'menu') {
      return (
        <MenuItem onClick={handleDialogOpen}>
          <triggerBtn.icon style={triggerBtn.iconStyle} />
          {triggerBtn.text}
        </MenuItem>
      );
    }
    if (triggerBtn.type === 'fab') {
      return (
        <HideOnScroll>
          <Fab
            variant={triggerBtn.variant || 'circular'}
            size={triggerBtn.size || 'medium'}
            color={triggerBtn.color || 'primary'}
            onClick={handleDialogOpen}
          >
            <triggerBtn.icon />
            {triggerBtn.variant === 'extended' && triggerBtn.text}
          </Fab>
        </HideOnScroll>
      );
    }
    if (triggerBtn.type === 'round') {
      return (
        <Button
          color={triggerBtn.color || 'primary'}
          variant={triggerBtn.variant || 'contained'}
          size={triggerBtn.size || 'medium'}
          onClick={handleDialogOpen}
          style={triggerBtn.style}
        >
          <triggerBtn.icon />
        </Button>
      );
    }
    return (
      <Button
        color={triggerBtn.color || 'primary'}
        variant={triggerBtn.variant || 'contained'}
        size={triggerBtn.size || 'medium'}
        startIcon={<triggerBtn.icon />}
        onClick={handleDialogOpen}
        style={triggerBtn.style}
      >
        {triggerBtn.text}
      </Button>
    );
  };

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      <Dialog open={dialogOpen} onClose={handleDialogOpen}>
        <DialogTitle>
          <Typography color="text.primary" variant="h6">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Typography>{contentText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="secondary"
            variant="contained"
            size="small"
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmedAction}
            color="primary"
            variant="contained"
            size="small"
            disabled={processing}
          >
            {!processing && actionBtnText}
            {processing && <CircularProgress size={22} color="inherit" />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
