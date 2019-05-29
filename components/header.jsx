import Link from 'next/link';
import React from 'react';
import LogoutButton from './LogoutButton';
import { ManagedQuery } from '../lib/hocs';
import { CURRENT_USER } from '../lib/queries';


const Header = ({ currentUser }) => (
  <nav className="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand is-size-4">
        <Link href="/">
          <a href="/" className="navbar-item has-text-danger">
            <i className="far fa-keyboard" />
            <strong>&nbsp;Next starter</strong>
          </a>
        </Link>

        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link href="/"><a className="navbar-item">Home</a></Link>
          <Link href="/comments"><a className="navbar-item">Comments</a></Link>

          <Link href="/"><a className="navbar-item">Protected</a></Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <Link href="/"><a className="navbar-item">About</a></Link>
              <Link href="/"><a className="navbar-item">Contact</a></Link>
              <hr className="navbar-divider" />
              <Link href="/"><a className="navbar-item">Report an issue</a></Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              { currentUser ? <LogoutButton /> : (
                <React.Fragment>
                  <Link href="/signup"><a className="button is-primary"><strong>Sign up</strong></a></Link>
                  <Link href="/login"><a className="button is-light">Log in</a></Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default () => (
  <ManagedQuery query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (error) {
        console.log(error); // todo: handle errors
        return null;
      }
      if (loading) return null;
      return (
        <Header currentUser={data.currentUser} />
      );
    }}
  </ManagedQuery>
);
