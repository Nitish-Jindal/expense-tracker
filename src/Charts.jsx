import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6', '#F43F5E'];

function Charts({ transactions }) {
  const incomeCategories = {};
  const expenseCategories = {};

  // Map date to net amount (income - expense) on that date
  const netByDate = {};

  transactions.forEach((t) => {
    const cat = t.category || 'Other';

    // Categorize for pies
    if (t.type === 'income') {
      incomeCategories[cat] = (incomeCategories[cat] || 0) + t.amount;
    } else {
      expenseCategories[cat] = (expenseCategories[cat] || 0) + t.amount;
    }

    // Calculate net amount for balance chart
    const dateKey = t.date?.slice(5); // MM-DD
    if (dateKey) {
      const amt = t.type === 'income' ? t.amount : -t.amount;
      netByDate[dateKey] = (netByDate[dateKey] || 0) + amt;
    }
  });

  const incomePieData = Object.entries(incomeCategories).map(([name, value]) => ({ name, value }));
  const expensePieData = Object.entries(expenseCategories).map(([name, value]) => ({ name, value }));

  // Sort dates and build running balance array
  const sortedDates = Object.keys(netByDate).sort((a, b) => a.localeCompare(b));
  let runningBalance = 0;
  const balanceData = sortedDates.map((date) => {
    runningBalance += netByDate[date];
    return { date, balance: runningBalance };
  });

  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Income by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={incomePieData} dataKey="value" outerRadius={80} label>
              {incomePieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={expensePieData} dataKey="value" outerRadius={80} label>
              {expensePieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">Balance Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={balanceData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
