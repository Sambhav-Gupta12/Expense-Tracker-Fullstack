import react from 'react'
import { useExpense } from '../../context/ExpenseContext'

function TransactionCard({ showAll, transactions }) {

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
                        grid-cols-[2.5fr_1.2fr_1fr_1fr_1fr]
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
                    </div>

                    {/* Mobile */}
                    <div className='md:hidden bg-[#2e2e2d] border-b border-[#494945] p-4'>
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
                    </div>

                </div>
            ))}
        </>
    );
}

export default TransactionCard