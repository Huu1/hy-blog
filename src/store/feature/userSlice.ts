/* eslint-disable unicorn/consistent-function-scoping */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getToken } from 'Src/utils';
import request from 'Src/utils/request';

export interface IUser {
  username: string;
  avatar: string;
}

interface IState {
  user: IUser | null;
  status: string;
  error: string | undefined;
}

const initialState: IState = {
  user: null,
  status: 'idle',
  error: undefined,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async () => {
    const res: any = await request.post('/auth/refresh', { token: getToken() });
    if (res.code === 0) {
      return res.data.user;
    }
    return null;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state: IState) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state: IState, action: any) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'succeeded';
        // eslint-disable-next-line no-param-reassign
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state: IState, action) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'failed';
        // eslint-disable-next-line no-param-reassign
        state.error = action.error.message;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

// 获取当前用户
export const getUser = (state: any) => state.app.user;
