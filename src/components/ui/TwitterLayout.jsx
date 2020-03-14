import '../../styles/styles.sass';

import Head from 'next/head';

import { useState } from 'react';

import AppMessageModal from './AppMessageModal';
import TwitterSideMenu from './TwitterSideMenu';
import TwitterNavBar from './TwitterNavBar';
import TwitterMobileNavBar from './TwitterMobileNavBar';
import TweetForm from '../tweets/TweetForm';

const Layout = ({ title, children }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const closeModal = () => setModalOpened(false);
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
            <TwitterSideMenu setModalOpened={setModalOpened} />
          </div>
          <main className="column is-6-desktop">
            <TwitterNavBar title={title} />
            <AppMessageModal />
            <section className="section">
              {children}
            </section>
            <div className={`modal ${modalOpened ? 'is-active' : ''}`}>
              <div className="modal-background" />
              <div className="modal-content">
                <TweetForm
                  initialValues={{
                    text: '',
                  }}
                  postSubmit={closeModal}
                />
              </div>
              <button type="button" className="modal-close is-large" aria-label="close" onClick={closeModal} />
            </div>
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
  );
};

export default Layout;
