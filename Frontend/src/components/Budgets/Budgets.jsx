import React, { useState } from 'react'
import { useExpense } from "../../context/ExpenseContext";
import CategoryBudget from './CategoryBudget'
import AddCategoryBudget from './AddCategoryBudget';
import AddBudget from './AddBudget';
import { useBudget } from "../../context/BudgetContext";
import toast from "react-hot-toast";
import axios from 'axios';

function Budgets() {
  const { expenses } = useExpense();
  const { budget, setBudget } = useBudget();
  const [showModal, setShowModal] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [loading, setLoading] = useState(false)

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "long",
  });

  const currentYear = new Date().getFullYear();

  const currentDate = new Date();

  const [month, setMonth] = useState(
    String(currentDate.getMonth() + 1).padStart(2, "0")
  );

  const [year, setYear] = useState(
    String(currentDate.getFullYear())
  );

  const years = [
    currentDate.getFullYear() - 1,
    currentDate.getFullYear(),
    currentDate.getFullYear() + 1,
  ];

  // const filteredExpenses = expenses.filter((expense) => {
  //   const expenseDate = new Date(expense.date);

  //   if (months === "This Month") {
  //     return (
  //       expenseDate.getMonth() === currentDate.getMonth() &&
  //       expenseDate.getFullYear() === currentDate.getFullYear()
  //     );
  //   }

  //   if (months === "Last Month") {
  //     const lastMonth = new Date(
  //       currentDate.getFullYear(),
  //       currentDate.getMonth() - 1,
  //       1
  //     );

  //     return (
  //       expenseDate.getMonth() === lastMonth.getMonth() &&
  //       expenseDate.getFullYear() === lastMonth.getFullYear()
  //     );
  //   }

  //   if (months === "This year") {
  //     return expenseDate.getFullYear() === currentDate.getFullYear();
  //   }

  //   return true;
  // });

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() + 1 === Number(month) &&
      expenseDate.getFullYear() === Number(year)
    );
  });

  // let selectedMonth;
  // let selectedYear;

  // if (months === "This Month") {
  //   selectedMonth = currentDate.getMonth() + 1
  //   selectedYear = currentDate.getFullYear();
  // }

  // if (months === "Last Month") {
  //   const last = new Date(
  //     currentDate.getFullYear(),
  //     currentDate.getMonth() - 1
  //   );

  //   selectedMonth = last.getMonth() + 1
  //   selectedYear = last.getFullYear();
  // }

  console.log("Budget:", budget);
  console.log("Selected Month:", month);
  console.log("Selected Year:", year);

  const currentBudget = budget.find(
    (bud) =>
      Number(bud.month) === Number(month) &&
      Number(bud.year) === Number(year)
  );

  const budgetAmount = currentBudget?.monthlyBudget || 0;

  const totalSpent = filteredExpenses
    .filter(exp => exp.transType !== "income")
    .reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

  const remaining = budgetAmount - totalSpent;

  const handleBudgetDelete = async () => {

    if (!currentBudget) {
      toast.error("No budget found for this month.");
      return;
    }

    try {
      setLoading(true);

      await axios.delete(`http://localhost:8000/api/v1/budgets/delete-budget/${currentBudget._id}`,
        {
          withCredentials: true,
        }
      )

      setBudget(prev =>
        prev.filter(bud => bud._id !== currentBudget._id)
      );

      toast.success("Budget deleted successfully!");

    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete budget.")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full h-full rounded-r-2xl bg-[#30302e] pt-4 pb-17 md:py-4 px-10 overflow-scroll no-scrollbar'>
      <div className="flex flex-col sm:flex-row justify-around">
        <div className="flex flex-col">
          <div className="text-white font-semibold text-3xl">Budgets</div>
          <div className="text-[#cbcac4]">{currentMonth} {currentYear} — set spending limits per category</div>
        </div>

        <div className="flex gap-3 mt-3">
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
            className="w-full sm:w-40 bg-[#262624] border-[1.5px] border-[#494945] h-10 px-3 cursor-pointer rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] font-semibold text-[#b7b5a7]"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>

          <button
            className='flex w-full justify-center gap-1 border-[1.5px] pt-1.5 px-2 h-10 rounded-lg text-white border-[#65645f] hover:bg-[#212020] duration-300 cursor-pointer'
            onClick={() => setShowInput(true)}
          >
            + <span className='sm:block hidden'>New budget</span>
          </button>

          {showInput && (
            <AddBudget
              onClose={() => setShowInput(false)}
              selectedMonth={month}
              selectedYear={year}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:mx-45 gap-4 mt-6">
        <div className='flex flex-col bg-[#262624] border-[1.5px] border-[#494945] rounded-lg py-4 px-4'>
          <div className="flex justify-between">
            <div className='font-semibold text-[15px] text-[#cbcac4]'>Total budget</div>
            <button
              onClick={handleBudgetDelete}
              className="text-white/60 hover:text-red-600 text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="total text-white text-[25px] font-semibold">₹ {budgetAmount}</div>
        </div>

        <div className='flex flex-col bg-[#262624] border-[1.5px] border-[#494945] rounded-lg py-4 px-4'>
          <div className='font-semibold text-[15px] text-[#cbcac4]'>Spent so far</div>
          <div className="total text-red-700 text-[25px] font-semibold">₹ {totalSpent}</div>
        </div>

        <div className='flex flex-col bg-[#262624] border-[1.5px] border-[#494945] rounded-lg py-4 px-4'>
          <div className='font-semibold text-[15px] text-[#cbcac4]'>Remaining</div>
          <div className="total text-green-600 text-[25px] font-semibold">₹ {remaining}</div>
        </div>
      </div>

      <div className="mt-8 px-2 sm:px-4 md:px-6">
        <CategoryBudget
          expenses={filteredExpenses}
          month={month}
          year={year}
        />
      </div>
    </div>
  )
}

export default Budgets