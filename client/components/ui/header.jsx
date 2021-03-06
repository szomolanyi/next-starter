import Link from 'next/link';
import React, { useState } from 'react';
import LogoutLink from '../users/LogoutLink';
import VerifyEmailLink from '../users/VerifyEmailLink';
import Avatar from '../users/Avatar';
import { useUser } from '../../hooks';

const NotLogged = () => (
  <div className="navbar-item">
    <div className="buttons">
      <Link href="/signup"><a className="button is-primary"><strong>Sign up</strong></a></Link>
      <Link href="/login"><a className="button is-light">Log in</a></Link>
    </div>
  </div>
);

const Logged = ({ currentUser }) => (
  <div className="navbar-item has-dropdown is-hoverable">
    <a className="navbar-link is-arrowless"><Avatar currentUser={currentUser} /></a>
    <div className="navbar-dropdown is-right">
      <div className="navbar-item is-block">
        <p className="is-size-7">Signed in as:</p>
        <p className="has-text-weight-bold">{currentUser.email}</p>
      </div>
      <hr className="navbar-divider" />
      <Link href="/profile"><a className="navbar-item">Profile</a></Link>
      <LogoutLink />
      {
          currentUser.isVerified === false && <VerifyEmailLink />
        }
    </div>
  </div>
);

const Header = () => {
  const [active, setActive] = useState('');
  const { currentUser, loading } = useUser();
  return (
    <nav className="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand is-size-4">
          <Link href="/">
            <a href="/" className="navbar-item has-text-danger">
              <i className="far fa-keyboard" />
              <strong>&nbsp;Next starter</strong>
            </a>
          </Link>

          <a
            role="button"
            tabIndex={0}
            className={`navbar-burger burger ${active}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => (active === 'is-active' ? setActive('') : setActive('is-active'))}
            onKeyPress={() => (active === 'is-active' ? setActive('') : setActive('is-active'))}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${active}`}>
          {
            typeof window !== 'undefined'
            && !loading && (
              <div className="navbar-end">
                {
                  currentUser ? <Logged currentUser={currentUser} /> : <NotLogged />
                }
              </div>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
