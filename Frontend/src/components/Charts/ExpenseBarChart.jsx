import React from 'react'
import {
    Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import groupExpensesByDate from '../../utils/groupExpenseByDate';
import formatDate from '../../utils/formatDate';
import { useExpense } from '../../context/ExpenseContext';
import '../../styles/charts.css'

function ExpenseBarChart({ transactions }) {

    const expenseOnly = transactions.filter(
        exp => exp.transType !== "income"
    );

    const chartData = groupExpensesByDate(expenseOnly);

    const hasData = chartData.length > 0;

    const today = new Date();

    const todayString =
        String(today.getDate()).padStart(2, "0") +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        today.getFullYear();

    const todayFormatted = formatDate(todayString);

    return (
        <div className="w-full min-w-0 bg-[#262624] text-white p-4 rounded-lg">Spending - By Date
            {
                hasData ? (<ResponsiveContainer width="100%" height={250}>
                    <BarChart barCategoryGap="20%" data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ backgroundColor: "#1F2038", border: "none", borderRadius: "10px", color: "#fff" }} />
                        <Legend wrapperStyle={{ color: "#E5E7EB" }} />
                        <Bar
                            dataKey="amount"
                            fill="#AFA9EC"
                            radius={[8, 8, 0, 0]}
                            legendType="rect"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        entry.date === todayFormatted
                                            ? "#534AB7"
                                            : "#AFA9EC"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>) : (
                    <div className="h-62.5 flex flex-col items-center justify-center text-center">
                        <div className="text-6xl mb-4">📈</div>

                        <h3 className="text-xl font-semibold text-white">
                            No spending data yet
                        </h3>

                        <p className="text-gray-400 mt-2 max-w-xs">
                            Your daily spending chart will appear here after adding expenses.
                        </p>
                    </div>
                )
            }
        </div >
    )
}

export default ExpenseBarChart