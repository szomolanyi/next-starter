const Loading = ({ size }) => {
  const faSizeMap = {
    small: '',
    normal: 'fa-lg',
    medium: 'fa-2x',
    large: 'fa-3x',
  };
  const iconSize = size ? '' : `is-${size}`;
  const faSize = faSizeMap[size || 'normal'];
  return (
    <span className={`icon has-text-info ${iconSize}`} style={{ marginRight: '1em' }}>
      <i className={`fas fa-spinner fa-spin ${faSize}`} />
    </span>
  );
};

export default Loading;
