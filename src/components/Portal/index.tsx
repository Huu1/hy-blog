import React from 'react';
import ReactDOM from 'react-dom';

class NewPortal extends React.Component {
  node: HTMLDivElement;

  constructor(props: any) {
    super(props);
    this.node = document.createElement('div');
    document.body.append(this.node);
  }

  componentWillUnmount() {
    this.node.remove();
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.node);
  }
}

export default NewPortal;
