import { useMutation } from '@apollo/react-hooks';
import { SET_AVATAR, CURRENT_USER, SIGN_CLOUDINARY_UPLOAD } from '../../queries';
import { useUser } from '../../hooks';

const CoudinaryUpload = ({ transformations, options }) => {
  const { currentUser } = useUser();
  const [setAvatar] = useMutation(SET_AVATAR, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const [signCloudinaryUpload] = useMutation(SIGN_CLOUDINARY_UPLOAD);
  const signUpload = (clb, params) => {
    const data = Object.keys(params).sort().reduce((res, val, i) => (i === 0
      ? `${val}=${params[val]}` : `${res}&${val}=${params[val]}`), '');
    return signCloudinaryUpload({ variables: { data } }).then((cHash) => {
      clb(cHash.data.signCloudinaryUpload);
    });
  };
  if (typeof window === 'undefined') return null;
  const cloudinaryWidget = window.cloudinary.createUploadWidget({
    ...options,
    uploadSignature: signUpload,
    publicId: currentUser._id,
  },
  (err, result) => {
    if (result.event === 'success') {
      const avatarUrl = `http://res.cloudinary.com/duhahryey/image/upload/${transformations}/${result.info.path}`;
      setAvatar({ variables: { avatar: avatarUrl } });
    }
  });
  const showWidget = () => cloudinaryWidget.open();
  if (!currentUser) return null;
  return (
    <>
      <h3 className="is-size-4 title">Upload your avatar</h3>
      <div className="columns">
        <div className="column">
          <figure className="image is-128x128">
            <img src={currentUser.avatar} alt="" />
          </figure>
        </div>
        <div id="photo-form-container" className="column">
          <button className="button" type="button" onClick={showWidget}>Upload avatar</button>
        </div>
      </div>
    </>
  );
};

export default CoudinaryUpload;
