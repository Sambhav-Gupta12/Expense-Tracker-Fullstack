import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast'
import OtherExp from '../AddExpense/OtherExp.jsx'
import { useExpense } from "../../context/ExpenseContext.jsx";

function EditExpense({ transaction, onCancel }) {

    const { setExpenses } = useExpense();

    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [payment, setPayment] = useState("");
    const [account, setAccount] = useState("");
    const [notes, setNotes] = useState("");
    const [transType, setTransType] = useState("");
    const [customIcon, setCustomIcon] = useState("");
    const [selectedButton, setSelectedButton] = useState("");
    const [showOther, setShowOther] = useState(false);

    const defaultCategories = [
        "Food",
        "Transportation",
        "Bills",
        "Shopping",
        "Entertainment",
        "Health",
        "Education",
        "Income",
    ];

    useEffect(() => {
        if (!transaction) return;

        setAmount(transaction.amount);
        setDate(transaction.date.slice(0, 10));
        setTitle(transaction.title);
        setCategory(transaction.category);
        setPayment(transaction.paymentMethod || transaction.payment);
        setAccount(transaction.account);
        setNotes(transaction.note || transaction.notes);
        setTransType(transaction.transType);
        setCustomIcon(transaction.categoryIcon);

        if (defaultCategories.includes(transaction.category)) {
            setSelectedButton(transaction.category);
        }
        else {
            setSelectedButton("Other");
        }

        setShowOther(
            !defaultCategories.includes(transaction.category)
        );
    }, [transaction]);

    const [loading, setLoading] = useState(false);

    const handleEditExpense = async () => {

        if (!amount) {
            toast.error("Amount is required.");
            return;
        }

        if (!date.trim()) {
            toast.error("Date is required.");
            return;
        }

        if (!title.trim()) {
            toast.error("Title is required.");
            return;
        }

        if (Number(amount) <= 0) {
            toast.error("Enter a valid amount.");
            return;
        }

        if (!category.trim()) {
            toast.error("Category is required.");
            return;
        }

        setLoading(true);

        try {
            // const [yyyy, mm, dd] = date.split("-");
            // const formattedDate = `${dd}-${mm}-${yyyy}`;
            const newExpense = {
                // id: Date.now(),
                // transType: transType,
                title: title,
                amount: Number(amount),
                category: category,
                paymentMethod: payment,
                account: account,
                date,
                note: notes,
                categoryIcon: customIcon || transaction.categoryIcon
            };

            const response = await axios.patch(`http://localhost:8000/api/v1/expenses/update-expense/${transaction._id}`,
                newExpense,
                {
                    withCredentials: true,
                }
            )

            setExpenses(prev =>
                prev.map(exp =>
                    exp._id === response.data.data._id
                        ? response.data.data
                        : exp
                )
            );

            setCategory("Food");
            // setTransType(transType);
            setAmount("");
            setDate("");
            setTitle("");
            setPayment("UPI");
            setAccount("Main account");
            setNotes("")
            setCustomIcon("");
            setShowOther(false);
            setSelectedButton("Food");

            toast.success("Expense updated successfully!");

            onCancel();

        } catch (error) {

            toast.error(error.response?.data?.message || "Unable to update expense.")

            // setError(
            //   error.response?.data?.message ||
            //   "Unable to add expense."
            // );

        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="relative z-50 w-[95%] max-w-4xl max-h-[95vh] overflow-y-auto no-scrollbar rounded-2xl border border-[#494945] bg-[#1e1e1d] p-6 shadow-2xl">
                <div className="flex justify-between">
                    <div className="text-white mt-2 ml-4 font-semibold text-[18px]">Edit expense details</div>
                    <button
                        onClick={onCancel}
                        className="text-white/60 hover:text-white text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div>
                    <div className="Amount flex justify-center gap-6 px-6 pt-3">
                        <div className="flex flex-col w-full min-w-0">
                            <label className='text-[#aaaaa7] font-semibold'>Amount (₹)*</label>
                            <input
                                className='border-[1.5px] mt-1 h-9 w-full min-w-0 border-[#494945] rounded-lg px-2 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] font-semibold text-white placeholder-[#686867]'
                                type="number"
                                placeholder='0.00'
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)} />
                        </div>

                        <div className="flex flex-col w-full min-w-0">
                            <label className='text-[#aaaaa7] font-semibold'>Date*</label>
                            <input
                                className='cursor-pointer border-[1.5px] mt-1 h-9 w-full max-w-full border-[#494945] rounded-lg focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] text-[#686867] focus:text-white'
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="flex flex-col px-6 mt-1">
                        <label className='text-[#aaaaa7] font-semibold' htmlFor="amount">Title / description *</label>
                        <input
                            className='border-[1.5px] mt-1 h-9 w-full border-[#494945] rounded-lg pl-2 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] text-white placeholder:text-[#686867]'
                            type="text"
                            placeholder='e.g. Zomato lunch order'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <section className="category px-6 mt-1">
                        <div className="w-full text-[#aaaaa7] font-semibold">Category*</div>

                        {/* Category section */}

                        <div className="flex gap-4 mt-2 h-37 justify-around flex-wrap overflow-y-scroll no-scrollbar">
                            <button
                                onClick={() => { setCategory("Food"), setSelectedButton("Food") }}
                                className={`text-center px-1 overflow-hidden no-scrollbar h-16 w-1/5 rounded-lg text-sm font-medium transition-all cursor-pointer duration-300 
      ${selectedButton === "Food"
                                        ? "bg-white text-[#4035a0] border-2 border-[#422fee]"
                                        : "text-[#a5a39c] border-[1.5px] border-gray-600 hover:text-white"}`}
                            ><div className="flex flex-col"><span>🍔</span><span>Food</span></div></button>

                            <button
                                onClick={() => { setCategory("Transportation"), setSelectedButton("Transportation"); }}
                                className={`text-center px-1 overflow-scroll no-scrollbar h-16 w-1/5 rounded-lg sm:text-sm text-[11px] font-medium transition-all cursor-pointer duration-300 
      ${selectedButton === "Transportation"
                                        ? "bg-white text-[#4035a0] border-2 border-[#422fee]"
                                        : "text-[#a5a39c] border-[1.5px] border-gray-600 hover:text-white"}`}
                            ><div className="flex flex-col"><span>🚕</span><span>Transport</span></div></button>

                            <button
                                onClick={() => { setCategory("Bills"), setSelectedButton("Bills"); }}
                                className={`text-center px-1 overflow-scroll no-scrollbar h-16 w-1/5 rounded-lg text-sm font-medium transition-all cursor-pointer duration-300 
      ${selectedButton === "Bills"
                                        ? "bg-white text-[#4035a0] border-2 border-[#422fee]"
                                        : "text-[#a5a39c] border-[1.5px] border-gray-600 hover:text-white"}`}
                            ><div className="flex flex-col"><span>📄</span><span>Bills</span></div></button>

                            <button
                                onClick={() => { setCategory("Shopping"), setSelectedButton("Shopping"); }}
                                className={`text-center px-1 overflow-scroll no-scrollbar h-16 w-1/5 rounded-lg sm:text-sm text-[11px] font-medium transition-all cursor-pointer duration-300 
      ${selectedButton === "Shopping"
                                        ? "bg-white text-[#4035a0] border-2 border-[#422fee]"
                                        : "text-[#a5a39c] border-[1.5px] border-gray-600 hover:text-white"}`}
                            ><div className="flex flex-col"><span>🛍️</span><span>Shopping</span></div></button>

                            <button
                                onClick={() => { setCategory("Entertainment"), setSelectedButton("Entertainment"); }}
                                className={`text-center px-1 overflow-scroll no-scrollbar h-16 w-1/5 rounded-lg sm:text-sm text-[11px] font-medium transition-all cursor-pointer duration-300 
      ${selectedButton === "Entertainment"
                                        ? "bg-white text-[#4035a0] border-2 border-[#422fee]"
                                        : "text-[#a5a39c] border-[1.5px] border-gray-600 hover:text-white"}`}
                            ><div className="flex flex-col"><span>🎬</span><span>Entertain</span></div></button>

                            <button
                                onClick={() => { setCategory("Health"), setSelectedButton("Health"); }}
                                className={`text-center px-1 overflow-scroll no-scrollbar h-16 w-1/5 rounded-lg text-sm font-medium transition-all cursor-pointer duration-300 
      ${selectedButton === "Health"
                                        ? "bg-white text-[#4035a0] border-2 border-[#422fee]"
                                        : "text-[#a5a39c] border-[1.5px] border-gray-600 hover:text-white"}`}
                            ><div className="flex flex-col"><span>🏥</span><span>Health</span></div></button>

                            <button
                                onClick={() => { setCategory("Education"), setSelectedButton("Education"); }}
                                className={`text-center px-1 overflow-scroll no-scrollbar h-16 w-1/5 rounded-lg sm:text-sm text-[11px] font-medium transition-all cursor-pointer duration-300 
      ${selectedButton === "Education"
                                        ? "bg-white text-[#4035a0] border-2 border-[#422fee]"
                                        : "text-[#a5a39c] border-[1.5px] border-gray-600 hover:text-white"}`}
                            ><div className="flex flex-col"><span>📚</span><span>Education</span></div></button>

                            <button
                                onClick={() => { setShowOther(true), setSelectedButton("Other"); }}
                                className={` text-center px-1 overflow-scroll no-scrollbar h-16 w-1/5 rounded-lg text-sm font-medium transition-all cursor-pointer duration-300 
      ${selectedButton === "Other"
                                        ? "bg-white text-[#4035a0] border-2 border-[#422fee]"
                                        : "text-[#a5a39c] border-[1.5px] border-gray-600 hover:text-white"}`}
                            ><div className="flex flex-col"><span>📦</span><span>Other</span></div></button>

                            {showOther && (
                                <OtherExp
                                    onClose={() => setShowOther(false)}
                                    setCategory={setCategory}
                                    setCustomIcon={setCustomIcon}
                                    initialCategory={category}
                                    initialIcon={customIcon}
                                />
                            )}
                        </div>
                    </section>

                    {/* Payment section */}

                    <section className="payment px-6 mt-1.5">
                        <div className="flex gap-6 w-full">
                            <div className="flex w-full flex-col">
                                <label className='text-[#aaaaa7] font-semibold whitespace-nowrap'>Payment Method</label>
                                <select
                                    className='bg-[#30302e] border-[1.5px] mt-1 h-9 w-full min-w-0 border-[#494945] rounded-lg px-2 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] font-semibold text-white placeholder-[#686867] cursor-pointer'
                                    value={payment}
                                    onChange={(e) => setPayment(e.target.value)}>
                                    <option value="UPI">UPI</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank transfer">Bank transfer</option>
                                    <option value="Credit card">Credit card</option>
                                    <option value="Debit card">Debit card</option>
                                    <option value="Net Banking">Net Banking</option> cursor-pointer
                                </select>
                            </div>

                            <div className="flex w-full flex-col">
                                <label className='text-[#aaaaa7] font-semibold'>Wallet/account</label>
                                <select
                                    className='bg-[#30302e] border-[1.5px] mt-1 h-9 w-full min-w-0 border-[#494945] rounded-lg px-2 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] font-semibold text-white placeholder-[#686867] cursor-pointer'
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}>
                                    <option value="Main account">Main account</option>
                                    <option value="Savings account">Savings account</option>
                                    <option value="Salary account">Salary account</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col px-6 mt-2">
                        <label className='text-[#aaaaa7] font-semibold' htmlFor="amount">Notes (optional)</label>
                        <input
                            className='border-[1.5px] mt-1 h-9 w-full border-[#494945] rounded-lg pl-2 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] text-white placeholder:text-[#686867]'
                            type="text"
                            placeholder='Any extra detail'
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)} />
                    </div>

                    <div className="flex gap-6 justify-center px-6 mt-4">
                        <button
                            disabled={loading}
                            className='w-1/5 border-[1.5px] rounded-lg font-semibold text-white h-10 border-[#80807a] hover:bg-[#272726] duration-300 cursor-pointer'
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className='w-1/2 border-[1.5px] rounded-lg font-semibold text-white h-10 border-[#80807a] hover:bg-[#272726] duration-300 cursor-pointer'
                            onClick={() => { handleEditExpense(), console.log(amount), console.log(date), console.log(title), console.log(payment), console.log(account), console.log(notes), console.log(category), console.log(transType) }}>
                            {loading ? "Updating..." : "Update Expense"}
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default EditExpense