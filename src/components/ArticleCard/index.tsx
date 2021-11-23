import React from 'react';
import dayjs from 'dayjs';
import { withRouter } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import './index.scss';
import Tag from '../Tag';

dayjs.locale('zh-cn');

dayjs.extend(relativeTime);

function ArticleCard({ article, history }: any) {
  // const user = useAuth();

  const viewArticle = () => {
    history.push(`/article/${article.articleId}`);
  };
  return (
    <div className='article-card-wrap'>
      {/* <div className='card'>
        <div className='card-header'>
          <p className='category-tag' style={{ background: article.tag.color }}>
            {article.tag.title}
          </p>
        </div>
        <div className='card-body'>
          {article?.label?.map((i: any) => {
            return <Tag value={i} key={i.id} />;
          })}
          <h2 className='bog-title' onClick={viewArticle}>
            {article?.title}
          </h2>
          <p className='blog-description'>{article?.brief}</p>
          <div className='card-footer flex'>
            <span className='time'>{dayjs(article.createTime).fromNow()}</span>
          </div>
        </div>
      </div> */}
      <div className='header'>
        <span className='time'>{dayjs(article.createTime).fromNow()}</span>
      </div>
      <div className='brief'>
        <p className='blog-description'>{article?.brief}</p>
      </div>
      <div className='meta'>
        {article?.meta.map((item: any) => {
          if (item.type === 0) {
            return <img style={{ width: '4rem', height: '4rem' }} src={`http://localhost:3000/${item.file}`} alt='' />;
          }
          if (item.type === 1) {
            return <img style={{ width: '4rem', height: '4rem' }} src={`http://localhost:3000/${item.file}`} alt='' />;
          }
          if (item.type === 2) {
            // eslint-disable-next-line jsx-a11y/media-has-caption
            return (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                style={{ objectFit: 'fill' }}
                width='100%'
                height='300px'
                src={`http://localhost:3000/${item.file}`}
                controls
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default withRouter(ArticleCard);
