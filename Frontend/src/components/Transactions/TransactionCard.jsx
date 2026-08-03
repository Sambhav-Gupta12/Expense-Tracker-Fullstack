import react from 'react'
import { useState, useEffect, useRef } from "react";
import { useExpense } from '../../context/ExpenseContext'
import EditExpense from './EditExpense';
import EditIncome from "./EditIncome";

function TransactionCard({ showAll, transactions }) {

    const [openMenu, setOpenMenu] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const AllTransactions = [...transactions];

    const displayedTransactions = showAll
        ? AllTransactions
        : AllTransactions.slice(0, 6);

    return (
        <>
            {displayedTransactions.map((transaction) => (
                <div key={transaction._id}>

                    {/* Desktop */}
                    <div
                        className='hidden md:grid w-full h-16 bg-[#2e2e2d] border-b border-[#494945]
                        grid-cols-[2.5fr_1.2fr_1fr_1fr_1fr_50px]
                        items-center px-4 gap-4'
                    >
                        <div className='flex items-center gap-4'>
                            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                                {transaction.categoryIcon}
                            </div>

                            <div className='flex flex-col'>
                                <span className='text-white font-semibold'>
                                    {transaction.title}
                                </span>

                                <span className='text-gray-400 text-sm'>
                                    {transaction.note || transaction.notes}
                                </span>
                            </div>
                        </div>

                        <div className='text-[#2574c3] bg-white rounded-full min-w-24 w-fit px-3 py-1 text-center font-semibold'>
                            {transaction.category}
                        </div>

                        <div className='text-gray-300 font-semibold'>
                            {transaction.paymentMethod || transaction.payment}
                        </div>

                        <div
                            className={`font-bold ${transaction.transType === "income"
                                ? "text-green-500"
                                : "text-red-500"
                                }`}
                        >
                            {transaction.transType === "income" ? "+" : "-"}₹{transaction.amount}
                        </div>

                        <div className='text-gray-300 font-bold'>
                            {new Date(transaction.date).toLocaleDateString("en-GB")}
                        </div>

                        <div className="relative">

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    setOpenMenu(prev =>
                                        prev === transaction._id ? null : transaction._id
                                    );
                                }}
                                className="w-8 h-8 rounded-full flex items-center justify-center
        hover:bg-[#3a3a38] text-gray-400 hover:text-white cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <circle cx="8" cy="2" r="1.5" />
                                    <circle cx="8" cy="8" r="1.5" />
                                    <circle cx="8" cy="14" r="1.5" />
                                </svg>
                            </button>

                            {openMenu === transaction._id && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setOpenMenu(null)}
                                    />

                                    {/* Menu */}
                                    <div
                                        className={`absolute top-full right-0 mt-2 w-40 rounded-xl bg-[#1f1f1f]
            border border-[#494945] shadow-xl overflow-hidden z-50
            transition-all duration-200 ease-out origin-top-right
            ${openMenu === transaction._id
                                                ? "opacity-100 scale-100 translate-y-0"
                                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                            }`}
                                    >
                                        <button
                                            onClick={() => {
                                                setOpenMenu(null);
                                                setSelectedTransaction(transaction);
                                                setShowEditModal(true);
                                            }}
                                            className="w-full px-4 py-3 text-white flex items-center gap-3 hover:bg-[#30302e] transition-colors cursor-pointer"
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            onClick={() => {
                                                setOpenMenu(null);
                                                // TODO: Open delete modal
                                            }}
                                            className="w-full px-4 py-3 flex items-center gap-3 text-red-500 hover:bg-[#30302e] transition-colors cursor-pointer"
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>



                    {/* Mobile */}
                    < div className='md:hidden bg-[#2e2e2d] border-b border-[#494945] p-4' >
                        <div className='flex items-center gap-3 mb-3'>
                            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                                {transaction.categoryIcon}
                            </div>

                            <div>
                                <p className='text-white font-semibold'>
                                    {transaction.title}
                                </p>

                                <p className='text-gray-400 text-sm'>
                                    {transaction.note || transaction.notes}
                                </p>
                            </div>
                        </div>

                        <div className="relative">

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();

                                    setOpenMenu(prev =>
                                        prev === transaction._id ? null : transaction._id
                                    );
                                }}
                                className="w-8 h-8 rounded-full flex items-center justify-center
        hover:bg-[#3a3a38] text-gray-400 hover:text-white cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <circle cx="8" cy="2" r="1.5" />
                                    <circle cx="8" cy="8" r="1.5" />
                                    <circle cx="8" cy="14" r="1.5" />
                                </svg>
                            </button>

                            {openMenu === transaction._id && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setOpenMenu(null)}
                                    />

                                    {/* Menu */}
                                    <div
                                        className={`absolute top-full right-0 mt-2 w-40 rounded-xl bg-[#1f1f1f]
            border border-[#494945] shadow-xl overflow-hidden z-50
            transition-all duration-200 ease-out origin-top-right
            ${openMenu === transaction._id
                                                ? "opacity-100 scale-100 translate-y-0"
                                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                            }`}
                                    >
                                        <button
                                            onClick={() => {
                                                setOpenMenu(null);
                                                setSelectedTransaction(transaction);
                                                setShowEditModal(true);
                                            }}
                                            className="w-full px-4 py-3 text-white flex items-center gap-3 hover:bg-[#30302e] transition-colors cursor-pointer"
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            onClick={() => {
                                                setOpenMenu(null);
                                                // TODO: Open delete modal
                                            }}
                                            className="w-full px-4 py-3 flex items-center gap-3 text-red-500 hover:bg-[#30302e] transition-colors cursor-pointer"
                                        >
                                            🗑 Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className='flex justify-between py-1'>
                            <span className='text-gray-400'>Category</span>
                            <span className='text-[#2574c3] font-semibold'>
                                {transaction.category}
                            </span>
                        </div>

                        <div className='flex justify-between py-1'>
                            <span className='text-gray-400'>Payment</span>
                            <span className='text-white'>
                                {transaction.paymentMethod || transaction.payment}
                            </span>
                        </div>

                        <div className='flex justify-between py-1'>
                            <span className='text-gray-400'>Amount</span>
                            <span
                                className={`font-bold ${transaction.transType === "income"
                                    ? "text-green-500"
                                    : "text-red-500"
                                    }`}
                            >
                                {transaction.transType === "income" ? "+" : "-"}₹{transaction.amount}
                            </span>
                        </div>

                        <div className='flex justify-between py-1'>
                            <span className='text-gray-400'>Date</span>
                            <span className='text-white'>
                                {new Date(transaction.date).toLocaleDateString("en-GB")}
                            </span>
                        </div>

                    </div >

                </div >
            ))
            }
            {showEditModal && selectedTransaction && (
                selectedTransaction.transType === "expense" ? (
                    <EditExpense
                        transaction={selectedTransaction}
                        onCancel={() => {
                            setShowEditModal(false);
                            setSelectedTransaction(null);
                        }}
                    />
                ) : (
                    <EditIncome
                        transaction={selectedTransaction}
                        onCancel={() => {
                            setShowEditModal(false);
                            setSelectedTransaction(null);
                        }}
                    />
                )
            )}
        </>
    );
}

export default TransactionCard