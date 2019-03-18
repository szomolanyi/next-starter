import Link from 'next/link'

import { Query } from "react-apollo"
import gql from "graphql-tag"

import Layout from '../components/layout'

const Comments = () => (
  <Layout title="Comments">
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
              <ul>
                {data && data.todos && data.todos.map(comment=>(<li key={comment.id}>{comment.text}</li>))}
              </ul>)
        }
      }
    </Query>
  </Layout>
)

export default Comments
