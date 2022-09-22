import { useState, useMemo, useCallback } from 'react';
import Transaction from './Transaction';
import TransactionForm from './TransactionForm';
import { TRANSACTION_DATA } from '../../api/mock-data';

export default function TransactionList() {

  const [transactions, setTransactions] = useState(TRANSACTION_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(() => transactions.filter((t) => {
    return t.place.toLowerCase().includes(search.toLowerCase());
  }), [search, transactions])

  const createTransaction = useCallback((user, place, amount, date) => {
    const newTransactions = [
      {
        user, place, amount, date: new Date(date),
      },
      ...transactions,
    ]; // newest first
    setTransactions(newTransactions);
  }, [transactions]);

  return (
    <>
      <h1>Transactions</h1>
      <TransactionForm onSaveTransaction={createTransaction} />
      <div className="input-group mb-3 w-50">
        <input type="search" id="search" className="form-control rounded" placeholder="Search" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="button" className="btn btn-outline-primary" onClick={() => setSearch(text)}>Search</button>
      </div>
      {filteredTransactions.map((trans, index) =>
        <Transaction {...trans} key={index} />)}
    </>);
}
