import React from 'react'
import { useExpense } from "../../context/ExpenseContext";

function SummaryCards({totalSpent, remainingBudget, transactions}) {
const { expenses } = useExpense();
  

  expenses.forEach((exp) => {
  console.log(exp.title);
});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
      <div className="bg-[#262624] border-[1.5px] border-[#494945] rounded-lg p-5 flex flex-col items-center justify-center">
        <h3 className="text-[#b0b0ac]">Total Spent</h3>
        <p className="text-white font-bold text-2xl">₹{totalSpent}</p>
      </div>
      <div className="bg-[#262624] border-[1.5px] border-[#494945] rounded-lg p-5 flex flex-col items-center justify-center">
        <h3 className="text-[#b0b0ac]">Remaining Budget</h3>
        <p className="text-white font-bold text-2xl">₹{remainingBudget}</p>
      </div>
      <div className="bg-[#262624] border-[1.5px] border-[#494945] rounded-lg p-5 flex flex-col items-center justify-center">
        <h3 className="text-[#b0b0ac]">Transactions</h3>
        <p className="text-white font-bold text-2xl">{transactions}</p>
      </div>
    </div>
  )
}

export default SummaryCards