import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { waitFor } from '@testing-library/react';
import rootReducer from '../../redux/reducers';
import ChangePasswordRequestForm from './ChangePasswordRequestForm';
import accountMock from '../../__mocks__/accountMock';

const middleware = [thunkMiddleware];

describe('Change Password Request Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(
      rootReducer,
      {
        authentication: {
          authenticating: false,
          loggedIn: true,
          user: {
            email: accountMock.email,
          },
        },
      },
      applyMiddleware(...middleware)
    );

    /* Act */
    const view = render(
      <Provider store={testStore}>
        <ChangePasswordRequestForm />
      </Provider>
    );

    /* Assert */
    expect(toJson(view)).toMatchSnapshot();
  });

  describe('Form Submission', () => {
    it('Should be disabled and spinner should be rendered when forgot password API called', () => {
      /* Arrange */
      const testStore = createStore(
        rootReducer,
        {
          authentication: {
            authenticating: false,
            loggedIn: true,
            demo: false,
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

      /* Act */
      const view = render(
        <Provider store={testStore}>
          <ChangePasswordRequestForm />
        </Provider>
      );

      /* Assert */
      expect(view.find('button').prop('disabled')).toBe(true);
      expect(view.find('circle').length).toBe(1);
    });

    it('Should be enabled with no spinner once forgot password API call completed', async () => {
      /* Arrange */
      const testStore = createStore(
        rootReducer,
        {
          authentication: {
            authenticating: false,
            loggedIn: true,
            demo: false,
            user: {
              email: accountMock.email,
            },
          },
        },
        applyMiddleware(...middleware)
      );

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <ChangePasswordRequestForm />
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
          authentication: {
            authenticating: false,
            loggedIn: true,
            demo: true,
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

      /* Act */
      const view = render(
        <Provider store={testStore}>
          <ChangePasswordRequestForm />
        </Provider>
      );

      /* Assert */
      expect(view.find('button').prop('disabled')).toBe(true);
      expect(view.find('circle').length).toBe(0);
    });
  });

  describe('Events', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call forgot password API on button click, passing logged in user email', async () => {
      /* Arrange */
      const testStore = createStore(
        rootReducer,
        {
          authentication: {
            authenticating: false,
            loggedIn: true,
            user: {
              email: accountMock.email,
            },
          },
        },
        applyMiddleware(...middleware)
      );
      const { email } = accountMock;

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <ChangePasswordRequestForm />
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
        '/api/forgot-password',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
      );
    });
  });
});
