import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { Button } from '@mui/material';
import AlertProvider from '../components/AlertProvider/AlertProvider';
import AppStateProvider from '../components/AppStateProvider/AppStateProvider';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Layout from '../layouts/Layout/Layout';
import ThemeConfig from '../theme/ThemeConfig';
import Meta from '../components/Meta/Meta';
import FeatureBar from '../components/FeatureBar/FeatureBar';
import { useAcceptCookies } from '../hooks';
import { createEmotionCache, useStore } from '../utils';
import 'simplebar/dist/simplebar.min.css';

/* Client-side cache, shared for the whole session of the user in the browser */
const clientSideEmotionCache = createEmotionCache();

const App = function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}) {
  const appStore = useStore(pageProps.initialReduxState);
  const PageLayout = Component.Layout || Layout;
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  return (
    <Provider store={appStore}>
      <SessionProvider session={session}>
        <Meta />
        <ThemeConfig emotionCache={emotionCache}>
          <AlertProvider>
            <AppStateProvider>
              <PageLayout>
                <FeatureBar
                  description="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
                  hide={acceptedCookies}
                  action={
                    <Button
                      variant="contained"
                      color="primary"
                      className="mx-5"
                      onClick={() => onAcceptCookies()}
                      sx={{ padding: '24px', backgroundColor: 'white', color: 'primary.main' }}
                    >
                      <b style={{ fontSize: '1rem' }}>Accept cookies</b>
                    </Button>
                  }
                />
                <Component {...pageProps} />
              </PageLayout>
              <BottomNavBar />
            </AppStateProvider>
          </AlertProvider>
        </ThemeConfig>
      </SessionProvider>
    </Provider>
  );
};
export default App;
