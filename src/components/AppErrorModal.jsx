import React from 'react';

class AppErrorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
    // You can also log the error to an error reporting service
  }

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;
    return (
      <React.Fragment>
        <div className={`modal ${hasError ? 'is-active' : ''}`}>
          <div className="modal-background" />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Error occured</p>
              <button type="button" className="delete" aria-label="close" onClick={() => this.setState({ hasError: false, error: null, info: null })} />
            </header>
            <section className="modal-card-body">
              <p>Something went wrong.</p>
              <p>{JSON.stringify(error)}</p>
              <p>{JSON.stringify(info)}</p>
            </section>
          </div>
        </div>
        {children}
      </React.Fragment>
    );
  }
}

export default AppErrorModal;
