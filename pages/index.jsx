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
            NEXT.JS STARTER <a className="is-info" href="https://nextjs.org/">Next.js</a>
          </h1>
          <h2 className="subtitle">
            Next.js + GraphQL boilerplate
          </h2>
          <a href="https://github.com/szomolanyi/next-starter" className="button is-rounded is-link mr-4">Github</a>
          <Link href="/twitter"><a className="button is-rounded">Twitter demo</a></Link>
        </div>
      </div>
    </section>
    <section className="hero is-black is-medium" id="features">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-offset-one-quarter">
              <h1 className="title">
                FEATURES
              </h1>
              <div>
                <ul>
                  <li>
                    <a className="has-text-danger" href="https://nextjs.org/">Next.js</a>
                    {' '}
                    application with SSR
                  </li>
                  <li><a className="has-text-danger" href="https://www.apollographql.com/">Apollo GraphQL API server</a> with Mongo database support</li>
                  <li>Apollo GraphQL client with SSR</li>
                  <li>Password or social based authentication</li>
                  <li><a className="has-text-danger" href="https://cloudinary.com/">Cloudinary</a> image handling</li>
                  <li><a className="has-text-danger" href="https://bulma.ioBulma/">Bulma</a> CSS framework</li>
                  <li><a className="has-text-danger" href="https://sendgrid.com/">Sendgrid</a> email processing</li>
                  <li><a className="has-text-danger" href="https://vercel.com/">Vercer</a> deployment</li>
                  <li><Link href="/twitter"><a className="has-text-danger">Twitter demo</a></Link> application</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="about" className="hero is-light is-medium">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">About</h1>
          <p>Hi, my name is Robert. I am author of Next.JS STARTER project. It is my atempt to provide boilerplate for rapid development of full stack web applications based on NEXT.JS, GraphQL and Mongo database trio.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default withApollo(Index, { ssr: false });
