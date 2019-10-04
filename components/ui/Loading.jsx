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
    <section className="section">
      <div className="container has-text-centered">
        <span className={`icon has-text-info ${iconSize}`}>
          <i className={`fas fa-spinner fa-spin ${faSize}`} />
        </span>
      </div>
    </section>
  );
};

export default Loading;
