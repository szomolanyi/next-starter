import { useMutation } from '@apollo/client';
import { SET_IMAGE_URL, CURRENT_USER } from '../../queries';
import { useUser } from '../../hooks';
import { cloudinaryUploadOptions } from '../../utils';
import CloudinaryUploadButton from '../ui/CloudinaryUploadButton';

const UserImageUpload = ({
  type, transformations, title, imageClassName,
}) => {
  const { currentUser } = useUser();
  const [setImageUrl] = useMutation(SET_IMAGE_URL, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const afterUpload = (url) => setImageUrl({ variables: { url, type } });
  if (typeof window === 'undefined') return null;
  if (!currentUser) return null;
  const uploadOpts = cloudinaryUploadOptions[type];
  return (
    <>
      <h3 className="is-size-4 title">{title}</h3>
      <div className="columns">
        <div className="column">
          <figure className={`image ${imageClassName}`}>
            <img src={currentUser[type]} alt="" />
          </figure>
        </div>
        <div className="column">
          <CloudinaryUploadButton
            transformations={transformations}
            options={{
              ...uploadOpts,
              publicId: currentUser._id,
            }}
            afterUpload={afterUpload}
            buttonTitle={`Upload ${type}`}
          />
        </div>
      </div>
    </>
  );
};

export default UserImageUpload;
