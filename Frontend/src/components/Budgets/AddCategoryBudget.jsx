import React from 'react'
import { useState } from 'react'
import { useCatBudget } from "../../context/CatBudContext";
import { useExpense } from "../../context/ExpenseContext";
import axios from 'axios';
import toast from "react-hot-toast";

function AddCategoryBudget({ onClose, month, year }) {

  const [catType, setCatType] = useState("Exist")
  const [selected, setSelected] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("📦");

  const { catBudgets, setCatBudgets } = useCatBudget();

  const [inputBud, setInputBud] = useState("");

  const { expenses } = useExpense();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = [
    {
      name: "Entertainment",
      icon: "🎬",
    },
    {
      name: "Health",
      icon: "🏥",
    },
    {
      name: "Education",
      icon: "📚",
    },
    {
      name: "Food",
      icon: "🍔",
    },
    {
      name: "Transportation",
      icon: "🚗",
    },
    {
      name: "Bills",
      icon: "📄",
    },
    {
      name: "Shopping",
      icon: "🛍️",
    },
  ];

  const handleCatBudSubmit = async () => {

    setError("");
    setSuccess("");

    if (!inputBud.trim()) {
      toast.error("Amount is required");
      return;
    }

    if (Number(inputBud) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (!selected.trim()) {
      toast.error("Category is required");
      return;
    }

    try {

      const newCatBudget = {
        amount: Number(inputBud),
        category: selected,
        categoryIcon: selectedIcon,
        month,
        year
      }

      const response = await axios.post("http://localhost:8000/api/v1/category-budgets/add-category-budget",
        newCatBudget,
        {
          withCredentials: true,
        }
      );

      setCatBudgets(prev => [...prev, response.data.data]);

      setSelected("");
      setSelectedIcon("📦");

      toast.success("Category budget added successfully!");

      onClose();

    } catch (error) {

      toast.error(error.response?.data?.message || "Unable to add budget.")

      // setError(
      //   error.response?.data?.message ||
      //   "Unable to add budget."
      // );
    }
  }

  const getSpentAmount = (category) => {
    return expenses
      .filter((exp) => {
        if (exp.category !== category) return false;

        const expenseDate = new Date(exp.date);

        return (
          expenseDate.getMonth() + 1 === Number(month) &&
          expenseDate.getFullYear() === Number(year)
        );
      })
      .reduce((sum, exp) => sum + Number(exp.amount), 0);
  };

  const availableCategories = categories.filter(
    cat =>
      !catBudgets.some(
        budget =>
          budget.category === cat.name &&
          Number(budget.month) === Number(month) &&
          Number(budget.year) === Number(year)
      )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#1c1c1c] w-100 p-6 rounded-2xl border border-white/10 z-10">

        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h2 className="text-white text-lg font-semibold">
              Add category budget
            </h2>

            <h2 className="text-[#cbcac4]">
              Quick-add a limit for an untracked category
            </h2>
          </div>

          <button onClick={onClose} className="text-white/60 cursor-pointer hover:text-white">
            ✕
          </button>
        </div>

        <div className="Trans-type flex justify-center mt-2 px-2">
          <button
            onClick={() => setCatType("Exist")}
            className={`px-6 py-2 w-56 rounded-l-lg text-sm font-medium transition-all border-r-0 duration-300 cursor-pointer 
      ${catType === "Exist"
                ? "bg-[#30302E] text-[#4c4cbd] border-[1.5px] border-gray-600 border-r-0"
                : "text-[#cbcac4] border-[1.5px] border-gray-600 hover:text-white"}`}
          >
            Pick Existing
          </button>

          <button
            onClick={() => setCatType("Custom")}
            className={`px-6 py-2 w-56 rounded-r-lg text-sm font-medium transition-all border-l-0 duration-300 cursor-pointer
      ${catType === "Custom"
                ? "bg-[#30302E] text-[#4c4cbd] border-[1.5px] border-gray-600 border-l-0"
                : "text-[#cbcac4] border-[1.5px] border-gray-600 hover:text-white"}`}
          >
            Custom Category
          </button>
        </div>

        {catType === "Exist" ? (
          <div>
            {/* Existing category UI */}
            <h2 className='text-[#cbcac4] mt-3'>Unbudgeted categories</h2>

            <div className="category-list overflow-y-scroll no-scrollbar h-68">
              {availableCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="category-card bg-[#262624] p-2 m-2 rounded-lg border-[1.5px] border-gray-600 cursor-pointer flex justify-between"
                  onClick={() => {
                    setSelected(cat.name);
                    setSelectedIcon(cat.icon);
                  }}
                >
                  <div className="left flex gap-1">
                    <span className="mt-2.5 text-xl">{cat.icon}</span>

                    <div>
                      <h4 className='text-white'>{cat.name}</h4>
                      <p className='text-[#cbcac4]'>₹{getSpentAmount(cat.name)} spent this month</p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-3.5 ${selected === cat.name
                      ? "border-violet-500 bg-white"
                      : "border-gray-500 bg-[#30302E]"
                      }`}
                  >
                    {selected === cat.name && (
                      <div className="w-2.5 h-2.5 rounded-full bg-violet-500 mt-px"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-[#cbcac4] mt-4 mx-2 mb-1 text-xs">Set limit for selected category (₹)</h3>

            <input
              type="number"
              placeholder="Enter amount"
              className="w-84 p-2 mx-2 rounded-lg bg-white/5 border border-white/10 text-white mb-4"
              value={inputBud}
              onChange={(e) => setInputBud(e.target.value)}
            />

          </div>
        ) : (
          <div>
            {/* Custom category UI */}
            <h2 className='text-[#cbcac4] mt-3 mb-1 mx-2'>Category name</h2>

            <input
              type="text"
              placeholder="Enter category name"
              className="w-84 p-2 mx-2 rounded-lg bg-white/5 border border-white/10 text-white mb-4"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            />

            <h2 className='text-[#cbcac4] mt-3 mb-1 mx-2'>
              Category Icon
            </h2>

            <input
              type="text"
              placeholder="e.g. 💪"
              className="w-84 p-2 mx-2 rounded-lg bg-white/5 border border-white/10 text-white mb-4"
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
            />

            <h2 className='text-[#cbcac4] mt-3 mb-1 mx-2'>Monthly limit (₹)</h2>

            <input
              type="number"
              placeholder="Enter amount"
              className="w-84 p-2 mx-2 rounded-lg bg-white/5 border border-white/10 text-white mb-4"
              value={inputBud}
              onChange={(e) => setInputBud(e.target.value)}
            />
          </div>
        )}

        <div className="flex justify-between m-2 gap-2">
          <button
            onClick={onClose}
            className="px-7 py-1 bg-white/10 border-[1.5px] border-gray-600 rounded-lg text-white cursor-pointer hover:bg-white/20 duration-300"
          >
            Cancel
          </button>

          <button
            onClick={handleCatBudSubmit}
            className="px-14 py-1 bg-white/10 border-[1.5px] border-gray-600 rounded-lg text-white cursor-pointer hover:bg-blue-500 duration-300"
          >
            Add Budget →
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddCategoryBudget