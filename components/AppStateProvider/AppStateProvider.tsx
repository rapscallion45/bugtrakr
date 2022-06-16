import { FC } from 'react';
import Preloader from '../Preloader/Preloader';
import useAppStateProviderController from './AppStateProviderController';

interface AppStateProviderProps {
  children?: any;
}

const AppStateProvider: FC<AppStateProviderProps> = function AppStateProvider({ children = null }) {
  const { loading } = useAppStateProviderController();

  return loading ? <Preloader /> : children;
};
export default AppStateProvider;
