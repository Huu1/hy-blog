import React from 'react';
import './index.scss';
import { createPortal } from 'react-dom';
import SwipeableViews from 'react-swipeable-views';

interface IProps {
  style?: any;
  onClickClose?: () => any;
  onHandleChange?: () => any;
  data: any[];
  index: number;
}

export default class ImgPriview extends React.PureComponent<IProps> {
  popupMaskNode: HTMLDivElement;

  html: HTMLElement | null = document.querySelector('html');

  constructor(props: IProps) {
    super(props);
    this.html?.classList.add('overflow-y-hidden');

    // 添加元素
    const doc = window.document;
    this.popupMaskNode = doc.createElement('div');
    doc.body.append(this.popupMaskNode);
  }

  componentWillUnmount() {
    // 在组件从 DOM 中移除之前立刻被调用
    this.html?.classList.remove('overflow-y-hidden');
    this.popupMaskNode.remove();
  }

  render() {
    const { children, style, onClickClose, data, index } = this.props;
    return createPortal(
      <div className={`popup_content_mask ${''}`} style={style} onClick={onClickClose}>
        <div>
          <SwipeableViews slideStyle={{ display: 'flex', alignItems: 'center' }} index={index}>
            {data.map((url) => {
              return <img key={url} src={url} style={{ width: '100%', maxWidth: '100%', objectFit: 'fill' }} alt='' />;
            })}
          </SwipeableViews>
        </div>
      </div>, // 塞进传送门的JSX
      this.popupMaskNode, // 传送门的另一端DOM popupMaskNode
    );
  }
}
