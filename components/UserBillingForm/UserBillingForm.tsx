import { FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { CardContent, CardHeader } from '@mui/material';
import useUserBillingFormController from './UserBillingFormController';

const UserBillingForm: FC = function UserBillingForm() {
  const { formik, updating } = useUserBillingFormController();

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card sx={{ padding: '20px' }}>
            <CardHeader title="Payment Details" />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="nameOnCard"
                      name="nameOnCard"
                      label="Name on Card"
                      type="nameOnCard"
                      value={formik.values.nameOnCard}
                      onChange={formik.handleChange}
                      error={formik.touched.nameOnCard && Boolean(formik.errors.nameOnCard)}
                      helperText={formik.touched.nameOnCard && formik.errors.nameOnCard}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="cardNumber"
                      name="cardNumber"
                      label="Card Number"
                      type="string"
                      value={formik.values.cardNamber}
                      onChange={formik.handleChange}
                      error={formik.touched.cardNamber && Boolean(formik.errors.cardNamber)}
                      helperText={formik.touched.cardNamber && formik.errors.cardNamber}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="expireDate"
                      name="expireDate"
                      label="Expires"
                      type="string"
                      value={formik.values.expireDate}
                      onChange={formik.handleChange}
                      error={formik.touched.expireDate && Boolean(formik.errors.expireDate)}
                      helperText={formik.touched.expireDate && formik.errors.expireDate}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="cvc"
                      name="cvc"
                      label="CVC"
                      type="string"
                      value={formik.values.cvc}
                      onChange={formik.handleChange}
                      error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                      helperText={formik.touched.cvc && formik.errors.cvc}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="end" spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                      <Button type="submit" fullWidth variant="contained" color="primary" disabled>
                        {!updating && 'Save'}
                        {updating && <CircularProgress size={25} color="inherit" />}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ padding: '20px' }}>
            <CardHeader title="Invoices" />
            <CardContent>No invoices to show.</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default UserBillingForm;
