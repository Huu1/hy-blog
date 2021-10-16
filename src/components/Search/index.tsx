import React from 'react';
import './index.scss';

function Search() {
  return (
    <div className='search-wrap'>
      <div className='close'>X</div>
      <div
        className='search-box'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input type='text' placeholder='搜索...' />
        <div className='content' />
      </div>
    </div>
  );
}

export default Search;
