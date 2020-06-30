import Link from 'next/link';
// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import Layout from '../client/components/ui/BasicLayout';
import Header from '../client/components/ui/BasicHeader';

const ScrollArrow = ({ href, direction }) => (
  <p className="mt-6 has-text-centered">
    <span className="icon is-large">
      <a href={href} className="has-text-danger"><i className={`fas fa-angle-double-${direction} fa-2x`} aria-hidden="true" /></a>
    </span>
  </p>
);

const Index = () => (
  <Layout>
    <section className="hero has-background-info-light is-fullheight" id="start">
      <div className="hero-head">
        <Header />
      </div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            NEXT.JS STARTER
          </h1>
          <h2 className="subtitle">
            Next.js + GraphQL boilerplate
          </h2>
          <a href="https://github.com/szomolanyi/next-starter" className="button is-rounded is-link mr-4">Github</a>
          <Link href="/twitter"><a className="button is-rounded">Twitter demo</a></Link>
          <ScrollArrow href="#features" direction="down" />
        </div>
      </div>
    </section>
    <section className="hero has-background-primary-light is-fullheight" id="features">
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
                    application, SSR support
                  </li>
                  <li><a className="has-text-danger" href="https://www.apollographql.com/">Apollo GraphQL API server</a></li>
                  <li>Apollo GraphQL client</li>
                  <li><a className="has-text-danger" href="https://www.mongodb.com">Mongo database</a></li>
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
          <ScrollArrow href="#about" direction="down" />
        </div>
      </div>
    </section>
    <section id="about" className="hero has-background-info-light is-fullheight">
      <div className="hero-body">
        <div className="container has-text-left">
          <h1 className="title">About</h1>
          <p>Hi, my name is Robert and I am author of NEXT.JS STARTER project.</p>
          <p>It is my atempt to provide boilerplate for rapid development of full stack web applications based on NEXT.JS, GraphQL and Mongo database trio.</p>
          <p>If you have some suggestions, ideas or requests to modify Next.js starter, feel free to send email to <a href="mailto:szomolanyi@gmail.com" className="has-text-danger">szomolanyi@gmail.com</a>.</p>
          <ScrollArrow href="#start" direction="up" />
        </div>
      </div>
    </section>
  </Layout>
);

export default withApollo(Index, { ssr: false });
