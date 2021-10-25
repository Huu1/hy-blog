import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addNewPost, fetchPosts, selectAllPosts } from 'Src/store/feature/testslice';
import './index.scss';

function Test() {
  // const dispatch = useDispatch();
  // const posts = useSelector(selectAllPosts);

  // const postStatus = useSelector((state: any) => state.posts.status);
  // const error = useSelector((state: any) => state.posts.error);

  // console.log(postStatus, error, posts);

  // useEffect(() => {
  //   if (postStatus === 'idle') {
  //     dispatch(fetchPosts());
  //     dispatch(addNewPost());
  //   }
  // }, [postStatus, dispatch]);
  return <div>Test</div>;
}

export default Test;
