import React from 'react';
import './index.scss';

function ArticleCard({ article }: any) {
  return (
    <div className='article-wrap' key={article.id}>
      <div className='inner'>
        <div className='article'>
          <h2 className='article-title'>{article.title}</h2>
          <span className='article-meta'>{article.meta}</span>
          <div className='article-excerpt'>{article.excerpt}</div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
