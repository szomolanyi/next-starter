import Layout from '../components/layout';
import CommentsList from '../components/CommentsList';
import CommentForm from '../components/CommentForm';
import CommentModal from '../components/CommentModal';
import { useModal } from '../lib/hooks';

const Comments = () => {
  const {
    modalOpened, hideModal, openModal, modalData,
  } = useModal(false);
  return (
    <Layout>
      <section className="section">
        <h1 className="title">Comments</h1>
        <CommentForm />
      </section>
      <section className="section">
        <CommentsList openEditModal={openModal} />
      </section>
      <CommentModal hide={hideModal} isOpen={modalOpened} data={modalData} />
    </Layout>
  );
};

export default Comments;
