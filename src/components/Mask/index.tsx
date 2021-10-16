import React, { CSSProperties } from 'react';
import './index.scss';
import { createPortal } from 'react-dom';

interface IProps {
  style?: any;
  onClickClose?: () => any;
}

export default class PopupMask extends React.Component<IProps> {
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
    const { children, style, onClickClose } = this.props;
    return createPortal(
      <div className={`popup_content_mask ${''}`} style={style} onClick={onClickClose}>
        {children}
      </div>, // 塞进传送门的JSX
      this.popupMaskNode, // 传送门的另一端DOM popupMaskNode
    );
  }
}
