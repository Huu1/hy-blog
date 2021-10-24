import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import ArticleContent from 'Src/components/ArticleContent';
import request from 'Src/utils/request';
import './index.scss';

function Article(props: any) {
  const {
    match: { params },
  } = props;

  const [article, setArticle] = useState();

  const artilceList = useSelector((state: any) => state.article);

  useEffect(() => {
    if (params.id) {
      const target = artilceList.find((i: any) => i.articleId === params.id);
      if (target) {
        setArticle(target);
      } else {
        request.get('');
      }
    }
  }, [params.id, artilceList]);

  console.log(article);

  return (
    <section className='article-wrap'>
      <div className='header'>
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

      <main className='content'>
        <div className='inner'>
          <div className='article-content'>
            <ArticleContent />
          </div>
          <div className='article-footer'>foot</div>
          <div className='article-comment'>comment</div>
          <div className='article-nav'>nav</div>
        </div>
      </main>
    </section>
  );
}

export default withRouter(Article);
