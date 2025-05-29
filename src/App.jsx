import { useEffect, useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Dashboard from './Dashboard';
import DarkModeToggle from './DarkModeToggle';
import Charts from './Charts';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // Filters
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Search term for description filter
  const [searchTerm, setSearchTerm] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const [editTransaction, setEditTransaction] = useState(null);
  const startEditing = (transaction) => setEditTransaction(transaction);

  const updateTransaction = (updated) => {
    setTransactions(transactions.map(t => (t.id === updated.id ? updated : t)));
    setEditTransaction(null);
  };

  // Apply filters consistently
  const filteredTransactions = transactions.filter(t => {
    // Filter category
    if (filterCategory !== 'All' && t.category !== filterCategory) return false;

    // Filter type
    if (filterType !== 'All' && t.type !== filterType) return false;

    // Filter by date range
    if (filterStartDate && t.date < filterStartDate) return false;
    if (filterEndDate && t.date > filterEndDate) return false;

    // Search filter
    if (!t.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    return true;
  });

  // Extract unique categories from transactions for filter dropdown
  const categories = Array.from(new Set(transactions.map(t => t.category))).filter(Boolean);
  categories.unshift('All');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <DarkModeToggle />

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">Expense Tracker</h1>

      <Dashboard transactions={filteredTransactions} />

      <Charts transactions={filteredTransactions} />

      {/* Filters */}
      <div className="max-w-md mx-auto mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="date"
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={filterStartDate}
          onChange={e => setFilterStartDate(e.target.value)}
          placeholder="Start date"
        />

        <input
          type="date"
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={filterEndDate}
          onChange={e => setFilterEndDate(e.target.value)}
          placeholder="End date"
        />
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full max-w-md mx-auto block mb-6 p-2 border border-gray-300 rounded shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />

      <TransactionForm
        onAddTransaction={addTransaction}
        editData={editTransaction}
        onUpdate={updateTransaction}
      />

      <TransactionList
        transactions={filteredTransactions}
        onDelete={deleteTransaction}
        onEdit={startEditing}
      />
    </div>
  );
}

export default App;
