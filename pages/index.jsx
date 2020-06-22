import Link from 'next/link';
// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/BasicLayout';

const Index = () => (
  <Layout>
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            NEXT STARTER
          </h1>
          <h2 className="subtitle">
            Next.js + GraphQl boilerplate
          </h2>
          <a href="https://github.com/szomolanyi/next-starter" className="button is-rounded is-primary">Github</a>
          <Link href="/twitter"><a className="button is-rounded is-success">Twitter demo</a></Link>
        </div>
      </div>
    </section>
    <section className="hero is-black is-fullheight" id="features">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            FEATURES
          </h1>
          <h2 className="subtitle">
            Next.js + GraphQl boilerplate
          </h2>
        </div>
      </div>
    </section>
  </Layout>
);

export default withApollo(Index, { ssr: false });
