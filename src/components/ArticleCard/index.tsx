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
    <div className='article-wrap'>
      <div className='card'>
        <div className='card-header'>
          <p className='category-tag' style={{ background: article.tag.color }}>
            {article.tag.title}
          </p>
          <img className='header-img' src='/api/public' alt='code' />
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
            {/* <span className='right-action'>
                <i className='icon iconfont icon-dianzan' onClick={likeAction} />
                <span>12</span>
              </span>
              <span>
                <i className='icon iconfont icon-pinglun1' />
                <span>0</span>
              </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ArticleCard);
