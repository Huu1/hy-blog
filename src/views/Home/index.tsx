import React from 'react';
import ArticleCard from 'Src/components/ArticleCard';
import './index.scss';

const articleList = [
  {
    id: '1',
    title: 'react如何给选中的导航添加样式',
    meta: '发布于 react 前端',
    excerpt: '之所以你在浏览器内可以由首页跳转到其他路由地址，是因为这是由前端自行渲染的，你在React',
  },
  {
    id: '2',
    title: 'react如何给选中的导航添加样式',
    meta: '发布于 react 前端',
    excerpt: '之所以你在浏览器内可以由首页跳转到其他路由地址，是因为这是由前端自行渲染的，你在React',
  },
  {
    id: '3',
    title: 'react如何给选中的导航添加样式',
    meta: '发布于 react 前端',
    excerpt: '之所以你在浏览器内可以由首页跳转到其他路由地址，是因为这是由前端自行渲染的，你在React',
  },
  {
    id: '4',
    title: 'react如何给选中的导航添加样式',
    meta: '发布于 react 前端',
    excerpt: '之所以你在浏览器内可以由首页跳转到其他路由地址，是因为这是由前端自行渲染的，你在React',
  },
];
function Home() {
  return (
    <div className='page'>
      {articleList.map((article) => {
        return <ArticleCard key={article.id} article={article} />;
      })}
    </div>
  );
}

export default Home;
