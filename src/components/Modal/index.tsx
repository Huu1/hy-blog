/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

interface IParops {
  onCancleClick: (e?: any) => void;
  onCancleMask: boolean;
}

class Modal extends React.PureComponent<IParops> {
  static defaultPros: {
    onCancleMask: true;
  };

  modalBackdrop: any;

  modalTarget: any;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: IParops) {
    super(props);
  }

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalBackdrop = document.createElement('div');
    this.modalTarget.className = 'react-modal';
    this.modalBackdrop.className = 'react-modal__backdrop';
    this.modalTarget.addEventListener('click', this.onMaskClick.bind(this));
    document.body.append(this.modalTarget);
    document.body.append(this.modalBackdrop);
    document.querySelector('html')?.classList.add('overflow-y-hidden');
    // eslint-disable-next-line no-underscore-dangle
    this._render();

    setTimeout(() => {
      this.modalTarget.classList.add('react-modal--in');
      this.modalBackdrop.classList.add('react-modal__backdrop--in');
    }, 40);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate() {
    // eslint-disable-next-line no-underscore-dangle
    this._render();
  }

  componentWillUnmount() {
    this.modalTarget.classList.remove('react-modal--in');
    this.modalBackdrop.classList.remove('react-modal__backdrop--in');
    document.querySelector('html')?.classList.remove('overflow-y-hidden');
    setTimeout(() => {
      this.modalTarget.removeEventListener('click', this.onMaskClick.bind(this));
      ReactDOM.unmountComponentAtNode(this.modalTarget);
      this.modalTarget.remove();
      this.modalBackdrop.remove();
    }, 500);
  }

  // eslint-disable-next-line react/sort-comp
  renderModalDialogue() {
    // you could have modal headers in here if desired
    // you could have some default actions like close / primary etc that take callbacks
    return <div className='react-modal__dialogue'>{this.props.children}</div>;
  }

  // eslint-disable-next-line no-underscore-dangle
  _render() {
    ReactDOM.render(this.renderModalDialogue(), this.modalTarget);
  }

  onMaskClick(event: any) {
    if (event.target.className?.includes('react-modal') && this.props.onCancleMask) {
      this.props.onCancleClick();
    }
  }

  render() {
    return <noscript />;
  }
}

export default Modal;
