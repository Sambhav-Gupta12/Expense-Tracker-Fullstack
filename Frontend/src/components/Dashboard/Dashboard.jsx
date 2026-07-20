import React from 'react'
import { useState } from 'react'
import { NavLink } from "react-router-dom";
import { useExpense } from "../../context/ExpenseContext";
import { useBudget } from "../../context/BudgetContext";
import SummaryCards from './SummaryCards'
import ExpenseLineChart from '../Charts/ExpenseLineChart'
import ExpenseBarChart from '../Charts/ExpenseBarChart'
import ExpensePieChart from '../Charts/ExpensePieChart'
import RecentTransaction from './RecentTransaction';

function Dashboard() {

  const [months, setMonths] = useState("This Month")
  const { expenses } = useExpense();
  const { budget } = useBudget();

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const currentYear = new Date().getFullYear();

  const currentDate = new Date();

  const filteredExpenses = expenses.filter((expense) => {
    const [day, month, year] = expense.date.split("-");

    const expenseDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    if (months === "This Month") {
      return (
        expenseDate.getMonth() === currentDate.getMonth() &&
        expenseDate.getFullYear() === currentDate.getFullYear()
      );
    }

    if (months === "Last Month") {
      const lastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      );

      return (
        expenseDate.getMonth() === lastMonth.getMonth() &&
        expenseDate.getFullYear() === lastMonth.getFullYear()
      );
    }

    if (months === "This year") {
      return (
        expenseDate.getFullYear() === currentDate.getFullYear()
      );
    }

    return true;
  });

  const totalEntries = filteredExpenses.length;

  const totalSpent = filteredExpenses
    .filter(exp => exp.transType !== "income")
    .reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

  const remaining = budget - totalSpent;

  return (
    <div className='w-full h-full rounded-r-2xl bg-[#30302e] overflow-x-scroll no-scrollbar px-4 sm:px-8 md:px-12 lg:px-16 pt-4 pb-10 md:pb-0'>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xl text-white font-semibold">Dashboard</div>
          <div className="text-[#b0b0ac] mb-4">{currentMonth} {currentYear}</div>
        </div>

        <div className="flex flex-row sm:flex-row gap-3 w-full md:w-auto">
          <select
            className="w-full sm:w-40 bg-[#262624] border-[1.5px] border-[#494945] h-10 px-3 cursor-pointer rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] font-semibold text-[#b7b5a7]"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This year</option>
          </select>

          <NavLink
            to="/add-expense"
            className='w-full sm:w-auto text-center px-5 py-2 rounded-lg text-sm text-white font-semibold border-[1.5px] border-[#494945] transition-all duration-300 hover:bg-[#2b2b29] cursor-pointer'
          >
            + Add Expense
          </NavLink>
        </div>
      </div>

      <SummaryCards totalSpent={totalSpent} remainingBudget={remaining} transactions={totalEntries} />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <ExpenseBarChart expenses={filteredExpenses} />
          <ExpensePieChart expenses={filteredExpenses} />
        </div>
        <ExpenseLineChart expenses={filteredExpenses} />
      </div>

      <div className="rounded-lg bg-[#262624] mt-5 mb-5 border-[1.5px] border-[#494945] ">
        <div className="flex justify-between px-7">
          <div className='text-white pt-1 pb-1 md:pb-0 md:pt-4 font-semibold text-xl'>Recent Transactions</div>

          <NavLink
            to="/transactions"
            className='px-5 pt-2 pb-1 md:pb-0 md:pt-4 h-10 text-[#4a41ac] font-semibold transition-all duration-300 cursor-pointer'
          >
            View all →
          </NavLink>
        </div>
        <div className="hidden md:grid grid-cols-[2.1fr_1fr_1fr_1fr_1fr] rounded-t-lg justify-around py-2 pl-17 border-b-[1.5px] border-[#494945]">
          <div className='text-[#9d9d99]'>Description</div>
          <div className='text-[#9d9d99]'>Category</div>
          <div className='text-[#9d9d99]'>Payment</div>
          <div className='text-[#9d9d99]'>Amount</div>
          <div className='text-[#9d9d99]'>Date</div>
        </div>
        <RecentTransaction expenses={filteredExpenses} />
      </div>
    </div>
  )
}

export default Dashboard