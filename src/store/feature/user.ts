import { createSlice } from '@reduxjs/toolkit';

const initialState: any[] = [];

const userSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    userUser(state, action) {
      state.push(...action.payload);
    },
  },
});

export const { userUser } = userSlice.actions;

export default userSlice.reducer;
