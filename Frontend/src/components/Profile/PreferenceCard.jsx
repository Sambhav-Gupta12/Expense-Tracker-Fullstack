import React from 'react'
import ToggleRow from './ToggleRow';

function PreferenceCard() {
    return (
        <div className="bg-[#262624] border border-[#494945] rounded-2xl px-6 py-3">

            <h3 className="text-[#b0b0ac] text-sm font-semibold uppercase">
                Preferences
            </h3>

            <div className="space-y-6 mt-3">

                <div>
                    <label className="text-white font-semibold">
                        Currency
                    </label>

                    <select className="w-full mt-2 bg-[#30302e] border border-[#494945] rounded-xl p-3 text-white">
                        <option>₹ INR</option>
                    </select>
                </div>

                <ToggleRow
                    title="Dark mode"
                    subtitle="Toggle app theme"
                />

                <ToggleRow
                    title="Budget alerts"
                    subtitle="Notify at 80% usage"
                    enabled
                />

                <ToggleRow
                    title="Monthly report email"
                    subtitle="Summary on 1st of month"
                    enabled
                />

            </div>
        </div>
    );
}

export default PreferenceCard