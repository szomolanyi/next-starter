import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

import { useUser } from '../../hooks';

import { GET_TWEETS, ADD_TWEET, TWEET_FRAGMENT } from '../../queries';

import { graphQlErrorFilter } from '../../utils';

const TweetsSchema = Yup.object().shape({
  text: Yup.string()
    .required('Required'),
});

const updateCacheAfterCreate2 = (replyOn, currentUser) => (cache, { data }) => {
  const { createTweet } = data;
  const cacheData = cache.readQuery({
    query: GET_TWEETS,
    variables: {
      userId: currentUser._id,
    },
  });
  const { tweetsFeed } = cacheData;
  cache.writeQuery({
    query: GET_TWEETS,
    data: {
      tweetsFeed: {
        cursor: tweetsFeed.cursor || createTweet._id,
        tweets: [createTweet, ...tweetsFeed.tweets],
        __typename: 'TweetsFeed',
      },
    },
    variables: {
      userId: currentUser._id,
    },
  });
  if (replyOn) {
    const frgm = cache.readFragment({
      id: `Tweet:${replyOn}`,
      fragment: TWEET_FRAGMENT,
    });
    cache.writeFragment({
      id: `Tweet:${replyOn}`,
      fragment: gql`fragment tweetUpd on Tweet {
        repliesCount
      }`,
      data: {
        repliesCount: frgm.repliesCount + 1,
        __typename: 'Tweet',
      },
    });
  }
};

const TweetForm = ({ initialValues, postSubmit, replyOn }) => {
  const { currentUser } = useUser();
  const [create] = useMutation(ADD_TWEET, {
    update: updateCacheAfterCreate2(replyOn, currentUser),
  });
  return (
    <Formik
      initialValues={initialValues}
      initialStatus={{}}
      onSubmit={
        (values, fvals) => {
          const { setSubmitting, resetForm, setStatus } = fvals;
          create({ variables: { ...values, replyOn } })
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
          <div className="box">
            <Form>
              <div className="form-body">
                <Field className="textarea" name="text" component="textarea" placeholder="What's happening ?" />
                {errors.text && touched.text && <p className="help is-danger">{errors.text}</p>}
              </div>
              <button className={`button is-rounded is-link ${isSubmitting ? 'is-loading' : ''}`} disabled={isSubmitting} type="submit" value="Submit">
                Tweet
              </button>
              { status.errors
                // eslint-disable-next-line react/no-array-index-key
                && status.errors.map((error, i) => <p className="help is-danger" key={i}>{ error.message }</p>)}
              <style jsx>
                {`
                  .form-body {
                    margin-bottom: 1rem;
                  }
                `}
              </style>
            </Form>
          </div>
        )
      }
    </Formik>
  );
};

export default TweetForm;
