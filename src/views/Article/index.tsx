import { Button, Divider, Drawer, Paper, Skeleton, useScrollTrigger } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';
import ArticleContent from 'Src/components/ArticleContent';
import request from 'Src/utils/request';
import { IArticle } from 'Src/utils/type';
import './index.scss';
import confetti from 'canvas-confetti';
import ReplayList from 'Src/components/ReplayList';
import { useAuth } from 'Src/hooks/user';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const Header = React.memo((props: { data: IArticle | undefined }) => {
  const { data: article } = props;
  return (
    <div className='header'>
      <div className=' flex-column'>
        <div className='article-title'>
          {article ? (
            article.title
          ) : (
            <>
              <Skeleton animation='wave' height={20} width='80%' />
              <Skeleton animation='wave' height={20} width='40%' />
            </>
          )}
        </div>

        <div className='article-meta'>
          <div className='article-meta-avatars'>
            {article?.user ? (
              <img src={article?.user?.avatar} alt='' />
            ) : (
              <Skeleton animation='wave' variant='circular' width={40} height={40} />
            )}
          </div>
          <div className='article-meta-author flex-column'>
            <span>
              {article ? (
                article.user.username
              ) : (
                <>
                  <Skeleton animation='wave' height={20} width='30%' />
                </>
              )}
            </span>
            <span className='time'>
              {article ? (
                <>
                  {dayjs(article?.createTime).format('DD-MM-YYYY')}
                  &nbsp;·&nbsp;
                  <span className='time'>{`${article?.readTime}分钟`}</span>
                </>
              ) : (
                <Skeleton animation='wave' height={20} width='60%' />
              )}
            </span>
          </div>
        </div>
        <div className='article-cover'>
          <img src={`http://localhost:3000/${article?.background}`} alt='' />
        </div>
      </div>
    </div>
  );
});
Header.displayName = 'Header';

const Content = React.memo((props: { data: string | undefined }) => {
  return (
    <main className='content'>
      <div className='article-content'>
        <ArticleContent value={props.data} />
        <Divider style={{ margin: '60px 0' }} />
      </div>
    </main>
  );
});
Content.displayName = 'Content';

const Comment = React.memo(
  (props: {
    drawerVisible: boolean;
    onVisibleHandle: (data: boolean, type: string) => void;
    onDrawerDataConfirm: (data: string) => void;
  }) => {
    const { onVisibleHandle, drawerVisible, onDrawerDataConfirm } = props;

    const user = useAuth();

    const replayRef = useRef<any>(null);

    const toggleDrawer = (open: boolean) => (event: any) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      onVisibleHandle(open, 'article');
    };

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const like = () => {
      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 30,
        // origin: {
        //   x: 0.9,
        //   // since they fall down, start a bit higher than random
        //   y: 0.9,
        // },
      });
    };

    const confirmData = () => {
      if (replayRef?.current?.value) {
        onDrawerDataConfirm(replayRef?.current?.value);
      }
    };

    return (
      <div>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '.4em .8em', borderRadius: '0' }}
          elevation={3}
          className='flex'
        >
          <div className='comment-input' placeholder='说点什么吧' onClick={toggleDrawer(true)}>
            说点什么吧
          </div>
          <Button size='small' onClick={like}>
            <span>🎉</span>
            <span>&nbsp;like</span>
          </Button>
        </Paper>
        <Drawer anchor='bottom' open={drawerVisible} onClose={toggleDrawer(false)}>
          <div className='in-drawer-comment'>
            <textarea placeholder='请输入...' ref={replayRef} rows={3} name='' id='' />
            <div className='text-right'>
              <Button size='small' variant='outlined' onClick={confirmData}>
                回复
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
);
Comment.displayName = 'Comment';

function ArticlePage(props: any) {
  const {
    match: { params },
  } = props;
  const [article, setArticle] = useState<IArticle>();
  const [commentList, setComment] = useState();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [replayParam, setReplayParam] = useState(null);

  const trigger = useScrollTrigger({
    target: window,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res: any = await request.get(`article/${params.id}`);
        const { code, data, msg } = res;
        if (code === 0) {
          setTimeout(() => {
            setArticle(data);
          }, 100);
        } else {
          console.warn(msg);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!article) {
      fetch();
    }
  }, [article, params.id]);

  const onVisibleHandle = (data: boolean, type: string): void => {
    if (type === 'article') {
      setReplayParam(null);
    }
    setDrawerVisible(data);
  };

  const onCommentHandle = (data: any): any => {
    setReplayParam(data);
    onVisibleHandle(true, 'replay');
  };

  const onDrawerDataConfirm = (data: string): any => {
    console.log(data);
    console.log(replayParam);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res: any = await request.get(`comment/${params.id}`);
        const { code, data, msg } = res;
        if (code === 0) {
          setTimeout(() => {
            setComment(data);
          }, 100);
        } else {
          console.warn(msg);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [params.id]);

  return (
    <section className='article-wrap'>
      <Header data={article} />
      <Content data={article?.content.content} />
      <ReplayList data={commentList} onCommentHandle={onCommentHandle} />
      {/* <SwipeableEdgeDrawer articleId={params.id} /> */}
      {trigger && (
        <Comment
          onDrawerDataConfirm={onDrawerDataConfirm}
          onVisibleHandle={onVisibleHandle}
          drawerVisible={drawerVisible}
        />
      )}
    </section>
  );
}

export default withRouter(ArticlePage);
