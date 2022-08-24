import React, { useState } from 'react';
import Categorie from './NavBarCategori/Categorie';
import { NAVBARDATA_TEXT } from './NavBarData/NavBarData';
import Cart from '../Cart/Cart';
import Login from '../../pages/Login/Login';
import './Nav.scss';

const Nav = () => {
  const [newNav, setNewNav] = useState(false);
  const [menuState, setMenuState] = useState(0);
  const [listNow, setListNow] = useState();
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toglleCart = () => setShowLogin(showLogin => !showLogin);

  const toggleCart = () => setShowCart(showCart => !showCart);

  return (
    <>
      {showLogin && <Login toglleCart={toglleCart} />}
      {showCart && <Cart toggleCart={toggleCart} />}
      {!showCart && (
        <div className="nav">
          <div className="topNav">
            <nav className="mainNav">
              <ul
                className="navUl"
                onClick={e => {
                  setListNow(e.target.innerText);
                }}
              >
                {NAVBARDATA_TEXT.map(top => (
                  <li
                    key={top.id}
                    className={
                      listNow === top.mainMenu ? 'navList border' : 'navList'
                    }
                  >
                    <a
                      className="clickList"
                      onClick={e => {
                        e.preventDefault();
                        setNewNav(true);
                        setMenuState(top.id);
                      }}
                      href="/"
                    >
                      {top.mainMenu}
                    </a>
                  </li>
                ))}
                <li className="navList">
                  <a
                    onClick={e => {
                      e.preventDefault();
                    }}
                    className="clickList"
                    href="/"
                  >
                    스토어
                  </a>
                </li>
                <li className="navList">
                  <a className="clickList" href="/">
                    <img
                      className="searchImg"
                      src="/image/search.webp"
                      alt="검색이미지"
                    />
                  </a>
                </li>
                <li className="navList">
                  {newNav && (
                    <button className="end" onClick={() => setNewNav(false)}>
                      닫기 X
                    </button>
                  )}
                </li>
              </ul>
            </nav>
            <nav className="subNav">
              <ul className="rightUl">
                <button className="rightButton" onClick={toglleCart}>
                  로그인
                </button>
                <button className="rightButton" onClick={toggleCart}>
                  카트
                </button>
              </ul>
            </nav>
          </div>

          <div className={newNav ? 'perfume on' : 'perfume'}>
            <Categorie
              color={NAVBARDATA_TEXT[menuState].backgroundColor}
              data={NAVBARDATA_TEXT[menuState].subMenu}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
