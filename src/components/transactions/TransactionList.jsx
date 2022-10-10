import { useState, useMemo, useCallback, useEffect } from 'react';
import { useThemeColors } from '../../contexts/Theme.context';
import Transaction from './Transaction';
import TransactionForm from './TransactionForm';
import * as transactionsApi from '../../api/transactions';
import Error from '../Error';
import Loader from '../Loader';

function TransactionTable({
  transactions, onEdit, onDelete
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} {...transaction} onDelete={onDelete} onEdit={onEdit} />
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
  const [currentTransaction, setCurrentTransaction] = useState({});

  const refreshTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionsApi.getAll();
      setTransactions(data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  const handleDelete = useCallback(async (idToDelete) => {
    try {
      setError(null);
      await transactionsApi.deleteById(idToDelete);
      // of gewoon opnieuw ophalen
      setTransactions((transactions) => transactions.filter(({ id }) => id !== idToDelete));
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);

  const setTransactionToUpdate = useCallback((id) => {
    setCurrentTransaction(id === null ? {} : transactions.find((t) => t.id === id));
  }, [transactions]);
  //...

  const handleSaveTransaction = useCallback(async (transaction) => {
    try {
      setError(null);
      await transactionsApi.save({
        ...transaction,
      });
      setCurrentTransaction({});
      await refreshTransactions();
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [refreshTransactions]);

  const filteredTransactions = useMemo(() => transactions.filter((t) => {
    return t.place.name.toLowerCase().includes(search.toLowerCase());
  }), [search, transactions])

  return (
    <>
      <h1>Transactions</h1>
      <TransactionForm onSaveTransaction={handleSaveTransaction} currentTransaction={currentTransaction} />
      <div className="input-group mb-3 w-50">
        <input type="search" id="search" className="form-control rounded" placeholder="Search" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="button" className="btn btn-outline-primary" onClick={() => setSearch(text)}>Search</button>
      </div>
      <div className="mt-4">
        <Loader loading={loading} />
        <Error error={error} />

        {!loading && !error ? <TransactionTable transactions={filteredTransactions} onDelete={handleDelete} onEdit={setTransactionToUpdate} /> : null}{/* 👈 5 */}
      </div>
    </>);
}
