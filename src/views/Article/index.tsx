import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAllArticle, selectArticleById, setArticle } from 'Src/store/feature/articleSlice';
import { withRouter } from 'react-router';
import ArticleContent from 'Src/components/ArticleContent';
import PageLoading from 'Src/components/pageLoading';
import Tag from 'Src/components/Tag';
import request from 'Src/utils/request';
import { IArticle } from 'Src/utils/type';
import './index.scss';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

function ArticlePage(props: any) {
  const {
    match: { params },
  } = props;

  // const dispatch = useDispatch();
  // const article: IArticle | null = useSelector((state) => selectArticleById(state, params.id));
  const [article, setArticle] = useState<IArticle>();

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

  // if (!article) {
  //   return (
  //     <section>
  //       <h2>Post not found!</h2>
  //     </section>
  //   );
  // }

  if (!article) {
    return (
      <div style={{ marginTop: '8em' }}>
        <PageLoading />
      </div>
    );
  }

  return (
    <section className='article-wrap'>
      <div className='header'>
        <div className='inner'>
          <div className='article-info'>
            {article?.label?.map((i: any) => {
              return (
                <>
                  <Tag style={{ color: 'white' }} value={i} key={i.id} />
                  <div style={{ marginRight: '10px' }} />
                </>
              );
            })}
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

      <main className='content'>
        <div className='inner'>
          <div className='article-content'>
            <ArticleContent value={article?.content?.content} />
          </div>
          {/* <div className='article-nav'>nav</div> */}
        </div>
      </main>
    </section>
  );
}

export default withRouter(ArticlePage);
