import Head from 'next/head'


import Header from '../components/header'

const Layout = (props) => (
  <React.Fragment>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"></link>
    </Head>
    <Header></Header>
    <div className="container">
      {props.children}
    </div>
  </React.Fragment>
)

export default Layout
