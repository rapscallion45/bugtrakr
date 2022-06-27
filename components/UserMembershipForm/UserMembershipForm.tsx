import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import Typography from '@mui/material/Typography';

const UserMemerbershipForm: FC = function UserMemerbershipForm() {
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
              padding: '20px',
            }}
          >
            <Box
              sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '30px',
              }}
            >
              <Typography
                variant="body2"
                component="h4"
                color="text.secondary"
                sx={{ textAlign: 'center', textTransform: 'uppercase' }}
                py={1}
              >
                Basic
              </Typography>
              <Typography variant="h1" component="h4" sx={{ textAlign: 'center' }} py={2}>
                FREE
              </Typography>
              <Typography
                variant="body2"
                component="h4"
                color="primary"
                sx={{ textAlign: 'center' }}
                py={2}
              >
                Forever
              </Typography>
              <Box pb={2} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Unlimited personal projects" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <CheckIcon />
                        </ListItemIcon>
                        <ListItemText primary="Unlimited personal bugs" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <DoNotDisturbAltIcon color="disabled" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body" color="text.secondary" py={1}>
                              Team member bug assignment
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <DoNotDisturbAltIcon color="disabled" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body" color="text.secondary" py={1}>
                              Bug/project push notifications
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </Box>
              <Button type="submit" fullWidth variant="contained" color="primary" disabled>
                Current Plan
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default UserMemerbershipForm;
