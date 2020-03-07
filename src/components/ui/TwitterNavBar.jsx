const TwitterNavBar = ({ setMobileMenu, mobileMenuOpened }) => {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigatio">
        <div className="container">
          <div className="navbar-brand">
            <a
              className="navbar-item is-hidden-tablet"
              onClick={() => setMobileMenu(!mobileMenuOpened)}
            >
              <span className="icon"><i className="fas fa-bars" /></span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TwitterNavBar;
