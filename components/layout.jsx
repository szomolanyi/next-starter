import Head from 'next/head'

import { MDBContainer } from 'mdbreact'

import Header from './header-bulma'

const Layout = (props) => (
  <div>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css" />
      <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    </Head>
    <MDBContainer>
      <Header></Header>
      {props.children}
    </MDBContainer>
  </div>
)

export default Layout
