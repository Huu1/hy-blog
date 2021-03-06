export interface IArticleContent {
  content: string;
  id: string;
}
export interface IArticleUser {
  avatar: string;
  userId: string;
  username: string;
}

export interface IArticle {
  user: IArticleUser;
  content: IArticleContent;
  articleId: string;
  background: string;
  brief: string;
  createTime: number;
  lastUpdateTime: number;
  publishTime: number;
  rejectInfo: string;
  status: number;
  tid: string;
  title: string;
  uid: string;
  viewNum: number;
  readTime: number;
  label: any[];
}
