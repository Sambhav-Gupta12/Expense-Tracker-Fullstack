import React from 'react'
import {
  Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useExpense } from "../../context/ExpenseContext";
import '../../styles/charts.css'
import groupExpensesByDate from "../../utils/groupExpenseByDate";

function ExpenseLineChart({ transactions }) {

  const expenseOnly = transactions.filter(
    exp => exp.transType !== "income"
  );

  const chartData = groupExpensesByDate(expenseOnly);
  const hasData = chartData.length > 0;

  return (
    <div style={{ backgroundColor: "#262624", padding: "20px", borderRadius: "10px", outline: "none", border: "none" }}>
      {
        hasData ? (<ResponsiveContainer width="100%" height={300}> {/* Makes chart responsive to screen size */}
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>  {/* Main chart container with data + spacing */}
            <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fill: "#D1D5DB" }} /> {/* Shows dates on horizontal axis */}
            <YAxis stroke="#9CA3AF" tick={{ fill: "#D1D5DB" }} /> {/* Shows amount scale on vertical axis */}
            <Tooltip contentStyle={{ backgroundColor: "#1F2038", border: "none", borderRadius: "10px", color: "#fff" }} /> {/* Shows popup info on hover */}
            <Legend wrapperStyle={{ color: "#E5E7EB" }} />
            <Line type="monotone" dataKey="amount" stroke="#534AB7" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 7 }} />  {/* Draws smooth line using amount data */}
          </LineChart>
        </ResponsiveContainer>) : (
          <div className="h-75 flex flex-col items-center justify-center text-center">
            <div className="text-6xl mb-4">📉</div>

            <h3 className="text-xl font-semibold text-white">
              No trend data yet
            </h3>

            <p className="text-gray-400 mt-2 max-w-xs">
              Add some expenses to view your spending trend over time.
            </p>
          </div>
        )
      }
    </div>

  );
}

export default ExpenseLineChart;