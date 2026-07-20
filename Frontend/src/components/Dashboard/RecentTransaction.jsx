import react from 'react'
import { useExpense } from '../../context/ExpenseContext'

function RecentTransaction({ expenses }) {

    const transactions = [...expenses].reverse();

    return (
        <>
            {transactions.slice(0, 5).map((expense) => (
                <div key={expense.id}>

                    {/* Desktop */}
                    <div
                        className='hidden md:grid w-full h-16 bg-[#2e2e2d] border-b border-[#494945]
                        grid-cols-[2.5fr_1.2fr_1fr_1fr_1fr]
                        items-center px-4 gap-4'
                    >
                        <div className='flex items-center gap-4'>
                            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                                {expense.categoryIcon}
                            </div>

                            <div className='flex flex-col'>
                                <span className='text-white font-semibold'>
                                    {expense.title}
                                </span>

                                <span className='text-gray-400 text-sm'>
                                    {expense.notes}
                                </span>
                            </div>
                        </div>

                        <div className='text-[#2574c3] bg-white rounded-full min-w-24 w-fit px-3 py-1 text-center font-semibold'>
                            {expense.category}
                        </div>

                        <div className='text-gray-300 font-semibold'>
                            {expense.payment}
                        </div>

                        <div
                            className={`font-bold ${expense.transType === "income"
                                ? "text-green-500"
                                : "text-red-500"
                                }`}
                        >
                            {expense.transType === "income" ? "+" : "-"}₹{expense.amount}
                        </div>

                        <div className='text-gray-300 font-bold'>
                            {expense.date}
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className='md:hidden bg-[#2e2e2d] border-b border-[#494945] p-4'>
                        <div className='flex items-center gap-3 mb-3'>
                            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                                {expense.categoryIcon}
                            </div>

                            <div>
                                <p className='text-white font-semibold'>
                                    {expense.title}
                                </p>

                                <p className='text-gray-400 text-sm'>
                                    {expense.notes}
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-between py-1'>
                            <span className='text-gray-400'>Category</span>
                            <span className='text-[#2574c3] font-semibold'>
                                {expense.category}
                            </span>
                        </div>

                        <div className='flex justify-between py-1'>
                            <span className='text-gray-400'>Payment</span>
                            <span className='text-white'>
                                {expense.payment}
                            </span>
                        </div>

                        <div className='flex justify-between py-1'>
                            <span className='text-gray-400'>Amount</span>
                            <span
                                className={`font-bold ${expense.transType === "income"
                                    ? "text-green-500"
                                    : "text-red-500"
                                    }`}
                            >
                                {expense.transType === "income" ? "+" : "-"}₹{expense.amount}
                            </span>
                        </div>

                        <div className='flex justify-between py-1'>
                            <span className='text-gray-400'>Date</span>
                            <span className='text-white'>
                                {expense.date}
                            </span>
                        </div>
                    </div>

                </div>
            ))}
        </>
    );
}

export default RecentTransaction