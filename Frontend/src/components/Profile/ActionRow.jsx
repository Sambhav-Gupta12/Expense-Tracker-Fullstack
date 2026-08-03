import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import { useExpense } from '../../context/ExpenseContext.jsx';
import { useIncome } from '../../context/IncomeContext.jsx'
import { useBudget } from '../../context/BudgetContext.jsx'
import { useCatBudget } from '../../context/CatBudContext.jsx'
import toast from 'react-hot-toast';
import ConfirmDelete from '../confirmModal/ConfirmDelete.jsx';
import { API } from "../utils/api";

function ActionRow({
    title,
    subtitle,
    button,
    danger = false
}) {

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [loading, setLoading] = useState(false);

    const { expenses, setExpenses } = useExpense();
    const { incomes, setIncomes } = useIncome();
    const { setBudget } = useBudget();
    const { setCatBudgets } = useCatBudget()

    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(`${API}/users/delete-user`,
                {
                    withCredentials: true,
                }
            )

            setShowConfirmModal(false);

            setUser(null)
            setExpenses([])
            setIncomes([])
            setBudget([])
            setCatBudgets([])

            navigate("/");

            toast.success("Account deleted successfully!");

        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to delete account.")
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="flex justify-between items-center">

            <div>
                <h4 className="text-white font-semibold">
                    {title}
                </h4>

                <p className="text-[#b0b0ac] text-sm">
                    {subtitle}
                </p>
            </div>

            <button
                onClick={danger
                    ? () => setShowConfirmModal(true)
                    : () => setShowConfirmModal(false)
                }
                className={`px-4 py-2 rounded-xl border ${danger
                    ? "border-red-500 text-red-500 cursor-pointer hover:bg-red-200 duration-300"
                    : "border-[#65645f] text-white"
                    }`}
            >
                {button}
            </button>

            {
                showConfirmModal && (
                    <ConfirmDelete
                        onCancel={() => setShowConfirmModal(false)}
                        onConfirm={handleDelete}
                        loading={loading}
                        upperLine="Are you sure you want to delete your account?"
                        lowerLine="All your data will be lost !"
                    />
                )
            }
        </div>
    );
}

export default ActionRow