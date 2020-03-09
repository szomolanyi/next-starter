import '../../styles/styles.sass';

import Head from 'next/head';

import AppMessageModal from './AppMessageModal';
import TwitterSideMenu from './TwitterSideMenu';
import TwitterNavBar from './TwitterNavBar';
import TwitterMobileNavBar from './TwitterMobileNavBar';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript" />
      </Head>
      <TwitterMobileNavBar title={title} />
      <div className="container">
        <div className="columns">
          <div className="column is-3 left-menu is-hidden-mobile">
            <TwitterSideMenu />
          </div>
          <main className="column is-6-desktop">
            <TwitterNavBar title={title} />
            <AppMessageModal />
            <section className="section">
              {children}
            </section>
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
