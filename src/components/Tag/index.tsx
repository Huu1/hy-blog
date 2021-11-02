import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

interface ITag {
  style?: any;
  onClickHandle?: () => void;
  value?: any;
}

function Tag(props: ITag) {
  const { style, value, onClickHandle } = props;
  return (
    <NavLink to='xx' className='tag-wrap' style={{ ...style }} onClick={onClickHandle}>
      {value.title}
    </NavLink>
  );
}

Tag.defaultProps = {
  style: {},
  value: null,
  onClickHandle: () => {},
};

export default Tag;
