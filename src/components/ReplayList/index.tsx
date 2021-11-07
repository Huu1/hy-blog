import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import './index.scss';

const Item = (props: any) => {
  const { data, isSon = false, toReplay, commentId } = props;

  const onReplayHandle = (param: any) => {
    toReplay({ ...param, commentId });
  };

  return (
    <>
      <div className='comment-main-level'>
        <div className='comment-avatar'>
          <img src={data.user.avatar} alt='' />
        </div>
        <div className='comment-box'>
          <div className='comment-head flex column-center'>
            <div>
              <h6 className='comment-name '>
                <span>{data.user.username}</span>
              </h6>
              <span>{data.createTime}</span>
            </div>
            <span style={{ marginLeft: 'auto', alignSelf: 'flex-start' }}>
              {!isSon && (
                <span>
                  <i className='icon iconfont icon-dianzan' />
                  <span>12</span>
                </span>
              )}
              {!isSon ? (
                <span
                  onClick={() => {
                    onReplayHandle(data);
                  }}
                >
                  <i className='icon iconfont icon-pinglun1' />
                  <span>{data?.replay?.length || 0}</span>
                </span>
              ) : (
                <span
                  onClick={() => {
                    onReplayHandle(data);
                  }}
                >
                  <i className='icon iconfont icon-pinglun1' />
                  <span>&nbsp;回复</span>
                </span>
              )}
            </span>
          </div>
          <div className='comment-content'>
            {data.content}
            {data.toUser && data.toReplay && (
              <div className='comment-content' style={{ background: '#eaecf1', marginTop: '.3em', padding: '.3em' }}>
                <span>“</span> {data.toReplay.content}
                <span>”</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const initRealData = (data = []) => {
  return [...data].slice(0, data && data.length > 2 ? 2 : data.length);
};

const ReplayList = (props: any) => {
  const { data, toReplay, commentId } = props;
  const [isAll, setIsAll] = useState(false);
  const [realData, setRealData] = useState<any[]>(initRealData(data));

  const realDataChange = () => {
    setIsAll((p) => {
      if (p) {
        setRealData(initRealData(data));
      } else {
        setRealData([...data]);
      }
      return !p;
    });
  };

  // 渲染 改变时两次  未修复

  return (
    <ul className='comments-list reply-list'>
      {realData.map((replay: any) => {
        return (
          <li key={replay.id}>
            <Item data={replay} commentId={commentId} toReplay={toReplay} isSon />
          </li>
        );
      })}
      <div style={{ textAlign: 'center' }}>
        <Button variant='text' size='small' onClick={realDataChange} style={{ color: 'black' }}>
          {isAll ? '收起' : '显示全部'}
        </Button>
      </div>
    </ul>
  );
};

const CommentList = (props: any) => {
  const { data, onCommentHandle } = props;

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const toReplay = (param: any): void => {
    const {
      user: { userId },
      commentId,
      id,
    } = param;
    const replayParam = {
      commentId: commentId || id,
      toUid: commentId ? userId : null,
      toReplayId: commentId ? id : null,
    };
    onCommentHandle(replayParam);
  };

  return (
    <>
      {data && (
        <div className='comments-container inner'>
          <ul id='comments-list' className='comments-list'>
            {data.map((comment: any) => {
              return (
                <li key={comment.id}>
                  <Item data={comment} toReplay={toReplay} />

                  {Array.isArray(comment.replay) && comment.replay.length > 1 && (
                    <ReplayList toReplay={toReplay} commentId={comment.id} data={comment.replay} />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default React.memo(CommentList);
