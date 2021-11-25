import React from 'react';
import dayjs from 'dayjs';
import { withRouter } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import './index.scss';
import Tag from '../Tag';
import Metas from './meta';

dayjs.locale('zh-cn');

dayjs.extend(relativeTime);

function ArticleCard({ article, history }: any) {
  const viewArticle = () => {
    history.push(`/article/${article.articleId}`);
  };
  return (
    <div className='article-card-wrap'>
      <div className='card'>
        {/* <div className='card-header'>
          <p className='category-tag' style={{ background: article.tag.color }}>
            {article.tag.title}
          </p>
        </div> */}
        <div className='card-body'>
          {article?.label?.map((i: any) => {
            return <Tag value={i} key={i.id} />;
          })}
          {article?.title && (
            <h2 className='bog-title' onClick={viewArticle}>
              {article?.title}
            </h2>
          )}
          {article?.brief && <p className='blog-description'>{article?.brief}</p>}

          <div className='meta'>{article?.meta && article?.meta.length && <Metas data={article?.meta} />}</div>
          <div className='card-footer flex'>
            <span className='time'>{dayjs(article.createTime).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ArticleCard);
