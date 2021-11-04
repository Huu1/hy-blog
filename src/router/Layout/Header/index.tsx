import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Modal from 'Src/components/Modal';
import menuList from 'Src/config/menu';
import PopupMask from '../../../components/Mask';
import Search from '../../../components/Search';
import './index.scss';

const search = require('../../../assets/search.svg');

function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const menuActiveChange = (value: boolean) => {
    setMenuActive(value);
  };

  const searchActiveChange = () => {
    setMenuActive(false);
    setSearchActive(!searchActive);
  };

  return (
    <header id='header' className={`header-padding transition ${menuActive ? 'header-animation' : ''}`}>
      <nav className='nav-wrapper flex justify-between column-center'>
        <ul className='menu flex'>
          {menuList.map((m: any) => {
            return (
              <li key={m.title}>
                <NavLink
                  to={m.path}
                  onClick={() => menuActiveChange(false)}
                  style={{ textDecoration: 'none', color: '#73777D' }}
                  activeClassName='checked'
                >
                  <span>{m.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <ul className='nav-meta'>
          <li className='pointer'>
            <img src={search} alt='' />{' '}
          </li>
        </ul>
      </nav>
      <nav className={`nav-mobile header-padding transition flex column-center ${menuActive ? 'active-bgcolor' : ''}`}>
        <div className='flex column-center' onClick={() => menuActiveChange(!menuActive)}>
          <div className='menu-button'>
            <i className='icon iconfont icon-caidan' />
          </div>
          <span className='inline-block mr-left'>Menu</span>
        </div>

        <div className='pointer mr-left-auto ' onClick={searchActiveChange}>
          <i className='icon iconfont icon-sousuo' />
        </div>
      </nav>
      {menuActive && (
        <PopupMask
          onClickClose={() => {
            menuActiveChange(false);
          }}
        />
      )}
      {searchActive && (
        <Modal
          onCancleClick={() => {
            setSearchActive(false);
          }}
          onCancleMask
        >
          <Search />
        </Modal>
      )}
    </header>
  );
}

export default withRouter(Header);
