const Avatar = ({ currentUser }) => {
  if (!currentUser) {
    return <i className="fas fa-user" />;
  }
  if (!currentUser.isVerified) {
    return <i className="fas fa-user-lock has-text-danger" />;
  }
  if (currentUser.avatar) {
    return (
      <figure className="image is-32x32">
        <img src={currentUser.avatar} alt="" />
      </figure>
    );
  }
  return <i className="fas fa-user" />;
};

export default Avatar;
