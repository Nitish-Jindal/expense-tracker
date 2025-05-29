function Dashboard({ transactions }) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="bg-white shadow p-6 rounded mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-4 border rounded bg-green-50">
          <h3 className="text-lg font-medium text-green-700">Income</h3>
          <p className="text-2xl font-bold text-green-600">₹{income}</p>
        </div>
        <div className="p-4 border rounded bg-red-50">
          <h3 className="text-lg font-medium text-red-700">Expenses</h3>
          <p className="text-2xl font-bold text-red-600">₹{expenses}</p>
        </div>
        <div className="p-4 border rounded bg-blue-50">
          <h3 className="text-lg font-medium text-blue-700">Balance</h3>
          <p className="text-2xl font-bold text-blue-600">₹{balance}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;