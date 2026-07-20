import React from 'react'
import ActionRow from './ActionRow';

function PrivacyCard() {
    return (
        <div className="bg-[#262624] border border-[#494945] rounded-2xl py-3 px-6">

            <h3 className="text-[#b0b0ac] text-sm font-semibold uppercase">
                Data & Privacy
            </h3>

            <div className="mt-3 space-y-6">

                <ActionRow
                    title="Export all data"
                    subtitle="Download as CSV or PDF"
                    button="Export"
                />

                <ActionRow
                    title="Linked accounts"
                    subtitle="Connect bank / UPI"
                    button="Manage"
                />

                <ActionRow
                    title="Delete account"
                    subtitle="Permanently remove data"
                    button="Delete"
                    danger
                />

            </div>
        </div>
    );
}

export default PrivacyCard