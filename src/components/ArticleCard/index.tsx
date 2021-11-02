import React from 'react';
import dayjs from 'dayjs';
import { NavLink, withRouter } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import './index.scss';
import Tag from '../Tag';

dayjs.locale('zh-cn');

dayjs.extend(relativeTime);

function ArticleCard({ article, history }: any) {
  const viewArticle = () => {
    history.push(`/article/${article.articleId}`);
  };
  return (
    <div className='article-wrap'>
      <div className='inner'>
        <div className='article'>
          <h2 className='article-title' onClick={viewArticle}>
            {article.title}
          </h2>
          <span className='article-meta wrap flex column-center'>
            {/* <span>{article?.user?.username}</span>
            &nbsp;在&nbsp; */}
            <NavLink to='xx' className='tag'>
              {article?.tag?.title}
            </NavLink>
            &nbsp;·&nbsp;
            <span className='time'>{dayjs(article.createTime).fromNow()}</span>
            {article?.label?.map((i: any) => {
              return (
                <>
                  &nbsp;·&nbsp; <Tag value={i} key={i.id} />
                </>
              );
            })}
          </span>

          <div className='article-excerpt'>{article.brief}</div>
          <div style={{ marginTop: '.5rem', textAlign: 'left' }} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(ArticleCard);
