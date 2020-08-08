import React, { useContext } from 'react';
import Link from 'next/link';
import TwitterContext from '../../context';
import { useUser, useLogout, useVerifyEmail } from '../../hooks';
import { getMenuData } from '../../utils';

const MenuItem = ({ faIconName, title }) => (
  <div>
    <span className="icon">
      <i className={faIconName} />
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
);

const LinkMenuItem2 = ({
  href, aProps, itemProps,
}) => {
  if (href) {
    return (
      <Link href={href}>
        <a {...aProps}>
          <MenuItem {...itemProps} />
        </a>
      </Link>
    );
  }
  return (
    <a {...aProps}>
      <MenuItem {...itemProps} />
    </a>
  );
};

const TwitterSideMenu = () => {
  const { currentUser } = useUser();
  const { openNewTweetModal } = useContext(TwitterContext);
  const [logout] = useLogout();
  const [verifyEmail] = useVerifyEmail();
  const menuData = getMenuData(currentUser, logout, verifyEmail);
  return (
    <aside className="menu">
      <div className="is-size-5 has-text-weight-bold twitter-side-menu">
        <ul>
          {
            menuData.map((item) => (
              <li key={item.itemProps.title} className={item.className}>
                <LinkMenuItem2
                  itemProps={item.itemProps}
                  href={item.href}
                  aProps={item.aProps}
                />
              </li>
            ))
          }
        </ul>
        <button
          type="button"
          className="button is-rounded is-link"
          onClick={() => openNewTweetModal(null)}
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
