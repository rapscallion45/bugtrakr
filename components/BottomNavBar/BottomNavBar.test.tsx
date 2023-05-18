import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import createEmotionCache from '../../utils/createEmotionCache';
import ThemeConfig from '../../theme/ThemeConfig';
import rootReducer from '../../redux/reducers';
import BottomNavBar from './BottomNavBar';
import routes from './routes';

let mockHideBottomBar = false;
let mockRouteValue = '/';

jest.mock(
  '@mui/material/useMediaQuery',
  () =>
    function mock() {
      return mockHideBottomBar;
    }
);

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: mockRouteValue,
      pathname: mockRouteValue,
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);

describe('Bottom Nav Bar', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer, {});
    const mockSession: Session = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c', uid: '324efgvb', id: '324efgvb', demo: false },
    };

    /* Act */
    const view = render(
      <Provider store={testStore}>
        <SessionProvider session={mockSession}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <BottomNavBar />
          </ThemeConfig>
        </SessionProvider>
      </Provider>
    );

    /* Assert */
    expect(toJson(view)).toMatchSnapshot();
  });

  describe('Show/Hide Bar', () => {
    it('Should not render if show flag not set', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {});
      const mockSession: Session = {
        expires: '1',
        user: {
          email: 'a',
          name: 'Delta',
          image: 'c',
          uid: '324efgvb',
          id: '324efgvb',
          demo: false,
        },
      };
      mockHideBottomBar = true;

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <SessionProvider session={mockSession}>
            <ThemeConfig emotionCache={createEmotionCache()}>
              <BottomNavBar />
            </ThemeConfig>
          </SessionProvider>
        </Provider>
      );

      /* Assert */
      expect(view.find('ForwardRef(BottomNavigation)').length).toBe(0);
    });

    it('Should not render if user logged out', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {});
      const mockSession = null;
      mockHideBottomBar = false;

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <SessionProvider session={mockSession}>
            <ThemeConfig emotionCache={createEmotionCache()}>
              <BottomNavBar />
            </ThemeConfig>
          </SessionProvider>
        </Provider>
      );

      /* Assert */
      expect(view.find('ForwardRef(BottomNavigation)').length).toBe(0);
    });
  });

  describe('Nav Routes', () => {
    it('Should have correct number of passed nav items', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {});
      const mockSession: Session = {
        expires: '1',
        user: {
          email: 'a',
          name: 'Delta',
          image: 'c',
          uid: '324efgvb',
          id: '324efgvb',
          demo: false,
        },
      };
      mockHideBottomBar = false;

      /* Act */
      const view = render(
        <Provider store={testStore}>
          <SessionProvider session={mockSession}>
            <ThemeConfig emotionCache={createEmotionCache()}>
              <BottomNavBar />
            </ThemeConfig>
          </SessionProvider>
        </Provider>
      );

      /* Assert */
      expect(view.children().length).toBe(routes.length);
    });

    it('Should set nav item to active according to current route', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {});
      const mockSession: Session = {
        expires: '1',
        user: {
          email: 'a',
          name: 'Delta',
          image: 'c',
          uid: '324efgvb',
          id: '324efgvb',
          demo: false,
        },
      };
      mockRouteValue = '/articles';

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <SessionProvider session={mockSession}>
            <ThemeConfig emotionCache={createEmotionCache()}>
              <BottomNavBar />
            </ThemeConfig>
          </SessionProvider>
        </Provider>
      );

      /* Assert */
      expect(view.find('ForwardRef(BottomNavigation)').prop('value')).toBe(mockRouteValue);
    });

    it('Should change current app route when nav item clicked', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {});
      const mockSession: Session = {
        expires: '1',
        user: {
          email: 'a',
          name: 'Delta',
          image: 'c',
          uid: '324efgvb',
          id: '324efgvb',
          demo: false,
        },
      };
      let testRoute = '/dashboard/my-bugs';
      mockRouteValue = '/articles';

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <SessionProvider session={mockSession}>
            <ThemeConfig emotionCache={createEmotionCache()}>
              <BottomNavBar />
            </ThemeConfig>
          </SessionProvider>
        </Provider>
      );

      /* Assert */
      expect(view.find('ForwardRef(BottomNavigation)').prop('value')).toBe(mockRouteValue);

      /* Act */
      view
        .find(`a`)
        .at(routes.map((route) => route.path).indexOf(testRoute))
        .simulate('click');

      /* Assert */
      expect(view.find('ForwardRef(BottomNavigation)').prop('value')).toBe(testRoute);

      /* Arrange */
      testRoute = '/dashboard/my-account';

      /* Act */
      view
        .find(`a`)
        .at(routes.map((route) => route.path).indexOf(testRoute))
        .simulate('click');

      /* Assert */
      expect(view.find('ForwardRef(BottomNavigation)').prop('value')).toBe(testRoute);
    });
  });
});
