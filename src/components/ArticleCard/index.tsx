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
        {/* <div className='article'>
          <h2 className='article-title' onClick={viewArticle}>
            {article.title}
          </h2>
          <span className='article-meta wrap flex column-center'>
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
        </div> */}
        <div className='card'>
          <div className='card-header'>
            <p className='category-tag' style={{ background: article.tag.color }}>
              {article.tag.title}
            </p>
            <img
              className='header-img'
              src='https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80'
              alt='code'
            />
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
              <span className='right-action'>
                <i className='icon iconfont icon-dianzan' />
                <span>12</span>
              </span>
              <span>
                <i className='icon iconfont icon-pinglun1' />
                <span>0</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ArticleCard);
