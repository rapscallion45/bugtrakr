import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../redux/reducers';

let currentStore;

let middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  /* only setup redux logger if we're in development */
  middleware = [...middleware, createLogger()];
}

const initStore = (initialState: any) => createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

const initializeStore = (preloadedState: any) => {
  let newStore = currentStore ?? initStore(preloadedState);

  /**
   * After navigating to a page with an initial Redux state, merge that state
   * with the current state in the store, and create a new store
   */
  if (preloadedState && currentStore) {
    newStore = initStore({
      ...currentStore.getState(),
      ...preloadedState,
    });
    /* Reset the current store */
    currentStore = undefined;
  }

  /* For SSG and SSR always create a new store */
  if (typeof window === 'undefined') return newStore;
  /* Create the store once in the client */
  if (!currentStore) currentStore = newStore;

  return newStore;
};

const useStore = (initialState: any) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
export default useStore;
