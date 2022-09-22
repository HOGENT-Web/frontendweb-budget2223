import { memo } from 'react';

export default memo(function Transaction(props) {
  const { user, amount, place } = props;
  return <div className="text-bg-dark" style={{ width: '50%' }}>{user} gaf €{amount} uit bij {place}</div>;
})
