import smoothscroll from 'smoothscroll-polyfill';

// eslint-disable-next-line
import { withApollo } from '../client/apollo';
import HomePage from '../client/components/ui/HomePage';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

const Index = () => <HomePage />;

export default withApollo(Index, { ssr: false });
