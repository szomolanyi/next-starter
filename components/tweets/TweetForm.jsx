import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

import { GET_TWEETS, ADD_TWEET } from '../../lib/queries';

import { graphQlErrorFilter } from '../../lib/utils';

const TweetsSchema = Yup.object().shape({
  text: Yup.string()
    .required('Required'),
});

const updateCacheAfterCreate = (cache, { data }) => {
  const { createTweet } = data;
  const { tweetsFeed } = cache.readQuery({ query: GET_TWEETS });
  cache.writeQuery({
    query: GET_TWEETS,
    data: {
      tweetsFeed: {
        cursor: tweetsFeed.cursor,
        tweets: [createTweet, ...tweetsFeed.tweets],
        __typename: 'TweetsFeed',
      },
    },
  });
};

const TweetForm = ({ initialValues, postSubmit }) => {
  const [create] = useMutation(ADD_TWEET, {
    update: updateCacheAfterCreate,
  });
  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{}}
      onSubmit={
        (values, fvals) => {
          const { setSubmitting, resetForm, setStatus } = fvals;
          create({ variables: values })
            .then(() => {
              resetForm(initialValues);
              if (postSubmit) {
                postSubmit();
              }
            })
            .catch((error) => {
              setSubmitting(false);
              const errors = graphQlErrorFilter(error);
              setStatus({ errors });
            });
        }
      }
      validationSchema={TweetsSchema}
    >
      {
        ({
          errors, touched, isSubmitting, status,
        }) => (
          <Form>
            <Field className="textarea" name="text" component="textarea" placeholder="What's happening ?" />
            {errors.text && touched.text && <p className="help is-danger">{errors.text}</p>}
            <button className={`button ${isSubmitting ? 'is-loading' : ''}`} disabled={isSubmitting} type="submit" value="Submit">
              Submit
            </button>
            { status.errors
              // eslint-disable-next-line react/no-array-index-key
              && status.errors.map((error, i) => <p className="help is-danger" key={i}>{ error.message }</p>)
            }
          </Form>
        )
      }
    </Formik>
  );
};

export default TweetForm;
