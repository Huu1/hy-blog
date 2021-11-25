import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React, { useMemo, useState } from 'react';
import ImgPriview from 'Src/components/ImgPriview';
import LazyLoad from 'react-lazyload';

interface IMeta {
  file: string;
  id: number;
  type: number;
}

// eslint-disable-next-line no-shadow
enum MetaType {
  img,
  gif,
  video,
  music,
}

const getUrl = (url: string) => {
  return `/api/${url}`;
};

function srcset(image: string) {
  return {
    src: `/api/${image}`,
  };
}

const style = { height: '100%', width: '100%' };

const Images = React.memo(({ data }: any) => {
  const [cols, setCols] = useState(1);
  const [priviewVisible, setPriviewVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
            cols: index < 3 ? 2 : 2,
            rows: index < 3 ? 2 : 1,
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
    <>
      <ImageList variant='quilted' cols={cols}>
        {gridList.map((item: any, index: number) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            onClick={() => {
              setCurrentIndex(index);
              setPriviewVisible(true);
            }}
          >
            <LazyLoad throttle={200} style={{ ...style }}>
              <img {...srcset(item.img)} alt={item.title} style={{ ...style }} />
            </LazyLoad>
          </ImageListItem>
        ))}
      </ImageList>
      {priviewVisible && (
        <ImgPriview
          data={gridList.map((i: any) => getUrl(i.img))}
          index={currentIndex}
          onClickClose={() => setPriviewVisible(false)}
        />
      )}
    </>
  );
});
Images.displayName = 'Images';

const checkType = (data: IMeta[]): IMeta => {
  return data[0];
};

const Metas = (props: { data: IMeta[] }) => {
  const { data } = props;
  const item = useMemo(() => {
    return checkType(data);
  }, [data]);

  const { type, file } = item;

  if (!file) return <></>;

  if (type === MetaType.img) {
    return <Images data={data.map((i) => ({ ...i, img: i.file }))} />;
  }
  if (type === MetaType.gif) {
    return (
      <ImageListItem>
        <LazyLoad throttle={200} style={{ ...style }}>
          <img src={getUrl(file)} alt='' loading='lazy' style={{ ...style }} />
        </LazyLoad>
      </ImageListItem>
    );
  }
  if (type === MetaType.video) {
    // eslint-disable-next-line jsx-a11y/media-has-caption
    return <video controls style={{ width: '100%', height: '14rem', objectFit: 'fill' }} src={getUrl(file)} />;
  }
  return <div />;
};

export default React.memo(Metas);
