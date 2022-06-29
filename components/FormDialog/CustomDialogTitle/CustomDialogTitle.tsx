import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import { withStyles, Theme, WithStyles, createStyles } from '@mui/styles';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.secondary.main,
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  onClose: () => void;
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle {...other}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6">{children}</Typography>
        <Box display="flex" justifyContent="right" sx={{ flexGrow: 1 }}>
          {onClose && (
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
