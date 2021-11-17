import { configureStore } from '@reduxjs/toolkit';
import appSlice from './feature/appSlice';
import articleSlice from './feature/articleSlice';
import userSlice from './feature/userSlice';

export default configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    article: articleSlice,
  },
});
