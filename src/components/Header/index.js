import React from 'react';
import './Header.css';

import userImage from "../../assets/images/user.jpg"

const Header = () => (
  <header className="site-header">
    <div className="site-header__wrapper">
      <p className="site-header__logo">Private Vpn</p>
      <div className="user-account">
        <p className="user-account__expiry">
          <span>604 </span>
          Days Left
        </p>
        <button className="user-account__dropdown-btn">
          <img 
            src={userImage}
            alt=""
            width="32"
            height="32"
          />
        </button>
      </div>
    </div>
  </header>
);


export default Header;