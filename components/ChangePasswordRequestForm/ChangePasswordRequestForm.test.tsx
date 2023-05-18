import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { waitFor } from '@testing-library/react';
import rootReducer from '../../redux/reducers';
import ChangePasswordRequestForm from './ChangePasswordRequestForm';
import accountMock from '../../__mocks__/accountMock';

const middleware = [thunkMiddleware];

const mockRouteValue = '/dashboard/my-account';
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

describe('Change Password Request Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(
      rootReducer,
      {
        account: {
          user: {
            email: accountMock.email,
          },
        },
      },
      applyMiddleware(...middleware)
    );
    const mockSession: Session = {
      expires: '1',
      user: {
        email: accountMock.email,
        name: 'Delta',
        image: 'c',
        uid: '324efgvb',
        id: '324efgvb',
        demo: false,
      },
    };

    /* Act */
    const view = render(
      <Provider store={testStore}>
        <SessionProvider session={mockSession}>
          <ChangePasswordRequestForm />
        </SessionProvider>
      </Provider>
    );

    /* Assert */
    expect(toJson(view)).toMatchSnapshot();
  });

  describe('Form Submission', () => {
    it('Should be disabled and spinner should be rendered when change password API called', () => {
      /* Arrange */
      const testStore = createStore(
        rootReducer,
        {
          account: {
            user: {
              email: accountMock.email,
            },
          },
          changePassword: {
            requestingPassword: true,
          },
        },
        applyMiddleware(...middleware)
      );
      const mockSession: Session = {
        expires: '1',
        user: {
          email: accountMock.email,
          name: 'Delta',
          image: 'c',
          uid: '324efgvb',
          id: '324efgvb',
          demo: false,
        },
      };

      /* Act */
      const view = render(
        <Provider store={testStore}>
          <SessionProvider session={mockSession}>
            <ChangePasswordRequestForm />
          </SessionProvider>
        </Provider>
      );

      /* Assert */
      expect(view.find('button').prop('disabled')).toBe(true);
      expect(view.find('circle').length).toBe(1);
    });

    it('Should be enabled with no spinner once change password API call completed', async () => {
      /* Arrange */
      const testStore = createStore(
        rootReducer,
        {
          account: {
            user: {
              email: accountMock.email,
            },
          },
        },
        applyMiddleware(...middleware)
      );
      const mockSession: Session = {
        expires: '1',
        user: {
          email: accountMock.email,
          name: 'Delta',
          image: 'c',
          uid: '324efgvb',
          id: '324efgvb',
          demo: false,
        },
      };

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <SessionProvider session={mockSession}>
            <ChangePasswordRequestForm />
          </SessionProvider>
        </Provider>
      );
      view.find('button').simulate('click');

      /* Assert */
      expect(view.find('button').prop('disabled')).toBe(true);
      expect(view.find('circle').length).toBe(1);

      await waitFor(() => {
        view.update();
        expect(view.find('button').prop('disabled')).toBe(false);
      });
      expect(view.find('circle').length).toBe(0);
    });

    it('Should be disabled, with no spinner, when in demo mode', () => {
      /* Arrange */
      const testStore = createStore(
        rootReducer,
        {
          account: {
            user: {
              email: accountMock.email,
            },
          },
          changePassword: {
            requestingPassword: false,
          },
        },
        applyMiddleware(...middleware)
      );
      const mockSession: Session = {
        expires: '1',
        user: {
          email: accountMock.email,
          name: 'Delta',
          image: 'c',
          uid: '324efgvb',
          id: '324efgvb',
          demo: true,
        },
      };

      /* Act */
      const view = render(
        <Provider store={testStore}>
          <SessionProvider session={mockSession}>
            <ChangePasswordRequestForm />
          </SessionProvider>
        </Provider>
      );

      /* Assert */
      expect(view.find('button').prop('disabled')).toBe(true);
      expect(view.find('circle').length).toBe(0);
    });
  });

  describe('Events', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call change password API on button click, passing logged in user email', async () => {
      /* Arrange */
      const testStore = createStore(
        rootReducer,
        {
          account: {
            user: {
              email: accountMock.email,
            },
          },
        },
        applyMiddleware(...middleware)
      );
      const mockSession: Session = {
        expires: '1',
        user: {
          email: accountMock.email,
          name: 'Delta',
          image: 'c',
          uid: '324efgvb',
          id: '324efgvb',
          demo: false,
        },
      };
      const { email } = accountMock;

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <SessionProvider session={mockSession}>
            <ChangePasswordRequestForm />
          </SessionProvider>
        </Provider>
      );
      view.find('button').simulate('click');

      /* Assert */
      expect(view.find('button').prop('disabled')).toBe(true);
      expect(view.find('circle').length).toBe(1);

      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        '/api/change-password',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
      );
    });
  });
});
