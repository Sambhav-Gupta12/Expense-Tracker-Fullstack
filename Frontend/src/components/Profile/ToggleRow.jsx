import React from 'react'

function ToggleRow({
    title,
    subtitle,
    enabled = false
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

            <div
                className={`w-11 h-6 rounded-full flex items-center px-1 ${enabled
                        ? "bg-indigo-600 justify-end"
                        : "bg-[#65645f] justify-start"
                    }`}
            >
                <div className="w-4 h-4 rounded-full bg-white" />
            </div>
        </div>
    );
}

export default ToggleRow