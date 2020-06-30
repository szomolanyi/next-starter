import '../../styles/styles.sass';

import React from 'react';
import Head from 'next/head';

const Layout = ({ children }) => (
  <>
    <Head>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
      <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript" />
    </Head>
    {children}
    <style global jsx>
      {
        `html {
          scroll-behavior: smooth;
        }
        `
      }
    </style>
  </>
);


export default Layout;
