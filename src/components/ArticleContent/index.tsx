import React, { useEffect, useRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import './index.scss';

const ArticleContent = (props: any) => {
  const { value } = props;
  const content = useRef<any>();
  useEffect(() => {
    if (value) {
      Vditor.preview(content.current as HTMLDivElement, value);
    }
  }, [value]);
  return <div ref={content} />;
};

export default ArticleContent;
