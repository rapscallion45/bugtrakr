import { FC } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import useChangePasswordRequestFormController from './ChangePasswordRequestFormController';

const ChangePasswordRequestForm: FC = function ChangePasswordRequestForm() {
  const { requestingPassword, demo, changePasswordRequest } =
    useChangePasswordRequestFormController();

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card sx={{ display: 'flex', flexDirection: 'column', padding: '50px 20px' }}>
            <Typography variant="h5" component="h5" sx={{ textAlign: 'center' }}>
              Change Password Request
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{ padding: '20px 0', textAlign: 'center' }}
            >
              Clicking the link below will generate a new password reset link, which will be sent to
              your registered email address. Follow the link in the email to reset your password.
            </Typography>

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              disabled={requestingPassword || demo}
              onClick={changePasswordRequest}
              sx={{ margin: '20px 0', padding: '10px 0', alignSelf: 'center', maxWidth: '300px' }}
            >
              {!requestingPassword && 'Change Password'}
              {requestingPassword && <CircularProgress size={25} color="inherit" />}
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChangePasswordRequestForm;
