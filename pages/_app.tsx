import { Provider } from 'react-redux';
import { createEmotionCache, useStore } from '../utils';
import AlertProvider from '../components/AlertProvider/AlertProvider';
import AppStateProvider from '../components/AppStateProvider/AppStateProvider';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import Layout from '../layouts/Layout/Layout';
import ThemeConfig from '../theme/ThemeConfig';
import Meta from '../components/Meta/Meta';
import 'simplebar/dist/simplebar.min.css';

/* Client-side cache, shared for the whole session of the user in the browser */
const clientSideEmotionCache = createEmotionCache();

const App = function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  const appStore = useStore(pageProps.initialReduxState);
  const PageLayout = Component.Layout || Layout;

  return (
    <Provider store={appStore}>
      <Meta />
      <ThemeConfig emotionCache={emotionCache}>
        <AlertProvider>
          <AppStateProvider>
            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>
            <BottomNavBar />
          </AppStateProvider>
        </AlertProvider>
      </ThemeConfig>
    </Provider>
  );
};
export default App;
