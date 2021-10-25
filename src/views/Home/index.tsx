import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleCard from 'Src/components/ArticleCard';
import { uid } from 'Src/config/user';
import { selectAllArticle, setArticle } from 'Src/store/feature/articleSlice';
import { IArticle } from 'Src/utils/type';
import { useRequest } from 'Src/utils/useHttp';

import './index.scss';

const getUrl = (current: number) => {
  return `article/queryAllPublish?uid=${uid}&pageSize=1&current=${current}`;
};

function Home() {
  const dispatch = useDispatch();
  const data = useSelector(selectAllArticle);
  const [current, setCurrent] = useState(1);

  const { state, setUrl } = useRequest(getUrl(current), {}, 'GET');
  const {
    isLoading,
    isError,
    data: { list, total },
  } = state;

  useEffect(() => {
    if (list) {
      dispatch(setArticle(list));
    }
  }, [list, dispatch]);

  useEffect(() => {
    setUrl(getUrl(current));
  }, [current, setUrl]);

  const getMore = () => {
    setCurrent((c) => c + 1);
  };

  if (isLoading && !data) {
    return <span>loading</span>;
  }

  if (isError) {
    return <span>错误</span>;
  }

  return (
    <div>
      {data?.map((article: IArticle) => {
        return <ArticleCard key={article.articleId} article={article} />;
      })}
      <div style={{ textAlign: 'center' }}>
        {data && data.length === total ? '我是有底线的' : <span onClick={getMore}>获取更多</span>}
      </div>
    </div>
  );
}

export default Home;
