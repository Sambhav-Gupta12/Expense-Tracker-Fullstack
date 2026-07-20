import React from "react";
import {
  Pie,
  PieChart,
  Cell,
  Sector,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useExpense } from "../../context/ExpenseContext";
import groupExpensesByCategory from "../../utils/groupExpensesByCategory";
import '../../styles/charts.css'


function ExpensePieChart({ expenses }) {

  const expenseOnly = expenses.filter(
    exp => exp.transType !== "income"
  );

  const groupedExpenses = groupExpensesByCategory(expenseOnly);
  const COLORS = [
    "#06B6D4",
    "#8B5CF6",
    "#F59E0B",
    "#10B981",
    "#EF4444",
    "#3B82F6",
    "#F97316",
    "#EC4899",
  ];

  const totalSpent = groupedExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const formatAmount = (amount) => {
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)}L`;
    }

    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }

    return amount;
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className="w-full min-w-0 bg-[#262624] text-white p-4 rounded-lg">Spending - By Category
      <ResponsiveContainer style={{ outline: "none" }} width="100%" height={300}>
        <PieChart
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <Pie
            data={groupedExpenses}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={window.innerWidth < 768 ? 70 : 100}
            innerRadius={window.innerWidth < 768 ? 40 : 60}  // donut shape — hover effect acha lagta hai
            paddingAngle={3}  // slices ke beech gap
            activeShape={{ outerRadius: 110 }}
            fill="#06B6D4"
            label={({ name, amount }) => `${name}: ₹${amount}`}
            labelLine={true}
            style={{
              fontSize: isMobile ? "10px" : "15px"
            }}
          >
            {groupedExpenses.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <g>
            <text
              x={isMobile ? "48%" : "49%"}
              y={isMobile ? "35%" : "42%"}
              textAnchor="middle"
              fill="white"
              fontSize={isMobile ? 18 : 24}
              fontWeight="bold"
            >
              ₹{formatAmount(totalSpent)}
            </text>

            <text
              x={isMobile ? "48.5%" : "49%"}
              y={isMobile ? "39%" : "48%"}
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize={isMobile ? 12 : 14}
            >
              Total Spent
            </text>
          </g>

          <Tooltip
            formatter={(value, name) => {
              const total = groupedExpenses.reduce((sum, item) => sum + item.amount, 0);
              const percent = ((value / total) * 100).toFixed(1);
              return [`${percent}%`, name];
            }}
            contentStyle={{
              backgroundColor: "#1F2038",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ color: "#E5E7EB", paddingTop: "32px", fontSize: "14px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;
