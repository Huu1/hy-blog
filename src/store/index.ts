import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './feature/articleSlice';

export default configureStore({
  reducer: {
    article: articleSlice,
  },
});
