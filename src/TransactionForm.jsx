import { useEffect, useState } from 'react';

function TransactionForm({ onAddTransaction, editData, onUpdate }) {
  const defaultCategories = ['Food', 'Travel', 'Bills', 'Salary', 'Health', 'Shopping', 'Other'];
  const [customCategories, setCustomCategories] = useState(() => {
    const stored = localStorage.getItem('categories');
    return stored ? JSON.parse(stored) : defaultCategories;
  });

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Other');
  const [newCategory, setNewCategory] = useState('');
  const [repeatMonthly, setRepeatMonthly] = useState(false);

  useEffect(() => {
    if (editData) {
      setAmount(editData.amount);
      setDescription(editData.description);
      setType(editData.type);
      setDate(editData.date);
      setCategory(editData.category || 'Other');
      setRepeatMonthly(editData.recurring || false);
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      id: editData ? editData.id : Date.now(),
      amount: parseFloat(amount),
      description,
      type,
      date,
      category,
      recurring: repeatMonthly,
    };

    if (editData) {
      onUpdate(transaction);
    } else {
      onAddTransaction(transaction);
    }

    // Reset form
    setAmount('');
    setDescription('');
    setType('income');
    setDate('');
    setCategory('Other');
    setRepeatMonthly(false);
  };

  const addNewCategory = () => {
    if (newCategory && !customCategories.includes(newCategory)) {
      const updated = [...customCategories, newCategory];
      setCustomCategories(updated);
      localStorage.setItem('categories', JSON.stringify(updated));
      setCategory(newCategory);
    }
    setNewCategory('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-gray-800 shadow rounded space-y-4 max-w-md mx-auto"
    >
      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="flex gap-2 items-center">
        <select
          className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {customCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="p-2 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600"
        />
        <button
          type="button"
          onClick={addNewCategory}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +
        </button>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center dark:text-white">
          <input
            type="radio"
            name="type"
            value="income"
            checked={type === 'income'}
            onChange={() => setType('income')}
          />
          <span className="ml-2">Income</span>
        </label>
        <label className="flex items-center dark:text-white">
          <input
            type="radio"
            name="type"
            value="expense"
            checked={type === 'expense'}
            onChange={() => setType('expense')}
          />
          <span className="ml-2">Expense</span>
        </label>
      </div>

      <input
        type="date"
        className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white dark:border-gray-600"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={repeatMonthly}
          onChange={(e) => setRepeatMonthly(e.target.checked)}
          id="recurring"
        />
        <label htmlFor="recurring" className="ml-2 dark:text-white">
          Repeat Monthly
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
      >
        {editData ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
}

export default TransactionForm;
