import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { waitFor } from '@testing-library/react';
import rootReducer from '../../redux/reducers';
import AppStateProvider from './AppStateProvider';

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

    it('Should call 2 API in total', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));

      /* Act */
      mount(
        <Provider store={testStore}>
          <AppStateProvider>
            <MockChild />
          </AppStateProvider>
        </Provider>
      );

      /* Assert */
      expect(window.fetch).toHaveBeenCalledTimes(2);
    });

    it('Should call Account data API', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));

      /* Act */
      mount(
        <Provider store={testStore}>
          <AppStateProvider>
            <MockChild />
          </AppStateProvider>
        </Provider>
      );

      /* Assert */
      expect(window.fetch).toHaveBeenCalledWith(
        '/api/account',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('Should call authenticate user API', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));

      /* Act */
      mount(
        <Provider store={testStore}>
          <AppStateProvider>
            <MockChild />
          </AppStateProvider>
        </Provider>
      );

      /* Assert */
      expect(window.fetch).toHaveBeenCalledWith(
        '/api/authenticate',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
