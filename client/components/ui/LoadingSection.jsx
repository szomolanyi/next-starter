import Loading from './Loading';

const LoadingSection = ({ size }) => (
  <section className="section">
    <div className="container has-text-centered">
      <Loading size={size} />
    </div>
  </section>
);

export default LoadingSection;
