import { Query } from 'react-apollo'
import gql from 'graphql-tag'
//import ErrorMessage from './ErrorMessage'
//import PostUpvoter from './PostUpvoter'

/*export const allPostsQuery = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: createdAt_DESC, first: $first, skip: $skip) {
      id
      title
      votes
      url
      createdAt
    }
    _allPostsMeta {
      count
    }
  }
`
export const allPostsQueryVars = {
  skip: 0,
  first: 10
}
*/
export const allPostsQuery = gql`
      {
        todos {
          id
          text
        }
      }
`

export default function PostList () {
  return (
    <Query query={allPostsQuery}>
      {({ loading, error, data: { todos } }) => {
        //if (error) return <ErrorMessage message='Error loading posts.' />
        if (error) {
          console.log(error)
          return null
        }
        if (loading) return <div>Loading</div>

        return (
          <section>
            <ul>
              {todos.map((todo, index) => (
                <li key={todo.id}>
                  <div>
                    <span>{index + 1}. </span>
                    <a href={todo.id}>{todo.text}</a>
                  </div>
                </li>
              ))}
            </ul>
            <style jsx>{`
              section {
                padding-bottom: 20px;
              }
              li {
                display: block;
                margin-bottom: 10px;
              }
              div {
                align-items: center;
                display: flex;
              }
              a {
                font-size: 14px;
                margin-right: 10px;
                text-decoration: none;
                padding-bottom: 0;
                border: 0;
              }
              span {
                font-size: 14px;
                margin-right: 5px;
              }
              ul {
                margin: 0;
                padding: 0;
              }
              button:before {
                align-self: center;
                border-style: solid;
                border-width: 6px 4px 0 4px;
                border-color: #ffffff transparent transparent transparent;
                content: '';
                height: 0;
                margin-right: 5px;
                width: 0;
              }
            `}</style>
          </section>
        )
      }}
    </Query>
  )
}
