function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) {
    return <p className="text-gray-600 dark:text-gray-400 mt-4">No transactions yet.</p>;
  }

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Transaction History</h2>
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li
            key={t.id}
            className={`p-2 border-l-4 ${
              t.type === 'income' ? 'border-green-500' : 'border-red-500'
            } bg-gray-50 dark:bg-gray-900 rounded`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium dark:text-white">{t.description}</p>
               <p className="text-sm text-gray-500 dark:text-gray-400">
  {t.date} • {t.category}
</p>

              </div>
              <div className="flex items-center gap-3">
                <p
                  className={`text-lg font-bold ${
                    t.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  ₹{t.amount}
                </p>
                <button
                  onClick={() => onEdit(t)}
                  title="Edit Transaction"
                  className="text-sm text-blue-600 hover:text-blue-800 transition"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  title="Delete Transaction"
                  className="text-sm text-red-600 hover:text-red-800 transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
