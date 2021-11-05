import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import ArticleContent from 'Src/components/ArticleContent';
import PageLoading from 'Src/components/pageLoading';
import Tag from 'Src/components/Tag';
import request from 'Src/utils/request';
import { IArticle } from 'Src/utils/type';
import Drawer from 'rc-drawer';
import './index.scss';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const Header = React.memo((props: { data: IArticle }) => {
  const { data: article } = props;
  return (
    <div className='header'>
      <div className='inner'>
        <div className='article-info'>
          {/* {article?.label?.map((i: any) => {
            return (
              <>
                <Tag style={{ color: 'white' }} value={i} key={i.id} />
                <div style={{ marginRight: '10px' }} />
              </>
            );
          })} */}
        </div>
        <div className='article-title'>{article?.title}</div>
        <div className='article-meta'>
          <div className='article-meta-avatars'>
            <img src={article?.user?.avatar} alt='' />
          </div>
          <div className='article-meta-author flex-column'>
            <span>{article?.user?.username}</span>
            <span className='time'>
              {/* 发布于 &nbsp;·&nbsp; */}
              {dayjs(article?.createTime).format('DD-MM-YYYY')}
              &nbsp;·&nbsp;
              <span className='time'>{`${article?.readTime}分钟`}</span>
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

const Content = React.memo((props: { data: string }) => {
  return (
    <main className='content'>
      <div className='inner'>
        <div className='article-content'>
          <ArticleContent value={props.data} />
        </div>
        <hr />
      </div>
    </main>
  );
});
Content.displayName = 'Content';

const Comment = React.memo(() => {
  return <div className='inner' />;
});
Comment.displayName = 'Comment';

function ArticlePage(props: any) {
  const {
    match: { params },
  } = props;
  const [article, setArticle] = useState<IArticle>();

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res: any = await request.get(`article/${params.id}`);
        const { code, data, msg } = res;
        if (code === 0) {
          setArticle(data);
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

  if (!article) {
    return (
      <div style={{ marginTop: '8em' }}>
        <PageLoading />
      </div>
    );
  }

  return (
    <section className='article-wrap'>
      <Header data={article} />
      <Content data={article?.content.content} />
      <Comment />
      <button
        type='button'
        onClick={() => {
          setOpenDrawer((p: any) => !p);
        }}
      >
        oprn
      </button>
    </section>
  );
}

export default withRouter(ArticlePage);
