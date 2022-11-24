import {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { useThemeColors } from '../../contexts/Theme.context';
import Transaction from './Transaction';
import useTransactions from '../../api/transactions';
import Error from '../Error';
import Loader from '../Loader';

function TransactionTable({
  transactions, onDelete,
}) {
  const { theme } = useThemeColors();
  if (transactions.length === 0) {
    return (
      <div className="alert alert-info">
        There are no transactions yet.
      </div>
    );
  }

  return (
    <div>
      <table className={`table table-hover table-responsive table-${theme} `}>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Place</th>
            <th>Amount</th>
            <th>&nbsp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} {...transaction} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAll, deleteById } = useTransactions();

  const refreshTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAll();
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [getAll]);

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  const handleDelete = useCallback(async (idToDelete) => {
    try {
      setError(null);
      await deleteById(idToDelete);
      // of gewoon opnieuw ophalen
      setTransactions((list) => list.filter(({ id }) => id !== idToDelete));
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }, [deleteById]);

  const filteredTransactions = useMemo(
    () => transactions.filter((t) => t.place.name.toLowerCase()
      .includes(search.toLowerCase())),
    [search, transactions],
  );

  return (
    <>
      <h1>Transactions</h1>
      <div className="input-group mb-3 w-50">
        <input type="search" id="search" className="form-control rounded" placeholder="Search" value={text} onChange={(e) => setText(e.target.value)} data-cy="transactions_search_input" />
        <button type="button" className="btn btn-outline-primary" onClick={() => setSearch(text)} data-cy="transactions_search_btn">Search</button>
        <Link className="btn btn-primary" to="/transactions/add">Add a transaction</Link>
      </div>
      <div className="mt-4">
        <Loader loading={loading} />
        <Error error={error} />

        {
          !loading && !error
            ? (
              <TransactionTable
                transactions={filteredTransactions}
                onDelete={handleDelete}
              />
            )
            : null
        }
      </div>
    </>
  );
}
