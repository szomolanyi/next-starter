import Layout from '../components/layout'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm'

const Comments = () => (
  <Layout title="Comments">
    <CommentForm />
    <CommentsList />
  </Layout>
)

export default Comments
