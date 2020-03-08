const TwitterNavBar = ({ title }) => {
  return (
    <>
      <div className="is-hidden-mobile is-size-5 has-text-weight-bold twitter-title">{title}</div>
      <style jsx>
        {`
          div.twitter-title {
            padding: 0.5rem 0.75rem;
            height: 3.25rem;
            border-bottom: 1px solid;
            border-bottom-color: rgb(230, 236, 240);
          }
        `}
      </style>
    </>
  );
};

export default TwitterNavBar;
