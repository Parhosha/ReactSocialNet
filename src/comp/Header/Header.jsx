import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
  return (
    <header>
      <h1>SITENAME</h1>

      <p>
        <NavLink to="/Content" activeClassName={s.activeLink}>
          {' '}
          Content
        </NavLink>
      </p>

      <p>
        <NavLink to="/Users" activeClassName={s.activeLink}>
          Users
        </NavLink>
      </p>
      {props.login ? <Redirect to="/Content" /> : ''}
      <p>
        <NavLink to="/Login" activeClassName={s.activeLink}>
          {props.auth ? props.login : 'Login'}
        </NavLink>
      </p>
    </header>
  );
};

export default Header;
