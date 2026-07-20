import React from 'react'
import { useState } from 'react';
import { useBudget } from "../../context/BudgetContext";

function OtherExp({ onClose, setCategory, setCustomIcon }) {

    const [customCategory, setCustomCategory] = useState("");
    const [icon, setIcon] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-[#1c1c1c] w-100 p-6 rounded-2xl border border-white/10 z-10">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-lg font-semibold">
                        Add Custom Category
                    </h2>

                    <button onClick={onClose} className="text-white/60 cursor-pointer hover:text-white">
                        ✕
                    </button>
                </div>

                <h2 className='text-[#cbcac4] mt-3 mb-1 mx-2'>Category name</h2>

                <input
                    type="text"
                    placeholder="Enter category name"
                    className="w-84 p-2 mx-2 rounded-lg bg-white/5 border border-white/10 text-white mb-4"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                />

                <h2 className='text-[#cbcac4] mt-3 mb-1 mx-2'>Category Icon</h2>

                <input
                    type="text"
                    placeholder="Icon (e.g. 💪)"
                    className="w-84 p-2 mx-2 rounded-lg bg-white/5 border border-white/10 text-white mb-4"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                />

                <button
                    className="block px-3 py-1 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-500 duration-300 mx-auto"
                    onClick={() => {
                        setCategory(customCategory);
                        setCustomIcon(icon);
                        onClose();
                    }}
                >
                    Save Category
                </button>
            </div>
        </div>
    )
}

export default OtherExp