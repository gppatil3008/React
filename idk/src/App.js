import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  // Add new transaction
  const addTransaction = () => {
    if (!text || !amount) return;
    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
    };
    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
  };

  // Income & Expense calculation
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  // Pie chart data
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: Math.abs(expense) },
  ];
  const COLORS = ["#4ade80", "#f87171"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">💰 Finance Tracker</h1>

        {/* Balance Section */}
        <h2 className="text-lg font-semibold">Balance: ₹{balance.toFixed(2)}</h2>
        <div className="flex justify-between my-4">
          <p className="text-green-600">Income: ₹{income.toFixed(2)}</p>
          <p className="text-red-600">Expense: ₹{Math.abs(expense).toFixed(2)}</p>
        </div>

        {/* Chart */}
        <PieChart width={300} height={200}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Input Section */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="number"
            placeholder="Enter amount (use - for expense)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={addTransaction}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Add Transaction
          </button>
        </div>

        {/* Transaction List */}
        <ul className="mt-6">
          {transactions.map((t) => (
            <li
              key={t.id}
              className={`flex justify-between p-2 my-1 border-l-4 ${
                t.amount > 0 ? "border-green-500" : "border-red-500"
              }`}
            >
              <span>{t.text}</span>
              <span>
                {t.amount > 0 ? `+₹${t.amount}` : `-₹${Math.abs(t.amount)}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
