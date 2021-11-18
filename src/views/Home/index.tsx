import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleCard from 'Src/components/ArticleCard';
// import PageLoading from 'Src/components/pageLoading';
import { selectAllArticle, fetchArticle, resetArticle } from 'Src/store/feature/articleSlice';
import { IArticle } from 'Src/utils/type';
import ScrollBar from 'Src/router/Layout/ScrollBar';
import { getAppdata } from 'Src/store/feature/appSlice';
import Box from '@material-ui/core/Box/Box';
import Skeleton from '@mui/material/Skeleton';
import './index.scss';
import { withRouter } from 'react-router';
import { ActionType, paramReducer } from './reducer';

function Home() {
  const dispatch = useDispatch();

  const firstRef = useRef<boolean>(false);

  const [loading, setLoading] = useState(false);

  // 文章缓存
  const { data: articleList, status, total } = useSelector(selectAllArticle);

  // 分类列表
  const { tagList } = useSelector(getAppdata);

  const [state, paramDispatch] = useReducer(paramReducer, {
    current: 1,
    currentTag: tagList[0].tagId,
  });
  const { current, currentTag } = state;

  // 获取文章
  const fetchData = useCallback(
    (cb) => {
      dispatch(fetchArticle({ current, tagId: currentTag, cb, pageSize: 2 }));
    },
    [current, currentTag, dispatch],
  );

  // 获取文章  loading闪烁
  useEffect(() => {
    setLoading(true);
    let timer: NodeJS.Timeout;
    const hideLoading = () => {
      setLoading(false);
    };
    if (firstRef.current) {
      fetchData(hideLoading);
      firstRef.current = true;
    } else {
      timer = setTimeout(() => {
        fetchData(hideLoading);
      }, 500);
    }
    return () => {
      // eslint-disable-next-line no-unused-expressions
      timer && clearTimeout(timer);
    };
  }, [dispatch, fetchData]);

  const getMore = () => {
    paramDispatch({
      type: ActionType.CHANGE_CURRENT,
      payload: current + 1,
    });
  };

  const onTagChange = (tagId: string) => {
    paramDispatch({
      type: ActionType.CHANGE_ALL,
      payload: {
        current: 1,
        currentTag: tagId,
      },
    });
    dispatch(resetArticle());
  };

  const load = () => {
    if (status === 'failed') {
      return <div>服务器开了小差~</div>;
    }
    if (loading) {
      return (
        <Box sx={{ width: '100%' }}>
          <Skeleton />
          <Skeleton animation='wave' />
          <Skeleton animation={false} />
        </Box>
      );
    }
    if (!loading && total === 0) {
      return <span style={{ color: '#5a656b' }}>空空如也~</span>;
    }
    if (!loading && articleList && articleList?.length === total) {
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
