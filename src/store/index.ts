import { configureStore } from '@reduxjs/toolkit';
import appSlice from './feature/appSlice';
import articleSlice from './feature/articleSlice';

export default configureStore({
  reducer: {
    app: appSlice,
    article: articleSlice,
  },
});
