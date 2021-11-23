import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from 'Src/components/ArticleCard';
import { IArticle } from 'Src/utils/type';
import ScrollBar from 'Src/router/Layout/ScrollBar';
import { getAppdata } from 'Src/store/feature/appSlice';
import Box from '@material-ui/core/Box/Box';
import Skeleton from '@mui/material/Skeleton';
import './index.scss';
import { withRouter } from 'react-router';
import { ActionType, paramReducer } from './reducer';
import { useFetchArticle } from './hooks';

const PAGE_SIZE = 4;

function Home() {
  const firstRef = useRef<boolean>(false);

  const [loading, setLoading] = useState(false);

  const [realData, setRealData] = useState<IArticle[]>([]);

  // 分类列表
  const { tagList } = useSelector(getAppdata);

  const [param, paramDispatch] = useReducer(paramReducer, {
    current: 1,
    tagId: '',
  });

  const { state, setData: setParam } = useFetchArticle({ tagId: param.tagId, current: param.current }, PAGE_SIZE);
  const { data, isError, isLoading } = state;

  const total = useMemo(() => data?.total || 0, [data]);

  useEffect(() => {
    let timer: NodeJS.Timer | null;
    setLoading(true);
    if (data.list) {
      if (firstRef.current) {
        setRealData((p: IArticle[]) => [...p, ...data.list]);
        firstRef.current = true;
        setLoading(false);
      } else {
        timer = setTimeout(() => {
          setRealData((p: IArticle[]) => [...p, ...data.list]);
          setLoading(false);
        }, 150);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [data]);

  const getMore = () => {
    setLoading(true);
    paramDispatch({
      type: ActionType.CHANGE_CURRENT,
    });
    setParam({ ...param, current: param.current + 1 });
  };

  const onTagChange = (tagId: string) => {
    setLoading(true);
    paramDispatch({
      type: ActionType.CHANGE_ALL,
      payload: {
        current: 1,
        tagId,
      },
    });
    setRealData([]);
    setParam({ ...param, current: 1, tagId });
  };

  const load = () => {
    if (isError) {
      return <div>服务器开了小差~</div>;
    }
    if (isLoading || loading) {
      return (
        <Box sx={{ width: '100%' }}>
          <Skeleton />
          <Skeleton animation='wave' />
          <Skeleton animation={false} />
        </Box>
      );
    }
    if (!loading && !isLoading && total === 0) {
      return <span style={{ color: '#5a656b' }}>空空如也~</span>;
    }
    if (!loading && !isLoading && realData && realData?.length === total) {
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
      <ScrollBar onTagChange={onTagChange} tagList={tagList} currentTag={param.tagId} />
      <div className='home'>
        {realData.map((article: IArticle) => {
          return <ArticleCard key={article.articleId} article={article} />;
        })}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>{load()}</div>
      </div>
    </>
  );
}

export default withRouter(Home);
