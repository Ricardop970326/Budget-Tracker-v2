import React from 'react'
import React, { useEffect, useState } from 'react';

import "../css/main.css"

const Main = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "always",
  });

  useEffect(() => {
    updateTotal();
  }, [transactions]);

  const updateTotal = () => {
    const incomeTotal = transactions
      .filter((trx) => trx.type === "income")
      .reduce((total, trx) => total + trx.amount, 0);

    const expenseTotal = transactions
      .filter((trx) => trx.type === "expense")
      .reduce((total, trx) => total + trx.amount, 0);

    const balanceTotal = incomeTotal - expenseTotal;

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setBalance(balanceTotal);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((trx) => trx.id !== id);
    setTransactions(updatedTransactions);
  };

  const addTransaction = (formData) => {
    const newTransaction = {
      id: transactions.length + 1,
      name: formData.get("name"),
      amount: parseFloat(formData.get("amount")),
      date: new Date(formData.get("date")),
      type: formData.get("type") === "on" ? "income" : "expense",
    };
    setTransactions([...transactions, newTransaction]);
  };

  const saveTransactions = () => {
    // You can implement saving transactions to local storage here
    // Make sure to convert transactions to JSON before saving
  };

  const renderList = () => {
    if (transactions.length === 0) {
      return <p>No transactions.</p>;
    }

    return (
      <ul>
        {transactions.map(({ id, name, amount, date, type }) => (
          <li key={id}>
            <div className="name">
              <h4>{name}</h4>
              <p>{new Date(date).toLocaleDateString()}</p>
            </div>
            <div className={`amount ${type}`}>
              <span>{formatter.format(amount)}</span>
            </div>
            <div className="action">
              <button onClick={() => deleteTransaction(id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addTransaction(formData);
    e.target.reset();
  };

  return (
    <>
      <div id="title">
        <h1>Expense Tracker</h1>
      </div>
      <main>
        <header>
          <div>
            <h5>Total Balance</h5>
            <span id="balance">{formatter.format(balance)}</span>
          </div>
          <div>
            <h5>Income</h5>
            <span id="income">{formatter.format(income)}</span>
          </div>
          <div>
            <h5>Expense</h5>
            <span id="expense">{formatter.format(expense)}</span>
          </div>
        </header>
      </main>
      <form id="transactionForm" onSubmit={handleSubmit}>
        {/* Add your form fields here */}
      </form>
      <div id="transactionList">
        {renderList()}
      </div>
    </>
  );
};

export default Main;