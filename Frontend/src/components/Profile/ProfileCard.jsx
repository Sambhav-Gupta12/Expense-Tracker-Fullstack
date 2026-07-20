import React from 'react'
import Row from './Row'

function ProfileCard() {
    return (
        <div className="bg-[#262624] border border-[#494945] rounded-2xl p-6">

            <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#e5e5f4] flex items-center justify-center text-4xl text-indigo-600">
                    SG
                </div>

                <h2 className="text-white text-2xl font-semibold mt-4">
                    Sambhav Gupta
                </h2>

                <p className="text-[#b0b0ac] mt-1">
                    sambhavgupt12@gmail.com
                </p>

                <span className="mt-3 px-4 py-1 rounded-full bg-indigo-600 text-white text-sm">
                    Pro plan
                </span>
            </div>

            <div className="border-t border-[#494945] my-6"></div>

            <div className="space-y-4">
                <Row label="Member since" value="Jan 2025" />
                <Row label="Transactions" value="482" />
                <Row label="Total tracked" value="₹4.2L" />
                <Row label="Avg savings" value="26%" />
            </div>

            <button className="w-full mt-6 border border-[#65645f] rounded-xl py-3 text-white hover:bg-[#30302e]">
                Edit profile
            </button>
        </div>
    )
}

export default ProfileCard