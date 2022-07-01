import React, { useState } from 'react';
import { Dialog, DialogContent, Button, IconButton, MenuItem, Fab } from '@mui/material';
import { DialogTitle } from './CustomDialogTitle/CustomDialogTitle';
import HideOnScroll from '../HideOnScroll/HideOnScroll';
import { TriggerButtonTypes } from '../types';

const FormDialog: React.FC<{
  title: string;
  triggerBtn: TriggerButtonTypes;
  children: React.ReactNode;
}> = function FormDialog({ triggerBtn, children, title }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    if (triggerBtn.type === 'menu' && triggerBtn.closeMenu) triggerBtn.closeMenu();
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
            size={triggerBtn.size || 'large'}
            color={triggerBtn.color || 'primary'}
            onClick={handleDialogOpen}
          >
            <triggerBtn.icon
              style={{
                marginRight: triggerBtn.variant === 'extended' ? '0.3em' : 0,
              }}
            />
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
        className={triggerBtn.className}
      >
        {triggerBtn.text}
      </Button>
    );
  };

  const proppedChildren = React.isValidElement(children)
    ? React.cloneElement(children, {
        closeDialog: handleDialogClose,
      })
    : children;

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle onClose={handleDialogClose}>{title}</DialogTitle>
        <DialogContent>{proppedChildren}</DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
