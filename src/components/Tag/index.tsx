import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

interface ITag {
  onClickHandle?: () => void;
  value?: any;
}

function Tag(props: ITag) {
  const { value, onClickHandle } = props;
  return (
    <NavLink to='xx' onClick={onClickHandle}>
      <p className='blog-hashtag'>#{value.title}</p>
    </NavLink>
  );
}

Tag.defaultProps = {
  value: null,
  onClickHandle: () => {},
};

export default Tag;
