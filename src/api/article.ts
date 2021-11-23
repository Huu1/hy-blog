import { uid } from 'Src/config/user';
import request from 'Src/utils/request';

export const doLike = (data: { type: 1 | 2; articleId?: string; commentId?: string }) => {
  return request.post('/like', data);
};

export const fetchPost = (current: number, tagId: string, pageSize: number) => {
  return request.get(`article/queryAllPublish?uid=${uid}&pageSize=${pageSize}&current=${current}&tagId=${tagId}`);
};
