import '../../styles/styles.sass';

import Head from 'next/head';

import React, { useState } from 'react';

import AppMessageModal from './AppMessageModal';
import TwitterSideMenu from './TwitterSideMenu';
import TwitterNavBar from './TwitterNavBar';
import TwitterMobileNavBar from './TwitterMobileNavBar';
import TweetForm from '../tweets/TweetForm';

import TwitterContext from '../../context';

const Layout = ({ title, children }) => {
  const [newTweetModal, setNewTweetModal] = useState({ isOpen: false, replyOn: null });
  const openNewTweetModal = (replyOn) => setNewTweetModal({ isOpen: true, replyOn });
  const closeNewTweetModal = () => setNewTweetModal({ isOpen: false, replyOn: null });
  return (
    <TwitterContext.Provider value={{ openNewTweetModal }}>
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
            <div className={`modal ${newTweetModal.isOpen ? 'is-active' : ''}`}>
              <div className="modal-background" />
              <div className="modal-content">
                <TweetForm
                  initialValues={{
                    text: '',
                  }}
                  postSubmit={closeNewTweetModal}
                  replyOn={newTweetModal.replyOn}
                />
              </div>
              <button type="button" className="modal-close is-large" aria-label="close" onClick={closeNewTweetModal} />
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
    </TwitterContext.Provider>
  );
};

export default Layout;
