import { useMutation } from '@apollo/react-hooks';
import { SIGN_CLOUDINARY_UPLOAD } from '../../queries';

const CloudinaryUploadButton = ({ transformations, options, afterUpload }) => {
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
  },
  (err, result) => {
    if (result.event === 'success') {
      const url = `https://res.cloudinary.com/duhahryey/image/upload/${transformations}/${result.info.path}`;
      afterUpload(url);
    }
  });
  const showWidget = () => cloudinaryWidget.open();
  return (
    <div>
      <button className="button" type="button" onClick={showWidget}>Upload avatar</button>
    </div>
  );
};

export default CloudinaryUploadButton;
