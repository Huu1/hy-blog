import React, { useState } from 'react';
import dayjs from 'dayjs';
import { withRouter } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import './index.scss';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Tag from '../Tag';

dayjs.locale('zh-cn');

dayjs.extend(relativeTime);

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
];

const Images = React.memo(({ data }: any) => {
  // const [gridList, setGridList] = useState(data);
  const [cols, setCols] = useState(1);

  const gridList = React.useMemo(() => {
    const { length } = data;
    let res = [];
    switch (length) {
      case 1:
        setCols(3);
        res = data.map((i: any) => ({ ...i, rows: 2, cols: 3 }));
        break;
      case 2:
        setCols(2);
        res = data.map((i: any) => {
          return {
            ...i,
            rows: 1,
            cols: 1,
          };
        });
        break;
      case 3:
        setCols(4);
        res = data.map((i: any, index: number) => {
          return {
            ...i,
            rows: index !== 0 ? 1 : 2,
            cols: 2,
          };
        });
        break;
      case 4:
        setCols(2);
        res = data.map((i: any) => {
          return {
            ...i,
            rows: 1,
            cols: 1,
          };
        });
        break;
      case 5:
        setCols(4);
        res = data.map((i: any, index: number) => {
          return {
            ...i,
            cols: index < 3 ? 2 : 1,
            rows: 1,
          };
        });
        break;
      case 6:
        setCols(3);
        res = data.map((i: any) => {
          return {
            ...i,
            rows: 1,
            cols: 1,
          };
        });
        break;

      default:
        break;
    }
    return res;
  }, [data]);

  return (
    <ImageList variant='quilted' cols={cols}>
      {gridList.map((item: any) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img {...srcset(item.img, 30, item.rows, item.cols)} alt={item.title} loading='lazy' />
        </ImageListItem>
      ))}
    </ImageList>
  );
});
Images.displayName = 'Images';

function ArticleCard({ article, history }: any) {
  const viewArticle = () => {
    history.push(`/article/${article.articleId}`);
  };
  return (
    <div className='article-card-wrap'>
      <div className='card'>
        <div className='card-header'>
          {/* <p className='category-tag' style={{ background: article.tag.color }}>
            {article.tag.title}
          </p> */}
        </div>
        <div className='card-body'>
          {article?.label?.map((i: any) => {
            return <Tag value={i} key={i.id} />;
          })}
          <h2 className='bog-title' onClick={viewArticle}>
            {article?.title}
          </h2>
          <p className='blog-description'>{article?.brief}</p>

          {/* <div className='meta'>
            {article?.meta.map((item: any) => {
              if (item.type === 0) {
                return <img style={{ width: '4rem', height: '4rem' }} src={`/api/${item.file}`} alt='' />;
              }
              if (item.type === 1) {
                return <img style={{ width: '4rem', height: '4rem' }} src={`/api/${item.file}`} alt='' />;
              }
              if (item.type === 2) {
                // eslint-disable-next-line jsx-a11y/media-has-caption
                return (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video style={{ objectFit: 'fill' }} width='100%' height='300px' src={`/api/${item.file}`} controls />
                );
              }
            })}
          </div> */}
          <Images data={itemData} />
          <div className='card-footer flex'>
            <span className='time'>{dayjs(article.createTime).fromNow()}</span>
          </div>
        </div>
      </div>
      {/* <div className='header'>
        <span className='time'>{dayjs(article.createTime).fromNow()}</span>
      </div>
      <div className='brief'>
        <p className='blog-description'>{article?.brief}</p>
      </div> */}
    </div>
  );
}

export default withRouter(ArticleCard);
