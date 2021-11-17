import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Modal from 'Src/components/Modal';
import menuList from 'Src/config/menu';
import { getUser } from 'Src/store/feature/userSlice';
import PopupMask from '../../../components/Mask';
import Search from '../../../components/Search';
import './index.scss';

const search = require('../../../assets/search.svg');

function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const user = useSelector(getUser);

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

        <div className=' mr-left-auto flex column-center'>
          <i className='icon iconfont pointer icon-sousuo' onClick={searchActiveChange} />
          {user && (
            <Avatar style={{ marginLeft: '.5em' }} sx={{ width: 20, height: 20 }} src='/static/images/avatar/1.jpg' />
          )}
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
