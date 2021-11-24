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
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { Tab, Tabs } from '@mui/material';
import { ActionType, paramReducer } from './reducer';
import { useFetchArticle } from './hooks';

const PAGE_SIZE = 4;

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  dir?: string;
  index: number;
  value: number;
  rendered: number[];
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, rendered, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ height: '100%' }}
      {...other}
    >
      {rendered.includes(index) && <Typography>{children}</Typography>}
    </div>
  );
}

const HomePage = (props: { tagId: string }) => {
  const { tagId } = props;
  const firstRef = useRef<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [realData, setRealData] = useState<IArticle[]>([]);

  const [param, paramDispatch] = useReducer(paramReducer, {
    current: 1,
    tagId,
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
      return <div className='info-margin'>空空如也~</div>;
    }
    if (!loading && !isLoading && realData && realData?.length === total) {
      return <div className='info-margin'>我是有底线的~</div>;
    }
    return (
      <div className='info-margin' onClick={getMore}>
        <span className='loadMore'>获取更多</span>
      </div>
    );
  };

  return (
    <div className='homePage'>
      {realData.map((article: IArticle) => {
        return <ArticleCard key={article.articleId} article={article} />;
      })}
      <>{load()}</>
    </div>
  );
};

function Home() {
  const theme = useTheme();
  // 分类列表
  const { tagList } = useSelector(getAppdata);

  const [pageIndex, setPageIndex] = React.useState(0);
  const [rendered, setRendered] = useState([pageIndex]);

  // 保存加载过的tap 停止二次渲染
  const renderChange = (index: number) => {
    setRendered((p) => {
      p.push(index);
      // eslint-disable-next-line unicorn/prefer-spread
      return Array.from(new Set(p));
    });
  };
  const onTagChange = (event: React.SyntheticEvent, newValue: number) => {
    setPageIndex(newValue);
    renderChange(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setPageIndex(index);
    renderChange(index);
  };

  return (
    <>
      <Tabs
        value={pageIndex}
        onChange={onTagChange}
        indicatorColor='secondary'
        textColor='inherit'
        variant='scrollable'
        aria-label='full width tabs example'
        style={{ minHeight: '20px', position: 'sticky', top: 0, zIndex: 99, background: 'white' }}
      >
        {tagList.map((tag: any, index: number) => {
          return (
            <Tab
              style={{
                minWidth: 0,
                whiteSpace: 'inherit',
                minHeight: 0,
                padding: '.6rem 1rem',
                color: index === pageIndex ? '#007fff' : 'inherit',
              }}
              key={tag.tagId}
              label={tag.title}
              {...a11yProps(index)}
            />
          );
        })}
      </Tabs>
      <div className='home-wrap'>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={pageIndex}
          onChangeIndex={handleChangeIndex}
          style={{ height: '100%' }}
        >
          {tagList.map((tag: any, index: number) => {
            return (
              <TabPanel key={tag.tagId} value={pageIndex} index={index} rendered={rendered}>
                <HomePage tagId={tag.tagId} />
              </TabPanel>
            );
          })}
        </SwipeableViews>
      </div>
    </>
  );
}

export default withRouter(Home);
