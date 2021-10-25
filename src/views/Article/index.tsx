import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ArticleContent from 'Src/components/ArticleContent';
import { selectAllArticle, selectArticleById, setArticle } from 'Src/store/feature/articleSlice';
import request from 'Src/utils/request';
import { IArticle } from 'Src/utils/type';
import './index.scss';

dayjs.extend(relativeTime);

function ArticlePage(props: any) {
  const {
    match: { params },
  } = props;

  const dispatch = useDispatch();

  const article: IArticle | null = useSelector((state) => selectArticleById(state, params.id));

  useEffect(() => {
    const fetch = async () => {
      try {
        const res: any = await request.get(`article/${params.id}`);
        const { code, data, msg } = res;
        if (code === 0) {
          dispatch(setArticle([data]));
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
  }, [article, params.id, dispatch]);

  // if (!article) {
  //   return (
  //     <section>
  //       <h2>Post not found!</h2>
  //     </section>
  //   );
  // }

  return (
    <section className='article-wrap'>
      <div className='header'>
        <div className='inner'>
          <div className='article-info'>
            <span className='article-type'>Article - </span>
            <span className='post-count'> Getting Start</span>
          </div>
          <div className='article-title'>{article?.title}</div>
          <div className='article-meta'>
            <div className='article-meta-avatars'>
              <img src={article?.background} alt='' />
            </div>
            <div className='article-meta-author flex-column'>
              <span>Some Write</span>
              <span className='time'>{dayjs(article?.createTime).fromNow()}</span>
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
            <ArticleContent value={article?.content} />
          </div>
          {/* <div className='article-nav'>nav</div> */}
        </div>
      </main>
    </section>
  );
}

export default withRouter(ArticlePage);
