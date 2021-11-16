import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'dayjs/locale/zh-cn';
import { BehaviorSubject } from 'rxjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StartLoading } from './components/StartLoading';
import { getToken } from './utils';
import request from './utils/request';
import { setAppData, setUser } from './store/feature/appSlice';

const data = new BehaviorSubject<any>(null);

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Router = React.lazy(() => {
  return new Promise<any>((resolve) => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const noToken = async () => {
      try {
        const res: any = await request.get('/auth/getConfig');
        if (res.code === 0) {
          data.next(res.data);
        }
        resolve(import('./router'));
      } catch (error: any) {
        console.log(error);
      }
    };
    const hasToken = async () => {
      try {
        const res: any = await request.post('/auth/refresh', { token: getToken() });
        if (res.code === 0) {
          data.next(res.data);
        }
        resolve(import('./router'));
      } catch (error: any) {
        console.log(error);
      }
    };
    if (getToken()) {
      hasToken();
    } else {
      noToken();
    }
  });
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    data.subscribe((res) => {
      if (!res) return;
      dispatch(setAppData(res.appData));
      if (res.user) {
        dispatch(setUser(res.user));
      }
    });
  }, [dispatch]);

  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <Suspense fallback={<StartLoading />}>
      {/* <Router /> */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Suspense>
  );
}
export default App;
