import { FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { CardContent, CardHeader } from '@mui/material';
import useUserBillingFormController from './UserBillingFormController';

const UserBillingForm: FC = function UserBillingForm() {
  const { formikPayment, formikAddress, updating } = useUserBillingFormController();

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card sx={{ padding: '20px' }}>
            <CardHeader title="Payment Details" />
            <CardContent>
              <form onSubmit={formikPayment.handleSubmit}>
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
                      value={formikPayment.values.nameOnCard}
                      onChange={formikPayment.handleChange}
                      error={
                        formikPayment.touched.nameOnCard && Boolean(formikPayment.errors.nameOnCard)
                      }
                      helperText={
                        formikPayment.touched.nameOnCard && formikPayment.errors.nameOnCard
                      }
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
                      value={formikPayment.values.cardNumber}
                      onChange={formikPayment.handleChange}
                      error={
                        formikPayment.touched.cardNumber && Boolean(formikPayment.errors.cardNumber)
                      }
                      helperText={
                        formikPayment.touched.cardNumber && formikPayment.errors.cardNumber
                      }
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
                      value={formikPayment.values.expireDate}
                      onChange={formikPayment.handleChange}
                      error={
                        formikPayment.touched.expireDate && Boolean(formikPayment.errors.expireDate)
                      }
                      helperText={
                        formikPayment.touched.expireDate && formikPayment.errors.expireDate
                      }
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
                      value={formikPayment.values.cvc}
                      onChange={formikPayment.handleChange}
                      error={formikPayment.touched.cvc && Boolean(formikPayment.errors.cvc)}
                      helperText={formikPayment.touched.cvc && formikPayment.errors.cvc}
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
        <Grid item xs={12} md={7}>
          <Card sx={{ padding: '20px' }}>
            <CardHeader title="Billing Address" />
            <CardContent>
              <form onSubmit={formikAddress.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="adress"
                      name="address"
                      label="Address"
                      type="string"
                      value={formikAddress.values.address}
                      onChange={formikAddress.handleChange}
                      error={formikAddress.touched.address && Boolean(formikAddress.errors.address)}
                      helperText={formikAddress.touched.address && formikAddress.errors.address}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="town"
                      name="town"
                      label="Town/City"
                      type="string"
                      value={formikAddress.values.town}
                      onChange={formikAddress.handleChange}
                      error={formikAddress.touched.town && Boolean(formikAddress.errors.town)}
                      helperText={formikAddress.touched.town && formikAddress.errors.town}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="county"
                      name="county"
                      label="County/State"
                      type="string"
                      value={formikAddress.values.county}
                      onChange={formikAddress.handleChange}
                      error={formikAddress.touched.county && Boolean(formikAddress.errors.county)}
                      helperText={formikAddress.touched.county && formikAddress.errors.county}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="country"
                      name="country"
                      label="Country"
                      type="string"
                      value={formikAddress.values.country}
                      onChange={formikAddress.handleChange}
                      error={formikAddress.touched.country && Boolean(formikAddress.errors.country)}
                      helperText={formikAddress.touched.country && formikAddress.errors.country}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="postcode"
                      name="postcode"
                      label="Postcode"
                      type="string"
                      value={formikAddress.values.postcode}
                      onChange={formikAddress.handleChange}
                      error={
                        formikAddress.touched.postcode && Boolean(formikAddress.errors.postcode)
                      }
                      helperText={formikAddress.touched.postcode && formikAddress.errors.postcode}
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
        <Grid item xs={12} md={8}>
          <Card sx={{ padding: '20px' }}>
            <CardHeader title="Invoices" />
            <CardContent>
              <Typography variant="body2" align="center" color="lightgrey">
                <b>No invoices to show.</b>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default UserBillingForm;
