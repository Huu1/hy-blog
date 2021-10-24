import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState: any[] = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setArticle(state, action) {
      state.push(...action.payload);
    },
  },
});

export const { setArticle } = postsSlice.actions;

export default postsSlice.reducer;
