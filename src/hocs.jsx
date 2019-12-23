import CustomAppMessage from './components/ui/CustomAppMessage';

export const RegisteredComponent = ({ componentName, ...rest }) => {
  let Component;
  switch (componentName) {
    case 'CustomAppMessage':
      Component = CustomAppMessage;
      break;
    default:
      throw Error(`Unknown registered component ${componentName}`);
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...rest} />;
};

export const esLintDummy = 'a';
