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
            IconComponent ? <IconComponent currentUser={currentUser} /> : <i className={faIconName} />
          }
        </span>
        <span>{title !== '' && title}</span>
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

const TwitterSideMenu = ({ setModalOpened }) => {
  const { currentUser } = useUser();
  return (
    <aside className="menu">
      <div className="is-size-5 has-text-weight-bold twitter-side-menu">
        <ul>
          <li className="menu-list has-text-info"><MenuItem faIconName="fab fa-twitter" href="/twitter/" /></li>
          <li className="menu-list"><MenuItem faIconName="fas fa-home" title="Home" href="/twitter/" /></li>
          <li className="menu-list"><MenuItem faIconName="fas fa-search" title="Explore" href="/twitter/explore" /></li>
          {
            currentUser
              ? (<li className="menu-list"><MenuItem faIconName="fas fa-user" title="Profile" href="/twitter/profile" /></li>)
              : (
                <>
                  <li className="menu-list"><MenuItem faIconName="fas fa-user-plus" title="Sign up" href="/signup" /></li>
                  <li className="menu-list"><MenuItem faIconName="fas fa-sign-in-alt" title="Login" href="/login" /></li>
                </>
              )
            }
          <li className="menu-list"><MenuItem faIconName="fas fa-window-close" title="Exit twitter" href="/" /></li>
        </ul>
        <button
          type="button"
          className="button is-rounded is-link"
          onClick={() => setModalOpened(true)}
        >
            Tweet
        </button>
      </div>
      <style jsx>
        {`
          li {
            margin-bottom: 1rem;
          }
          ul {
            margin-bottom: 2rem;
          }
          div.twitter-side-menu {
            margin-top: 1rem;
          }
        `}
      </style>
    </aside>
  );
};

export default TwitterSideMenu;
