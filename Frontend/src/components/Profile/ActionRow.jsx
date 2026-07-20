import React from 'react'

function ActionRow({
    title,
    subtitle,
    button,
    danger = false
}) {
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
                className={`px-4 py-2 rounded-xl border ${danger
                        ? "border-red-500 text-red-500"
                        : "border-[#65645f] text-white"
                    }`}
            >
                {button}
            </button>
        </div>
    );
}

export default ActionRow