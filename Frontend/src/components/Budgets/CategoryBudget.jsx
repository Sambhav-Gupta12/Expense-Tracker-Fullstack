import React from 'react'
import { useState } from 'react';
import { useExpense } from "../../context/ExpenseContext";
import AddCategoryBudget from './AddCategoryBudget';
import { useCatBudget } from "../../context/CatBudContext";


function CategoryBudget({ expenses }) {

  const { catBudgets, deleteCategoryBudget } = useCatBudget();
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:px-8">

      {catBudgets.map((item) => {

        const spent = expenses
          .filter(exp => exp.category === item.category && exp.transType !== "income")
          .reduce((sum, exp) => sum + Number(exp.amount), 0);

        const progressWidth = Math.min(
          (spent / item.budget) * 100,
          100
        );

        const progress = Math.round(progressWidth);

        const barColor =
          progress >= 90
            ? "#ef4444" // Red
            : progress >= 70
              ? "#f59e0b" // Orange
              : progress >= 40
                ? "#639922" // Dark Green
                : "#22c55e"; // Green

        return (
          <div
            key={item.id}
            className="py-3 px-4 w-full rounded-xl border border-gray-700 bg-[#262624]"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                <div>{item.categoryIcon}</div>
                <h3 className="text-white font-semibold">
                  {item.category}
                </h3>
              </div>

              <button
                onClick={() => deleteCategoryBudget(item.id)}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex justify-between mt-1">
              <p className="text-gray-400">
                ₹{spent} of ₹{item.budget}
              </p>

              <div className="rounded-full text-sm font-semibold bg-gray-200 px-3" style={{ color: barColor }}>{progress} %</div>
            </div>

            <div className="w-full h-2 bg-gray-700 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${progressWidth}%`, backgroundColor: barColor }}
              />
            </div>

            <p className="text-green-400" style={{ color: barColor }}>
              ₹{item.budget - spent} left
            </p>
          </div>
        );
      })}

      <div className="relative">
        <button
          className='flex flex-col justify-center items-center w-full min-h-24.5 bg-[#30302e] hover:bg-[#262624] duration-300 cursor-pointer border-2 border-dashed border-[#65645f] rounded-lg py-4 px-8'
          onClick={() => setShowModal(true)}
        >
          <div className="text-[#cbcac4]">+</div>
          <div className="text-[#cbcac4]">Add category budget</div>
        </button>

        {showModal && (
          <AddCategoryBudget onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  )
}

export default CategoryBudget