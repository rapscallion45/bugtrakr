import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { waitFor, render, fireEvent, screen } from '@testing-library/react';
import createEmotionCache from '../../utils/createEmotionCache';
import ThemeConfig from '../../theme/ThemeConfig';
import rootReducer from '../../redux/reducers';
import { alertActions } from '../../redux/actions';
import useNotifier from '../../hooks/useNotifier';
import AlertProvider from './AlertProvider';
import palette from '../../theme/palette';

const testMessage = 'Test render alert message';
function TestChild() {
  useNotifier();
  return <div>Test child</div>;
}

describe('Alert Provider', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer);
    testStore.dispatch(
      alertActions.enqueueSnackbar({
        message: testMessage,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      })
    );

    /* Act */
    const view = shallow(
      <Provider store={testStore}>
        <ThemeConfig emotionCache={createEmotionCache()}>
          <AlertProvider>
            <TestChild />
          </AlertProvider>
        </ThemeConfig>
      </Provider>
    );

    /* Assert */
    expect(toJson(view)).toMatchSnapshot();
  });

  describe('Alert Provider Text', () => {
    it('Should render the passed message', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer);
      testStore.dispatch(
        alertActions.enqueueSnackbar({
          message: testMessage,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
          },
        })
      );

      /* Act */
      render(
        <Provider store={testStore}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <AlertProvider>
              <TestChild />
            </AlertProvider>
          </ThemeConfig>
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
  });

  describe('Alert Provider Box', () => {
    it('Should render the passed severity type', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer);
      const key1 = new Date().getTime() + Math.random();
      testStore.dispatch(
        alertActions.enqueueSnackbar({
          message: testMessage,
          options: {
            key: key1,
            variant: 'success',
          },
        })
      );

      /* Act */
      render(
        <Provider store={testStore}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <AlertProvider>
              <TestChild />
            </AlertProvider>
          </ThemeConfig>
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByRole('alert')).toHaveStyle(`background-color: ${palette.success.main}`);
      expect(screen.getByText(testMessage)).toBeInTheDocument();

      /* Act */
      testStore.dispatch(alertActions.closeSnackbar(key1));

      /* Assert */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.queryByRole('alert')).toBeNull();
      });

      /* Act */
      const key2 = new Date().getTime() + Math.random();
      testStore.dispatch(
        alertActions.enqueueSnackbar({
          message: testMessage,
          options: {
            key: key2,
            variant: 'error',
          },
        })
      );

      /* Assert */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByRole('alert')).toHaveStyle(`background-color: ${palette.error.main}`);
    });

    it('Should close when close button is clicked', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer);
      const key1 = new Date().getTime() + Math.random();
      testStore.dispatch(
        alertActions.enqueueSnackbar({
          message: testMessage,
          options: {
            key: key1,
            variant: 'success',
          },
        })
      );

      /* Act */
      render(
        <Provider store={testStore}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <AlertProvider>
              <TestChild />
            </AlertProvider>
          </ThemeConfig>
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByText(testMessage)).toBeInTheDocument();

      /* Act */
      fireEvent(
        screen.getByTestId('CloseIcon'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /* Assert */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.queryByRole('alert')).toBeNull();
      });
    });
  });
});
