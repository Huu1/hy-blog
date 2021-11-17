import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from 'Src/utils/request';

interface IState {
  appData: any;
  status: string;
  error: string | undefined;
  sideDrawerVisible: boolean;
}

const initialState: IState = {
  appData: null,
  sideDrawerVisible: false,
  status: 'idel',
  error: undefined,
};

export const fetchConfig = createAsyncThunk(
  'user/fetchConfig',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async () => {
    const res: any = await request.get('/auth/getConfig');
    if (res.code === 0) {
      return res.data.appData;
    }
    return null;
  },
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppData(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.appData = action.payload;
    },
    toggleSideDrawerVisible(state) {
      // eslint-disable-next-line no-param-reassign
      state.sideDrawerVisible = !state.sideDrawerVisible;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchConfig.pending, (state: IState) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'loading';
      })
      .addCase(fetchConfig.fulfilled, (state: IState, action: any) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'succeeded';
        // eslint-disable-next-line no-param-reassign
        state.appData = action.payload;
      })
      .addCase(fetchConfig.rejected, (state: IState, action) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'failed';
        // eslint-disable-next-line no-param-reassign
        state.error = action.error.message;
      });
  },
});

export const { setAppData, toggleSideDrawerVisible } = appSlice.actions;

export default appSlice.reducer;

// 获取app数据
export const getAppdata = (state: any) => state.app.appData;

// 获取侧边栏状态
export const getSideDrawerVisible = (state: any) => state.app.sideDrawerVisible;
