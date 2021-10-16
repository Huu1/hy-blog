import React, { useEffect, useRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import './index.scss';

const ArticleContent = () => {
  const content = useRef<any>();
  useEffect(() => {
    Vditor.preview(
      content.current as HTMLDivElement,
      '<h1>sdfd</h1><h1>sdfd</h1><h1>sdfd</h1><h1>sdfd</h1><h1>sdfd</h1>',
    );
  }, []);
  return <div ref={content} />;
};

export default ArticleContent;
