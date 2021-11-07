import Skeleton from '@material-ui/core/Skeleton';
import React, { useEffect, useRef, useState } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import './index.scss';

const ArticleContent = (props: any) => {
  const content = useRef<any>();
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (props.value) {
      Vditor.preview(content.current as HTMLDivElement, props.value, {
        mode: 'light',
        after: () => {
          setInit(true);
        },
      });
    }
  }, [props]);

  return (
    <>
      {!init && (
        <div>
          <Skeleton animation='wave' height={30} width='30%' />
          <Skeleton height={30} width='100%' />
          <Skeleton height={80} width='80%' />
          <Skeleton height={80} width='100%' />
          <Skeleton height={30} width='60%' />
        </div>
      )}
      <div style={{ minHeight: '8rem' }} ref={content} />
    </>
  );
};

export default React.memo(ArticleContent);
