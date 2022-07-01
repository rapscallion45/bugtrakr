import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { waitFor } from '@testing-library/react';
import rootReducer from '../../redux/reducers';
import AppStateProvider from './AppStateProvider';
import userMock from '../../__mocks__/userMock';

const middleware = [thunkMiddleware];
const TEST_DIV_TEXT = "I'm the test child div!";
const MockChild = function MockChild() {
  return <div className="test-div">{TEST_DIV_TEXT}</div>;
};

describe('App State Provider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));

    /* Act */
    const view = render(
      <Provider store={testStore}>
        <AppStateProvider>
          <MockChild />
        </AppStateProvider>
      </Provider>
    );

    /* Assert */
    expect(toJson(view)).toMatchSnapshot();
  });

  describe('Call relevant API', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call Authenticate, Account data and Users data APIs', async () => {
      /* Arrange */
      const testStore = createStore(
        rootReducer,
        { authentication: { user: userMock } },
        applyMiddleware(...middleware)
      );

      /* Act */
      mount(
        <Provider store={testStore}>
          <AppStateProvider>
            <MockChild />
          </AppStateProvider>
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        /* wait for all API calls and state updates to complete */
        expect(window.fetch).toHaveBeenCalledTimes(3);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        '/api/authenticate',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(window.fetch).toHaveBeenCalledWith(
        '/api/users',
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(window.fetch).toHaveBeenCalledWith(
        '/api/account',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userMock.id }),
        })
      );
    });
  });

  describe('Show/Hide Preloader', () => {
    it('Should render Preloader intially when app data not loaded', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <AppStateProvider>
            <MockChild />
          </AppStateProvider>
        </Provider>
      );

      /* Assert */
      expect(view.find('Preloader').length).toBe(1);
      expect(view.find('.test-div').length).toBe(0);
    });

    it('Should render children components once app data loaded', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));

      /* Act */
      const view = mount(
        <Provider store={testStore}>
          <AppStateProvider>
            <MockChild />
          </AppStateProvider>
        </Provider>
      );

      /* Assert */
      expect(view.find('Preloader').length).toBe(1);
      expect(view.find('.test-div').length).toBe(0);

      await waitFor(() => {
        /* After API calls have completed, preloader no longer displayed */
        view.update();
        expect(view.find('Preloader').length).toBe(0);
      });
      expect(view.find('.test-div').length).toBe(1);
    });
  });
});
