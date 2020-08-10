import Link from 'next/link';
import { useState } from 'react';
import { useUser, useVerifyEmail, useLogout } from '../../hooks';
import { getMenuData } from '../../utils';

const MenuItem = ({ item }) => {
  if (item.href) {
    return (
      <Link href={item.href}>
        <a className="navbar-item" {...item.aProps}>
          {item.itemProps.title}
        </a>
      </Link>
    );
  } else {
    return (
      <a className="navbar-item" {...item.aProps}>
        {item.itemProps.title}
      </a>
    );
  }
};

const TwitterMobileNavBar = ({ title }) => {
  const [active, setActive] = useState('');
  const { currentUser  } = useUser();
  const [logout] = useLogout();
  const [verifyEmail] = useVerifyEmail();
  const menuData = getMenuData(currentUser, logout, verifyEmail);
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
          {
            menuData.map((item) => <MenuItem key={item.itemProps.title} item={item} />)
          }
        </div>
      </div>
    </nav>
  );
};

export default TwitterMobileNavBar;
