import React, { useEffect, useState } from 'react';
import Modal from 'Src/components/Modal';
import Search from 'Src/components/Search';
import './index.scss';

function Test() {
  const [isOpen, setOpen] = useState(false);
  const open = () => {
    setOpen((i) => !i);
  };
  return (
    <div onClick={open}>
      {isOpen && (
        <Modal
          onCancleClick={() => {
            setOpen(false);
          }}
          onCancleMask
        >
          <Search />
        </Modal>
      )}
      点击
    </div>
  );
}

export default Test;
