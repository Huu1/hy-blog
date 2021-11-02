import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleCard from 'Src/components/ArticleCard';
import PageLoading from 'Src/components/pageLoading';
import { uid } from 'Src/config/user';
import { selectAllArticle, setArticle } from 'Src/store/feature/articleSlice';
import { IArticle } from 'Src/utils/type';
import { useRequest } from 'Src/utils/useHttp';

import './index.scss';

const getUrl = (current: number) => {
  return `article/queryAllPublish?uid=${uid}&pageSize=2&current=${current}`;
};

function Home() {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [articleList, setArticleList] = useState<IArticle[]>([]);

  const { state, setUrl } = useRequest(getUrl(current), {}, 'GET');
  const { isLoading, isError, data: result = [] } = state;

  useEffect(() => {
    if (result?.list) {
      setTimeout(() => {
        setArticleList((p: IArticle[]) => {
          return [...p, ...result?.list];
        });
        setLoading(false);
      }, 500);
    }
  }, [result]);

  useEffect(() => {
    setLoading(true);
    setUrl(getUrl(current));
  }, [current, setUrl]);

  const getMore = () => {
    setCurrent((c) => c + 1);
  };
  const load = () => {
    if (loading) {
      return <PageLoading />;
    }
    if (articleList.length === result?.total) {
      return '我是有底线的~';
    }
    return (
      <span className='loadMore' onClick={getMore}>
        获取更多
      </span>
    );
  };

  if (isError) {
    return <span>错误</span>;
  }

  return (
    <div>
      {articleList?.map((article: IArticle) => {
        return <ArticleCard key={article.articleId} article={article} />;
      })}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>{load()}</div>
    </div>
  );
}

export default Home;
