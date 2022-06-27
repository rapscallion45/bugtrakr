import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import useUserProfileFormController from './UserProfileFormController';

const UserProfile: FC = function UserProfile() {
  const { userFirstName, userAvatarSrc, formik, updating } = useUserProfileFormController();

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '50px 20px',
            }}
          >
            <Avatar
              alt={userFirstName}
              src={userAvatarSrc}
              sx={{ width: '100px', height: '100px' }}
            />
            <Box
              sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '30px',
              }}
            >
              <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
                {formik.values.firstName} {formik.values.lastName}
              </Typography>
              <Typography
                variant="body2"
                component="h4"
                color="text.secondary"
                sx={{ textAlign: 'center' }}
              >
                {formik.values.email}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: '20px' }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="username"
                    name="username"
                    label="Username"
                    type="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="end" spacing={2} sx={{ marginTop: '5px' }}>
                  <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={updating}
                    >
                      {!updating && 'Save'}
                      {updating && <CircularProgress size={25} color="inherit" />}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default UserProfile;
