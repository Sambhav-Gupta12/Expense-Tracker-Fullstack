import React from 'react'

function ConfirmDelete({ onCancel, onConfirm, loading, upperLine, lowerLine }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-[90%] max-w-md rounded-2xl border border-[#494945] bg-[#262624] p-6 shadow-2xl">

                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/50">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        className="w-9 h-9"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0l1 12a1 1 0 001 1h6a1 1 0 001-1l1-12"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 11v6M14 11v6"
                        />
                    </svg>
                </div>

                {/* Heading */}
                <h2 className="mt-5 text-center text-2xl font-semibold text-white">
                    Delete
                </h2>

                {/* Message */}
                <p className="mt-3 text-center text-[#b0b0ac]">
                    {upperLine}
                    <br />
                    {lowerLine}
                </p>

                {/* Buttons */}
                <div className="mt-8 flex gap-4">

                    <button
                        onClick={onCancel}
                        className="cursor-pointer flex-1 rounded-xl border border-[#65645f] py-3 font-medium text-white transition hover:bg-[#30302e]"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={onConfirm}
                        className="cursor-pointer flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ConfirmDelete