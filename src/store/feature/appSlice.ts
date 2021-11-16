import { createSlice } from '@reduxjs/toolkit';

interface IState {
  user: any;
  appData: any;
  sideDrawerVisible: boolean;
}

const initialState: IState = {
  user: null,
  appData: null,
  sideDrawerVisible: false,
};

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
    toggleSideDrawerVisible(state) {
      // eslint-disable-next-line no-param-reassign
      state.sideDrawerVisible = !state.sideDrawerVisible;
    },
  },
});

export const { setUser, setAppData, toggleSideDrawerVisible } = appSlice.actions;

export default appSlice.reducer;

// 获取当前用户
export const getUser = (state: any) => state.app.user;

// 获取app数据
export const getAppdata = (state: any) => state.app.appData;

// 获取侧边栏状态
export const getSideDrawerVisible = (state: any) => state.app.sideDrawerVisible;
