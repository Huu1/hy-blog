import { configureStore } from '@reduxjs/toolkit';
import user from './feature/user';
import articleSlice from './feature/articleSlice';

export default configureStore({
  reducer: {
    article: articleSlice,
    // user: user,
  },
});
