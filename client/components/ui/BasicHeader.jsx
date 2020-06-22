import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
  const [active, setActive] = useState('');
  return (
    <nav className="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
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
            <Link href="/twitter"><a className="navbar-item">Twitter demo</a></Link>
            <Link href="#features"><a className="navbar-item">Features</a></Link>
            <Link href="/"><a className="navbar-item">Contact</a></Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
