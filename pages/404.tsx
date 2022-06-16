import { motion } from 'framer-motion';
import { Box, Button, Typography, Container } from '@mui/material';
import Link from '../components/Link/Link';
import { MotionContainer, varBounceIn } from '../components/MotionContainer';
import ErrorLayout from '../layouts/ErrorLayout/ErrorLayout';

function Page404() {
  return (
    <Container>
      <MotionContainer initial="initial" open>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <motion.div variants={varBounceIn}>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>
          </motion.div>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <motion.div variants={varBounceIn}>
            <Box sx={{ padding: '50px' }}>
              <Typography sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main' }}>
                404
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
}

Page404.Layout = ErrorLayout;

export default Page404;
