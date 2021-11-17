import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleCard from 'Src/components/ArticleCard';
// import PageLoading from 'Src/components/pageLoading';
import { selectAllArticle, fetchArticle, resetArticle } from 'Src/store/feature/articleSlice';
import { IArticle } from 'Src/utils/type';
import { uid } from 'Src/config/user';
import ScrollBar from 'Src/router/Layout/ScrollBar';
import { getAppdata } from 'Src/store/feature/appSlice';
import Box from '@material-ui/core/Box/Box';
import Skeleton from '@mui/material/Skeleton';
import './index.scss';
import { withRouter } from 'react-router';

function Home() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // 文章缓存
  const { data: articleList, status, total } = useSelector(selectAllArticle);

  // 页码
  const [current, setCurrent] = useState(1);

  // 分类列表
  const { tagList } = useSelector(getAppdata);
  const [currentTag, setCurrentTag] = useState(tagList[0].tagId);

  // 获取文章
  const fetchData = useCallback(
    (cb) => {
      dispatch(fetchArticle({ current, uid, tagId: currentTag, cb }));
    },
    [current, currentTag, dispatch],
  );

  // 获取文章  loading闪烁
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchData(() => {
        setLoading(false);
      });
    }, 300);

    return () => {
      // eslint-disable-next-line no-unused-expressions
      timer && clearTimeout(timer);
    };
  }, [dispatch, fetchData]);

  const getMore = () => {
    setCurrent(current + 1);
  };

  const onTagChange = (tagId: string) => {
    dispatch(resetArticle());
    setCurrent(1);
    setCurrentTag(tagId);
  };

  const load = () => {
    if (loading) {
      return (
        <Box sx={{ width: '100%' }}>
          <Skeleton />
          <Skeleton animation='wave' />
          <Skeleton animation={false} />
        </Box>
      );
    }
    if (status === 'failed') {
      return <div>服务器开了小差~</div>;
    }
    if (total === 0) {
      return <span style={{ color: '#5a656b' }}>空空如也~</span>;
    }
    if (articleList && articleList?.length === total) {
      return <span style={{ color: '#5a656b' }}>我是有底线的~</span>;
    }
    return (
      <span className='loadMore' onClick={getMore}>
        获取更多
      </span>
    );
  };

  return (
    <>
      <ScrollBar onTagChange={onTagChange} tagList={tagList} currentTag={currentTag} />
      <div className='home'>
        {articleList?.map((article: IArticle) => {
          return <ArticleCard key={article.articleId} article={article} />;
        })}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>{load()}</div>
      </div>
    </>
  );
}

export default withRouter(Home);
