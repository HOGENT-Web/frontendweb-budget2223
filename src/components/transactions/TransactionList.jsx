import { useState } from 'react';
import Transaction from './Transaction';
import TransactionForm from './TransactionForm';
import { TRANSACTION_DATA } from '../../api/mock-data';

export default function TransactionList() {

  const [transactions, setTransactions] = useState(TRANSACTION_DATA);

  const createTransaction = (user, place, amount, date) => {
    const newTransactions = [
      {
        user, place, amount, date: new Date(date),
      },
      ...transactions,
    ]; // newest first
    setTransactions(newTransactions);
    console.log("transactions", JSON.stringify(transactions));
    console.log("newtransactions", JSON.stringify(newTransactions));
  };


  return (
    <>
      <h1>Transactions</h1>
      <TransactionForm onSaveTransaction={createTransaction} />
      {transactions.map((trans, index) =>
        <Transaction {...trans} key={index} />)}
    </>);
}
