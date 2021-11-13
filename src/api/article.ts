import request from 'Src/utils/request';

export const doLike = (data: { type: 1 | 2; articleId?: string; commentId?: string }) => {
  return request.post('/like', data);
};
