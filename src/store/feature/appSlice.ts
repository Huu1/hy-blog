import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getToken, setToken } from 'Src/utils';
import request from 'Src/utils/request';

interface IState {
  user: any;
  appData: any;
  status: string;
  error: string | undefined;
}

const initialState: IState = {
  user: null,
  appData: null,
  status: 'idel',
  error: undefined,
};

// export const fetchUser = createAsyncThunk('posts/fetchUser', async (data: { username: string; password: string }) => {
//   const response = await request.post('/auth/login', data);
//   console.log(response);
//   return {};
// });

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
    setAppData(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.appData = action.payload;
    },
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(fetchUser.pending, (state: IState) => {
  //       // eslint-disable-next-line no-param-reassign
  //       state.status = 'loading';
  //     })
  //     .addCase(fetchUser.fulfilled, (state: IState, action: any) => {
  //       // eslint-disable-next-line no-param-reassign
  //       state.status = 'succeeded';
  //       // eslint-disable-next-line no-param-reassign
  //       state.user = action.payload;
  //     })
  //     .addCase(fetchUser.rejected, (state: IState, action) => {
  //       // eslint-disable-next-line no-param-reassign
  //       state.status = 'failed';
  //       // eslint-disable-next-line no-param-reassign
  //       state.error = action.error.message;
  //     });
  // },
});

export const { setUser, setAppData } = appSlice.actions;

export default appSlice.reducer;

// 获取当前用户
export const getUser = (state: any) => state.app.user;
