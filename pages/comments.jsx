import Layout from '../components/layout'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm'

const Comments = () => (
  <Layout>
    <section className="section">
      <h1 className="title">Comments</h1>
      <CommentForm />
    </section>
    <section className="section">
      <CommentsList />
    </section>
  </Layout>
)

export default Comments
