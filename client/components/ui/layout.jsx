import React from 'react';
import Head from 'next/head';

import Header from './header';
import AppMessageModal from './AppMessageModal';

const Layout = ({ children }) => (
  <>
    <Head>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
      <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript" />
    </Head>
    <Header />
    <AppMessageModal />
    {children}
  </>
);

export default Layout;
