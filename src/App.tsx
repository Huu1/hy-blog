import React, { Suspense } from 'react';
import 'dayjs/locale/zh-cn';
import { SnackbarProvider } from 'notistack';
import { StartLoading } from './components/StartLoading';
import { getToken } from './utils';
import store from './store';
import { fetchConfig } from './store/feature/appSlice';
import { fetchUser } from './store/feature/userSlice';

const Router = React.lazy(() => {
  return new Promise<any>((resolve) => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const getConfig = async () => {
      await store.dispatch(fetchConfig());
    };
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const getUser = () => {
      store.dispatch(fetchUser());
    };
    if (getToken()) {
      getUser();
    }
    getConfig();
    resolve(import('./router'));
  });
});

function App() {
  return (
    <Suspense fallback={<StartLoading />}>
      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </Suspense>
  );
}
export default App;
