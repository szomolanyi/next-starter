import Link from 'next/link';
import React, { useState } from 'react';
import LogoutLink from '../users/LogoutLink';
import VerifyEmailLink from '../users/VerifyEmailLink';
import { useUser } from '../../hooks';


const NotLogged = () => (
  <div className="navbar-item">
    <div className="buttons">
      <Link href="/signup"><a className="button is-primary"><strong>Sign up</strong></a></Link>
      <Link href="/login"><a className="button is-light">Log in</a></Link>
    </div>
  </div>
);

const Avatar = ({ currentUser }) => {
  if (!currentUser) {
    return <i className="fas fa-user" />;
  }
  if (!currentUser.isVerified) {
    return <i className="fas fa-user-lock has-text-danger" />;
  }
  if (currentUser.avatar) {
    return (
      <figure className="image is-32x32">
        <img src={currentUser.avatar} alt="" />
      </figure>
    )
  }
  return <i className="fas fa-user" />;
};

const Logged = ({ currentUser }) => {
  return (
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
};

const Header = () => {
  const [active, setActive] = useState('');
  const { currentUser } = useUser();
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
          <div className="navbar-start">
            <Link href="/"><a className="navbar-item">Home</a></Link>
            <Link href="/comments"><a className="navbar-item">Comments</a></Link>

            <Link href="/"><a className="navbar-item">Protected</a></Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <Link href="/"><a className="navbar-item">About</a></Link>
                <Link href="/"><a className="navbar-item">Contact</a></Link>
                <hr className="navbar-divider" />
                <Link href="/"><a className="navbar-item">Report an issue</a></Link>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            {
              currentUser ? <Logged currentUser={currentUser} /> : <NotLogged />
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
