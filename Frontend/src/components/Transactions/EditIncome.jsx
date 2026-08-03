import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast'
import OtherExp from '../AddExpense/OtherExp.jsx'
import { useIncome } from "../../context/IncomeContext.jsx";
import { API } from '../../utils/api.js'

function EditExpense({ transaction, onCancel }) {

    const { setIncomes } = useIncome();

    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [payment, setPayment] = useState("");
    const [account, setAccount] = useState("");
    const [notes, setNotes] = useState("");
    const [transType, setTransType] = useState("");

    useEffect(() => {
        if (!transaction) return;

        setAmount(transaction.amount);
        setDate(transaction.date.slice(0, 10));
        setTitle(transaction.title);
        setPayment(transaction.paymentMethod || transaction.payment);
        setAccount(transaction.account);
        setNotes(transaction.note || transaction.notes);
        setTransType(transaction.transType);

    }, [transaction]);

    const [loading, setLoading] = useState(false);

    const handleEditIncome = async () => {

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

        setLoading(true);

        try {
            
            const newIncome = {
                title: title,
                amount: Number(amount),
                paymentMethod: payment,
                account: account,
                date,
                note: notes,
            };

            const response = await axios.patch(`${API}/incomes/update-income/${transaction._id}`,
                newIncome,
                {
                    withCredentials: true,
                }
            )

            setIncomes(prev =>
                prev.map(exp =>
                    exp._id === response.data.data._id
                        ? response.data.data
                        : exp
                )
            );

            setAmount("");
            setDate("");
            setTitle("");
            setPayment("UPI");
            setAccount("Main account");
            setNotes("")

            toast.success("Income updated successfully!");

            onCancel();

        } catch (error) {

            toast.error(error.response?.data?.message || "Unable to update Income.")

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
                    <div className="text-white mt-2 ml-4 font-semibold text-[18px]">Edit income details</div>
                    <button
                        onClick={onCancel}
                        className="text-white/60 hover:text-white text-xl cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div>
                    {/* Income section */}
                    <div className="Amount flex justify-center gap-6 px-6 pt-10">
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

                    <div className="flex flex-col px-6 mt-8">
                        <label className='text-[#aaaaa7] font-semibold' htmlFor="amount">Title / description *</label>
                        <input
                            className='border-[1.5px] mt-1 h-9 w-full border-[#494945] rounded-lg pl-2 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] text-white placeholder:text-[#686867]'
                            type="text"
                            placeholder='e.g. Salary deposited'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>



                    {/* Payment section */}

                    <section className="payment px-6 mt-8">
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

                    <div className="flex flex-col px-6 mt-8">
                        <label className='text-[#aaaaa7] font-semibold' htmlFor="amount">Notes (optional)</label>
                        <input
                            className='border-[1.5px] mt-1 h-9 w-full border-[#494945] rounded-lg pl-2 focus:outline-none focus:border-blue-600 focus:shadow-[0_0_6px_#3b82f6] text-white placeholder:text-[#686867]'
                            type="text"
                            placeholder='Any extra detail'
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)} />
                    </div>

                    <div className="flex gap-6 justify-center px-6 mt-10">
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
                            onClick={() => { handleEditIncome(), console.log(amount), console.log(date), console.log(title), console.log(payment), console.log(account), console.log(notes), console.log(category), console.log(transType) }}>
                            {loading ? "Updating..." : "Update Income"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditExpense