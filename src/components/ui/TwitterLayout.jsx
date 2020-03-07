import '../../styles/styles.sass';

import React, { useState } from 'react';
import Head from 'next/head';

import AppMessageModal from './AppMessageModal';
import TwitterSideMenu from './TwitterSideMenu';
import TwitterNavBar from './TwitterNavBar';

const MobileMenu = () => (
  <div className="left-menu-expanded is-hidden-tablet">
    <TwitterSideMenu />
    <style jsx>
      {`
        div.left-menu-expanded {
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 100;
          background-color: rgb(255,255,255);
          height: 100%;
        }
      `}
    </style>
  </div>
);

const Layout = ({ title, children }) => {
  const [mobileMenuOpened, setMobileMenu] = useState(false);
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript" />
      </Head>
      <TwitterNavBar setMobileMenu={setMobileMenu} mobileMenuOpened={mobileMenuOpened} />
      <div className="container">
        {
          mobileMenuOpened && <MobileMenu />
        }
        <div className="columns">
          <div className="column is-3 left-menu is-hidden-mobile">
            <TwitterSideMenu />
          </div>
          <main className="column is-6-desktop">
            <div>
              <span className="is-size-2">Twitter example - {title}</span>
            </div>
            <hr />
            <AppMessageModal />
            {children}
          </main>
        </div>
        <style jsx>
          {`
            div.left-menu {
              border-right: 1px solid;
              border-right-color: rgb(230, 236, 240);
            }
          `}
        </style>
      </div>
    </>
  )
};

export default Layout;
