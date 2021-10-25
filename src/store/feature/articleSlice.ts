import { createSlice } from '@reduxjs/toolkit';
import { IArticle } from 'Src/utils/type';

const initialState: {
  data: IArticle[];
} = {
  data: [],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle(state, action) {
      state.data.push(...action.payload);
    },
  },
});

export const { setArticle } = articleSlice.actions;

export default articleSlice.reducer;

// 取所有文章
export const selectAllArticle = (state: any) => state.article.data;

// 根据id取文章
export const selectArticleById = (state: any, articleId: string): IArticle | null =>
  state.article.data.find((a: IArticle) => a.articleId === articleId);
