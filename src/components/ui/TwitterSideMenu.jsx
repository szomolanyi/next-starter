import React from 'react';
import Link from 'next/link';

import { useUser } from '../../hooks';


const MenuItem = ({
  faIconName, title, href, IconComponent, currentUser,
}) => (
  <Link href={href}>
    <a>
      <div>
        <span className={!IconComponent && 'icon'}>
          {
            IconComponent ? <IconComponent currentUser={currentUser} /> : <i className={`fas ${faIconName}`} />
          }
        </span>
        <span>{title}</span>
        <style jsx>
          {`
            span:nth-child(2) {
              margin-left: 1rem;
            }
          `}
        </style>
      </div>
    </a>
  </Link>
);

const TwitterSideMenu = () => {
  const { currentUser } = useUser();
  return (
    <aside className="menu">
      <div className="is-size-6 has-text-weight-bold">
        <ul>
          <li className="menu-list"><MenuItem faIconName="fa-home" title="Twitter home" href="/twitter/" /></li>
          <li className="menu-list"><MenuItem faIconName="fa-search" title="Explore" href="/twitter/explore" /></li>
          {
            currentUser
              ? (<li className="menu-list"><MenuItem faIconName="fa-user" title="Profile" href="/twitter/profile" /></li>)
              : (
                <>
                  <li className="menu-list"><MenuItem faIconName="fa-user-plus" title="Sign up" href="/signup" /></li>
                  <li className="menu-list"><MenuItem faIconName="fa-sign-in-alt" title="Login" href="/login" /></li>
                </>
              )
            }
          <li className="menu-list"><MenuItem faIconName="fa-window-close" title="Exit twitter" href="/" /></li>
        </ul>
        <style jsx>
          {`
            li {
              margin-bottom: 1rem;
            }
          `}
        </style>
      </div>
    </aside>
  );
};

export default TwitterSideMenu;
