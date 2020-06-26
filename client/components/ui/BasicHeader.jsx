import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
  const [active, setActive] = useState('');
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand is-size-4">
          <Link href="/">
            <a href="/" className="navbar-item has-text-danger">
              <i className="far fa-keyboard" />
              <strong>&nbsp;Next.js starter</strong>
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
          <div className="navbar-end">
            <Link href="#features"><a className="navbar-item">Features</a></Link>
            <Link href="#about"><a className="navbar-item">About</a></Link>
            <Link href="/twitter"><a className="navbar-item">Twitter demo</a></Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
