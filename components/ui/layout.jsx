import '../../styles/styles.sass';

import React from 'react';
import Head from 'next/head';

// import AppError from '../components/AppError';
import Header from './header';
import AppMessageModal from './AppMessageModal';

const Layout = ({ children }) => (
  <React.Fragment>
    <Head>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
    </Head>
    <Header />
    <AppMessageModal />
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          {children}
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Layout;
