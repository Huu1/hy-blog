import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

  return (
    <header id='header' className={`header-padding transition ${menuActive ? 'header-animation' : ''}`}>
      <nav className='nav-wrapper flex justify-between column-center'>
        <ul className='menu flex'>
          {menus.map((m: any) => {
            return (
              <li key={m.label}>
                <NavLink
                  to={m.url}
                  onClick={() => setMenuActive(false)}
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
        <div className='flex' onClick={() => setMenuActive(!menuActive)}>
          <div className='menu-button'>
            <i className='icon iconfont icon-caidan' />
          </div>
          <span className='inline-block mr-left'>Menu</span>
        </div>

        <div className='pointer mr-left-auto '>
          <i className='icon iconfont icon-sousuo' />
        </div>
      </nav>
    </header>
  );
}

export default Header;
