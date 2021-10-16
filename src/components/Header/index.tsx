import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PopupMask from '../Mask';
import Search from '../Search';
import './index.scss';

const search = require('../../assets/search.svg');

interface IHeader {
  menus: any;
}

function Header(props: IHeader) {
  const {
    menus = [
      { label: 'Home', url: '/home' },
      { label: 'Author', url: '/author' },
      { label: 'Test', url: '/Test' },
    ],
  } = props;

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
          {menus.map((m: any) => {
            return (
              <li key={m.label}>
                <NavLink
                  to={m.url}
                  onClick={() => menuActiveChange(false)}
                  style={{ textDecoration: 'none', color: '#73777D' }}
                  activeClassName='checked'
                >
                  <span>{m.label}</span>
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
        <div className='flex' onClick={() => menuActiveChange(!menuActive)}>
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
        <PopupMask
          style={{ zIndex: 10 }}
          onClickClose={() => {
            setSearchActive(false);
          }}
        >
          <Search />
        </PopupMask>
      )}
    </header>
  );
}

export default Header;
