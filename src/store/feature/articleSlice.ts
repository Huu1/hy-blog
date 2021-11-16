/* eslint-disable unicorn/consistent-function-scoping */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from 'Src/utils/request';
import { IArticle } from 'Src/utils/type';

interface IState {
  data: IArticle[];
  status: string;
  error: string | undefined;
  total: number;
}

const initialState: IState = {
  data: [],
  status: 'idle',
  error: undefined,
  total: 0,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const fetchArticle = createAsyncThunk(
  'posts/fetchArticle',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async ({ current, uid, tagId, cb = () => {} }: any) => {
    // eslint-disable-next-line no-shadow
    const getUrl = (current: number, uid: string): string =>
      `article/queryAllPublish?uid=${uid}&pageSize=2&current=${current}&tagId=${tagId}`;
    const response: any = await request.get(getUrl(current, uid));
    cb();
    if (response.code === 0) {
      return response.data;
    }
    return [];
  },
);

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    resetArticle(state) {
      // eslint-disable-next-line no-param-reassign
      state.data = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchArticle.pending, (state: IState) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'loading';
      })
      .addCase(fetchArticle.fulfilled, (state: IState, action: any) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'succeeded';
        // eslint-disable-next-line no-param-reassign
        state.total = action.payload.total;
        // eslint-disable-next-line no-param-reassign
        state.data = [...state.data, ...action.payload.list];
      })
      .addCase(fetchArticle.rejected, (state: IState, action) => {
        // eslint-disable-next-line no-param-reassign
        state.status = 'failed';
        // eslint-disable-next-line no-param-reassign
        state.error = action.error.message;
      });
  },
});

export const { resetArticle } = articleSlice.actions;

export default articleSlice.reducer;

// 取所有文章
export const selectAllArticle = (state: any) => state.article;
