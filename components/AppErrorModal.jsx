class AppErrorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error, info })
    // You can also log the error to an error reporting service
    console.log({error, info})
  }

  render() {
    console.log({err:this.state.error, inf: this.state.info})
    return (
      <React.Fragment>
        <div className={`modal ${this.state.hasError?"is-active":""}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Error occured</p>
              <button className="delete" aria-label="close" onClick={()=>this.setState({hasError:false, error:null, info:null})}></button>
            </header>
            <section className="modal-card-body">
              <p>Something went wrong.</p>
              <p>{JSON.stringify(this.state.error)}</p>
              <p>{JSON.stringify(this.state.info)}</p>
            </section>
          </div>
        </div>
        {
          this.props.children
        }
      </React.Fragment>
    )
  }
}

export default AppErrorModal
