import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '../../hooks';

const TwitterMobileNavBar = ({ title }) => {
  const [active, setActive] = useState('');
  const { currentUserId } = useUser();
  return (
    <nav className="navbar has-shadow is-spaced is-hidden-tablet is-spaced" style={{ height: '3.25rem' }} role="navigation" aria-label="main navigation">
      <div className="navbar-brand is-size-4">
        <div className="navbar-item">
          <strong>{title}</strong>
        </div>

        <a
          role="button"
          tabIndex={0}
          className={`navbar-burger burger ${active}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="mobileNav"
          onClick={() => (active === 'is-active' ? setActive('') : setActive('is-active'))}
          onKeyPress={() => (active === 'is-active' ? setActive('') : setActive('is-active'))}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="mobileNav" className={`navbar-menu ${active}`}>
        <div className="navbar-start">
          <Link href="/twitter/"><a className="navbar-item">Home</a></Link>
          <Link href="/twitter/explore"><a className="navbar-item">Explore</a></Link>
          {
            currentUserId && (
              <Link href="/twitter/profile"><a className="navbar-item">Profile</a></Link>
            )
          }
          <Link href="/"><a className="navbar-item">Exit twitter</a></Link>
        </div>
      </div>
    </nav>
  );
};

export default TwitterMobileNavBar;
