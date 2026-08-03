import React from 'react'
import { useState } from 'react'
import { NavLink } from "react-router-dom";
import { useExpense } from "../../context/ExpenseContext";
import { useIncome } from '../../context/IncomeContext';
import { useBudget } from "../../context/BudgetContext";
import SummaryCards from './SummaryCards'
import ExpenseLineChart from '../Charts/ExpenseLineChart'
import ExpenseBarChart from '../Charts/ExpenseBarChart'
import ExpensePieChart from '../Charts/ExpensePieChart'
import RecentTransaction from './RecentTransaction';

function Dashboard() {

  const currentDate = new Date();

  const [month, setMonth] = useState(
    String(currentDate.getMonth() + 1).padStart(2, "0")
  );

  const [year, setYear] = useState(
    String(currentDate.getFullYear())
  );

  const { expenses } = useExpense();
  const { incomes } = useIncome();
  const { budget } = useBudget();

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const currentYear = new Date().getFullYear();

  const allTransactions = [
    ...expenses.map(expense => ({
      ...expense,
      transType: "expense"
    })),

    ...incomes.map(income => ({
      ...income,
      transType: "income",
      category: "Income",
      categoryIcon: "💰"
    }))
  ];

  const transactions = [...allTransactions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const years = [
    currentDate.getFullYear() - 1,
    currentDate.getFullYear(),
    currentDate.getFullYear() + 1,
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const [transactionYear, transactionMonth, day] =
      transaction.date.split("-");

    const monthMatch = Number(transactionMonth) === Number(month);

    const yearMatch =
      year === "All" ||
      Number(transactionYear) === Number(year);

    return monthMatch && yearMatch;
  });

  let budgetAmount = 0;

  if (year === "All") {
    budgetAmount = budget
      .filter(bud => Number(bud.month) === Number(month))
      .reduce((sum, bud) => sum + Number(bud.monthlyBudget), 0);
  } else {
    const currentBudget = budget.find(
      bud =>
        Number(bud.month) === Number(month) &&
        Number(bud.year) === Number(year)
    );

    budgetAmount = currentBudget?.monthlyBudget || 0;
  }

  const totalEntries = filteredTransactions.length;

  const totalSpent = filteredTransactions
    .filter(exp => exp.transType !== "income")
    .reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

  const remaining = budgetAmount - totalSpent;

  return (
    <div className='w-full h-full rounded-r-2xl bg-[#30302e] overflow-x-scroll no-scrollbar px-4 sm:px-8 md:px-12 lg:px-16 pt-4 pb-10 md:pb-0'>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xl text-white font-semibold">Dashboard</div>
          <div className="text-[#b0b0ac] mb-4">{currentMonth} {currentYear}</div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 w-full md:w-auto">
          <div className='flex gap-3'>
            <select
              className="w-full sm:w-40 bg-[#262624] border-[1.5px] border-[#494945] h-10 px-3 cursor-pointer rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] font-semibold text-[#b7b5a7]"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <select
              className="w-full md:flex-1 bg-[#262624] border-[1.5px] h-10 px-3 cursor-pointer border-[#494945] rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] font-semibold text-[#b7b5a7]"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >

              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

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
          <ExpenseBarChart transactions={filteredTransactions} />
          <ExpensePieChart transactions={filteredTransactions} />
        </div>
        <ExpenseLineChart transactions={filteredTransactions} />
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
        <RecentTransaction transactions={filteredTransactions} />
      </div>
    </div>
  )
}

export default Dashboard