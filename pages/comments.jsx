import Layout from '../components/layout'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm'
import CommentModal from '../components/CommentModal'
import React, { useState } from 'react'

const Comments = () => {
  const [isOpen, setOpen] = useState(true)
  const hide = () => setOpen(false);
  const show = () => setOpen(true);
  return (
    <Layout>
      <section className="section">
        <h1 className="title">Comments</h1>
        <CommentForm />
      </section>
      <section className="section">
        <CommentsList openEditModal={show}/>
      </section>
      <CommentModal hide={hide} isOpen={isOpen}/>
    </Layout>
  )
}

export default Comments
