import { motion } from 'framer-motion';
import { Box, Button, Typography, Container } from '@mui/material';
import Link from '../components/Link/Link';
import { MotionContainer, varBounceIn } from '../components/MotionContainer';
import ErrorLayout from '../layouts/ErrorLayout/ErrorLayout';

const Page505 = function Page505() {
  return (
    <Container>
      {/* @ts-ignore */}
      <MotionContainer initial="initial" open>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <motion.div variants={varBounceIn}>
            <Typography variant="h3" paragraph>
              Houston, we have a problem!
            </Typography>
          </motion.div>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, there has been a technical error. Please check back later while we get this
            fixed!
          </Typography>

          <motion.div variants={varBounceIn}>
            <Box sx={{ padding: '50px' }}>
              <Typography sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main' }}>
                505
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ padding: '0 50px 100px 50px' }}>
            <Button href="/" size="large" variant="contained" component={Link}>
              Go to Home
            </Button>
          </Box>
        </Box>
      </MotionContainer>
    </Container>
  );
};

Page505.Layout = ErrorLayout;

export default Page505;
