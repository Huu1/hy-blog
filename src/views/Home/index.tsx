import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleCard from 'Src/components/ArticleCard';
import PageLoading from 'Src/components/pageLoading';
import { selectAllArticle, fetchArticle } from 'Src/store/feature/articleSlice';
import { IArticle } from 'Src/utils/type';
import { uid } from 'Src/config/user';
import './index.scss';

function Home() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const { error: isError, status, total } = useSelector((state: any) => state.article);
  const articleList = useSelector(selectAllArticle);

  const [realData, setRealData] = useState<IArticle[]>(articleList);

  useEffect(() => {
    if (status === 'idle') {
      setLoading(true);
      dispatch(fetchArticle({ current: 1, uid }));
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (current > 1) {
      dispatch(fetchArticle({ current, uid }));
    }
  }, [current, dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setTimeout(() => {
        setLoading(false);
        setRealData(articleList);
      }, 300);
    } else if (status === 'loading') {
      setLoading(true);
    }
  }, [status, articleList]);

  const getMore = () => {
    setCurrent((c) => c + 1);
  };

  const load = () => {
    if (loading) {
      return <PageLoading />;
    }
    if (realData.length === total) {
      return <span style={{ color: '#5a656b' }}>我是有底线的~</span>;
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
      {realData?.map((article: IArticle) => {
        return <ArticleCard key={article.articleId} article={article} />;
      })}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>{load()}</div>
    </div>
  );
}

export default Home;
