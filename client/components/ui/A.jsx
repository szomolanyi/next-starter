const A = ({ onClick, children }) => (
  <a
    onClick={onClick}
    onKeyPress={onClick}
    role="link"
    tabIndex={0}
  >
    {children}
  </a>
);

export default A;
