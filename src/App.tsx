import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'dayjs/locale/zh-cn';
import { BehaviorSubject } from 'rxjs';
import { StartLoading } from './components/StartLoading';
import { getToken } from './utils';
import request from './utils/request';
import { setAppData, setUser } from './store/feature/appSlice';

const data = new BehaviorSubject<any>(null);

const Router = React.lazy(() => {
  return new Promise<any>((resolve) => {
    const noToken = async () => {
      try {
        const res: any = await request.get('/auth/getConfig');
        if (res.code === 0) {
          data.next(res.data);
        }
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
      } catch (error: any) {
        console.log(error);
      }
    };
    if (getToken()) {
      hasToken();
    } else {
      noToken();
    }
    resolve(import('./router'));
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

  return (
    <Suspense fallback={<StartLoading />}>
      <Router />
    </Suspense>
  );
}
export default App;
