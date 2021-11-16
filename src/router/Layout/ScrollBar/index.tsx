import React from 'react';
import './index.scss';

const ScrollBar = (props: { onTagChange: (value: string) => void; tagList: any[]; currentTag: string }) => {
  const { onTagChange, tagList = [], currentTag } = props;
  return (
    <div className='scrollBar-wrap'>
      {tagList.map((tag: any) => {
        return (
          <span
            onClick={() => onTagChange(tag.tagId)}
            className={`${currentTag === tag.tagId ? 'checked' : ''} item`}
            key={tag.id}
          >
            {tag.title}
          </span>
        );
      })}
    </div>
  );
};

export default React.memo(ScrollBar);
