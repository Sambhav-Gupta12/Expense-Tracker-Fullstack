import React from 'react'
import { useState } from 'react';
import { useBudget } from "../../context/BudgetContext";
import axios from 'axios';
import toast from "react-hot-toast";

function AddBudget({ onClose, selectedMonth, selectedYear }) {

    const currentYear = new Date().getFullYear();

    const years = [
        currentYear - 1,
        currentYear,
        currentYear + 1,
    ];

    const { budget, setBudget } = useBudget();
    const [inputValue, setInputValue] = useState(budget);
    const [month, setMonth] = useState(
        selectedMonth ?? String(new Date().getMonth() + 1).padStart(2, "0")
    );

    const [year, setYear] = useState(
        Number(selectedYear ?? currentYear)
    );
    
    const [loading, setloading] = useState(false);

    const handleBudgetSubmit = async () => {

        if (!inputValue) {
            toast.error("Amount is required.");
            return;
        }

        if (Number(inputValue) <= 0) {
            toast.error("Enter a valid amount.");
            return;
        }

        try {
            setloading(true);

            const newBudget = {
                monthlyBudget: Number(inputValue),
                month,
                year
            }

            console.log(newBudget);

            const response = await axios.post("http://localhost:8000/api/v1/budgets/add-budget",
                newBudget,
                {
                    withCredentials: true,
                }
            )

            setBudget(prev => [...prev, response.data.data]);

            setInputValue("")

            toast.success("Budget added successfully!");

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to add budget."
            );
        } finally {
            setloading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-[#1c1c1c] w-100 p-6 rounded-2xl border border-white/10 z-10">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-lg font-semibold">
                        Add New budget
                    </h2>

                    <button onClick={onClose} className="text-white/60 cursor-pointer hover:text-white">
                        ✕
                    </button>
                </div>

                <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full mt-3 p-2 rounded-lg bg-white/5 border border-white/10 text-white mb-4"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <select
                    className="w-full md:flex-1 bg-[#262624] border-[1.5px] h-10 px-3 cursor-pointer border-[#494945] rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] font-semibold text-[#b7b5a7]"
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
                    className="w-full md:flex-1 bg-[#262624] border-[1.5px] h-10 px-3 mt-4 cursor-pointer border-[#494945] rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] font-semibold text-[#b7b5a7]"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                >
                    {years.map((yr) => (
                        <option key={yr} value={yr}>
                            {yr}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 bg-white/10 rounded-lg text-white cursor-pointer hover:bg-white/20 duration-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleBudgetSubmit}
                        disabled={loading}
                        className="px-3 py-1 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-500 duration-300"
                    >
                        {loading ? "Adding budget..." : "Add budget"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AddBudget