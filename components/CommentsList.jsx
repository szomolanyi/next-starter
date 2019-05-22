
import { Query } from 'react-apollo';
import { GET_COMMENTS } from '../lib/queries';

import Comment from './Comment';


const CommentsList = ({ comments, openEditModal }) => (
  <div className="columns is-multiline">
    {
      comments.map(comment => (
        <Comment key={comment._id} comment={comment} openEditModal={openEditModal} />
      ))
    }
  </div>
);

export default props => (
  <Query query={GET_COMMENTS}>
    {({ loading, error, data }) => {
      if (error) {
        console.log(error); // todo: handle errors
        return null;
      }
      if (loading) return null;
      return (
        <CommentsList comments={data.comments} {...props} />
      );
    }}
  </Query>
);
