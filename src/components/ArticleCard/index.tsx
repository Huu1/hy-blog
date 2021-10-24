import React from 'react';
import dayjs from 'dayjs';
import { withRouter } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import './index.scss';

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
          <span className='article-meta'>发布于{dayjs(article.createTime).fromNow()}</span>
          <div className='article-excerpt'>{article.brief}</div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ArticleCard);
