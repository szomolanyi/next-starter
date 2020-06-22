import { useDebounce } from 'use-lodash-debounce-throttle';

const DelayedInput = ({ clb, updateInterval }) => {
  const debouncedHandler = useDebounce((v) => {
    clb(v);
  }, updateInterval);
  return <input type="text" className="input" placeholder="Search" onChange={(event) => debouncedHandler(event.target.value)} />;
};

export default DelayedInput;
