import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ArticleCard from 'Src/components/ArticleCard';
import { uid } from 'Src/config/user';
import { setArticle } from 'Src/store/feature/articleSlice';
import { useRequest } from 'Src/utils/useHttp';

import './index.scss';

// const articleList = [
//   {
//     id: '1',
//     title: 'react如何给选中的导航添加样式',
//     meta: '发布于 react 前端',
//     excerpt: '之所以你在浏览器内可以由首页跳转到其他路由地址，是因为这是由前端自行渲染的，你在React',
//   },
//   {
//     id: '2',
//     title: 'react如何给选中的导航添加样式',
//     meta: '发布于 react 前端',
//     excerpt: '之所以你在浏览器内可以由首页跳转到其他路由地址，是因为这是由前端自行渲染的，你在React',
//   },
//   {
//     id: '3',
//     title: 'react如何给选中的导航添加样式',
//     meta: '发布于 react 前端',
//     excerpt: '之所以你在浏览器内可以由首页跳转到其他路由地址，是因为这是由前端自行渲染的，你在React',
//   },
//   {
//     id: '4',
//     title: 'react如何给选中的导航添加样式',
//     meta: '发布于 react 前端',
//     excerpt: '之所以你在浏览器内可以由首页跳转到其他路由地址，是因为这是由前端自行渲染的，你在React',
//   },
// ];
function Home() {
  const dispatch = useDispatch();

  const { state, setUrl } = useRequest(`article/queryAllPublish/${uid}`, {}, 'GET');
  const { isLoading, isError, data } = state;

  useEffect(() => {
    if (data.list) {
      dispatch(setArticle(data.list));
    }
  }, [data, dispatch]);

  if (isError) {
    return <span>错误</span>;
  }

  return (
    <div>
      {data?.list?.map((article: any) => {
        return <ArticleCard key={article.articleId} article={article} />;
      })}
    </div>
  );
}

export default Home;
