import React from 'react'

function ConfirmLogout({onCancel, onConfirm}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-[90%] max-w-md rounded-2xl border border-[#494945] bg-[#262624] p-6 shadow-2xl">

                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
                        />
                    </svg>
                </div>

                {/* Heading */}
                <h2 className="mt-5 text-center text-2xl font-semibold text-white">
                    Logout
                </h2>

                {/* Message */}
                <p className="mt-3 text-center text-[#b0b0ac]">
                    Are you sure you want to logout?
                    <br />
                    You'll need to sign in again to access your account.
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
                        onClick={onConfirm}
                        className="cursor-pointer flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ConfirmLogout