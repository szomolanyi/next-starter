import Link from 'next/link'

import { graphql, compose } from 'react-apollo'
import { Query } from "react-apollo"
import gql from "graphql-tag"

import Layout from '../components/layout'

const Index = () => (
  <Layout>
    <Query query={gql`
      {
        comments {
          _id
          text
          title
        }
      }
    `}>
      { (loading, error, data) => {
          return (
          <section className="section">
            <div className="container">
              <h1 className="title">Comments</h1>
            </div>
          </section>)
        }
      }
    </Query>
  </Layout>
)

export default Index
