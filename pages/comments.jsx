import Link from 'next/link'

import { graphql, compose } from 'react-apollo'
import { Query } from "react-apollo"
import gql from "graphql-tag"

import Layout from '../components/layout'

const Comments = () => (
  <Layout>
    <Query query={gql`
      {
        todos {
          id
          text
        }
      }
    `}>
      { ({loading, error, data}) => {
          console.log(loading)
          console.log(data)
          console.log(error)
          return (
          <section className="section">
            <div className="container">
              <h1 className="title">Comments</h1>
              <ul>
                {data && data.todos && data.todos.map(comment=>(<li key={comment.id}>{comment.text}</li>))}
              </ul>
            </div>
          </section>)
        }
      }
    </Query>
  </Layout>
)

export default Comments
