import React from 'react';
import './index.scss';

function Article() {
  return (
    <section className=''>
      <div className='article-header'>
        <div className='inner'>
          <div className='article-info'>
            <span className='article-type'>Article - </span>
            <span className='post-count'> Getting Start</span>
          </div>
          <div className='article-title'>Writing posts with Ghost</div>
          <div className='article-meta'>
            <div className='article-meta-avatars'>
              <img src='https://attila.peteramende.de/content/images/2020/12/image-13.jpeg' alt='' />
            </div>
            <div className='article-meta-author flex-column'>
              <span>Some Write</span>
              <span className='time'>30 Dec 2020 • 3 min read</span>
            </div>
          </div>
          <div className='article-cover'>
            <img
              src='https://attila.peteramende.de/content/images/size/w960/2021/01/c-d-x-PDX_a_82obo-unsplash.jpg'
              alt=''
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Article;