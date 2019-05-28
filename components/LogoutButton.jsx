import { ManagedMutation } from '../lib/hocs';
import { LOGOUT_USER } from '../lib/queries';

const LogoutButton = ({ logout }) => (
  <button type="button" className="button is-light" onClick={() => logout()}>Logout</button>
);

export default () => (
  <ManagedMutation mutation={LOGOUT_USER}>
    {
      mutate => <LogoutButton logout={mutate} />
    }
  </ManagedMutation>
);